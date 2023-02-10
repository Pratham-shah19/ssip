const { application, json } = require('express')
const express = require('express')
const router = express.Router()

const {paymentsheet,createcheckoutsession, completeOnlinePayment, completeOnlinePaymentSubscription} = require('../controllers/payments')

router.route('/payment-sheet').post(paymentsheet)
router.route('/create-checkout-session').post(createcheckoutsession);
router.route('/:uid/place-online-order').post(completeOnlinePayment)
router.route('/:uid/place-online-order-subscription').post(completeOnlinePaymentSubscription)


module.exports = router
