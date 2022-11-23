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

## Getting Started with the Basement SDK

Here's an example of a basic query using the SDK:

```typescript
import { BasementSDK } from "@basementdev/sdk";

const sdk = new BasementSDK();

const data = await sdk.address({
  address: "vitalik.eth",
  include: { profile: true, tokens: true },
});
```


## Visit [docs.basement.dev/sdk](https://docs.basement.dev/sdk) for docs, examples and more!