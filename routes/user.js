const express = require("express");
const route = express.Router();
const { Pool } = require("pg");
const Postgres = new Pool({ ssl: { rejectUnauthorized: false } });
const uniqid = require("uniqid");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieVerify = require("../middlewares/cookieVerify");

const { SECRET } = process.env;

route.get("/register", (_req, res) => {
  res.render("signup");
});

route.get("/login", (_req, res) => {
  res.render("login");
});

route.post("/register", async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 12);

  try {
    await Postgres.query(
      "INSERT INTO users (user_id, user_name, password) VALUES ($1, $2, $3)",
      [uniqid(), req.body.userName, hashedPassword]
    );
    res.send("user created");
  } catch (err) {
    console.log(err);
    res.send("an error happened", err);
  }
  res.redirect("/");
});

route.post("/login", async (req, res) => {
  const { userName, password } = req.body;
  try {
    const user = await Postgres.query(
      "SELECT * FROM users WHERE users.user_name = $1",
      [userName]
    );
    const isPassword = await bcrypt.compare(password, user.rows[0].password);
    if (user.rowCount < 1 || user.rowCount > 1) {
      return res.status(400).json({
        message: "Invalid user-name or password",
      });
    }

    if (!isPassword) {
      return res.status(400).json({
        message: "Invalid user-name or password",
      });
    }

    const token = jwt.sign(
      { email: user.rows[0].user_id, password: user.rows[0].password },
      SECRET,
      {
        expiresIn: "2w",
      }
    );

    res
      .cookie("userCookie", token, { httpOnly: true, secure: false })
      .redirect("/user/profil");
  } catch (err) {
    console.log(err);
    res.status(400).json({
      message: "an error happened",
    });
  }
});

route.get("/profil", cookieVerify, (req, res) => {
	
  res.render("profile", {
    userName: "",
    isLoggedIn: req.logged,
  });
});

route.get("/logout", (_req, res) => {
  res.status(202).clearCookie("userCookie").redirect("/");
});

module.exports = route;
