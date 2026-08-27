import { prisma } from "db/client"
import type { CreateBoardInput, UpdateBoardInput } from "./board.model"

export const createBoard = (data: CreateBoardInput) =>
    prisma.board.create({
        data: {
            ...data
        }
    })

export const findBoardById = (id: string) =>
    prisma.board.findUnique({ where: { id } })

export const findBoardByOrgId = (orgID: string) =>
    prisma.board.findMany({
        where: { orgID },
        orderBy: { title: 'asc' }
    })

export const updateBoard = (id: string, data: UpdateBoardInput) =>
    prisma.board.update({
        where: { id },
        data
    })

export const deleteBoard = (id: string) =>
    prisma.board.delete({
        where: { id }
    })