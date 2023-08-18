// Imported or required all necessary npm packages (jwt used for token verification and genration, bcrypt for encrytion of password (one-way))
const bcrypt = require("bcrypt");
const path = require("path");
const jwt = require("jsonwebtoken");

const expensePage = path.join(
  __dirname,
  "..",
  "views",
  "Expenses",
  "expense.html"
);

console.log(expensePage);

const Users = require("../models/signup.js");

// For handling all signup scenarios for a user
exports.addUser = async (req, res, next) => {
  const { userName, email, password } = req.body;

  if (!userName || !email || !password) {
    return res.status(400).json({ error: "Required fields are missing." });
  }

  const emailExists = await Users.findOne({ where: { email: email } });

  if (emailExists) {
    res.status(403).json({ error: "Email already Exists!" });
  } else {
    try {
      const saltRounds = 10;

      bcrypt.hash(password, saltRounds, async (err, hash) => {
        console.log(err);
        await Users.create({
          name: userName,
          email: email,
          password: hash,
        });
        res.status(201).json({ message: "Successfully New USer Created!" });
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Server Error! Please try again!" });
    }
  }
};

// Generating Token using jwt (jsonwebtoken)
function generateWebToken(id, name) {
  return jwt.sign({ userId: id, name: name }, "secretKey");
}

// For handling all login scenarios for a user
exports.existingUser = async (req, res, next) => {
  const { email, password } = req.body;

  const emailExists = await Users.findOne({ where: { email: email } });

  if (emailExists) {
    bcrypt.compare(password, emailExists.password, (err, response) => {
      if (err) {
        res.status(500).json({ message: "Something went Wrong!" });
      }
      if (response) {
        // Only called the function for generating token when the user is successfully signed in or logged in otherwise no use
        res
          .status(201)
          .json({
            path: expensePage,
            message: "Logged in successfully!",
            token: generateWebToken(emailExists.id, emailExists.name),
          });
      } else {
        res.status(401).json({ error: "Password Incorrect!" });
      }
    });
  } else {
    res.status(404).json({ error: "User Not Found!" });
  }
};