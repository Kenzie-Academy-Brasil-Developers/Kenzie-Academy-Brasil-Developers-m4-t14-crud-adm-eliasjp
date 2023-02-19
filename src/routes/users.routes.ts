import { Router } from "express"
import { createUserController, deactivateUserController, patchUserController, reactivateUserController, readAllProfilesController, readLoggedUserController } from "../controller/users.controller"
import { decodeTokenMiddleware } from "../middleware/decodeToken.middleware"
import { verifyAdmin } from "../middleware/verifyAdmin.middleware"

export const usersRoutes: Router = Router()

usersRoutes.post("", createUserController)
usersRoutes.get("", decodeTokenMiddleware, verifyAdmin, readAllProfilesController)
usersRoutes.get("/profile", decodeTokenMiddleware, verifyAdmin, readLoggedUserController)
usersRoutes.patch("/:id", decodeTokenMiddleware, verifyAdmin, patchUserController)
usersRoutes.delete("/:id", decodeTokenMiddleware, verifyAdmin, deactivateUserController)
usersRoutes.put("/:id/recover", decodeTokenMiddleware, verifyAdmin, reactivateUserController)
