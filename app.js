const http = require("http");
const fs = require("fs");
const ejs = require("ejs");
const url = require("url");

const index_page = fs.readFileSync("./index.ejs", "utf8");
const other_page = fs.readFileSync("./other.ejs", "utf8");
const style_css = fs.readFileSync("./style.css", "utf8");

var server = http.createServer(getFromClient);
server.listen(3000);
console.log("Server Start");

function getFromClient(req, res) {
  var url_parts = url.parse(req.url);
  switch (url_parts.pathname) {
    case "/":
      var content = ejs.render(index_page, {
        title: "Index page",
        content: "This is the index page",
      });
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(content);
      res.end();
      break;

    case "/other":
      var content = ejs.render(other_page, {
        title: "Other page",
        content: "This is the other page",
      });
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(content);
      res.end();
      break;

    default:
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end("no page...");
      break;
  }
}
