const express = require('express')
const router = express.Router()

const {addDish,getCurrentOrders,getHistoryOrders,getUser,getAllDish,getDish,modifyDish,fetchAllCanteen,getUserByEmail,addOrder,updateCanteenDetails,guestCompletedButton,dishFilter,dishCategory} = require('../controllers/CanteenController')

router.route('/order/current').post(getCurrentOrders)
router.route('/order/history').post(getHistoryOrders)
router.route('/user/:uid').post(getUser)
router.route('/dish').post(getAllDish)
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


module.exports = router
