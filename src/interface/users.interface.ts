import { createUserSchema, omitUserPassword, patchUserSchema } from "../schema/users.schema"
import { z } from "zod"

export type ICreateUserRequest = z.infer<typeof createUserSchema>

export type IReturnUserWithoutPassword = z.infer<typeof omitUserPassword>

export type IPatchTyping = z.infer<typeof patchUserSchema>