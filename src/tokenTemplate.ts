import { Transfer } from "../generated/templates/Token/ERC20"
import { Token, Holder } from "../generated/schema"
import { BigInt, BigDecimal, log } from "@graphprotocol/graph-ts"

// Handle Transfer event for token updates
export function handleTransfer(event: Transfer): void {
    // Load the token entity to get the total supply
    let token = Token.load(event.address.toHex());
    if (token == null) {
        log.warning("Token not found for address {}", [event.address.toHex()]);
        return;
    }

    let totalSupply = token.supply.toBigDecimal();

    let holderIdFrom = event.params.from.toHex() + "-" + event.address.toHex();
    let holderFrom = Holder.load(holderIdFrom);
    if (holderFrom == null) {
        holderFrom = new Holder(holderIdFrom);
        holderFrom.token = event.address.toHex(); // Associate with the token contract
        holderFrom.address = event.params.from;
        holderFrom.balance = BigInt.fromI32(0); // Initialize balance
        holderFrom.percentage = BigDecimal.fromString("0"); // Initialize balance
    } else{
        holderFrom.balance = holderFrom.balance.minus(event.params.value); // Deduct amount
        holderFrom.percentage = holderFrom.balance
            .toBigDecimal()
            .div(totalSupply)
            .times(BigDecimal.fromString("100"))
            .truncate(5);
    }
    holderFrom.save();

    let holderIdTo = event.params.to.toHex() + "-" + event.address.toHex();
    let holderTo = Holder.load(holderIdTo);
    if (holderTo == null) {
        holderTo = new Holder(holderIdTo);
        holderTo.token = event.address.toHex(); // Associate with the token contract
        holderTo.address = event.params.to;
        holderTo.balance = event.params.value; // Set initial balance
        holderTo.percentage = holderTo.balance
        .toBigDecimal()
        .div(totalSupply)
        .times(BigDecimal.fromString("100"));
    } else {
        holderTo.balance = holderTo.balance.plus(event.params.value); // Update balance
        holderTo.percentage = holderTo.balance
        .toBigDecimal()
        .div(totalSupply)
        .times(BigDecimal.fromString("100"))
        .truncate(5);
    }
    holderTo.save();
}
