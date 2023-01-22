import fileUpload from "express-fileupload"
import mongoose from "mongoose"
import express from "express"
import dotenv from "dotenv"
import cors from "cors"

import example from "./routes/example.js"

dotenv.config()
const app = express()

// Middleware
app.use(express.json())
app.use(fileUpload())
app.use(cors())

// Request Logs
app.use((req, res, next) => {
    console.log(req.method, ": ", req.path)
    next()
})

// Routes
app.use('/example', example)

mongoose.connect(process.env.MONGO_URI)

app.listen(process.env.PORT, () => {
    console.log(`Connected to Database. App started @ ${process.env.PORT}...`)
})