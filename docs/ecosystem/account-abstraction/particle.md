---
title: Particle Network
sidebar_position: 2
---

## Account Abstraction with Particle Network

**Particle Network** offers a streamlined, full-stack implementation of **ERC-4337** account abstraction, empowering developers to build sophisticated decentralized applications (dApps) with smart accounts. With Particle Network’s [Account Abstraction SDK](https://developers.particle.network/api-reference/aa/introduction), developers can seamlessly create, sponsor, and execute `UserOperations`.

**Account abstraction** allows developers to leverage advanced features such as gasless transactions, multi-sig, social recovery, and batched transactions by embedding custom logic within their accounts.

## Integrating Account Abstraction with Particle Network

Particle Network provides three distinct methods to integrate Account Abstraction (AA) into your dApps:

1. **[Particle Connect](https://developers.particle.network/api-reference/connect/introduction)** — Particle Connect combines Social and Web3 logins with built-in Account Abstraction support, all within a single SDK. This approach allows you to simplify user onboarding while directly incorporating AA features into your dApp.

2. **[Particle Auth](https://developers.particle.network/api-reference/auth/introduction) with [Particle AA SDK](https://developers.particle.network/api-reference/aa/introduction)** — For a more modular approach, Particle Auth enables the integration of social logins into your dApp. By pairing it with the Particle AA SDK, you can unlock the full range of Account Abstraction capabilities.

3. If your authentication needs are already covered, you can also use the **Particle AA SDK** as a stand-alone tool to integrate Account Abstraction with an existing application.

### Getting Started

To start integrating with Particle Connect, follow the steps in the [Quickstart Guide](https://developers.particle.network/guides/wallet-as-a-service/waas/connect/web-quickstart) provided in the [Particle Network Documentation](https://developers.particle.network/landing/introduction). For a complete Account Abstraction (AA) implementation, explore the [Demo repository](https://github.com/Particle-Network/connectkit-aa-usage).

Those looking to implement Particle Auth can find the relevant Quickstart Guide and repository directly in the [Kakarot Documentation](/ecosystem/sdks/particle).