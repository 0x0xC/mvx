import { BigDecimal, BigInt } from "@graphprotocol/graph-ts"
import {
  // DeductVRFFee as DeductVRFFeeEvent,
  // EmergencyHalted as EmergencyHaltedEvent,
  // EmergencyStopped as EmergencyStoppedEvent,
  NewBet as NewBetEvent,
  NewBetResult as NewBetResultEvent,
  // OwnershipTransferred as OwnershipTransferredEvent,
  // ReceiveRandomness as ReceiveRandomnessEvent,
  // RequestRandomness as RequestRandomnessEvent,
  // TopUpVRF as TopUpVRFEvent,
  // UpdateBankroll as UpdateBankrollEvent,
  // UpdateChainlinkSettings as UpdateChainlinkSettingsEvent,
  // UpdateFeeRouter as UpdateFeeRouterEvent,
  // UpdateGameSettings as UpdateGameSettingsEvent,
  // UpdateGasStation as UpdateGasStationEvent,
  // UpdateGuardian as UpdateGuardianEvent,
  // UpdateMinBet as UpdateMinBetEvent,
  // UpdateReferral as UpdateReferralEvent,
  // UpdateSwapImplementation as UpdateSwapImplementationEvent
} from "../../generated/CoinflipV1/CoinflipV1"

import {
  Game,
  GameResult,
  TokenStat,
  TokenGlobalStat,
  ReferralProfile,
  ReferralCode,
  ReferralCodeStat,
  ReferralCodeGlobalStat,
  ReferrerStat,
  // ReferrerGlobalStat,
  PlayerStat,
  PlayerGlobalStat
} from "../../generated/schema"

import { timestampToPeriod } from '../../utils/helper'

import {
  _getOrCreateGameType,
  _getOrCreateTokenStat,
  _getOrCreateTokenGlobalStat,
  _createGameResult,
  _resolveGameResult,
  _getOrCreatePlayerStat,
  _getOrCreatePlayerGlobalStat,
  _getOrCreateReferralProfileAndCheckForReferrer,
  addToPlayerStatHousePnL,
  _getOrCreateReferralCodeStat,
  _getOrCreateReferralCodeGlobalStat,
  _getOrCreateReferrerStat,
  _getOrCreateReferrerGlobalStat,
  getMultiplier,
  DeltaHousePnL,
} from '../gameV1'
// export function handleDeductVRFFee(event: DeductVRFFeeEvent): void {
// }

// export function handleEmergencyHalted(event: EmergencyHaltedEvent): void {
// }

// export function handleEmergencyStopped(event: EmergencyStoppedEvent): void {
// }


export function handleNewBet(event: NewBetEvent): void {

  let type = "coinflip" // string
  const period = "weekly"
  const periodIndex = timestampToPeriod(event.block.timestamp, period)

  const STARTING_HOUSE_EDGE = BigDecimal.fromString('2.5')

  let _options = event.params.betOn.toI64()

  let options = new Array<i32>(2)

  for (let i=0; i<2; i++){

    if ((_options >> i & 1) == 1){
      options[i] = 1
    } else {
      options[i] = 0
    }
  }
  // log.info("LOG : {}", [event.params.asset.toHexString()])
  _getOrCreateGameType(
    type,
    STARTING_HOUSE_EDGE
  )

  // Return stateVariable.decimals & stateVariable.symbols to avoid slowing down the graph by reading state variable of ERC-20 contracts
  let stateVariable = _getOrCreateTokenStat(
    event.params.asset,
    event.params.amount,
    event.params.fiatAmount,
    period,
    periodIndex
  )

  _getOrCreateTokenGlobalStat(
    event.params.asset,
    event.params.amount,
    event.params.fiatAmount
  )

  _createGameResult(
    event.address,
    event.params.gameId,
    type,
    event.params.referralId,
    options,
    event.params.amount,
    event.params.fiatAmount,
    stateVariable.tokenDecimals!,
    stateVariable.tokenSymbol!,
    event.transaction.hash,
    event.params.asset,
    event.params.player
  )

}

