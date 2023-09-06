const jwt = require("jsonwebtoken");

const User = require("../models/user");

require("dotenv").config();

const getVerified = async (req, res, next) => {
  try {
    const token = req.header("Authorization");

    // console.log(token);

    if (!token) {
      res.status(401).json({ status: false, message: "No Token Provided!" });
    }

    const user = jwt.verify(token, process.env.TOKEN_KEY);

    await User.findByPk(user.userId)
      .then((user) => {
        req.user = user;
        next();
      })
      .catch((err) => {
        console.log(err);
        res.status(403).json({ status: false, message: "User not found!" });
      });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: false, message: "Authentication Problem" });
  }
};

module.exports = {
  getVerified,
};
