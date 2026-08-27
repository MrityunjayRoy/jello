import { auth } from "auth/client"
import { fromNodeHeaders } from "better-auth/node"
import { type NextFunction, type Request, type Response } from "express"
import { InternalServerError, UnauthorizedError } from "errors"

export const requireAuth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const session = await auth.api.getSession({
            headers: fromNodeHeaders(req.headers)
        })

        if (!session) {
            return res.status(401).json({
                error: new UnauthorizedError().message,
                code: "UNAUTHORIZED",
            })
        }

        req.user = session.user
        next()
    } catch (error) {
        const err = new InternalServerError({ cause: error })
        return res.status(err.status).json({
            error: err.message,
            code: err.code,
        })
    }
}
