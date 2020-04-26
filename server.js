'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const graphQlHttp = require('express-graphql');
const passport = require('./utils/pass');
const schema = require('./schema/schema');
const db = require('./database/db');
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


server.post('/',passport.authenticate('local', {

  successRedirect: '/home',

}));



db.on('connected', () => {
    console.log('db connected');
});


server.listen(3000);