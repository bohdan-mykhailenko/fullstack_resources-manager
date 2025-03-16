import { ErrorCode } from "./codes";
import { APIErrorResponse } from "./interfaces";

/**
 * APIError represents a structured error as returned from an Encore application.
 */
export class APIError extends Error {
  /**
   * The HTTP status code associated with the error.
   */
  public readonly status: number;

  /**
   * The Encore error code
   */
  public readonly code: ErrorCode;

  /**
   * The error details
   */
  public readonly details?: any;

  constructor(status: number, response: APIErrorResponse) {
    // extending errors causes issues after you construct them, unless you apply the following fixes
    super(response.message);

    // set error name as constructor name, make it not enumerable to keep native Error behavior
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/new.target#new.target_in_constructors
    Object.defineProperty(this, "name", {
      value: "APIError",
      enumerable: false,
      configurable: true,
    });

    // fix the prototype chain
    if ((Object as any).setPrototypeOf == undefined) {
      (this as any).__proto__ = APIError.prototype;
    } else {
      Object.setPrototypeOf(this, APIError.prototype);
    }

    // capture a stack trace
    if ((Error as any).captureStackTrace !== undefined) {
      (Error as any).captureStackTrace(this, this.constructor);
    }

    this.status = status;
    this.code = response.code;
    this.details = response.details;
  }
}
