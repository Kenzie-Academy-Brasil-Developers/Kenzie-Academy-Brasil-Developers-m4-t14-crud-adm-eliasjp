import { client } from "./config.database"

export async function startDatabase (){
    await client.connect()
    console.log("Database started")
}