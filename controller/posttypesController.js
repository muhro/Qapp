'use strict';
const postTypesModel = require('../models/postTypes');

const postTypes_list_get = async (req, res) => {
    try {
        const postTypes = await postTypesModel.find().populate('postTypes');
        res.json(postTypes);
    } catch (e) {
        console.error('postTypes_list_get', e);
        res.status(500).json({message: e.message});
    }
};

const postTypes_get = async (req, res) => {
    try {
        const postTypes = await postTypesModel.findById(req.params.id);
        res.json(postTypes);
    } catch (e) {
        console.error('postTypes_get', e);
        res.status(500).json({message: e.message});
    }
};

const postTypes_post = (req, res) => {
    res.send('With this endpoint you can add postTypes');
};

module.exports = {
    postTypes_list_get,
    postTypes_get,
    postTypes_post,
};
