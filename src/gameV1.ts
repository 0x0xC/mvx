import { Address, BigDecimal, BigInt, Bytes, log } from "@graphprotocol/graph-ts"

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
    ReferrerGlobalStat,
    PlayerStat,
    PlayerGlobalStat,
    Code
} from "../generated/schema"

import {
    ZERO_BI,
    ONE_BI,
    ZERO_BD,
    ONE_BD,
    STARTING_HOUSE_EDGE,
    convertTokenToDecimal,
    WETH_PAYOUT_TOKEN_DECIMALS,
    convertBigDecimalTokenToDecimal
} from '../utils/constants'

import { fetchTokenSymbol, fetchTokenName, fetchTokenDecimals } from '../utils/token'

class ReferralCheck {
    hasNoReferrer: boolean
    isFirstGame: boolean
    referrerAddress: string | null

    constructor(hasNoReferrer: boolean, isFirstGame: boolean, referrerAddress: string | null) {
        this.hasNoReferrer = hasNoReferrer
        this.isFirstGame = isFirstGame
        this.referrerAddress = referrerAddress
    }

}

class Delta {
    startValue: BigDecimal
    endValue: BigDecimal

    constructor(startValue: BigDecimal, endValue: BigDecimal) {
        this.startValue = startValue
        this.endValue = endValue
    }

}

// ----------NewBet --------------- //


export function _getOrCreateGameType(
    type: string,
    startingHouseEdge: BigDecimal,
): void {
    let game = Game.load(type)

    if (game == null) {
        game = new Game(type)
        game.houseEdge = startingHouseEdge
        game.betCount = 0
    }

    game.betCount += 1

    game.save()
}

export function _getOrCreateTokenStat(
    betAsset: Address,
    betAmount: BigInt,
    fiatAmount: BigInt,
    period: string,
    periodIndex: BigInt
): TokenStat {

    let id = betAsset.toHexString()
        .concat('-')
        .concat(period)
        .concat('-')
        .concat(periodIndex.toString())

    let entity = TokenStat.load(id)

    if (entity == null) {
        entity = new TokenStat(id)

        entity.volume = ZERO_BD
        entity.fiatVolume = ZERO_BD
        entity.betCount = 0
        entity.tokenSymbol = fetchTokenSymbol(betAsset)
        entity.tokenName = fetchTokenName(betAsset)
        entity.tokenDecimals = fetchTokenDecimals(betAsset)
        entity.period = period
        entity.periodIndex = periodIndex

    }


    const _betAmount = convertTokenToDecimal(betAmount, entity.tokenDecimals!)
    const _fiatAmount = convertTokenToDecimal(fiatAmount, WETH_PAYOUT_TOKEN_DECIMALS) // payoutToken.tokenDecimals

    entity.betCount += 1
    entity.volume = entity.volume.plus(_betAmount)
    entity.fiatVolume = entity.fiatVolume.plus(_fiatAmount)

    entity.save()

    return entity as TokenStat
}

export function _getOrCreateTokenGlobalStat(
    betAsset: Address,
    betAmount: BigInt,
    fiatAmount: BigInt
): void {

    let id = betAsset.toHexString()

    let entity = TokenGlobalStat.load(id)

    if (entity == null) {
        entity = new TokenGlobalStat(id)

        entity.volume = ZERO_BD
        entity.fiatVolume = ZERO_BD
        entity.betCount = 0
        entity.tokenSymbol = fetchTokenSymbol(betAsset)
        entity.tokenName = fetchTokenName(betAsset)
        entity.tokenDecimals = fetchTokenDecimals(betAsset)
    }

    const _betAmount = convertTokenToDecimal(betAmount, entity.tokenDecimals!)
    const _fiatAmount = convertTokenToDecimal(fiatAmount, WETH_PAYOUT_TOKEN_DECIMALS) // payoutToken.tokenDecimals

    entity.betCount += 1
    entity.volume = entity.volume.plus(_betAmount)
    entity.fiatVolume = entity.fiatVolume.plus(_fiatAmount)

    entity.save()
}

