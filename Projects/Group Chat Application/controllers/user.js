const bcrypt = require("bcrypt");

const User = require("../models/user");

// For Sign-up for a user
exports.addUser = async (req, res, next) => {
  const { name, email, phone, password } = req.body;

  if (name === "" || email === "" || phone === "" || password === "") {
    return res.status(501).json({ status: false, message: "Empty Field!" });
  }

  const userExists = await User.findOne({ where: { email: email } });

  if (userExists) {
    return res
      .status(403)
      .json({ status: false, message: "User Already Exists!" });
  } else {
    try {
      const saltRounds = 10;

      bcrypt.hash(password, saltRounds, async (err, hash) => {
        if (err) {
          res
            .status(402)
            .json({ status: false, message: "Error in Hashing Password" });
        } else {
          await User.create({
            name: name,
            email: email,
            phone: phone,
            password: hash,
          });
          res.status(200).json({ status: true, message: "Created new User!" });
        }
      });
    } catch (err) {
      console.log(err);
      res
        .status(500)
        .json({ status: false, message: "Error in Hashing Password" });
    }
  }
};

// For logging in an existing user
exports.verifyUser = async (req, res, next) => {
  const { email, password } = req.user;

  if (email === "" || password === "") {
    return res.status(501).json({ status: false, message: "Empty Field!" });
  }

  try {
    const userExists = await User.findOne({ where: { email: email } });

    if (userExists) {
        bcrypt.compare(password, userExists.password, (err, response) => {
            if(err) {
                res
                .status(402)
                .json({ status: false, message: "Wrong Password" });
            } else {
                res
                .status(201)
                .json({});
            }
        })
    } else {
      return res
        .status(403)
        .json({ status: false, message: "User Already Exists!" });
    }
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ status: false, message: "Error in Hashing Password" });
  }
};
