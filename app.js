const http = require("http");
const fs = require("fs");
const ejs = require("ejs");
const url = require("url");
const qs = require("querystring");
const { getMaxListeners } = require("process");

const index_page = fs.readFileSync("./index.ejs", "utf8");
const other_page = fs.readFileSync("./other.ejs", "utf8");
const style_css = fs.readFileSync("./style.css", "utf8");

var server = http.createServer(getFromClient);
server.listen(3000);
console.log("Server Start");

function getFromClient(req, res) {
  var url_parts = url.parse(req.url, true);
  query = url_parts.query;
  switch (url_parts.pathname) {
    case "/":
      index_response(req, res);
      break;

    case "/other":
      other_response(req, res);
      break;

    default:
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end("no page...");
      break;
  }
}

var data = { msg: "no message..." };

function index_response(req, res) {
  if (req.method == "POST") {
    var body = "";
    req.on("data", (data) => {
      body += data;
    });
    req.on("end", () => {
      data = qs.parse(body);
      setCookie("msg", data.msg, res);
      write_index(req, res);
      console.log("post request");
    });
  } else {
    write_index(req, res);
    console.log("get request");
  }
}

function write_index(req, res) {
  var msg = "これは伝言です。";
  var coolie_data = getCookie("msg", req);
  var content = ejs.render(index_page, {
    title: "Index page",
    content: msg,
    data: data,
    cookie_data: coolie_data,
  });
  console.log(data);
  res.writeHead(200, { "Content-Type": "text/html" });
  res.write(content);
  res.end();
}

function setCookie(key, value, res) {
  var cookie = escape(value);
  res.setHeader("Set-Cookie", [key + "=" + cookie]);
}

function getCookie(key, req) {
  var cookie_data = req.headers.cookie != undefined ? req.headers.cookie : "";
  var data = cookie_data.split(";");
  for (var i in data) {
    if (data[i].trim().startsWith(key + "=")) {
      var result = data[i].trim().substring(key.length + 1);
      return unescape(result);
    }
  }
}

function other_response(req, res) {
  var data2 = {
    taro: ["taro@gail.com", 100],
    jiro: ["jiro@gail.com", 200],
    saburo: ["saburo@gail.com", 300],
  };

  if (req.method == "POST") {
    var msg = "message sent by form is ";
    var body = "";
    req.on("data", (data) => {
      body += data;
    });
    req.on("end", () => {
      var post_body = qs.parse(body);
      var content = ejs.render(other_page, {
        title: "Other page",
        content: msg + "" + post_body.msg,
        filename: "data_item",
      });
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(content);
      res.end();
    });
  } else {
    var msg = "request is not POST";
    var content = ejs.render(other_page, {
      title: "Other page",
      content: msg,
      data: data2,
      filename: "data_item",
    });
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(content);
    res.end();
  }
}
