import { prisma } from "db/client"
import { type NextFunction, type Request, type Response } from "express"
import { BadRequestError, ForbiddenError, InternalServerError, NotFoundError } from "errors"

export const requireOrgMember = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const boardID = typeof req.params.boardID === "string" ? req.params.boardID : undefined
        let orgID = typeof req.params.orgID === "string" ? req.params.orgID : undefined

        if (!orgID && boardID) {
            const board = await prisma.board.findUnique({
                where: { id: boardID },
                select: { orgID: true }
            })

            if (!board) {
                return res.status(404).json({
                    error: new NotFoundError({ message: "Board not found" }).message,
                    code: "NOT_FOUND",
                })
            }

            orgID = board.orgID
        }

        if (!orgID) {
            return res.status(400).json({
                error: new BadRequestError({ message: "Org ID is required" }).message,
                code: "BAD_REQUEST",
            })
        }

        const membership = await prisma.membership.findUnique({
            where: { userID_orgID: { userID: req.user!.id, orgID } }
        })

        if (!membership) {
            return res.status(403).json({
                error: new ForbiddenError({ message: "Not a member of this org" }).message,
                code: "FORBIDDEN",
            })
        }

        next()
    } catch (error) {
        const err = new InternalServerError({ cause: error })
        return res.status(err.status).json({
            error: err.message,
            code: err.code,
        })
    }
}
