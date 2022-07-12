import { getSdk } from "./sdk";

async function main() {
  const result = await getSdk(null as any).address({
    name: "vitalik.eth",
    includeGlobalKeys: false,
  });
  result.address.profile;
}
