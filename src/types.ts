import {
  TokensFilter,
  TransactionLogsQueryVariables,
  TransactionsQueryVariables,
  Erc721TransfersQueryVariables,
  Erc20TransfersQueryVariables,
  Erc20BalancesFilter,
} from "./sdk";

// https://stackoverflow.com/questions/40510611/typescript-interface-require-one-of-two-properties-to-exist
type RequireAtLeastOne<T, Keys extends keyof T = keyof T> = Pick<
  T,
  Exclude<keyof T, Keys>
> &
  {
    [K in Keys]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<Keys, K>>>;
  }[Keys];

export type PageQueryOptions<K, T> = {
  /** Filter option(s) */
  filter?: K;
  /** Cursor used for pagination. To go to the previous page, provide the value returned from the cursor (if available) */
  before?: string;
  /** Cursor used for pagination. To go to the next page, provide the value returned from the cursor (if available) */
  after?: string;
  limit?: number;
  /** Whether to reverse the default sort order of the underlying list */
  reversed?: boolean;
  /** Includes more data in the response */
  include?: T & {
    /** Whether to include the total count of items. It's capped at `10,000` for performance reasons */
    totalCount?: boolean;
  };
};

export type IncludeFullProfileOptions = RequireAtLeastOne<{
  /** Whether to include the ENS profile information in the response - defaults to `false` */
  profile: boolean;
  /** Whether to include the reverse resolution of the ENS profile information in the response (ENS docs: https://docs.ens.domains/contract-api-reference/reverseregistrar) - defaults to `false`  */
  reverseProfile: boolean;
}>;

export type IncludeOnlyReverseProfile = Pick<
  IncludeFullProfileOptions,
  "reverseProfile"
>;

export type SalesFilterOptions = {
  /** Whether to include the maker of this sale as defined by the implementing marketplace contract */
  maker: IncludeOnlyReverseProfile | boolean;
  /** Whether to include the taker of this sale as defined by the implementing marketplace contract */
  taker: IncludeOnlyReverseProfile | boolean;
};

export type TokenVariables = {
  /** Token's contract hex-address or ENS name. */
  contract: string;
  /** The token ID within the contract. */
  tokenId?: string;
};

export type TransactionQueryIncludeOptions = {
  /** Whether to include the logs that happened within the transaction - defaults to `false` */
  logs: boolean;
  /** Whether to include the sender's address that initiated this transaction */
  from: IncludeOnlyReverseProfile | boolean;
  /** Whether to include the address the transaction was sent to. This can be another wallet, a contract, or `null` in the case of a contract creation. */
  to: IncludeOnlyReverseProfile | boolean;
  /** Whether to include the events that happened within the transaction. */
  events: boolean;
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
  mintTransaction?: TransactionQueryIncludeOptions | boolean;
  /** Whether to include the token attributes */
  attributes?: boolean;
};

export type TokenFilterOptions = {
  /** Maximum number of tokens to return  - defaults to `50`  */
  limit?: number;
} & TokenQueryIncludeOptions;

export type TokensIncludeOption = {
  /** Whether to include the tokens that the address holds - defaults to `false` */
  tokens?: Omit<TokenFilterOptions, "owner"> | boolean;
};

export type TokensQueryFilterOptions = {
  /** Filter tokens that satisfy the given contract address */
  ownerAddresses: string;
};

export type TokenQueryOptions = TokenVariables & {
  include?: TokenQueryIncludeOptions;
};

export type TokensQueryOptions = Omit<
  PageQueryOptions<TokensFilter, TokenQueryIncludeOptions>,
  "reversed"
>;

export type AddressQueryIncludeOptions = TokensIncludeOption &
  IncludeFullProfileOptions;

export type AddressQueryOptions = {
  /** hex-address or ENS address */
  address: string;
  /** Includes more data in the response */
  include?: AddressQueryIncludeOptions;
};

export type TransactionQueryOptions = {
  /** Transaction hash */
  hash: string;
  /** Includes more data in the response */
  include?: TransactionQueryIncludeOptions;
};

export type TransactionsQueryOptions = RequireAtLeastOne<
  PageQueryOptions<
    TransactionsQueryVariables["filter"],
    Partial<TransactionQueryIncludeOptions>
  >
>;

export type TransactionLogsQueryIncludeOptions = {
  /** Whether to include the block hash */
  blockHash?: boolean;
  /** Whether to include the address of the contract which emitted this log */
  address?: IncludeOnlyReverseProfile | boolean;
  /** Whether to include the transaction during which this log was emitted */
  transaction?: Omit<TransactionQueryIncludeOptions, "logs"> | boolean;
};

export type TransactionLogsQueryOptions = PageQueryOptions<
  Partial<TransactionLogsQueryVariables["filter"]>,
  TransactionLogsQueryIncludeOptions
>;

export type Erc721TransfersQueryIncludeOptions = {
  /** Whether to include the block hash */
  blockHash?: boolean;
  /** Whether to include the address containing this token's contract code */
  contract?: IncludeOnlyReverseProfile | boolean;
  /** Whether to include the transaction in which this transfer occurred */
  transaction?: TransactionQueryIncludeOptions | boolean;
  /** Whether to include the sale log found to be associated with this transfer */
  sale?: RequireAtLeastOne<SalesFilterOptions> | boolean;
  /** Whether to include the metadata for the token which was transferred */
  token?: Omit<TokenQueryIncludeOptions, "owner"> | boolean;
  /** Whether to include the address sending this token, when this contains the "null address" this token was minted during this transfer  */
  from?: IncludeOnlyReverseProfile | boolean;
  /** Whether to include the address receiving this token, when this contains the "null address" this token was burned during this transfer */
  to?: IncludeOnlyReverseProfile | boolean;
};

export type Erc721TransfersQueryOptions = Omit<
  PageQueryOptions<
    Partial<Erc721TransfersQueryVariables["filter"]>,
    Erc721TransfersQueryIncludeOptions
  >,
  "reversed"
>;

export type Erc20TransfersQueryIncludeOptions = {
  /** Whether to include the transaction in which this transfer occurred */
  transaction?: TransactionQueryIncludeOptions | boolean;
  /** Whether to include the address sending this token, when this contains the "null address" this token was minted during this transfer  */
  from?: IncludeOnlyReverseProfile | boolean;
  /** Whether to include the address receiving this token, when this contains the "null address" this token was burned during this transfer */
  to?: IncludeOnlyReverseProfile | boolean;
};

export type Erc20BalancesQueryIncludeOptions = {
  owner?: IncludeFullProfileOptions | boolean;
};

export type Erc20TransfersQueryOptions = Omit<
  PageQueryOptions<
    Partial<Erc20TransfersQueryVariables["filter"]>,
    Erc20TransfersQueryIncludeOptions
  >,
  "reversed"
>;

export type Erc20BalancesQueryOptions = {
  /** Includes more data in the response */
  include?: Erc20BalancesQueryIncludeOptions;
  filter: Erc20BalancesFilter;
};
