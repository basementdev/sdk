import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /**
   * The `DateTime` scalar type represents a date and time in the UTC
   * timezone. The DateTime appears in a JSON response as an ISO8601 formatted
   * string, including UTC timezone ("Z"). The parsed date and time string will
   * be converted to UTC if there is an offset.
   */
  DateTime: any;
  /** Address with EIP55 checksum */
  HexAddress: any;
  /**
   * The `Json` scalar type represents arbitrary json string data, represented as UTF-8
   * character sequences. The Json type is most often used to represent a free-form
   * human-readable json string.
   */
  Json: any;
  /** The LogTopic scalar type converts addresses and written signatures to their hex equivalents used in log topics */
  LogTopic: any;
  /** The `wei` scalar takes large integers and converts them to a base10 string. Due to javascript's limits, prices in wei can be inaccurate when passed as a string. */
  Wei: any;
};

/** Address on the blockchain, contains info about tokens and ENS profiles */
export type Address = {
  /** EIP55 checksummed hexadecimal address */
  address: Scalars['HexAddress'];
  /**
   * ENS profile which was used to refer to this address in a top-level argument, null if this address was queried as a hex address instead of an ENS name.
   *
   * *Example:*
   * `address(name: "vitalik.eth") { profile { name } }` will return vitalik.eth as the profile's name.
   */
  profile: Maybe<Profile>;
  /** ENS profile for the reverse-record set in ENS for this address */
  reverseProfile: Maybe<Profile>;
  tokens: Maybe<Array<NonFungibleToken>>;
};


/** Address on the blockchain, contains info about tokens and ENS profiles */
export type AddressTokensArgs = {
  limit: InputMaybe<Scalars['Int']>;
};

export type Cursors = {
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
};

export type Erc721Token = NonFungibleToken & {
  animation: Maybe<Media>;
  animationUrl: Maybe<Scalars['String']>;
  backgroundColor: Maybe<Scalars['String']>;
  contract: Scalars['String'];
  description: Maybe<Scalars['String']>;
  externalUrl: Maybe<Scalars['String']>;
  image: Maybe<Media>;
  imageStorageType: Maybe<TokenStorageType>;
  mintPrice: Scalars['Wei'];
  mintTransaction: Maybe<Transaction>;
  name: Maybe<Scalars['String']>;
  owner: Maybe<Address>;
  sales: Maybe<Array<NonFungibleTokenSale>>;
  tokenId: Scalars['String'];
  tokenUri: Maybe<Scalars['Json']>;
  youtubeUrl: Maybe<Scalars['String']>;
};

/** A transfer of an ERC721 non fungible token from one token to another, as defined in EIP721. */
export type Erc721Transfer = TransactionEvent & {
  /** Block Number in which this transaction was included */
  blockNumber: Scalars['Int'];
  /** Address containing this token's contract code */
  contract: Address;
  /** Address containing this token's contract code */
  contractAddress: Scalars['HexAddress'];
  /** Address sending this token, when this contains the "null address" this token was minted during this transfer */
  from: Address;
  /** Whether this was a mint initiated by an address that was not the receiver of this transfer */
  isAirdrop: Scalars['Boolean'];
  /** Position of the log within a block in which this transfer was logged */
  logIndex: Scalars['Int'];
  /** Sale log found to be associated with this transfer */
  sale: Maybe<NonFungibleTokenSale>;
  /** Address receiving this token, when this contains the "null address" this token was burned during this transfer */
  to: Maybe<Address>;
  /** Metadata for the token which was transferred */
  token: NonFungibleToken;
  /** Token ID which was transferred */
  tokenId: Scalars['String'];
  /** Transaction in which this transfer occurred */
  transaction: Transaction;
  /** Hash signature of the transaction in which this transfer did occur */
  transactionHash: Scalars['String'];
};

export type Erc721TransferPage = {
  /** Cursors for use in Pagination */
  cursors: Cursors;
  /** List of transfers within this page, use the `after` cursor to fetch more tokens */
  erc721Transfers: Array<Erc721Transfer>;
  /** Total amount of items within the given filters. Capped at 10000 for performance reasons. */
  totalCount: Scalars['Int'];
};

export enum ExcludeTransferFilter {
  /** Mints where the initiatior of the transaction does not match the recipient of the token. */
  Airdrop = 'AIRDROP',
  /** Transfers without an associated sale or where the value of the transaction is zero. */
  ZeroEthTransfer = 'ZERO_ETH_TRANSFER'
}

export enum Marketplace {
  /** Trade made through a wyvern or seaport contract */
  Opensea = 'OPENSEA'
}

export type Media = {
  /** Blurhash for showing a gradient while images are fetching, uses formatting from https://blurhash.io */
  blurhash: Maybe<Scalars['String']>;
  /** An arbitrary checksum for this media, useful for caching */
  checksum: Scalars['String'];
  /** Image's height, nil if this media is not an image */
  height: Maybe<Scalars['Int']>;
  /** A large render for this token */
  largeUrl: Maybe<Scalars['String']>;
  /** Content-Type as returned by the host of this media */
  mimeType: Maybe<Scalars['String']>;
  /** A small render for this token */
  smallUrl: Maybe<Scalars['String']>;
  /** A thumbnail render for this token */
  thumbnailUrl: Maybe<Scalars['String']>;
  /** Original file stored on Basement's cdn */
  url: Maybe<Scalars['String']>;
  /** Image's width, nil if this media is not an image */
  width: Maybe<Scalars['Int']>;
};

/** Metadata of a token as defined in one of the non-fungible token EIPs */
export type NonFungibleToken = {
  /** Animation hosted on Basement CDN */
  animation: Maybe<Media>;
  /** Background color given to this token by the creator */
  backgroundColor: Maybe<Scalars['String']>;
  /** Contract where token is hosted */
  contract: Scalars['String'];
  /** Description given to this token by the creator */
  description: Maybe<Scalars['String']>;
  /** External URL given to this token by the creator */
  externalUrl: Maybe<Scalars['String']>;
  /** Image hosted on Basement CDN */
  image: Maybe<Media>;
  /** Place of storage for the image file */
  imageStorageType: Maybe<TokenStorageType>;
  /** Price this token was minted for, inferred from the ether value of the transaction containing the first known transfer */
  mintPrice: Scalars['Wei'];
  /** Transaction containing the first known transfer */
  mintTransaction: Maybe<Transaction>;
  /** Name given to this token by the creator */
  name: Maybe<Scalars['String']>;
  /** Current owner of this token */
  owner: Maybe<Address>;
  /** A list of previous sales for this token */
  sales: Maybe<Array<NonFungibleTokenSale>>;
  /** Identifier of the token */
  tokenId: Scalars['String'];
  /** Raw metadata as returned by calling tokenUri on the token's contract */
  tokenUri: Maybe<Scalars['Json']>;
  /** Youtube URL given to this token by the creator */
  youtubeUrl: Maybe<Scalars['String']>;
};

