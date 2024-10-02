---
sidebar_position: 1
---

# Vision

We believe that all software executions will be proven, making blockchains the
world’s settlement layers.

Blockchains will allow the creation of a cohesive and borderless internet of
value, with self-custody, agency and privacy at its heart. People and
communities will be able to better coordinate worldwide via this digital fabric,
powered by ZK. Ethereum and Bitcoin will remain the leading settlement layers
for this new era of decentralized coordination.

To make this vision a reality, Kakarot is created to bring EVM provability to
various environments ranging from Ethereum L2s to EVM-compatible blockchains, as
well as sidechains and rollups on Bitcoin. By combining our STARK-friendly EVM
implementation and Starkware’s STARK Two Prover (STWO), Kakarot will achieve
order-of-magnitude improvements in speed and cost compared to other solutions
like Succinct’s Reth SP1, RISCZero’s Zeth, enabling real-time and efficient
proving.

## Why ZK + EVM?

> Connected by ZK, Standardized by EVM

We believe that Zero-Knowledge Proofs (ZKP) and the Ethereum Virtual Machine
(EVM) are two key technologies needed to build a decentralized future that is
trustless, scalable, and resilient.

### Zero-knowledge

ZK is a revolutionary technology in its ability to help decentralized networks
in two ways: scalability and privacy.

In the short-term, we will focus on the scalability aspect. ZK at its heart
enables compression of compute. There were initially two ways in which one could
convince other parties that a digital action was executed properly:

- In a centralized setting, trust the entity which performs the action (Alice
  trusts her bank to wire $20 to Bob after performing that same action on her
  banking app, without double spends or bug);
- In a decentralized network, re-execute the action locally (e.g. run your own
  Bitcoin full node, download a new block and re-execute every transaction in
  the block, thereby having full confidence that the latest block is valid).
  This is the core logic of all full nodes in blockchain networks.

Now, with ZK, a third way is introduced:

- Verify a ZK proof certifying that a particular action was performed with
  integrity.

This new method yields a strong advantage: it is exponentially cheaper to verify
the proof of a computation than to re-execute it.

Nodes in a ZK-powered network no longer need to re-execute every single
computation to ensure integrity, but instead, can verify ZK proofs that
transactions were executed properly. This cost saving is exponential compared to
the former approach. ZK-rollups’ scalability is based on this concept.

This practice also applies for cross-network interoperability, especially as the
industry is evolving to embrace more modularity. Many different networks will
co-exist, as [hundreds of rollups](https://l2beat.com/scaling/summary) continue
to emerge in Ethereum, Bitcoin (Layer 2s) and Solana (Network Extensions).

Fragmentation inevitably occurs and these networks require ZK to achieve
frictionless interoperability. ZK enables chains to prove and verify their state
on any other network while achieving fast finality. This set of characteristics
is crucial to trustless and secure bridging.

In the longer-term, we will also include the privacy aspect of ZK technology as
part of our focus. It is clear to us that crypto mass adoption will not happen
on a distributed system that is fully transparent with every single transactions
publicly viewable. There are no technical blockers to using privacy in our
current proof system, and we are keen to incorporate privacy in our products.
Private banks and governments require transactions to be private as well as
compliant (e.g., only accessible by one's bank and a judge).

In short, ZK will grant us the privacy, scalability, speed, and secure
interoperability we need between networks.

### Ethereum Virtual Machine (EVM)

Ethereum and its broad ecosystem of rollups enable builders and users to
coordinate openly and expressively. This ecosystem continues to mature, allowing
its
[different sub-networks and sub-cultures to flourish on top](https://vitalik.eth.limo/general/2024/05/29/l2culture.html).
In September 2024, as per DefiLlama, the smart contract language powering
Ethereum, Solidity, has secured more than $120B TVL, which is >10 times of
Rust's $9B.

All smart contracts on these Ethereum-compatible chains live on the Ethereum
Virtual Machine (EVM). Being Turing-complete, the EVM enables any on-chain
application to be built, including decentralized finance (DeFi), identity,
real-world assets, gaming, AI, logistics, just to name a few. Over the years,
the EVM has been the leading VM in the space, and dominates in every metric
(e.g., Total Value Locked, volumes, mindshare & number of developers). For
example, over 95% of stablecoins currently live on EVM networks.

While there are more performant virtual machines and execution environments that
are being created closer to date, we believe that the EVM will continue to be
the dominant choice in uniting and standardizing builder initiatives in the
coming years.

We are also starting to see the use of the EVM in other ecosystems including
Solana, Bitcoin, Move and others. For example, the combined TVL (amount of $BTC
locked) of all EVM-compatible chains on Bitcoin (including sidechains and
rollups) is currently [$1.6B](https://www.bitcoinlayers.org/). The network
effect on EVM will continue to grow and we will bet on its success in the medium
run. However, we also acknowledge that altVMs such as MoveVM or FuelVM have
appealing propositions and might be interesting to explore in the long run.