export function handleNewBetResult(event: NewBetResultEvent): void {

  const period = "weekly"
  const periodIndex = timestampToPeriod(event.block.timestamp, period)
  let type = "coinflip" // string

  let game = Game.load(type)!
  let tokenGlobalStat = TokenGlobalStat.load(event.params.betAsset.toHexString())!


  let gameResult = GameResult.load(
    event.address.toHexString()
      .concat('-')
      .concat(event.params.gameId.toString())
  )!

  // Return referrerID used to load the referrer entity (profile & referrerCodeStat)
  let referrerId: BigInt = _resolveGameResult(
    event.params.player,
    event.address,
    event.params.gameId,
    event.transaction.hash,
    getMultiplier(event.params.win, gameResult.betOn!,game.houseEdge.toString(),"coinflip"),
    event.params.result,
    event.params.win,
    event.params.winAmount,
    event.params.winFiatAmount,
    tokenGlobalStat.tokenDecimals!,
    event.block.timestamp
  )
  
  // Return if player has already been active during the time period 
  let isAlreadyActive = _getOrCreatePlayerStat(
    event.params.player,
    gameResult.fiatAmount!,
    event.params.winFiatAmount,
    event.params.win,
    period,
    periodIndex
  )

  _getOrCreatePlayerGlobalStat(
    event.params.player,
    gameResult.fiatAmount!,
    event.params.winFiatAmount,
    event.params.win
  )
  
  // Return if player has a referrer or if it's his first game using a referralCode, used to begin incrementing active referees for the referrer in case player already has been active.
  let Player = _getOrCreateReferralProfileAndCheckForReferrer(
    event.params.player,
    gameResult.fiatAmount!,
    referrerId,
    event.block.timestamp
    )

  if (Player.hasNoReferrer) { return }

  if (Player.isFirstGame) { // If it's first game with a referer, set active to false to incr active referees
    isAlreadyActive = false
  }

  // Return start value & end value of the house profit for this specific code.
  // Used to increment the house profit of the referrer ONLY if profit is positive
  // Because we only give rewards if house is in profit on a per user basis, we don't add losses from other players

  let Delta = addToPlayerStatHousePnL(
    event.params.player,
    event.params.win,
    gameResult.fiatAmount!,
    event.params.winFiatAmount,
    period,
    periodIndex
  )

  _getOrCreateReferralCodeStat(
    referrerId,
    Player.referrerAddress!,
    Player.isFirstGame,
    isAlreadyActive,
    event.params.win,
    gameResult.fiatAmount!,
    event.params.winFiatAmount,
    period,
    periodIndex
  )

  _getOrCreateReferralCodeGlobalStat(
    referrerId,
    Player.referrerAddress!,
    Player.isFirstGame,
    event.params.win,
    gameResult.fiatAmount!,
    DeltaHousePnL(Delta.startValue, Delta.endValue, event.params.win),
  )

  _getOrCreateReferrerStat(
    Player.referrerAddress!,
    gameResult.fiatAmount!,
    DeltaHousePnL(Delta.startValue, Delta.endValue, event.params.win),
    isAlreadyActive,
    Player.isFirstGame,
    period,
    periodIndex
  )

  _getOrCreateReferrerGlobalStat(
    Player.referrerAddress!,
    gameResult.fiatAmount!,
    DeltaHousePnL(Delta.startValue, Delta.endValue, event.params.win),
    Player.isFirstGame,
  )
  

}

// function getOrCreateRefererStat(
//   id:string
//   ): void {

// }

// export function handleOwnershipTransferred(
//   event: OwnershipTransferredEvent
// ): void {
// }

// export function handleReceiveRandomness(event: ReceiveRandomnessEvent): void {
// }

// export function handleRequestRandomness(event: RequestRandomnessEvent): void {
// }

// export function handleTopUpVRF(event: TopUpVRFEvent): void {
// }

// export function handleUpdateBankroll(event: UpdateBankrollEvent): void {
// }

// export function handleUpdateChainlinkSettings(
//   event: UpdateChainlinkSettingsEvent
// ): void {
// }

// export function handleUpdateFeeRouter(event: UpdateFeeRouterEvent): void {
// }

// export function handleUpdateGameSettings(event: UpdateGameSettingsEvent): void {

// }

// export function handleUpdateGasStation(event: UpdateGasStationEvent): void {
// }

// export function handleUpdateGuardian(event: UpdateGuardianEvent): void {
// }

// export function handleUpdateMinBet(event: UpdateMinBetEvent): void {
// }

// export function handleUpdateReferral(event: UpdateReferralEvent): void {
// }

// export function handleUpdateSwapImplementation(
//   event: UpdateSwapImplementationEvent
// ): void {

// }
