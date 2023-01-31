import { DocumentNode } from "graphql";
import { GraphQLClient } from "graphql-request";
import {
  AddressQuery,
  NonFungibleTokenRefreshMutationVariables,
  SdkFunctionWrapper,
  TokenQuery,
  TokensQuery,
  TransactionQuery,
  getSdk,
} from "./sdk";
import {
  AddressQueryOptions,
  Erc20BalancesQueryOptions,
  Erc20TransfersQueryOptions,
  Erc721TransfersQueryOptions,
  TokenQueryOptions,
  TokensQueryOptions,
  TransactionLogsQueryOptions,
  TransactionQueryOptions,
  TransactionsQueryOptions,
} from "./types";
import isPropertyIncluded from "./utils/isPropertyIncluded";
import {
  parseOwnerOpts,
  parseSaleOpts,
  parseTokenOpts,
  parseTransactionOpts,
  parseTransferSenderRecipientOpts,
} from "./utils/parseIncludeOptions";

export const DEFAULT_ENDPOINT = "https://beta.basement.dev/v2/graphql";

type SDKOptions = {
  endpoint?: string;
  apiKey?: string;
};

export class BasementSDK {
  private apiKey?: string;

  private client: GraphQLClient;

  private opts: SDKOptions;

  private sdk: ReturnType<typeof getSdk>;

  constructor(opts?: SDKOptions) {
    const { apiKey, endpoint = DEFAULT_ENDPOINT } = opts || {};
    this.opts = opts;
    this.client = new GraphQLClient(endpoint);
    this.opts = opts;
    this.apiKey = apiKey;
    this.sdk = getSdk(this.client, this.withWrapper);
  }

  private withWrapper: SdkFunctionWrapper = async <T>(
    // eslint-disable-next-line no-unused-vars
    action: (requestHeaders?: Record<string, string>) => Promise<T>
  ): Promise<T> => {
    const headers: Record<string, string> = {
      "X-Basement-SDK": process.env.npm_package_version,
    };
    if (this.apiKey) {
      headers["x-basement-api-key"] = this.apiKey;
    }

    const result = await action(headers);
    return result;
  };

  /**
   * Queries information about a specific token
   */
  public async token({
    contract,
    tokenId,
    include,
  }: TokenQueryOptions): Promise<TokenQuery["token"]> {
    const data = await this.sdk.token({
      contract,
      tokenId,
      ...parseTokenOpts(include),
    });
    return data.token;
  }

  /**
   * Query tokens that satisfy the given filter(s)
   */
  public async tokens(
    params?: TokensQueryOptions
  ): Promise<TokensQuery["tokens"]> {
    const { before, after, filter, include, limit } = params || {};
    const includeTotalCount = include?.totalCount;
    const data = await this.sdk.tokens({
      before,
      filter,
      after,
      includeTotalCount,
      limit,
      ...parseTokenOpts(include),
    });
    return data.tokens;
  }

  /**
   * Queries information about an address
   */
  public async address({
    address,
    include,
  }: AddressQueryOptions): Promise<AddressQuery["address"]> {
    const includeTokens = !!include?.tokens;
    let tokensLimit = 10;
    let tokensIncludeOptions = {};
    if (typeof include?.tokens !== "boolean" && includeTokens) {
      tokensLimit = include?.tokens.limit;
      tokensIncludeOptions = parseTokenOpts(include?.tokens);
    }
    const includeProfile = include?.profile;
    const includeReverseProfile = include?.reverseProfile;
    const data = await this.sdk.address({
      address,
      includeProfile,
      includeReverseProfile,
      includeTokens,
      tokensLimit,
      ...tokensIncludeOptions,
    });

    return data.address;
  }

  /**
   * Queries information about a transaction
   */
  public async transaction({
    hash,
    include,
  }: TransactionQueryOptions): Promise<TransactionQuery["transaction"]> {
    const { transaction } = await this.sdk.transaction({
      hash,
      ...parseTransactionOpts(include),
    });
    return transaction;
  }

  /**
   * Query transactions that satisfy the given filter(s)
   */
  public async transactions(params?: TransactionsQueryOptions) {
    const { before, after, filter, include, limit, reversed } = params || {};
    const includeTotalCount = include?.totalCount;
    const { transactions } = await this.sdk.transactions({
      before,
      limit,
      reversed,
      filter: filter as any,
      after,
      includeTotalCount,
      ...parseTransactionOpts(include),
    });
    return transactions;
  }

