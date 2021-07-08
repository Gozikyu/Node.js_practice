var express = require("express");
var router = express.Router();
const { Op } = require("sequelize");
const db = require("../models/index");

/* GET users listing. */
router.get("/", function (req, res, next) {
  const id = req.query.id;
  db.User.findAll({
    where: { id: { [Op.lte]: id }, name: { [Op.like]: "%" + "a" + "%" } },
  }).then((users) => {
    var data = {
      title: "Users/Index",
      content: users,
    };
    res.render("users/index", data);
  });
});

module.exports = router;
