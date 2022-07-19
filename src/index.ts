import { GraphQLClient } from "graphql-request";
import {
  AddressQuery,
  AddressQueryVariables,
  getSdk,
  TokenMetadataRefreshMutation,
  TokenMetadataRefreshMutationVariables,
  TokenQuery,
  TokenQueryVariables,
  TokensQuery,
  TokensQueryVariables,
  TokenTransfersQuery,
  TokenTransfersQueryVariables,
} from "./sdk";

export const DEFAULT_ENDPOINT = "https://api.basement.dev/graphiql";

export class BasementSDK {
  private sdk: ReturnType<typeof getSdk>;
  constructor(endpoint: string = DEFAULT_ENDPOINT) {
    const client = new GraphQLClient(endpoint);
    this.sdk = getSdk(client);
  }

  /**
   * Queries information about an address
   * @param {AddressQueryVariables} queryObj query variables object
   * @param queryObj.name hex-address or ENS address
   * @param queryObj.filterSuspectedScams *Experimental* - Whether to remove the results that are suspected to be scams - defaults to `false`
   * @param queryObj.includeProfile Whether to include the ENS profile information in the response - defaults to `false`
   * @param queryObj.includeReverseProfile Whether to include the reverse resolution of the ENS profile information in the response (ENS docs: https://docs.ens.domains/contract-api-reference/reverseregistrar) - defaults to `false`
   * @param queryObj.includeTokens Whether to include the tokens that the address holds - defaults to `false`
   * @param queryObj.tokensLimit Maximum number of tokens to return. `queryObj.includeTokens` must be set to `true` for this option to take effect - defaults to `10`
   */
  public async address({
    name,
    filterSuspectedScams,
    includeProfile,
    includeReverseProfile,
    includeTokens,
    tokensLimit = 10,
  }: AddressQueryVariables): Promise<AddressQuery> {
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
   * @param {TokenQueryVariables} queryObj query variables object
   * @param queryObj.contract contract hex-address
   * @param queryObj.id internal ID
   * @param queryObj.tokenId token ID
   * @param queryObj.includeOwnerProfile Whether to include the owner's profile in the response -  defaults to `false`
   * @param queryObj.includeOwnerReverseProfile Whether to include the owner's ENS reverse resolution profile in the response - defaults to `false`
   */
  public async token({
    contract,
    id,
    includeOwnerProfile,
    includeOwnerReverseProfile,
    tokenId,
  }: Omit<TokenQueryVariables, "includeOwnerInfo">): Promise<TokenQuery> {
    return this.sdk.token({
      contract,
      id,
      includeOwnerInfo: includeOwnerProfile || includeOwnerReverseProfile,
      includeOwnerProfile,
      includeOwnerReverseProfile,
      tokenId,
    });
  }

  /**
   * Refreshes metadata of a specific token
   * @param {TokenMetadataRefreshMutationVariables} mutationObj mutation variables object
   * @param mutationObj.contract contract hex-address
   * @param mutationObj.id internal ID
   * @param mutationObj.tokenId token ID
   */
  public async tokenMetadataRefresh({
    contract,
    id,
    tokenId,
  }: TokenMetadataRefreshMutationVariables): Promise<TokenMetadataRefreshMutation> {
    return this.sdk.tokenMetadataRefresh({
      contract,
      id,
      tokenId,
    });
  }

  /**
   * Query tokens that satisfy the given filter(s)
   * @param {TokensQueryVariables} queryObj query variables object
   * @param queryObj.filter.contractAddress Filter tokens that satisfy the given contract address
   * @param queryObj.includeOwnerProfile Whether to include the owner's profile in the response -  defaults to `false`
   * @param queryObj.includeOwnerReverseProfile Whether to include the owner's ENS reverse resolution profile in the response - defaults to `false`
   * @param queryObj.limit Maximum number of tokens to return - defaults to `10`
   * @param queryObj.cursor Cursor used for pagination. To go the next page, provide the given cursor from the response
   */
  public async tokens({
    filter,
    cursor,
    includeOwnerProfile,
    includeOwnerReverseProfile,
    limit = 10,
  }: Omit<TokensQueryVariables, "includeOwnerInfo">): Promise<TokensQuery> {
    return this.sdk.tokens({
      filter,
      cursor,
      includeOwnerInfo: includeOwnerProfile || includeOwnerReverseProfile,
      includeOwnerProfile,
      includeOwnerReverseProfile,
      limit,
    });
  }

  /**
   * Query token transfers that satisfy the given filter(s)
   * @param {TokenTransfersQueryVariables} queryObj query variables object
   * @param queryObj.filter.contractAddress Filter tokens that satisfy the given contract address
   * @param queryObj.limit Maximum number of token transfers to return - defaults to `10`
   * @param queryObj.cursor Cursor used for pagination. To go the next page, provide the given cursor from the response
   * @param queryObj.includeERC721Metadata Whether to include ERC721 metadata, like `tokenId`, `attributes`, `contractAddress`, etc - defaults to `false`
   * @param queryObj.includeFromProfile Whether to include the `from` profile in the response. This option is not needed if you need to only retrieve the `from` address -  defaults to `false`
   * @param queryObj.includeFromReverseProfile Whether to include the `from` ENS reverse resolution profile in the response - defaults to `false`
   * @param queryObj.includeFromTokensInfo Whether to include `from` tokens information (This function returns a maximum of 10 tokens, if you need to get a more comprehensive response, use the `tokens` function) - defaults to `false`
   * @param queryObj.includeToProfile Whether to include the `to` profile in the response. This option is not needed if you need to only retrieve the `to` address -  defaults to `false`
   * @param queryObj.includeToReverseProfile Whether to include the `to` ENS reverse resolution profile in the response - defaults to `false`
   * @param queryObj.includeToTokensInfo Whether to include `to` token information (This function returns a maximum of 10 tokens, if you need to get a more comprehensive response, use the `tokens` function) - defaults to `false`
   */
  public async tokenTransfers({
    filter,
    cursor,
    includeERC721Metadata,
    includeFromProfile,
    includeFromReverseProfile,
    includeFromTokensInfo,
    includeToProfile,
    includeToReverseProfile,
    includeToTokensInfo,
    limit,
  }: TokenTransfersQueryVariables): Promise<TokenTransfersQuery> {
    return this.sdk.tokenTransfers({
      filter,
      cursor,
      includeERC721Metadata,
      includeFromProfile,
      includeFromReverseProfile,
      includeFromTokensInfo,
      includeToProfile,
      includeToReverseProfile,
      includeToTokensInfo,
      limit,
    });
  }
}
