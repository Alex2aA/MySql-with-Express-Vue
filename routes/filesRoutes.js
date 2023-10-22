const Router = require('express')
const router = new Router()
const controller = require('../controllers/fileController')
const authMiddleware = require("../middleware/authMiddleware")


router.post('/loadfile',authMiddleware, controller.loadFile)
router.get('/getfile',authMiddleware,controller.getFile)

module.exports = router