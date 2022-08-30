const express = require("express");
const app = express();
const authController = require("../controllers/authController");
const homeController = require("../controllers/homeController");
const { forwardAuthenticated, ensureAuthenticated } = require("../config/auth");

app.get("/", ensureAuthenticated, homeController.getHome);
app.get("/ebook/:id", ensureAuthenticated, homeController.getEbook);
app.get("/login", forwardAuthenticated, authController.getLogin);
app.get("/register", forwardAuthenticated, authController.getRegister);
app.get("/logout", authController.getLogout);
app.post("/login", authController.postLogin);
app.post("/register", authController.postRegister);

module.exports = app;
