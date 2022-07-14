import { graphql } from "msw";

export const handlers = [
  graphql.query("address", (req, res, ctx) => {
    return res(
      ctx.data({
        user: {
          firstname: "John",
        },
      })
    );
  }),
];
