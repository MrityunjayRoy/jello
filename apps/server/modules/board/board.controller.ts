import type { Request, Response } from "express";
import { createBoardSchema, boardIdSchema, updateBoardSchema } from "./board.model";
import * as boardServices from "./board.services"
import { ValidationError, type AppError, type Result } from "errors"

const sendError = (res: Response, error: AppError) => {
    res.status(error.status).json({
        error: error.message,
        code: error.code,
        ...(error.details !== undefined ? { details: error.details } : {}),
    })
}

const parseOrSend = <T>(
    parsed: { success: true; data: T } | { success: false; error: { issues: unknown } },
    res: Response,
): T | undefined => {
    if (!parsed.success) {
        sendError(res, new ValidationError({ details: parsed.error.issues }))
        return undefined
    }
    return parsed.data
}

const handleResult = <T>(res: Response, result: Result<T>, successStatus = 200, message = "Success") => {
    if (!result.success) {
        sendError(res, result.error)
        return
    }
    res.status(successStatus).json({
        message,
        data: result.data,
    })
}

export const createBoard = async (req: Request, res: Response): Promise<void> => {
    const input = parseOrSend(createBoardSchema.safeParse(req.body), res)
    if (input === undefined) return
    const result = await boardServices.createBoard(input)
    handleResult(res, result, 201, "Created Board Successfully")
}

export const getBoardsByOrg = async (req: Request, res: Response): Promise<void> => {
    const orgID = parseOrSend(boardIdSchema.safeParse(req.params.orgID), res)
    if (orgID === undefined) return
    const result = await boardServices.getBoardByOrgId(orgID)
    handleResult(res, result, 200, "All Boards by org extracted.")
}

export const getBoard = async (req: Request, res: Response): Promise<void> => {
    const boardID = parseOrSend(boardIdSchema.safeParse(req.params.boardID), res)
    if (boardID === undefined) return
    const result = await boardServices.getBoard(boardID)
    handleResult(res, result, 200, "Board extracted successfully")
}

export const updateBoard = async (req: Request, res: Response): Promise<void> => {
    const boardID = parseOrSend(boardIdSchema.safeParse(req.params.boardID), res)
    if (boardID === undefined) return
    const input = parseOrSend(updateBoardSchema.safeParse(req.body), res)
    if (input === undefined) return
    const result = await boardServices.updateBoard(boardID, input)
    handleResult(res, result, 200, "Updated Board Successfully")
}

export const deleteBoard = async (req: Request, res: Response): Promise<void> => {
    const boardID = parseOrSend(boardIdSchema.safeParse(req.params.boardID), res)
    if (boardID === undefined) return
    const result = await boardServices.deleteBoard(boardID)
    if (!result.success) {
        sendError(res, result.error)
        return
    }
    res.status(204).json({
        message: "Board Deleted successfully",
    })
}
