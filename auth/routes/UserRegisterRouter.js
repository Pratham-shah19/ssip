const express = require('express')
const router = express.Router()

const {registerUser} = require('../controllers/User')

router.route('/').post(registerUser)


module.exports = router