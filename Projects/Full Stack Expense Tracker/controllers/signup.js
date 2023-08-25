// Imported or required all necessary npm packages (jwt used for token verification and genration, bcrypt for encrytion of password (one-way))
const bcrypt = require("bcrypt");
const path = require("path");
const jwt = require("jsonwebtoken");

require("dotenv").config();

const Users = require("../models/signup.js");
const FilesDownloaded = require("../models/filesDownloaded.js");

const UserServices = require("../services/userServices.js");
const S3Services = require("../services/s3Services.js");

const expensePage = path.join(
  __dirname,
  "..",
  "views",
  "Expenses",
  "expense.html"
);

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
      // Encrypting the password to store it in database
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
  return jwt.sign({ userId: id, name: name }, process.env.TOKEN_ID);
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
        res.status(201).json({
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

// Store all expenses to s3 in aws vai/through the database of expenses for a particular user
exports.getAllExpense = async (req, res, next) => {
  try {
    const expenses = await UserServices.getExpenses(req);
    // console.log(expenses);

    const stringifiedExpense = JSON.stringify(expenses);
    const fileName = `Expenses${req.user.id}/${new Date()}.txt`;
    const fileUrl = await S3Services.fileToS3(stringifiedExpense, fileName);

    // Updating in the database of the previously downloaded file of a user
    await FilesDownloaded.create({
      url: fileUrl,
      userId: req.user.id,
    });

    res.status(200).json({ fileUrl, success: true });
  } catch (err) {
    console.log(err);
    res.status(500).json({fileUrl: '', success: false, err});
  }
};

exports.getFilesDownloaded = async (req, res, next) => {
  const files = await FilesDownloaded.findAll({attributes: ['url', 'createdAt'], where: {userId: req.user.id}});

  res.status(200).json({files});
}