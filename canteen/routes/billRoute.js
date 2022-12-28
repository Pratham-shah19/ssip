const express = require('express')
const router = express.Router()

const {billController} = require('../controllers/billController')

router.route('/:oid').get(billController)


module.exports = router