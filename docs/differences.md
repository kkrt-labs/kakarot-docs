---
sidebar_position: 3
---

# Differences between Kakarot and Ethereum

Although Kakarot is Ethereum-compatible and aims to support the latest features
of Ethereum (e.g.
[Cancun new opcodes](https://blog.ethereum.org/2024/01/10/goerli-dencun-announcement)),
it still has some edge case behaviors.

## EVM opcodes

The below opcodes differ in behavior between Ethereum and Kakarot:

| Item        | Ethereum                                                   | Kakarot                                                                                                                                          |
| ----------- | ---------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| BLOCKHASH   | Get the hash of one of the 256 most recent complete blocks | The last 10 blocks are not available, and 0 is returned instead                                                                                  |
| BLOBBASEFEE | Get the current data-blob base-fee                         | Return 1 as there are no blobs on Kakarot. Corresponds to `MIN_BASE_FEE_PER_BLOB_GAS` as per [EIP-4844](https://eips.ethereum.org/EIPS/eip-4844) |
| BLOBHASH    | Get blob versioned hashes at index                         | Return 0 as there are no blobs on Kakarot                                                                                                        |

## EVM precompiles

The below precompiles differ in behavior between Ethereum and Kakarot:

| Item                                                                                                      | Ethereum                                                                                                                                                                | Kakarot                                                                                                                                                              |
| --------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ecPairing                                                                                                 | Bilinear function on groups on the elliptic curve `alt_bn128`                                                                                                           | Not supported                                                                                                                                                        |
| Modexp                                                                                                    | Arbitrary-precision exponentiation under modulo                                                                                                                         | Not supported                                                                                                                                                        |
| Point evaluation                                                                                          | Verify p(z) = y given commitment that corresponds to the polynomial p(x) and a KZG proof. Also verify that the provided commitment matches the provided versioned_hash. | Not supported                                                                                                                                                        |
| P256 Verification (secp256r1 - [RIP-7212](https://github.com/ethereum/RIPs/blob/master/RIPS/rip-7212.md)) | Not Supported                                                                                                                                                           | P256 is used in Apple’s Secure Enclave, Webauthn, Android Keychain. Enables many use cases such as cheap FaceID signature verification for smart wallets on Kakarot. |

## EVM State computation

The below state computation differs in behavior between Ethereum and Kakarot:

| Item                   | Ethereum                                                     | Kakarot                                                                                                                                                                                                          |
| ---------------------- | ------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Block hash computation | keccak256(RLP.encode(Block Header))                          | [pedersen(Starknet Block Header)](https://docs.starknet.io/documentation/architecture_and_concepts/Network_Architecture/header/)                                                                                 |
| State root computation | Root of state keccak-MPT                                     | [poseidon(root of contract pedersen-MPT, root of contract class pedersen-MPT)](https://docs.starknet.io/documentation/architecture_and_concepts/Network_Architecture/starknet-state/)                            |
| Transaction receipt    | Transaction receipt is available once a transaction is mined | Transaction receipt is available once a transaction is processed and guaranteed to be mined. This means that blockhash field of the receipt is optional and will be non-null only once the transaction is mined. |

## Transaction reversion

In Ethereum, a transaction can be reverted if validation parameters are
incorrect, if it runs out of gas or if it fails on the contract level. Since
Kakarot is a layer 2 solution, additional revert reasons can occur during the
transaction. We have currently identified the below issues which can cause some
problems with the traditional EVM tooling:

- **Cairo VM out of steps**: in Kakarot, we execute the EVM as a Cairo program,
  which can run out of execution steps. This causes the Cairo program itself
  (and not the EVM) to run out of "gas", causing a reversion of the transaction.
  This is a discrepancy with Ethereum's behavior, causing tooling such as
  `cast run TRANSACTION_HASH` to give a different result than the outcome on
  Kakarot.
