const express = require('express');
const router = express.Router();
const likeController = require('../controller/Like');
router.get('/toggle',likeController.Reaction);
module.exports = router;