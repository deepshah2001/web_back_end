const express = require("express");

const Group = require("../controllers/group");
const authentication = require("../middlewares/auth");

const router = express.Router();

router.post("/new-group", authentication.getVerified, Group.createNewGroup);

module.exports = router;