import { BigInt } from "@graphprotocol/graph-ts"
import {
  Bank,
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
import {  } from "../generated/schema"

export function handleClearFunds(event: ClearFunds): void {
}

export function handleDeposit(event: Deposit): void {}

export function handleEmergencyHaltGame(event: EmergencyHaltGame): void {}

export function handleMaxWinChanged(event: MaxWinChanged): void {}

export function handleOwnershipTransferred(event: OwnershipTransferred): void {}

export function handlePayFunds(event: PayFunds): void {}

export function handleReserveFunds(event: ReserveFunds): void {}

export function handleUpdateGames(event: UpdateGames): void {}

export function handleUpdateGuardian(event: UpdateGuardian): void {}

export function handleUpdateUser(event: UpdateUser): void {}

export function handleWithdraw(event: Withdraw): void {}
