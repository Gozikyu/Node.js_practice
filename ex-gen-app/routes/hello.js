const express = require("express");
const router = express.Router();
const sqlite3 = require("sqlite3");

const db = new sqlite3.Database("mydb.sqlite3");

router.get("/", (req, res, next) => {
  db.serialize(() => {
    db.all("select * from mydata", (err, rows) => {
      if (!err) {
        var data = {
          title: "DB test",
          content: rows,
        };
        res.render("hello", data);
      }
    });
  });
});

module.exports = router;
