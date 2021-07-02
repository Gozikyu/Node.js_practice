const http = require("http");
const fs = require("fs");
const ejs = require("ejs");

const index_page = fs.readFileSync("./index.ejs", "UTF-8");

var server = http.createServer(getFromClient);
server.listen(3000);
console.log("Server Start");

function getFromClient(req, res) {
  var content = ejs.render(index_page, {
    title: "Template Title",
    content: "これはテンプレートエンジンを使ったテキスト表示です",
  });
  res.writeHead(200, { "Content-Type": "text/html" });
  res.write(content);
  res.end();
}
