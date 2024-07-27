# Pragma Oracle

Pragma is the decentralized, transparent and composable oracle network, leveraging state-of-the-art zero-knowledge cryptography. We partner with the biggest market makers and the most liquid exchanges who sign and timestamp their own high quality, robust data and send it directly on-chain.

Our feeds are live on 🥕 Kakarot, where they leverage the power of the ZK-EVM. Our code has been audited by leading security researchers at Zellic (also audited Pyth, LayerZero, 1Inch & more) and we have more audits coming up soon.

We are currently deployed on the following addresses:

| Network | Address                                                           |
| ------- | ----------------------------------------------------------------- |
| Sepolia | 0x3a99b4b9f711002f1976b3973f4b2031fe6056518615ff0f4e6dd829f972764 |
| Mainnet | **⏳ Soon**                                                       |


# Architecture

The V1 of the Pragma Oracle consists of three smart contracts, that each play a role in making the oracle easy to use and robust.

![pragma_v1_architecture](https://i.ibb.co/xgxY55Z/Screenshot-2023-08-24-at-10-49-18.png)

The first is the Publisher Registry, which is the most static. This is designed to be updated extremely infrequently because its state should be permanent (each publisher and their address). This is currently an ownable contract but will become permissionless as Pragma decentralizes.

The second is the Oracle implementation and its proxy, which are also designed to be updated only as frequently as absolutely necessary. This is the contract which protocols use, and the one to which publishers publish. In the background, it coordinates the Publisher Registry and the Oracle contract implementation(s). The implementation contains the logic for storing and aggregating specific key/value data streams.

## Aggregation

![pragma_v1_aggregation](https://i.ibb.co/ZXmp89H/Screenshot-2023-11-21-at-10-10-30.png)

Our system incorporates multiple publishers, each responsible for providing data from various sources. To determine the price for a given source, we consider the prices submitted by all these publishers. Our approach involves conducting an initial on-chain aggregation based on the median of these prices. This median value then becomes the established price for that particular source.

This aggregation process is triggered when one of the aggregation functions is called. During this process, users have the flexibility to choose their preferred method of aggregation for the sources. This choice allows them to tailor the final price calculation according to their specific needs or criteria.

By utilizing this method of aggregation, we enhance the security of the final price determination, making it less vulnerable to manipulation, as it incorporates a broad and balanced range of data from multiple publishers.

# Consuming our Data Feeds

You can find the list of supported assets in our main documentation [here](https://docs.pragma.build/Resources/Cairo%201/data-feeds/supported-assets).

### Sample code

If you are just trying to get started with our price feeds, see the self-contained code snippets below. If you'd like to use more advanced oracle functions please see the further information below. You can find a full sample data feed consumer contract [here](https://github.com/Astraly-Labs/pragma-hack/tree/master) and the full Oracle interface specification is available [here](https://github.com/Astraly-Labs/pragma-oracle/blob/main/src/oracle/oracle.cairo).


## (Optional) Add Pragma as a dependency to your scarb/snforge project

```sh
scarb add pragma_lib --git https://github.com/astraly-labs/pragma-lib
```

## Retrieve the BTC/USD Spot Median Price

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

## SOL/USD Spot Average Price, filtered by sources

```rust
use pragma_lib::abi::{IPragmaABIDispatcher, IPragmaABIDispatcherTrait};
use pragma_lib::types::{AggregationMode, DataType, PragmaPricesResponse};
use starknet::ContractAddress;
use starknet::contract_address::contract_address_const;
use array::ArrayTrait;

const KEY: felt252 = 23449611697214276; // felt252 conversion of "SOL/USD", can also write const KEY : felt252 = 'SOL/USD'
const OKX: felt252 = 'OKX'; // felt252 conversion of "OKX"
const BINANCE: felt252 = 'BINANCE'; // felt252 conversion of "BINANCE"

fn get_asset_price_average(oracle_address: ContractAddress, asset : DataType, sources : Span<felt252>) -> u128  {
    let oracle_dispatcher = IPragmaABIDispatcher{contract_address : oracle_address};
    let output : PragmaPricesResponse= oracle_dispatcher.get_data_for_sources(asset, AggregationMode::Mean(()), sources);

    return output.price;
}

// USAGE
let oracle_address : ContractAddress = contract_address_const::<0x06df335982dddce41008e4c03f2546fa27276567b5274c7d0c1262f3c2b5d167>();

let mut sources = ArrayTrait::<felt252>::new();
sources.append(OKX);
sources.append(BINANCE);

let price = get_asset_price_average(oracle_address, DataType::SpotEntry(KEY), sources.span());
```

## BTC/USD Future Price

```rust
use pragma_lib::abi::{IPragmaABIDispatcher, IPragmaABIDispatcherTrait};
use pragma_lib::types::{AggregationMode, DataType, PragmaPricesResponse};
use starknet::ContractAddress;
use starknet::contract_address::contract_address_const;

const KEY :felt252 = 18669995996566340; // felt252 conversion of "BTC/USD", can write const KEY : felt252 = 'BTC/USD'

fn get_asset_price_median(oracle_address: ContractAddress, asset : DataType) -> u128  {
    let oracle_dispatcher = IPragmaABIDispatcher{contract_address : oracle_address};
    let output : PragmaPricesResponse= oracle_dispatcher.get_data(asset, AggregationMode::Median(()));

    return output.price;
}

// USAGE
let oracle_address : ContractAddress = contract_address_const::<0x06df335982dddce41008e4c03f2546fa27276567b5274c7d0c1262f3c2b5d167>();
let expiration_timestamp = 1691395615; //in seconds
let price = get_asset_price_median(oracle_address, DataType::FutureEntry((KEY, expiration_timestamp)));
```

# Learn more

If you want to learn more about Pragma, feel free to check our [public documentation](https://docs.pragma.build/).
