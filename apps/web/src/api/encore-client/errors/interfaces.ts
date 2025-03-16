import { ErrorCode } from "./codes";

/**
 * APIErrorDetails represents the response from an Encore API in the case of an error
 */
export interface APIErrorResponse {
  code: ErrorCode;
  message: string;
  details?: any;
}
