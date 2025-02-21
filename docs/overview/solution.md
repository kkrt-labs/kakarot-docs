---
sidebar_position: 2
---

# Technical design

Kakarot is a provable EVM built with Cairo, Starkware’s STARK-friendly ZK-VM.

## Why ZK-VMs?

There are generally two ways to build a ZK-application or ZK-infrastructure:
either by using a ZK-VM or by writing specialized ZK-circuits.

In simple terms, ZK-VMs are virtual machines capable of generating ZK proofs
that verify the correctness of their execution. On the other hand, ZK-circuits
are mathematical representations used to model a specific process. These
circuits break down computations into a series of logical operations, much like
how a circuit works in electronics.

Back in 2022/2023, all ZK-EVMs including Scroll, Linea, and ZKSync were built on
specialized ZK-circuits. As ZK-circuits were created and optimized for one
specific use case, they were considered faster. However, ZK-circuits are
generally more complex to develop — they are harder to audit, harder to
maintain, and also surprisingly no longer always more efficient than modern
ZK-VMs.

On the other hand, ZK-VMs are flexible and can be optimized for different tasks.
They allow for developers to build software as if it was a regular piece of
code. And for some specific use cases where performance is crucial, they can be
augmented with _built-ins_, i.e. low-level optimized modules built to perform a
given task. These built-ins, or specialized opcodes work just like ZK-circuits,
allowing specialized tasks to be processed much faster. This method gives ZK-VMs
similar speed to custom-built circuits. Vitalik explains this further in his
article on
[Glue and coprocessor architectures](https://vitalik.eth.limo/general/2024/09/02/gluecp.html).

We strongly believe that for nearly every use case, on the application or the
infrastructure layer, ZK-VMs are superior to ZK-circuits in every metric: speed
of development, ease of maintenance, auditability, proof generation costs as
well as surface for optimizations.

## Why CairoVM?

Released in 2020, the CairoVM is the first ever Turing-complete ZK-VM. With
CairoVM, one could, for the first time, build ZK-infrastructure by writing code
— Cairo code — instead of circuits. Cairo is a provable domain specific language
(ZK-DSL), which means any program built in Cairo can be proven with a STARK
proof (and in the long run, any proof system that supports Cairo Assembly).

Recently, we have noticed a rapid increase in mindshare for RISC-V based ZK-VMs.
These VMs’ ability to prove widespread languages such as Rust makes them a
competitive option in the ZK-VM space. The friction historically associated with
proof and ZK is now made minimal.

However, we believe CairoVM has a decisive performance advantage over RISC-V
based ZK-VMs. CairoVM’s design is more optimized for arithmetic operations while
RISC-V is more suitable for bitwise operations. Given STARKs and most of the
finite field cryptography exclusively utilize arithmetic operations, we believe
CairoVM will keep yielding better performance in the medium run.

One key metric of field of ZK is the speed at which a team is able to prove
existing software. For instance, how fast can a team use
[revm](https://github.com/bluealloy/revm) - an open source implementation of the
Ethereum execution engine - and make it provable. It is crucial for teams to be
able to achieve this ZK transition in days.

> Diagram - the advantages of building a provable EVM on top of an intermediary
> ZK-VM:

![A novel way to build provable EVMs: building an EVM on top of an intermediary ZK-VM](../../static/diagrams/how_to_build_a_zkevm.png)

## Kakarot - EVM Proving Engine

An EVM is a machine that essentially takes two inputs — the current state of a
chain and a transaction. It processes the transaction and returns the new state
of the network (e.g., balance change resulting from on-chain payment).

A ZK-EVM is then an EVM that is able to generate a ZK-proof that certifies that
the state transition described above was performed with integrity (i.e.
according to the rules of the EVM specification). As mentioned above, a ZK-EVM,
which is a ZK-application, can be built using either ZK-circuits or a ZK-VM.

We chose the latter: Kakarot has been the first to take the approach of building
a ZK-EVM as an EVM on top of a ZK-VM. Under the hood, Kakarot's core EVM is an
implementation of the EVM instruction set in Cairo.

The design choices we make here will give us the following advantages:

- **Lightweight and modular:** building an EVM on top of an intermediary ZK-VM
  (CairoVM) instead of specialized circuits makes Kakarot extremely easy to
  maintain and audit. It is especially adaptable to the changes of Ethereum’s
  specifications (in the event of hard forks). For example, we were able to
  rapidly adapt Kakarot’s core EVM to the Shanghai and Dencun hard forks in 2023
  and 2024 (completed in under two weeks of development for a team of two).
- **Efficient and performant:** building a core EVM in Cairo also means that
  Kakarot can continuously leverage the ever-improving cryptography and proof
  systems developed by Starkware. One example to this is the development of
  their latest prover — Starkware STWO, which is expected to go live in Q2 2025.
  This new prover will bring significant improvements in performance, a
  magnitude of 1,000x compared to its predecessor, STARK One Prover (also known
  as Stone). Kakarot’s modularity has allowed itself to benefit from similar
  improvements, as its underlying proof system can be swapped out without
  additional friction and cost.

> Diagram - landscape of provable EVMs

![Landscape of provable EVMs](../../static/diagrams/zkevm_landscape.png)
