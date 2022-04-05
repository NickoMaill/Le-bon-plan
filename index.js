const express = require("express");
const app = express();
const handlebars = require("express-handlebars");
const path = require("path");
const cookieParser = require("cookie-parser");

app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");

app.use(cookieParser());
app.use(express.static(path.join(__dirname, "/public")));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.render("homepage")
})

app.listen(8000, () => console.log("Listening"));