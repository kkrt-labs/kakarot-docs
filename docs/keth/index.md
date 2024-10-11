# Keth - Chain-Agnostic EVM prover

Kakarot can prove blocks of Ethereum-equivalent chains, enabling any EVM chain
to leverage ZK for scalability. We call this service
[Keth](https://github.com/kkrt-labs/keth), a chain-agnostic EVM proving service with real-time proof generation.
We believe this brings strong value to the broader Ethereum ecosystem: help
optimistic rollups transition to ZK, reinforce the proof system of existing
ZK-rollups, power ZK bridges and ZK infrastructure (ZK full nodes), and more.

![Keth - A chain-agnostic EVM prover](../../static/diagrams/kakarot_mission.png)

Keth will become a proving powerhouse, in its ability to “STARKify” every
EVM-equivalent network in the space. The first use case of Keth is to help
transition every Optimistic rollup into a ZK-rollup. Secondly, Keth will allow
currently expensive EVM ZK-rollups to adopt a cheaper and more performant prover
stack.

Lastly, **Keth will also accelerate the transition of all rollups to
[Stage 2](https://medium.com/l2beat/introducing-stages-a-framework-to-evaluate-rollups-maturity-d290bb22befe)**
as they adopt multi-proofs in their architecture, with Keth as one of the
options. Every single EVM ZK-rollup will then be able to prove its integrity
using multiple proof systems simultaneously without having to pay extremely high
proving fees (e.g., Keth, Zeth, Succinct’s Reth, TEE etc. all at the same time).
These multiple proof systems will all agree on the state of network, ensuring
the security of the value transfer on top of it with no single point of failure.

For example, Taiko, an existing EVM ZK-rollup can adopt multi-proof approach
with its prover adaptor, [Raiko](https://github.com/taikoxyz/raiko) using proof
systems from Keth, Zeth and Succinct’s SP1 Reth to finalize transactions.

We believe that Keth is contributing towards a “ZK-everything” future where all
bridges, wallets, or full nodes in the rollup ecosystem are powered by ZK. This
movement will significantly reduce the cost of every major rollup infrastructure
while increasing users’ sovereignty (i.e. users gain the ability to verify
proofs locally if they want, reducing the reliance on trusted infrastructure
providers).

When it comes to performance, early benchmarks have shown that Starkware STWO,
the prover used by Keth, achieves a substantial improvement relative to the
current generation of provers in the space (benchmarks recorded in MHz rather
than kHz). More accurately, STWO, which is still in early developments, could
achieve tens of MHz, while the current state-of-the-art prover, RISCZero’s zkVM
1.0 could achieve up to 1MHz on a strong GPU. Keth is believed to bring
exponentially improved performance, orders of magnitude better than the
incumbents.

With this orders-of-magnitude better performance, we expect Keth to become the
most advanced and performant EVM proving engine in the sector.

Keth is scheduled to go live in production by Q3 2025.
