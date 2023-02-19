import { Request } from "express"
import { QueryResult } from "pg"
import { client } from "../../database/config.database"
import { AppError } from "../../errors/handleError"


export async function readAllProfilesService (request: Request){
    if (!request.user.admin){
        throw new AppError("Insufficient Permission.", 403)
    }

    const queryString: string = `
        SELECT
            id, name, email, admin, active
        FROM
            "users" AS u
        ORDER BY
            "id" ASC;
    `
    const queryResult: QueryResult = await client.query(queryString)

    return queryResult.rows
}