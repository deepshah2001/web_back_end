const express = require("express");

const Group = require("../controllers/group");
const authentication = require("../middlewares/auth");

const router = express.Router();

router.post("/new-group", authentication.getVerified, Group.createNewGroup);

router.get(
  "/display-group",
  authentication.getVerified,
  Group.displayAllGroups
);

router.post("/all-users", authentication.getVerified, Group.displayAllUsers);

router.post("/make-admin", authentication.getVerified, Group.addGroupAdmin);

router.post("/delete-user", authentication.getVerified, Group.deleteUser);

router.post("/delete-group", authentication.getVerified, Group.deleteGroup);

module.exports = router;
