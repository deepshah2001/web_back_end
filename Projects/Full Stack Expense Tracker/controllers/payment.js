const Razorpay = require("razorpay");

const Order = require("../models/order");

const purchasePremium = async (req, res, next) => {
  try {
    var rzp = new Razorpay({
      // key_id: process.env.RAZORPAY_KEY_ID,
      // key_secret: process.env.RAZORPAY_KEY_SECRET
      key_id: "rzp_test_fDaQe8vbVk5GlS",
      key_secret: "avNbDhFz2G2UrbA243IEYniN",
    });

    const amount = 2500;

    rzp.orders.create({ amount, currency: "INR" }, (err, order) => {
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
    res.status(403).json({ message: "Something Went Wrong!", error: err });
  }
};

const updateStatus = async (req, res, next) => {
    try {
        const {payment_id, order_id} = req.body;
        Order.findOne({where: {orderid: order_id}})
            .then((order) => {
                order.update({paymentid: payment_id, status: "SUCCESSFUL"})
                    .then(() => {
                        req.user.update({isPremium: true})
                            .then(() => {
                                return res.send(200).json({success: true, message: "Transaction Successful!"});
                            })
                            .catch(err => {
                                throw new Error(err);
                            })
                    }).catch(err => {
                        throw new Error(err);
                    })
            }).catch(err => {
                throw new Error(err);
            });
    } catch(err) {
        console.log(err);
        res.status(403).json({message: "Something Went Wrong!", error: err});
    }
};

module.exports = {
  purchasePremium,
  updateStatus,
};
