var express = require("express");
var app = express();
var port = 5000;

app.listen(port, () => {
  console.log("Listening on port " + port);
});

app.get('/', (req, resp) => {
  resp.send("Hello there");
});


