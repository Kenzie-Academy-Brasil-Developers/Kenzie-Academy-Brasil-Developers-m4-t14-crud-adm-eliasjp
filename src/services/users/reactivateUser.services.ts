import { QueryResult } from "pg"
import format from "pg-format"
import { client } from "../../database/config.database"
import { AppError } from "../../errors/handleError"

export async function reactivateUserService (data: any): Promise<void>{
    if (!data.user.admin){
        throw new AppError("Insufficient Permission.", 403)
    }

    const queryString: string = format(`
        UPDATE
            "users"
        SET
            "active" = TRUE
        WHERE
            "id" = %s
        RETURNING
            *;
    `,
        data.params.id
    )
    const queryResult: QueryResult = await client.query(queryString)

    return queryResult.rows[0]
}