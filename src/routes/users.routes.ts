import { Router } from "express"
import { createUserController, deactivateUserController, patchUserController, reactivateUserController, readAllProfilesController, readLoggedUserController } from "../controller/users.controller"
import { checkExistance } from "../middleware/checkExistance.middleware"
import { decodeTokenMiddleware } from "../middleware/decodeToken.middleware"
import { verifyAdmin } from "../middleware/verifyAdmin.middleware"

export const usersRoutes: Router = Router()

usersRoutes.post("", createUserController)
usersRoutes.get("", decodeTokenMiddleware, verifyAdmin, readAllProfilesController)
usersRoutes.get("/profile", decodeTokenMiddleware, verifyAdmin, readLoggedUserController)
usersRoutes.patch("/:id", decodeTokenMiddleware, verifyAdmin, checkExistance, patchUserController)
usersRoutes.delete("/:id", decodeTokenMiddleware, verifyAdmin, checkExistance, deactivateUserController)
usersRoutes.put("/:id/recover", decodeTokenMiddleware, verifyAdmin, checkExistance, reactivateUserController)