  /**
   * Query transaction logs that satisfy the given filter(s)
   */
  public async transactionLogs(params?: TransactionLogsQueryOptions) {
    const { before, after, filter, include, limit, reversed } = params || {};
    const includeTotalCount = include?.totalCount;
    const includeContractReverseProfile = !!include?.address;
    const includeTransaction = !!include?.transaction;
    const includeBlockHash = include?.blockHash;
    let transactionOpts = {};
    if (typeof include?.transaction !== "boolean") {
      transactionOpts = parseTransactionOpts(include?.transaction);
    }
    const { transactionLogs } = await this.sdk.transactionLogs({
      before,
      after,
      filter: filter as any,
      limit,
      reversed,
      includeTotalCount,
      includeBlockHash,
      includeContractReverseProfile,
      includeTransaction,
      ...transactionOpts,
      includeTransactionLogs: false,
    });
    return transactionLogs;
  }

  /**
   * Refreshes metadata of a specific NFT
   */
  public async nonFungibleTokenRefresh({
    contract,
    tokenId,
  }: NonFungibleTokenRefreshMutationVariables) {
    const { nonFungibleTokenRefresh } = await this.sdk.nonFungibleTokenRefresh({
      contract,
      tokenId,
    });
    return nonFungibleTokenRefresh;
  }

  /**
   * Query ERC721 transfers that satisfy the given filter(s)
   */
  public async erc721Transfers(params?: Erc721TransfersQueryOptions) {
    const { include, before, after, filter, limit } = params || {};
    const includeTransferContract = !!include?.contract;
    const includeTotalCount = include?.totalCount;
    const includeToken = !!include?.token;
    const includeBlockHash = include?.blockHash;
    const includeTransferContractReverseProfile = isPropertyIncluded(
      include?.contract,
      "reverseProfile"
    );

    let parsedTokenOpts = {};

    if (typeof include?.token !== "boolean" && includeToken) {
      parsedTokenOpts = parseTokenOpts(include?.token);
    }

    const includeSale = !!include?.sale;
    const {
      includeErc721TransferSaleMaker,
      includeErc721TransferSaleTaker,
      includeErc721TransferSaleMakerReverseProfile,
      includeErc721TransferSaleTakerReverseProfile,
    } = parseSaleOpts(include?.sale, "erc721TransferSale");

    const includeTokenSales = isPropertyIncluded(include?.token, "sales");

    const includeTransaction = !!include?.transaction;

    const parsedTransactionOpts = parseTransactionOpts(include?.transaction);

    const parsedTransferAndRecipientOpts = parseTransferSenderRecipientOpts({
      from: include?.from,
      to: include?.to,
    });

    const { erc721Transfers } = await this.sdk.erc721Transfers({
      ...parsedTransactionOpts,
      ...parsedTokenOpts,
      ...parsedTransferAndRecipientOpts,
      before,
      after,
      filter: filter as any,
      limit,
      includeSale,
      includeBlockHash,
      includeErc721TransferSaleMaker,
      includeErc721TransferSaleTaker,
      includeErc721TransferSaleMakerReverseProfile,
      includeErc721TransferSaleTakerReverseProfile,
      includeTotalCount,
      includeToken,
      includeTokenSales,
      includeTransaction,
      includeTransferContract,
      includeTransferContractReverseProfile,
    });

    return erc721Transfers;
  }

  /**
   * Query ERC20 transfers that satisfy the given filter(s)
   */
  public async erc20Transfers(params?: Erc20TransfersQueryOptions) {
    const { after, before, filter, include, limit } = params || {};

    const includeTotalCount = include?.totalCount;
    const includeTransaction = !!include?.transaction;

    const parsedTransactionOpts = parseTransactionOpts(include?.transaction);

    const parsedTransferAndRecipientOpts = parseTransferSenderRecipientOpts({
      from: include?.from,
      to: include?.to,
    });

    const { erc20Transfers } = await this.sdk.erc20Transfers({
      ...parsedTransactionOpts,
      ...parsedTransferAndRecipientOpts,
      includeTotalCount,
      includeTransaction,
      before,
      after,
      filter: filter as any,
      limit,
    });

    return erc20Transfers;
  }

  /**
   * Query ERC20 balances from a given address
   */
  public async erc20Balances({ filter, include }: Erc20BalancesQueryOptions) {
    const includeOwner = !!include?.owner;
    const parsedOwnerOpts = parseOwnerOpts(include?.owner);
    const { erc20Balances } = await this.sdk.erc20Balances({
      ...parsedOwnerOpts,
      includeOwner,
      filter,
    });

    return erc20Balances;
  }

  public async request(query: DocumentNode, variables?: Record<string, any>) {
    return this.withWrapper(
      (wrappedRequestHeaders) =>
        this.client.request(query, variables, wrappedRequestHeaders),
      "custom"
    );
  }
}
