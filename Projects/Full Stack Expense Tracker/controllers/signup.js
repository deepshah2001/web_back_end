const Users = require("../models/signup.js");

exports.addUser = async (req, res, next) => {
  const userName = req.body.userName;
  const email = req.body.email;
  const password = req.body.password;

  const user = await Users.create({
    name: userName,
    email: email,
    password: password,
  });

  res.status(201).json({ newUser: user });
};
