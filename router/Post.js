const express = require('express');
const router = express.Router();
const postController = require('../controller/Post');

console.log("Post router");
router.get('/',postController.display);
router.post('/create',postController.create);
router.get('/delete/:id',postController.delete);

module.exports = router;