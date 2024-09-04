# Pragma Oracle

Pragma is the decentralized, transparent and composable oracle network, leveraging state-of-the-art zero-knowledge cryptography. We partner with the biggest market makers and the most liquid exchanges who sign and timestamp their own high quality, robust data and send it directly on-chain.

Our data feeds are live on 🥕 Kakarot, where they leverage the power of the ZK-EVM. Our code has been audited by leading security researchers at Nethermind and we have more audits coming up soon.

We are currently deployed on the following addresses:

| Network         | PragmaCaller Solidity Contract                                                                                                   | Native Starknet Address (ignore if you're an EVM developer)       |
| --------------- | -------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------- |
| Kakarot Sepolia | [0x7491cA3699701a187C1a17308338Ad0bA258B082](https://sepolia.kakarotscan.org/address/0x7491cA3699701a187C1a17308338Ad0bA258B082) | 0x3a99b4b9f711002f1976b3973f4b2031fe6056518615ff0f4e6dd829f972764 |
| Kakarot Mainnet | **⏳ Soon**                                                                                                                       | **⏳ Soon**                                                        |

# Consuming our Data Feeds

You can get started with Pragma in just a few minutes. This guide will walk you through the process of consuming data from Pragma's oracle network.

## Solidity

To use our Price feeds, you have two choices:

## 1. Use our port of the `ChainlinkAggregatorV3` interface

If you already have an existing process working with Chainlink data feeds, you can use our `PragmaAggregatorV3` interfaces (under the hood, it calls the `PragmaCaller`).

The list of supported assets is:

| Ticker     | Pair ID                  | Decimals | Kakarot Sepolia                                                                                                                  | Kakarot Mainnet |
| ---------- | ------------------------ | -------- | -------------------------------------------------------------------------------------------------------------------------------- | --------------- |
| BTC/USD    | 18669995996566340        | 8        | [0x5a3d161e5c63511F97F51fbF366B8238Cd0bBeAc](https://sepolia.kakarotscan.org/address/0x5a3d161e5c63511F97F51fbF366B8238Cd0bBeAc) | **⏳ Soon**      |
| ETH/USD    | 19514442401534788        | 8        | [0x3899D87a02eFaB864C9306DCd2EDe06B90f28B14](https://sepolia.kakarotscan.org/address/0x3899D87a02eFaB864C9306DCd2EDe06B90f28B14) | **⏳ Soon**      |
| WBTC/USD   | 6287680677296296772      | 8        | [0x330ec0B08B74a4F34Fd76B0917A55169885624Be](https://sepolia.kakarotscan.org/address/0x330ec0B08B74a4F34Fd76B0917A55169885624Be) | **⏳ Soon**      |
| USDC/USD   | 6148332971638477636      | 6        | [0xcD025F607AdB9542B77C69A29B7b9Aa32Bf06811](https://sepolia.kakarotscan.org/address/0xcD025F607AdB9542B77C69A29B7b9Aa32Bf06811) | **⏳ Soon**      |
| USDT/USD   | 6148333044652921668      | 6        | [0x4604A5b10818638F751829A580362eD5a42b9E5E](https://sepolia.kakarotscan.org/address/0x4604A5b10818638F751829A580362eD5a42b9E5E) | **⏳ Soon**      |
| WSTETH/USD | 412383036120118613857092 | 8        | [0xa3C78F0fd24523d1D5A70e47086343A445976911](https://sepolia.kakarotscan.org/address/0xa3C78F0fd24523d1D5A70e47086343A445976911) | **⏳ Soon**      |
| STRK/USD   | 6004514686061859652      | 8        | [0x52880cAe955C88546134e7394B4305c2fA79faB8](https://sepolia.kakarotscan.org/address/0x52880cAe955C88546134e7394B4305c2fA79faB8) | **⏳ Soon**      |

#### 1. Define the PragmaAggregator interface

```typescript
interface IPragmaAggregatorV3 {
    function latestRoundData() external view returns (
        uint80 roundId,
        int256 answer,
        uint256 startedAt,
        uint256 updatedAt,
        uint80 answeredInRound
    );
}
```

#### 2. Retrieve the BTC/USD Spot Median Price

```typescript
contract PragmaDataConsumer {
    IPragmaAggregatorV3 internal dataFeed;

    constructor() {
        dataFeed = IPragmaAggregatorV3(
            0x5a3d161e5c63511F97F51fbF366B8238Cd0bBeAc // BTC/USD Pragma Interface
        );
    }

    function getPragmaDataFeedLatestPrice() public view returns (int256) {
        (
            /* uint80 roundID */,
            int256 price,
            /*uint256 startedAt*/,
            /*uint256 timeStamp*/,
            /*uint80 answeredInRound*/
        ) = dataFeed.latestRoundData();
        return price;
    }
}
```

## 2. Directly call the `PragmaCaller`

The Pragma Oracle cairo contract has been integrated by Kakarot - thus it is possible to call it directly in your Solidity contracts using the [PragmaCaller](https://github.com/kkrt-labs/kakarot/blob/main/solidity_contracts%2Fsrc%2FCairoPrecompiles%2FPragmaCaller.sol) interface!

The complete list of [supported assets](https://docs.pragma.build/Resources/Starknet/data-feeds/supported-assets) can be found in our documentation: just grab the pair id and you're good to go!

#### 1. Define the PragmaCaller interface

```typescript
interface IPragmaCaller {
    enum DataType {
        SpotEntry,
        FuturesEntry,
        GenericEntry
    }

    struct DataRequest {
        DataType dataType;
        uint256 pairId;
        uint256 expirationTimestamp;
    }

    struct PragmaPricesResponse {
        uint256 price;
        uint256 decimals;
        uint256 last_updated_timestamp;
        uint256 num_sources_aggregated;
        uint256 maybe_expiration_timestamp;
    }

    function getDataMedianSpot(DataRequest memory request) external view returns (PragmaPricesResponse memory);
}
```

#### 2. Retrieve the BTC/USD Spot Median Price

```typescript
interface IPragmaCaller {
    // ... (include the interface definition from step 1)
}

contract CallerExample {
    IPragmaCaller private pragmaCaller;
    // ascii conversion of "BTC/USD";
    uint256 constant BTC_USD_FEED = 18669995996566340;

    constructor(address pragmaCallerAddress) {
        pragmaCaller = IPragmaCaller(pragmaCallerAddress);
    }

    function getDataMedianSpot(uint256 pairId) public view returns (IPragmaCaller.PragmaPricesResponse memory) {
        IPragmaCaller.DataRequest memory request = IPragmaCaller.DataRequest(
            IPragmaCaller.DataType.SpotEntry,
            pairId,
            0
        );
        return pragmaCaller.getDataMedianSpot(request);
    }

    function getBtcMedianPrice() public view returns (uint256) {
        IPragmaCaller.PragmaPricesResponse memory response = getDataMedianSpot(BTC_USD_FEED);
        return response.price;
    }
}
```

An example has been deployed [here](https://sepolia.kakarotscan.org/address/0x9acb5dbE6B9E3569f4Ab8b4bf8E09F7efC330A26).

### Learn more

If you'd like to learn more about Pragma or use more advanced oracle functions please check our [documentation](https://docs.pragma.build/)!
