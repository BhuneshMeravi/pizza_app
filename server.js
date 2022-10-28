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
// const MongoDbStore = require('connect-mongo')

//Database connection

mongoose.connect("mongodb://localhost/pizza", {useNewUrlParser: true});
const connection = mongoose.connection;
connection.once('open', function () {
  console.log('MongoDB running');
}).on('error', function (err) {
  console.log(err);
});

// Session store
// new MongoDbStore({
//   mongooseConnection: connection,
//   collection: 'sessions'
// })

// Session config
app.use(require('express-session')({
  secret: process.env.COOKIE_SECRET,
  resave: false,
  saveUninitialized: true,
  // store: MongoStore.create({
  //   mongoUrl: process.env.MONGODB_URI,
  // }),
  cookie: { maxAge: 1000 * 60 * 60 * 24 } // 24 hour
}))



app.use(flash())
//assets
app.use(express.static('public'))
app.use(express.json())
//set template engine
app.use(expressLayout)
app.set('views',path.join(__dirname,'/resources/views'))
app.set('view engine','ejs')

require('./routes/web')(app)

app.listen(PORT,() => {
    console.log(`Listen on port ${PORT}`)
})