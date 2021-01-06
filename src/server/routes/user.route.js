const express = require('express');
const app = express()
const router = express.Router();
const userController = require('../controllers/user.controller');
const auth = require('../middlewares/auth');

router.post('/user/register', userController.register);

router.get('/user/profile', auth.authorize, userController.getProfile);

router.put('/user/editPr0file', auth.authorize, userController.editProfile);

router.put('/user/changePassword', auth.authorize, userController.changePassword);


module.exports = router ;