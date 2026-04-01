const dotenv = require('dotenv')
dotenv.config()
const express = require('express')
const cors = require('cors')
const connectToDb = require('./db/db')
const app = express()
const userRoutes = require('./routes/user.routes')

connectToDb()

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/', (req, res) => {
    res.send("Hello World")
})

app.use('/user', userRoutes)


module.exports = app;