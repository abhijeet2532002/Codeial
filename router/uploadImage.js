const express = require('express');
const router = express.Router();
const multer= require('multer')
const uploadController = require('../controller/UploadImage');
const upload=multer({
    dest: 'uploads/users/avtars'
})
router.post('/upload',upload.single('avtar'),uploadController.upload);
router.get('/',uploadController.create);

module.exports = router;