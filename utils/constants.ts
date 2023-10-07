import { BigInt, BigDecimal, Address } from '@graphprotocol/graph-ts'

export const ADDRESS_ZERO = '0x0000000000000000000000000000000000000000'
export const PAYOUT_TOKEN = '0x82aF49447D8a07e3bd95BD0d56f35241523fBab1'
export const USDC_PAYOUT_TOKEN_DECIMALS = BigInt.fromI32(6)
export const WETH_PAYOUT_TOKEN_DECIMALS = BigInt.fromI32(18)

export let ZERO_BI = BigInt.fromI32(0)
export let ONE_BI = BigInt.fromI32(1)
export let TWO_BI = BigInt.fromI32(2)
export let ZERO_BD = BigDecimal.fromString('0')
export let ONE_BD = BigDecimal.fromString('1')
export let STARTING_HOUSE_EDGE = BigDecimal.fromString('2.5')

export let POW_2 = BigInt.fromI32(10).pow(2)

export function exponentToBigDecimal(decimals: BigInt): BigDecimal {
    let bd = BigDecimal.fromString('1')
    for (let i = ZERO_BI; i.lt(decimals as BigInt); i = i.plus(ONE_BI)) {
      bd = bd.times(BigDecimal.fromString('10'))
    }
    return bd
  }

export function convertTokenToDecimal(tokenAmount: BigInt, exchangeDecimals: BigInt): BigDecimal {
  
if (exchangeDecimals == ZERO_BI) {
    return tokenAmount.toBigDecimal()
}
return tokenAmount.toBigDecimal().div(exponentToBigDecimal(exchangeDecimals))
}

export function convertBigDecimalTokenToDecimal(tokenAmount: BigDecimal, exchangeDecimals: BigInt): BigDecimal {
  if (exchangeDecimals == ZERO_BI) {
    return tokenAmount
}

return tokenAmount.div(exponentToBigDecimal(exchangeDecimals))
}