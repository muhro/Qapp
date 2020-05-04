"use strict";
const express = require("express");
const router = express.Router();
const authController = require("../controller/authController");
const uploadController = require("../controller/uploadController");
//const passport = require('../utils/pass');

let routes = app => {

  /*
  router.post('/', passport.authenticate('local', {
    successRedirect: '/home',
    failureRedirect: '/profile'
  }));
  */

  router.post("/", authController.login);

  router.post("/upload", uploadController.uploadFile);

  return app.use("/", router);
};

module.exports = routes;