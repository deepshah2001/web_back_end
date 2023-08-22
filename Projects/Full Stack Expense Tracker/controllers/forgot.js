// For mailing service and requiring all the necessay packages
const Sib = require("sib-api-v3-sdk");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const path = require("path");
const open = require("open");
const sequelize = require("../util/database");

const resetPassword = require("../models/forgotPasswordRequests");
const User = require("../models/signup");

require("dotenv").config();

// For sending mail to the user reset link for new password setup
exports.resetPassword = async (req, res, next) => {
  const t = await sequelize.transaction();
  try {
    const email = req.body.email;

    const emailExists = await User.findOne({
      attributes: ["id"],
      where: { email: email },
    });

    if (emailExists) {
      const entry = await resetPassword.create(
        {
          id: uuidv4(),
          userId: emailExists.id,
          isActive: true,
        },
        { transactin: t }
      );

      const uuid = entry.id;
      const client = Sib.ApiClient.instance;

      const apiKey = client.authentications["api-key"];
      apiKey.apiKey = process.env.SIB_API_KEY;

      const newEmail = new Sib.TransactionalEmailsApi();

      const sender = {
        email: "shahdeep020@gmail.com",
      };
      const receiver = [
        {
          email: email,
        },
      ];

      try {
        await newEmail.sendTransacEmail({
          sender,
          to: receiver,
          subject: "Reset Password Link",
          htmlContent: `
        <h1>Use the below given link to reset your passwrod for EXPENSE TRACKER APP</h1>
        <a href="http://localhost:3000/password/forgotpassword/${uuid}">Reset Link</a>
    `,
        });
        res.status(200).json({ message: "Mail Send Successfully", id: uuid });
      } catch (err) {
        console.error("Error sending email:", err);
        res
          .status(500)
          .json({ message: "Failed to send reset password email." });
      }
    } else {
      res.status(404).json({ message: "User not Found!" });
    }

    await t.commit();
  } catch (err) {
    await t.rollback();
  }
};

// Showing a form to reset password to a user after clicking on the link provided in the mail
exports.passwordForm = async (req, res, next) => {
  const uuid = req.params.uuid;
  console.log(uuid);

  const request = await resetPassword.findOne({
    attributes: ["isActive"],
    where: { id: uuid },
  });

  if (request) {
    if (request.isActive) {
      const form = path.join(
        __dirname,
        "..",
        "views",
        "Login",
        "newPassword.html"
      );
      res.sendFile(form);
    } else {
      res.send("Invalid Link");
    }
  } else {
    res.send("Bad Request");
  }
};

// Updating the password after the user set the new password
exports.updatePassword = async (req, res, next) => {
  const t = await sequelize.transaction();
  try {
    const password = req.body.password;

    // For taking out the uuid from the url
    const uuid = req.body.url.pathname.split("/")[3];

    const request = await resetPassword.findOne(
      {
        attributes: ["userId", "isActive"],
        where: { id: uuid },
      },
      { transaction: t }
    );

    const saltRounds = 10;

    // Encrypting the password to store it in the database
    bcrypt.hash(
      password,
      saltRounds,
      async (err, hash) => {
        console.log(err);
        await User.update(
          { password: hash },
          { where: { id: request.userId } }
        );
        await resetPassword.update(
          { isActive: false },
          { where: { id: uuid } }
        );
        const file = path.join(
          __dirname,
          "..",
          "views",
          "Login",
          "updated.html"
        );
        await open(file);
        res.status(200).json({ message: "Password Successfully Reset!" });
      },
      { transaction: t }
    );

    await t.commit();
  } catch (err) {
    await t.rollback();
    console.log(err);
    const file = path.join(__dirname, "..", "views", "Login", "failure.html");
    await open(file);
  }
};
