const express = require('express');
const app = express()
const router = express.Router();
const userController = require('../controllers/user.controller');
const auth = require('../middlewares/auth');

router.post('/user/register', userController.register);

router.get('/user/profile', auth.authorize, userController.getProfile);

router.get('/user/all', auth.authorize, userController.getUsers);

router.put('/user/editProfile', auth.authorize, userController.editProfile);

router.put('/user/changePassword', auth.authorize, userController.changePassword);


module.exports = router;