import { BigDecimal, BigInt, Address } from "@graphprotocol/graph-ts"

export function timestampToPeriod(timestamp: BigInt, period: string): BigInt {
    let periodTime: BigInt
  
    if (period == "daily") {
      periodTime = BigInt.fromI32(86400)
    } else if (period == "weekly") {
      periodTime = BigInt.fromI32(86400 * 7)
    } else if (period == "monthly" ){
      periodTime = BigInt.fromI32(86400 * 7 * 4)
    } else {
      throw new Error("Unsupported period " + period)
    }
  
    return timestamp.div(periodTime).times(periodTime)
  }