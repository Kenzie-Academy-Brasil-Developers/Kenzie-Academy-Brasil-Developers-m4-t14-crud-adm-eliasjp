import format from "pg-format"
import { client } from "../../database/config.database"
import { AppError } from "../../errors/handleError"
import { ICreateUserRequest } from "../../interface/users.interface"
import { createUserSchema } from "../../schema/users.schema"

export async function createUserService (data: ICreateUserRequest){
    const parsedData = createUserSchema.parse(data)

    const queryUniqueString = format(`
        SELECT
            *
        FROM
            "users" AS us
        WHERE
            "email" = '%s'; 
    `,
        parsedData.email
    )
    const queryUniqueResult = await client.query(queryUniqueString)

    if (queryUniqueResult.rows[0]){
        throw new AppError("Email already in use.", 409)
    }

    const queryCreateString = format(`
        INSERT INTO
            "users" (%I)
        VALUES
            (%L)
        RETURNING *;
    `,
        Object.keys(parsedData),
        Object.values(parsedData)
    )
    const queryCreateResult = await client.query(queryCreateString)
    
    return queryCreateResult.rows[0]
}