import { GraphQLClient } from "graphql-request";
import * as Dom from "graphql-request/dist/types.dom";
import gql from "graphql-tag";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /**
   * The `Naive DateTime` scalar type represents a naive date and time without
   * timezone. The DateTime appears in a JSON response as an ISO8601 formatted
   * string.
   */
  NaiveDateTime: any;
};

export type TokenMetadataAttribute = {
  __typename?: "TokenMetadataAttribute";
  traitType?: Maybe<Scalars["String"]>;
  value?: Maybe<Scalars["String"]>;
  displayType?: Maybe<Scalars["String"]>;
};

export type RootSubscriptionType = {
  __typename?: "RootSubscriptionType";
  eip721Transfer?: Maybe<Transfer>;
};

export enum ThumbnailSize {
  Original = "ORIGINAL",
}

export type TransfersFilter = {
  contractAddress?: InputMaybe<Scalars["String"]>;
};

export type Address = {
  __typename?: "Address";
  address: Scalars["String"];
  reverseProfile?: Maybe<Profile>;
  profile?: Maybe<Profile>;
  tokens?: Maybe<Array<Maybe<TokenMetadata>>>;
};

export type AddressTokensArgs = {
  limit?: InputMaybe<Scalars["Int"]>;
  filter?: InputMaybe<AddressTokensFilter>;
};

export type TokenTransfer = {
  __typename?: "TokenTransfer";
  id?: Maybe<Scalars["Int"]>;
  hash?: Maybe<Scalars["String"]>;
  token?: Maybe<Scalars["String"]>;
  from?: Maybe<Address>;
  to?: Maybe<Address>;
  fromAddress?: Maybe<Scalars["String"]>;
  toAddress?: Maybe<Scalars["String"]>;
  toAddressDisplay?: Maybe<Scalars["String"]>;
  erc721Metadata?: Maybe<TokenMetadata>;
  blockTimestamp?: Maybe<Scalars["NaiveDateTime"]>;
};

export type TokensFilter = {
  contractAddress?: InputMaybe<Scalars["String"]>;
};

export type RootQueryType = {
  __typename?: "RootQueryType";
  ping?: Maybe<Scalars["String"]>;
  feed: Array<TokenTransfer>;
  token: TokenMetadata;
  tokens?: Maybe<TokensPage>;
  tokenTransfers?: Maybe<TokenTransfersPage>;
  address: Address;
};

export type RootQueryTypeFeedArgs = {
  addresses: Array<Scalars["String"]>;
};

export type RootQueryTypeTokenArgs = {
  contract: Scalars["String"];
  tokenId?: InputMaybe<Scalars["String"]>;
  id?: InputMaybe<Scalars["Int"]>;
};

export type RootQueryTypeTokensArgs = {
  limit?: InputMaybe<Scalars["Int"]>;
  cursor?: InputMaybe<Scalars["String"]>;
  filter: TokensFilter;
};

export type RootQueryTypeTokenTransfersArgs = {
  limit?: InputMaybe<Scalars["Int"]>;
  cursor?: InputMaybe<Scalars["String"]>;
  filter: TransfersFilter;
};

export type RootQueryTypeAddressArgs = {
  name: Scalars["String"];
};

export type AddressTokensFilter = {
  filterSuspectedScams?: InputMaybe<Scalars["Boolean"]>;
};

export type Transfer = {
  __typename?: "Transfer";
  from?: Maybe<Scalars["String"]>;
  to?: Maybe<Scalars["String"]>;
  token?: Maybe<TokenMetadata>;
};

export type Profile = {
  __typename?: "Profile";
  name: Scalars["String"];
  avatar?: Maybe<Scalars["String"]>;
  email?: Maybe<Scalars["String"]>;
  text?: Maybe<Scalars["String"]>;
};

export type ProfileTextArgs = {
  key: Scalars["String"];
};

export type TokenMetadata = {
  __typename?: "TokenMetadata";
  id?: Maybe<Scalars["Int"]>;
  contractAddress?: Maybe<Scalars["String"]>;
  tokenId?: Maybe<Scalars["String"]>;
  name?: Maybe<Scalars["String"]>;
  displayName?: Maybe<Scalars["String"]>;
  description?: Maybe<Scalars["String"]>;
  originalImageUrl?: Maybe<Scalars["String"]>;
  imageUrl?: Maybe<Scalars["String"]>;
  thumbnailUrl?: Maybe<Scalars["String"]>;
  type?: Maybe<Scalars["String"]>;
  ownerAddress?: Maybe<Address>;
  mintedAt?: Maybe<Scalars["NaiveDateTime"]>;
  attributes?: Maybe<Array<TokenMetadataAttribute>>;
};

export type TokenMetadataThumbnailUrlArgs = {
  size?: InputMaybe<ThumbnailSize>;
};

export type RootMutationType = {
  __typename?: "RootMutationType";
  tokenMetadataRefresh?: Maybe<TokenMetadata>;
  tokenMetadataRefreshCollection?: Maybe<Scalars["Boolean"]>;
};

export type RootMutationTypeTokenMetadataRefreshArgs = {
  contract: Scalars["String"];
  tokenId?: InputMaybe<Scalars["String"]>;
  id?: InputMaybe<Scalars["Int"]>;
};

