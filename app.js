//loading the modules required
const mongoose = require('mongoose')
const userrouter = require('./src/routes/userroute')
const listrouter = require('./src/routes/listrouter')
const cookieParser = require('cookie-parser')
const methodOverride = require('method-override')
const path = require('path')
const express = require('express')
const app = express()

mongoose.connect('mongodb://127.0.0.1:27017/main-task', {
    useCreateIndex: true, useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false
})


app.use(methodOverride('_method'))
app.use(express.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname, 'public/')))
app.set("view engine", "ejs")
//Setting up our route
app.use(express.json())
app.use(cookieParser())
app.use(userrouter)
app.use(listrouter)



app.get("*", (req, res)=>{
    res.send("as")
})

//Setting up the port to listen to
const port = process.env.PORT || 3000
app.listen(port, (req, res)=>{
    console.log('app is up and running')
})