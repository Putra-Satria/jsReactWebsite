import pg from "pg"
import env from "dotenv"

env.config()

const requiredEnvVars = ["PG_USER", "PG_HOST", "PG_DATABASE", "PG_PORT", "PG_PASSWORD"]

requiredEnvVars.forEach((varName) => {
    if(!process.env[varName]) {
        console.log(`Missing the required env variables: ${varName}`)
        process.exit(1)
    } 
})

const DB = new pg.Pool({
    user: process.env.PG_USER, 
    host: process.env.PG_HOST, 
    database: process.env.PG_DATABASE, 
    port: process.env.PG_PORT, 
    password: process.env.PG_PASSWORD, 

})

DB.connect()
    .then(() => console.log("Connected successfully with the database, my friend!"))
    .catch((err) => {
        console.log("Cannot connected with the database", err)
        process.exit(1)
    })

DB.on("error", (err) => {
    console.log("Database error: ", err)
    process.exit(1)
})

export const query = (text, params) => DB.query(text, params)