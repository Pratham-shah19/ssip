const express = require('express')
const router = express.Router()

const {deletebtn,resetWallet,addDish,modifyQuantity,getCurrentOrders,getHistoryOrders,getUser,getAllDish,getDish,modifyDish,fetchAllCanteen,getUserByEmail,addOrder,updateCanteenDetails,guestCompletedButton,dishFilter,dishCategory} = require('../controllers/CanteenController')

router.route('/order/current').get(getCurrentOrders)
router.route('/order/history').get(getHistoryOrders)
router.route('/user/:uid').post(getUser)
router.route('/dish').get(getAllDish)
router.route('/dish/adddish').post(addDish)
router.route('/dish/:did').post(getDish)
router.route('/modifydish/:did').patch(modifyDish)
router.route('/').post(fetchAllCanteen)
router.route('/user/email/:email').post(getUserByEmail)
router.route('/addorder').post(addOrder)
router.route('/updatecanteendetails').post(updateCanteenDetails)
router.route('/guestcompletedbutton/:oid').post(guestCompletedButton)
router.route('/dishes/filter').post(dishFilter)
router.route('/dishes/category').post(dishCategory)
router.route('/modifyquantity/:did').post(modifyQuantity)
router.route("/deletebtn/:did").get(deletebtn)
router.route('/resetwallet').get(resetWallet)



module.exports = router
