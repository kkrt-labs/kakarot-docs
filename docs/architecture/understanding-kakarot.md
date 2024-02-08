---
title: Kakarot zkEVM under the hood
sidebar_position: 2
---

## Kakarot, the zkEVM built in Cairo

Kakarot is a zkEVM built in [Cairo](https://www.cairo-lang.org/), the provable
language that powers [Starknet](https://starkware.co/starknet/) and all the
StarknetOS chains (also called CairoVM chains, or Starknet appchains). Kakarot
is an Ethereum-compatible Layer 2, a
[so-called zkRollup](https://ethereum.org/developers/docs/scaling/zk-rollups).
Beyond compatibility, Kakarot strives to push more innovations to the L2 space,
and to add new features such as native account abstraction to the EVM. Kakarot's
driving ethos is to _Prove, Scale and Innovate_ 🥕.

In concrete terms, Kakarot is an Ethereum-compatible zk-Rollup:

- Ethereum-compatible: use Kakarot and Ethereum in the same way.
- Zero-Knowledge (zk): no compromise on security, maximized integrity derived
  from maths.
- Rollup: Enjoy lower costs than on Ethereum mainnet.

For users:

- For end users, use Kakarot ìn the same way as Ethereum mainnet: interact with
  dApps using any EVM wallet, e.g. Metamask or Rabby.
- For developers and teams, you can build on Kakarot using the Ethereum
  ecosystem's standard tools: Solidity or Vyper, Foundry, Hardhat, Etherjs etc.

Discover the Kakarot explorer and other useful links on the
[survival guide](survival-guide) page.

Note: Kakarot is not a privacy chain. Zero-knowledge technologies can be used
for two (non-excluding) purposes, Scaling or Privacy. Kakarot uses the former to
scale Ethereum.

## How does Kakarot work under the hood?

### Kakarot is an implementation of the EVM in Cairo

Under the hood, Kakarot zkEVM is a Cairo program that implement the EVM
instruction set. The EVM is the blueprint, Kakarot implements it in Cairo.

> Cairo is the first Turing-complete language for creating provable programs for
> general computation.

Cairo is like any a programming language, but made for writing provable software. It
means that whatever is written in Cairo is, by design, _zk_. Using Cairo means
that we leverage cryptography without having to think about it, it sort of
"comes for free" just by using this language and not, say, rust.

---

Diagram - Kakarot zkEVM high-level architecture:

![Kakarot zkEVM architecture diagram](../../static/diagrams/kakarot_zkevm.png)

---

Kakarot - the network - is composed of three parts: the Core EVM in Cairo, an
RPC layer (RPC server and EVM indexer) and an underlying CairoVM client (a
StarknetOS chain).

### Kakarot runs on an underlying StarknetOS client

The Kakarot core EVM, i.e. as said previously our new EVM implementation, is
deployed on an underlying StarknetOS chain. This means that Kakarot is running
as a set of Cairo smart contracts on a CairoVM-powered chain. This CairoVM chain
is "invisible" to the user. Users only interact with Kakarot through the RPC
layer in an Ethereum-compatible way. The only exposed interface in Kakarot zkEVM
is the Ethereum JSON-RPC specification. In the future, we could leverage this to
allow developers to write their own Cairo-precompiled contracts, as Arbitrum
Stylus introduced Rust, C, and C++ together with the EVM.

---

Diagram - Kakarot RPC Layer

![Kakarot RPC Layer](../../static/diagrams/kakarot_rpc.png)

---

To put it simply, Kakarot L2 is composed of a set of Cairo programs that emulate
the EVM and an RPC layer to allow users to interact with it in an Ethereum
format. All Cairo execution traces are provable by design, which allows Kakarot
to batch blocks and submit proofs to L1 using the
[Starkware Shared prover](https://starkware.co/tech-stack/) (SHARP). Because
Cairo is a vibrant ecosystem, other prover implementations in the future will
emerge, such as Lambdaclass'
[Stark Platinum Prover](https://github.com/lambdaclass/lambdaworks/tree/main/provers).
This will enable multi-proof security and increase robustness of the Kakarot
network.

In Kakarot zkEVM, the design choices regarding EVM programs and their Cairo
equivalents are explained below. They are subject to architecture changes over
time. **🎙️ Disclaimer 🎙️: all these designs choices are invisible to the user**:

- each EVM smart contract (so-called _Contract Account_) is deployed as a unique
  Starknet smart contract. This Starknet smart contract stores its own bytecode
  and EVM storage slots.
- each EVM user-owned account (so-called _Externally Owned Account (EOA)_) is
  deployed as a Starknet smart contract wallet.
  - It has a Starknet formatted address (31 bytes hex string), which is uniquely
    mapped to the user EOA EVM address (20 bytes hex string). For the user, this
    is invisible.
  - Its native balance in ETH (coin vs. token) is denominated in ERC20 native
    token under the hood in the Kakarot system. For the user, this is invisible.
  - It behaves exactly like an EOA, uses the same signature and validation
    scheme as Ethereum mainnet, though it can be extended in the future to
    support innovative features!
- EVM transactions that are sent by users are wrapped in Starknet transactions.
  The derived EVM Transaction hashes are mapped 1-to-1 with underlying Starknet
  transaction hashes. Since signature verification is done in a Cairo program,
  transactions are provably processed with integrity
  [despite being wrapped at the RPC level](https://github.com/kkrt-labs/kakarot-rpc/blob/bcadfc9b38ac934f73832b3a3485c15f08d66218/src/eth_rpc/servers/eth_rpc.rs#L236).
  For the user, this is invisible.
- new state roots are computed using Pedersen hash and not keccak because of the
  zk-unfriendliness of keccak. This does not hurt EVM compatibility at the
  applicative level.
- the state trie is computed using Pedersen MPT and not
  [Keccak MPT](https://ethereum.org/developers/docs/data-structures-and-encoding/patricia-merkle-trie).
  Note that the transaction trie and receipt trie are both computed as keccak
  MPTs, for block explorers, but as pedersen MPTs for the proof commitment.

TL;DR - whatever is written in Cairo can be proven. Kakarot implements the EVM
specification in Cairo. It is provable by design. All the Cairo magic is done
under the hood. For the user, this is invisible. They are interacting with an
EVM chain.

## The difference between Kakarot and other zkEVMs

Kakarot zkEVM is probably the most high-level zkEVM. On the scale of maths
language and polynomials to human understandable language, Kakarot is closer to
human readable language than any other zkEVM. This matters to users in two ways:

- Because Kakarot is built on Cairo, Kakarot as a codebase is extremely slim (an
  order of magnitude lighter than other zkEVMs) and thus extremely easy to
  maintain, adapt to Ethereum changes, or add new features to (e.g. native
  account abstraction).
- Cairo (through Starknet) is a vibrant ecosystem and Kakarot can benefit from
  all its innovations with ease (same underlying tech stack). Ideas on the long
  term could include parallel execution, seed-less wallets (e.g. rely on face ID
  only), Celestia DA integration and more.

TL;DR - By betting on the CairoVM for the years to come, Kakarot synergies with
the entire Cairo (and thus Starknet) ecosystem. Cairo is the most advanced
high-level zk-toolbox in production, first with
[StarkEx](https://www.theblock.co/post/237064/starkex-layer-2-records-1-trillion-in-on-chain-trading-volume-since-june-2020)
and now Starknet.

---

Diagram - How to build a zkEVM:

![Different ways to build a zkEVM: low-level circuits or intermediary zkVM](../../static/diagrams/how_to_build_a_zkevm.png)

We believe that in focusing only on engineering, our approach is scalable and
sustainable.

<!-- For information unrelated to documentation effort, link to external URLs to decrease the area to maintain: docs should contain doc-related content, and for other content (e.g. how did Kakarot start, what is the roadmap, etc.), use other media -->
