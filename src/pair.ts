import { Sync } from "../generated/Factory/Pair";
import { Reserve } from "../generated/schema";

export function handleSync(event: Sync): void {
  // Create a unique ID for the Reserve entity based on the transaction hash and log index
  let id = event.transaction.hash.toHex() + "-" + event.logIndex.toString();

  // Create a new Reserve entity using the unique ID
  let reserve = new Reserve(id);
  
  // Set the reserve fields based on the Sync event parameters
  reserve.reserve0 = event.params.reserve0;
  reserve.reserve1 = event.params.reserve1;
  
  // Set additional metadata for the Reserve entity
  reserve.blockNumber = event.block.number;
  reserve.blockTimestamp = event.block.timestamp;
  reserve.transactionHash = event.transaction.hash.toHex();
  reserve.pair = event.address.toHex(); // Address of the Pair contract

  // Save the Reserve entity to the store
  reserve.save();
}

