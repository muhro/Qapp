'use strict';
// postTypesRoute
const express = require('express');
const router = express.Router();
const postTypesController = require('../controllers/postTypesController');

router.get('/', postTypesController.postTypes_list_get);

router.get('/:id', postTypesController.postTypes_get);

router.post('/', postTypesController.postTypes_post);

module.exports = router;
