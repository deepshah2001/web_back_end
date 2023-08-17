const Users = require("../models/signup.js");

exports.addUser = async (req, res, next) => {
  const userName = req.body.userName;
  const email = req.body.email;
  const password = req.body.password;

  const emailExists = await Users.findOne({ where: { email: email } });
  if (emailExists) {
    res.status(403).json({ error: "Email already Exists!" });
  } else {
    const user = await Users.create({
      name: userName,
      email: email,
      password: password,
    });

    res.status(201).json({ newUser: user });
  }
};
