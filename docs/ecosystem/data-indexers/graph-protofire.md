---
title: The Graph by Protofire
sidebar_position: 3
---

# Glossary

- [The Graph](https://thegraph.com/) is an indexing protocol for organizing and accessing data from blockchains and storage networks. It allows developers to search, find, publish, and use the public data they need to build decentralized applications.
- [Protofire](https://protofire.io/) is a developers DAO that works with Web3 projects, deliver solutions that bring growth in TVL and usage. Protofire have been in the ecosystem since 2016, working with more than 65 protocols and more than 25 networks. Protofire is one of the oldest and biggest indexers on The Graph Decentralized Network possessing significant knowledge base in the ecosystem.
- **Kakarot Hosted Service** is a service provided by Protofire on Kakarot network that allows anyone to deploy their Subgraphs over Kakarot.
- [Kakarot Subgraph Explorer](https://ui.kakarot.protofire.io/)

# How to Deploy a Subgraph Using Kakarot Hosted Service

## Prerequisites

Before deploying the subgraph using the Kakarot Hosted Service, ensure that you have installed the following:

- [Node.js and npm](#how-to-install-nodejs-and-npm)
- [Yarn](#how-to-install-yarn)
- [Graph CLI](#how-to-install-graph-cli)

## Step 1: Download the Repository

```bash
git clone https://github.com/protofire/kakarot-subgraph
cd kakarot-subgraph
```

## Step 2: Build the Subgraph

```bash
yarn install
graph codegen
graph build
```

## Step 3: Get Credentials

You'll need credentials to use the Kakarot hosted service. Complete this form to request permission to deploy a subgraph:

[Request Permissions](https://forms.gle/PkTw4F8NEowhB9yC7)

## Step 4: Deploy the Subgraph

Once you have your credentials (user and password), you can deploy the subgraph:

```bash
graph create --node https://user:password@index.kakarot.protofire.io kakarot/UniswapV2
graph deploy kakarot/UniswapV2 --version-label kakarot/UniswapV2 --headers "{\"Authorization\": \"Basic <user:password encoded>\"}" --ipfs https://ipfs.kakarot.protofire.io --node https://user:password@index.kakarot.protofire.io
```
Make sure to replace `user:password` with actual credentials received from Protofire team, and `<user:password encoded>` with the same credentials, but encoded in Base64. To encode your credentials you can use the following command:
```bash
echo user:password | base64
```

## Step 5: Verify subgraph status in Kakarot Subgraph Explorer
The link you receive in the output of the command in the step 4 will be incorrect. To get the correct one - visit the [Kakarot Subgraph Explorer](https://ui.kakarot.protofire.io/).

# Additional Resources

For more information about subgraphs, visit The Graph documentation:

[The Graph Documentation](https://thegraph.com/docs/en/developing/creating-a-subgraph/)

## How to Install Node.js and npm

- **Description:** Node.js is a server platform for running JavaScript, which includes npm (Node Package Manager).
- **Usage:** Required for installing dependencies and running development tools like Graph CLI.
- **Installation:** Download and install Node.js and npm from the official website:
  - [Download Node.js](https://nodejs.org/en/)

## How to Install Yarn

- **Description:** Yarn is an alternative to npm for managing project dependencies. It is used for fast and reliable package installation.
- **Installation:** Install Yarn via npm:
  ```bash
  npm install -g yarn
  ```

## How to Install Docker and Docker Compose

- **Description:** Docker is a containerization platform that allows running applications in isolated containers. Docker Compose is a tool for managing multi-container applications.
- **Usage:** Used for deploying services like IPFS, Postgres, and Graph Node, which are necessary for running subgraphs locally.
- **Installation:** Download and install Docker from the official website:
  - [Download Docker](https://www.docker.com/products/docker-desktop)
 
## How to Install Graph CLI

- **Description:** Graph CLI is a command-line tool for creating, building, and deploying subgraphs.
- **Installation:** Install Graph CLI via npm:
  ```bash
  npm install -g @graphprotocol/graph-cli
  ```
