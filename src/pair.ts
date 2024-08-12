import { Sync } from "../generated/Factory/Pair";
import { Reserve } from "../generated/schema";
import { BigDecimal, BigInt } from "@graphprotocol/graph-ts";

function calculatePrice(reserve0: BigInt, reserve1: BigInt): BigDecimal {
    // Convert BigInt to BigDecimal for division
    let reserve0Decimal = reserve0.toBigDecimal();
    let reserve1Decimal = reserve1.toBigDecimal();

    // Calculate price of token in terms of ETH
    let price = reserve1Decimal.div(reserve0Decimal);

    return price;
}

export function handleSync(event: Sync): void {
    let priceInETH = calculatePrice(event.params.reserve0, event.params.reserve1);
    // Create a unique ID for the Reserve entity based on the transaction hash and log index
    let id = event.transaction.hash.toHex() + "-" + event.logIndex.toString();

    // Create a new Reserve entity using the unique ID
    let reserve = new Reserve(id);

    // Set the reserve fields based on the Sync event parameters
    reserve.reserve0 = event.params.reserve0;
    reserve.reserve1 = event.params.reserve1;

    reserve.priceInETH = priceInETH;

    // Set additional metadata for the Reserve entity
    reserve.blockNumber = event.block.number;
    reserve.blockTimestamp = event.block.timestamp;
    reserve.transactionHash = event.transaction.hash.toHex();
    reserve.pair = event.address.toHex(); // Address of the Pair contract

    // Save the Reserve entity to the store
    reserve.save();
}

