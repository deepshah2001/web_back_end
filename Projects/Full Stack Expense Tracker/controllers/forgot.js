const Sib = require("sib-api-v3-sdk");

require("dotenv").config();

exports.resetPassword = async (req, res, next) => {
  const client = Sib.ApiClient.instance;

  const apiKey = client.authentications["api-key"];
  apiKey.apiKey = process.env.SIB_API_KEY;

  const newEmail = new Sib.TransactionalEmailsApi();

  const sender = {
    email: "shahdeep020@gmail.com",
  };
  const receiver = [
    {
      email: req.body.email,
    },
  ];

  try {
    await newEmail.sendTransacEmail({
      sender,
      to: receiver,
      subject: "Reset Password Link",
      htmlContent: `
        <h1>Use the below given link to reset your passwrod for EXPENSE TRACKER APP</h1>
        <a href="/">Reset Link</a>
    `,
    });
      res.status(200).json({message: "Mail Send Successfully"});
  } catch (err) {
    console.error("Error sending email:", err);
    res.status(500).json({ message: "Failed to send reset password email." });
  }
};
