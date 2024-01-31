import express from "express";
import {PORT, mongoURL} from './config.js'
import mongoose from 'mongoose'
import bookRoute from './routes/bookRoute.js'
import cors from 'cors'

const app = express()

app.use(express.json())

app.use(cors())

app.use("/books", bookRoute)

mongoose.connect(mongoURL)
    .then(() => {
        console.log("Connection to Mongodb successful")
    })
    .catch((err) => {
        console.log(err)
    })

app.get("/", (req,res) => {
    console.log(req)
    return res.status(234).send("I just did my MERN Stack")
})

app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`)
})