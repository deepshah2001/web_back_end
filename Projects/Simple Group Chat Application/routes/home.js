const express = require("express");
const fs = require("fs");
const data = require('./data');

const router = express.Router();

router.get("/", (req, res, next) => {
  res.send(
    data +
      `
<form action="/" method="POST">
<input type="hidden" name="username" id="hiddenUsernameField">
<input type="text" name="message">
<br>
<button type="submit">Send</button>
</form>
<script>
document.getElementById("hiddenUsernameField").value = localStorage.getItem("username");
</script>
`
  );
});

router.post("/", (req, res, next) => {
    const message = req.body.message;
    const username = req.body.username;
    
    data.push(username + ":" + message);
    console.log(data);

    fs.appendFile('userchat.txt', JSON.stringify(data), 'utf-8', (err) => {
        if(err) {
            console.log(err);
            res.send("Error writing to chat file.");
            return;
        }
    });
    
    res.redirect("/");
});

module.exports = router;