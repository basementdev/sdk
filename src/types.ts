import { TokensFilter, TokensQueryVariables } from "./sdk";

export type OwnerOptions = {
  /** Whether to include the ENS profile information in the response - defaults to `false` */
  profile?: boolean;
  /** Whether to include the reverse resolution of the ENS profile information in the response (ENS docs: https://docs.ens.domains/contract-api-reference/reverseregistrar) - defaults to `false`  */
  reverseProfile?: boolean;
};

export type SalesFilterOptions = {
  maker?: Required<Pick<OwnerOptions, "reverseProfile">>;
  taker?: Required<Pick<OwnerOptions, "reverseProfile">>;
};

export type MintFilterOptions = {
  /** Whether to include the logs that happened within the transaction - defaults to `false` */
  transactionLogs?: boolean;
};

export type TokenQueryIncludeOptions = {
  /** Whether to include owner's information in the response. Having an empty `owner` object will only return the `owner`'s address */
  owner?: OwnerOptions;
  /** Whether to include the media attached to the token, like the image, animation, etc - defaults to `false`  */
  media?: boolean;
  /** Whether to include the tokenUri. This is directly called from the contract and given as is, in JSON format - defaults to `false` */
  tokenUri?: boolean;
  /** Whether to include sales data. This includes information like the price at which previous sales happened and on which marketplace. Having an empty `sales` object will exclude the taker and maker data  */
  sales?: SalesFilterOptions;
  /** Whether to include information regarding the token's mint. This includes information like the mint transaction and mint price. Having an empty `mint` object will exclude the logs that happened within the mint transaction */
  mint?: MintFilterOptions;
};

export type TokenFilterOptions = {
  /** Maximum number of tokens to return  - defaults to `50`  */
  limit?: number;
} & TokenQueryIncludeOptions;

export type TokenVariables = {
  /** contract hex-address */
  contract: string;
  /** token ID */
  tokenId?: string;
};

export type TokensIncludeOption = {
  /** Whether to include the tokens that the address holds - defaults to `false` */
  tokens?: TokenFilterOptions;
};

export type TokensQueryFilterOptions = {
  /** Filter tokens that satisfy the given contract address */
  ownerAddresses: string;
};

export type TokenQueryBaseOptions<T extends "token" | "tokens"> = {
  /** Includes more data in the response */
  include?: T extends "token"
    ? TokenQueryIncludeOptions
    : TokenQueryIncludeOptions & { totalCount?: boolean };
};

export type TokenQueryOptions = TokenQueryBaseOptions<"token"> & TokenVariables;

export type TokensQueryOptions = TokenQueryBaseOptions<"tokens"> & {
  /** Filter option(s) */
  filter?: TokensFilter;
  before?: TokensQueryVariables["before"];
  after?: TokensQueryVariables["after"];
  /** Maximum number of tokens to return - defaults to `50` */
  limit?: TokensQueryVariables["limit"];
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
  /** Maximum number of token transfers to return - defaults to `50` */
  limit?: number;
  /** Includes more data in the response */
  include?: TokenTransfersQueryIncludeOptions;
};

export type AddressQueryIncludeOptions = TokensIncludeOption & OwnerOptions;

export type AddressQueryOptions = {
  /** hex-address or ENS address */
  address: string;
  /** Includes more data in the response */
  include?: AddressQueryIncludeOptions;
};
