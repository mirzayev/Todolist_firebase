const express = require("express");
const app = express();
const router = express.Router();

// set port
const port = process.env.PORT || 8080;
app.use(express.static(__dirname + "/public"));

//routes
app.get("/", function(req, res) {
  res.render("/public/register/register");
});

app.get("/sample", function(req, res) {
  res.send("this is sample");
});

app.listen(port, function() {
  console.log("listening port " + port);
});

router.use(function(req, res, next) {
  // log each request to the console
  console.log(req.method, req.url);

  // continue doing what we were doing and go to the route
  next();
});

// home page route (http://localhost:8080)
router.get("/", function(req, res) {
  res.send("im the home page!");
});

// about page route (http://localhost:8080/about)
router.get("/about", function(req, res) {
  res.send("im the about page!");
});

// apply the routes to our application
app.use("/", router);
