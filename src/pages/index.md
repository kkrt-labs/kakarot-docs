---
title: Kakarot zkEVM - Overview
---

# Kakarot zkEVM - Overview

Welcome to Kakarot zkEVM's documentation! Here you'll find everything there is to know about Kakarot zkEVM, its goals and design.

## What is Kakarot zkEVM?

Kakarot is a zkEVM built in [Cairo](https://www.cairo-lang.org/), the provable language that powers [Starknet](https://starkware.co/starknet/) and all the StarknetOS chains (also called CairoVM chains, or Starknet appchains). It’s an Ethereum-compatible Layer 2, a [so-called zkRollup](https://ethereum.org/developers/docs/scaling/zk-rollups). Beyond compatibility, Kakarot strives to add new features such as native account abstraction to the EVM. Kakarot's driving ethos is to _Prove, Scale and Innovate_.

## How can I use Kakarot zkEVM?

Kakarot zkEVM is a Ethereum-compatible rollup, which means as a user and developer, you can interact with Kakarot zkEVM in the same way you would interact with Ethereum mainnet or any other Ethereum-based chain (use Metamask, Rainbow, build with Foundry or Hardhat, etc.). Change the RPC URL and it "just works".

All differences between Ethereum and Kakarot zkEVM are recorded in the [Differences between Kakarot and Ethereum](differences) page in this documentation website.

### As a user, how can I interact with Kakarot zkEVM?

Head over to the [survival guide](survival-guide) section to find useful links for our alpha testnet. Change the RPC URL and it "just works".

Quick start - Adding a new network to Metamask: open the Metamask extension. Click "Add Network". Choose "Add Network Manually". Then fill the fields:

| Category       | Value                                |
| -------------- | ------------------------------------ |
| Network Name   | Kakarot zkEVM                        |
| RPC URL        | https://rpc.testnet.kakarot.org      |
| Chain Id       | 10710711648                          |
| Symbol         | ETH                                  |
| Block Explorer | https://explorer.testnet.kakarot.org |

### As a developer, how can I build on Kakarot zkEVM?

For developers as well, change the RPC url, and it "just works".

In case you encounter some unknown bug or want to discuss new features, you can:

- Join our discord and get support: https://discord.gg/kakarotzkevm
- Ask us questions on Twitter: https://twitter.com/KakarotZkEvm

## What differentiates Kakarot zkEVM?

Kakarot is the only zkEVM fully built on an intermediary zkVM (the CairoVM). In this sense, Kakarot is closer to an EVM client than other zkEVMs.

For a deep-dive into the Kakarot design, check out [the architecture overview](architecture).
