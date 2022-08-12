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

export type Address = {
  __typename?: "Address";
  address: Scalars["String"];
  profile?: Maybe<Profile>;
  reverseProfile?: Maybe<Profile>;
  tokens?: Maybe<Array<Maybe<TokenMetadata>>>;
};

export type AddressTokensArgs = {
  filter?: InputMaybe<AddressTokensFilter>;
  limit?: InputMaybe<Scalars["Int"]>;
};

export type AddressTokensFilter = {
  filterSuspectedScams?: InputMaybe<Scalars["Boolean"]>;
};

export type Profile = {
  __typename?: "Profile";
  avatar?: Maybe<Scalars["String"]>;
  email?: Maybe<Scalars["String"]>;
  name: Scalars["String"];
  text?: Maybe<Scalars["String"]>;
};

export type ProfileTextArgs = {
  key: Scalars["String"];
};

export type RootMutationType = {
  __typename?: "RootMutationType";
  tokenMetadataRefresh?: Maybe<TokenMetadata>;
  tokenMetadataRefreshCollection?: Maybe<Scalars["Boolean"]>;
};

export type RootMutationTypeTokenMetadataRefreshArgs = {
  contract: Scalars["String"];
  id?: InputMaybe<Scalars["Int"]>;
  tokenId?: InputMaybe<Scalars["String"]>;
};

export type RootMutationTypeTokenMetadataRefreshCollectionArgs = {
  contract: Scalars["String"];
  emptyOnly?: InputMaybe<Scalars["Boolean"]>;
  key: Scalars["String"];
};

export type RootQueryType = {
  __typename?: "RootQueryType";
  address: Address;
  feed: Array<TokenTransfer>;
  ping?: Maybe<Scalars["String"]>;
  token: TokenMetadata;
  tokenTransfers?: Maybe<TokenTransfersPage>;
  tokens?: Maybe<TokensPage>;
};

export type RootQueryTypeAddressArgs = {
  name: Scalars["String"];
};

export type RootQueryTypeFeedArgs = {
  addresses: Array<Scalars["String"]>;
};

export type RootQueryTypeTokenArgs = {
  contract: Scalars["String"];
  id?: InputMaybe<Scalars["Int"]>;
  tokenId?: InputMaybe<Scalars["String"]>;
};

export type RootQueryTypeTokenTransfersArgs = {
  cursor?: InputMaybe<Scalars["String"]>;
  filter: TransfersFilter;
  limit?: InputMaybe<Scalars["Int"]>;
};

export type RootQueryTypeTokensArgs = {
  cursor?: InputMaybe<Scalars["String"]>;
  filter: TokensFilter;
  limit?: InputMaybe<Scalars["Int"]>;
};

export type RootSubscriptionType = {
  __typename?: "RootSubscriptionType";
  eip721Transfer?: Maybe<Transfer>;
};

export enum ThumbnailSize {
  Original = "ORIGINAL",
}

export type TokenMetadata = {
  __typename?: "TokenMetadata";
  attributes?: Maybe<Array<TokenMetadataAttribute>>;
  contractAddress?: Maybe<Scalars["String"]>;
  description?: Maybe<Scalars["String"]>;
  displayName?: Maybe<Scalars["String"]>;
  id?: Maybe<Scalars["Int"]>;
  imageUrl?: Maybe<Scalars["String"]>;
  mintedAt?: Maybe<Scalars["NaiveDateTime"]>;
  name?: Maybe<Scalars["String"]>;
  originalImageUrl?: Maybe<Scalars["String"]>;
  ownerAddress?: Maybe<Address>;
  thumbnailUrl?: Maybe<Scalars["String"]>;
  tokenId?: Maybe<Scalars["String"]>;
  type?: Maybe<Scalars["String"]>;
};

export type TokenMetadataThumbnailUrlArgs = {
  size?: InputMaybe<ThumbnailSize>;
};

