import format from "pg-format"
import { client } from "../../database/config.database"
import { AppError } from "../../errors/handleError"

export async function deactivateUserService (data: any): Promise<void>{
    if (!data.user.admin && data.user.id !== Number(data.params.id)){
        throw new AppError("Insufficient Permission.", 403)
    }

    const queryString: string = format(`
        UPDATE
            "users"
        SET
            "active" = FALSE
        WHERE
            "id" = %s;
    `,
        data.params.id
    )
    await client.query(queryString)
}