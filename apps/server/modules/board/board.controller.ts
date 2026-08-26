import type { Request, Response } from "express";
import { createBoardSchema, boardIdSchema, updateBoardSchema } from "./board.model";
import * as boardServices from "./board.services"

export const createBoard = async (req: Request, res: Response): Promise<void> => {
    const input = createBoardSchema.parse(req.body)
    const Board = await boardServices.createBoard(input)

    res.status(201).json({
        'message': "Created Board Successfully",
        "data": Board
    })
}

export const getBoardsByOrg = async (req: Request, res: Response): Promise<void> => {
    const orgID = boardIdSchema.parse(req.params.orgID)
    const Boards = await boardServices.getBoardByOrgId(orgID)

    res.status(200).json({
        'message': "All Boards by org extracted.",
        "data": Boards
    })
}

export const getBoard = async (req: Request, res: Response): Promise<void> => {
    const boardID = boardIdSchema.parse(req.params.boardID)
    const Board = await boardServices.getBoard(boardID)

    res.status(200).json({
        'message': "Board extracted successfully",
        "data": Board
    })
}

export const updateBoard = async (req: Request, res: Response): Promise<void> => {
    const boardID = boardIdSchema.parse(req.params.boardID)
    const input = updateBoardSchema.parse(req.body)
    const Board = await boardServices.updateBoard(boardID, input)

    res.status(200).json({
        'message': "Updated Board Successfully",
        "data": Board
    })
}

export const deleteBoard = async (req: Request, res: Response): Promise<void> => {
    const boardID = boardIdSchema.parse(req.params.boardID)
    await boardServices.deleteBoard(boardID)

    res.status(200).json({
        'message': "Board Deleted successfully",
    })
}