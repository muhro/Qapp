'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const graphQlHttp = require('express-graphql');
const schema = require('./schema/schema');
const passport = require('./utils/pass');
const db = require('./database/db');
const authController = require("./controller/authController");
const uploadController = require("./controller/uploadController");
const server = express();

server.use(cors());
server.use(express.json()); // for parsing application/json
server.use(express.urlencoded({extended: true})); // for parsing application/x-www-form-urlencoded


server.use(express.static('public'));
server.use('.modules', express.static('node_modules'));

server.use('/graphql', (req, res) => {
    graphQlHttp({schema,
        graphql: true,
        context: {req, res}})
        (req, res);
});

server.post("/", authController.login);
server.post("/upload", uploadController.uploadFile);
server.get("/logout",authController.logout);

db.on('connected', () => {
    console.log('db connected');
});


server.listen(3000);