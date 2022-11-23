import { makeExecutableSchema } from "@graphql-tools/schema";
import { mockServer } from "@graphql-tools/mock";
import { loadSchemaSync } from "@graphql-tools/load";
import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";

const schema = loadSchemaSync("schema.graphql", {
  loaders: [new GraphQLFileLoader()],
});

const mocks = {
  HexAddress: () => "0xd8da6bf26964af9d7eed9e03e53415d37aa96045",
  Profile: () => ({
    name: "vitalik.eth",
    avatar: "https://metadata.ens.domains/mainnet/avatar/vitalik.eth",
  }),
  Wei: () => "100000000000000000",
  DateTime: () => "2022-09-05T17:46:19Z",
  Json: () => ({
    animation_url:
      "ipfs://QmWF3DNDFNHQNjBpEdrjPHDULXhdvPWEN8MDCoGbNKcktT/UAENFT-video.mp4",
    description: "test",
    external_url: "https://www.uaenft.fun",
    image:
      "ipfs://QmePS5UNVJLKcuiEudeenW8rL5vtcDhRteBJyMpVCoczuJ/UAENFT-icon.jpg",
    name: "test",
  }),
};

const schemaExec = makeExecutableSchema({ typeDefs: schema });
export const mockResponseServer = mockServer(schemaExec, mocks, true);
