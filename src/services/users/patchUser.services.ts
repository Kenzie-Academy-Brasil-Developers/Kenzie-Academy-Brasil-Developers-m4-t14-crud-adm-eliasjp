import { QueryResult } from "pg";
import format from "pg-format";
import { client } from "../../database/config.database";
import { AppError } from "../../errors/handleError";
import { IPatchTyping } from "../../interface/users.interface";
import { omitUserPassword, patchUserSchema } from "../../schema/users.schema";


export async function patchUserService (data: any){
    const parsedData: IPatchTyping = patchUserSchema.parse(data.body)

    if (!data.user.admin && data.user.id !== Number(data.params.id)){
        throw new AppError("Insufficient Permission.", 403)
    }

    const queryString: string = format(`
        UPDATE
            "users"
        SET
            (%I) = ROW (%L)
        WHERE
            "id" = %s
        RETURNING
            *;
    `,
        Object.keys(parsedData),
        Object.values(parsedData),
        data.params.id
    )
    const queryResult: QueryResult = await client.query(queryString)

    return omitUserPassword.parse(queryResult.rows[0])
}