const express = require("express");
const route = express.Router();
const { Pool } = require("pg");
const Postgres = new Pool({ ssl: { rejectUnauthorized: false } });
const uniqid = require("uniqid");

route.get("/register", (_req, res) => {
	res.render("signup");
});

route.get("/login", (req, res) => {
	res.render("login");
	console.log();
});

route.post("/register", async (req, res) => {
    try {
		await Postgres.query("INSERT INTO users (user_id, user_name, password) VALUES ($1, $2, $3)"[uniqid(), req.body.userName, req.body.password]);
	} catch (err) {
		console.log(err);
		res.send("an error happened", err);
	}
    res.redirect("/");
})

route.post("/login", async (req, res) => {

	res.redirect("/user/profil");
});

route.get("/profil", (_req, res) => {
	res.render("profile", {
		userName: "Nicolas",
		isLoggedIn: false,
	});
});

module.exports = route;
