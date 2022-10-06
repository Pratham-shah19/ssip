const express = require('express')
const { validateOTP,getSpecificOrders, updatePassword,getAdminDetails,getSpecificCustomers,getCanteenDetails } = require('../controllers/adminController')
const router = express.Router()

router.route('/customers').get(getSpecificCustomers)
router.route('/orders').get(getSpecificOrders);
router.route('/:email').get(getAdminDetails)
router.route('/:canteen/details').get(getCanteenDetails)
router.route('/:email/validateOTP').post(validateOTP);
router.route('/:email/updatePassword').patch(updatePassword);

module.exports = router
