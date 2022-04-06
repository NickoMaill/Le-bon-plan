const express = require('express')
const route = express.Router()

route.get("/paris", (req, res) => {
    res.render("paris")
})
route.get("/lyon", (req, res) => {
    res.render("lyon")
})
route.get("/marseille", (req, res) => {
    res.render("marseille")
})

module.exports = route