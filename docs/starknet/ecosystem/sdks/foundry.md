---
title: Foundry
sidebar_position: 3
---

> [Foundry](https://github.com/foundry-rs/foundry) is a development environment for Ethereum which is written in Rust

You can clone [this](https://github.com/ChiHaoLu/kakarot-foundry) template repo to begin your Kakarot journey w/ Foundry.

### Setup

You can declare a alias in `foundry.toml`:
```
[profile.default]
src = "src"
out = "out"
libs = ["lib"]
evm_version = 'cancun' # Kakarot supports `PUSH0`, `TLOAD` / `TSTORE`...

[rpc_endpoints]
kakarot_starknet_sepolia = "https://sepolia-rpc.kakarot.org"
```

### Fork Testing

```shell
$ forge test --fork-url "https://sepolia-rpc.kakarot.org"
# or $ forge test --fork-url kakarot_starknet_sepolia
```

### Config Setting

```
[rpc_endpoints]
kakarot_starknet_sepolia = "https://sepolia-rpc.kakarot.org"

[etherscan]
kakarot_starknet_sepolia = { key = "kakarot_starknet_sepolia", chain = 920637907288165, url = "https://api.routescan.io/v2/network/testnet/evm/920637907288165/etherscan" }

```

### Deployment

You can use the deploy script to deploy contract:

```shell
$ forge script ./script/Deploy.s.sol --broadcast --rpc-url "https://sepolia-rpc.kakarot.org"
# or $ forge script ./script/Deploy.s.sol --broadcast --rpc-url kakarot_starknet_sepolia
```

or directly use the [forge command](https://book.getfoundry.sh/reference/forge/forge-create):
```shell
$ forge create <path-to-contract>:<contract-name> --rpc-url "https://sepolia-rpc.kakarot.org" --private-key <your_private_key>
# or $ forge create <path-to-contract>:<contract-name> --rpc-url kakarot_starknet_sepolia --private-key <your_private_key>
```

### Verify

Please make sure your optimizer, solidity version, contract path and address are all correct.

Use the [forge command](https://book.getfoundry.sh/reference/forge/forge-verify-contract) to verify your contract:

```
$ forge verify-contract <your_contract_address> <path-to-contract>:<contract-name> \
--verifier-url 'https://api.routescan.io/v2/network/testnet/evm/920637907288165/etherscan' \
--etherscan-api-key "kakarot_starknet_sepolia" \
--num-of-optimizations 200 \
--compiler-version "v0.8.26+commit.8a97fa7a"
```
