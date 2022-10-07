const express = require('express')
const { validateOTP,getSpecificOrders, updatePassword,getAdminDetails,getSpecificCustomers,getCanteenDetails } = require('../controllers/adminController')
const router = express.Router()
const authenticationMiddleware = require('../middleware/authentication')

router.route('/customers').get(authenticationMiddleware,getSpecificCustomers)
router.route('/orders').get(authenticationMiddleware,getSpecificOrders);
router.route('/:email').get(authenticationMiddleware,getAdminDetails)
router.route('/:canteen/details').get(authenticationMiddleware,getCanteenDetails)
router.route('/:email/validateOTP').post(validateOTP);
router.route('/:email/updatePassword').patch(updatePassword);

module.exports = router
