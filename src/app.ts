require("express-async-errors")
import express, { Application } from "express"
import { handleError } from "./errors/handleError"
import { loginRoutes } from "./routes/login.routes"
import { usersRoutes } from "./routes/users.routes"

export const app: Application = express()
app.use(express.json())

app.use("/users", usersRoutes)
app.use("/login", loginRoutes)

app.use(handleError)