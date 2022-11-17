import { GraphQLClient } from "graphql-request";
import {
  AddressQuery,
  getSdk,
  NonFungibleTokenRefreshMutationVariables,
  TokenQuery,
  TokenQueryVariables,
  TokensQuery,
  TransactionQuery,
} from "./sdk";
import {
  AddressQueryOptions,
  SalesFilterOptions,
  TokenQueryIncludeOptions,
  TokenQueryOptions,
  TokensQueryOptions,
  TransactionLogsQueryOptions,
  TransactionQueryIncludeOptions,
  TransactionQueryOptions,
  TransactionsQueryOptions,
  TransfersQueryOptions,
} from "./types";

export const DEFAULT_ENDPOINT = "https://beta.basement.dev/v2/graphiql";

function isPropertyIncluded<T>(
  obj: T,
  prop: keyof Exclude<T, boolean>
): boolean {
  return !!obj?.[prop as keyof T];
}

function parseSaleIncludeOptions(opts?: Partial<SalesFilterOptions> | boolean) {
  const includeMaker = isPropertyIncluded(opts, "maker");
  const includeTaker = isPropertyIncluded(opts, "taker");
  let includeMakerReverseProfile = false;
  if (
    includeMaker &&
    typeof opts !== "boolean" &&
    typeof opts.maker !== "boolean"
  ) {
    includeMakerReverseProfile = opts.maker.reverseProfile;
  }

  let includeTakerReverseProfile = false;
  if (
    includeTaker &&
    typeof opts !== "boolean" &&
    typeof opts.taker !== "boolean"
  ) {
    includeTakerReverseProfile = opts.taker.reverseProfile;
  }
  return {
    includeTaker,
    includeTakerReverseProfile,
    includeMaker,
    includeMakerReverseProfile,
  };
}

function parseTokenIncludeOptions(opts?: Partial<TokenQueryIncludeOptions>) {
  const includeOwner = !!opts.owner;
  const includeMint = !!opts.mintTransaction;
  const includeTransactionRecipient = isPropertyIncluded(
    opts.mintTransaction,
    "recipient"
  );
  const includeTransactionSender = isPropertyIncluded(
    opts.mintTransaction,
    "sender"
  );
  const includeSales = !!opts.sales;
  const includeTokenUri = opts.tokenUri;
  const includeTokenMedia = opts.media;
  const {
    includeMaker,
    includeMakerReverseProfile,
    includeTaker,
    includeTakerReverseProfile,
  } = parseSaleIncludeOptions(opts.sales);
  const includeTransactionLogs = isPropertyIncluded(
    opts.mintTransaction,
    "logs"
  );
  const includeOwnerProfile = isPropertyIncluded(opts.owner, "profile");
  const includeOwnerReverseProfile = isPropertyIncluded(
    opts.owner,
    "reverseProfile"
  );

  return {
    includeOwner,
    includeMint,
    includeTokenUri,
    includeSales,
    includeTokenMedia,
    includeMaker,
    includeTaker,
    includeMakerReverseProfile,
    includeTakerReverseProfile,
    includeTransactionLogs,
    includeOwnerProfile,
    includeOwnerReverseProfile,
    includeTransactionRecipient,
    includeTransactionSender,
  } as Partial<TokenQueryVariables>;
}

function parseTransactionIncludeOptions(
  opts?: Partial<TransactionQueryIncludeOptions>
) {
  const includeTransactionLogs = opts?.logs;
  const includeTransactionRecipient = !!opts?.recipient;
  const includeTransactionSender = !!opts?.sender;
  return {
    includeTransactionLogs,
    includeTransactionRecipient,
    includeTransactionSender,
  };
}

export class BasementSDK {
  private sdk: ReturnType<typeof getSdk>;

  constructor(endpoint: string = DEFAULT_ENDPOINT) {
    const client = new GraphQLClient(endpoint);
    this.sdk = getSdk(client);
  }

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

