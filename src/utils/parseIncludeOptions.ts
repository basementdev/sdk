import { TokenQueryVariables } from "../sdk";
import {
  SalesFilterOptions,
  TokenQueryIncludeOptions,
  TransactionQueryIncludeOptions,
} from "../types";
import isPropertyIncluded from "./isPropertyIncluded";

export function parseSaleIncludeOptions(
  opts?: Partial<SalesFilterOptions> | boolean
) {
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

export function parseTokenIncludeOptions(
  opts?: Partial<TokenQueryIncludeOptions>
) {
  const includeOwner = !!opts.owner;
  const includeMint = !!opts.mintTransaction;
  const includeTransactionRecipient = isPropertyIncluded(
    opts.mintTransaction,
    "to"
  );
  const includeTransactionSender = isPropertyIncluded(
    opts.mintTransaction,
    "from"
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

export function parseTransactionIncludeOptions(
  opts?: Partial<TransactionQueryIncludeOptions>
) {
  const includeTransactionLogs = opts?.logs;
  const includeTransactionRecipient = !!opts?.to;
  const includeTransactionSender = !!opts?.from;
  return {
    includeTransactionLogs,
    includeTransactionRecipient,
    includeTransactionSender,
  };
}
