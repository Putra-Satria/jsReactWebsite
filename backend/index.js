import express from "express"
import bodyParser from "body-parser"
import cors from "cors"
import dotenv from "dotenv"
import employeeRoute from "./routes/employee.js"

dotenv.config()

const app = express()
const PORT = 3000

const cors_options = {
    origin: "*"
}

app.use(cors(cors_options))
app.use(bodyParser.json())


app.get("/Home", (req, res) => {
    res.send("Welcome to the homepage, my friend!")
})

app.listen(PORT, () => {
    console.log(`App is listening on port ${PORT}, my friend!`)
})

app.use("/api/employee", employeeRoute)
app.use(function(req, res) {
    res.status(404).json({error: "Not Found"})
})

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500
    const message = err.message || "Internal server errors"
    return res.status(statusCode).json({error: message})
})