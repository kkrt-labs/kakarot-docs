---
title: Quick start - 5 minutes overview
sidebar_position: 1
---

## What is Kakarot zkEVM?

Kakarot is a zkEVM built in [Cairo](https://www.cairo-lang.org/), the provable
language that powers [Starknet](https://starkware.co/starknet/) and all the
StarknetOS chains (also called CairoVM chains, or Starknet appchains). Kakarot
is an Ethereum-compatible Layer 2, a
[so-called zkRollup](https://ethereum.org/developers/docs/scaling/zk-rollups).
Beyond compatibility, Kakarot strives to push more innovations to the L2 space,
and to add new features such as native account abstraction to the EVM. Kakarot's
driving ethos is to _Prove, Scale and Innovate_ 🥕.

## How can I use Kakarot zkEVM?

Kakarot zkEVM is an Ethereum-compatible rollup, which means as a user and
developer, you can interact with Kakarot zkEVM in the same way you would
interact with Ethereum mainnet or any other Ethereum-based chain (use Metamask,
Rainbow, build with Foundry or Hardhat, etc.). **Change the RPC URL and it "just
works"**. That being said, Kakarot is still in alpha testnet phase 🚧 and
unexpected behavior may still occur. Reach out to us on
[discord](https://discord.gg/kakarotzkevm) to report bugs 🐛.

Though we aim at no difference at all between Ethereum and Kakarot zkEVM — and
we actually work toward passing 100% of the
[official Ethereum Foundation test](https://github.com/ethereum/tests) — they
are currently some small difference recorded in the
[differences between Kakarot and Ethereum](differences) page in this
documentation website.

### As a user, how can I interact with Kakarot zkEVM?

Head over to the [survival guide](survival-guide) section to find useful links
for our alpha testnet. Again, change the network to Kakarot in your wallet and
it should "just work".

Example tutorial - Adding a new network to Metamask: open the Metamask
extension. Click "Add Network". Choose "Add a Network Manually". Then fill the
fields:

| Category       | Value                                |
| -------------- | ------------------------------------ |
| Network Name   | Kakarot zkEVM                        |
| RPC URL        | https://rpc.testnet.kakarot.org      |
| Chain Id       | 10710711648                          |
| Symbol         | ETH                                  |
| Block Explorer | https://explorer.testnet.kakarot.org |

### As a developer, how can I build on Kakarot zkEVM?

For developers as well, change the RPC URL, and it should "just work".

In case you encounter some unknown bug or want to discuss new features, you can:

- Join our discord and get support: https://discord.gg/kakarotzkevm
- Ask us questions on Twitter: https://twitter.com/KakarotZkEvm

## What differentiates Kakarot zkEVM?

Kakarot is the only provable implementation of the EVM written in a Turing
complete zero-knowledge Domain Specific Language (zkDSL): Cairo.

In this sense, Kakarot is closer to an EVM client than other zkEVMs. This makes
our approach flexible. Lower-level approaches that rely on cryptographic
primitives (e.g. circuits) are tailor-made for a specific EVM version. They are
way harder to maintain and adapt. For instance, because our approach is
adaptable & sustainable, we can support all Ethereum hardforks from day 1 and
thus minimize EVM fragmentation.

In the upcoming years, as Ethereum undergoes more upgrades, a zkEVM needs to be
easily adaptable to be sustainable. That is, it needs to easily incorporate the
changes of Ethereum mainnet. Otherwise, the very point of zkEVMs would be
partially lost: use zk to improve Ethereum, but in the meantime block every
other future evolution of the protocol and stick to a given version. Developers
would have to be careful about their Solidity or Vyper compiler versions. Users
would need to consult a difference checklist.

For a deep-dive into the Kakarot design, check out
[the architecture overview](architecture/understanding-zkevm).