export type TokenMetadataAttribute = {
  __typename?: "TokenMetadataAttribute";
  displayType?: Maybe<Scalars["String"]>;
  traitType?: Maybe<Scalars["String"]>;
  value?: Maybe<Scalars["String"]>;
};

export type TokenTransfer = {
  __typename?: "TokenTransfer";
  blockTimestamp?: Maybe<Scalars["NaiveDateTime"]>;
  erc721Metadata?: Maybe<TokenMetadata>;
  from?: Maybe<Address>;
  fromAddress?: Maybe<Scalars["String"]>;
  hash?: Maybe<Scalars["String"]>;
  id?: Maybe<Scalars["Int"]>;
  to?: Maybe<Address>;
  toAddress?: Maybe<Scalars["String"]>;
  toAddressDisplay?: Maybe<Scalars["String"]>;
  token?: Maybe<Scalars["String"]>;
};

export type TokenTransfersPage = {
  __typename?: "TokenTransfersPage";
  nextCursor?: Maybe<Scalars["String"]>;
  tokenTransfers?: Maybe<Array<TokenTransfer>>;
};

export type TokensFilter = {
  contractAddress?: InputMaybe<Scalars["String"]>;
};

export type TokensPage = {
  __typename?: "TokensPage";
  nextCursor?: Maybe<Scalars["String"]>;
  tokens?: Maybe<Array<TokenMetadata>>;
};

export type Transfer = {
  __typename?: "Transfer";
  from?: Maybe<Scalars["String"]>;
  to?: Maybe<Scalars["String"]>;
  token?: Maybe<TokenMetadata>;
};

export type TransfersFilter = {
  contractAddress?: InputMaybe<Scalars["String"]>;
};

export const GlobalKeysFragmentDoc = gql`
  fragment GlobalKeys on Profile {
    name
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
export const TokenOwnerInfoFragmentDoc = gql`
  fragment TokenOwnerInfo on TokenMetadata {
    ownerAddress {
      address
      profile @include(if: $includeOwnerProfile) {
        ...GlobalKeys
        ...CommonServiceKeys
      }
      reverseProfile @include(if: $includeOwnerReverseProfile) {
        ...GlobalKeys
        ...CommonServiceKeys
      }
    }
  }
  ${GlobalKeysFragmentDoc}
  ${CommonServiceKeysFragmentDoc}
`;
export const TokenInfoFragmentDoc = gql`
  fragment TokenInfo on TokenMetadata {
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
    tokenId
    type
  }
`;
export const TokenMetadataRefreshDocument = gql`
  mutation tokenMetadataRefresh(
    $contract: String!
    $id: Int
    $tokenId: String
  ) {
    tokenMetadataRefresh(contract: $contract, id: $id, tokenId: $tokenId) {
      ...TokenInfo
    }
  }
  ${TokenInfoFragmentDoc}
`;
export const AddressDocument = gql`
  query address(
    $name: String!
    $tokensLimit: Int = 10
    $includeProfile: Boolean = false
    $includeReverseProfile: Boolean = false
    $filterSuspectedScams: Boolean = false
    $includeTokens: Boolean = false
  ) {
    address(name: $name) {
      address
      profile @include(if: $includeProfile) {
        ...GlobalKeys
        ...CommonServiceKeys
      }
      reverseProfile @include(if: $includeReverseProfile) {
        ...GlobalKeys
        ...CommonServiceKeys
      }
      tokens(
        limit: $tokensLimit
        filter: { filterSuspectedScams: $filterSuspectedScams }
      ) @include(if: $includeTokens) {
        ...TokenInfo
      }
    }
  }
  ${GlobalKeysFragmentDoc}
  ${CommonServiceKeysFragmentDoc}
  ${TokenInfoFragmentDoc}
