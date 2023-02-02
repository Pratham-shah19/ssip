const express = require('express')
const router = express.Router()

const {paymentsheet,webhook} = require('../controllers/payments')

router.route('/payment-sheet').post(paymentsheet)
router.route('/webhook').post(webhook)

module.exports = router
