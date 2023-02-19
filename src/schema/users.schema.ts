import { hashSync } from "bcryptjs"
import { z } from "zod"
import { AppError } from "../errors/handleError"

export const createUserSchema = z.object({
    name: z.string().max(20),
    email: z.string().email().max(100),
    password: z.string().max(120).transform((pass) => hashSync(pass, 10)),
    admin: z.boolean().optional()
})

export const patchUserSchema = z.object({
    name: z.string().max(20).optional(),
    email: z.string().email().max(100).optional(),
    password: z.string().max(120).optional().transform((pass) => { 
        if (pass){ 
            return hashSync(pass!, 10)
        }
    })
}).refine((validation) => {
    if (Object.keys(validation).length === 0){
       throw new AppError("Properties are empty.", 400)
    }
    return validation
})

export const requestUserSchema = z.object({
    id: z.number(),
    admin: z.boolean()
})

export const returnUserSchema = createUserSchema.extend({
    id: z.number(),
})

export const omitUserPassword = returnUserSchema.omit({password: true})