export function _createGameResult(
    address: Address,
    gameId: BigInt,
    type: string,
    referralId: BigInt,
    betOn: i32[],
    betAmount: BigInt,
    fiatAmount: BigInt,
    tokenDecimals: BigInt,
    tokenSymbol: string,
    betTx: Bytes,
    betAsset: Address,
    player: Address
): void {
    let entity = new GameResult(
        address.toHexString()
            .concat('-')
            .concat(gameId.toString())
    )

    const _betAmount = convertTokenToDecimal(betAmount, tokenDecimals)
    const _fiatAmount = convertTokenToDecimal(fiatAmount, WETH_PAYOUT_TOKEN_DECIMALS) // payoutToken.tokenDecimals

    entity.betTx = betTx
    entity.gameId = gameId
    entity.gameType = type
    entity.betOn = betOn
    entity.referralId = referralId
    entity.betAsset = betAsset
    entity.betAmount = _betAmount
    entity.fiatAmount = _fiatAmount
    entity.resolved = false
    entity.player = player
    entity.tokenSymbol = tokenSymbol


    entity.save()
}

// --------------- NewBetResult --------------- //

export function _resolveGameResult(
    player: Address,
    address: Address,
    gameId: BigInt,
    hash: Bytes,
    multiplier: BigDecimal,
    result: BigInt,
    isWin: boolean,
    payoutAmount: BigInt,
    payoutFiatAmount: BigInt,
    tokenDecimals: BigInt,
    timestamp: BigInt,
): BigInt {


    let entity = GameResult.load(
        address.toHexString()
            .concat('-')
            .concat(gameId.toString())
    )!

    const _payoutAmount = convertTokenToDecimal(payoutAmount, tokenDecimals)
    const _payoutFiatAmount = convertTokenToDecimal(payoutFiatAmount, WETH_PAYOUT_TOKEN_DECIMALS)

    entity.resolved = true
    entity.resolveTx = hash
    entity.win = isWin
    entity.multiplier = multiplier
    entity.result = result
    entity.payoutAmount = _payoutAmount
    entity.payoutFiatAmount = _payoutFiatAmount
    entity.timestamp = timestamp.toI32()

    entity.save()

    let referralProfile = ReferralProfile.load(player.toHexString())

    let referrerID = BigInt.fromString("0")

    if (referralProfile != null && referralProfile.referrerCode != null) {

        let code = Code.load(referralProfile.referrerCode!)

        if (code == null) {

            referrerID = entity.referralId!
        } else {
            // log.info('referralId code null {}  {}', [code.codeId.toString(), player.toHexString()])
            referrerID = BigInt.fromI32(code.codeId)
        }
    } else {
        referrerID = entity.referralId!
    }

    log.info('resolveGame 1 : Player played with the referralID of {} and the referral used is {}', [entity.referralId!.toString() , referrerID.toString()])

    // Ok so the issue here is that when the player uses a new referralCode, it switches up 


    return referrerID
}

export function _getOrCreatePlayerStat(
    player: Address,
    fiatAmount: BigDecimal,
    payoutFiatAmount: BigInt,
    isWin: boolean,
    period: string,
    periodIndex: BigInt
): boolean {

    let entity = PlayerStat.load(player.toHexString()
        .concat('-')
        .concat(period)
        .concat('-')
        .concat(periodIndex.toString()))

    let isAlreadyActive = true

    if (entity == null) {
        entity = new PlayerStat(player.toHexString()
            .concat('-')
            .concat(period)
            .concat('-')
            .concat(periodIndex.toString()))

        entity.fiatVolume = ZERO_BD
        entity.profit = ZERO_BD
        entity.houseProfitnLoss = ZERO_BD
        entity.betCount = 0
        entity.wins = 0
        entity.losses = 0
        entity.period = period
        entity.periodIndex = periodIndex

        isAlreadyActive = false

    }

    const _payoutFiatAmount = convertTokenToDecimal(payoutFiatAmount, WETH_PAYOUT_TOKEN_DECIMALS)

    entity.fiatVolume = entity.fiatVolume.plus(fiatAmount)
    entity.betCount += 1

    if (isWin) {
        entity.profit = entity.profit.plus(_payoutFiatAmount.minus(fiatAmount))
        entity.wins += 1
    } else {
        entity.profit = entity.profit.minus(fiatAmount)
        entity.losses += 1
    }

    entity.save()

    return isAlreadyActive
}

