import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import { PairCreated } from "../generated/Factory/Factory"

export function createPairCreatedEvent(
  tokenA: Address,
  tokenB: Address,
  pair: Address,
  param3: BigInt
): PairCreated {
  let pairCreatedEvent = changetype<PairCreated>(newMockEvent())

  pairCreatedEvent.parameters = new Array()

  pairCreatedEvent.parameters.push(
    new ethereum.EventParam("tokenA", ethereum.Value.fromAddress(tokenA))
  )
  pairCreatedEvent.parameters.push(
    new ethereum.EventParam("tokenB", ethereum.Value.fromAddress(tokenB))
  )
  pairCreatedEvent.parameters.push(
    new ethereum.EventParam("pair", ethereum.Value.fromAddress(pair))
  )
  pairCreatedEvent.parameters.push(
    new ethereum.EventParam("param3", ethereum.Value.fromUnsignedBigInt(param3))
  )

  return pairCreatedEvent
}
