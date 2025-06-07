const Razorpay =require("razorpay");
const crypto=require("crypto");
const {Payment}=require("../model/paymentModel");
const dotenv = require("dotenv");
dotenv.config();


const instance = new Razorpay({
    key_id: process.env.RAZORPAY_API_KEY,
    key_secret: process.env.RAZORPAY_API_SECRET,
  });

module.exports.checkout=async (req,res)=>{
    const options = {
        amount: Number(req.body.amount*100),  // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        currency: "INR",
        // receipt: "order_rcptid_11"
      };
      const order=await instance.orders.create(options);
      console.log(order);

      res.status(200).json({
        success:true,
        order,
      });
}

module.exports.paymentVerification=async (req,res)=>{
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =req.body;

  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_API_SECRET)
    .update(body.toString())
    .digest("hex");

  const isAuthentic = expectedSignature === razorpay_signature;

  if (isAuthentic) {
    try {
      // Database comes here
      await Payment.create({
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
      });

      res.status(200).json({
        success: true,
        message: "Payment verified successfully",
        payment_id: razorpay_payment_id
      });
    } catch (error) {
      console.error("Database error:", error);
      res.status(500).json({
        success: false,
        message: "Error saving payment details"
      });
    }
  } else {
    res.status(400).json({
      success: false,
      message: "Invalid payment signature"
    });
  }
}