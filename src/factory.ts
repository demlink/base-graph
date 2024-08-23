import { PairCreated as PairCreatedEvent } from "../generated/Factory/Factory"
import { Pair as PairTemplate } from "../generated/templates";
import { Token as TokenTemplate } from "../generated/templates";
import { PairCreated, Token } from "../generated/schema"
import { ERC20 } from "../generated/templates/Pair/ERC20";

export function handlePairCreated(event: PairCreatedEvent): void {
  let entity = new PairCreated(event.params.pair.toHex())
  entity.tokenA = event.params.tokenA.toHex()
  entity.tokenB = event.params.tokenB.toHex()
  entity.pair = event.params.pair.toHex()
  entity.param3 = event.params.param3

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash.toHex()

  entity.save()

  // Start tracking the new pair by creating a dynamic data source
  PairTemplate.create(event.params.pair);

  // Optionally, create a Token entity for tokenA
  let tokenA = new Token(event.params.tokenA.toHex());
  let tokenContract = ERC20.bind(event.params.tokenA);
  tokenA.symbol = tokenContract.symbol();
  tokenA.name = tokenContract.name();
  tokenA.supply = tokenContract.totalSupply();
  tokenA.save();

  TokenTemplate.create(event.params.tokenA);
}
