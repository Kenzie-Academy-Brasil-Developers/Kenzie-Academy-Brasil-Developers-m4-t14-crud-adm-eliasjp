import { QueryResult } from "pg"
import format from "pg-format"
import { client } from "../../database/config.database"
import { AppError } from "../../errors/handleError"

export async function reactivateUserService (data: any): Promise<void>{
    if (!data.user.admin && Number(data.params.id) !== data.user.id){
        throw new AppError("Insufficient Permission.", 403)
    }

    const checkActivateString: string = format(`
        SELECT
            *
        FROM
            "users"
        WHERE
            "id" = %s;
    `,
        data.params.id
    )
    const checkActivateResult = await client.query(checkActivateString)

    if (checkActivateResult.rows[0].active){
        throw new AppError("User already activate.", 400)
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