var express = require("express");
var app = express();
var port = process.env.PORT || 5000;
var db = require("./db.js");

app.listen(port, () => {
  console.log("Listening on port " + port);
});

app.get('/', (req, resp) => {
  resp.send("Hello there");
});

app.get('/connect', (req, resp) => {
  console.log("Attempting connection");
  db.testConnection();
});

app.get('/insert', (req, resp) => {
  console.log("Attempting insert");
  db.testInsert();
});

app.get('/find', (req, resp) => {
  console.log("Attempting db find all");
  db.testFind();
});

app.get('/delete', (req, resp) => {
  console.log("Attempting db find all");
  db.testDelete();
});

app.get('/init', (req, resp) => {
  console.log("Attempting db init");
  db.init();
});

