import { GraphQLClient } from "graphql-request";
import {
  AddressQuery,
  getSdk,
  TokenMetadataRefreshMutation,
  TokenQuery,
  TokensQuery,
  TokenTransfersQuery,
} from "./sdk";
import {
  AddressQueryOptions,
  TokenQueryOptions,
  TokensQueryOptions,
  TokenTransfersQueryOptions,
  TokenVariables,
} from "./types";

export const DEFAULT_ENDPOINT = "https://api.basement.dev/graphiql";

export class BasementSDK {
  private sdk: ReturnType<typeof getSdk>;

  constructor(endpoint: string = DEFAULT_ENDPOINT) {
    const client = new GraphQLClient(endpoint);
    this.sdk = getSdk(client);
  }

  /**
   * Queries information about an address
   */
  public async address({
    name,
    include,
  }: AddressQueryOptions): Promise<AddressQuery> {
    const includeTokens = !!include?.tokens;
    const tokensLimit = include?.tokens?.limit;
    const filterSuspectedScams = include?.tokens?.filterSuspectedScams;
    const includeProfile = include?.profile;
    const includeReverseProfile = include?.reverseProfile;
    return this.sdk.address({
      name,
      filterSuspectedScams,
      includeProfile,
      includeReverseProfile,
      includeTokens,
      tokensLimit,
    });
  }

  /**
   * Queries information about a specific token
   */
  public async token({
    contract,
    id,
    tokenId,
    include,
  }: TokenQueryOptions): Promise<TokenQuery> {
    const includeOwnerInfo = !!include?.owner;
    const includeOwnerProfile = include?.owner?.profile;
    const includeOwnerReverseProfile = include?.owner?.reverseProfile;
    return this.sdk.token({
      contract,
      id,
      includeOwnerInfo,
      includeOwnerProfile,
      includeOwnerReverseProfile,
      tokenId,
    });
  }

  /**
   * Refreshes metadata of a specific token
   */
  public async tokenMetadataRefresh({
    contract,
    id,
    tokenId,
  }: TokenVariables): Promise<TokenMetadataRefreshMutation> {
    return this.sdk.tokenMetadataRefresh({
      contract,
      id,
      tokenId,
    });
  }

  /**
   * Query tokens that satisfy the given filter(s)
   */
  public async tokens({
    filter,
    cursor,
    include,
    limit = 10,
  }: TokensQueryOptions): Promise<TokensQuery> {
    const includeOwnerInfo = !!include?.owner;
    const includeOwnerProfile = include?.owner?.profile;
    const includeOwnerReverseProfile = include?.owner?.reverseProfile;
    return this.sdk.tokens({
      filter,
      cursor,
      includeOwnerInfo,
      includeOwnerProfile,
      includeOwnerReverseProfile,
      limit,
    });
  }

  /**
   * Query token transfers that satisfy the given filter(s)
   */
  public async tokenTransfers({
    filter,
    cursor,
    include,
    limit = 10,
  }: TokenTransfersQueryOptions): Promise<TokenTransfersQuery> {
    const includeERC721Metadata = include?.erc721Metadata;
    const includeFromProfile = include?.from?.profile;
    const includeFromReverseProfile = include?.from?.reverseProfile;
    const includeFromTokensInfo = !!include?.from?.tokens;
    const fromTokensFilterSuspectedScam =
      include?.from?.tokens?.filterSuspectedScams;
    const fromTokensLimit = include?.from?.tokens?.limit;
    const includeToProfile = include?.to?.profile;
    const includeToReverseProfile = include?.to?.reverseProfile;
    const includeToTokensInfo = !!include?.to?.tokens;
    const toTokensFilterSuspectedScam =
      include?.to?.tokens?.filterSuspectedScams;
    const toTokensLimit = include?.to?.tokens?.limit;
    return this.sdk.tokenTransfers({
      filter,
      cursor,
      includeERC721Metadata,
      includeFromProfile,
      includeFromReverseProfile,
      includeFromTokensInfo,
      fromTokensFilterSuspectedScam,
      fromTokensLimit,
      includeToProfile,
      includeToReverseProfile,
      includeToTokensInfo,
      toTokensLimit,
      toTokensFilterSuspectedScam,
      limit,
    });
  }
}
