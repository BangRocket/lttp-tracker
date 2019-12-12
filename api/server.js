const express = require('express')
const session = require('express-session')
const bodyParser = require('body-parser')
// const MongoStore = require('connect-mongo')

// create express app
const app = express()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse application/json
app.use(bodyParser.json())

// Configuring the database
const mongoose = require('mongoose')
const dbConfig = require('./config/database.config.js')

mongoose.Promise = global.Promise

// Connecting to the database
mongoose
  .connect(dbConfig.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('Successfully connected to the database')
  })
  .catch((err) => {
    console.log('Could not connect to the database. Exiting now...', err)
    process.exit()
  })

// use sessions for tracking logins
app.use(
  session({
    secret: 'chocolate penguin',
    resave: true,
    saveUninitialized: false
  })
)

require('./routes/tracker.routes.js')(app)
require('./routes/user.routes.js')(app)

// // listen for requests
// app.listen(3001, () => {
//   console.log('Server is listening on port 3001')
// })

// Export the server middleware.
module.exports = {
  path: '/', // This will be your api prefix (ex: 'localhost:3000/api'). Use '/' to not have one.
  handler: app // Your Express instance.
}
