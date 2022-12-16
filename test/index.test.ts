import { BasementSDK } from "../src";
import { ExcludeTransferFilter } from "../src/sdk";

describe("Basement SDK", () => {
  const TOKEN_CONTRACT_ADDRESS = "0xa97d3eb991303cf3b9b759bd026bacb55256e9db";
  const TOKEN_ID = "5";
  const TXN_HASH =
    "0xcdcc49079b7622c9527e9bd50314dda94ac4e3da5e0378d1ed1c41b1a442f531";
  const sdk = new BasementSDK();

  test("token query", async () => {
    const token = await sdk.token({
      contract: TOKEN_CONTRACT_ADDRESS,
      tokenId: TOKEN_ID,
      include: {
        media: true,
        mintTransaction: { logs: true, from: true, to: true, events: true },
        sales: {
          maker: true,
          taker: true,
        },
        tokenUri: true,
        owner: {
          profile: true,
          reverseProfile: true,
        },
        attributes: true,
      },
    });

    const tokenKeys = Object.keys(token);
    const ownerKeys = Object.keys(token.owner);
    const mintTransactionKeys = Object.keys(token.mintTransaction);

    expect(ownerKeys).toEqual(
      expect.arrayContaining(["address", "profile", "reverseProfile"])
    );

    // Media keys
    expect(tokenKeys).toEqual(expect.arrayContaining(["animation", "image"]));

    expect(tokenKeys).toEqual(expect.arrayContaining(["tokenUri"]));

    expect(tokenKeys).toEqual(expect.arrayContaining(["sales"]));

    expect(tokenKeys).toEqual(
      expect.arrayContaining(["mintPrice", "mintTransaction"])
    );

    expect(mintTransactionKeys).toEqual(
      expect.arrayContaining(["from", "to", "logs"])
    );
    expect(token?.attributes).toBeDefined();
  });

  test("address query", async () => {
    const tokensLimit = 15;
    const data = await sdk.address({
      address: "test.eth",
      include: {
        profile: true,
        reverseProfile: true,
        tokens: true,
      },
    });

    const keys = Object.keys(data);
    expect(keys).toEqual(
      expect.arrayContaining(["address", "profile", "reverseProfile"])
    );

    expect(data.tokens?.length).toBeLessThanOrEqual(tokensLimit);
  });

  test("nonFungibleTokenRefresh mutation", async () => {
    const data = await sdk.nonFungibleTokenRefresh({
      contract: TOKEN_CONTRACT_ADDRESS,
      tokenId: TOKEN_ID,
    });
    expect(data).toBeTruthy();
  });

  test("tokens query", async () => {
    const tokensLimit = 5;
    const data = await sdk.tokens({
      filter: { ownerAddresses: ["vitalik.eth"] },
      limit: tokensLimit,
      include: {
        owner: {
          profile: true,
          reverseProfile: true,
        },
        totalCount: true,
        tokenUri: true,
        mintTransaction: true,
        media: true,
        sales: true,
      },
    });
    expect(data.tokens.length).toBeLessThanOrEqual(tokensLimit);
    const token = data.tokens[0];
    const keys = Object.keys(data);
    const tokenKeys = Object.keys(token);
    const ownerKeys = Object.keys(token.owner);
    expect(ownerKeys).toEqual(
      expect.arrayContaining(["address", "profile", "reverseProfile"])
    );
    expect(tokenKeys).toEqual(
      expect.arrayContaining([
        "mintTransaction",
        "sales",
        "tokenUri",
        "image",
        "animation",
        "tokenUri",
      ])
    );

    expect(keys).toEqual(expect.arrayContaining(["totalCount"]));
  });

  test("transaction query", async () => {
    let data = await sdk.transaction({
      hash: TXN_HASH,
    });
    let keys = Object.keys(data);
    const includeKeys = ["logs", "from", "to"];
    expect(keys).not.toEqual(expect.arrayContaining(includeKeys));
    data = await sdk.transaction({
      hash: TXN_HASH,
      include: { logs: true, from: true, to: true, events: false },
    });
    keys = Object.keys(data);
    expect(data?.events).toBeUndefined();
    expect(keys).toEqual(expect.arrayContaining(includeKeys));
  });

  test("transactions query", async () => {
    let data = await sdk.transactions({
      include: { totalCount: true, from: true, to: true },
    });
    expect(data?.totalCount).toBeDefined();
    data = await sdk.transactions({
      include: { logs: true, from: true, to: true },
    });
    expect(data?.totalCount).toBeUndefined();
    const tx = data?.transactions[0];
    const keys = Object.keys(tx);
    expect(keys).toEqual(expect.arrayContaining(["logs", "from", "to"]));
  });

  test("transasctionLogs query", async () => {
    const data = await sdk.transactionLogs({
      include: {
        address: true,
        totalCount: true,
        transaction: { from: true, to: true, events: false },
      },
    });
    expect(data?.totalCount).toBeDefined();
    const txLogs = data?.transactionLogs[0];
    expect(txLogs?.address).toBeDefined();
    expect(txLogs?.transaction).toBeDefined();
    const txLogsTransactionKeys = Object.keys(txLogs?.transaction);
    expect(txLogsTransactionKeys).toEqual(
      expect.arrayContaining(["from", "to"])
    );
  });

  test("transfers query", async () => {
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
        token: {
          media: true,
          mintTransaction: true,
          sales: true,
        },
        transaction: { logs: true, from: true, to: true, events: false },
      },
    });
    expect(data.totalCount).toBeDefined();
    const transfer = data.erc721Transfers[0];
    expect(transfer.contract?.address).toBeDefined();
    expect(transfer.from?.address).toBeDefined();
    expect(transfer.to?.address).toBeDefined();
    expect(transfer.sale?.maker?.reverseProfile).toBeDefined();
    expect(transfer.sale?.taker?.reverseProfile).toBeUndefined();
    expect(transfer.token?.sales).toBeDefined();
    expect(transfer.token?.sales[0]?.maker).toBeUndefined();
    expect(transfer.token?.sales[0]?.taker).toBeUndefined();
  });
});
