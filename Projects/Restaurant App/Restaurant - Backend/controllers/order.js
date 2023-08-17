const Order = require('../models/orders');

// For retrieving all orders from the database or table
exports.getOrder = async (req, res, next) => {
  const orders = await Order.findAll();
  // Sending data from back-end to front-end in the form of json data
  res.status(201).json({ orders: orders });
};

// For adding a new order into the table or database
exports.addOrder = async (req, res, next) => {
  const price = req.body.price;
  const dish = req.body.dish;
  const table = req.body.table;

  const order = await Order.create({
    price: price,
    dish: dish,
    table: table,
  });

  res.status(201).json({ newOrder: order });
};

// For deleting an existing order using its order id and again sending the updated order data from the table or database
exports.deleteOrder = async (req, res, next) => {
  const orderId = req.params.orderId;
  await Order.findByPk(orderId)
    .then((order) => {
      return order.destroy();
    })
    .then(() => console.log("Deleted!"))
    .catch((err) => console.log(err));
  // Fetching all updated order from the table or database
  const orders = await Order.findAll();
  res.status(201).json({ orders: orders });
};
