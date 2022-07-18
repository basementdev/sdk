import { SDK } from "../src";

describe("Basement SDK", () => {
  const TOKEN_CONTRACT_ADDRESS = "0xa97d3eb991303cf3b9b759bd026bacb55256e9db";
  const TOKEN_ID = "216";
  const sdk = new SDK();

  test("token query", async () => {
    const { token } = await sdk.token({
      includeOwnerProfile: true,
      includeOwnerReverseProfile: true,
      contract: TOKEN_CONTRACT_ADDRESS,
      tokenId: TOKEN_ID,
    });

    const keys = Object.keys(token.ownerAddress);

    expect(keys).toEqual(
      expect.arrayContaining(["address", "profile", "reverseProfile"])
    );
  });

  test("address query", async () => {
    const tokensLimit = 15;
    const { address } = await sdk.address({
      name: "test.eth",
      includeProfile: true,
      includeReverseProfile: true,
      includeTokens: true,
      tokensLimit,
    });

    const keys = Object.keys(address);

    expect(keys).toEqual(
      expect.arrayContaining(["address", "profile", "reverseProfile"])
    );

    expect(address.tokens?.length).toBeLessThanOrEqual(tokensLimit);
  });

  test("tokenMetadataRefresh mutation", async () => {
    const { tokenMetadataRefresh } = await sdk.tokenMetadataRefresh({
      contract: TOKEN_CONTRACT_ADDRESS,
      tokenId: TOKEN_ID,
    });
    expect(tokenMetadataRefresh).toBeDefined;
  });

  test("tokens query", async () => {
    const tokensLimit = 5;
    const { tokens } = await sdk.tokens({
      filter: { contractAddress: TOKEN_CONTRACT_ADDRESS },
      includeOwnerProfile: true,
      includeOwnerReverseProfile: true,
      limit: tokensLimit,
    });

    expect(tokens?.tokens?.length).toBeLessThanOrEqual(tokensLimit);
    const token = tokens?.tokens[0];
    const keys = Object.keys(token?.ownerAddress);
    expect(keys).toEqual(
      expect.arrayContaining(["address", "profile", "reverseProfile"])
    );
  });

  test("tokenTransfers query", async () => {
    const tokenTransfersLimit = 5;
    const { tokenTransfers } = await sdk.tokenTransfers({
      filter: { contractAddress: TOKEN_CONTRACT_ADDRESS },
      limit: tokenTransfersLimit,
      includeERC721Metadata: true,
      includeFromProfile: true,
      includeFromReverseProfile: true,
      includeFromTokensInfo: true,
      includeToProfile: true,
      includeToReverseProfile: true,
      includeToTokensInfo: true,
    });

    const tokenTransfer = tokenTransfers?.tokenTransfers[0];
    const tokenTransferKeys = Object.keys(tokenTransfer);
    const tokenTransferFromKeys = Object.keys(tokenTransfer?.from);
    const tokenTransferToKeys = Object.keys(tokenTransfer?.to);
    expect(tokenTransfers?.tokenTransfers?.length).toBeLessThanOrEqual(
      tokenTransfersLimit
    );

    expect(tokenTransferKeys).toEqual(
      expect.arrayContaining(["from", "to", "erc721Metadata"])
    );

    expect(tokenTransferFromKeys).toEqual(
      expect.arrayContaining(["address", "profile", "reverseProfile", "tokens"])
    );
    expect(tokenTransferToKeys).toEqual(
      expect.arrayContaining(["address", "profile", "reverseProfile", "tokens"])
    );
  });
});
