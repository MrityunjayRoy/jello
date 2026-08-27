import type { AppError } from "./AppError"

export type Ok<T> = { success: true, data: T }
export type Err<T extends AppError = AppError> = { success: false, error: T }

export type Result<S, E extends AppError = AppError> = Ok<S> | Err<E>

export const ok = <T>(data: T): Ok<T> => ({
    success: true,
    data
})

export const err = <E extends AppError>(error: E): Err<E> => ({
    success: false,
    error
})