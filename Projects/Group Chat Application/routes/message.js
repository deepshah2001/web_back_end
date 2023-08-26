const express = require("express");

const Message = require("../controllers/message");
const Authentication = require("../middlewares/auth");

const router = express.Router();

router.post("/add-message", Authentication.getVerified, Message.addMessage);

router.get("/", Authentication.getVerified, Message.showMessages);

module.exports = router;