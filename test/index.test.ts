import { SDK } from "../src";

test("test", async () => {
  const sdk = new SDK();
  const { token } = await sdk.token({
    includeOwnerInfo: true,
    contract: "0xa97d3eb991303cf3b9b759bd026bacb55256e9db",
    tokenId: "216",
  });
  console.log(token.imageUrl);
});
