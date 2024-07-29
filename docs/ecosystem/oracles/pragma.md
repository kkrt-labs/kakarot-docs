# Pragma Oracle

Pragma is the decentralized, transparent and composable oracle network, leveraging state-of-the-art zero-knowledge cryptography. We partner with the biggest market makers and the most liquid exchanges who sign and timestamp their own high quality, robust data and send it directly on-chain.

Our data feeds are live on 🥕 Kakarot, where they leverage the power of the ZK-EVM. Our code has been audited by leading security researchers at Nethermind and we have more audits coming up soon.

We are currently deployed on the following addresses:

| Network | Cairo Address                                                     | PragmaCaller Solidity Interface                                                                                                  |
| ------- | ----------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| Sepolia | 0x3a99b4b9f711002f1976b3973f4b2031fe6056518615ff0f4e6dd829f972764 | [0x7491cA3699701a187C1a17308338Ad0bA258B082](https://sepolia.kakarotscan.org/address/0x7491cA3699701a187C1a17308338Ad0bA258B082) |
| Mainnet | **⏳ Soon**                                                        | **⏳ Soon**                                                                                                                       |

# Consuming our Data Feeds

You can get started with Pragma in just a few minutes. This guide will walk you through the process of consuming data from Pragma's oracle network, either from a Solidity or Cairo contract.

You can find the list of supported assets in our main documentation [here](https://docs.pragma.build/Resources/Cairo%201/data-feeds/supported-assets).

## Cairo

### 0. (Optional) Add Pragma as a dependency to your scarb/snforge project

```sh
scarb add pragma_lib --git https://github.com/astraly-labs/pragma-lib
```

### 1. Retrieve the BTC/USD Spot Median Price

```rust
use pragma_lib::abi::{IPragmaABIDispatcher, IPragmaABIDispatcherTrait};
use pragma_lib::types::{AggregationMode, DataType, PragmaPricesResponse};
use starknet::ContractAddress;
use starknet::contract_address::contract_address_const;

// felt252 conversion of "BTC/USD", can also write const KEY : felt252 = 'BTC/USD';
const KEY :felt252 = 18669995996566340;

fn get_asset_price_median(oracle_address: ContractAddress, asset: DataType) -> u128  {
    let oracle_dispatcher = IPragmaABIDispatcher{contract_address: oracle_address};
    let output: PragmaPricesResponse = oracle_dispatcher.get_data(asset, AggregationMode::Median(()));
    return output.price;
}

// USAGE
let oracle_address: ContractAddress = contract_address_const::<0x3a99b4b9f711002f1976b3973f4b2031fe6056518615ff0f4e6dd829f972764>();
let price = get_asset_price_median(oracle_address, DataType::SpotEntry(KEY));
```

## Solidity

The Pragma Oracle cairo contract has been whitelisted by Kakarot - thus it is possible to call it directly in your Solidity contracts using the [PragmaCaller](https://github.com/kkrt-labs/kakarot/blob/main/solidity_contracts%2Fsrc%2FCairoPrecompiles%2FPragmaCaller.sol) interface!

### 1. Define the PragmaCaller interface

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

### 2. Retrieve the BTC/USD Spot Median Price

```typescript
interface IPragmaCaller {
    // ... (include the interface definition from step 1)
}

contract MyContract {
    IPragmaCaller public pragmaCaller;
    uint256 constant BTC_USD_FEED = 18669995996566340;

    constructor(address pragmaCallerAddress) {
        pragmaCaller = IPragmaCaller(pragmaCallerAddress);
    }

    function callGetDataMedianSpot(uint256 pairId) public view returns (IPragmaCaller.PragmaPricesResponse memory) {
        IPragmaCaller.DataRequest calldata request = IPragmaCaller.DataRequest(
            IPragmaCaller.DataType.SpotEntry,
            pairId,
            0
        );
        return pragmaCaller.getDataMedianSpot(request);
    }

    function btcMedianPrice() public view returns (uint256) {
        IPragmaCaller.PragmaPricesResponse memory response = callGetDataMedianSpot(BTC_USD_FEED);
        return response.price;
    }
}
```

### Learn more

If you'd like to learn more about Pragma or use more advanced oracle functions please check our [documentation](https://docs.pragma.build/)!
