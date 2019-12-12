const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

mongoose.set('useCreateIndex', true)

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true
    },
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true
    },
    password: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true,
    collection: 'users'
  }
)

// authenticate input against database
UserSchema.statics.authenticate = function (email, password, callback) {
  const user = this
  user.findOne({ email }).exec(function (err, user) {
    if (err) {
      return callback(err)
    } else if (!user) {
      err = new Error('User not found.')
      err.status = 401
      return callback(err)
    }
    bcrypt.compare(password, user.password, function (err, result) {
      if (err) {
        return callback(err)
      } else if (result === true) {
        return callback(null, user)
      } else {
        return callback()
      }
    })
  })
}

// hashing a password before saving it to the database
UserSchema.pre('save', function (next) {
  const user = this
  bcrypt.hash(user.password, 10, function (err, hash) {
    if (err) {
      return next(err)
    }
    user.password = hash
    next()
  })
})

module.exports = mongoose.model('User', UserSchema)
