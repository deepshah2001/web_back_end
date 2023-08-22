const Razorpay = require("razorpay");

const Order = require("../models/order");

require("dotenv").config();

// For checking if the particular user is premium or not
const isPremium = async (req, res, next) => {
  return res.status(201).json({ premium: req.user.isPremium });
};

// For creating a new order for payment handling using razorpay
const purchasePremium = async (req, res, next) => {
  try {
    var rzp = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const options = {
      amount: 2500,
      currency: "INR",
    };

    // creating new data entry into database
    rzp.orders.create(options, (err, order) => {
      if (err) {
        throw new Error(JSON.stringify(err));
      }
      req.user
        .createOrder({ orderid: order.id, status: "PENDING" })
        .then(() => {
          return res.status(201).json({ order, key_id: rzp.key_id });
        })
        .catch((err) => {
          throw new Error(err);
        });
    });
  } catch (err) {
    console.log(err);
    return res
      .status(403)
      .json({ message: "Something Went Wrong!", error: err });
  }
};

// updating the status after the payment has completed i.e. failed or success
const updateStatus = async (req, res, next) => {
  try {
    const { order_id, payment_id, status } = req.body;
    console.log("--------------------", order_id, payment_id, status);

    const order = await Order.findOne({ where: { orderid: order_id } });

    if (!order) {
      return res.status(404).send("Order not found");
    }

    order
      .update({ paymentid: payment_id, status: status })
      .then(() => {
        return res
          .status(202)
          .json({ success: true, message: "Transaction Successful!" });
      })
      .catch((err) => {
        throw new Error(err);
      });

    if (status === "SUCCESS") {
      await req.user.update({ isPremium: true });
    }
  } catch (err) {
    console.log("-------------------------------------", err);
  }
};

module.exports = {
  isPremium,
  purchasePremium,
  updateStatus,
};
