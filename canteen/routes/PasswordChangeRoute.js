const express = require('express')
const router = express.Router()

const {canteenPasswordChange} = require('../controllers/PasswordChange')

router.route('/:email').post(canteenPasswordChange)



module.exports = router
