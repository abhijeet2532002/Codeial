const express = require('express');
const router = express.Router();
const comment = require('../controller/Comment');

console.log("comment router started successfully .....");
router.get('/',comment.callPage);
router.post('/create/:id',comment.create);
router.get('/delete/:id',comment.delete);

module.exports = router;