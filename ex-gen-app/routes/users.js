var express = require("express");
const { ResultWithContext } = require("express-validator/src/chain");
var router = express.Router();
const { Op } = require("sequelize");
const { parseString } = require("xml2js");
const db = require("../models/index");

/* GET users listing. */
router.get("/", function (req, res, next) {
  const id = req.query.id;
  db.User.findAll().then((users) => {
    var data = {
      title: "Users/Index",
      content: users,
    };
    res.render("users/index", data);
  });
});

router.get("/add", (req, res, next) => {
  var data = {
    title: "Users/Add",
  };
  res.render("users/add", data);
});

router.post("/add", (req, res, next) => {
  db.sequelize.sync().then(() => {
    db.User.create({
      name: req.body.name,
      pass: req.body.pass,
      mail: req.body.mail,
      age: req.body.age,
    }).then((user) => {
      res.redirect("/users");
    });
  });
});

router.get("/edit", (req, res, next) => {
  const id = req.query.id;
  db.User.findByPk(id).then((user) => {
    var data = {
      title: "Users/Edit",
      form: user,
    };
    res.render("users/edit", data);
  });
});

router.post("/edit", (req, res, next) => {
  const id = req.body.id;
  db.User.findByPk(id).then((user) => {
    user.name = req.body.name;
    user.pass = req.body.pass;
    user.mail = req.body.mail;
    user.age = req.body.age;
    user.save().then(() => {
      res.redirect("/users");
    });
  });
});

router.get("/delete", (req, res, next) => {
  const id = req.query.id;
  db.User.findByPk(id).then((user) => {
    var data = {
      title: "Users/Delete",
      form: user,
    };
    res.render("users/delete", data);
  });
});

router.post("/delete", (req, res, next) => {
  db.User.findByPk(req.body.id).then((user) => {
    user.destroy().then(() => {
      res.redirect("/users");
    });
  });
});

module.exports = router;
