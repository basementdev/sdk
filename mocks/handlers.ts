import { graphql, ResponseResolver } from "msw";
import { getSdk } from "../src/sdk";
import { mockResponseServer } from "./response";

type Operation = {
  type: Exclude<keyof typeof graphql, "link" | "operation">;
  name: keyof ReturnType<typeof getSdk>;
};

const handleQuery = (async (req, res, ctx) => {
  const serverRes = await mockResponseServer.query(
    req.body?.query,
    req.body?.variables
  );
  return res((ctx as any).data(serverRes.data));
}) as ResponseResolver<any>;

const queries: Operation[] = [
  { type: "query", name: "address" },
  { type: "query", name: "token" },
  { type: "query", name: "tokens" },
  { type: "query", name: "transaction" },
  { type: "query", name: "transactions" },
  { type: "query", name: "transactionLogs" },
  { type: "query", name: "transfers" },
  { type: "mutation", name: "nonFungibleTokenRefresh" },
];

export const handlers = queries.map(({ name, type }) =>
  graphql[type](name, handleQuery)
);
