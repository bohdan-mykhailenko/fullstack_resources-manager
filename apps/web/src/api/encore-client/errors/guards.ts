import { APIError } from "./APIError";
import { ErrorCode } from "./codes";
import { APIErrorResponse } from "./interfaces";

export function isAPIErrorResponse(error: any): error is APIErrorResponse {
  return (
    error !== undefined &&
    error !== null &&
    isErrorCode(error.code) &&
    typeof error.message === "string" &&
    (error.details === undefined ||
      error.details === null ||
      typeof error.details === "object")
  );
}

export function isErrorCode(code: any): code is ErrorCode {
  return code !== undefined && Object.values(ErrorCode).includes(code);
}

/**
 * Typeguard allowing use of an APIError's fields'
 */
export function isAPIError(error: any): error is APIError {
  return error instanceof APIError;
}
