---
sidebar_position: 3
---

# Differences between Kakarot and Ethereum

Although Kakarot is Ethereum-compatible and aims to support the latest features
of Ethereum (e.g.
[Cancun new opcodes](https://blog.ethereum.org/2024/01/10/goerli-dencun-announcement)),
it still has some edge case behaviors. They are listed below:

| Item                   | Ethereum                                                   | Kakarot                                                                                                                                                                               |
| ---------------------- | ---------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| BLOCKHASH              | Get the hash of one of the 256 most recent complete blocks | The last 10 blocks are not available, and 0 is returned instead                                                                                                                       |
| Block hash computation | keccak256(RLP.encode(Block Header))                        | [pedersen(Starknet Block Header)](https://docs.starknet.io/documentation/architecture_and_concepts/Network_Architecture/header/)                                                      |
| State root computation | Root of state keccak-MPT                                   | [poseidon(root of contract pedersen-MPT, root of contract class pedersen-MPT)](https://docs.starknet.io/documentation/architecture_and_concepts/Network_Architecture/starknet-state/) |
