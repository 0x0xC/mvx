import { BigInt,BigDecimal, log } from "@graphprotocol/graph-ts"
import {
  Referral,
  CreateReferralCode,
  OwnershipTransferred,
  UpdateCommission,
  UpdateGame,
  UpdateReferralCodeByUser
} from "../generated/Referral/Referral"
import { 
  ReferralCode, 
  ReferralProfile,
  ReferralCodeGlobalStat,
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

export function handleCreateReferralCode(event: CreateReferralCode): void {

  let referralCode = new ReferralCode(event.params.referralId.toString())
  
  referralCode.owner = event.params.player.toHexString()
  referralCode.code = event.params.referralCode

  referralCode.save()

  let code = new Code(event.params.referralCode.toString())

  code.codeId = event.params.referralId.toI32()
  code.owner = event.params.player.toHexString()

  code.save()


  let entity = new ReferralCodeGlobalStat(event.params.referralId.toString())

  entity.owner = event.params.player.toHexString()
  entity.referees = 2
  entity.fiatVolume = ZERO_BD
  entity.betCount = 0
  entity.houseProfitnLoss = ZERO_BD
  entity.referralCode = event.params.referralCode

  entity.save()

  

  let referralProfile = ReferralProfile.load(event.params.player.toHexString())

  if (referralProfile == null) {
    referralProfile = new ReferralProfile(event.params.player.toHexString())
    referralProfile.locked = false
    referralProfile.fiatVolume = ZERO_BD
    referralProfile.baseCommission = BigInt.fromI32(5)
    referralProfile.first = true
    referralProfile.timestamp = event.block.timestamp
  }

  referralProfile.save()

  // log.info('Flow: Code {} has been created by {} with the ID: {} ',[event.params.referralCode, event.params.player.toHexString(), event.params.referralId.toString()])
}

export function handleOwnershipTransferred(event: OwnershipTransferred): void {}

export function handleUpdateCommission(event: UpdateCommission): void {
  let referralCode = ReferralCode.load(event.params.referralId.toString())!

  let referralProfile = ReferralProfile.load(referralCode.owner)!

  if (referralProfile == null) {
    referralProfile = new ReferralProfile(referralCode.owner)
    referralProfile.fiatVolume = ZERO_BD
    referralProfile.baseCommission = BigInt.fromI32(5)
    referralProfile.first = true
  }

  referralProfile.baseCommission = event.params.commission
  referralProfile.locked = true
  referralProfile.save()
}

export function handleUpdateGame(event: UpdateGame): void {}

export function handleUpdateReferralCodeByUser(
  event: UpdateReferralCodeByUser
): void {

  let code = Code.load(event.params.code)!

  if (code.owner == event.params.player.toHexString()) {
    return
  }

  let referralProfile = ReferralProfile.load(event.params.player.toHexString())!

  if (referralProfile == null) {
    referralProfile = new ReferralProfile(event.params.player.toHexString())
    referralProfile.locked = false
    referralProfile.fiatVolume = ZERO_BD
    referralProfile.baseCommission = BigInt.fromI32(5)
    referralProfile.first = true
  }
  
  referralProfile.referrerCode = event.params.code
  referralProfile.referrer = code.owner
  referralProfile.referredAt = event.block.timestamp
  
  
  referralProfile.save()
  
  // log.info('Flow: User {} has update his referralCode to {} ',[event.params.player.toHexString(), event.params.code])
}
