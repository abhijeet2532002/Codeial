const express = require('express');
const router = express.Router();
const frndController = require('../controller/Friend');

router.get('/',frndController.frnd);

module.exports = router;