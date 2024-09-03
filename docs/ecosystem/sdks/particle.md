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
npm install @particle-network/authkit @particle-network/wallet viem@2 @particle-network/auth-core @particle-network/aa ethers
```

### Configuration

Configure Particle Auth in your application using the `AuthCoreContextProvider` component. Obtain your `projectId`, `clientKey`, and `appId` from the [Particle Dashboard](https://dashboard.particle.network/).

The `AuthCoreContextProvider` component manages the setup for Particle Auth. A recommended approach is to create a separate `AuthKit.tsx` file in the `src` directory, where you can configure and export a component to wrap your application with.

After setting it up, use the exported component to wrap your main `App` component, ensuring that authentication is accessible across your entire application.

Below is an example of configuring `AuthCoreContextProvider` and exporting the `ParticleAuthKit` component.

```jsx
"use client";

// Particle imports
import { kakarotSepolia } from "@particle-network/authkit/chains"; // Chains are imported here
import { AuthType } from "@particle-network/auth-core";
import {
  AuthCoreContextProvider,
  PromptSettingType,
} from "@particle-network/authkit";
import { EntryPosition } from "@particle-network/wallet";

export const ParticleAuthkit = ({ children }: React.PropsWithChildren) => {
  return (
    <AuthCoreContextProvider
      options={{
        projectId: process.env.NEXT_PUBLIC_PROJECT_ID!,
        clientKey: process.env.NEXT_PUBLIC_CLIENT_KEY!,
        appId: process.env.NEXT_PUBLIC_APP_ID!,
        authTypes: [
          AuthType.email,
          AuthType.google,
          AuthType.twitter,
          AuthType.github,
          AuthType.discord,
        ],
        themeType: "dark",

        // List the chains you want to include
        chains: [kakarotSepolia],

        // Optionally, switches the embedded wallet modal to reflect a smart account
        erc4337: {
          name: "SIMPLE",
          version: "2.0.0",
        },

        // You can prompt the user to set up extra security measures upon login or other interactions
        promptSettingConfig: {
          promptPaymentPasswordSettingWhenSign: PromptSettingType.first,
          promptMasterPasswordSettingWhenLogin: PromptSettingType.first,
        },

        wallet: {
          themeType: "dark", // Wallet modal theme
          entryPosition: EntryPosition.TR,

          // Set to false to remove the embedded wallet modal
          visible: true,
          customStyle: {
            supportUIModeSwitch: true,
            supportLanguageSwitch: false,
          },
        },
      }}
    >
      {children}
    </AuthCoreContextProvider>
  );
};

```

After configuring the `ParticleAuthKit` component, integrate it into your `layout.tsx` or `index.tsx` file:

```tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

import { ParticleAuthkit } from "./components/AuthKit";

export const metadata: Metadata = {
  title: "Particle Auth app",
  description: "App leveraging Particle Auth for social logins.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ParticleAuthkit>{children}</ParticleAuthkit>
      </body>
    </html>
  );
}

```

After configuring the SDK, you can integrate social logins and Account Abstraction (AA) into your application. Particle Auth, in conjunction with Particle’s AA SDK, offers a variety of hooks to streamline the implementation of these features.

### Social Logins

To enable social logins, use the `useConnect` hook, which provides the `connect()` function to simplify the process of generating a wallet through a selected social login method. The following code snippet demonstrates how to connect a user to an application built on Kakarot Sepolia:

```jsx
import { useConnect } from  "@particle-network/authkit";
import { kakarotSepolia } from "@particle-network/authkit/chains";

// Handle user connection
const { connect } = useConnect();

await connect({
  chain: kakarotSepolia,
});

```

### Account Abstraction

The AA SDK allows you to set up and configure smart accounts. Here's how you can configure a smart account using Particle Network:

```tsx
import { SmartAccount } from '@particle-network/aa';
import { useEthereum } from "@particle-network/authkit";
import { kakarotSepolia } from "@particle-network/authkit/chains";

const { provider } = useEthereum();

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
          chainIds: [kakarotSepolia.id],
        },
      ],
    },
  },
});
```

In this setup:

- **SmartAccount**: This class is used to create a smart account that leverages an instance of [SimpleAccount](https://github.com/eth-infinitism/account-abstraction/blob/develop/contracts/samples/SimpleAccount.sol).
- **aaOptions**: This field specifies the version and chain IDs for the account contracts, allowing you to configure the smart account with specific blockchain settings. Here, we're using version 2.0.0 and targeting the Kakarot Sepolia chain.

Upon logging in, the embedded wallet modal included with Particle Auth will be accessible through the button at the bottom right unless otherwise specified through the wallet within `AuthCoreContextProvider`.

### Use `ethers` to send transactions via the Smart Account

You can wrap the smart account in an `ethers` instance to facilitate transactions. Here’s an example:

```tsx
import { AAWrapProvider, SendTransactionMode } from "@particle-network/aa";
import { ethers, type Eip1193Provider } from "ethers";

const ethersProvider = new ethers.BrowserProvider(
      new AAWrapProvider(smartAccount, SendTransactionMode.Gasless) as Eip1193Provider,
      "any"
    );
    
const executeTxEthers = async () => {
  const signer = await ethersProvider.getSigner();
  const txResponse = await signer.sendTransaction({
    to: recipientAddress,
    value: ethers.parseEther("0.01"),
  });
  const txReceipt = await txResponse.wait();
  console.log(txReceipt.hash);
};
```

> Find a complete implementation example on the [Kakarot-Particle-AA Demo](https://github.com/Particle-Network/kakarot-auth-aa-demo/blob/main/kakarot-particle-aa-nextjs/src/app/page.tsx).

## Learn More

Explore Particle Network's [documentation](https://docs.particle.network/) to learn more about the Particle SDKs.