const express = require('express');
const app = express()
const router = express.Router();
const authController = require('../controllers/auth.controller');
const auth = require('../middlewares/auth');

router.post('/auth/login', authController.login);

router.get('/auth/logout', auth.authorize, authController.logout);

router.post('/auth/forgetPassword', authController.forgetPassword);

router.get('/auth/reset', authController.resetPasswordAuth);

router.post('/auth/reset/:token', authController.resetPassword);

// app.get('/reset/:token', function(req, res) {
//     User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
//         console.log(user);
//       if (!user) {
//         req.flash('error', 'Password reset token is invalid or has expired.');
//         return res.redirect('/forgot');
//       }
//       res.render('reset', {
//        User: req.user
//       });
//     });
//   });

module.exports = router;