import { Request, Response, NextFunction } from "express"
import "dotenv"
import format from "pg-format"
import { client } from "../database/config.database"
import { requestUserSchema } from "../schema/users.schema"
import { QueryResult } from "pg"

export async function verifyAdmin (request: Request, response: Response, next: NextFunction){
    const queryString: string = format(`
        SELECT
            *
        FROM
            "users"
        WHERE
            "id" = %s
    `,
        request.user.id
    )
    const queryResult: QueryResult = await client.query(queryString)
    request.user = requestUserSchema.parse(queryResult.rows[0])

    next()
}