const Router = require('express')
const router = new Router()
const authMiddleware = require('../middleware/authMiddleware')
const controller = require('../controllers/userController')

router.get('/allusers',authMiddleware, controller.getAllUsers)
router.get('/userinfo',authMiddleware, controller.getUserInfo)
router.post('/register', controller.registration)
router.post('/login', controller.login)

module.exports = router