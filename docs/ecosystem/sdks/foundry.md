---
title: Foundry
sidebar_position: 3
---

> [Foundry](https://github.com/foundry-rs/foundry) is a development environment for Ethereum which is wriiten in Rust

You can clone [this](https://github.com/ChiHaoLu/kakarot-foundry) template repo to begin your Kakarot journey w/ Foundry.

### Setup

You can declare a alias in `foundry.toml`:
```
[profile.default]
src = "src"
out = "out"
libs = ["lib"]
evm_version = 'shanghai' # Kakarot Sepolia supports `PUSH0`

[rpc_endpoints]
kakarot_sepolia = "https://sepolia-rpc.kakarot.org"
```

### Fork Testing

```shell
$ forge test --fork-url "https://sepolia-rpc.kakarot.org"
# or $ forge test --fork-url kakarot_sepolia
```

### Deployment

You can use the deploy script to deploy contract:

```shell
$ forge script ./script/Deploy.s.sol --broadcast --rpc-url "https://sepolia-rpc.kakarot.org"
# or $ forge script ./script/Deploy.s.sol --broadcast --rpc-url kakarot_sepolia
```

or directly use the [forge command](https://book.getfoundry.sh/reference/forge/forge-create):
```shell
$ forge create <path-to-contract>:<contract-name> --rpc-url "https://sepolia-rpc.kakarot.org" --private-key <your_private_key>
# or $ forge create <path-to-contract>:<contract-name> --rpc-url kakarot_sepolia --private-key <your_private_key>
```

### Verify

Please make sure your optimizer, solidity version, contract path and address are all correct.

Use the [forge command](https://book.getfoundry.sh/reference/forge/forge-verify-contract) to verify your contract:

```
$ forge verify-contract <your_contract_address> <path-to-contract>:<contract-name> \
--verifier-url 'https://api.routescan.io/v2/network/testnet/evm/1802203764_2/etherscan' \
--etherscan-api-key "kakarot_sepolia" \
--num-of-optimizations 200 \
--compiler-version "v0.8.26+commit.8a97fa7a"
>
Start verifying contract `0x99682dAc0D03F0D12392dCE0B0E34f4AaD0b56E1` deployed on kakarot-sepolia

Submitting verification for [src/SignatureVerifier.sol:SignatureVerifier] 0x99682dAc0D03F0D12392dCE0B0E34f4AaD0b56E1.
Submitted contract for verification:
        Response: `OK`
        GUID: `7e88936a-fe91-5599-9ede-cc19ba05dda9`
        URL: https://sepolia.kakarotscan.org/address/0x99682dac0d03f0d12392dce0b0e34f4aad0b56e1

```