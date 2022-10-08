const express = require('express')
const router = express.Router()

const {forgotPasswordUser} = require('../controllers/User')

router.route('/').patch(forgotPasswordUser)


module.exports = router