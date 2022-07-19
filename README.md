# Basement SDK

The Basement SDK has sensible defaults and flexibility to allow you to get the data you want efficiently and effortlessly.

## Installation

Basement SDK is available as an npm package

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

## API

### TODO

## `tokens`

## `address`

## `tokenMetadataRefresh`

## `tokenTransfers`
