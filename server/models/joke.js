const mongoose = require('mongoose')
const Schema = mongoose.Schema

let jokeSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    joke: String,

})

const Joke = mongoose.model('Jokes', jokeSchema)

module.exports = Joke