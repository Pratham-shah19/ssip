const express = require('express')
const { validatePaymentOtp,getUserDetails ,getBalance,getOrdersSpecific,getAllDishes,getFilteredDishes,getDishesCategorized,addToCart,getCart,canPayWallet,payCanteen,addRating,updateUserDetails,updatePassword,validateOTP} = require('../controllers/usercontroller')
const router = express.Router()
const authenticationMiddleware = require('../middleware/authentication')



router.route('/orders').get(authenticationMiddleware,getOrdersSpecific) //orders of specific status

router.route('/dishes').get(authenticationMiddleware,getAllDishes) // all the dishes
router.route('/dishes/filter').get(authenticationMiddleware,getFilteredDishes) // filter includes both search and sort
router.route('/dishes/category').get(getDishesCategorized)//category wise dishes 
router.route('/dishes/rating').post(authenticationMiddleware,addRating)

router.route('/:uid').get(authenticationMiddleware,getUserDetails).post(authenticationMiddleware,updateUserDetails)
router.route('/:email/updatePassword').patch(updatePassword)//update passwordusing emailllll
router.route('/:uid/wallet').get(authenticationMiddleware,getBalance)
router.route('/:email/validateOtp').post(validateOTP)

router.route('/:uid/cart').patch(authenticationMiddleware,addToCart).get(authenticationMiddleware,getCart)

router.route('/:uid/payWallet').get(authenticationMiddleware,canPayWallet).post(authenticationMiddleware,payCanteen)
router.route('/:uid/validatePaymentOtp').post(validatePaymentOtp)

module.exports = router
