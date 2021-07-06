var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  var data = {
    title: "Hello",
    content: "Your last message is " + req.session.message,
  };
  res.render("hello", data);
});

router.post("/post", (req, res, next) => {
  var message = req.body["message"];
  req.session.message = message;
  var data = {
    title: "Sent Message",
    content: "You sent " + message,
  };
  res.render("hello", data);
});

module.exports = router;
