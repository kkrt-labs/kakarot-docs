---
title: Particle Network
sidebar_position: 2
---

## Particle Network Wallet-as-a-Service

Particle Network's Wallet-as-a-Service integrates decentralized wallet functionality with social logins into web applications. With minimal setup, developers can leverage Particle's powerful SDKs to enable 2-click onboarding into smart accounts through social logins.

## Quickstart Guide

Integrate Particle Auth with Account Abstraction into your Next.js application in minutes by following these steps:

### Installation

Install the necessary Particle Network packages using npm:

```bash
npm install @particle-network/auth-core-modal @particle-network/auth-core @particle-network/chains @particle-network/aa ethers
```

### Configuration

Configure Particle Auth in your application using the `AuthCoreContextProvider` component. Obtain your `projectId`, `clientKey`, and `appId` from the [Particle Dashboard](https://dashboard.particle.network/).

```jsx
"use client";
import { Inter } from "next/font/google";
import "./globals.css";

// Particle imports
import { KakarotSepolia } from "@particle-network/chains";
import { AuthType } from "@particle-network/auth-core";
import { AuthCoreContextProvider } from "@particle-network/auth-core-modal";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthCoreContextProvider
          options={{
            // All env variable must be defined at runtime
            projectId: process.env.NEXT_PUBLIC_PROJECT_ID!,
            clientKey: process.env.NEXT_PUBLIC_CLIENT_KEY!,
            appId: process.env.NEXT_PUBLIC_APP_ID!,
            themeType: "dark",
            fiatCoin: "USD",
            language: "en",

            // Define UI elements for the smart account
            erc4337: {
              name: "SIMPLE",
              version: "2.0.0",
            },
            wallet: {
              // Set to false to remove the embedded wallet modal
              visible: true,
              customStyle: {
                // Locks the chain selector to IoTeX mainnet and testnet
                supportChains: [KakarotSepolia],
              },
            },
          }}
        >
          {children}
        </AuthCoreContextProvider>
      </body>
    </html>
  );
}

```

Once the SDK is configured, you can implement social logins and Account Abstraction (AA) in your application. Particle Auth provides various hooks to facilitate these features.

### Social Logins

To enable social logins, use the `useConnect` hook, which provides the `connect` function to streamline the process of creating a wallet through social authentication. The following code demonstrates how to connect a user using the Kakarot Sepolia chain:

```jsx
import { useConnect } from '@particle-network/auth-core-modal';
import { KakarotSepolia } from '@particle-network/chains';

// Handle user connection
const { connect } = useConnect();

await connect({
  chain: KakarotSepolia,
});

```

### Account Abstraction

The AA SDK allows you to set up and configure smart accounts. Here's how you can configure a smart account using Particle Network:

```jsx
import { SmartAccount } from '@particle-network/aa';
import { KakarotSepolia } from '@particle-network/chains';

// Set up and configure the smart account
const smartAccount = new SmartAccount(provider, {
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID!,
  clientKey: process.env.NEXT_PUBLIC_CLIENT_KEY!,
  appId: process.env.NEXT_PUBLIC_APP_ID!,
  aaOptions: {
    accountContracts: {
      SIMPLE: [
        {
          version: '2.0.0',
          chainIds: [KakarotSepolia.id],
        },
      ],
    },
  },
});

```

In this setup:

- **SmartAccount**: This class is used to create a smart account that leverages an instance of [SimpleAccount](https://github.com/eth-infinitism/account-abstraction/blob/develop/contracts/samples/SimpleAccount.sol).
- **aaOptions**: This field specifies the version and chain IDs for the account contracts, allowing you to configure the smart account with specific blockchain settings. Here, we're using version 2.0.0 and targeting the Kakarot Sepolia chain.

> Find a complete implementation example on the [Kakarot-Particle-AA Demo](https://github.com/Particle-Network/kakarot-auth-aa-demo/blob/main/kakarot-particle-aa-nextjs/src/app/page.tsx).

Upon logging in, the embedded wallet model included with Particle Auth will be accessible through the button at the bottom right unless otherwise specified through the wallet within `AuthCoreContextProvider`.

## Learn More

Explore Particle Network's [documentation](https://docs.particle.network/) to learn more about the Particle SDKs.