export function _getOrCreatePlayerGlobalStat(
    player: Address,
    fiatAmount: BigDecimal,
    payoutFiatAmount: BigInt,
    isWin: boolean,
): void {

    let entity = PlayerGlobalStat.load(player.toHexString())

    if (entity == null) {
        entity = new PlayerGlobalStat(player.toHexString())

        entity.fiatVolume = ZERO_BD
        entity.profit = ZERO_BD
        entity.houseProfitnLoss = ZERO_BD
        entity.betCount = 0

    }

    const _payoutFiatAmount = convertTokenToDecimal(payoutFiatAmount, WETH_PAYOUT_TOKEN_DECIMALS)

    entity.fiatVolume = entity.fiatVolume.plus(fiatAmount)
    entity.betCount += 1
    entity.wins = 0
    entity.losses = 0

    if (isWin) {
        entity.profit = entity.profit.plus(_payoutFiatAmount.minus(fiatAmount))
        entity.wins += 1
    } else {
        entity.profit = entity.profit.minus(fiatAmount)
        entity.losses += 1
    }

    entity.save()
}

export function _getOrCreateReferralProfileAndCheckForReferrer(
    player: Address,
    fiatAmount: BigDecimal,
    referralId: BigInt,
    timestamp: BigInt,
): ReferralCheck {

    let entity = ReferralProfile.load(player.toHexString())

    let hasNoReferrer = false
    let isFirstGame = false

    let RefCheck = new ReferralCheck(true, false, null)

    if (entity == null && referralId.notEqual(ZERO_BI)) {

        // log.info("LOG: entity is null and refID is zero", [])
        entity = new ReferralProfile(player.toHexString())

        let referrer = ReferralCode.load(referralId.toString())!

        // log.info("LOG: referrrer owner", [referrer.owner.toString()])

        entity.fiatVolume = fiatAmount
        entity.referrer = referrer.owner
        entity.referrerCode = referrer.code
        entity.referredAt = timestamp
        entity.baseCommission = BigInt.fromI32(5)
        entity.first = false
        entity.timestamp = timestamp

        isFirstGame = true

        RefCheck = new ReferralCheck(hasNoReferrer, isFirstGame, entity.referrer)

        entity.save()

    } else if (entity == null && referralId.equals(ZERO_BI)) {
        // log.info("LOG: entity is null and refID is not zero", [])

        hasNoReferrer = true

        RefCheck = new ReferralCheck(hasNoReferrer, isFirstGame, null)

    } else if (entity != null) {

        // log.info("LOG: entity is not null and refID is zero", [])

        if (entity.referrer == null) {
            hasNoReferrer = true
        }

        entity.fiatVolume = entity.fiatVolume!.plus(fiatAmount)
        log.info("LOG: check entity first", [entity.first.toString()])

        if (entity.first == true && entity.referrer != null) {
            entity.first = false
            isFirstGame = true
            log.info("LOG: true first game", [])
        }
        entity.save()
        
        RefCheck = new ReferralCheck(hasNoReferrer, isFirstGame, entity.referrer)
    }

    // if (entity != null){
    //     if (entity.referrer != null){
    //         if (entity.fiatVolume != null){

    //             entity.fiatVolume = entity.fiatVolume!.plus(fiatAmount)
    //         }
    //         entity.fiatVolume = ZERO_BD
    //         entity.fiatVolume = entity.fiatVolume!.plus(fiatAmount)

    //         entity.save()
    //     }
    // }

    return RefCheck
}

export function addToPlayerStatHousePnL(
    player: Address,
    isWin: boolean,
    fiatAmount: BigDecimal,
    payoutFiatAmount: BigInt,
    period: string,
    periodIndex: BigInt
): Delta {

    let playerGlobalStat = PlayerGlobalStat.load(player.toHexString())!
    let playerStat = PlayerStat.load(player.toHexString()
        .concat('-')
        .concat(period)
        .concat('-')
        .concat(periodIndex.toString()))!

    let startValue = playerStat.houseProfitnLoss

    const _payoutFiatAmount = convertTokenToDecimal(payoutFiatAmount, WETH_PAYOUT_TOKEN_DECIMALS)

    if (isWin) {
        playerStat.houseProfitnLoss = playerStat.houseProfitnLoss.minus(_payoutFiatAmount.minus(fiatAmount))
        playerGlobalStat.houseProfitnLoss = playerGlobalStat.houseProfitnLoss.minus(_payoutFiatAmount.minus(fiatAmount))

    } else {
        playerStat.houseProfitnLoss = playerStat.houseProfitnLoss.plus(fiatAmount)
        playerGlobalStat.houseProfitnLoss = playerGlobalStat.houseProfitnLoss.plus(fiatAmount)
    }

    let endValue = playerStat.houseProfitnLoss

    playerStat.save()
    playerGlobalStat.save()

    return new Delta(startValue, endValue)
}

