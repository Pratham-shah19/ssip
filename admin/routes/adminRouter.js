const express = require("express");
const {
  getCustomersLength,
  validateCashotp,
  payCanteen,
  validateOTP,
  getSpecificOrders,
  updatePassword,
  getAdminDetails,
  getSpecificCustomers,
  getCanteenDetails,
  thisReportGeneration,
  lastReportGeneration,
  fullfillAdminPayment
} = require("../controllers/adminController");
const router = express.Router();
const authenticationMiddleware = require("../middleware/authentication");

router.route("/thismonthreport").get(thisReportGeneration);
router.route("/lastmonthreport").get(lastReportGeneration);
router.route("/customers").get(authenticationMiddleware, getSpecificCustomers);
router
  .route("/totalcustomers")
  .get(authenticationMiddleware, getCustomersLength);

router.route("/orders").get(authenticationMiddleware, getSpecificOrders);
router.route("/:email").get(authenticationMiddleware, getAdminDetails);
router
  .route("/:canteen/details")
  .get(authenticationMiddleware, getCanteenDetails);


router.route("/:email/validateOTP").post(validateOTP);
router.route("/:email/updatePassword").patch(updatePassword);
router.route("/fullfillpayment").get(fullfillAdminPayment)
router.route("/payCanteen").post(authenticationMiddleware, payCanteen);
router
  .route("/validateCashotp")
  .post(authenticationMiddleware, validateCashotp);

module.exports = router;