`;
export const TokenDocument = gql`
  query token(
    $contract: String!
    $id: Int
    $tokenId: String
    $includeOwnerInfo: Boolean = false
    $includeOwnerProfile: Boolean = false
    $includeOwnerReverseProfile: Boolean = false
  ) {
    token(contract: $contract, id: $id, tokenId: $tokenId) {
      ...TokenInfo
      ...TokenOwnerInfo @include(if: $includeOwnerInfo)
    }
  }
  ${TokenInfoFragmentDoc}
  ${TokenOwnerInfoFragmentDoc}
`;
export const TokensDocument = gql`
  query tokens(
    $filter: TokensFilter!
    $limit: Int = 10
    $cursor: String
    $includeOwnerProfile: Boolean = false
    $includeOwnerReverseProfile: Boolean = false
    $includeOwnerInfo: Boolean = false
  ) {
    tokens(filter: $filter, limit: $limit, cursor: $cursor) {
      nextCursor
      tokens {
        ...TokenInfo
        ...TokenOwnerInfo @include(if: $includeOwnerInfo)
      }
    }
  }
  ${TokenInfoFragmentDoc}
  ${TokenOwnerInfoFragmentDoc}
`;
export const TokenTransfersDocument = gql`
  query tokenTransfers(
    $filter: TransfersFilter!
    $limit: Int = 10
    $cursor: String
    $includeERC721Metadata: Boolean = false
    $includeFromProfile: Boolean = false
    $includeFromReverseProfile: Boolean = false
    $includeFromTokensInfo: Boolean = false
    $fromTokensLimit: Int = 10
    $fromTokensFilterSuspectedScam: Boolean = false
    $includeToProfile: Boolean = false
    $includeToReverseProfile: Boolean = false
    $includeToTokensInfo: Boolean = false
    $toTokensLimit: Int = 10
    $toTokensFilterSuspectedScam: Boolean = false
  ) {
    tokenTransfers(filter: $filter, limit: $limit, cursor: $cursor) {
      nextCursor
      tokenTransfers {
        blockTimestamp
        hash
        id
        token
        erc721Metadata @include(if: $includeERC721Metadata) {
          ...TokenInfo
        }
        from {
          address
          profile @include(if: $includeFromProfile) {
            ...CommonServiceKeys
            ...GlobalKeys
          }
          reverseProfile @include(if: $includeFromReverseProfile) {
            ...CommonServiceKeys
            ...GlobalKeys
          }
          tokens(
            limit: $fromTokensLimit
            filter: { filterSuspectedScams: $fromTokensFilterSuspectedScam }
          ) @include(if: $includeFromTokensInfo) {
            ...TokenInfo
          }
        }
        to {
          address
          profile @include(if: $includeToProfile) {
            ...CommonServiceKeys
            ...GlobalKeys
          }
          reverseProfile @include(if: $includeToReverseProfile) {
            ...CommonServiceKeys
            ...GlobalKeys
          }
          tokens(
            limit: $toTokensLimit
            filter: { filterSuspectedScams: $toTokensFilterSuspectedScam }
          ) @include(if: $includeToTokensInfo) {
            ...TokenInfo
          }
        }
      }
    }
  }
  ${TokenInfoFragmentDoc}
  ${CommonServiceKeysFragmentDoc}
  ${GlobalKeysFragmentDoc}
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
    tokenMetadataRefresh(
      variables: TokenMetadataRefreshMutationVariables,
      requestHeaders?: Dom.RequestInit["headers"]
    ): Promise<TokenMetadataRefreshMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<TokenMetadataRefreshMutation>(
            TokenMetadataRefreshDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        "tokenMetadataRefresh",
        "mutation"
      );
    },
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
    token(
      variables: TokenQueryVariables,
      requestHeaders?: Dom.RequestInit["headers"]
    ): Promise<TokenQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<TokenQuery>(TokenDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        "token",
        "query"
      );
    },
    tokens(
      variables: TokensQueryVariables,
      requestHeaders?: Dom.RequestInit["headers"]
    ): Promise<TokensQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<TokensQuery>(TokensDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        "tokens",
        "query"
      );
    },
    tokenTransfers(
      variables: TokenTransfersQueryVariables,
      requestHeaders?: Dom.RequestInit["headers"]
    ): Promise<TokenTransfersQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<TokenTransfersQuery>(
            TokenTransfersDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        "tokenTransfers",
        "query"
      );
    },
  };
}
export type Sdk = ReturnType<typeof getSdk>;
export type TokenMetadataRefreshMutationVariables = Exact<{
  contract: Scalars["String"];
  id?: InputMaybe<Scalars["Int"]>;
  tokenId?: InputMaybe<Scalars["String"]>;
}>;

