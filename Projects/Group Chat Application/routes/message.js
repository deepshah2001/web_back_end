const express = require("express");

const Message = require("../controllers/message");
const Authentication = require("../middlewares/auth");

const router = express.Router();

router.post("/add-message", Authentication.getVerified, Message.addMessage);

router.post("/:lastMessageId", Authentication.getVerified, Message.showMessages);

// router.get("/", Authentication.getVerified, Message.showAllMessage);

module.exports = router;