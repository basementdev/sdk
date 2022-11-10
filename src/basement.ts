import { GraphQLClient } from "graphql-request";
import { AddressQuery, getSdk } from "./sdk";
import { AddressQueryOptions } from "./types";

export const DEFAULT_ENDPOINT = "https://beta.basement.dev/v2/graphiql";

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
    });

    return data.address;
  }
}