/** Index of the log in a transaction signaling the sale. Such as OrdersMatched or OrderFulfilled. */
export type NonFungibleTokenSale = TransactionEvent & {
  /** Currency used for this sale. When null this is the native currency */
  currencyContract: Maybe<Address>;
  /** In the case of a batch sale, there are multiple sales in one log, this value returns the index within a given log. */
  eventIndex: Scalars['Int'];
  /** Index of the log in a transaction signaling the sale. Such as OrdersMatched or OrderFulfilled. */
  logIndex: Scalars['Int'];
  /** Maker of this sale as defined by the implementing marketplace contract */
  maker: Address;
  /** Marketplace in which this sale occurred */
  marketplace: Marketplace;
  /** Marketplace contract used for this sale */
  marketplaceContract: Address;
  /** Price in wei, always check currency_contract to check whether this price is in the native currency of the chain or an erc20 equivalent */
  price: Scalars['Wei'];
  /** Taker of this sale as defined by the implementing marketplace contract */
  taker: Address;
  /** Metadata for the token which was transferred due to this sale */
  tokenMetadata: Maybe<NonFungibleToken>;
  transaction: Transaction;
  /** Hash signature of the transaction in which this sale occurred */
  transactionHash: Scalars['String'];
};

export type Profile = {
  /** Avatar text record, as returned by the ENS resolver. */
  avatar: Maybe<Scalars['String']>;
  /** Email text record, as returned by the ENS resolver. */
  email: Maybe<Scalars['String']>;
  name: Scalars['String'];
  /** Returns any text record stored in ENS with the given key. */
  text: Maybe<Scalars['String']>;
};


export type ProfileTextArgs = {
  key: Scalars['String'];
};

export type RootMutationType = {
  nonFungibleTokenRefresh: Maybe<Scalars['String']>;
};


export type RootMutationTypeNonFungibleTokenRefreshArgs = {
  contract: Scalars['String'];
  tokenId: Scalars['String'];
};

export type RootQueryType = {
  address: Maybe<Address>;
  erc721Transfers: Erc721TransferPage;
  token: Maybe<NonFungibleToken>;
  tokens: TokensPage;
  /** Query a transaction */
  transaction: Maybe<Transaction>;
  transactionLogs: Maybe<TransactionLogPage>;
  transactions: Maybe<TransactionPage>;
};


export type RootQueryTypeAddressArgs = {
  address: Scalars['String'];
};


export type RootQueryTypeErc721TransfersArgs = {
  after: InputMaybe<Scalars['String']>;
  before: InputMaybe<Scalars['String']>;
  filter: InputMaybe<TransfersFilter>;
  limit: InputMaybe<Scalars['Int']>;
};


export type RootQueryTypeTokenArgs = {
  contract: Scalars['String'];
  tokenId: Scalars['String'];
};


export type RootQueryTypeTokensArgs = {
  after: InputMaybe<Scalars['String']>;
  before: InputMaybe<Scalars['String']>;
  filter: InputMaybe<TokensFilter>;
  limit: InputMaybe<Scalars['Int']>;
};


export type RootQueryTypeTransactionArgs = {
  hash: Scalars['String'];
};


export type RootQueryTypeTransactionLogsArgs = {
  after: InputMaybe<Scalars['String']>;
  before: InputMaybe<Scalars['String']>;
  filter: InputMaybe<TransactionLogFilter>;
  limit: InputMaybe<Scalars['Int']>;
  reversed: InputMaybe<Scalars['Boolean']>;
};


export type RootQueryTypeTransactionsArgs = {
  after: InputMaybe<Scalars['String']>;
  before: InputMaybe<Scalars['String']>;
  filter: InputMaybe<TransactionFilter>;
  limit: InputMaybe<Scalars['Int']>;
  reversed: InputMaybe<Scalars['Boolean']>;
};

export enum TokenStorageType {
  /** Stored on IPFS */
  Arweave = 'ARWEAVE',
  /** Stored on IPFS */
  Ipfs = 'IPFS',
  /** Stored in a data-uri */
  OnChain = 'ON_CHAIN',
  /** Stored on the creator's server */
  Server = 'SERVER'
}

export type TokensFilter = {
  /** A list of addresses who own the returned tokens. */
  ownerAddresses: InputMaybe<Array<Scalars['String']>>;
};

export type TokensPage = {
  /** Cursors for use in Pagination */
  cursors: Cursors;
  /** List of tokens within this page, use the `after` cursor to fetch more tokens */
  tokens: Array<NonFungibleToken>;
  /** Total amount of items within the given filters. Capped at 10000 for performance reasons */
  totalCount: Scalars['Int'];
};

/** A transaction executed and stored on the blockchain */
export type Transaction = {
  /** Block Number in which this transaction was included */
  blockNumber: Scalars['Int'];
  /** UTC time at which this block was mined */
  blockTimestamp: Scalars['DateTime'];
  /** Gas price with which the transaction was executed by the miner in wei */
  effectiveGasPrice: Scalars['Wei'];
  /** Indexed transaction events. See implementations of `TransactionEvent` for possible results, */
  events: Array<TransactionEvent>;
  /** Address which initiated this transaction */
  from: Address;
  /** Maximum amount of gas for which the address allowed the miner to execute */
  gas: Scalars['Int'];
  /** Amount of eth paid to execute this transaction, in wei */
  gasPaid: Scalars['Wei'];
  /** Gas price with which the transaction was sent by the address in wei */
  gasPrice: Scalars['Wei'];
  /** Gas used after execution by the miner */
  gasUsed: Scalars['Int'];
  /** Signature hash for this transaction */
  hash: Scalars['String'];
  /** Unique identifier within transactions in Basement. Can be useful for caching in for example Apollo Client. */
  id: Scalars['ID'];
  /** Position of this transaction within a block */
  index: Scalars['Int'];
  /** Complete calldata sent with this transaction */
  input: Maybe<Scalars['String']>;
  /** Logs emitted while executing this transaction */
  logs: Array<TransactionLog>;
  /** First 4 bytes of the input, which refer to the function signature of the contract */
  methodId: Maybe<Scalars['String']>;
  /** Whether execution on this transaction succeeded */
  status: Scalars['Boolean'];
  /** Address to which this transaction was sent. This can be another wallet, a contract, or nil in the case of a contract creation. */
  to: Maybe<Address>;
  /** Number of eth sent with the transaction in wei */
  value: Scalars['Wei'];
};

/** An interface implemented by events within a transaction that were indexed in our graph */
export type TransactionEvent = {
  /** Hash signature of the transaction in which this sale occurred */
  transactionHash: Scalars['String'];
};

