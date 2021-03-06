"use strict";

const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLSchema,
    GraphQLNonNull,
    GraphQLList,
} = require('graphql');

const bcrypt = require('bcrypt');
const saltRound = 12;
const user = require('../models/user');
const post = require('../models/post');
const _ = require('lodash');

//------------------------------------------------------------------------------------------------------
const authController = require('../controller/authController');
//------------------------------------------------------------------------------------------------------
const userType = new GraphQLObjectType({
    name: 'user',
    fields: () => ({
        id: {type: GraphQLID},
        username: {type: GraphQLString},
        token: {type: GraphQLString},
    }),
});

const postType = new GraphQLObjectType({
   name: 'post',
   fields: () => ({
      id :{type: GraphQLID},
      header: {type: GraphQLString},
      text: {type: GraphQLString},
   }),
});



//------------------------------------------------------------------------------------------------------
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        user: {
            type: userType,
            description: 'Get user by token, authentication required.',
            resolve: async (parent, args, {req, res}) => {
                try {
                    const result = await authController.checkAuth(req, res);
                    result.token = 'you have it already';
                    return result ;
                } catch (err) {
                    throw new Error(err);
                }
            },
        },

        login: {
            type: userType,
            description: 'Login with username and password to receive token.',
            args: {
                username: {type: new GraphQLNonNull(GraphQLString)},
                password: {type: new GraphQLNonNull(GraphQLString)},
            },
            resolve: async (parent, args, {req, res}) => {
                console.log('arks', args);
                req.body = args; // inject args to reqest body for passport
                try {
                    const authResponse = await authController.login(req, res);
                    console.log('ar', authResponse);
                    return {
                        id: authResponse.user._id,
                        ...authResponse.user,
                        token: authResponse.token,
                    };
                } catch (err) {
                    throw new Error(err);
                }
            },
        },

        post: {
            type: new GraphQLList(postType),
            description: 'get posts',
            resolve: async (parent, args) => {
                return post.find();
            }
        },
    },
});
//------------------------------------------------------------------------------------------------------

const Mutation = new GraphQLObjectType({
    name: 'MutationType',
    fields: () => ({
        registerUser: {
            type: userType,
            description: 'Register user.',
            args: {
                username: {type: new GraphQLNonNull(GraphQLString)},
                password: {type: new GraphQLNonNull(GraphQLString)},
            },
            resolve: async (parent, args, {req, res}) => {
                try {
                    console.log('register yrittää ');
                    const hash = await bcrypt.hash(args.password, saltRound);
                    const userWithHash = {
                        ...args,
                        password: hash,
                    };
                    const newUser = new user(userWithHash);
                    const result = await newUser.save();
                    if (result !== null) {
                        // automatic login
                        req.body = args; // inject args to request body for passport
                        const authResponse = await authController.login(req, res);
                        console.log('ar', authResponse);
                        return {
                            id: authResponse.user._id,
                            ...authResponse.user,
                            token: authResponse.token,
                        };
                    } else {
                        throw new Error('insert fail');
                    }
                } catch (err) {
                    throw new Error(err);
                }
            },
        },
        createPost: {
            type: postType,
            description: 'create post',
            args: {
                header: {type: new GraphQLNonNull(GraphQLString)},
                text: {type: new GraphQLNonNull(GraphQLString)},
            },
            resolve: async (parent, args, {req, res}) => {
                try {
                    console.log('post  creation tries');
                    const newPost = new post(args);
                    console.log(newPost)
                    const result = await newPost.save();

                }catch (e) {
                    throw new Error(err);
                }
            }
        },
    }),
});


module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation,
});
