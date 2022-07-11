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
  NaiveDateTime: any;
};

export type Address = {
  __typename?: 'Address';
  address: Scalars['String'];
  profile?: Maybe<Profile>;
  reverseProfile?: Maybe<Profile>;
  tokens?: Maybe<Array<Maybe<TokenMetadata>>>;
};


export type AddressTokensArgs = {
  filter?: InputMaybe<AddressTokensFilter>;
  limit?: InputMaybe<Scalars['Int']>;
};

export type AddressTokensFilter = {
  filterSuspectedScams?: InputMaybe<Scalars['Boolean']>;
};

export type Profile = {
  __typename?: 'Profile';
  avatar?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  text?: Maybe<Scalars['String']>;
};


export type ProfileTextArgs = {
  key: Scalars['String'];
};

export type RootMutationType = {
  __typename?: 'RootMutationType';
  followCreate?: Maybe<Array<Maybe<Scalars['String']>>>;
  followDelete?: Maybe<Scalars['Boolean']>;
  followSync?: Maybe<Array<Maybe<Scalars['String']>>>;
  tokenMetadataRefresh?: Maybe<TokenMetadata>;
  tokenMetadataRefreshCollection?: Maybe<Scalars['Boolean']>;
};


export type RootMutationTypeFollowCreateArgs = {
  key: Scalars['String'];
  name: Scalars['String'];
};


export type RootMutationTypeFollowDeleteArgs = {
  key: Scalars['String'];
  name: Scalars['String'];
};


export type RootMutationTypeFollowSyncArgs = {
  key: Scalars['String'];
  names: Array<Scalars['String']>;
};


export type RootMutationTypeTokenMetadataRefreshArgs = {
  contract: Scalars['String'];
  id?: InputMaybe<Scalars['Int']>;
  tokenId?: InputMaybe<Scalars['String']>;
};


export type RootMutationTypeTokenMetadataRefreshCollectionArgs = {
  contract: Scalars['String'];
  emptyOnly?: InputMaybe<Scalars['Boolean']>;
  key: Scalars['String'];
};

export type RootQueryType = {
  __typename?: 'RootQueryType';
  address: Address;
  feed: Array<TokenTransfer>;
  ping?: Maybe<Scalars['String']>;
  token: TokenMetadata;
  tokenTransfers?: Maybe<TokenTransfersPage>;
  tokens?: Maybe<TokensPage>;
};


export type RootQueryTypeAddressArgs = {
  name: Scalars['String'];
};


export type RootQueryTypeFeedArgs = {
  addresses: Array<Scalars['String']>;
};


export type RootQueryTypeTokenArgs = {
  contract: Scalars['String'];
  id?: InputMaybe<Scalars['Int']>;
  tokenId?: InputMaybe<Scalars['String']>;
};


export type RootQueryTypeTokenTransfersArgs = {
  cursor?: InputMaybe<Scalars['String']>;
  filter: TransfersFilter;
  limit?: InputMaybe<Scalars['Int']>;
};


export type RootQueryTypeTokensArgs = {
  cursor?: InputMaybe<Scalars['String']>;
  filter: TokensFilter;
  limit?: InputMaybe<Scalars['Int']>;
};

export type RootSubscriptionType = {
  __typename?: 'RootSubscriptionType';
  eip721Transfer?: Maybe<Transfer>;
};

export enum ThumbnailSize {
  Original = 'ORIGINAL'
}

export type TokenMetadata = {
  __typename?: 'TokenMetadata';
  attributes?: Maybe<Array<TokenMetadataAttribute>>;
  contractAddress?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  displayName?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  imageUrl?: Maybe<Scalars['String']>;
  mintedAt?: Maybe<Scalars['NaiveDateTime']>;
  name?: Maybe<Scalars['String']>;
  originalImageUrl?: Maybe<Scalars['String']>;
  ownerAddress?: Maybe<Address>;
  thumbnailUrl?: Maybe<Scalars['String']>;
  tokenId?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
};


export type TokenMetadataThumbnailUrlArgs = {
  size?: InputMaybe<ThumbnailSize>;
};

export type TokenMetadataAttribute = {
  __typename?: 'TokenMetadataAttribute';
  displayType?: Maybe<Scalars['String']>;
  traitType?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
};

export type TokenTransfer = {
  __typename?: 'TokenTransfer';
  blockTimestamp?: Maybe<Scalars['NaiveDateTime']>;
  erc721Metadata?: Maybe<TokenMetadata>;
  from?: Maybe<Address>;
  fromAddress?: Maybe<Scalars['String']>;
  hash?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  to?: Maybe<Address>;
  toAddress?: Maybe<Scalars['String']>;
  toAddressDisplay?: Maybe<Scalars['String']>;
  token?: Maybe<Scalars['String']>;
};

export type TokenTransfersPage = {
  __typename?: 'TokenTransfersPage';
  nextCursor?: Maybe<Scalars['String']>;
  tokenTransfers?: Maybe<Array<TokenTransfer>>;
};

export type TokensFilter = {
  contractAddress?: InputMaybe<Scalars['String']>;
};

export type TokensPage = {
  __typename?: 'TokensPage';
  nextCursor?: Maybe<Scalars['String']>;
  tokens?: Maybe<Array<TokenMetadata>>;
};

export type Transfer = {
  __typename?: 'Transfer';
  from?: Maybe<Scalars['String']>;
  to?: Maybe<Scalars['String']>;
  token?: Maybe<TokenMetadata>;
};

export type TransfersFilter = {
  contractAddress?: InputMaybe<Scalars['String']>;
};
