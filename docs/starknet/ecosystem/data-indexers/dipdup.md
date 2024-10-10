---
title: DipDup
sidebar_position: 1
---

[DipDup](https://dipdup.io/) is a Python framework for building smart contract
indexers. It helps developers focus on business logic instead of writing a
boilerplate to store and serve data. DipDup-based indexers are selective, which
means only required data is requested. This approach allows to achieve faster
indexing times and decreased load on underlying APIs.

This page will guide you through the steps to get your first DipDup indexer up
and running in a few minutes without getting too deep into the details.

Let's create an indexer for output transactions from a specific address. We will
need to set up the indexing environment, configure the indexer, and store the
results in a database.

## Prerequisites

Here are a few things you need to get started with DipDup:

- **Skills**: Basic Python 3 knowledge to implement data handlers.
- **Operating System**: You can use any Linux/macOS distribution on amd64/arm64
  platforms with Python installed.
- **Python Version**: Python 3.11 is required for DipDup. You can check your
  Python version by running `python3 --version` in your terminal.

## Understanding DipDup

DipDup is a software framework that helps web3 developers create selective
indexers for decentralized applications. It uses blockchain data provided by
various off-chain data sources. Some of the key features of DipDup include:

- **Ready For Multichain**: DipDup supports dozens of blockchains, and we are
  constantly adding new ones. You can easily reuse your business logic for
  different networks or even index multiple chains in a single project.
- **Declarative Configuration**: A whole indexer is defined by a single
  configuration file and a bunch of Python data handlers. Code is completely
  separated from the configuration and environment variables, making it easy to
  maintain and deploy your project.
- **Lots of Integrations**: You can use SQLite, PostgreSQL, or TimescaleDB
  databases to store blockchain data, deploy to Compose or Swarm with a single
  command, monitor your indexer with Prometheus or Sentry, and more.
- **Magic GraphQL API**: DipDup automatically generates a GraphQL API for your
  data using Hasura, so you can easily query it from your frontend or other
  services. You can easily extend API with custom queries and metadata requests.
- **Powerful CLI**: DipDup CLI has everything you need to manage your project,
  from creating a new one to running and deploying. And it's very convenient.
  There are lots of templates for various blockchains and use cases, so you can
  start quickly.

## Step 1 — Install DipDup

The easiest way to install DipDup as a CLI application is
[pipx](https://pipx.pypa.io/stable/) with `pipx install dipdup` command. If you
don't want to deal with tooling, we have a convenient installer script. Run the
following command in your terminal:

```shell [Terminal]
curl -Lsf https://dipdup.io/install.py | python3
```

See the [Installation](https://dipdup.io/docs/installation) page for other
options.

## Step 2 — Create a project

DipDup CLI has a built-in project generator with lots of templates. To create a
new project interactively, run the following command:

```shell [Terminal]
dipdup new
```

For educational purposes, we'll create a project from scratch, so choose
`[none]` network and `demo_blank` template.

Follow the instructions; the project will be created in the new directory.

## Step 3 — Configuration file

The project root directory contains a YAML file named `dipdup.yaml`. It's the
main configuration file of your indexer. Available options are described in
detail on [this page](https://dipdup.io/docs/getting-started/config). For now,
just replace its content with the following:

```yaml [dipdup.yaml]
spec_version: 2.0
package: kakarot

datasources:
  mainnet_node:
    kind: evm.node
    url: https://sepolia-rpc.kakarot.org

contracts:
  some_contract:
    kind: evm
    address: 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
    typename: not_typed

indexes:
  evm_index:
    kind: evm.subsquid.transactions
    datasource: mainnet_node
    handlers:
      - callback: on_output_transaction
        from: some_contract
    last_level: 4631


database:
  kind: sqlite
  path: data/kakarot.sqlite
```

Now it's time to generate directories and files required for the project:
callbacks stubs, types and other entities we defined in configuration, don't
worry in this guide we will only need a small portion of those:

```shell [Terminal]
dipdup init
```

You can read more about the structure of the DipDup package
[here](https://dipdup.io/docs/getting-started/package)

## Step 4 — Define models and implement data handlers

In this step, we define the business logic of our application. DipDup supports
storing data in SQLite, PostgreSQL and TimescaleDB databases. We use custom ORM
based on Tortoise ORM as an abstraction layer.

First, you need to define a model class. Our schema will consist of a single
`Transaction` model:

```python [models/__init__.py]
from dipdup import fields
from dipdup.models import Model


class Transaction(Model):
    hash = fields.TextField(pk=True)
    block_number = fields.IntField()
    from_ = fields.TextField()
    to = fields.TextField(null=True)

    created_at = fields.DatetimeField(auto_now_add=True)

```

Our single handler will be responsible for processing output transactions as
described in the index definition in config:

```python [handlers/on_output_transaction.py]
from dipdup.context import HandlerContext
from dipdup.models.evm_node import EvmNodeTransactionData
from dipdup.models.evm_subsquid import SubsquidTransactionData

from kakarot import models as models


async def on_output_transaction(
    ctx: HandlerContext,
    transaction: SubsquidTransactionData | EvmNodeTransactionData,
) -> None:
    await models.Transaction(
        hash=transaction.hash,
        block_number=transaction.block_number,
        from_=transaction.from_,
        to=transaction.to,
    ).save()

```

## Step 5 — Results

Time to run the indexer. Processed data will be written to the SQLite file
defined in the configuration:

```shell
dipdup run
```

DipDup will fetch all the historical data and switch to realtime mode. You can
check the progress in the logs.

Query database to see the results:

```bash
sqlite3 /tmp/kakarot.sqlite 'SELECT * FROM transaction LIMIT 10'
```

## Explore DipDup

To learn more about DipDup features, visit the
[official DipDup documentation](https://dipdup.io/docs). It offers an in-depth
explanation of the framework concepts, lots of examples from basic to the most
advanced, allowing rapid and efficient development of blockchain data indexers
of any complexity.
