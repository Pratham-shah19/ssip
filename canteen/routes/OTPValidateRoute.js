const express = require('express')
const router = express.Router()

const {canteenOTPValidate} = require('../controllers/OTPValidate')

router.route('/:email').post(canteenOTPValidate)



module.exports = router