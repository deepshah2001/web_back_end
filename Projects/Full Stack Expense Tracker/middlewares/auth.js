// Imported or required all necessary npm packages (jwt used for token verification and genration)
const jwt = require("jsonwebtoken");

const User = require("../models/signup");

const getVerified = async (req, res, next) => {
  try {
    const token = req.header("Authorization");

    if (!token) {
      return res
        .status(403)
        .send({ auth: false, message: "No token provided." });
    }
    // Verifying if the token is same or not
    const user = jwt.verify(token, "secretKey");
    User.findByPk(user.userId)
      .then((user) => {
        console.log(JSON.stringify(user));
        // Storing the user from the token into req so that can be passed to whole application or middleware as req is globally defined
        req.user = user;
        next();
      })
      .catch((err) => {
        console.log(err);
        // throw new Error(err);
      });
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  getVerified,
};
