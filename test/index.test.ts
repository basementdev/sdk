import { SDK } from "../src";

test("should first", async () => {
  const sdk = new SDK();
  sdk.address({ name: "gotu.eth" })
  const { address } = await sdk.address({ includeTokens: false })
  expect(address);
});
