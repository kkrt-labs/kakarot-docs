# Pragma Oracle

Pragma is the decentralized, transparent and composable oracle network,
leveraging state-of-the-art zero-knowledge cryptography. We partner with the
biggest market makers and the most liquid exchanges who sign and timestamp their
own high quality, robust data and send it directly on-chain.

Our data feeds are live on 🥕 Kakarot, where they leverage the power of the
ZK-EVM. Our code has been audited by leading security researchers at Nethermind
and we have more audits coming up soon.

We are currently deployed on the following addresses:

| Network                  | PragmaCaller Solidity Contract                                                                                                   | Native Starknet Address (ignore if you're an EVM developer)       |
| ------------------------ | -------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------- |
| Kakarot Starknet Sepolia | [0x874C3C6299E2166DE37838a8F15f52952b25f186](https://sepolia.kakarotscan.org/address/0x874C3C6299E2166DE37838a8F15f52952b25f186) | 0x36031daa264c24520b11d93af622c848b2499b66b41d611bac95e13cfca131a |
| Kakarot Mainnet          | **⏳ Soon**                                                                                                                       | **⏳ Soon**                                                        |

## Consuming our Data Feeds

You can get started with Pragma in just a few minutes. This guide will walk you
through the process of consuming data from Pragma's oracle network.

To use our Price feeds, you have two choices:

### Use our port of the `ChainlinkAggregatorV3` interface

If you already have an existing process working with Chainlink data feeds, you
can use our `PragmaAggregatorV3` interfaces (under the hood, it calls the
`PragmaCaller`).

The list of supported assets is:

| Ticker     | Pair ID                  | Decimals | Kakarot Starknet Sepolia                                                                                                         | Kakarot Mainnet |
| ---------- | ------------------------ | -------- | -------------------------------------------------------------------------------------------------------------------------------- | --------------- |
| BTC/USD    | 18669995996566340        | 8        | [0x9999bcA6284AD4A0503E93ae418566786d52C0f8](https://sepolia.kakarotscan.org/address/0x9999bcA6284AD4A0503E93ae418566786d52C0f8) | **⏳ Soon**      |
| ETH/USD    | 19514442401534788        | 8        | [0xbDF3294C51ADD204ef06F1d2C2d11d4aa94725f8](https://sepolia.kakarotscan.org/address/0xbDF3294C51ADD204ef06F1d2C2d11d4aa94725f8) | **⏳ Soon**      |
| WBTC/USD   | 6287680677296296772      | 8        | [0x8Ca18fAB3D3e6e12236599a5604ef0D918f468D7](https://sepolia.kakarotscan.org/address/0x8Ca18fAB3D3e6e12236599a5604ef0D918f468D7) | **⏳ Soon**      |
| USDC/USD   | 6148332971638477636      | 6        | [0x3DE32d3Be34315b1De89C2108bCebf2771B1aC61](https://sepolia.kakarotscan.org/address/0x3DE32d3Be34315b1De89C2108bCebf2771B1aC61) | **⏳ Soon**      |
| USDT/USD   | 6148333044652921668      | 6        | [0x98629B2B14E21248e99906A04B923eA5ae8B3Cc5](https://sepolia.kakarotscan.org/address/0x98629B2B14E21248e99906A04B923eA5ae8B3Cc5) | **⏳ Soon**      |
| WSTETH/USD | 412383036120118613857092 | 8        | [0x5E412799a9B3ABa0f098768bDbbC70AdA94195e5](https://sepolia.kakarotscan.org/address/0x5E412799a9B3ABa0f098768bDbbC70AdA94195e5) | **⏳ Soon**      |
| STRK/USD   | 6004514686061859652      | 8        | [0x3634ae539bFA68c055C8A714438542766f14D192](https://sepolia.kakarotscan.org/address/0x3634ae539bFA68c055C8A714438542766f14D192) | **⏳ Soon**      |
| UNI/USD    | 24011449254105924        | 8        | [0x31C73089f62c6Fc41ea59feA34E927DDB9Ee93fb](https://sepolia.kakarotscan.org/address/0x31C73089f62c6Fc41ea59feA34E927DDB9Ee93fb) | **⏳ Soon**      |
| EKUBO/USD  | 1278253658919688033092   | 8        | [0x9fC4779897AEDe45B8Bf74669EDCD4038163565b](https://sepolia.kakarotscan.org/address/0x9fC4779897AEDe45B8Bf74669EDCD4038163565b) | **⏳ Soon**      |
| LORDS/USD  | 1407668255603079598916   | 8        | [0x27ae6f192E8d97Cd37922FFB83789e000A5A18Ce](https://sepolia.kakarotscan.org/address/0x27ae6f192E8d97Cd37922FFB83789e000A5A18Ce) | **⏳ Soon**      |

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
            0x9999bcA6284AD4A0503E93ae418566786d52C0f8 // BTC/USD Chainlink Interface contract
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

### Directly call the `PragmaCaller`

The Pragma Oracle cairo contract has been integrated by Kakarot - thus it is
possible to call it directly in your Solidity contracts using the
[PragmaCaller](https://github.com/kkrt-labs/kakarot/blob/main/solidity_contracts/src/CairoPrecompiles/PragmaCaller.sol)
interface!

The complete list of
[supported assets](https://docs.pragma.build/Resources/Starknet/data-feeds/supported-assets)
can be found in our documentation: just grab the pair id and you're good to go!

#### 1. Define the PragmaCaller interface

```typescript
interface IPragmaCaller {
    enum AggregationMode {
        Median,
        Mean
    }
    enum DataType {
        SpotEntry,
        FuturesEntry,
        GenericEntry
    }

    struct PragmaPricesRequest {
        AggregationMode aggregationMode;
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
    }}

    function getData(
        PragmaPricesRequest memory request
    ) external view returns (PragmaPricesResponse memory);
}
```

#### 2.A Retrieve the BTC/USD Spot Median Price

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

    function getDataMedianSpot(
        uint256 pairId
    ) public view returns (IPragmaCaller.PragmaPricesResponse memory) {
        IPragmaCaller.PragmaPricesRequest memory request = IPragmaCaller
            .PragmaPricesRequest(
                IPragmaCaller.AggregationMode.Median,
                IPragmaCaller.DataType.SpotEntry,
                pairId,
                0
            );
        return pragmaCaller.getData(request);
    }

    function getBtcSpotMedianPrice()
        public
        view
        returns (IPragmaCaller.PragmaPricesResponse memory)
    {
        return getDataMedianSpot(BTC_USD_FEED);
    }
}
```

#### 2.B Compute the volatility of BTC/USD over the last week

The `PragmaCaller` also allow you to call Pragma's
[Computational Feeds](https://docs.pragma.build/v1/Resources/computational-feeds/what-are-computational-feeds).

For example, here is how you could compute the volatility of BTC/USD:

```typescript
interface IPragmaCaller {
    struct PragmaCalculateVolatilityRequest {
        DataType dataType;
        uint256 pairId;
        uint256 expirationTimestamp;
        uint64 startTimestamp;
        uint64 endTimestamp;
        uint64 numSamples;
        AggregationMode aggregationMode;
    }

    struct PragmaSummaryStatsResponse {
        uint256 price;
        uint256 decimals;
    }

     function calculateVolatility(
        PragmaCalculateVolatilityRequest memory request
    ) external view returns (PragmaSummaryStatsResponse memory);
}

contract CallerExample {
    IPragmaCaller private pragmaCaller;
    // ascii conversion of "BTC/USD";
    uint256 constant BTC_USD_FEED = 18669995996566340;
    uint64 constant SECONDS_IN_ONE_WEEK = 604800;
    uint64 constant CALCULATE_VOL_NUM_SAMPLES = 200;

    constructor(address pragmaCallerAddress) {
        pragmaCaller = IPragmaCaller(pragmaCallerAddress);
    }

    function getVolatilyOverLastWeek(
        uint256 pairId
    ) public view returns (IPragmaCaller.PragmaSummaryStatsResponse memory) {
        uint64 blockTimestamp = uint64(block.timestamp);

        IPragmaCaller.PragmaCalculateVolatilityRequest
            memory request = IPragmaCaller.PragmaCalculateVolatilityRequest(
                IPragmaCaller.DataType.SpotEntry,
                pairId,
                0,
                blockTimestamp - SECONDS_IN_ONE_WEEK,
                blockTimestamp,
                CALCULATE_VOL_NUM_SAMPLES,
                IPragmaCaller.AggregationMode.Median
            );
        return pragmaCaller.calculateVolatility(request);
    }

    function getBtcVolatilyOverLastWeek()
        public
        view
        returns (IPragmaCaller.PragmaSummaryStatsResponse memory)
    {
        uint64 blockTimestamp = uint64(block.timestamp);

        IPragmaCaller.PragmaCalculateVolatilityRequest
            memory request = IPragmaCaller.PragmaCalculateVolatilityRequest(
                IPragmaCaller.DataType.SpotEntry,
                BTC_USD_FEED,
                0,
                blockTimestamp - SECONDS_IN_ONE_WEEK,
                blockTimestamp,
                CALCULATE_VOL_NUM_SAMPLES,
                IPragmaCaller.AggregationMode.Median
            );
        return pragmaCaller.calculateVolatility(request);
    }
}
```

Similarly, you can also use the functions:
* `calculateMean`,
* `calculateTwap`.

You can find the full example [here](https://github.com/astraly-labs/pragma-oracle/blob/main/kakarot-evm-interface/src/CallerExample.sol).

An example with has been deployed
[here](https://sepolia.kakarotscan.org/address/0x3899D87a02eFaB864C9306DCd2EDe06B90f28B14).

### Learn more

If you'd like to learn more about Pragma or use more advanced oracle functions
please check our [documentation](https://docs.pragma.build/)!
