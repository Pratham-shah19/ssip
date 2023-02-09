const express = require("express");
const authenticationMiddleware = require("../middleware/authentication");
const router = express.Router();

const {
  lastReportGeneration,
  thisReportGeneration,
  deletebtn,
  resetWallet,
  addDish,
  modifyQuantity,
  getCurrentOrders,
  getHistoryOrders,
  getUser,
  getAllDish,
  getDish,
  modifyDish,
  fetchAllCanteen,
  getUserByEmail,
  addOrder,
  updateCanteenDetails,
  guestCompletedButton,
  dishFilter,
  dishCategory,

} = require("../controllers/CanteenController");

router.route("/order/current").get(authenticationMiddleware, getCurrentOrders);
router.route("/order/history").get(authenticationMiddleware, getHistoryOrders);
router.route("/user/:uid").post(authenticationMiddleware, getUser);
router.route("/dish").get(authenticationMiddleware, getAllDish);
router.route("/dish/adddish").post(authenticationMiddleware, addDish);
router.route("/dish/:did").post(authenticationMiddleware, getDish);
router.route("/modifydish/:did").patch(authenticationMiddleware, modifyDish);
router.route("/").post(authenticationMiddleware, fetchAllCanteen);
router
  .route("/user/email/:email")
  .post(authenticationMiddleware, getUserByEmail);
router.route("/addorder").post(authenticationMiddleware, addOrder);
router
  .route("/updatecanteendetails")
  .post(authenticationMiddleware, updateCanteenDetails);
router
  .route("/guestcompletedbutton/:oid")
  .post(authenticationMiddleware, guestCompletedButton);
router.route("/dishes/filter").post(authenticationMiddleware, dishFilter);
router.route("/dishes/category").post(authenticationMiddleware, dishCategory);
router
  .route("/modifyquantity/:did")
  .post(authenticationMiddleware, modifyQuantity);
router.route("/deletebtn/:did").get(authenticationMiddleware, deletebtn);
router.route("/resetwallet").get(authenticationMiddleware, resetWallet);
router.route("/lastMonthReport").get(lastReportGeneration);
router.route("/thisMonthReport").get(thisReportGeneration);

module.exports = router;