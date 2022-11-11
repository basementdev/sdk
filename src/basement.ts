import { GraphQLClient } from "graphql-request";
import { AddressQuery, getSdk, TokenQuery, TokensQuery } from "./sdk";
import {
  AddressQueryOptions,
  TokenQueryOptions,
  TokensQueryOptions,
} from "./types";

export const DEFAULT_ENDPOINT = "https://beta.basement.dev/v2/graphiql";

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
    const includeOwnerInfo = !!include?.owner;
    const includeOwnerProfile = include?.owner?.profile;
    const includeOwnerReverseProfile = include?.owner?.reverseProfile;
    const includeSales = !!include?.sales;
    const includeMakerReverseProfile = include?.sales?.maker?.reverseProfile;
    const includeTakerReverseProfile = include?.sales?.taker?.reverseProfile;
    const includeMediaInfo = include?.media;
    const includeMintInfo = !!include?.mint;
    const includeMintTransactionLogs = include?.mint?.transactionLogs;
    const includeTokenUri = include?.tokenUri;

    const data = await this.sdk.token({
      contract,
      tokenId,
      includeOwnerInfo,
      includeOwnerProfile,
      includeOwnerReverseProfile,
      includeSales,
      includeTakerReverseProfile,
      includeMakerReverseProfile,
      includeMediaInfo,
      includeMintInfo,
      includeMintTransactionLogs,
      includeTokenUri,
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
    const includeOwnerInfo = !!include?.owner;
    const includeOwnerProfile = include?.owner?.profile;
    const includeOwnerReverseProfile = include?.owner?.reverseProfile;
    const includeSales = !!include?.sales;
    const includeMakerReverseProfile = include?.sales?.maker?.reverseProfile;
    const includeTakerReverseProfile = include?.sales?.taker?.reverseProfile;
    const includeMediaInfo = include?.media;
    const includeMintInfo = !!include?.mint;
    const includeMintTransactionLogs = include?.mint?.transactionLogs;
    const includeTokenUri = include?.tokenUri;
    const includeTotalCount = include?.totalCount;
    const data = await this.sdk.tokens({
      filter,
      before,
      after,
      includeOwnerInfo,
      includeOwnerProfile,
      includeOwnerReverseProfile,
      includeMakerReverseProfile,
      includeMediaInfo,
      includeMintInfo,
      includeMintTransactionLogs,
      includeSales,
      includeTakerReverseProfile,
      includeTokenUri,
      includeTotalCount,
      limit,
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
    const includeSales = !!include?.tokens?.sales;
    const includeMediaInfo = include?.tokens?.media;
    const includeMakerReverseProfile =
      include?.tokens?.sales?.maker?.reverseProfile;
    const includeTakerReverseProfile =
      include?.tokens?.sales?.taker?.reverseProfile;
    const includeMintInfo = !!include?.tokens?.mint;
    const includeMintTransactionLogs = include?.tokens?.mint?.transactionLogs;
    const includeTokenUri = include?.tokens?.tokenUri;
    const data = await this.sdk.address({
      address,
      includeProfile,
      includeReverseProfile,
      includeTokens,
      tokensLimit,
      includeSales,
      includeMediaInfo,
      includeMintInfo,
      includeMintTransactionLogs,
      includeTokenUri,
      includeMakerReverseProfile,
      includeTakerReverseProfile,
    });

    return data.address;
  }
}
