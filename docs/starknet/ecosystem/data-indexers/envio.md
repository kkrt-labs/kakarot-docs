---
title: Envio
sidebar_position: 3
---

Envio is a modern, multi-chain EVM blockchain indexing framework speed-optimized for querying real-time and historical data.

### Understanding Envio

#### Envio HyperIndex

Envio [HyperIndex](https://docs.envio.dev/docs/overview) is a feature-rich indexing solution that provides Kakarot Starknet projects with a seamless and efficient way to index and aggregate real-time or historical blockchain data. The indexed data is easily accessible through custom GraphQL queries, giving developers the flexibility and power to retrieve specific information for their blockchain application.

Envio offers native support for Kakarot Starknet networks and has been designed to support high-throughput blockchain applications that rely on real-time data for their business requirements.

Designed to optimize the developer experience, Envio offers automatic code generation, flexible language support, quickstart templates, and a reliable cost-effective [hosted service](https://docs.envio.dev/docs/hosted-service). Indexers on Envio can be written in JavaScript, TypeScript, or ReScript.

#### Envio HyperSync

Envio [HyperSync](https://docs.envio.dev/docs/overview-hypersync) is adding support on Kakarot Starknet Sepolia and to-be Kakarot Starknet mainnet. 

HyperSync is a real-time data query layer for Kakarot Starknet, providing APIs that bypass traditional JSON-RPC for up to 1000x faster syncing of historical data. HyperSync is used by default in Envio's indexing framework (HyperIndex), with RPC being optional for data retrieval. 

Using HyperSync, Kakarot Starknet projects do not need to worry about RPC URLs, rate-limiting, or managing their infrastructure - and can easily sync large datasets in a few minutes, something that would usually take hours or days using traditional indexing solutions. 

HyperSync is also available as a standalone API for data analytic use cases. Data analysts can interact with the HyperSync API using JavaScript, Python, or Rust clients and extract data in JSON, Arrow, or Parquet formats.

## Getting Started

Developers can choose to start from a template (e.g. Blank, ERC-20, etc.), or use the Contract Import feature when running the `envio init` command. Make sure you have installed the Envio CLI following the [installation guide](https://docs.envio.dev/docs/getting-started). 

The [Contract Import](https://docs.envio.dev/docs/contract-import) feature is a quickstart that allows Kakarot ZK-EVM developers to quickly autogenerate the key boilerplate for an entire indexer project off single or multiple smart contracts, and easily create a basic indexer and a custom API for their blockchain application within a few minutes.

**Envio Indexer Examples**

Click [here](https://docs.envio.dev/docs/example-uniswap-v3) for Indexer examples.

**Getting support**

Indexing can be a rollercoaster, especially for more complex use cases. The Envio engineers are available to help you with your data availability needs.

* [Discord](https://discord.gg/mZHNWgNCAc)
* Email: [hello@envio.dev](mailto:hello@envio.dev)

