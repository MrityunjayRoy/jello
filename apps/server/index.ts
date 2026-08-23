import { prisma } from "db/client";
import express from "express";

const app = express()

app.use(express.json())

app.post("/signup", async(req, res) => {
    const {username} = req.body
    const user = await prisma.user.create({
        data: {
            name: username
        }
    })

    res.json({
        user: user
    })
})

app.listen(4000)