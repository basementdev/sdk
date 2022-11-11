import { graphql, GraphQLRequest } from "msw";
import {
  AddressQueryVariables,
  TokenQueryVariables,
  TokensQueryVariables,
  // TokenTransfersQueryVariables,
} from "../src/sdk";

type OwnerInfoOptions = {
  includeOwnerInfo: boolean;
  includeOwnerProfile: boolean;
  includeOwnerReverseProfile: boolean;
};

function populateOwnerInfo({
  includeOwnerInfo,
  includeOwnerProfile,
  includeOwnerReverseProfile,
}: OwnerInfoOptions) {
  const res: any = {};

  if (includeOwnerInfo) {
    res.ownerAddress = { address: "" };
    if (includeOwnerProfile) {
      res.ownerAddress.profile = {};
    }
    if (includeOwnerReverseProfile) {
      res.ownerAddress.reverseProfile = {};
    }
  }

  return res;
}

export const handlers = [
  graphql.query(
    "token",
    (req: GraphQLRequest<TokenQueryVariables>, res, ctx) => {
      const {
        includeOwnerInfo,
        includeOwnerProfile,
        includeOwnerReverseProfile,
      } = req.variables;

      const populatedOwnerInfo = populateOwnerInfo({
        includeOwnerInfo,
        includeOwnerProfile,
        includeOwnerReverseProfile,
      });
      return res(
        ctx.data({
          token: {
            ...populatedOwnerInfo,
          },
        })
      );
    }
  ),

  graphql.query(
    "address",
    (req: GraphQLRequest<AddressQueryVariables>, res, ctx) => {
      const dynamicRes: any = {};
      const {
        includeProfile,
        includeReverseProfile,
        includeTokens,
        tokensLimit,
      } = req.variables;
      if (includeProfile) {
        dynamicRes.profile = {};
      }
      if (includeReverseProfile) {
        dynamicRes.reverseProfile = {};
      }

      if (includeTokens) {
        dynamicRes.tokens = new Array(tokensLimit).fill({});
      }

      return res(
        ctx.data({
          address: {
            address: "",
            ...dynamicRes,
          },
        })
      );
    }
  ),

  graphql.mutation("tokenMetadataRefresh", (_, res, ctx) => {
    return res(ctx.data({ tokenMetadataRefresh: {} }));
  }),

  graphql.query(
    "tokens",
    (req: GraphQLRequest<TokensQueryVariables>, res, ctx) => {
      const {
        includeOwnerInfo,
        includeOwnerProfile,
        includeOwnerReverseProfile,
        limit,
      } = req.variables;

      const populatedOwnerInfo = populateOwnerInfo({
        includeOwnerInfo,
        includeOwnerProfile,
        includeOwnerReverseProfile,
      });

      const tokensRes = new Array(limit).fill({ ...populatedOwnerInfo });

      return res(
        ctx.data({
          tokens: {
            tokens: tokensRes,
          },
        })
      );
    }
  ),

  // graphql.query(
  //   "tokenTransfers",
  //   (req: GraphQLRequest<TokenTransfersQueryVariables>, res, ctx) => {
  //     const dynamicRes: any = { from: { address: "" }, to: { address: "" } };
  //     const {
  //       includeERC721Metadata,
  //       includeFromProfile,
  //       includeFromReverseProfile,
  //       includeFromTokensInfo,
  //       includeToProfile,
  //       includeToReverseProfile,
  //       includeToTokensInfo,
  //       limit,
  //     } = req.variables;

  //     if (includeERC721Metadata) {
  //       dynamicRes.erc721Metadata = {};
  //     }
  //     if (includeFromProfile) {
  //       dynamicRes.from = { ...dynamicRes.from, profile: {} };
  //     }

  //     if (includeFromReverseProfile) {
  //       dynamicRes.from = { ...dynamicRes.from, reverseProfile: {} };
  //     }

  //     if (includeFromTokensInfo) {
  //       dynamicRes.from = { ...dynamicRes.from, tokens: {} };
  //     }

  //     if (includeToProfile) {
  //       dynamicRes.to = { ...dynamicRes.to, profile: {} };
  //     }

  //     if (includeToReverseProfile) {
  //       dynamicRes.to = { ...dynamicRes.to, reverseProfile: {} };
  //     }

  //     if (includeToTokensInfo) {
  //       dynamicRes.to = { ...dynamicRes.to, tokens: {} };
  //     }

  //     const tokenTransfersRes = new Array(limit).fill(dynamicRes);
  //     return res(
  //       ctx.data({
  //         tokenTransfers: {
  //           tokenTransfers: tokenTransfersRes,
  //         },
  //       })
  //     );
  //   }
  // ),
];