export function _getOrCreateReferralCodeStat(
    referralId: BigInt,
    referrerAddress: string,
    isFirstGame: boolean, // Player.isFirstGame
    isAlreadyActive: boolean,
    isWin: boolean,
    fiatAmount: BigDecimal,
    payoutFiatAmount: BigInt,
    period: string,
    periodIndex: BigInt
): void {

    let entity = ReferralCodeStat.load(
        referralId.toString()
            .concat('-')
            .concat(period)
            .concat('-')
            .concat(periodIndex.toString())
    )

    if (entity == null) {
        entity = new ReferralCodeStat(
            referralId.toString()
                .concat('-')
                .concat(period)
                .concat('-')
                .concat(periodIndex.toString())
        )

        let referralCode = ReferralCode.load(referralId.toString())!

        entity.owner = referrerAddress
        entity.newReferees = 0
        entity.activeReferees = 0
        entity.fiatVolume = ZERO_BD
        entity.betCount = 0
        entity.houseProfitnLoss = ZERO_BD
        entity.period = period
        entity.periodIndex = periodIndex
        entity.referralCode = referralCode.code
    }

    if (isFirstGame) {
        entity.newReferees += 1
    }

    if (!isAlreadyActive) {
        entity.activeReferees += 1
    }

    const _payoutFiatAmount = convertTokenToDecimal(payoutFiatAmount, WETH_PAYOUT_TOKEN_DECIMALS)

    entity.fiatVolume = entity.fiatVolume.plus(fiatAmount)
    entity.betCount += 1

    if (isWin) {
        entity.houseProfitnLoss = entity.houseProfitnLoss.minus(_payoutFiatAmount.minus(fiatAmount))
    } else {
        entity.houseProfitnLoss = entity.houseProfitnLoss.plus(fiatAmount)
    }

    entity.save()
}

export function _getOrCreateReferralCodeGlobalStat(
    referralId: BigInt,
    referrerAddress: string,
    isFirstGame: boolean, // Player.isFirstGame
    isWin: boolean,
    fiatAmount: BigDecimal,
    Delta: BigDecimal,
): void {
    let entity = ReferralCodeGlobalStat.load(referralId.toString())

    if (entity == null) {
        entity = new ReferralCodeGlobalStat(referralId.toString())

        let referralCode = ReferralCode.load(referralId.toString())!

        entity.owner = referrerAddress
        entity.referees = 1
        entity.fiatVolume = ZERO_BD
        entity.betCount = 0
        entity.houseProfitnLoss = ZERO_BD
        entity.referralCode = referralCode.code
    }

    log.info('increment referees check bool {}', [isFirstGame.toString()])

    if (isFirstGame) {
        log.info('increment referees', [])
        entity.referees += 1
    }

    entity.fiatVolume = entity.fiatVolume.plus(fiatAmount)
    entity.betCount += 1


    entity.houseProfitnLoss = entity.houseProfitnLoss.plus(Delta)

    entity.save()
}

export function _getOrCreateReferrerStat(
    referrerAddress: string,
    fiatAmount: BigDecimal,
    delta: BigDecimal,
    isAlreadyActive: boolean,
    isFirstGame: boolean,
    period: string,
    periodIndex: BigInt
): void {

    let entity = ReferrerStat.load(
        referrerAddress
            .concat('-')
            .concat(period)
            .concat('-')
            .concat(periodIndex.toString())
    )

    if (entity == null) {
        entity = new ReferrerStat(
            referrerAddress
                .concat('-')
                .concat(period)
                .concat('-')
                .concat(periodIndex.toString())
        )

        entity.fiatVolume = ZERO_BD
        entity.houseProfitnLoss = ZERO_BD
        entity.betCount = 0
        entity.activeReferees = 0
        entity.newReferees = 0
        entity.period = period
        entity.periodIndex = periodIndex

    }

    if (!isAlreadyActive) {
        entity.activeReferees += 1
    }

    if (isFirstGame) {
        entity.newReferees += 1
    }


    entity.fiatVolume = entity.fiatVolume.plus(fiatAmount)
    entity.betCount += 1

    entity.houseProfitnLoss = entity.houseProfitnLoss.plus(delta)

    updateBaseCommission(entity.fiatVolume, entity.activeReferees, referrerAddress)

    entity.save()
}

