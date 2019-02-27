const express = require('express')
const path=require('path')
const app = express()
const bodyParser = require('body-parser')
const con=require('./db/connenct')
const uploadFile = require("./router/uploadRouter")
const foodRouter = require("./router/foodRouter")
const userRouter = require("./router/userRouter")
const utils = require("./utils/util")

app.use(bodyParser.json())  //json解析器
app.use(bodyParser.urlencoded({extended:true}))  //x-www-form-urlencoded解析器
app.use('/static', express.static(path.join(__dirname, './public')))

app.use('/select/upload',uploadFile)
app.use('/select/food',utils.verify,foodRouter)
app.use('/select/user',userRouter)

app.listen(3000,()=>{
    console.log('服务器启动 prot：'+3000)
})
