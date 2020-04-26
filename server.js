'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./database/db');
const server = express();

server.use(cors());
server.use(express.json()); // for parsing application/json
server.use(express.urlencoded({extended: true})); // for parsing application/x-www-form-urlencoded

server.use(express.static('public'));
server.use('.modules', express.static('node_modules'));



db.on('connected', () => {
    console.log('db connected');
});


server.listen(3000);