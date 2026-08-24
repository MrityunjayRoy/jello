import express, { Router } from "express"

const router = Router()

router.route("/login").post(authController)