      ...parseTokenIncludeOptions(include),
    });
    return data.token;
  }

  /**
   * Query tokens that satisfy the given filter(s)
   */
  public async tokens({
    filter,
    after,
    include,
    limit,
  }: TokensQueryOptions): Promise<TokensQuery["tokens"]> {
    const includeTotalCount = include?.totalCount;
    const data = await this.sdk.tokens({
      filter,
      after,
      includeTotalCount,
      limit,
      ...parseTokenIncludeOptions(include),
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
    const tokensLimit = include?.tokens?.limit;
    const includeProfile = include?.profile;
    const includeReverseProfile = include?.reverseProfile;
    const data = await this.sdk.address({
      address,
      includeProfile,
      includeReverseProfile,
      includeTokens,
      tokensLimit,
      ...parseTokenIncludeOptions(include.tokens),
    });

    return data.address;
  }

  public async transaction({
    hash,
    include,
  }: TransactionQueryOptions): Promise<TransactionQuery["transaction"]> {
    const { transaction } = await this.sdk.transaction({
      hash,
      ...parseTransactionIncludeOptions(include),
    });
    return transaction;
  }

  public async transactions({
    filter,
    after,
    limit,
    reversed,
    include,
  }: TransactionsQueryOptions) {
    const includeTotalCount = include?.totalCount;
    const { transactions } = await this.sdk.transactions({
      limit,
      reversed,
      filter,
      after,
      includeTotalCount,
      ...parseTransactionIncludeOptions(include),
    });
    return transactions;
  }

  public async transactionLogs({
    after,
    filter,
    include,
    limit,
    reversed,
  }: TransactionLogsQueryOptions) {
    const includeTotalCount = include?.totalCount;
    const includeContractReverseProfile = !!include?.address;
    const includeTransaction = !!include.transaction;
    let transactionOpts = {};
    if (typeof include?.transaction !== "boolean") {
      transactionOpts = parseTransactionIncludeOptions(include.transaction);
    }
    const { transactionLogs } = await this.sdk.transactionLogs({
      after,
      filter,
      limit,
      reversed,
      includeTotalCount,
      includeContractReverseProfile,
      includeTransaction,
      ...transactionOpts,
      includeTransactionLogs: false,
    });
    return transactionLogs;
  }

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

  public async transfers(params?: TransfersQueryOptions) {
    const { include, after, filter, limit } = params || {};
    const includeTransferContract = !!include?.contract;
    const includeTotalCount = include?.totalCount;
    const includeToken = !!include?.token;
    const includeTokenMedia = isPropertyIncluded(include?.token, "media");
    const includeTransferContractReverseProfile = isPropertyIncluded(
      include?.contract,
      "reverseProfile"
    );

    const includeSale = !!include?.sale;
    const {
      includeMaker,
      includeMakerReverseProfile,
      includeTaker,
      includeTakerReverseProfile,
    } = parseSaleIncludeOptions(include.sale);

    const includeTransaction = !!include?.transaction;
    let parsedTransactionsProps = {};
    if (typeof include?.transaction !== "boolean") {
      parsedTransactionsProps = parseTransactionIncludeOptions(
        include?.transaction
      );
    }

    const includeTransferSender = !!include?.from;
    const includeTransferSenderReverseProfile = isPropertyIncluded(
      include?.from,
      "reverseProfile"
    );
    const includeTransferRecipient = !!include?.to;
    const includeTransferRecipientReverseProfile = isPropertyIncluded(
      include?.to,
      "reverseProfile"
    );

    const { transfers } = await this.sdk.transfers({
      after,
      filter,
      limit,
      includeMaker,
      includeTaker,
      includeMakerReverseProfile,
      includeTakerReverseProfile,
      includeSale,
      includeTotalCount,
      includeToken,
      includeTokenMedia,
      includeTransaction,
      includeTransferRecipient,
      includeTransferSender,
      includeTransferContract,
      includeTransferContractReverseProfile,
      includeTransferRecipientReverseProfile,
      includeTransferSenderReverseProfile,
      ...parsedTransactionsProps,
    });

    return transfers;
  }
}
