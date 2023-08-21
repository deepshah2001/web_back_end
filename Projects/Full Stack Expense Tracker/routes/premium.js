const express = require('express');

const premium = require('../controllers/premium');
const authenticate = require('../middlewares/auth');

const router = express.Router();

router.get("/show-leaderboard", authenticate.getVerified, premium.showLeaderboard);

module.exports = router;