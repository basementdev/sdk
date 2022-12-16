import { Erc721TransfersQueryVariables, TokenQueryVariables } from "../sdk";
import {
  SalesFilterOptions,
  TokenQueryIncludeOptions,
  TransactionQueryIncludeOptions,
} from "../types";
import isPropertyIncluded from "./isPropertyIncluded";

type QueryType = "tokenSales" | "erc721TransferSale";

export function parseTransactionIncludeOptions(
  opts?: Partial<TransactionQueryIncludeOptions> | boolean
) {
  if (typeof opts === "boolean") return {};
  const includeTransactionLogs = opts?.logs;
  const includeTransactionRecipient = !!opts?.to;
  const includeTransactionSender = !!opts?.from;
  const includeTransactionEvents = opts?.events;
  return {
    includeTransactionEvents,
    includeTransactionLogs,
    includeTransactionRecipient,
    includeTransactionSender,
  };
}

export function parseSaleIncludeOptions<T extends QueryType>(
  opts?: Partial<SalesFilterOptions> | boolean,
  queryType?: T
): T extends "tokenSales"
  ? Partial<TokenQueryVariables>
  : Partial<Erc721TransfersQueryVariables> {
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
  if (queryType === "tokenSales") {
    return {
      includeTokenSalesMakerReverseProfile: includeMakerReverseProfile,
      includeTokenSalesTakerReverseProfile: includeTakerReverseProfile,
      includeTokenSalesTaker: includeTaker,
      includeTokenSalesMaker: includeMaker,
    };
  }
  return {
    includeErc721TransferSaleMaker: includeMaker,
    includeErc721TransferSaleTaker: includeTaker,
    includeErc721TransferSaleMakerReverseProfile: includeMakerReverseProfile,
    includeErc721TransferSaleTakerReverseProfile: includeTakerReverseProfile,
  } as Partial<Erc721TransfersQueryVariables>;
}

export function parseTokenIncludeOptions(
  opts?: Partial<TokenQueryIncludeOptions>
): Partial<TokenQueryVariables> {
  const includeOwner = !!opts.owner;
  const includeTokenMint = !!opts.mintTransaction;

  const mintTranasctionOpts = parseTransactionIncludeOptions(
    opts.mintTransaction
  );

  const {
    includeTokenSalesMaker,
    includeTokenSalesMakerReverseProfile,
    includeTokenSalesTaker,
    includeTokenSalesTakerReverseProfile,
  } = parseSaleIncludeOptions(opts.sales, "tokenSales");

  const includeTokenAttributes = opts.attributes;
  const includeTokenSales = !!opts.sales;
  const includeTokenUri = opts.tokenUri;
  const includeTokenMedia = opts.media;
  const includeOwnerProfile = isPropertyIncluded(opts.owner, "profile");
  const includeOwnerReverseProfile = isPropertyIncluded(
    opts.owner,
    "reverseProfile"
  );

  return {
    includeOwner,
    includeTokenMint,
    ...mintTranasctionOpts,
    includeTokenUri,
    includeTokenSales,
    includeTokenMedia,
    includeTokenSalesMaker,
    includeTokenSalesTaker,
    includeTokenSalesMakerReverseProfile,
    includeTokenSalesTakerReverseProfile,
    includeOwnerProfile,
    includeOwnerReverseProfile,
    includeTokenAttributes,
  };
}
