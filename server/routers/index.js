const router = require('express').Router()
const Controller = require('../controllers')
const authen = require('../middleware/authenticate')

router.post('/register',Controller.register)
router.post('/login',Controller.login)
router.post('/favorites',authen,Controller.addFav)
router.get('/getall',authen,Controller.getAll)





module.exports = router