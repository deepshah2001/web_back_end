const express = require("express");

// Used middleware for verification of user with their id.
const authenticate = require("../middlewares/auth");
const premium = require("../controllers/premium");

const router = express.Router();

// To show leaderboard for all the users present in the database User. /show-leaderboard => userAuthentication (middleware) => (next()) -> showLeaderboard (middleware)   [Flow of request]
router.get(
  "/show-leaderboard",
  authenticate.getVerified,
  premium.showLeaderboard
);

module.exports = router;
