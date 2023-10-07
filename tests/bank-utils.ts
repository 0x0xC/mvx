import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  ClearFunds,
  Deposit,
  EmergencyHaltGame,
  MaxWinChanged,
  OwnershipTransferred,
  PayFunds,
  ReserveFunds,
  UpdateGames,
  UpdateGuardian,
  UpdateUser,
  Withdraw
} from "../generated/Bank/Bank"

export function createClearFundsEvent(
  game: Address,
  amount: BigInt
): ClearFunds {
  let clearFundsEvent = changetype<ClearFunds>(newMockEvent())

  clearFundsEvent.parameters = new Array()

  clearFundsEvent.parameters.push(
    new ethereum.EventParam("game", ethereum.Value.fromAddress(game))
  )
  clearFundsEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return clearFundsEvent
}

export function createDepositEvent(
  user: Address,
  amount: BigInt,
  receivedShares: BigInt
): Deposit {
  let depositEvent = changetype<Deposit>(newMockEvent())

  depositEvent.parameters = new Array()

  depositEvent.parameters.push(
    new ethereum.EventParam("user", ethereum.Value.fromAddress(user))
  )
  depositEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )
  depositEvent.parameters.push(
    new ethereum.EventParam(
      "receivedShares",
      ethereum.Value.fromUnsignedBigInt(receivedShares)
    )
  )

  return depositEvent
}

export function createEmergencyHaltGameEvent(
  gameAddress: Address
): EmergencyHaltGame {
  let emergencyHaltGameEvent = changetype<EmergencyHaltGame>(newMockEvent())

  emergencyHaltGameEvent.parameters = new Array()

  emergencyHaltGameEvent.parameters.push(
    new ethereum.EventParam(
      "gameAddress",
      ethereum.Value.fromAddress(gameAddress)
    )
  )

  return emergencyHaltGameEvent
}

export function createMaxWinChangedEvent(
  oldMax: BigInt,
  newMax: BigInt
): MaxWinChanged {
  let maxWinChangedEvent = changetype<MaxWinChanged>(newMockEvent())

  maxWinChangedEvent.parameters = new Array()

  maxWinChangedEvent.parameters.push(
    new ethereum.EventParam("oldMax", ethereum.Value.fromUnsignedBigInt(oldMax))
  )
  maxWinChangedEvent.parameters.push(
    new ethereum.EventParam("newMax", ethereum.Value.fromUnsignedBigInt(newMax))
  )

  return maxWinChangedEvent
}

export function createOwnershipTransferredEvent(
  previousOwner: Address,
  newOwner: Address
): OwnershipTransferred {
  let ownershipTransferredEvent = changetype<OwnershipTransferred>(
    newMockEvent()
  )

  ownershipTransferredEvent.parameters = new Array()

  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam(
      "previousOwner",
      ethereum.Value.fromAddress(previousOwner)
    )
  )
  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam("newOwner", ethereum.Value.fromAddress(newOwner))
  )

  return ownershipTransferredEvent
}

export function createPayFundsEvent(
  game: Address,
  recipient: Address,
  amount: BigInt
): PayFunds {
  let payFundsEvent = changetype<PayFunds>(newMockEvent())

  payFundsEvent.parameters = new Array()

  payFundsEvent.parameters.push(
    new ethereum.EventParam("game", ethereum.Value.fromAddress(game))
  )
  payFundsEvent.parameters.push(
    new ethereum.EventParam("recipient", ethereum.Value.fromAddress(recipient))
  )
  payFundsEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return payFundsEvent
}

export function createReserveFundsEvent(
  game: Address,
  amount: BigInt
): ReserveFunds {
  let reserveFundsEvent = changetype<ReserveFunds>(newMockEvent())

  reserveFundsEvent.parameters = new Array()

  reserveFundsEvent.parameters.push(
    new ethereum.EventParam("game", ethereum.Value.fromAddress(game))
  )
  reserveFundsEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return reserveFundsEvent
}

export function createUpdateGamesEvent(
  contractAddress: Address,
  state: boolean
): UpdateGames {
  let updateGamesEvent = changetype<UpdateGames>(newMockEvent())

  updateGamesEvent.parameters = new Array()

  updateGamesEvent.parameters.push(
    new ethereum.EventParam(
      "contractAddress",
      ethereum.Value.fromAddress(contractAddress)
    )
  )
  updateGamesEvent.parameters.push(
    new ethereum.EventParam("state", ethereum.Value.fromBoolean(state))
  )

  return updateGamesEvent
}

export function createUpdateGuardianEvent(
  guardianAddress: Address,
  state: boolean
): UpdateGuardian {
  let updateGuardianEvent = changetype<UpdateGuardian>(newMockEvent())

  updateGuardianEvent.parameters = new Array()

  updateGuardianEvent.parameters.push(
    new ethereum.EventParam(
      "guardianAddress",
      ethereum.Value.fromAddress(guardianAddress)
    )
  )
  updateGuardianEvent.parameters.push(
    new ethereum.EventParam("state", ethereum.Value.fromBoolean(state))
  )

  return updateGuardianEvent
}

export function createUpdateUserEvent(
  user: Address,
  state: boolean
): UpdateUser {
  let updateUserEvent = changetype<UpdateUser>(newMockEvent())

  updateUserEvent.parameters = new Array()

  updateUserEvent.parameters.push(
    new ethereum.EventParam("user", ethereum.Value.fromAddress(user))
  )
  updateUserEvent.parameters.push(
    new ethereum.EventParam("state", ethereum.Value.fromBoolean(state))
  )

  return updateUserEvent
}

export function createWithdrawEvent(
  user: Address,
  shares: BigInt,
  receivedUnderlying: BigInt
): Withdraw {
  let withdrawEvent = changetype<Withdraw>(newMockEvent())

  withdrawEvent.parameters = new Array()

  withdrawEvent.parameters.push(
    new ethereum.EventParam("user", ethereum.Value.fromAddress(user))
  )
  withdrawEvent.parameters.push(
    new ethereum.EventParam("shares", ethereum.Value.fromUnsignedBigInt(shares))
  )
  withdrawEvent.parameters.push(
    new ethereum.EventParam(
      "receivedUnderlying",
      ethereum.Value.fromUnsignedBigInt(receivedUnderlying)
    )
  )

  return withdrawEvent
}
