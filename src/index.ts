import { GraphQLClient } from "graphql-request";
import { getSdk } from "./sdk";

async function main() {
  const client = new GraphQLClient("https://api.basement.dev/graphiql");
  const sdk = getSdk(client);
  const { address } = await sdk.address({
    name: "vitalik.eth",
    includeReverseProfile: true,
    includeTokens: true,
    filterSuspectedScams: true,
    includeProfile: true,
    tokensLimit: 10,
  });
  console.log(address);
}

main().then();
