const express=require("express");
const router=express.Router();
const {checkout, paymentVerification}=require("../controller/paymentController");

router.route("/payment/checkout").post(checkout);
router.route("/payment/paymentverification").post(paymentVerification);

module.exports = router;