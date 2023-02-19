import { Router } from "express"
import { loginController } from "../controller/login.controller"

export const loginRoutes: Router = Router()

loginRoutes.post("", loginController)
