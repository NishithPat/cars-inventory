require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')

const PORT = process.env.PORT || 9890;

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))

app.use(express.json())

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000")
    res.header(
        "Access-Control-Allow-Headers",
        "*" //"Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.header("Access-Control-Allow-Methods", "GET,PUT,PATCH,POST,DELETE,OPTIONS")
    next()
})

const carsRouter = require('./routes/cars')
app.use('/cars', carsRouter)

app.listen(PORT, () => console.log('Server Started'))