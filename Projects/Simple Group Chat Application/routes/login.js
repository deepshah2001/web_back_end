const bodyParser = require('body-parser');
const express = require('express');

const router = express.Router();

app = express();
app.use(bodyParser.urlencoded({extended: false}));

router.get("/", (req, res, next) => {
    res.send('<form action="/login" method="POST"><input type="text" name="username"><br><button type="submit">Login</button></form>');
});

router.post("/", (req, res, next) => {
    const userName = req.body.username;
    res.send(`<script>
        localStorage.setItem('username', '${userName}');
        window.location.href="/";
    </script>`);
});

module.exports = router;