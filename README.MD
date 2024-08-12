My Subgraph
This subgraph indexes and tracks decentralized exchange (DEX) pairs, reserves, swaps, and other relevant events on the Ethereum blockchain. It provides a convenient way to query historical and real-time data, such as reserve balances, swap transactions, and more.

Table of Contents
Overview
Getting Started
Entities
Event Handlers
Queries
Pair Details
Reserve Data
Deployment
Contributing
License
Overview
This subgraph indexes data from a DEX smart contract, capturing events such as pair creation, liquidity synchronization (Sync events), and token swaps (Swap events). It stores this data in a way that allows developers to easily query and analyze it.

Getting Started
Prerequisites
Before you begin, ensure you have the following installed:

Node.js
Yarn
Graph CLI
Installation
Clone the repository and install dependencies:

bash
Copy code
git clone https://github.com/your-repo/subgraph.git
cd subgraph
yarn install
Configuration
Update the subgraph.yaml file with the correct network, contract addresses, and event signatures. Ensure that the ABI files match the deployed contracts.

Code Structure
schema.graphql: Defines the GraphQL schema, including entities like Pair, Reserve, and Swap.
subgraph.yaml: Specifies the data sources, ABI, entities, and event handlers.
src/: Contains the TypeScript files for handling events and mapping data to entities.
Building and Deploying
Build and deploy the subgraph using the Graph CLI:

bash
Copy code
graph codegen && graph build
graph auth --studio YOUR_DEPLOY_KEY
graph deploy --studio YOUR_SUBGRAPH_NAME
Replace YOUR_DEPLOY_KEY and YOUR_SUBGRAPH_NAME with your actual deploy key and subgraph name.

Entities
Pair
Tracks details about a DEX pair, including token addresses, reserves, and metadata.

Reserve
Stores reserve data from Sync events, capturing historical balances and timestamps.

Event Handlers
handlePairCreated
Triggered when a new pair is created. Starts tracking the new pair.

handleSync
Triggered on Sync events to record reserve balances and associated metadata.

Queries
Pair Details
Fetch details about a specific pair:

graphql
Copy code
{
  pair(id: "PAIR_ID") {
    id
    tokenA
    tokenB
    totalSupply
    blockNumber
    blockTimestamp
    transactionHash
  }
}
Reserve Data
Fetch reserve data for a specific pair within a timestamp range:

graphql
Copy code
{
  reserves(
    where: {
      pair: "PAIR_ADDRESS",
      blockTimestamp_gte: "START_TIMESTAMP",
      blockTimestamp_lte: "END_TIMESTAMP"
    }
    orderBy: blockTimestamp
    orderDirection: asc
  ) {
    reserve0
    reserve1
    priceInETH
    blockNumber
    blockTimestamp
    transactionHash
  }
}

Deployment
To deploy the subgraph, follow these steps:

Ensure your subgraph is correctly configured in subgraph.yaml.

Build the subgraph:

bash
Copy code
graph build
Deploy the subgraph:

bash
Copy code
graph deploy --studio YOUR_SUBGRAPH_NAME
Replace YOUR_SUBGRAPH_NAME with your subgraph name in the Graph Studio.

Contributing
Contributions are welcome! Please open an issue or submit a pull request to contribute.

License
This project is licensed under the MIT License. See the LICENSE file for details.

This README provides an overview of the subgraph, setup instructions, and details on how to interact with the indexed data. You can modify and expand this template as needed to fit your specific project and requirements.