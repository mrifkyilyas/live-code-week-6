const User = require('../models/user')
const Joke = require('../models/joke')
const { bcrypt, jwt } = require('../helpers')
const baseUrl = `https://icanhazdadjoke.com/`

class UserController {
    static register(req, res) {
        const { email, password } = req.body
        User
            .create({
                email,
                password
            })
            .then(success => {
                res.status(201).json(success)
            })
            .catch(err => {
                res.status(500).json(err)

            })
    }

    static login(req, res) {
        // console.log('masuk')
        User.findOne({
            email: req.body.email
        })
            .then(user => {
                if (user && bcrypt.compare(req.body.password, user.password)) {
                    const payload = {
                        email: user.email,
                        id: user._id
                    }
                    //    console.log(payload)
                    const access_token = jwt.sign(payload)
                       console.log(access_token)
                    res.status(200).json({
                        access_token
                    })
                } else {
                    res.status(400).json({
                        message: 'Wrong Emailsss/Password'
                    })
                }
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }

    static addFav(req, res) {
        console.log()
        
        Joke
        .create({
            user:req.header.id,
            joke:req.body.joke
        })
        .then(success => {
            res.status(201).json(success)
        })
        .catch(err => {
            res.status(500).json(err)

        })      
    }

    static getAll(req,res){
        Joke.findAll({
            email:req.header.email
        })
        .then(success=>{
            res.status(200).json(success)
        })
        .catch(err=>{
            res.status(500).json(err)
        })
    }

}

module.exports = UserController