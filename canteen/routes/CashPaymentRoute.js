const express = require("express");
const router = express.Router();

const {
  adminRequest,
  canteenAccept,
  adminHistory,
  canteenView,
} = require("../controllers/CashPaymentController");

router.route("/adminHistory").get(adminHistory);
router.route("/adminRequest").get(adminRequest);
router.route("/canteenAccept/:pid").get(canteenAccept);
router.route("/canteenView").get(canteenView);

module.exports = router;
