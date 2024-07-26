---
title: Kakarot ZK-EVM under the hood
sidebar_position: 2
---

## Kakarot, the ZK-EVM built in Cairo

Kakarot is a ZK-EVM built in [Cairo](https://www.cairo-lang.org/), the provable
language that powers [Starknet](https://starkware.co/starknet/) and all the
StarknetOS chains (also called CairoVM chains, or Starknet appchains).

Kakarot enhances and extends Starknet by making it a DualVM environment.
Starknet effectively becomes EVM compatible; allowing the use of both CairoVM
and EVM for builders & users. Additionally, Kakarot
[strives to push more innovations](https://ethcc.io/archive/Kakarot-zkEVM-beyond-ethereum-compatibility)
to the L2 space, participating in governance initiative such as
[Rollup Improvement Proposals](https://github.com/ethereum/RIPs) (RIPs) and
[Rollcall](https://github.com/ethereum/pm/issues/1071#issuecomment-2221171582).

For the Starknet community, Kakarot removes any kind of EVM-compatibility
barrier to developers seeking to take advantage of Starknet’s scalability. For
the broader Ethereum ecosystem, Kakarot accelerates the adoption of provable
compute.

For developers on Starknet, this means being able to use EVM programming
languages and tools in addition to existing tools on Starknet, therefore vastly
expanding their options. Additionally, developers who want to launch an EVM
appchain (a chain tailored to their specific app) with Kakarot benefit from the
stack being highly auditable, maintainable, and modular!

For users, this means both access to faster and cheaper transactions on
Starknet, as well as better interoperability with the broader Ethereum
ecosystem.

Discover the Kakarot explorer and other useful links on the
[survival guide](../survival-guide) page.

Note: Kakarot is not a privacy chain. Zero-knowledge technologies can be used
for two (non-excluding) purposes, Scaling or Privacy. Kakarot uses the former to
scale Ethereum.

## How does Kakarot work under the hood?

### Kakarot is an implementation of the EVM in Cairo

Under the hood, Kakarot ZK-EVM is an implementation of the EVM instruction set
in Cairo.

> Cairo is the first Turing-complete language for creating provable programs for
> general computation.

Cairo is like any a programming language, but made for writing provable
software. It means that whatever is written in Cairo is, by design, _zk_. Using
Cairo means that we leverage cryptography without having to think about it, it
sort of "comes for free" just by using this language and not, say, rust.

---

Diagram - Kakarot ZK-EVM high-level architecture:

![Kakarot ZK-EVM architecture diagram](../../static/diagrams/kakarot_zkevm.png)

---

Kakarot - the network - is composed of three parts: the Core EVM in Cairo, an
RPC layer (RPC server and EVM indexer) and an underlying host CairoVM client
(e.g. Starknet mainnet).

### Kakarot runs on an underlying StarknetOS client

The Kakarot core EVM, i.e. as said previously our new EVM implementation, is
deployed on an underlying StarknetOS chain. This means that Kakarot is running
as a set of Cairo smart contracts on a CairoVM-powered chain. This CairoVM chain
is "invisible" to the user. Users only interact with Kakarot through the RPC
layer in an Ethereum-compatible way. The only exposed interface in Kakarot
ZK-EVM is the Ethereum JSON-RPC specification. Additionally, we allow developers
to write and use Cairo modules to enhance the performance of their apps,
similarly to [Arbitrum Stylus](https://arbitrum.io/stylus).

---

Diagram - Kakarot RPC Layer

![Kakarot RPC Layer](../../static/diagrams/kakarot_rpc.png)

---

To put it simply, Kakarot is composed of an EVM written in Cairo and an RPC
layer to allow users to interact with it in an Ethereum format. All Cairo
execution traces are provable by design, which allows Kakarot to batch blocks
and submit proofs to L1 using the
[Starkware Shared prover](https://starkware.co/tech-stack/) (SHARP).

In Kakarot ZK-EVM, the design choices regarding EVM programs and their Cairo
equivalents are explained below. They are subject to architecture changes over
time. **🎙️ Disclaimer 🎙️: all these designs choices are invisible to the user**:

- every EVM smart contract (so-called _Contract Account_) and EVM user-owned
  account (so-called _Externally Owned Account (EOA)_) is deployed as a unique
  Starknet smart contract. This Starknet smart contract stores its own bytecode
  and EVM storage slots.
  - It has a Starknet formatted address (31 bytes hex string), which is uniquely
    mapped to its EVM address (20 bytes hex string). For the user, this is
    invisible.
  - Its native balance in ETH (coin vs. token) is denominated in ERC20 native
    token under the hood in the Kakarot system. For the user, this is invisible.
  - EOAs in Kakarot behave exactly like in Ethereum L1, uses the same signature
    and validation, though it can be extended in the future to support
    innovative features!
- EVM transactions that are sent by users are wrapped in Starknet transactions.
  The derived EVM Transaction hashes are mapped 1-to-1 with underlying Starknet
  transaction hashes. Since signature verification is done in a Cairo program,
  transactions are provably processed with integrity
  [despite being wrapped at the RPC level](https://github.com/kkrt-labs/kakarot-rpc/blob/bcadfc9b38ac934f73832b3a3485c15f08d66218/src/eth_rpc/servers/eth_rpc.rs#L236).
  For the user, this is invisible.
- new state roots are computed according to
  [the state trie of Starknet](https://docs.starknet.io/architecture-and-concepts/network-architecture/starknet-state/)
  (pedersen MPT). Kakarot uses Pedersen hash and not keccak because of the
  zk-unfriendliness of keccak. This does not hurt EVM compatibility at the
  applicative level. Note that the transaction trie and receipt trie are both
  computed as keccak tries for the RPC layer (block explorers, indexers, etc.),
  but as pedersen tries for the STARK proof generation.

TL;DR - whatever is written in Cairo can be proven. Kakarot implements the EVM
specification in Cairo. It is provable by design. All the Cairo magic is done
under the hood. For the user, this is invisible. They are interacting with an
EVM-compatible network.

## The difference between Kakarot and other ZK-EVMs

Remember that a ZK-EVM is an EVM for which transaction execution is provable.
There are a few ways to build a ZK-EVM. An interesting axis is to check how
low-level the implementation is. When a ZK-EVM is built using zk-circuits, it is
considered to be low-level (specialized, hard to maintain & audit, more
performant on average). If it relies on a general-purpose provable VM (Cairo,
Risc-Zero, Jolt, etc.), it is considered high-level (agile, sustainable and
performant thanks to newer proof systems such as
[Circle STARK](https://vitalik.eth.limo/general/2024/07/23/circlestarks.html)).

Kakarot ZK-EVM is probably the most high-level ZK-EVM in production. On the
scale of maths language and polynomials to human understandable language,
Kakarot is closer to human readable language than any other ZK-EVM. This matters
to users in two ways:

- Because Kakarot is built on Cairo, Kakarot as a codebase is extremely slim (an
  order of magnitude lighter than other ZK-EVMs) and thus extremely easy to
  maintain, adapt to Ethereum changes, or add new features to (e.g. native
  account abstraction).
- Cairo (through Starknet) is a vibrant ecosystem and Kakarot can benefit from
  all its innovations with ease (same underlying tech stack). Ideas on the long
  term could include parallel execution, seed-less wallets (e.g. rely on face ID
  only), Celestia DA integration and more.

TL;DR - By betting on the CairoVM for the years to come, Kakarot leverages the
entire Cairo (and thus Starknet) ecosystem. Cairo is the most advanced
high-level zk-toolbox in production, first with
[StarkEx](https://www.theblock.co/post/237064/starkex-layer-2-records-1-trillion-in-on-chain-trading-volume-since-june-2020)
and now Starknet.

TL;DR: when it comes to ZK-infrastructure, write code, not circuits.

---

Diagram - How to build a ZK-EVM:

![Different ways to build a ZK-EVM: low-level circuits or intermediary ZK-VM](../../static/diagrams/how_to_build_a_zkevm.png)

We believe that in focusing only on engineering, our approach is scalable and
sustainable.

<!-- For information unrelated to documentation effort, link to external URLs to decrease the area to maintain: docs should contain doc-related content, and for other content (e.g. how did Kakarot start, what is the roadmap, etc.), use other media -->
