# Basement SDK

The Basement SDK has sensible defaults and flexibility to allow you to get the data you want efficiently and effortlessly.

## Installation

Basement SDK is available as an [npm package](https://www.npmjs.com/package/@basementdev/sdk)

**npm:**

```bash
npm install @basementdev/sdk
```

**yarn:**

```bash
yarn add @basementdev/sdk
```

## Getting Started

Here's an example of a basic query using the SDK:

```typescript
import { BasementSDK } from "@basementdev/sdk";

const sdk = new BasementSDK();

const data = await sdk.address({
  address: "vitalik.eth",
  include: { profile: true, tokens: true },
});
```

## Methods

### `token`

Queries information about a specific token

#### Example usage

```typescript
const token = await sdk.token({
  contract: "0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D",
  tokenId: "660",
  media: true,
  sales: true,
  include: {
    owner: true,
  },
});
```

#### Parameters

| Name                                          | Type              | Description                                                                                                                                                                      |
| --------------------------------------------- | ----------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `contract`                                    | `string`          | Token's contract hex-address or ENS name.                                                                                                                                        |
| `tokenId`                                     | `string`          | The token ID within the contract.                                                                                                                                                |  |
| `include.media`                               | `bool`            | If `true`, the media attached to the token, like the image and animation will be included.                                                                                       |
| `include.tokenUri`                            | `bool`            | If `true`, the tokenUri will be included, which is directly called from the contract and given as is, in JSON format.                                                            |
| `include.sales`                               | `object \| bool`  | If `true`, sale data will be included. This includes information like the price at which previous sales happened and on which marketplace.                                       |
| `include.sales.maker`                         | `object \| bool`  | If `true`, it will include the maker's address                                                                                                                                   |
| `include.sales.maker.reverseProfile`          | `bool`            | If `true`, the reverse resolution of the ENS ([ENS  docs](https://docs.ens.domains/contract-api-reference/reverseregistrar)) profile information will be included, if available. |
| `include.sales.taker`                         | `object \| bool`  | If `true`, it will include the taker's address                                                                                                                                   |
| `include.sales.taker.reverseProfile`          | `bool`            | If `true`, the reverse resolution of the ENS ([ENS  docs](https://docs.ens.domains/contract-api-reference/reverseregistrar)) profile information will be included, if available. |
| `include.mintTransaction`                     | `object \| bool`  | If `true`, the information regarding the token's mint will be included. This includes information like the mint transaction and mint price.                                      |  |
| `include.mintTransaction.logs`                | `bool`            | If `true`, it will include the logs that happened within the transaction.                                                                                                        |  |
| `include.mintTransaction.from`                | `object \| bool`  | If `true`, it will include the sender's address that initiated this transaction.                                                                                                 |  |
| `include.mintTransaction.from.reverseProfile` | `bool`            | If `true`, the reverse resolution of the ENS ([ENS  docs](https://docs.ens.domains/contract-api-reference/reverseregistrar)) profile information will be included, if available. |
| `include.mintTransaction.to`                  | `object \| bool`  | If `true`, it will include the address the transaction was sent to. This can be another wallet, a contract, or `null` in the case of a contract creation.                        |
| `include.mintTransaction.to.reverseProfile`   | `bool`            | If `true`, the reverse resolution of the ENS ([ENS  docs](https://docs.ens.domains/contract-api-reference/reverseregistrar)) profile information will be included, if available. |
| `include.owner`                               | `object  \| bool` | If `true`, only the `owner`'s address will be included. This includes information like the mint transaction and mint price.                                                      |
| `include.owner.profile`                       | `bool`            | If `true`, the profile information will be included, if available.                                                                                                               |
| `include.owner.reverseProfile`                | `bool`            | If `true`, the reverse resolution of the ENS ([ENS  docs](https://docs.ens.domains/contract-api-reference/reverseregistrar)) profile information will be included, if available. |

### `tokens`

Query tokens that satisfy the given filter(s)

#### Example usage

```typescript
const data = await sdk.tokens({
  filter: { ownerAddresses: ["vitalik.eth"] },
  include: { owner: true },
});
```

#### Parameters

| Name                                          | Type              | Description                                                                                                                                                                      |
| --------------------------------------------- | ----------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `filter.ownerAddresses`                       | `string[]`        | Filter tokens that satisfy the given owner addresses.                                                                                                                            |
| `limit`                                       | `number`          | Maximum number of tokens to return.                                                                                                                                              |
| `after`                                       | `string`          | Cursor used for pagination. To go the next page, provide the given cursor from the response, if available.                                                                       |
| `include.totalCount`                          | `bool`            | If `true`, it will include the total count. It's capped at 10,000 for performance reasons.                                                                                       |
| `include.media`                               | `bool`            | If `true`, the media attached to the token, like the image and animation will be included.                                                                                       |
| `include.tokenUri`                            | `bool`            | If `true`, the tokenUri will be included, which is directly called from the contract and given as is, in JSON format.                                                            |
| `include.sales`                               | `object \| bool`  | If `true`, sale data will be included. This includes information like the price at which previous sales happened and on which marketplace.                                       |
| `include.sales.maker`                         | `object \| bool`  | If `true`, it will include the maker's address                                                                                                                                   |
| `include.sales.maker.reverseProfile`          | `bool`            | If `true`, the reverse resolution of the ENS ([ENS  docs](https://docs.ens.domains/contract-api-reference/reverseregistrar)) profile information will be included, if available. |
| `include.sales.taker`                         | `object \| bool`  | If `true`, it will include the taker's address                                                                                                                                   |
| `include.sales.taker.reverseProfile`          | `bool`            | If `true`, the reverse resolution of the ENS ([ENS  docs](https://docs.ens.domains/contract-api-reference/reverseregistrar)) profile information will be included, if available. |
| `include.mintTransaction`                     | `object \| bool`  | If `true`, the information regarding the token's mint will be included. This includes information like the mint transaction and mint price.                                      |
| `include.mintTransaction.logs`                | `bool`            | If `true`, it will include the logs that happened within the transaction.                                                                                                        |
| `include.mintTransaction.from`                | `object \| bool`  | If `true`, it will include the sender's address that initiated this transaction.                                                                                                 |
| `include.mintTransaction.from.reverseProfile` | `bool`            | If `true`, the reverse resolution of the ENS ([ENS  docs](https://docs.ens.domains/contract-api-reference/reverseregistrar)) profile information will be included, if available. |
| `include.mintTransaction.to`                  | `object \| bool`  | If `true`, it will include the address the transaction was sent to. This can be another wallet, a contract, or `null` in the case of a contract creation.                        |
| `include.mintTransaction.to.reverseProfile`   | `bool`            | If `true`, the reverse resolution of the ENS ([ENS  docs](https://docs.ens.domains/contract-api-reference/reverseregistrar)) profile information will be included, if available. |
| `include.owner`                               | `object  \| bool` | If `true`, only the `owner`'s address will be included. This includes information like the mint transaction and mint price.                                                      |
| `include.owner.profile`                       | `bool`            | If `true`, the profile information will be included, if available.                                                                                                               |
| `include.owner.reverseProfile`                | `bool`            | If `true`, the reverse resolution of the ENS ([ENS  docs](https://docs.ens.domains/contract-api-reference/reverseregistrar)) profile information will be included, if available. |

### `address`

Queries information about an address

#### Example usage

```typescript
const data = await sdk.address({
  address: "vitalik.eth",
  include: { profile: true, tokens: { limit: 5 } },
});
```

#### Parameters

| Name                                                 | Type             | Description                                                                                                                                                                      |
| ---------------------------------------------------- | ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `address`                                            | `string`         | hex-address or ENS address                                                                                                                                                       |
| `include.tokens.limit`                               | `number`         | Maximum number of tokens to return.                                                                                                                                              |
| `include.profile`                                    | `bool`           | If `true`, the profile information will be included, if available.                                                                                                               |
| `include.reverseProfile`                             | `bool`           | If `true`, the reverse resolution of the ENS ([ENS  docs](https://docs.ens.domains/contract-api-reference/reverseregistrar)) profile information will be included, if available. |
| `include.tokens`                                     | `object \| bool` | If `true`, it will include basic data like name and description of the token.                                                                                                    |
| `include.tokens.media`                               | `bool`           | If `true`, the media attached to the token, like the image and animation will be included.                                                                                       |
| `include.tokens.tokenUri`                            | `bool`           | If `true`, the tokenUri will be included, which is directly called from the contract and given as is, in JSON format.                                                            |
| `include.tokens.sales`                               | `object \| bool` | If `true`, sale data will be included. This includes information like the price at which previous sales happened and on which marketplace.                                       |
| `include.tokens.sales.maker`                         | `object \| bool` | If `true`, it will include the maker's address                                                                                                                                   |
| `include.tokens.sales.maker.reverseProfile`          | `bool`           | If `true`, the reverse resolution of the ENS ([ENS  docs](https://docs.ens.domains/contract-api-reference/reverseregistrar)) profile information will be included, if available. |
| `include.tokens.sales.taker`                         | `object \| bool` | If `true`, it will include the taker's address                                                                                                                                   |
| `include.tokens.sales.taker.reverseProfile`          | `bool`           | If `true`, the reverse resolution of the ENS ([ENS  docs](https://docs.ens.domains/contract-api-reference/reverseregistrar)) profile information will be included, if available. |
| `include.tokens.mintTransaction`                     | `object \| bool` | If `true`, the information regarding the token's mint will be included. This includes information like the mint transaction and mint price.                                      |
| `include.tokens.mintTransaction.logs`                | `bool`           | If `true`, it will include the logs that happened within the transaction.                                                                                                        |
| `include.tokens.mintTransaction.from`                | `object \| bool` | If `true`, it will include the sender's address that initiated this transaction.                                                                                                 |
| `include.tokens.mintTransaction.from.reverseProfile` | `bool`           | If `true`, the reverse resolution of the ENS ([ENS  docs](https://docs.ens.domains/contract-api-reference/reverseregistrar)) profile information will be included, if available. |
| `include.tokens.mintTransaction.to`                  | `object \| bool` | If `true`, it will include the address the transaction was sent to. This can be another wallet, a contract, or `null` in the case of a contract creation.                        |
| `include.tokens.mintTransaction.to.reverseProfile`   | `bool`           | If `true`, the reverse resolution of the ENS ([ENS  docs](https://docs.ens.domains/contract-api-reference/reverseregistrar)) profile information will be included, if available. |

### `transaction`

Queries information about a transaction

#### Example usage

```typescript
const tx = await sdk.transaction({
  hash: "0xcdcc49079b7622c9527e9bd50314dda94ac4e3da5e0378d1ed1c41b1a442f531",
  include: { logs: true, from: true, to: true }
});
```

#### Parameters

| Name                          | Type             | Description                                                                                                                                                                      |
| ----------------------------- | ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `hash`                        | `string`         | Transaction hash                                                                                                                                                                 |
| `include.from`                | `object \| bool` | If `true`, it will include the sender's address that initiated this transaction.                                                                                                 |
| `include.from.reverseProfile` | `bool`           | If `true`, the reverse resolution of the ENS ([ENS  docs](https://docs.ens.domains/contract-api-reference/reverseregistrar)) profile information will be included, if available. |
| `include.to`                  | `object \| bool` | If `true`, it will include the address the transaction was sent to. This can be another wallet, a contract, or `null` in the case of a contract creation.                        |
| `include.to.reverseProfile`   | `bool`           | If `true`, the reverse resolution of the ENS ([ENS  docs](https://docs.ens.domains/contract-api-reference/reverseregistrar)) profile information will be included, if available. |
| `include.logs`                | `bool`           | If `true`, it will include the logs that happened within the transaction.                                                                                                        |

### `transactions`

Query transactions that satisfy the given filter(s)

#### Example usage

```typescript
const data = await sdk.transactions({
  filter: { toAddresses: ["vitalik.eth"] },
  include: { totalCount: true, from: true, to: true },
});
```

#### Parameters

| Name                          | Type             | Description                                                                                                                                                                      |
| ----------------------------- | ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `filter.methodIds`            | `string[]`       | A list of methodIds as specified in the first 4 bytes of calldata. Note: this field is not verified to be a valid call. Addresses may send transactions with arbitrary data.     |
| `filter.toAddresses`          | `string[]`       | A list of addresses to whom a transaction was sent. Add `null` to include contract creation transactions. Ignored when empty.                                                    |
| `filter.blockNumbers`         | `number[]`       | A list of block numbers to include transactions from.                                                                                                                            |
| `filter.fromAddresses`        | `string[]`       | A list of addresses who initiated transactions. Ignored when empty.                                                                                                              |
| `include.totalCount`          | `bool`           | If `true`, it will include the total count. It's capped at 10,000 for performance reasons.                                                                                       |
| `include.from`                | `object \| bool` | If `true`, it will include the sender's address that initiated this transaction.                                                                                                 |
| `include.from.reverseProfile` | `bool`           | If `true`, the reverse resolution of the ENS ([ENS  docs](https://docs.ens.domains/contract-api-reference/reverseregistrar)) profile information will be included, if available. |
| `include.to`                  | `object \| bool` | If `true`, it will include the address the transaction was sent to. This can be another wallet, a contract, or `null` in the case of a contract creation.                        |
| `include.to.reverseProfile`   | `bool`           | If `true`, the reverse resolution of the ENS ([ENS  docs](https://docs.ens.domains/contract-api-reference/reverseregistrar)) profile information will be included, if available. |
| `include.logs`                | `bool`           | If `true`, it will include the logs that happened within the transaction.                                                                                                        |
### `transactionLogs`

Query transaction logs that satisfy the given filter(s)

#### Example usage

```typescript
const data = await sdk.transactionLogs({
  filter: { includeRemoved: true, topics: [[]] },
  include: {
    totalCount: true,
    address: true,
    transaction: { from: true, to: true },
  },
});
```

#### Parameters

| Name                                      | Type             | Description                                                                                                                                                                      |
| ----------------------------------------- | ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `filter.includeRemoved`                   | `bool`           | If `true`, it will filter logs which were removed during a block reorg.                                                                                                          |
| `filter.topics`                           | `string[][]`     | A list of topics to search for. See [this](https://docs.basement.dev/schema/inputObjects#transactionlogfilter) section for more details.                                         |
| `filter.addresses`                        | `string[]`       | A list of contract addresses from which this log was emitted. Ignored when empty.                                                                                                |
| `filter.blockNumbers`                     | `number[]`       | A list of block numbers to include transaction logs from                                                                                                                         |
| `filter.transaction.fromAddresses`        | `string[]`       | A list of block numbers to include transaction logs from                                                                                                                         |
| `filter.transaction.toAddresses`          | `string[]`       | A list of addresses to whom a transaction was sent. Add `null` to include contract creation transactions. Ignored when empty.                                                    |
| `include.totalCount`                      | `bool`           | If `true`, it will include the total count. It's capped at 10,000 for performance reasons.                                                                                       |
| `include.address`                         | `object \| bool` | If `true`, it will include include the address of the contract which emitted this log.                                                                                           |
| `include.address.reverseProfile`          | `bool`           | If `true`, the reverse resolution of the ENS ([ENS  docs](https://docs.ens.domains/contract-api-reference/reverseregistrar)) profile information will be included, if available. |
| `include.transaction.from`                | `object \| bool` | If `true`, it will include the sender's address that initiated this transaction.                                                                                                 |
| `include.transaction.from.reverseProfile` | `bool`           | If `true`, the reverse resolution of the ENS ([ENS  docs](https://docs.ens.domains/contract-api-reference/reverseregistrar)) profile information will be included, if available. |
| `include.transaction.to`                  | `object \| bool` | If `true`, it will include the address the transaction was sent to. This can be another wallet, a contract, or `null` in the case of a contract creation.                        |
| `include.transaction.to.reverseProfile`   | `bool`           | If `true`, the reverse resolution of the ENS ([ENS  docs](https://docs.ens.domains/contract-api-reference/reverseregistrar)) profile information will be included, if available. |


### `nonFungibleTokenRefresh`

Refreshes metadata of a specific token

#### Example usage

```typescript
const data = await sdk.nonFungibleTokenRefresh({
  contract: "0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D",
  tokenId: "660",
});
```

#### Parameters

| Name       | Type     | Default | Description                             |
| ---------- | -------- | ------- | --------------------------------------- |
| `contract` | `string` |         | The contract's hex-address or ENS name. |
| `tokenId`  | `string` |         | The token ID within the contract.       |

### `erc721Transfers`

Query ERC721 transfers that satisfy the given filter(s)

#### Example usage

```typescript
const data = await sdk.erc721Transfers({
  filter: {
    exclude: [
      ExcludeTransferFilter.Airdrop,
      ExcludeTransferFilter.ZeroEthTransfer,
    ],
  },
  include: {
    totalCount: true,
    contract: true,
    from: true,
    to: true,
    sale: {
      maker: { reverseProfile: true },
      taker: { reverseProfile: false },
    },
    token: ,
    transaction: true,
  },
});
```
#### Parameters

| Name                                                | Type                      | Description                                                                                                                                                                      |
| --------------------------------------------------- | ------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `filter.blockNumbers`                               | `number[]`                | A list of block numbers to include transfers from.                                                                                                                               |
| `filter.contractAddresses`                          | `string[]`                | A list of contract addresses to include transfers from.                                                                                                                          |
| `filter.fromAddresses`                              | `string[]`                | A list of addresses who sent the NFT.                                                                                                                                            |
| `filter.toAddresses`                                | `string[]`                | A list of addresses who received the NFT.                                                                                                                                        |
| `filter.tokenIds`                                   | `string[]`                | Token IDs to include transfers from.                                                                                                                                             |
| `filter.exclude`                                    | `ExcludeTransferFilter[]` | Categories to exclude transfers from.                                                                                                                                            |
| `limit`                                             | `number`                  | Maximum number of token transfers to return.                                                                                                                                     |
| `include.totalCount`                                | `bool`                    | If `true`, it will include the total count. It's capped at 10,000 for performance reasons.                                                                                       |
| `include.contract`                                  | `bool`                    | If `true`, it will include the address containing this token's contract code                                                                                                     |
| `include.contract.reverseProfile`                   | `bool`                    | If `true`, the reverse resolution of the ENS ([ENS  docs](https://docs.ens.domains/contract-api-reference/reverseregistrar)) profile information will be included, if available. |
| `include.from`                                      | `object \| bool`          | If `true`, the address sending this token, when this contains the `null address` this token was minted during this transfer.                                                     |
| `include.from.reverseProfile`                       | `bool`                    | If `true`, the reverse resolution of the ENS ([ENS  docs](https://docs.ens.domains/contract-api-reference/reverseregistrar)) profile information will be included, if available. |
| `include.to`                                        | `object \| bool`          | If `true`, it will include the address receiving this token, when this contains the `null address` this token was burned during this transfer                                    |
| `include.to.reverseProfile`                         | `bool`                    | If `true`, the reverse resolution of the ENS ([ENS  docs](https://docs.ens.domains/contract-api-reference/reverseregistrar)) profile information will be included, if available. |
| `include.transaction.from`                          | `object \| bool`          | If `true`, it will include the sender's address that initiated this transaction.                                                                                                 |
| `include.transaction.from.reverseProfile`           | `bool`                    | If `true`, the reverse resolution of the ENS ([ENS  docs](https://docs.ens.domains/contract-api-reference/reverseregistrar)) profile information will be included, if available. |
| `include.transaction.to`                            | `object \| bool`          | If `true`, it will include the address the transaction was sent to. This can be another wallet, a contract, or `null` in the case of a contract creation.                        |
| `include.transaction.to.reverseProfile`             | `bool`                    | If `true`, the reverse resolution of the ENS ([ENS  docs](https://docs.ens.domains/contract-api-reference/reverseregistrar)) profile information will be included, if available. |
| `include.transaction.logs`                          | `bool`                    | If `true`, it will include the logs that happened within the transaction.                                                                                                        |
| `include.sale`                                      | `object \| bool`          | If `true`, it will include the sale log found to be associated with this transfer                                                                                                |
| `include.sale.maker`                                | `object \| bool`          | If `true`, it will include the maker's address                                                                                                                                   |
| `include.sale.maker.reverseProfile`                 | `bool`                    | If `true`, the reverse resolution of the ENS ([ENS  docs](https://docs.ens.domains/contract-api-reference/reverseregistrar)) profile information will be included, if available. |
| `include.sale.taker`                                | `object \| bool`          | If `true`, it will include the taker's address                                                                                                                                   |
| `include.sale.taker.reverseProfile`                 | `bool`                    | If `true`, the reverse resolution of the ENS ([ENS  docs](https://docs.ens.domains/contract-api-reference/reverseregistrar)) profile information will be included, if available. |
| `include.token`                                     | `object \| bool`          | If `true`, it will include basic data like name and description of the token.                                                                                                    |
| `include.token.media`                               | `bool`                    | If `true`, the media attached to the token, like the image and animation will be included.                                                                                       |
| `include.token.tokenUri`                            | `bool`                    | If `true`, the tokenUri will be included, which is directly called from the contract and given as is, in JSON format.                                                            |
| `include.token.sales`                               | `object \| bool`          | If `true`, sale data will be included. This includes information like the price at which previous sales happened and on which marketplace.                                       |
| `include.token.sales.maker`                         | `object \| bool`          | If `true`, it will include the maker's address                                                                                                                                   |
| `include.token.sales.maker.reverseProfile`          | `bool`                    | If `true`, the reverse resolution of the ENS ([ENS  docs](https://docs.ens.domains/contract-api-reference/reverseregistrar)) profile information will be included, if available. |
| `include.token.sales.taker`                         | `object \| bool`          | If `true`, it will include the taker's address                                                                                                                                   |
| `include.token.sales.taker.reverseProfile`          | `bool`                    | If `true`, the reverse resolution of the ENS ([ENS  docs](https://docs.ens.domains/contract-api-reference/reverseregistrar)) profile information will be included, if available. |
| `include.token.mintTransaction`                     | `object \| bool`          | If `true`, the information regarding the token's mint will be included. This includes information like the mint transaction and mint price.                                      |
| `include.token.mintTransaction.logs`                | `bool`                    | If `true`, it will include the logs that happened within the transaction.                                                                                                        |
| `include.token.mintTransaction.from`                | `object \| bool`          | If `true`, it will include the sender's address that initiated this transaction.                                                                                                 |
| `include.token.mintTransaction.from.reverseProfile` | `bool`                    | If `true`, the reverse resolution of the ENS ([ENS  docs](https://docs.ens.domains/contract-api-reference/reverseregistrar)) profile information will be included, if available. |
| `include.token.mintTransaction.to`                  | `object \| bool`          | If `true`, it will include the address the transaction was sent to. This can be another wallet, a contract, or `null` in the case of a contract creation.                        |
| `include.token.mintTransaction.to.reverseProfile`   | `bool`                    | If `true`, the reverse resolution of the ENS ([ENS  docs](https://docs.ens.domains/contract-api-reference/reverseregistrar)) profile information will be included, if available. |
