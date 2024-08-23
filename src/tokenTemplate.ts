import { Transfer } from "../generated/templates/Token/ERC20"
import { ERC20 } from "../generated/templates/Pair/ERC20";
import { Token, Holder } from "../generated/schema"
import { BigInt, Address } from "@graphprotocol/graph-ts"

const ZERO_ADDRESS = Address.fromString("0x0000000000000000000000000000000000000000");

// Handle Transfer event for token updates
export function handleTransfer(event: Transfer): void {
    let token = Token.load(event.address.toHex());
    if (token == null) {
        token = new Token(event.address.toHex());
        let tokenContract = ERC20.bind(event.address);
        token.symbol = tokenContract.symbol();
        token.name = tokenContract.name();
        token.supply = tokenContract.totalSupply(); // Initialize with total supply
        token.save();
    }
    // Handle normal transfer cases
    // Create or update holder for transfers from non-zero addresses
    let holderIdFrom = event.params.from.toHex();
    let holderFrom = Holder.load(holderIdFrom);
    if (holderFrom == null) {
        holderFrom = new Holder(holderIdFrom);
        holderFrom.token = event.address.toHex(); // Associate with the token contract
        holderFrom.address = event.params.from;
        holderFrom.balance = BigInt.fromI32(0); // Initialize balance
    }
    holderFrom.balance = holderFrom.balance.minus(event.params.value); // Deduct amount
    holderFrom.save();

    let holderIdTo = event.params.to.toHex();
    let holderTo = Holder.load(holderIdTo);
    if (holderTo == null) {
        holderTo = new Holder(holderIdTo);
        holderTo.token = event.address.toHex(); // Associate with the token contract
        holderTo.address = event.params.to;
        holderTo.balance = event.params.value; // Set initial balance
    } else {
        holderTo.balance = holderTo.balance.plus(event.params.value); // Update balance
    }
    holderTo.save();

}
