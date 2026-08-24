import { prisma } from "db/client"

const login = async(req :Request, res: Response) => {
    const {username, email} = req.body
}