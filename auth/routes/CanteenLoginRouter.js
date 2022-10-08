const express = require('express')
const router = express.Router()

const {loginCanteen} = require('../controllers/Canteen')

router.route('/').post(loginCanteen)


module.exports = router