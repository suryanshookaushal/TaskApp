//loading the modules required
const mongoose = require('mongoose')
const userrouter = require('./src/routes/userroute')
const listrouter = require('./src/routes/listrouter')
const taskrouter = require('./src/routes/taskrouter')
const cookieParser = require('cookie-parser')
const flash = require('connect-flash')
const session = require('express-session')
const methodOverride = require('method-override')
const path = require('path')
const express = require('express')
const app = express()

mongoose.connect('mongodb://suryanshoo:anshooman@cluster0-shard-00-00.dqyqt.mongodb.net:27017,cluster0-shard-00-01.dqyqt.mongodb.net:27017,cluster0-shard-00-02.dqyqt.mongodb.net:27017/main-task?ssl=true&replicaSet=cluster0-shard-0&authSource=admin&retryWrites=true&w=majority', {
    useCreateIndex: true, useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false
})


app.use(methodOverride('_method'))
app.use(express.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname, "/public")))
app.set("view engine", "ejs")
//Setting up our route
app.use(express.json())
app.use(cookieParser())
app.use(session({
    secret: 'secret',
    cookie: {maxAge: 60000},
    resave: false,
    saveUninitialized: false
}))
app.use(flash())
app.use(userrouter)
app.use(listrouter)
app.use(taskrouter)



app.get("*", (req, res)=>{
    res.send("as")
})

//Setting up the port to listen to
const port = process.env.PORT || 3000
app.listen(port, (req, res)=>{
    console.log('app is up and running')
})