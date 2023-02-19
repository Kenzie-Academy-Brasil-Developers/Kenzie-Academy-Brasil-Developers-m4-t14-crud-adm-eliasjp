import { loginRequestSchema } from "../schema/login.schema"
import { z } from "zod"

export type ILoginRequest = z.infer<typeof loginRequestSchema>