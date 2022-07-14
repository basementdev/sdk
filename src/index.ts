import { GraphQLClient } from "graphql-request";
import { AddressQuery, AddressQueryVariables, getSdk } from "./sdk";

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
}
