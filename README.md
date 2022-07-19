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

const { address } = await sdk.address({
  name: "vitalik.eth",
  include: { tokens: { limit: 5 }, profile: true },
});
```

## `token`

Queries information about a specific token

### Example usage:

```typescript
const { token } = await sdk.token({
  contract: "0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D",
  tokenId: "660",
  include: {
    owner: {
      profile: true,
      reverseProfile: true,
    },
  },
});
```

### API

| Name                           | Type     | Default | Description                                                                                                                                                                      |
| ------------------------------ | -------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `contract`                     | `string` |         | The contract hex-address.                                                                                                                                                        |
| `tokenId`                      | `string` |         | The token ID within the contract.                                                                                                                                                |
| `id`                           | `number` |         | Internal ID - can be used for caching purposes.                                                                                                                                  |
| `include`                      | `object` |         | Object used to choose what other data you want to include in the response.                                                                                                       |
| `include.owner`                | `object` |         | If the `owner` object is empty, only the `owner`'s address will be included.                                                                                                     |
| `include.owner.profile`        | `bool`   | `false` | If `true`, the profile information will be included, if available.                                                                                                               |
| `include.owner.reverseProfile` | `bool`   | `false` | If `true`, the reverse resolution of the ENS ([ENS  docs](https://docs.ens.domains/contract-api-reference/reverseregistrar)) profile information will be included, if available. |

## `tokens`

Query tokens that satisfy the given filter(s)

### Example usage:

```typescript
const { tokens } = await sdk.tokens({
  filter: { contractAddress: "0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D" },
  limit: 5,
  include: {
    owner: {
      profile: true,
      reverseProfile: true,
    },
  },
});
```

### API

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

## `address`

Queries information about an address

### Example usage:

```typescript
const { address } = await sdk.address({
  name: "vitalik.eth",
  include: { profile: true, tokens: { limit: 5 } },
});
```

### API

| Name                                  | Type     | Default | Description                                                                                                                                                                      |
| ------------------------------------- | -------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `name`                                | `string` |         | hex-address or ENS address                                                                                                                                                       |
| `include`                             | `object` |         | Object used to choose what other data you want to include in the response.                                                                                                       |
| `include.profile`                     | `bool`   | `false` | If `true`, the profile information will be included, if available.                                                                                                               |
| `include.reverseProfile`              | `bool`   | `false` | If `true`, the reverse resolution of the ENS ([ENS  docs](https://docs.ens.domains/contract-api-reference/reverseregistrar)) profile information will be included, if available. |
| `include.tokens`                      | `object` |         | If the `tokens` object is empty, it will include the tokens that the address holds with the default values for the parameters inside the `tokens` object.                        |
| `include.tokens.limit`                | `number` | 10      | Maximum number of tokens to return.                                                                                                                                              |
| `include.tokens.filterSuspectedScams` | `bool`   | `false` | *Experimental* - If `true`, it will remove the results that are suspected to be scams.                                                                                           |

## `tokenMetadataRefresh`

Refreshes metadata of a specific token

### Example usage:

```typescript
const { tokenMetadataRefresh } = await sdk.tokenMetadataRefresh({
  contract: "0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D",
  tokenId: "660",
});
```

### API

| Name       | Type     | Default | Description                                     |
| ---------- | -------- | ------- | ----------------------------------------------- |
| `contract` | `string` |         | The contract hex-address.                       |
| `tokenId`  | `string` |         | The token ID within the contract.               |
| `id`       | `number` |         | Internal ID - can be used for caching purposes. |

## `tokenTransfers`

Query token transfers that satisfy the given filter(s)

### Example usage:

```typescript
const { tokenTransfers } = await sdk.tokenTransfers({
  filter: { contractAddress: "0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D" },
  limit: 5,
  include: {
    erc721Metadata: true,
    from: {
      profile: true,
      reverseProfile: true,
      tokens: {},
    },
    to: {
      profile: true,
      reverseProfile: true,
      tokens: {},
    },
  },
});
```
### API

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

