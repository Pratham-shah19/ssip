const express = require('express')
const router = express.Router()

const {forgotPasswordCanteen} = require('../controllers/Canteen')

router.route('/').patch(forgotPasswordCanteen)


module.exports = router