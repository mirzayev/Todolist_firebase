const express = require("express");
const app = express();

// set port
const port = process.env.PORT || 8080;
app.use(express.static(__dirname + "/public"));

//routes
app.get("/", function(req, res) {
  res.render("/public/register/register");
});
app.get("/login", function(req, res) {
  res.render("/public/register/login");
});

app.listen(port, function() {
  console.log("listening port " + port);
});
