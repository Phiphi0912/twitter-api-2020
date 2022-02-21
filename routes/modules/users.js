const express = require('express')
const router = express.Router()
const { authenticated } = require('../../helpers/auth')

const userController = require('../../controllers/user-controllers')

router.post('/login', userController.login)
router.get('/:id', authenticated, userController.getUser)
router.post('/', userController.register)

module.exports = router
