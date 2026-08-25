import { toNodeHandler } from "better-auth/node";
import {auth} from "auth/client"
import express from "express";
import cors from 'cors'
import { requireAuth } from "./middlewares/auth.middleware";

const app = express()
const port = process.env.PORT

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
}));

app.all("/api/auth/{*any}", toNodeHandler(auth));

app.use(express.json());

app.get("/", (req, res) => {
    res.send("hello")
})

app.listen(port, () => {
    console.log(`The server started at port ${port}`)
})