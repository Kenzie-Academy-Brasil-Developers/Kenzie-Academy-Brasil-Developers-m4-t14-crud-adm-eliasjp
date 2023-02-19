import format from "pg-format";
import { client } from "../../database/config.database";
import { IReturnUserWithoutPassword } from "../../interface/users.interface";
import { omitUserPassword } from "../../schema/users.schema";


export async function readLoggedUserService (data: any): Promise<IReturnUserWithoutPassword>{
    const queryString = format(`
        SELECT
            *
        FROM
            "users"
        WHERE
            "id" = %s
    `,
        data.user.id
    )
    const queryResult = await client.query(queryString)

    return omitUserPassword.parse(queryResult.rows[0])
}