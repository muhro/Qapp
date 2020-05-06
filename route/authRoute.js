"use strict";
const express = require("express");
const router = express.Router();
const session = require('express-session');
const authController = require("../controller/authController");
const uploadController = require("../controller/uploadController");

let routes = app => {
  router.post("/login", authController.login, authController.checkAuth);

  router.get("/logout",authController.logout);

  router.post("/upload", uploadController.uploadFile);

  return app.use("/", router);
};

module.exports = routes;