export type RootMutationTypeTokenMetadataRefreshCollectionArgs = {
  contract: Scalars["String"];
  key: Scalars["String"];
  emptyOnly?: InputMaybe<Scalars["Boolean"]>;
};

export type TokensPage = {
  __typename?: "TokensPage";
  tokens?: Maybe<Array<TokenMetadata>>;
  nextCursor?: Maybe<Scalars["String"]>;
};

export type TokenTransfersPage = {
  __typename?: "TokenTransfersPage";
  tokenTransfers?: Maybe<Array<TokenTransfer>>;
  nextCursor?: Maybe<Scalars["String"]>;
};

export const GlobalKeysFragmentDoc = gql`
  fragment GlobalKeys on Profile {
    avatar: text(key: "avatar")
    description: text(key: "description")
    display: text(key: "display")
    email: text(key: "email")
    keywords: text(key: "keywords")
    mail: text(key: "mail")
    notice: text(key: "notice")
    location: text(key: "location")
    phone: text(key: "phone")
    url: text(key: "url")
  }
`;
export const CommonServiceKeysFragmentDoc = gql`
  fragment CommonServiceKeys on Profile {
    github: text(key: "com.github")
    peepeth: text(key: "com.peepeth")
    linkedin: text(key: "com.linkedin")
    twitter: text(key: "com.twitter")
    keybase: text(key: "io.keybase")
    telegram: text(key: "org.telegram")
  }
`;
export const AddressDocument = gql`
  query address(
    $name: String!
    $includeGlobalKeys: Boolean = false
    $includeCommonServiceKeys: Boolean = false
  ) {
    address(name: $name) {
      address
      profile {
        ...GlobalKeys @include(if: $includeGlobalKeys)
        ...CommonServiceKeys @include(if: $includeCommonServiceKeys)
      }
      reverseProfile {
        ...GlobalKeys @include(if: $includeGlobalKeys)
        ...CommonServiceKeys @include(if: $includeCommonServiceKeys)
      }
      tokens {
        attributes {
          displayType
          traitType
          value
        }
        contractAddress
        description
        displayName
        id
        imageUrl
        mintedAt
        name
        originalImageUrl
        thumbnailUrl
      }
    }
  }
  ${GlobalKeysFragmentDoc}
  ${CommonServiceKeysFragmentDoc}
`;

export type SdkFunctionWrapper = <T>(
  action: (requestHeaders?: Record<string, string>) => Promise<T>,
  operationName: string,
  operationType?: string
) => Promise<T>;

const defaultWrapper: SdkFunctionWrapper = (
  action,
  _operationName,
  _operationType
) => action();

export function getSdk(
  client: GraphQLClient,
  withWrapper: SdkFunctionWrapper = defaultWrapper
) {
  return {
    address(
      variables: AddressQueryVariables,
      requestHeaders?: Dom.RequestInit["headers"]
    ): Promise<AddressQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<AddressQuery>(AddressDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        "address",
        "query"
      );
    },
  };
}
export type Sdk = ReturnType<typeof getSdk>;
export type AddressQueryVariables = Exact<{
  name: Scalars["String"];
  includeGlobalKeys?: InputMaybe<Scalars["Boolean"]>;
  includeCommonServiceKeys?: InputMaybe<Scalars["Boolean"]>;
}>;

export type AddressQuery = {
  __typename?: "RootQueryType";
  address: {
    __typename?: "Address";
    address: string;
    profile?: {
      __typename?: "Profile";
      avatar?: string | null;
      description?: string | null;
      display?: string | null;
      email?: string | null;
      keywords?: string | null;
      mail?: string | null;
      notice?: string | null;
      location?: string | null;
      phone?: string | null;
      url?: string | null;
      github?: string | null;
      peepeth?: string | null;
      linkedin?: string | null;
      twitter?: string | null;
      keybase?: string | null;
      telegram?: string | null;
    } | null;
    reverseProfile?: {
      __typename?: "Profile";
      avatar?: string | null;
      description?: string | null;
      display?: string | null;
      email?: string | null;
      keywords?: string | null;
      mail?: string | null;
      notice?: string | null;
      location?: string | null;
      phone?: string | null;
      url?: string | null;
      github?: string | null;
      peepeth?: string | null;
      linkedin?: string | null;
      twitter?: string | null;
      keybase?: string | null;
      telegram?: string | null;
    } | null;
    tokens?: Array<{
      __typename?: "TokenMetadata";
      contractAddress?: string | null;
      description?: string | null;
      displayName?: string | null;
      id?: number | null;
      imageUrl?: string | null;
      mintedAt?: any | null;
      name?: string | null;
      originalImageUrl?: string | null;
      thumbnailUrl?: string | null;
      attributes?: Array<{
        __typename?: "TokenMetadataAttribute";
        displayType?: string | null;
        traitType?: string | null;
        value?: string | null;
      }> | null;
    } | null> | null;
  };
};

export type GlobalKeysFragment = {
  __typename?: "Profile";
  avatar?: string | null;
  description?: string | null;
  display?: string | null;
  email?: string | null;
  keywords?: string | null;
  mail?: string | null;
  notice?: string | null;
  location?: string | null;
  phone?: string | null;
  url?: string | null;
};

export type CommonServiceKeysFragment = {
  __typename?: "Profile";
  github?: string | null;
  peepeth?: string | null;
  linkedin?: string | null;
  twitter?: string | null;
  keybase?: string | null;
  telegram?: string | null;
};
