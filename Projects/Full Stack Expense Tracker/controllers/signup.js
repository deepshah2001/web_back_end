const Users = require("../models/signup.js");

// For handling all signup scenarios for a user
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

// For handling all login scenarios for a user
exports.existingUser = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  const emailExists = await Users.findOne({ where: { email: email } });

  if (emailExists) {
    if (password === emailExists.password) {
      res.status(201).json({ message: "Logged in successfully!" });
    } else {
      res.status(401).json({ error: "Password Incorrect!" });
    }
  } else {
    res.status(404).json({ error: "User Not Found!" });
  }
};
