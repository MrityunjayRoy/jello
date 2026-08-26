import { prisma } from "db/client"
import { type NextFunction, type Request, type Response } from "express"

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
                return res.status(404).json({ error: "Board not found" })
            }

            orgID = board.orgID
        }

        if (!orgID) {
            return res.status(400).json({ error: "Org ID is required" })
        }

        const membership = await prisma.membership.findUnique({
            where: { userID_orgID: { userID: req.user!.id, orgID } }
        })

        if (!membership) {
            return res.status(403).json({ error: "Not a member of this org" })
        }

        next()
    } catch (error) {
        return res.status(500).json({ error: "Internal server error" })
    }
}
