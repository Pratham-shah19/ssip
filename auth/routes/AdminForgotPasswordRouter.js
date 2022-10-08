const express = require('express')
const router = express.Router()

const {forgotPasswordAdmin} = require('../controllers/Admin')

router.route('/').patch(forgotPasswordAdmin)


module.exports = router