export type TokenMetadataRefreshMutation = {
  __typename?: "RootMutationType";
  tokenMetadataRefresh?: {
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
    tokenId?: string | null;
    type?: string | null;
    attributes?: Array<{
      __typename?: "TokenMetadataAttribute";
      displayType?: string | null;
      traitType?: string | null;
      value?: string | null;
    }> | null;
  } | null;
};

export type AddressQueryVariables = Exact<{
  name: Scalars["String"];
  tokensLimit?: InputMaybe<Scalars["Int"]>;
  includeProfile?: InputMaybe<Scalars["Boolean"]>;
  includeReverseProfile?: InputMaybe<Scalars["Boolean"]>;
  filterSuspectedScams?: InputMaybe<Scalars["Boolean"]>;
  includeTokens?: InputMaybe<Scalars["Boolean"]>;
}>;

export type AddressQuery = {
  __typename?: "RootQueryType";
  address: {
    __typename?: "Address";
    address: string;
    profile?: {
      __typename?: "Profile";
      name: string;
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
      name: string;
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
      tokenId?: string | null;
      type?: string | null;
      attributes?: Array<{
        __typename?: "TokenMetadataAttribute";
        displayType?: string | null;
        traitType?: string | null;
        value?: string | null;
      }> | null;
    } | null> | null;
  };
};

export type TokenQueryVariables = Exact<{
  contract: Scalars["String"];
  id?: InputMaybe<Scalars["Int"]>;
  tokenId?: InputMaybe<Scalars["String"]>;
  includeOwnerInfo?: InputMaybe<Scalars["Boolean"]>;
  includeOwnerProfile?: InputMaybe<Scalars["Boolean"]>;
  includeOwnerReverseProfile?: InputMaybe<Scalars["Boolean"]>;
}>;

