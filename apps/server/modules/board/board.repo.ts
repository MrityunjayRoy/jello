import { prisma } from "db/client"
import type { CreateBoardInput, UpdateBoardInput } from "./board.model"
import { fromPrisma } from "../../utils/fromPrisma"

export const createBoard = (data: CreateBoardInput) =>
    fromPrisma(() => prisma.board.create({
        data: {
            ...data
        }
    }))

export const findBoardById = (id: string) =>
    fromPrisma(() => prisma.board.findUnique({ where: { id } }))

export const findBoardByOrgId = (orgID: string) =>
    fromPrisma(() => prisma.board.findMany({
        where: { orgID },
        orderBy: { title: 'asc' }
    }))

export const updateBoard = (id: string, data: UpdateBoardInput) =>
    fromPrisma(() => prisma.board.update({
        where: { id },
        data
    }))

export const deleteBoard = (id: string) =>
    fromPrisma(() => prisma.board.delete({
        where: { id }
    }))
