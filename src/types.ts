export type TokenFilterOptions = {
  /** Maximum number of tokens to return  - defaults to `10`  */
  limit?: number;
  /** *Experimental* - Whether to remove the results that are suspected to be scams - defaults to `false` */
  filterSuspectedScams?: boolean;
};

export type TokensIncludeOption = {
  /** Whether to include the tokens that the address holds - defaults to `false` */
  tokens?: TokenFilterOptions;
};

export type AddressQueryIncludeOptions = TokensIncludeOption & OwnerOptions;

export type AddressQueryOptions = {
  /** hex-address or ENS address */
  name: string;
  /** Includes more data in the response */
  include?: AddressQueryIncludeOptions;
};

export type OwnerOptions = {
  /** Whether to include the ENS profile information in the response - defaults to `false` */
  profile?: boolean;
  /** Whether to include the reverse resolution of the ENS profile information in the response (ENS docs: https://docs.ens.domains/contract-api-reference/reverseregistrar) - defaults to `false`  */
  reverseProfile?: boolean;
};

export type TokenQueryIncludeOptions = {
  /** Whether to include owner's information in the response. Having an empty `owner` object will only return the `owner`'s address */
  owner?: OwnerOptions;
};

export type TokenVariables = {
  /** contract hex-address */
  contract: string;
  /** token ID */
  tokenId?: string;
  /** internal ID */
  id?: number;
};

export type TokenQueryBaseOptions = {
  /** Includes more data in the response */
  include?: TokenQueryIncludeOptions;
};

export type TokenQueryOptions = TokenQueryBaseOptions & TokenVariables;

export type TokensQueryFilterOptions = {
  /** Filter tokens that satisfy the given contract address */
  contractAddress: string;
};

export type TokensQueryOptions = TokenQueryBaseOptions & {
  /** Filter option(s) */
  filter: TokensQueryFilterOptions;
  /** Cursor used for pagination. To go the next page, provide the given cursor from the response */
  cursor?: string;
  /** Maximum number of tokens to return - defaults to `10` */
  limit?: number;
};

export type TokenTransfersQueryFilterOptions = TokensQueryFilterOptions;

export type TokenTransfersQueryIncludeOptions = {
  /** Whether to include ERC721 metadata, like `tokenId`, `attributes`, `contractAddress`, etc - defaults to `false` */
  erc721Metadata?: boolean;
  /** Whether to include from's information in the response. Having an empty `from` object will only return the `from`'s address */
  from?: OwnerOptions & TokensIncludeOption;
  /** Whether to include to's information in the response. Having an empty `to` object will only return the `to`'s address */
  to?: OwnerOptions & TokensIncludeOption;
};

export type TokenTransfersQueryOptions = {
  /** Filter option(s) */
  filter: TokenTransfersQueryFilterOptions;
  /** Cursor used for pagination. To go the next page, provide the given cursor from the response */
  cursor?: string;
  /** Maximum number of token transfers to return - defaults to `10` */
  limit?: number;
  /** Includes more data in the response */
  include?: TokenTransfersQueryIncludeOptions;
};
