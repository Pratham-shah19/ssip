const { application, json } = require('express')
const express = require('express')
const router = express.Router()

const {paymentsheet,createcheckoutsession, completeOnlinePayment} = require('../controllers/payments')

router.route('/payment-sheet').post(paymentsheet)
router.route('/create-checkout-session').post(createcheckoutsession);
router.route('/:uid/place-online-order').post(completeOnlinePayment)

module.exports = router
