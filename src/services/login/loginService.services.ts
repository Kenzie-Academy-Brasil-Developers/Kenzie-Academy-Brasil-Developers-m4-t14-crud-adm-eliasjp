import { compare } from "bcryptjs"
import { sign } from "jsonwebtoken"

import { Request } from "express"
import { QueryResult } from "pg"
import format from "pg-format"
import "dotenv"

import { client } from "../../database/config.database"
import { AppError } from "../../errors/handleError"
import { loginRequestSchema } from "../../schema/login.schema"

export async function loginService (data: Request): Promise<string>{
    loginRequestSchema.parse(data.body)

    const queryString = format(`
        SELECT
            *
        FROM
            "users"
        WHERE
            "email" = '%s';
    `,
        data.body.email
    )
    const queryResult: QueryResult = await client.query(queryString)
    if (!queryResult.rows[0]){
        throw new AppError("Wrong email or password", 401)
    }

    const comparedPassword: boolean = await compare(data.body.password, queryResult.rows[0].password)
    if (!comparedPassword){
        throw new AppError("Wrong email or password", 401)
    }

    const token: string = sign(
        {
            email: data.body.email
        },
            String(process.env.SECRET_KEY),
        {
            expiresIn: "3min",
            subject: String(queryResult.rows[0].id)
        }
    )

    return token
}