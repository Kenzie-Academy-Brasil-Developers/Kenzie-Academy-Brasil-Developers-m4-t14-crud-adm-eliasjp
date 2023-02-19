import { z } from "zod"

export const loginRequestSchema = z.object({
    email: z.string().max(100),
    password: z.string().max(120)
})