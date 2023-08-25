const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

require("dotenv").config();

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

      // Encryption of password
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
      res.status(500).json({ status: false, message: "Error" });
    }
  }
};

// Generating JWT for further authentication of user after logging in.
function generateToken(id, email) {
  return jwt.sign({ userId: id, email: email }, process.env.TOKEN_KEY);
}

// For logging in an existing user
exports.verifyUser = async (req, res, next) => {
  const { email, password } = req.body;

  if (email === "" || password === "") {
    return res.status(501).json({ status: false, message: "Empty Field!" });
  }

  try {
    const userExists = await User.findOne({ where: { email: email } });

    if (userExists) {
      // Decrypting password and checking whether the password is correct or not
      bcrypt.compare(password, userExists.password, (err, response) => {
        if (err) {
          res
            .status(500)
            .json({ status: false, message: "Internal Server Error!" });
        }
        if (response) {
          res.status(201).json({
            status: true,
            message: "Logged In Successfully",
            token: generateToken(userExists.id, userExists.email),
          });
        } else {
          res.status(401).json({ status: false, message: "Wrong Password" });
        }
      });
    } else {
      return res
        .status(404)
        .json({ status: false, message: "User Doesn't Exists!" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: false, message: "Error" });
  }
};

// Getting list of all users in the chat room
exports.allUsers = async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.status(201).json({ status: true, users, message: "User List!" });
  } catch(err) {
    console.log(err);
    res.status(500).json({ status: false, message: "No User Found!" });
  }
}