import { GraphQLClient } from "graphql-request";
import {
  AddressQuery,
  AddressQueryVariables,
  getSdk,
  TokenMetadataRefreshMutation,
  TokenMetadataRefreshMutationVariables,
  TokenQuery,
  TokenQueryVariables,
} from "./sdk";

const DEFAULT_ENDPOINT = "https://api.basement.dev/graphiql";

export class SDK {
  private sdk: ReturnType<typeof getSdk>;
  constructor() {
    const client = new GraphQLClient(DEFAULT_ENDPOINT);
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
    tokensLimit,
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
   * @param queryObj.includeOwnerInfo Whether to include the token owner's information in the response - defaults to `false`
   * @param queryObj.includeOwnerProfile Whether to include the owner's profile in the response. `queryObj.includeOwnerInfo` must be set to `true` for this option to take effect -  defaults to `false`
   */
  public async token({
    contract,
    id,
    includeOwnerInfo,
    includeOwnerProfile,
    includeOwnerReverseProfile,
    tokenId,
  }: TokenQueryVariables): Promise<TokenQuery> {
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
}