export type TokenQuery = {
  __typename?: "RootQueryType";
  token: {
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
    tokenId?: string | null;
    type?: string | null;
    attributes?: Array<{
      __typename?: "TokenMetadataAttribute";
      displayType?: string | null;
      traitType?: string | null;
      value?: string | null;
    }> | null;
    ownerAddress?: {
      __typename?: "Address";
      address: string;
      profile?: {
        __typename?: "Profile";
        name: string;
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
        name: string;
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
    } | null;
  };
};

export type TokensQueryVariables = Exact<{
  filter: TokensFilter;
  limit?: InputMaybe<Scalars["Int"]>;
  cursor?: InputMaybe<Scalars["String"]>;
  includeOwnerProfile?: InputMaybe<Scalars["Boolean"]>;
  includeOwnerReverseProfile?: InputMaybe<Scalars["Boolean"]>;
  includeOwnerInfo?: InputMaybe<Scalars["Boolean"]>;
}>;

export type TokensQuery = {
  __typename?: "RootQueryType";
  tokens?: {
    __typename?: "TokensPage";
    nextCursor?: string | null;
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
      tokenId?: string | null;
      type?: string | null;
      attributes?: Array<{
        __typename?: "TokenMetadataAttribute";
        displayType?: string | null;
        traitType?: string | null;
        value?: string | null;
      }> | null;
      ownerAddress?: {
        __typename?: "Address";
        address: string;
        profile?: {
          __typename?: "Profile";
          name: string;
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
          name: string;
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
      } | null;
    }> | null;
  } | null;
};

export type TokenTransfersQueryVariables = Exact<{
  filter: TransfersFilter;
  limit?: InputMaybe<Scalars["Int"]>;
  cursor?: InputMaybe<Scalars["String"]>;
  includeERC721Metadata?: InputMaybe<Scalars["Boolean"]>;
  includeFromProfile?: InputMaybe<Scalars["Boolean"]>;
  includeFromReverseProfile?: InputMaybe<Scalars["Boolean"]>;
  includeFromTokensInfo?: InputMaybe<Scalars["Boolean"]>;
  fromTokensLimit?: InputMaybe<Scalars["Int"]>;
  fromTokensFilterSuspectedScam?: InputMaybe<Scalars["Boolean"]>;
  includeToProfile?: InputMaybe<Scalars["Boolean"]>;
  includeToReverseProfile?: InputMaybe<Scalars["Boolean"]>;
  includeToTokensInfo?: InputMaybe<Scalars["Boolean"]>;
  toTokensLimit?: InputMaybe<Scalars["Int"]>;
  toTokensFilterSuspectedScam?: InputMaybe<Scalars["Boolean"]>;
}>;

export type TokenTransfersQuery = {
  __typename?: "RootQueryType";
  tokenTransfers?: {
    __typename?: "TokenTransfersPage";
    nextCursor?: string | null;
    tokenTransfers?: Array<{
      __typename?: "TokenTransfer";
      blockTimestamp?: any | null;
      hash?: string | null;
      id?: number | null;
      token?: string | null;
      erc721Metadata?: {
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
        tokenId?: string | null;
        type?: string | null;
        attributes?: Array<{
          __typename?: "TokenMetadataAttribute";
          displayType?: string | null;
          traitType?: string | null;
          value?: string | null;
        }> | null;
      } | null;
      from?: {
        __typename?: "Address";
        address: string;
        profile?: {
          __typename?: "Profile";
          name: string;
          github?: string | null;
          peepeth?: string | null;
          linkedin?: string | null;
          twitter?: string | null;
          keybase?: string | null;
          telegram?: string | null;
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
        } | null;
        reverseProfile?: {
          __typename?: "Profile";
          name: string;
          github?: string | null;
          peepeth?: string | null;
          linkedin?: string | null;
          twitter?: string | null;
          keybase?: string | null;
          telegram?: string | null;
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
          tokenId?: string | null;
          type?: string | null;
          attributes?: Array<{
            __typename?: "TokenMetadataAttribute";
            displayType?: string | null;
            traitType?: string | null;
            value?: string | null;
          }> | null;
        } | null> | null;
      } | null;
      to?: {
        __typename?: "Address";
        address: string;
        profile?: {
          __typename?: "Profile";
          name: string;
          github?: string | null;
          peepeth?: string | null;
          linkedin?: string | null;
          twitter?: string | null;
          keybase?: string | null;
          telegram?: string | null;
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
        } | null;
        reverseProfile?: {
          __typename?: "Profile";
          name: string;
          github?: string | null;
          peepeth?: string | null;
          linkedin?: string | null;
          twitter?: string | null;
          keybase?: string | null;
          telegram?: string | null;
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
          tokenId?: string | null;
          type?: string | null;
          attributes?: Array<{
            __typename?: "TokenMetadataAttribute";
            displayType?: string | null;
            traitType?: string | null;
            value?: string | null;
          }> | null;
        } | null> | null;
      } | null;
    }> | null;
  } | null;
};

export type TokenOwnerInfoFragment = {
  __typename?: "TokenMetadata";
  ownerAddress?: {
    __typename?: "Address";
    address: string;
    profile?: {
      __typename?: "Profile";
      name: string;
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
      name: string;
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
  } | null;
};

export type TokenInfoFragment = {
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
  tokenId?: string | null;
  type?: string | null;
  attributes?: Array<{
    __typename?: "TokenMetadataAttribute";
    displayType?: string | null;
    traitType?: string | null;
    value?: string | null;
  }> | null;
};

export type GlobalKeysFragment = {
  __typename?: "Profile";
  name: string;
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
