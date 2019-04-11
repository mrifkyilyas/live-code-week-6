require('dotenv').config()
const express = require('express')
const app = express()
const port = 3000
const mongoose = require('mongoose')
const cors = require('cors')
const router = require('./routers')

mongoose.connect('mongodb://localhost/classic_fox_live_code_1',{useNewUrlParser:true})
app.use(cors())
app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use('/',router)

app.listen(port,()=>{
    console.log(`working on port ${port}`)
})