const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { bcrypt } = require('../helpers')

let userSchema = new Schema({
    email: {
        type: String,
        validate: [
            {
                validator: function (value) {
                    return mongoose.model('Users', userSchema).find({
                        _id: {
                            $ne: this._id
                        },
                        email: value
                    })
                        .then(data => {
                            if (data.length !== 0) {
                                return false
                            }
                        })
                        .catch(err => {
                            return err.message
                        })
                },
                message: 'email sudah digunakan'
            }
        ]
    },
    password: String
})

userSchema.pre('save', function (next) {
    this.password = bcrypt.hash(this.password)
    this.email = this.email.toLowerCase()
    next()
})

const User = mongoose.model('Users', userSchema)

module.exports = User