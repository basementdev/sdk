import { GraphQLClient } from "graphql-request";
import {
  AddressQuery,
  getSdk,
  TokenQuery,
  TokensQuery,
  TransactionQuery,
} from "./sdk";
import {
  AddressQueryOptions,
  TokenQueryIncludeOptions,
  TokenQueryOptions,
  TokensQueryOptions,
  TransactionQueryOptions,
} from "./types";

export const DEFAULT_ENDPOINT = "https://beta.basement.dev/v2/graphiql";

function parseTokenIncludeOptions(opts?: TokenQueryIncludeOptions) {
  const includeOwnerInfo = !!opts.owner;
  const includeMintInfo = !!opts.mint;
  const includeSales = !!opts.sales;
  const includeTokenUri = opts.tokenUri;
  const includeMediaInfo = opts.media;
  let includeMakerReverseProfile = false;
  let includeTakerReverseProfile = false;
  if (typeof opts.sales !== "boolean" && typeof opts.sales !== "undefined") {
    includeMakerReverseProfile = !!opts.sales.maker;
    includeTakerReverseProfile = !!opts.sales.taker;
  }
  let includeTransactionLogs = false;
  if (typeof opts.mint !== "boolean" && typeof opts.mint !== "undefined") {
    includeTransactionLogs = opts.mint.transactionLogs;
  }
  let includeOwnerProfile = false;
  let includeOwnerReverseProfile = false;
  if (typeof opts.owner !== "boolean" && typeof opts.owner !== "undefined") {
    includeOwnerProfile = opts.owner.profile;
    includeOwnerReverseProfile = opts.owner.reverseProfile;
  }

  return {
    includeOwnerInfo,
    includeMintInfo,
    includeTokenUri,
    includeSales,
    includeMediaInfo,
    includeMakerReverseProfile,
    includeTakerReverseProfile,
    includeTransactionLogs,
    includeOwnerProfile,
    includeOwnerReverseProfile,
  };
}

export class BasementSDK {
  private sdk: ReturnType<typeof getSdk>;

  constructor(endpoint: string = DEFAULT_ENDPOINT) {
    const client = new GraphQLClient(endpoint);
    this.sdk = getSdk(client);
  }

  /**
   * Queries information about a specific token
   */
  public async token({
    contract,
    tokenId,
    include,
  }: TokenQueryOptions): Promise<TokenQuery["token"]> {
    const data = await this.sdk.token({
      contract,
      tokenId,
      ...parseTokenIncludeOptions(include),
    });
    return data.token;
  }

  /**
   * Query tokens that satisfy the given filter(s)
   */
  public async tokens({
    filter,
    before,
    after,
    include,
    limit,
  }: TokensQueryOptions): Promise<TokensQuery["tokens"]> {
    const includeTotalCount = include?.totalCount;
    const data = await this.sdk.tokens({
      filter,
      before,
      after,
      includeTotalCount,
      limit,
      ...parseTokenIncludeOptions(include),
    });
    return data.tokens;
  }

  /**
   * Queries information about an address
   */
  public async address({
    address,
    include,
  }: AddressQueryOptions): Promise<AddressQuery["address"]> {
    const includeTokens = !!include?.tokens;
    const tokensLimit = include?.tokens?.limit;
    const includeProfile = include?.profile;
    const includeReverseProfile = include?.reverseProfile;
    const data = await this.sdk.address({
      address,
      includeProfile,
      includeReverseProfile,
      includeTokens,
      tokensLimit,
      ...parseTokenIncludeOptions(include.tokens),
    });

    return data.address;
  }

  public async transaction({
    hash,
    include,
  }: TransactionQueryOptions): Promise<TransactionQuery["transaction"]> {
    const includeTransactionLogs = include?.logs;
    const includeTransactionRecipientInfo = !!include?.recipient;
    const includeTransactionSenderInfo = !!include?.sender;
    const data = await this.sdk.transaction({
      hash,
      includeTransactionLogs,
      includeTransactionRecipientInfo,
      includeTransactionSenderInfo,
    });
    return data.transaction;
  }
}
