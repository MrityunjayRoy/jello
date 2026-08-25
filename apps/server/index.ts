import { toNodeHandler } from "better-auth/node";
import {auth} from "auth/client"
import express from "express";
import cors from 'cors'

const app = express()
const port = process.env.PORT

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,        // required for the session cookie
}));

app.all("/api/auth/{*any}", toNodeHandler(auth));

// Mount body-parsing middleware after the Better Auth handler.
app.use(express.json());

app.get("/", (req, res) => {
    res.send("hello")
})

app.listen(port, () => {
    console.log(`The server started at port ${port}`)
})