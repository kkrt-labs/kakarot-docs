# Pyth

The [Pyth network](https://pyth.network/) is the largest first-party oracle network, securely and transparently delivering real-time market data to [multiple chains](https://docs.pyth.network/price-feeds/contract-addresses).

The network comprises some of the world’s [largest exchanges, market makers, and financial services providers](https://pyth.network/publishers). These publish proprietary data on-chain for aggregation and distribution to smart contract applications.

## Using Pyth network

The Pyth network introduces an innovative low-latency [pull oracle design](https://docs.pyth.network/documentation/pythnet-price-feeds/on-demand), where users can pull price updates on-chain when needed, enabling everyone in the blockchain environment to access that data point. Pyth network updates the prices every 400ms, making Pyth the fastest on-chain oracle.

Developers on Kakarot have permissionless access to any of [Pyth’s price feeds](https://pyth.network/developers/price-feed-ids) for equities, ETFs, commodities, foreign exchange pairs, and cryptocurrencies.

Here is a working example of a contract that fetches the latest price on the Kakarot network. 
You have to pass [Pyth's contract address](https://docs.pyth.network/price-feeds/contract-addresses/evm) for Kakarot network and the desired [price feed ID](https://pyth.network/developers/price-feed-ids) to fetch the latest price.

```typescript 
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "@pythnetwork/pyth-sdk-solidity/IPyth.sol";
import "@pythnetwork/pyth-sdk-solidity/PythStructs.sol";

contract MyFirstPythContract {
    IPyth pyth;

    constructor(address _pyth) {
        pyth = IPyth(_pyth);
    }

    function fetchPrice(
        bytes[] calldata updateData,
        bytes32 priceFeed
    ) public payable returns (int64) {
	// Fetch the priceUpdate from hermes.
        uint updateFee = pyth.getUpdateFee(updateData);
        pyth.updatePriceFeeds{value: updateFee}(updateData);

        // Fetch the latest price
        PythStructs.Price memory price = pyth.getPrice(priceFeed);
        return price.price;
    }
}
```
Here you can fetch the `updateData` from our [`Hermes`](https://hermes.pyth.network/docs/), which listens to Pythnet and Wormhole for price updates; or you can use the [`pyth-evm-js`](https://github.com/pyth-network/pyth-crosschain/blob/main/target_chains/ethereum/sdk/js/src/EvmPriceServiceConnection.ts#L15) SDK. Check [How to Fetch Price Updates](https://docs.pyth.network/price-feeds/fetch-price-updates) to pull the latest data. 

This [package](https://github.com/pyth-network/pyth-crosschain/tree/main/target_chains/ethereum/sdk/solidity) provides utilities for consuming prices from the Pyth network oracle using Solidity. Also, it contains the [Pyth Interface ABI](https://github.com/pyth-network/pyth-crosschain/blob/main/target_chains/ethereum/sdk/solidity/abis/IPyth.json) that you can use in your libraries to communicate with the Pyth contract.

We recommend following the [consumer best practices](https://docs.pyth.network/documentation/pythnet-price-feeds/best-practices) when consuming Pyth data.

For more information, check out the official [Pyth documentation](https://docs.pyth.network/price-feeds). There are details on the various functions available for interacting with the Pyth smart contract in the [API Reference section](https://api-reference.pyth.network/price-feeds/evm/getPrice).


## Pyth Price Feeds on Kakarot

The Pyth Network smart contract is available at the following address: 

- Kakarot Sepolia Testnet: [`0xD458261E832415CFd3BAE5E416FdF3230ce6F134`](https://sepolia.kakarotscan.org/address/0xD458261E832415CFd3BAE5E416FdF3230ce6F134)

Additionally, click to access the [Pyth price-feed IDs](https://pyth.network/developers/price-feed-ids).

## Developers and community

The Pyth network provides additional tools to developers, such as [TradingView Integration](https://docs.pyth.network/guides/how-to-create-tradingview-charts), or the [Gelato web3 functions](https://docs.pyth.network/guides/how-to-schedule-price-updates-with-gelato).  

Check out the following links to get started with Pyth.

- [Pyth EVM Integration Guide](https://docs.pyth.network/price-feeds/use-real-time-data/evm)
- [Pyth Docs](https://docs.pyth.network/home)
- [Pyth API Reference](https://api-reference.pyth.network/price-feeds/evm/getPrice)
- [Pyth Examples](https://github.com/pyth-network/pyth-examples)
- [Pyth Price Feed Ids](https://pyth.network/developers/price-feed-ids)
- [Website](https://pyth.network/)
- [Twitter](https://x.com/PythNetwork)