export type TransactionFilter = {
  /** A list of block numbers to include transactions from */
  blockNumbers: InputMaybe<Array<Scalars['Int']>>;
  /** A list of addresses who initiated transactions. Ignored when empty. */
  fromAddresses: InputMaybe<Array<Scalars['String']>>;
  /** A list of methodIds as specified in the first 4 bytes of calldata. Note: this field is not verified to be a valid call. Addresses may send transactions with arbitrary data. */
  methodIds: InputMaybe<Array<Scalars['String']>>;
  /** A list of addresses to whom a transaction was sent. Add `nil` to include contract creation transactions. Ignored when empty. */
  toAddresses: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type TransactionLog = {
  /** Address of the contract which emitted this log */
  address: Address;
  /** Block number in which this log was included */
  blockNumber: Scalars['Int'];
  /** Hex encoded data included in the log. */
  data: Scalars['String'];
  /** Position of this log within the block */
  logIndex: Scalars['Int'];
  /** Whether this log was removed during a block reorg */
  removed: Scalars['Boolean'];
  /** List of hex encoded topics, as indexed by this log event */
  topics: Array<Scalars['String']>;
  /** The transaction during which this log was emitted */
  transaction: Transaction;
  /** Hash signature of the transaction during which this log was emitted */
  transactionHash: Scalars['String'];
};

export type TransactionLogFilter = {
  /** A list of contract addresses from which this log was emitted.  Ignored when empty. */
  addresses: InputMaybe<Array<Scalars['String']>>;
  /** A list of block numbers to include transaction logs from */
  blockNumbers: InputMaybe<Array<Scalars['Int']>>;
  /** Whether to include logs which were removed during a block reorg, defaults to false. */
  includeRemoved: InputMaybe<Scalars['Boolean']>;
  /**
   * A list of topics to search for.
   *
   * ## Formatting
   * - Hex encoded: "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef"
   * - Address: "0xC02AAA39B223FE8D0A0E5C4F27EAD9083C756CC2"
   * - ENS address: "gotu.eth"
   * - Signature: "Tranfer(address,address,uint256)"
   *
   * ## Filtering
   * Topics filter is a list of lists, similar to eth_getLogs. When a second, third or fourth topic has been specified, the first topic must be specified for performance reasons.
   * - `[[]]`: Any topic in the first position
   * - `[["Tranfer(address,address,uint256)"], [], []]`: Must match the first topic, any topic in the second and third position, these cannot be null.`
   * - `[["Tranfer(address,address,uint256)"], [], ["gotu.eth", "vitalik.eth"]]`: Must match the first topic, any topic in the second position, must match any of the addresses in the third position.`
   */
  topics: InputMaybe<Array<Array<Scalars['LogTopic']>>>;
  /** Filter on the transactions in which a log was emitted. */
  transaction: InputMaybe<TransactionLogTransactionFilter>;
};

export type TransactionLogPage = {
  /** Cursors for use in Pagination */
  cursors: Cursors;
  /** Total amount of items within the given filters. Capped at 10000 for performance reasons. */
  totalCount: Scalars['Int'];
  /** List of transaction logs within this page, use the `after` cursor to fetch more tokens */
  transactionLogs: Array<TransactionLog>;
};

export type TransactionLogTransactionFilter = {
  /** A list of addresses who initiated the transaction this log was emitted from. Ignored when empty. */
  fromAddresses: InputMaybe<Array<Scalars['String']>>;
  /** A list of addresses to whom a transaction which emitted this log was sent. Add `nil` to include contract creation transactions. Ignored when empty. */
  toAddresses: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type TransactionPage = {
  /** Cursors for use in Pagination */
  cursors: Cursors;
  /** Total amount of items within the given filters. Capped at 10000 for performance reasons. */
  totalCount: Scalars['Int'];
  /** List of transactions within this page, use the `after` cursor to fetch more tokens */
  transactions: Array<Transaction>;
};

export type TransfersFilter = {
  /** A list of block numbers to include transfers from */
  blockNumbers: InputMaybe<Array<Scalars['Int']>>;
  /** A contract to include transfers from. */
  contractAddresses: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Categories to exclude transfers from */
  exclude: InputMaybe<Array<ExcludeTransferFilter>>;
  /** A list of addresses who received the NFT. Ignored when empty. */
  fromAddresses: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** A list of addresses who received the NFT. */
  toAddresses: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Token ids to include transfers from */
  tokenIds: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export const GlobalKeysFragmentDoc = gql`
    fragment GlobalKeys on Profile {
  name
  avatar: text(key: "avatar")
}
    `;
export const TransactionInfoFragmentDoc = gql`
    fragment TransactionInfo on Transaction {
  blockNumber
  blockTimestamp
  effectiveGasPrice
  events {
    transactionHash
  }
  gas
  gasPaid
  gasUsed
  gasPrice
  hash
  id
  index
  input
  from @include(if: $includeTransactionSender) {
    address
    reverseProfile {
      ...GlobalKeys
    }
  }
  to @include(if: $includeTransactionRecipient) {
    address
    reverseProfile {
      ...GlobalKeys
    }
  }
  value
  methodId
  status
  logs @include(if: $includeTransactionLogs) {
    data
    logIndex
    removed
    topics
  }
}
    ${GlobalKeysFragmentDoc}`;
export const NonFungibleTokenMintInfoFragmentDoc = gql`
    fragment NonFungibleTokenMintInfo on NonFungibleToken {
  mintPrice
  mintTransaction {
    ...TransactionInfo
  }
}
    ${TransactionInfoFragmentDoc}`;
export const NonFungibleTokenSaleInfoBaseFragmentDoc = gql`
    fragment NonFungibleTokenSaleInfoBase on NonFungibleTokenSale {
  currencyContract {
    address
  }
  eventIndex
  logIndex
  marketplace
  marketplaceContract {
    address
  }
  price
}
    `;
export const NonFungibleTokenSalesInfoFragmentDoc = gql`
    fragment NonFungibleTokenSalesInfo on NonFungibleTokenSale {
  ...NonFungibleTokenSaleInfoBase
  maker @include(if: $includeTokenSalesMaker) {
    address
    reverseProfile @include(if: $includeTokenSalesMakerReverseProfile) {
      ...GlobalKeys
    }
  }
  taker @include(if: $includeTokenSalesTaker) {
    address
    reverseProfile @include(if: $includeTokenSalesTakerReverseProfile) {
      ...GlobalKeys
    }
  }
}
    ${NonFungibleTokenSaleInfoBaseFragmentDoc}
${GlobalKeysFragmentDoc}`;
export const NonFungibleErc721TransferSaleInfoFragmentDoc = gql`
    fragment NonFungibleErc721TransferSaleInfo on NonFungibleTokenSale {
  ...NonFungibleTokenSaleInfoBase
  maker @include(if: $includeErc721TransferSaleMaker) {
    address
    reverseProfile @include(if: $includeErc721TransferSaleMakerReverseProfile) {
      ...GlobalKeys
    }
  }
  taker @include(if: $includeErc721TransferSaleTaker) {
    address
    reverseProfile @include(if: $includeErc721TransferSaleTakerReverseProfile) {
      ...GlobalKeys
    }
  }
}
    ${NonFungibleTokenSaleInfoBaseFragmentDoc}
${GlobalKeysFragmentDoc}`;
export const NonFungibleTokenOwnerInfoFragmentDoc = gql`
    fragment NonFungibleTokenOwnerInfo on NonFungibleToken {
  owner {
    address
    profile @include(if: $includeOwnerProfile) {
      ...GlobalKeys
    }
    reverseProfile @include(if: $includeOwnerReverseProfile) {
      ...GlobalKeys
    }
  }
}
    ${GlobalKeysFragmentDoc}`;
export const MediaInfoFragmentDoc = gql`
    fragment MediaInfo on Media {
  blurhash
  checksum
  height
  width
  url
  smallUrl
  thumbnailUrl
  largeUrl
  mimeType
}
    `;
export const NonFungibleTokenMediaInfoFragmentDoc = gql`
    fragment NonFungibleTokenMediaInfo on NonFungibleToken {
  animation {
    ...MediaInfo
  }
  image {
    ...MediaInfo
  }
  imageStorageType
  backgroundColor
  youtubeUrl
}
    ${MediaInfoFragmentDoc}`;
export const NonFungibleTokenInfoFragmentDoc = gql`
    fragment NonFungibleTokenInfo on NonFungibleToken {
  contract
  description
  name
  tokenId
  externalUrl
}
    `;
export const NonFungibleTokenRefreshDocument = gql`
    mutation nonFungibleTokenRefresh($contract: String!, $tokenId: String!) {
  nonFungibleTokenRefresh(contract: $contract, tokenId: $tokenId)
}
    `;
export const AddressDocument = gql`
    query address($address: String!, $tokensLimit: Int = 10, $includeProfile: Boolean = false, $includeReverseProfile: Boolean = false, $includeTokens: Boolean = false, $includeTokenUri: Boolean = false, $includeTokenMint: Boolean = false, $includeTokenMedia: Boolean = false, $includeTransactionLogs: Boolean = false, $includeTokenSales: Boolean = false, $includeTokenSalesMaker: Boolean = false, $includeTokenSalesTaker: Boolean = false, $includeTokenSalesMakerReverseProfile: Boolean = false, $includeTokenSalesTakerReverseProfile: Boolean = false, $includeTransactionRecipient: Boolean = false, $includeTransactionSender: Boolean = false) {
  address(address: $address) {
    address
    profile @include(if: $includeProfile) {
      ...GlobalKeys
    }
    reverseProfile @include(if: $includeReverseProfile) {
      ...GlobalKeys
    }
    tokens(limit: $tokensLimit) @include(if: $includeTokens) {
      ...NonFungibleTokenInfo
      ...NonFungibleTokenMediaInfo @include(if: $includeTokenMedia)
      sales @include(if: $includeTokenSales) {
        ...NonFungibleTokenSalesInfo
      }
      ...NonFungibleTokenMintInfo @include(if: $includeTokenMint)
      tokenUri @include(if: $includeTokenUri)
    }
  }
}
    ${GlobalKeysFragmentDoc}
${NonFungibleTokenInfoFragmentDoc}
${NonFungibleTokenMediaInfoFragmentDoc}
${NonFungibleTokenSalesInfoFragmentDoc}
${NonFungibleTokenMintInfoFragmentDoc}`;
export const TokenDocument = gql`
    query token($contract: String!, $tokenId: String!, $includeOwner: Boolean = false, $includeOwnerProfile: Boolean = false, $includeOwnerReverseProfile: Boolean = false, $includeTokenUri: Boolean = false, $includeTokenMint: Boolean = false, $includeTokenMedia: Boolean = false, $includeTransactionLogs: Boolean = false, $includeTokenSales: Boolean = false, $includeTokenSalesMaker: Boolean = false, $includeTokenSalesTaker: Boolean = false, $includeTokenSalesMakerReverseProfile: Boolean = false, $includeTokenSalesTakerReverseProfile: Boolean = false, $includeTransactionRecipient: Boolean = false, $includeTransactionSender: Boolean = false) {
  token(contract: $contract, tokenId: $tokenId) {
    ...NonFungibleTokenInfo
    ...NonFungibleTokenOwnerInfo @include(if: $includeOwner)
    ...NonFungibleTokenMediaInfo @include(if: $includeTokenMedia)
    sales @include(if: $includeTokenSales) {
      ...NonFungibleTokenSalesInfo
    }
    ...NonFungibleTokenMintInfo @include(if: $includeTokenMint)
    tokenUri @include(if: $includeTokenUri)
  }
}
    ${NonFungibleTokenInfoFragmentDoc}
${NonFungibleTokenOwnerInfoFragmentDoc}
${NonFungibleTokenMediaInfoFragmentDoc}
${NonFungibleTokenSalesInfoFragmentDoc}
${NonFungibleTokenMintInfoFragmentDoc}`;
export const TokensDocument = gql`
    query tokens($filter: TokensFilter, $limit: Int = 50, $after: String, $includeTotalCount: Boolean = false, $includeOwner: Boolean = false, $includeOwnerProfile: Boolean = false, $includeOwnerReverseProfile: Boolean = false, $includeTokenUri: Boolean = false, $includeTokenMint: Boolean = false, $includeTokenMedia: Boolean = false, $includeTransactionLogs: Boolean = false, $includeTransactionSender: Boolean = false, $includeTransactionRecipient: Boolean = false, $includeTokenSales: Boolean = false, $includeTokenSalesMaker: Boolean = false, $includeTokenSalesTaker: Boolean = false, $includeTokenSalesMakerReverseProfile: Boolean = false, $includeTokenSalesTakerReverseProfile: Boolean = false) {
  tokens(filter: $filter, limit: $limit, after: $after) {
    cursors {
      after
    }
    totalCount @include(if: $includeTotalCount)
    tokens {
      ...NonFungibleTokenInfo
      ...NonFungibleTokenOwnerInfo @include(if: $includeOwner)
      ...NonFungibleTokenMediaInfo @include(if: $includeTokenMedia)
      ...NonFungibleTokenMintInfo @include(if: $includeTokenMint)
      tokenUri @include(if: $includeTokenUri)
      sales @include(if: $includeTokenSales) {
        ...NonFungibleTokenSalesInfo
      }
    }
  }
}
    ${NonFungibleTokenInfoFragmentDoc}
${NonFungibleTokenOwnerInfoFragmentDoc}
${NonFungibleTokenMediaInfoFragmentDoc}
${NonFungibleTokenMintInfoFragmentDoc}
${NonFungibleTokenSalesInfoFragmentDoc}`;
export const TransactionDocument = gql`
    query transaction($hash: String!, $includeTransactionLogs: Boolean = false, $includeTransactionRecipient: Boolean = false, $includeTransactionSender: Boolean = false) {
  transaction(hash: $hash) {
    ...TransactionInfo
  }
}
    ${TransactionInfoFragmentDoc}`;
export const TransactionsDocument = gql`
    query transactions($filter: TransactionFilter, $after: String, $limit: Int = 50, $reversed: Boolean = false, $includeTotalCount: Boolean = false, $includeTransactionRecipient: Boolean = false, $includeTransactionSender: Boolean = false, $includeTransactionLogs: Boolean = false) {
  transactions(filter: $filter, after: $after, limit: $limit, reversed: $reversed) {
    cursors {
      after
    }
    totalCount @include(if: $includeTotalCount)
    transactions {
      ...TransactionInfo
    }
  }
}
    ${TransactionInfoFragmentDoc}`;
export const TransactionLogsDocument = gql`
    query transactionLogs($after: String, $includeTotalCount: Boolean = false, $filter: TransactionLogFilter, $limit: Int = 50, $reversed: Boolean = false, $includeTransactionRecipient: Boolean = false, $includeTransactionSender: Boolean = false, $includeTransactionLogs: Boolean = false, $includeContractReverseProfile: Boolean = false, $includeTransaction: Boolean = false) {
  transactionLogs(
    after: $after
    limit: $limit
    filter: $filter
    reversed: $reversed
  ) {
    cursors {
      after
    }
    totalCount @include(if: $includeTotalCount)
    transactionLogs {
      address {
        address
        reverseProfile @include(if: $includeContractReverseProfile) {
          ...GlobalKeys
        }
      }
      data
      logIndex
      removed
      topics
      transactionHash
      blockNumber
      transaction @include(if: $includeTransaction) {
        ...TransactionInfo
      }
    }
  }
}
    ${GlobalKeysFragmentDoc}
${TransactionInfoFragmentDoc}`;
export const Erc721TransfersDocument = gql`
    query erc721Transfers($filter: TransfersFilter, $after: String, $limit: Int = 50, $includeTotalCount: Boolean = false, $includeTokenSalesMaker: Boolean = false, $includeTokenSalesTaker: Boolean = false, $includeTokenSalesMakerReverseProfile: Boolean = false, $includeTokenSalesTakerReverseProfile: Boolean = false, $includeTransactionLogs: Boolean = false, $includeTransactionRecipient: Boolean = false, $includeTransactionSender: Boolean = false, $includeToken: Boolean = false, $includeTokenMedia: Boolean = false, $includeTokenMint: Boolean = false, $includeTokenUri: Boolean = false, $includeTokenSales: Boolean = false, $includeTransferContract: Boolean = false, $includeTransferContractReverseProfile: Boolean = false, $includeSale: Boolean = false, $includeErc721TransferSaleTaker: Boolean = false, $includeErc721TransferSaleMaker: Boolean = false, $includeErc721TransferSaleMakerReverseProfile: Boolean = false, $includeErc721TransferSaleTakerReverseProfile: Boolean = false, $includeTransaction: Boolean = false, $includeTransferSender: Boolean = false, $includeTransferSenderReverseProfile: Boolean = false, $includeTransferRecipient: Boolean = false, $includeTransferRecipientReverseProfile: Boolean = false) {
  erc721Transfers(filter: $filter, after: $after, limit: $limit) {
    cursors {
      after
    }
    totalCount @include(if: $includeTotalCount)
    erc721Transfers {
      blockNumber
      contract @include(if: $includeTransferContract) {
        address
        reverseProfile @include(if: $includeTransferContractReverseProfile) {
          ...GlobalKeys
        }
      }
      sale @include(if: $includeSale) {
        ...NonFungibleErc721TransferSaleInfo
      }
      transaction @include(if: $includeTransaction) {
        ...TransactionInfo
      }
      from @include(if: $includeTransferSender) {
        address
        reverseProfile @include(if: $includeTransferSenderReverseProfile) {
          ...GlobalKeys
        }
      }
      to @include(if: $includeTransferRecipient) {
        address
        reverseProfile @include(if: $includeTransferRecipientReverseProfile) {
          ...GlobalKeys
        }
      }
      isAirdrop
      logIndex
      token @include(if: $includeToken) {
        ...NonFungibleTokenInfo
        ...NonFungibleTokenMediaInfo @include(if: $includeTokenMedia)
        ...NonFungibleTokenMintInfo @include(if: $includeTokenMint)
        tokenUri @include(if: $includeTokenUri)
        sales @include(if: $includeTokenSales) {
          ...NonFungibleTokenSalesInfo
        }
      }
    }
  }
}
    ${GlobalKeysFragmentDoc}
${NonFungibleErc721TransferSaleInfoFragmentDoc}
${TransactionInfoFragmentDoc}
${NonFungibleTokenInfoFragmentDoc}
${NonFungibleTokenMediaInfoFragmentDoc}
${NonFungibleTokenMintInfoFragmentDoc}
${NonFungibleTokenSalesInfoFragmentDoc}`;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    nonFungibleTokenRefresh(variables: NonFungibleTokenRefreshMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<NonFungibleTokenRefreshMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<NonFungibleTokenRefreshMutation>(NonFungibleTokenRefreshDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'nonFungibleTokenRefresh', 'mutation');
    },
    address(variables: AddressQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<AddressQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<AddressQuery>(AddressDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'address', 'query');
    },
    token(variables: TokenQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<TokenQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<TokenQuery>(TokenDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'token', 'query');
    },
    tokens(variables?: TokensQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<TokensQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<TokensQuery>(TokensDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'tokens', 'query');
    },
    transaction(variables: TransactionQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<TransactionQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<TransactionQuery>(TransactionDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'transaction', 'query');
    },
    transactions(variables?: TransactionsQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<TransactionsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<TransactionsQuery>(TransactionsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'transactions', 'query');
    },
    transactionLogs(variables?: TransactionLogsQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<TransactionLogsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<TransactionLogsQuery>(TransactionLogsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'transactionLogs', 'query');
    },
    erc721Transfers(variables?: Erc721TransfersQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<Erc721TransfersQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<Erc721TransfersQuery>(Erc721TransfersDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'erc721Transfers', 'query');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;
export type NonFungibleTokenRefreshMutationVariables = Exact<{
  contract: Scalars['String'];
  tokenId: Scalars['String'];
}>;


export type NonFungibleTokenRefreshMutation = { nonFungibleTokenRefresh: string | null };

export type AddressQueryVariables = Exact<{
  address: Scalars['String'];
  tokensLimit?: InputMaybe<Scalars['Int']>;
  includeProfile?: InputMaybe<Scalars['Boolean']>;
  includeReverseProfile?: InputMaybe<Scalars['Boolean']>;
  includeTokens?: InputMaybe<Scalars['Boolean']>;
  includeTokenUri?: InputMaybe<Scalars['Boolean']>;
  includeTokenMint?: InputMaybe<Scalars['Boolean']>;
  includeTokenMedia?: InputMaybe<Scalars['Boolean']>;
  includeTransactionLogs?: InputMaybe<Scalars['Boolean']>;
  includeTokenSales?: InputMaybe<Scalars['Boolean']>;
  includeTokenSalesMaker?: InputMaybe<Scalars['Boolean']>;
  includeTokenSalesTaker?: InputMaybe<Scalars['Boolean']>;
  includeTokenSalesMakerReverseProfile?: InputMaybe<Scalars['Boolean']>;
  includeTokenSalesTakerReverseProfile?: InputMaybe<Scalars['Boolean']>;
  includeTransactionRecipient?: InputMaybe<Scalars['Boolean']>;
  includeTransactionSender?: InputMaybe<Scalars['Boolean']>;
}>;


export type AddressQuery = { address: { address: any, profile?: { name: string, avatar: string | null } | null, reverseProfile?: { name: string, avatar: string | null } | null, tokens?: Array<{ tokenUri?: any | null, contract: string, description: string | null, name: string | null, tokenId: string, externalUrl: string | null, imageStorageType: TokenStorageType | null, backgroundColor: string | null, youtubeUrl: string | null, mintPrice: any, sales?: Array<{ eventIndex: number, logIndex: number, marketplace: Marketplace, price: any, maker?: { address: any, reverseProfile?: { name: string, avatar: string | null } | null }, taker?: { address: any, reverseProfile?: { name: string, avatar: string | null } | null }, currencyContract: { address: any } | null, marketplaceContract: { address: any } }> | null, animation: { blurhash: string | null, checksum: string, height: number | null, width: number | null, url: string | null, smallUrl: string | null, thumbnailUrl: string | null, largeUrl: string | null, mimeType: string | null } | null, image: { blurhash: string | null, checksum: string, height: number | null, width: number | null, url: string | null, smallUrl: string | null, thumbnailUrl: string | null, largeUrl: string | null, mimeType: string | null } | null, mintTransaction: { blockNumber: number, blockTimestamp: any, effectiveGasPrice: any, gas: number, gasPaid: any, gasUsed: number, gasPrice: any, hash: string, id: string, index: number, input: string | null, value: any, methodId: string | null, status: boolean, events: Array<{ transactionHash: string } | { transactionHash: string }>, from?: { address: any, reverseProfile: { name: string, avatar: string | null } | null }, to?: { address: any, reverseProfile: { name: string, avatar: string | null } | null } | null, logs?: Array<{ data: string, logIndex: number, removed: boolean, topics: Array<string> }> } | null }> | null } | null };

export type TokenQueryVariables = Exact<{
  contract: Scalars['String'];
  tokenId: Scalars['String'];
  includeOwner?: InputMaybe<Scalars['Boolean']>;
  includeOwnerProfile?: InputMaybe<Scalars['Boolean']>;
  includeOwnerReverseProfile?: InputMaybe<Scalars['Boolean']>;
  includeTokenUri?: InputMaybe<Scalars['Boolean']>;
  includeTokenMint?: InputMaybe<Scalars['Boolean']>;
  includeTokenMedia?: InputMaybe<Scalars['Boolean']>;
  includeTransactionLogs?: InputMaybe<Scalars['Boolean']>;
  includeTokenSales?: InputMaybe<Scalars['Boolean']>;
  includeTokenSalesMaker?: InputMaybe<Scalars['Boolean']>;
  includeTokenSalesTaker?: InputMaybe<Scalars['Boolean']>;
  includeTokenSalesMakerReverseProfile?: InputMaybe<Scalars['Boolean']>;
  includeTokenSalesTakerReverseProfile?: InputMaybe<Scalars['Boolean']>;
  includeTransactionRecipient?: InputMaybe<Scalars['Boolean']>;
  includeTransactionSender?: InputMaybe<Scalars['Boolean']>;
}>;


export type TokenQuery = { token: { tokenUri?: any | null, contract: string, description: string | null, name: string | null, tokenId: string, externalUrl: string | null, imageStorageType: TokenStorageType | null, backgroundColor: string | null, youtubeUrl: string | null, mintPrice: any, sales?: Array<{ eventIndex: number, logIndex: number, marketplace: Marketplace, price: any, maker?: { address: any, reverseProfile?: { name: string, avatar: string | null } | null }, taker?: { address: any, reverseProfile?: { name: string, avatar: string | null } | null }, currencyContract: { address: any } | null, marketplaceContract: { address: any } }> | null, owner: { address: any, profile?: { name: string, avatar: string | null } | null, reverseProfile?: { name: string, avatar: string | null } | null } | null, animation: { blurhash: string | null, checksum: string, height: number | null, width: number | null, url: string | null, smallUrl: string | null, thumbnailUrl: string | null, largeUrl: string | null, mimeType: string | null } | null, image: { blurhash: string | null, checksum: string, height: number | null, width: number | null, url: string | null, smallUrl: string | null, thumbnailUrl: string | null, largeUrl: string | null, mimeType: string | null } | null, mintTransaction: { blockNumber: number, blockTimestamp: any, effectiveGasPrice: any, gas: number, gasPaid: any, gasUsed: number, gasPrice: any, hash: string, id: string, index: number, input: string | null, value: any, methodId: string | null, status: boolean, events: Array<{ transactionHash: string } | { transactionHash: string }>, from?: { address: any, reverseProfile: { name: string, avatar: string | null } | null }, to?: { address: any, reverseProfile: { name: string, avatar: string | null } | null } | null, logs?: Array<{ data: string, logIndex: number, removed: boolean, topics: Array<string> }> } | null } | null };

export type TokensQueryVariables = Exact<{
  filter: InputMaybe<TokensFilter>;
  limit?: InputMaybe<Scalars['Int']>;
  after: InputMaybe<Scalars['String']>;
  includeTotalCount?: InputMaybe<Scalars['Boolean']>;
  includeOwner?: InputMaybe<Scalars['Boolean']>;
  includeOwnerProfile?: InputMaybe<Scalars['Boolean']>;
  includeOwnerReverseProfile?: InputMaybe<Scalars['Boolean']>;
  includeTokenUri?: InputMaybe<Scalars['Boolean']>;
  includeTokenMint?: InputMaybe<Scalars['Boolean']>;
  includeTokenMedia?: InputMaybe<Scalars['Boolean']>;
  includeTransactionLogs?: InputMaybe<Scalars['Boolean']>;
  includeTransactionSender?: InputMaybe<Scalars['Boolean']>;
  includeTransactionRecipient?: InputMaybe<Scalars['Boolean']>;
  includeTokenSales?: InputMaybe<Scalars['Boolean']>;
  includeTokenSalesMaker?: InputMaybe<Scalars['Boolean']>;
  includeTokenSalesTaker?: InputMaybe<Scalars['Boolean']>;
  includeTokenSalesMakerReverseProfile?: InputMaybe<Scalars['Boolean']>;
  includeTokenSalesTakerReverseProfile?: InputMaybe<Scalars['Boolean']>;
}>;


export type TokensQuery = { tokens: { totalCount?: number, cursors: { after: string | null }, tokens: Array<{ tokenUri?: any | null, contract: string, description: string | null, name: string | null, tokenId: string, externalUrl: string | null, imageStorageType: TokenStorageType | null, backgroundColor: string | null, youtubeUrl: string | null, mintPrice: any, sales?: Array<{ eventIndex: number, logIndex: number, marketplace: Marketplace, price: any, maker?: { address: any, reverseProfile?: { name: string, avatar: string | null } | null }, taker?: { address: any, reverseProfile?: { name: string, avatar: string | null } | null }, currencyContract: { address: any } | null, marketplaceContract: { address: any } }> | null, owner: { address: any, profile?: { name: string, avatar: string | null } | null, reverseProfile?: { name: string, avatar: string | null } | null } | null, animation: { blurhash: string | null, checksum: string, height: number | null, width: number | null, url: string | null, smallUrl: string | null, thumbnailUrl: string | null, largeUrl: string | null, mimeType: string | null } | null, image: { blurhash: string | null, checksum: string, height: number | null, width: number | null, url: string | null, smallUrl: string | null, thumbnailUrl: string | null, largeUrl: string | null, mimeType: string | null } | null, mintTransaction: { blockNumber: number, blockTimestamp: any, effectiveGasPrice: any, gas: number, gasPaid: any, gasUsed: number, gasPrice: any, hash: string, id: string, index: number, input: string | null, value: any, methodId: string | null, status: boolean, events: Array<{ transactionHash: string } | { transactionHash: string }>, from?: { address: any, reverseProfile: { name: string, avatar: string | null } | null }, to?: { address: any, reverseProfile: { name: string, avatar: string | null } | null } | null, logs?: Array<{ data: string, logIndex: number, removed: boolean, topics: Array<string> }> } | null }> } };

export type TransactionQueryVariables = Exact<{
  hash: Scalars['String'];
  includeTransactionLogs?: InputMaybe<Scalars['Boolean']>;
  includeTransactionRecipient?: InputMaybe<Scalars['Boolean']>;
  includeTransactionSender?: InputMaybe<Scalars['Boolean']>;
}>;


export type TransactionQuery = { transaction: { blockNumber: number, blockTimestamp: any, effectiveGasPrice: any, gas: number, gasPaid: any, gasUsed: number, gasPrice: any, hash: string, id: string, index: number, input: string | null, value: any, methodId: string | null, status: boolean, events: Array<{ transactionHash: string } | { transactionHash: string }>, from?: { address: any, reverseProfile: { name: string, avatar: string | null } | null }, to?: { address: any, reverseProfile: { name: string, avatar: string | null } | null } | null, logs?: Array<{ data: string, logIndex: number, removed: boolean, topics: Array<string> }> } | null };

export type TransactionsQueryVariables = Exact<{
  filter: InputMaybe<TransactionFilter>;
  after: InputMaybe<Scalars['String']>;
  limit?: InputMaybe<Scalars['Int']>;
  reversed?: InputMaybe<Scalars['Boolean']>;
  includeTotalCount?: InputMaybe<Scalars['Boolean']>;
  includeTransactionRecipient?: InputMaybe<Scalars['Boolean']>;
  includeTransactionSender?: InputMaybe<Scalars['Boolean']>;
  includeTransactionLogs?: InputMaybe<Scalars['Boolean']>;
}>;


export type TransactionsQuery = { transactions: { totalCount?: number, cursors: { after: string | null }, transactions: Array<{ blockNumber: number, blockTimestamp: any, effectiveGasPrice: any, gas: number, gasPaid: any, gasUsed: number, gasPrice: any, hash: string, id: string, index: number, input: string | null, value: any, methodId: string | null, status: boolean, events: Array<{ transactionHash: string } | { transactionHash: string }>, from?: { address: any, reverseProfile: { name: string, avatar: string | null } | null }, to?: { address: any, reverseProfile: { name: string, avatar: string | null } | null } | null, logs?: Array<{ data: string, logIndex: number, removed: boolean, topics: Array<string> }> }> } | null };

export type TransactionLogsQueryVariables = Exact<{
  after: InputMaybe<Scalars['String']>;
  includeTotalCount?: InputMaybe<Scalars['Boolean']>;
  filter: InputMaybe<TransactionLogFilter>;
  limit?: InputMaybe<Scalars['Int']>;
  reversed?: InputMaybe<Scalars['Boolean']>;
  includeTransactionRecipient?: InputMaybe<Scalars['Boolean']>;
  includeTransactionSender?: InputMaybe<Scalars['Boolean']>;
  includeTransactionLogs?: InputMaybe<Scalars['Boolean']>;
  includeContractReverseProfile?: InputMaybe<Scalars['Boolean']>;
  includeTransaction?: InputMaybe<Scalars['Boolean']>;
}>;


export type TransactionLogsQuery = { transactionLogs: { totalCount?: number, cursors: { after: string | null }, transactionLogs: Array<{ data: string, logIndex: number, removed: boolean, topics: Array<string>, transactionHash: string, blockNumber: number, address: { address: any, reverseProfile?: { name: string, avatar: string | null } | null }, transaction?: { blockNumber: number, blockTimestamp: any, effectiveGasPrice: any, gas: number, gasPaid: any, gasUsed: number, gasPrice: any, hash: string, id: string, index: number, input: string | null, value: any, methodId: string | null, status: boolean, events: Array<{ transactionHash: string } | { transactionHash: string }>, from?: { address: any, reverseProfile: { name: string, avatar: string | null } | null }, to?: { address: any, reverseProfile: { name: string, avatar: string | null } | null } | null, logs?: Array<{ data: string, logIndex: number, removed: boolean, topics: Array<string> }> } }> } | null };

export type Erc721TransfersQueryVariables = Exact<{
  filter: InputMaybe<TransfersFilter>;
  after: InputMaybe<Scalars['String']>;
  limit?: InputMaybe<Scalars['Int']>;
  includeTotalCount?: InputMaybe<Scalars['Boolean']>;
  includeTokenSalesMaker?: InputMaybe<Scalars['Boolean']>;
  includeTokenSalesTaker?: InputMaybe<Scalars['Boolean']>;
  includeTokenSalesMakerReverseProfile?: InputMaybe<Scalars['Boolean']>;
  includeTokenSalesTakerReverseProfile?: InputMaybe<Scalars['Boolean']>;
  includeTransactionLogs?: InputMaybe<Scalars['Boolean']>;
  includeTransactionRecipient?: InputMaybe<Scalars['Boolean']>;
  includeTransactionSender?: InputMaybe<Scalars['Boolean']>;
  includeToken?: InputMaybe<Scalars['Boolean']>;
  includeTokenMedia?: InputMaybe<Scalars['Boolean']>;
  includeTokenMint?: InputMaybe<Scalars['Boolean']>;
  includeTokenUri?: InputMaybe<Scalars['Boolean']>;
  includeTokenSales?: InputMaybe<Scalars['Boolean']>;
  includeTransferContract?: InputMaybe<Scalars['Boolean']>;
  includeTransferContractReverseProfile?: InputMaybe<Scalars['Boolean']>;
  includeSale?: InputMaybe<Scalars['Boolean']>;
  includeErc721TransferSaleTaker?: InputMaybe<Scalars['Boolean']>;
  includeErc721TransferSaleMaker?: InputMaybe<Scalars['Boolean']>;
  includeErc721TransferSaleMakerReverseProfile?: InputMaybe<Scalars['Boolean']>;
  includeErc721TransferSaleTakerReverseProfile?: InputMaybe<Scalars['Boolean']>;
  includeTransaction?: InputMaybe<Scalars['Boolean']>;
  includeTransferSender?: InputMaybe<Scalars['Boolean']>;
  includeTransferSenderReverseProfile?: InputMaybe<Scalars['Boolean']>;
  includeTransferRecipient?: InputMaybe<Scalars['Boolean']>;
  includeTransferRecipientReverseProfile?: InputMaybe<Scalars['Boolean']>;
}>;


export type Erc721TransfersQuery = { erc721Transfers: { totalCount?: number, cursors: { after: string | null }, erc721Transfers: Array<{ blockNumber: number, isAirdrop: boolean, logIndex: number, contract?: { address: any, reverseProfile?: { name: string, avatar: string | null } | null }, sale?: { eventIndex: number, logIndex: number, marketplace: Marketplace, price: any, maker?: { address: any, reverseProfile?: { name: string, avatar: string | null } | null }, taker?: { address: any, reverseProfile?: { name: string, avatar: string | null } | null }, currencyContract: { address: any } | null, marketplaceContract: { address: any } } | null, transaction?: { blockNumber: number, blockTimestamp: any, effectiveGasPrice: any, gas: number, gasPaid: any, gasUsed: number, gasPrice: any, hash: string, id: string, index: number, input: string | null, value: any, methodId: string | null, status: boolean, events: Array<{ transactionHash: string } | { transactionHash: string }>, from?: { address: any, reverseProfile: { name: string, avatar: string | null } | null }, to?: { address: any, reverseProfile: { name: string, avatar: string | null } | null } | null, logs?: Array<{ data: string, logIndex: number, removed: boolean, topics: Array<string> }> }, from?: { address: any, reverseProfile?: { name: string, avatar: string | null } | null }, to?: { address: any, reverseProfile?: { name: string, avatar: string | null } | null } | null, token?: { tokenUri?: any | null, contract: string, description: string | null, name: string | null, tokenId: string, externalUrl: string | null, imageStorageType: TokenStorageType | null, backgroundColor: string | null, youtubeUrl: string | null, mintPrice: any, sales?: Array<{ eventIndex: number, logIndex: number, marketplace: Marketplace, price: any, maker?: { address: any, reverseProfile?: { name: string, avatar: string | null } | null }, taker?: { address: any, reverseProfile?: { name: string, avatar: string | null } | null }, currencyContract: { address: any } | null, marketplaceContract: { address: any } }> | null, animation: { blurhash: string | null, checksum: string, height: number | null, width: number | null, url: string | null, smallUrl: string | null, thumbnailUrl: string | null, largeUrl: string | null, mimeType: string | null } | null, image: { blurhash: string | null, checksum: string, height: number | null, width: number | null, url: string | null, smallUrl: string | null, thumbnailUrl: string | null, largeUrl: string | null, mimeType: string | null } | null, mintTransaction: { blockNumber: number, blockTimestamp: any, effectiveGasPrice: any, gas: number, gasPaid: any, gasUsed: number, gasPrice: any, hash: string, id: string, index: number, input: string | null, value: any, methodId: string | null, status: boolean, events: Array<{ transactionHash: string } | { transactionHash: string }>, from?: { address: any, reverseProfile: { name: string, avatar: string | null } | null }, to?: { address: any, reverseProfile: { name: string, avatar: string | null } | null } | null, logs?: Array<{ data: string, logIndex: number, removed: boolean, topics: Array<string> }> } | null } }> } };

export type NonFungibleTokenMintInfoFragment = { mintPrice: any, mintTransaction: { blockNumber: number, blockTimestamp: any, effectiveGasPrice: any, gas: number, gasPaid: any, gasUsed: number, gasPrice: any, hash: string, id: string, index: number, input: string | null, value: any, methodId: string | null, status: boolean, events: Array<{ transactionHash: string } | { transactionHash: string }>, from?: { address: any, reverseProfile: { name: string, avatar: string | null } | null }, to?: { address: any, reverseProfile: { name: string, avatar: string | null } | null } | null, logs?: Array<{ data: string, logIndex: number, removed: boolean, topics: Array<string> }> } | null };

export type TransactionInfoFragment = { blockNumber: number, blockTimestamp: any, effectiveGasPrice: any, gas: number, gasPaid: any, gasUsed: number, gasPrice: any, hash: string, id: string, index: number, input: string | null, value: any, methodId: string | null, status: boolean, events: Array<{ transactionHash: string } | { transactionHash: string }>, from?: { address: any, reverseProfile: { name: string, avatar: string | null } | null }, to?: { address: any, reverseProfile: { name: string, avatar: string | null } | null } | null, logs?: Array<{ data: string, logIndex: number, removed: boolean, topics: Array<string> }> };

export type NonFungibleTokenSaleInfoBaseFragment = { eventIndex: number, logIndex: number, marketplace: Marketplace, price: any, currencyContract: { address: any } | null, marketplaceContract: { address: any } };

export type NonFungibleTokenSalesInfoFragment = { eventIndex: number, logIndex: number, marketplace: Marketplace, price: any, maker?: { address: any, reverseProfile?: { name: string, avatar: string | null } | null }, taker?: { address: any, reverseProfile?: { name: string, avatar: string | null } | null }, currencyContract: { address: any } | null, marketplaceContract: { address: any } };

export type NonFungibleErc721TransferSaleInfoFragment = { eventIndex: number, logIndex: number, marketplace: Marketplace, price: any, maker?: { address: any, reverseProfile?: { name: string, avatar: string | null } | null }, taker?: { address: any, reverseProfile?: { name: string, avatar: string | null } | null }, currencyContract: { address: any } | null, marketplaceContract: { address: any } };

export type NonFungibleTokenOwnerInfoFragment = { owner: { address: any, profile?: { name: string, avatar: string | null } | null, reverseProfile?: { name: string, avatar: string | null } | null } | null };

export type NonFungibleTokenMediaInfoFragment = { imageStorageType: TokenStorageType | null, backgroundColor: string | null, youtubeUrl: string | null, animation: { blurhash: string | null, checksum: string, height: number | null, width: number | null, url: string | null, smallUrl: string | null, thumbnailUrl: string | null, largeUrl: string | null, mimeType: string | null } | null, image: { blurhash: string | null, checksum: string, height: number | null, width: number | null, url: string | null, smallUrl: string | null, thumbnailUrl: string | null, largeUrl: string | null, mimeType: string | null } | null };

export type NonFungibleTokenInfoFragment = { contract: string, description: string | null, name: string | null, tokenId: string, externalUrl: string | null };

export type MediaInfoFragment = { blurhash: string | null, checksum: string, height: number | null, width: number | null, url: string | null, smallUrl: string | null, thumbnailUrl: string | null, largeUrl: string | null, mimeType: string | null };

export type GlobalKeysFragment = { name: string, avatar: string | null };
