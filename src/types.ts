import {
  TokensFilter,
  TokensQueryVariables,
  TransactionsQueryVariables,
} from "./sdk";

// https://stackoverflow.com/questions/40510611/typescript-interface-require-one-of-two-properties-to-exist
type RequireAtLeastOne<T, Keys extends keyof T = keyof T> = Pick<
  T,
  Exclude<keyof T, Keys>
> &
  {
    [K in Keys]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<Keys, K>>>;
  }[Keys];

/**
 * Generates the include depending if the query is meant for retrieving a single or multiple objects
 */
export type GenerateIncludeQueryOptions<
  K,
  T extends "single" | "multiple",
  Extra = { totalCount?: boolean }
> = {
  /** Includes more data in the response */
  include?: T extends "single" ? K : K & Extra;
};

export type IncludeFullProfileOptions = {
  /** Whether to include the ENS profile information in the response - defaults to `false` */
  profile: boolean;
  /** Whether to include the reverse resolution of the ENS profile information in the response (ENS docs: https://docs.ens.domains/contract-api-reference/reverseregistrar) - defaults to `false`  */
  reverseProfile: boolean;
};

export type IncludeOnlyReverseProfile = Pick<
  IncludeFullProfileOptions,
  "reverseProfile"
>;

export type SalesFilterOptions = {
  maker: IncludeOnlyReverseProfile | boolean;
  taker: IncludeOnlyReverseProfile | boolean;
};

export type MintFilterOptions = {
  /** Whether to include the logs that happened within the transaction - defaults to `false` */
  transactionLogs: boolean;
};

export type TokenQueryIncludeOptions = {
  /** Whether to include owner's information in the response. */
  owner?: IncludeFullProfileOptions | boolean;
  /** Whether to include the media attached to the token, like the image, animation, etc - defaults to `false`  */
  media?: boolean;
  /** Whether to include the tokenUri. This is directly called from the contract and given as is, in JSON format - defaults to `false` */
  tokenUri?: boolean;
  /** Whether to include sales data. This includes information like the price at which previous sales happened and on which marketplace.  */
  sales?: RequireAtLeastOne<SalesFilterOptions> | boolean;
  /** Whether to include information regarding the token's mint. This includes information like the mint transaction and mint price. */
  mint?: MintFilterOptions | boolean;
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

export type TokenQueryOptions = GenerateIncludeQueryOptions<
  TokenQueryIncludeOptions,
  "single"
> &
  TokenVariables;

export type TokensQueryOptions = GenerateIncludeQueryOptions<
  TokenQueryIncludeOptions,
  "multiple"
> & {
  /** Filter option(s) */
  filter?: TokensFilter;
  after?: TokensQueryVariables["after"];
  /** Maximum number of tokens to return - defaults to `50` */
  limit?: TokensQueryVariables["limit"];
};

export type TokenTransfersQueryFilterOptions = TokensQueryFilterOptions;

export type TokenTransfersQueryIncludeOptions = {
  /** Whether to include ERC721 metadata, like `tokenId`, `attributes`, `contractAddress`, etc - defaults to `false` */
  erc721Metadata?: boolean;
  /** Whether to include from's information in the response. */
  from?: IncludeFullProfileOptions & TokensIncludeOption;
  /** Whether to include to's information in the response. */
  to?: IncludeFullProfileOptions & TokensIncludeOption;
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

export type AddressQueryIncludeOptions = TokensIncludeOption &
  IncludeFullProfileOptions;

export type AddressQueryOptions = {
  /** hex-address or ENS address */
  address: string;
  /** Includes more data in the response */
  include?: AddressQueryIncludeOptions;
};

export type TransactionQueryIncludeOptions = {
  logs?: boolean;
  sender?: IncludeOnlyReverseProfile | boolean;
  recipient?: IncludeOnlyReverseProfile | boolean;
};

export type TransactionQueryOptions = {
  /** Transaction hash */
  hash: string;
  include?: TransactionQueryIncludeOptions;
};

export type TransactionsQueryOptions = GenerateIncludeQueryOptions<
  TransactionQueryIncludeOptions,
  "multiple",
  { totalCount?: boolean; reversed?: boolean }
> & {
  filter: TransactionsQueryVariables["filter"];
  after?: TransactionsQueryVariables["after"];
};
