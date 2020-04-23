
const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const server = express();



server.use(cors());
server.use(express.json()); // for parsing application/json
server.use(express.urlencoded({extended: true})); // for parsing application/x-www-form-urlencoded

server.use(express.static('public'));
server.use('/modules', express.static('node_modules'));


//main screen
server.post('/app', verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkeyLauri', (err, authData) => {
        if(err) {
            res.sendStatus(403);
        } else {
            res.json({
                message: 'Post created...',
                authData
            });
        }
    });
});
//login
server.post('/login', (req, res) => {
    //dummy user
    const user = {
        id: 1,
        username: 'lauri',
        email: 'lauri@gmail.com'
    };
    jwt.sign({user}, 'secretkeyLauri', (err, token) => {
        res.json({
            token
        });
    });
});


function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];

    if(typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
//Fix if doesnt work
        req.token = bearer[1];
        next();
    } else {
        res.sendStatus(403);
    }

}

server.listen(3000, () => console.log('Server started'));