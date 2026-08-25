import { auth } from "auth/client"
import { fromNodeHeaders } from "better-auth/node"
import { type NextFunction, type Request, type Response } from "express"

export const requireAuth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const session = await auth.api.getSession({
            headers: fromNodeHeaders(req.headers)
        })

        if (!session) {
            return res.status(401).json({
                error: "Unauthorized",
            })
        }

        req.user = session.user
        req.session = session.session

        next()
    } catch (error) {
        return res.status(401).json({
            error: "Unauthorized",
        })
    }
}