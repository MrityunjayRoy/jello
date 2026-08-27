import * as boardRepos from "./board.repo"
import type { UpdateBoardInput, CreateBoardInput } from "./board.model"
import { err, NotFoundError } from "errors"

export const createBoard = (input: CreateBoardInput) =>
    boardRepos.createBoard(input)

export const updateBoard = (boardID: string, input: UpdateBoardInput) => {
    return boardRepos.updateBoard(boardID, input)
}

export const getBoardByOrgId = (orgID: string) =>
    boardRepos.findBoardByOrgId(orgID)

export const getBoard = async (boardID: string) => {
    const board = await boardRepos.findBoardById(boardID)
    if (!board.success || !board.data) {
        return err(new NotFoundError({ message: `No board found with boardID: ${boardID}` }))
    }
    return board
}

export const deleteBoard = (boardID: string) =>
    boardRepos.deleteBoard(boardID)
