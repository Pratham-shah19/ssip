const express = require('express')
const { validateOTP, updatePassword,getAdminDetails,getSpecificCustomers,getCanteenDetails } = require('../controllers/adminController')
const router = express.Router()

router.route('/customers').get(getSpecificCustomers)
router.route('/:email').get(getAdminDetails)
router.route('/:canteen').get(getCanteenDetails)
router.route('/:email/validateOTP').post(validateOTP);
router.route('/:email/updatePassword').patch(updatePassword);

module.exports = router
