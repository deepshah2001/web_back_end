const fs = require("fs");

let data = [];

fs.readFile("userchat.txt", "utf-8", (err, data1) => {
    if (err) {
      console.log(err);
      return;
    }
    data = data1;
  });

module.exports = data;