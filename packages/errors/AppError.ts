export type ErrorCode =
  | "BAD_REQUEST"
  | "VALIDATION_ERROR"
  | "UNAUTHORIZED"
  | "FORBIDDEN"
  | "NOT_FOUND"
  | "CONFLICT"
  | "INTERNAL_ERROR";

export interface AppErrorOptions {
  message?: string;
  code?: ErrorCode;
  details?: unknown;
  cause?: unknown;
}

export class AppError extends Error {
  readonly status: number;
  readonly code: ErrorCode;
  readonly details?: unknown;

  constructor(status: number, options: AppErrorOptions = {}) {
    super(options.message ?? "Something went wrong", {
      cause: options.cause,
    });
    this.name = new.target.name;
    this.status = status;
    this.code = options.code ?? "INTERNAL_ERROR";
    this.details = options.details;
  }
}

export class BadRequestError extends AppError {
  constructor(options: AppErrorOptions = {}) {
    super(400, { code: "BAD_REQUEST", ...options });
  }
}

export class ValidationError extends AppError {
  constructor(options: AppErrorOptions = {}) {
    super(400, { code: "VALIDATION_ERROR", ...options });
  }
}

export class UnauthorizedError extends AppError {
  constructor(options: AppErrorOptions = {}) {
    super(401, { code: "UNAUTHORIZED", ...options });
  }
}

export class ForbiddenError extends AppError {
  constructor(options: AppErrorOptions = {}) {
    super(403, { code: "FORBIDDEN", ...options });
  }
}

export class NotFoundError extends AppError {
  constructor(options: AppErrorOptions = {}) {
    super(404, { code: "NOT_FOUND", ...options });
  }
}

export class ConflictError extends AppError {
  constructor(options: AppErrorOptions = {}) {
    super(409, { code: "CONFLICT", ...options });
  }
}

export class InternalServerError extends AppError {
  constructor(options: AppErrorOptions = {}) {
    super(500, { code: "INTERNAL_ERROR", ...options });
  }
}