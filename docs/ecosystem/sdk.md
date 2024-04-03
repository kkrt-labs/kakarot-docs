---
title: SDKs and Libraries
sidebar_position: 1
---

## Overview

Welcome to the SDKs page! Find useful information about SDKs and Libraries (e.g.
Foundry, Viem, Hardhat), such as recommended configuration or known issues.

### Hardhat

> [Hardhat](https://hardhat.org/) is a development environment for Ethereum
> software. It consists of different components for editing, compiling,
> debugging and deploying your smart contracts and dApps, all of which work
> together to create a complete development environment.

#### Hardhat Ignition

> Hardhat Ignition is a declarative system for deploying smart contracts on
> Ethereum.

We recommend users to pay attention to the
[configuration of Ignition on Kakarot Sepolia](https://hardhat.org/ignition/docs/config#requiredconfirmations).

There are some known issues with the default Ignition configuration. For
instance, the default for the number of block confirmations required by ignition
to prevent re-orgs is 5. We recommend users to set this to 1 in Kakarot Sepolia.
Another example is that Kakarot does not support fee bumping since it has no fee
market (FIFO system).

Here is an example configuration for Kakarot
Sepolia.

```js
// hardhat.config.js
module.exports = {
  ignition: {
    blockPollingInterval: 3_000,
    timeBeforeBumpingFees: 3 * 60 * 1_000,
    maxFeeBumps: 0,
    requiredConfirmations: 1,
  },
};
```
