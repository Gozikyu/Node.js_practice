var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  var name = req.query.name;
  var email = req.query.email;
  var data = {
    title: "Hello",
    content: "Please input some massages",
  };
  res.render("hello", data);
});

router.post("/post", (req, res, next) => {
  var message = req.body["message"];
  var data = {
    title: "Sent Message",
    content: "You sent " + message,
  };
  res.render("hello", data);
});

module.exports = router;
