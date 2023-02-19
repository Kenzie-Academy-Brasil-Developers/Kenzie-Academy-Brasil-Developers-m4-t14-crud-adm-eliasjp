import { app } from "./app"
import { startDatabase } from "./database/connection.databse"

app.listen(3000, async () => {
    await startDatabase()
    console.log("Server running.")
})