export function _getOrCreateReferrerGlobalStat(
    referrerAddress: string,
    fiatAmount: BigDecimal,
    delta: BigDecimal,
    isFirstGame: boolean,
): void {

    let entity = ReferrerGlobalStat.load(
        referrerAddress
    )

    if (entity == null) {
        entity = new ReferrerGlobalStat(
            referrerAddress
        )

        entity.fiatVolume = ZERO_BD
        entity.houseProfitnLoss = ZERO_BD
        entity.betCount = 0
        entity.referees = 0

    }

    if (isFirstGame) {
        entity.referees += 1
    }


    entity.fiatVolume = entity.fiatVolume.plus(fiatAmount)
    entity.betCount += 1

    entity.houseProfitnLoss = entity.houseProfitnLoss.plus(delta)

    entity.save()
}

function updateBaseCommission(volume: BigDecimal, activeReferees: number, referrer: string): void {

    let reqVolume = BigDecimal.fromString('50')

    if (volume.ge(reqVolume) && activeReferees > 0) {
        let referralProfile = ReferralProfile.load(referrer)!

        if (referralProfile.locked == true) {
            return
        }

        referralProfile.baseCommission = BigInt.fromI32(10)
        referralProfile.save()
    }
}

export function getMultiplier(isWin: boolean, betOn: i32[], houseEdge: string, type: string): BigDecimal {

    let multiplier = 0.00

    let option = 0

    if (isWin) {

        if (type == "roulette" || type == "dice" || type == "coinflip") {
            for (let i = 0; i < betOn.length; i++) {
                if (betOn[i] != 0) {
                    option += 1
                }
            }
            // log.info("LOG: divide by zero, option {} , {} betOn {} , houseEdge{}", [option.toString(), betOn.toString(), betOn.length.toString(), (1 + parseInt(houseEdge) / 100).toString()])
            // log.info("LOG: divide by zero, numerator {} / denominator {}", [(1.00/(parseFloat(option.toString()) / parseFloat(betOn.length.toString()))).toString(), (1.00 + (parseFloat(houseEdge) / 100)).toString()])

            multiplier = (1.00 / (parseFloat(option.toString()) / parseFloat(betOn.length.toString()))) / (1.00 + (parseFloat(houseEdge) / 100))

        }

        else if (type == "rps") {
            multiplier = (1.00 / (1.00 / 3.00)) / (1.00 + (parseFloat(houseEdge) / 100))
        }

        else if (type == "fortuneroll") {
            if (betOn[0] == 0) {
                multiplier = (1.00 / (parseFloat(betOn[1].toString()) / 10000.00)) / (1.00 + (parseFloat(houseEdge) / 100))
            } else {
                multiplier = (1.00 / (parseFloat((10000.00 - betOn[1]).toString()) / 10000.00)) / (1.00 + (parseFloat(houseEdge) / 100))
            }
        }
    }


    return BigDecimal.fromString(multiplier.toString())
}

export function DeltaHousePnL(
    startValue: BigDecimal,
    endValue: BigDecimal,
    isWin: boolean
): BigDecimal {

    // Explain the logic behind the code below

    // 0 -> -100 : +0$
    // 0 -> 100 : +100$

    // 100 -> 150 : +50$
    // 100 -> 25 : -75$
    // 100 -> -200 : -100$

    // -100 -> -25 : +0$
    // -100 -> -150 : +0$
    // -100 -> 300 : +300$

    let value = ZERO_BD

    if (startValue == ZERO_BD) {
        if (isWin) { // loss for the house
            value = ZERO_BD
        } else {
            value = endValue
        }
    }

    if (startValue.gt(ZERO_BD)) {

        if (endValue.ge(startValue)) {
            value = endValue.minus(startValue)
        }

        if (endValue.lt(startValue)) {

            if (endValue.ge(ZERO_BD)) {
                value = endValue.minus(startValue)
            }

            if (endValue.lt(ZERO_BD)) {
                value = startValue.neg()
            }
        }
    }

    if (startValue.lt(ZERO_BD)) {
        if (endValue.ge(ZERO_BD)) {
            value = endValue
        }
        if (endValue.lt(ZERO_BD)) {
            value = ZERO_BD
        }
    }

    return value
}