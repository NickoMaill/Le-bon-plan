const express = require("express");
const app = express();
const handlebars = require("express-handlebars");
const path = require("path");
const cookieParser = require("cookie-parser");
const products = require("./routes/products")
const user = require('./routes/user')

app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");

app.use(cookieParser());
app.use(express.static(path.join(__dirname, "/public")));
app.use(express.urlencoded({ extended: true }));
app.use("/products", products)
app.use("/user", user)

app.get("/", (_req, res) => {
    res.render("homepage", {
        isLoggedIn: false
    })
})



app.listen(8000, () => console.log("Listening"));