const express = require('express');
const authController = require('../controllers/authController');
const multer = require('multer');

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post('/login', authController.login);
router.post('/signup', upload.single('idCard'), authController.signup);
router.get('/user/:id', authController.getUser);
router.get('/idcard/:id', authController.getIdCard);

module.exports = router;