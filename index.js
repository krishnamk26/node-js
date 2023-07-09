const express = require('express')
const app = express()
const dotenv = require('dotenv')
dotenv.config()
const PORT = process.env.PORT
const indexRouter = require('./route/index')
const userRouter = require('./route/user')

app.use(express.json())
app.use('/',indexRouter)
app.use('/user',userRouter)

app.listen(PORT,()=>console.log("App is Listening port "+PORT))