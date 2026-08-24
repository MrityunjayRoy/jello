import { prisma } from "db/client";
import express from "express";

const app = express()

app.get("/", (req, res) => {
    res.send("hello")
})

app.listen(3003, () => {
    console.log("The server started at port 3003")
})