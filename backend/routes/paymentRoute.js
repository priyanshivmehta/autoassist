const express=require("express");
const router=express.Router();
const {checkout, paymentVerification}=require("../controller/paymentController");

router.route("/checkout").post(checkout);
router.route("/paymentverification").post(paymentVerification);

module.exports = router;