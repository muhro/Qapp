'use strict';
const pass = require('passport');
const Strategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const userModel = require('../models/user');
const passportJWT = require('passport-jwt');
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const saltRounds = 10;

// local strategy for username password login
pass.use(new Strategy(
    async (username, password, done, res) => {
       // console.log('EKA LOGI',username, password);
        try {
            const user = await userModel.findOne({username});
          //  console.log('Local strategy', user, username);
            if (user === null) {
                return done(null, false, {message: 'Incorrect username.'});
            }
            const validate =  await bcrypt.compare(password, user.password);
            if (!validate) {

                return done(null, false, {message: 'Incorrect password.'});
            }

            const strippedUser = user.toObject();
            delete strippedUser.password;
         //   console.log('deleted pwd', strippedUser);

            return done(null, strippedUser, {message: 'Logged In Successfully'});

        } catch (err) {
            return done(err);
        }
    }));

pass.use(new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey: 'Projekti',
    },
    async (jwtPayload, done) => {
      //  console.log('payload', jwtPayload);
        //find the user in db if needed. This functionality may be omitted if you store everything you'll need in JWT payload.
        try {
            const user = await userModel.findById(jwtPayload._id,
                '-password -__v');
         //   console.log('pl user', user);
            if (user !== null) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        } catch (e) {
            return done(null, false);
        }
    },
));

module.exports = pass;
