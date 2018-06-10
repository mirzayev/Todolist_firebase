const express = require("express");
const bodyParser = require("body-parser");
const app = express();

// set port
const port = process.env.PORT || 8080;
// app.use(express.static(__dirname + "/public"));

//routes
app.get("/", function(req, res) {
  res.render("hello world");
});

app.listen(port, function() {
  console.log("listening port " + port);
});
