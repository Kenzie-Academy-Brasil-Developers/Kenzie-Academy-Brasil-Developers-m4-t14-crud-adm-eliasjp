import { Request, Response, NextFunction } from "express"
import "dotenv"
import format from "pg-format"
import { client } from "../database/config.database"
import { requestUserSchema } from "../schema/users.schema"
import { QueryResult } from "pg"
import { AppError } from "../errors/handleError"

export async function checkExistance (request: Request, response: Response, next: NextFunction){
    const queryString: string = format(`
        SELECT
            *
        FROM
            "users"
        WHERE
            "id" = %s
    `,
        request.params.id
    )
    const queryResult: QueryResult = await client.query(queryString)
    if (!queryResult.rows[0]){
        throw new AppError("User not found.", 404)
    }

    next()
}