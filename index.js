const express = require("express");
const app = express();
const dotenv = require("dotenv")
dotenv.config({
    path:"./config.env"
})
const handlebars = require("express-handlebars");
const path = require("path");
const cookieParser = require("cookie-parser");
const products = require("./routes/products");
const user = require("./routes/user");
const cookieVerify = require("./middlewares/cookieVerify");

app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");

app.use(cookieParser());
app.use(express.static(path.join(__dirname, "/public")));
app.use(express.urlencoded({ extended: true }));
app.use("/products", products);
app.use("/user", user);

app.get("/", cookieVerify, (req, res) => {
  res.render("homepage", {
    isLoggedIn: req.logged,
  });
});

app.listen(8000, () => console.log("Listening"));
