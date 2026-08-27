import type { ErrorRequestHandler } from "express"
import { AppError } from "errors"

export const errorHandler: ErrorRequestHandler = (error, _req, res, _next) => {
    if (error instanceof AppError) {
        res.status(error.status).json({
            error: error.message,
            code: error.code,
            ...(error.details !== undefined ? { details: error.details } : {}),
        })
        return
    }

    console.error(error)
    res.status(500).json({
        error: "Internal server error",
        code: "INTERNAL_ERROR",
    })
}
