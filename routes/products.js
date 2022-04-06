const express = require("express");
const cookieVerify = require("../middlewares/cookieVerify");
const route = express.Router();

route.get("/paris", cookieVerify, (req, res) => {
  res.render("paris", {
    isLoggedIn: req.logged,
  });
});
route.get("/lyon", cookieVerify, (req, res) => {
  res.render("lyon", {
    isLoggedIn: req.logged,
  });
});
route.get("/marseille", cookieVerify, (req, res) => {
  res.render("marseille", {
    isLoggedIn: req.logged,
  });
});

module.exports = route;
