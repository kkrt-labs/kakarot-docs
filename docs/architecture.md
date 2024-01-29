---
sidebar_position: 3
---

# Architecture Deep Dive

Kakarot is a zkEVM built in [Cairo](https://www.cairo-lang.org/), the provable language that powers [Starknet](https://starkware.co/starknet/) and all the StarknetOS chains (also called CairoVM chains, or Starknet appchains). It’s an Layer 2, a [so-called zkRollup](https://ethereum.org/developers/docs/scaling/zk-rollups). It’s Ethereum compatible, now and forever. Beyond compatibility, Kakarot strives to add new features such as native account abstraction. Kakarot's driving ethos is to _Prove, Scale and Innovate_.

In concrete terms:

- For users, use Kakarot ìn the same way as Ethereum mainnet: interact with dApps using Metamask or another wallet. Kakarot is a zk-Rollup:
  - Zero-Knowledge (zk): minimized trust, maximized integrity derived from maths.
  - Rollup: Enjoy lower costs
- For developers and teams, you can build on Kakarot using the Ethereum ecosystem's standard tools: Solidity or Vyper, Foundry, Hardhat, Etherjs etc.

Note: Kakarot is not a privacy chain. Zero-knowledge technologies can be used for two (non-excluding) purposes, Scaling or Privacy. Kakarot uses the former to scale Ethereum.

## What is a zkEVM?

### What is the Ethereum Virtual Machine (EVM)?

Starting from the [Ethereum foundation definition](https://ethereum.org/developers/docs/evm#from-ledger-to-state-machine):

> Ethereum's state is a large data structure which holds not only all accounts and balances, but a machine state, which can change from block to block according to a pre-defined set of rules, and which can execute arbitrary machine code. The specific rules of changing state from block to block are defined by the EVM.

From the above we get that the Ethereum blockchain is a distributed state machine and that the [Ethereum Virtual Machine](https://ethereum.org/developers/docs/evm) is a software-based emulation of a physical computer (virtual machine) used to operate (compute state transitions) it in a deterministic way.

Execution Environment: The EVM is where smart contracts are executed. Each Ethereum node runs an EVM instance, allowing it to participate in executing and validating smart contracts and transactions.

Deterministic: The EVM is deterministic, meaning that a smart contract will produce the same output given the same input, regardless of which node in the network executes it. This is essential for maintaining consensus across the network.

TL;DR - the EVM is the common computer used to run logic on the Ethereum network and hold all user state (balances, contract code, etc.).

---

Diagram - The EVM Illustrated by Takenobu:

![The EVM illustrated by Takenobu](../static/diagrams/evm_takenobu.png)
Source: The EVM illustrated, https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf

---

### What is a zk-Rollup?

The zk in zk-Rollup and zkEVM means _zero-knowledge_. It refers to the cryptographic method by which one party (the prover) can prove to another party (the verifier) that a statement is true. In the case of an Kakarot zkEVM, the prover (the rollup) proves to the verifier (Ethereum L1) that a batch of L2 transactions are valid.

The integrity of these so-called batches is mathematically guaranteed by zero-knowledge proofs (also called validity proofs when they are not privacy preserving).

To dive deeper, you can refer to a [high-level article about zero-knowledge proofs](https://medium.com/starkware/stark-math-the-journey-begins-51bd2b063c71), written by the inventors of STARK proofs: Starkware.

To grasp the value of zk-Rollups, it is important to understand that when a transaction is executed on Ethereum, all the full nodes in the network run it locally to verify its integrity. Therefore, each transaction is executed hundreds of thousands of times in order to agree on the network's truth. The idea behind zk-Rollups is to run a transaction once, compute that transaction's proof of integrity and thereafter only verify this proof without re-running the initial transaction. Luckily for us (and the Rollup centric roadmap of Ethereum), the verification of a transaction's proof is (asymptotically) exponentially cheaper than re-running that same transaction.

From there is derived the protocols of zk-Rollups. As per the [Ethereum website](https://ethereum.org/developers/docs/scaling/zk-rollups#what-are-zk-rollups):

> Zero-knowledge rollups (ZK-rollups) bundle (or 'roll up') transactions into batches that are executed off-chain. Off-chain computation reduces the amount of data that has to be posted to the blockchain. ZK-rollup operators submit a summary of the changes required to represent all the transactions in a batch rather than sending each transaction individually. They also produce validity proofs to prove the correctness of their changes.

TL;DR - execute off-chain, verify on-chain, save on costs.

### What does it mean to prove the EVM, i.e. how can one go from EVM to zkEVM?

A zkEVM is simply a zk-Rollup that is compatible with Ethereum. This means that users should be able to interact with it as if they were interacting with Ethereum (or almost). For instance, users will use the same tools on a zkEVM than on Ethereum L1, such as the same wallet (e.g. Metamask). Developers' smart contracts should be deployable to a zkEVM without any (or little) changes.

A zkEVM also designates the software used to prove Ethereum-compatible transactions and blocks. It refers to code that is used to go from an EVM transaction to a zero-knowledge (or validity) proof. The implementation of a zkEVM can be either low-level (at the so-called "circuits" level) or high-level (use an intermediary zkVM). [Scroll](https://scroll.io/) is an embodiment of the former, and Kakarot of the latter.

TL;DR: Execute Ethereum-compatible transactions on a Layer 2, prove them off-chain, bundle and verify them on Ethereum L1. Save on costs, benefit from an existing ecosystem: the Ethereum community.

## How does Kakarot work under the hood?

### Kakarot is a set of Cairo programs that emulate the EVM

Under the hood, Kakarot zkEVM is a set of Cairo programs that implement the EVM instruction set. The EVM is the blueprint, Kakarot implements it in Cairo.

> Cairo is the first Turing-complete language for creating provable programs for general computation.

Cairo is essentially a high-level abstraction to write provable software. It is a "zk-toolbox". There is a "need": execute off-chain, verify on-chain. There is a requirement: respect the EVM blueprint. There is a tool: Cairo.

Kakarot - the network - is composed of three parts: a set of Cairo programs (the Core EVM), an RPC layer (RPC server and EVM indexer) and an underlying CairoVM client (a StarknetOS chain).

### Kakarot relies on an underlying (invisible) StarknetOS client

The Kakarot core EVM, i.e. the set of Cairo programs that implement the EVM, are deployed on an underlying StarknetOS chain. This means that Kakarot is running as a set of Cairo smart contracts on a CairoVM-powered chain. Nevertheless, this CairoVM chain is "invisible" to the user. Users only interact with Kakarot through the RPC layer in an Ethereum-compatible way. The only exposed interface in Kakarot zkEVM is the Ethereum JSON-RPC specification.

---

Diagram - Kakarot RPC Layer

![Kakarot RPC Layer](../static/diagrams/kakarot_rpc.png)

---

To put it simply, Kakarot L2 is composed of an underlying StarknetOS chain that runs a Cairo program that emulates the EVM and an RPC layer to allow users to interact with it in an Ethereum format. All Cairo execution traces are provable by design, which allows Kakarot to batch blocks and submit proofs to L1 using the Starkware Shared prover (SHARP).

In Kakarot zkEVM, the design choices for Cairo programs and their EVM equivalents are the following. **🎙️ Disclaimer 🎙️: all these designs choices are invisible to the user**:

- each EVM smart contract (so-called _Account Contract_) is deployed as a unique Starknet smart contract, which stores its own bytecode and EVM storage slots.
- each EVM user-owned account (so-called _Externally Owned Account (EOA)_) is deployed as a Starknet smart contract wallet.
  - It has a Starknet formatted address (31 bytes hex string), which is uniquely mapped to the user EOA EVM address (20 bytes hex string).
  - Its native balance in ETH (coin vs. token) is denominated in ERC20 native token under the hood in the Kakarot system.
  - It behaves exactly like an EOA, uses the same signature and validation scheme as Ethereum mainnet, though it can be extended in the future to support innovative features!
- EVM transactions that are sent by users are wrapped in Starknet transactions. The derived EVM Transaction hashes are mapped 1-to-1 with underlying Starknet transaction hashes. Since signature verification is done in a Cairo program, transactions are provably processed with integrity [despite being wrapped at the RPC level](https://github.com/kkrt-labs/kakarot-rpc/blob/bcadfc9b38ac934f73832b3a3485c15f08d66218/src/eth_rpc/servers/eth_rpc.rs#L236).
- new state roots are computed using Pedersen hash and not keccak because of the zk-unfriendliness of keccak. This does not hurt EVM compatibility at the applicative level.
- the state trie is computed using Pedersen MPT and not [Keccak MPT](https://ethereum.org/developers/docs/data-structures-and-encoding/patricia-merkle-trie). Note that the transaction trie and receipt trie are both computed as keccak MPTs, for block explorers, but as pedersen MPTs for the proof commitment.

---

Diagram - Kakarot zkEVM high-level architecture:

![Kakarot zkEVM architecture diagram](../static/diagrams/kakarot_zkevm.png)

---

TL;DR - whatever is written in Cairo can be proven. Kakarot implements the EVM specification, in Cairo. It is provable by design.

## The difference between Kakarot and other zkEVMs

Kakarot zkEVM is probably the most high-level zkEVM. On the scale of maths language and polynomials to human understandable language, Kakarot is closer to human readable language than any other zkEVM. This matters to users in two ways:

- Because Kakarot is built on Cairo, Kakarot as a codebase is extremely slim (an order of magnitude lighter than other zkEVMs) and thus extremely easy to maintain, adapt to Ethereum changes, or add new features to (e.g. native account abstraction).
- Cairo (through Starknet) is an ecosystem of its own and Kakarot can benefit from all innovations that are created there with ease: parallel execution, face ID signature validation, Celestia DA integration and more.

TL;DR - By betting on the CairoVM for the years to come, Kakarot synergizes with the entire Cairo (and thus Starknet) ecosystem. Cairo is the most advanced high-level zk-toolbox in production (has been in production for years with StarkEx).

---

Diagram - How to build a zkEVM:

![Different ways to build a zkEVM: low-level circuits or intermediary zkVM](../static/diagrams/how_to_build_a_zkevm.png)

We believe that in focusing only on engineering, our approach is scalable and sustainable.

<!-- For information unrelated to documentation effort, link to external URLs to decrease the area to maintain: docs should contain doc-related content, and for other content (e.g. how did Kakarot start, what is the roadmap, etc.), use other media -->
