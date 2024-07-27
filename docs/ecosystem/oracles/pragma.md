# Pragma Oracle

Pragma is the decentralized, transparent and composable oracle network, leveraging state-of-the-art zero-knowledge cryptography. We partner with the biggest market makers and the most liquid exchanges who sign and timestamp their own high quality, robust data and send it directly on-chain.

Our data feeds are live on 🥕 Kakarot, where they leverage the power of the ZK-EVM. Our code has been audited by leading security researchers at Zellic (also audited Pyth, LayerZero, 1Inch & more) and we have more audits coming up soon.

We are currently deployed on the following addresses:

| Network | Address                                                           |
| ------- | ----------------------------------------------------------------- |
| Sepolia | 0x3a99b4b9f711002f1976b3973f4b2031fe6056518615ff0f4e6dd829f972764 |
| Mainnet | **⏳ Soon**                                                       |

# Consuming our Data Feeds

You can get started with Pragma in just a few minutes. This guide will walk you through the process of consuming data from Pragma's oracle network, either from a Solidity or Cairo contract.

You can find the list of supported assets in our main documentation [here](https://docs.pragma.build/Resources/Cairo%201/data-feeds/supported-assets).

## Solidity

TODO...

## Cairo

#### 0. (Optional) Add Pragma as a dependency to your scarb/snforge project

```sh
scarb add pragma_lib --git https://github.com/astraly-labs/pragma-lib
```

#### 1. Retrieve the BTC/USD Spot Median Price

```rust
use pragma_lib::abi::{IPragmaABIDispatcher, IPragmaABIDispatcherTrait};
use pragma_lib::types::{AggregationMode, DataType, PragmaPricesResponse};
use starknet::ContractAddress;
use starknet::contract_address::contract_address_const;

// felt252 conversion of "BTC/USD", can also write const KEY : felt252 = 'BTC/USD';
const KEY :felt252 = 18669995996566340;

fn get_asset_price_median(oracle_address: ContractAddress, asset : DataType) -> u128  {
    let oracle_dispatcher = IPragmaABIDispatcher{contract_address : oracle_address};
    let output : PragmaPricesResponse= oracle_dispatcher.get_data(asset, AggregationMode::Median(()));
    return output.price;
}

// USAGE
let oracle_address : ContractAddress = contract_address_const::<0x3a99b4b9f711002f1976b3973f4b2031fe6056518615ff0f4e6dd829f972764>();
let price = get_asset_price_median(oracle_address, DataType::SpotEntry(KEY));
```

### Learn more

If you'd like to learn more about Pragma or use more advanced oracle functions please check our [documentation](https://docs.pragma.build/)!
