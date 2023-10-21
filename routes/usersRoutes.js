const Router = require('express')
const router = new Router()
const controller = require('../controllers/userController')

router.get('/allusers', controller.getAllUsers)
router.post('/register', controller.registration)
router.post('/login', controller.login)

module.exports = router