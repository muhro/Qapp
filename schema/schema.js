"use strict";

const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLSchema,
    GraphQLNonNull,
    GraphQLList,
    GraphQLInputObjectType,
} = require('graphql');

const bcrypt = require('bcrypt');
const saltRound = 12;
const user = require('../models/user');
const posts = require('../models/posts');


//------------------------------------------------------------------------------------------------------
const authController = require('../controller/authController');
//------------------------------------------------------------------------------------------------------
const userType = new GraphQLObjectType({
    name: 'user',
    fields: () => ({
        id: {type: GraphQLID},
        username: {type: GraphQLString},
        token: {type: GraphQLString},
        posts: {
            type: new GraphQLList(postsType),
            resolve(parent, args) {
                return posts.find({_id: {$in: parent.posts}});
            },
        },
    }),
});

const postsType = new GraphQLObjectType({
    name: 'posts',
    fields: () => ({
        id: {type: GraphQLID},
        length: {type: GraphQLString},
        chunckSize: {type: GraphQLString},
        UploadDate: {type: GraphQLString},
        filename: {type: GraphQLString},
        md4: {type: GraphQLString},
        contentType: {type: GraphQLString},
    }),
});


const postCreation = new GraphQLInputObjectType({
    name: 'postCreation',
    description: 'crates posts',
    fields: () => ({
        length: {type: GraphQLString},
        chunckSize: {type: GraphQLString},
        UploadDate: {type: GraphQLString},
        filename: {type: GraphQLString},
        md4: {type: GraphQLString},
        contentType: {type: GraphQLString},
    }),
});


//------------------------------------------------------------------------------------------------------
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        user: {
            type: userType,
            description: 'Get user by token, authentication required.',
            args: {
                username: {type: new GraphQLNonNull(GraphQLString)},
                password: {type: new GraphQLNonNull(GraphQLString)},
            },
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
        posts: {
            type: postsType,
            description: 'List of users posts',
            args: {
                id: {type: new GraphQLNonNull(GraphQLID)},
                length: {type: GraphQLString},
                chunckSize: {type: GraphQLString},
                UploadDate: {type: GraphQLString},
                filename: {type: GraphQLString},
                md4: {type: GraphQLString},
                contentType: {type: GraphQLString},
            },
            resolve: async (parent,  args)=> {
                try{
                    return await posts.findById(args.id)
                }
                catch (e) {

                }
            }
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
               /* posts: {
                    type: new GraphQLNonNull(new GraphQLList(postCreation)),
                }
               */
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
    }),
});


module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation,
});
