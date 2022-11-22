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
| `include`                                     | `object`          | Object used to choose what other data you want to include in the response.                                                                                                       |
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
| `include.mintTransaction.to`                  | `object \| bool`  | If `true`, it will include the address the transaction was sent to. This can be another wallet, a contract, or null in the case of a contract creation.                          |
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

| Name                           | Type     | Default | Description                                                                                                                                                                      |
| ------------------------------ | -------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `filter`                       | `object` |         | Object used to return a response based on the filtering option(s)                                                                                                                |
| `filter.contractAddress`       | `string` |         | Filter tokens that satisfy the given contract address.                                                                                                                           |
| `limit`                        | `number` | 10      | Maximum number of tokens to return.                                                                                                                                              |
| `include`                      | `object` |         | Object used to choose what other data you want to include in the response.                                                                                                       |
| `include.owner`                | `object` |         | If the `owner` object is empty, only the `owner`'s address will be included.                                                                                                     |
| `include.owner.profile`        | `bool`   | `false` | If `true`, the profile information will be included, if available.                                                                                                               |
| `include.owner.reverseProfile` | `bool`   | `false` | If `true`, the reverse resolution of the ENS ([ENS  docs](https://docs.ens.domains/contract-api-reference/reverseregistrar)) profile information will be included, if available. |
| `cursor`                       | `string` |         | Cursor used for pagination. To go the next page, provide the given cursor from the response.                                                                                     |

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

| Name                                  | Type     | Default | Description                                                                                                                                                                      |
| ------------------------------------- | -------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `name`                                | `string` |         | hex-address or ENS address                                                                                                                                                       |
| `include`                             | `object` |         | Object used to choose what other data you want to include in the response.                                                                                                       |
| `include.profile`                     | `bool`   | `false` | If `true`, the profile information will be included, if available.                                                                                                               |
| `include.reverseProfile`              | `bool`   | `false` | If `true`, the reverse resolution of the ENS ([ENS  docs](https://docs.ens.domains/contract-api-reference/reverseregistrar)) profile information will be included, if available. |
| `include.tokens`                      | `object` |         | If the `tokens` object is empty, it will include the tokens that the address holds with the default values for the parameters inside the `tokens` object.                        |
| `include.tokens.limit`                | `number` | 10      | Maximum number of tokens to return.                                                                                                                                              |
| `include.tokens.filterSuspectedScams` | `bool`   | `false` | *Experimental* - If `true`, it will remove the results that are suspected to be scams.                                                                                           |

### `tokenMetadataRefresh`

Refreshes metadata of a specific token

#### Example usage

```typescript
const data = await sdk.nonFungibleTokenRefresh({
  contract: "0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D",
  tokenId: "660",
});
```

#### Parameters

| Name       | Type     | Default | Description                                     |
| ---------- | -------- | ------- | ----------------------------------------------- |
| `contract` | `string` |         | The contract hex-address.                       |
| `tokenId`  | `string` |         | The token ID within the contract.               |
| `id`       | `number` |         | Internal ID - can be used for caching purposes. |

### `tokenTransfers`

Query token transfers that satisfy the given filter(s)

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
    token: true,
    transaction: true,
  },
});
```
#### Parameters

| Name                                       | Type     | Default | Description                                                                                                                                                                      |
| ------------------------------------------ | -------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `filter`                                   | `object` |         | Object used to return a response based on the filtering option(s).                                                                                                               |
| `filter.contractAddress`                   | `string` |         | Filter tokens that satisfy the given contract address.                                                                                                                           |
| `limit`                                    | `number` | 10      | Maximum number of token transfers to return.                                                                                                                                     |
| `include`                                  | `object` |         | Object used to choose what other data you want to include in the response.                                                                                                       |
| `include.erc721Metadata`                   | `bool`   | `false` | If `true`, it will include ERC721, like `tokenId`, `attributes`, `contractAddress`, etc.                                                                                         |
| `include.from`                             | `object` |         | If the `from` object is empty, only the `from`'s address will be included.                                                                                                       |
| `include.from.profile`                     | `bool`   | `false` | If `true`, the profile information will be included, if available.                                                                                                               |
| `include.from.reverseProfile`              | `bool`   | `false` | If `true`, the reverse resolution of the ENS ([ENS  docs](https://docs.ens.domains/contract-api-reference/reverseregistrar)) profile information will be included, if available. |
| `include.from.tokens`                      | `object` |         | If the `tokens` object is empty, it will include the tokens that the address holds with the default values for the parameters inside the `tokens` object.                        |
| `include.from.tokens.limit`                | `number` | 10      | Maximum number of tokens to return.                                                                                                                                              |
| `include.from.tokens.filterSuspectedScams` | `bool`   | `false` | *Experimental* - If `true`, it will remove the results that are suspected to be scams.                                                                                           |
| `include.to`                               | `object` |         | If the `to` object is empty, only the `to`'s address will be included.                                                                                                           |
| `include.to.profile`                       | `bool`   | `false` | If `true`, the profile information will be included, if available.                                                                                                               |
| `include.to.reverseProfile`                | `bool`   | `false` | If `true`, the reverse resolution of the ENS ([ENS  docs](https://docs.ens.domains/contract-api-reference/reverseregistrar)) profile information will be included, if available. |
| `include.to.tokens`                        | `object` |         | If the `tokens` object is empty, it will include the tokens that the address holds with the default values for the parameters inside the `tokens` object.                        |
| `include.to.tokens.limit`                  | `number` | 10      | Maximum number of tokens to return.                                                                                                                                              |
| `include.to.tokens.filterSuspectedScams`   | `bool`   | `false` | *Experimental* - If `true`, it will remove the results that are suspected to be scams.                                                                                           |

