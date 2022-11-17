import { server } from "../mocks/handlers";
import { BasementSDK } from "../src";

describe("Basement SDK", () => {
  const TOKEN_CONTRACT_ADDRESS = "0xa97d3eb991303cf3b9b759bd026bacb55256e9db";
  const TOKEN_ID = "5";
  const sdk = new BasementSDK();

  test("token query", async () => {
    const token = await sdk.token({
      contract: TOKEN_CONTRACT_ADDRESS,
      tokenId: TOKEN_ID,
      include: {
        media: true,
        mintTransaction: { logs: true, sender: true, recipient: true },
        sales: {
          maker: true,
          taker: true,
        },
        tokenUri: true,
        owner: {
          profile: true,
          reverseProfile: true,
        },
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
  });

  test("address query", async () => {
    const tokensLimit = 15;
    const data = await sdk.address({
      address: "test.eth",
      include: {
        profile: true,
        reverseProfile: true,
        tokens: {
          limit: 10,
        },
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
});
