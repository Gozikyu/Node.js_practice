const express = require("express");
const router = express.Router();
const sqlite3 = require("sqlite3");

const db = new sqlite3.Database("mydb.sqlite3");

router.get("/", (req, res, next) => {
  db.serialize(() => {
    var rows = "";
    console.log("hello");
    db.each(
      "select * from mydata",
      (err, row) => {
        if (!err) {
          rows += "<tr><th>" + row.id + "</th><td>" + row.name + "</td></tr>";
        }
      },
      (err, count) => {
        if (!err) {
          var data = {
            title: "Hello",
            content: rows,
          };
          res.render("hello/index", data);
        }
      }
    );
  });
});

router.get("/add", (req, res, next) => {
  var data = {
    title: "Add record",
    content: "Please input information",
  };
  res.render("hello/add", data);
});

router.post("/add", (req, res, next) => {
  const name = req.body.name;
  const email = req.body.email;
  const age = req.body.age;
  db.serialize(() => {
    db.run(
      "insert into mydata (name, email, age) values (?,?,?)",
      name,
      email,
      age
    );
  });
  res.redirect("/hello");
});

router.get("/show", (req, res, next) => {
  const id = req.query.id;
  db.serialize(() => {
    const q = "select * from mydata where id = ?";
    db.get(q, [id], (err, row) => {
      if (!err) {
        var data = {
          title: "hello/show",
          content: "id=" + id + "のレコード",
          mydata: row,
        };
        console.log("hge");
        res.render("hello/show", data);
      }
    });
  });
});

router.get("/edit", (req, res, next) => {
  const id = req.query.id;
  db.serialize(() => {
    const q = "select * from mydata where id = ?";
    db.get(q, [id], (err, row) => {
      if (!err) {
        var data = {
          title: "hello/show",
          content: "id=" + id + "のレコード",
          mydata: row,
        };
        res.render("hello/edit", data);
      }
    });
  });
});

router.post("/edit", (req, res, next) => {
  const id = req.body.id;
  const name = req.body.name;
  const email = req.body.email;
  const age = req.body.age;
  const q = "update mydata set name= ?, email= ?, age= ? where id= ?";
  db.serialize(() => {
    db.run(q, name, email, age, id);
  });
  res.redirect("/hello");
});

router.get("/delete", (req, res, next) => {
  const id = req.query.id;
  db.serialize(() => {
    const q = "select * from mydata where id = ?";
    db.get(q, [id], (err, row) => {
      if (!err) {
        var data = {
          title: "hello/delete",
          content: "id=" + id + "のレコード",
          mydata: row,
        };
        res.render("hello/delete", data);
      }
    });
  });
});

router.post("/delete", (req, res, next) => {
  const id = req.body.id;
  console.log(id);
  db.serialize(() => {
    const q = "delete from mydata where id = ?";
    db.run(q, id);
  });
  res.redirect("/hello");
});

router.get("/find", (req, res, next) => {
  db.serialize(() => {
    db.all("select * from mydata", (err, rows) => {
      if (!err) {
        var data = {
          title: "Search form",
          find: "",
          content: "Please input search conditions",
          mydata: rows,
        };
        res.render("hello/find", data);
      }
    });
  });
});

router.post("/find", (req, res, next) => {
  const find = req.body.find;
  const q = "select * from mydata where ";
  db.serialize(() => {
    db.all(q + find, (err, rows) => {
      if (!err) {
        var data = {
          title: "hello/find",
          content: "search results",
          find: find,
          mydata: rows,
        };
        res.render("hello/find", data);
      }
    });
  });
});

module.exports = router;
