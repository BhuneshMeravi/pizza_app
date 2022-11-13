require('dotenv').config()
const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000
const ejs = require('ejs')
const expressLayout = require('express-ejs-layouts')
const path = require('path')
const mongoose = require('mongoose')
const session = require('express-session')
const flash = require('express-flash')
const { json } = require('express')
const passport = require('passport')
const MongoDbStore = require('connect-mongo')(session)

//Database connection

mongoose.connect("mongodb://localhost/pizza", {useNewUrlParser: true});
const connection = mongoose.connection;
connection.once('open', function () {
  console.log('MongoDB running');
}).on('error', function (err) {
  console.log(err);
});

// Session store
const mongoStore = new MongoDbStore({
  mongooseConnection: connection,
  collection: 'sessions'
})

// Session config

app.use(session({
  secret: process.env.COOKIE_SECRET,
  resave: false,
  saveUninitialized: true,
  // store: MongoDbStore.create({
  //   mongoUrl: process.env.MONGODB_URI,
  // }),
  store: mongoStore,
  cookie: { maxAge: 1000 * 150 } // 24 hour
}))

//passport config
const passportInit = require('./app/config/passport')
app.use(passport.initialize())
app.use(passport.session())
passportInit(passport)



app.use(flash())
//assets
app.use(express.static('public'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

//Global middleware
app.use((req, res, next) => {
    res.locals.session = req.session
    res.locals.user = req.user
    next()
})

//set template engine
app.use(expressLayout)
app.set('views',path.join(__dirname,'/resources/views'))
app.set('view engine','ejs')

require('./routes/web')(app)

app.listen(PORT,() => {
    console.log(`Listen on port ${PORT}`)
})