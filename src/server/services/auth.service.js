const mongoose= require('mongoose');
const User = require('../models/user');
const crypto = require('crypto');
const async = require('async');
const emailManager = require('../helpers/email-manager');
const moment = require('moment')

module.exports = {
    login: function(req){
        return new Promise((resolve, reject) => {
            let token=req.headers.auth;
            User.findByToken(token,(err,user)=>{
                if(err) return reject(err)
                if(user) {
                    return reject({ error :true, message:"You are already logged in." })
                } else{
                    User.findOne({'email':req.body.email},function(err,user){
                        if(!user || user == null) {
                            return reject({isAuth : false, message : 'Email not found.'})
                        }
                        user.comparepassword(req.body.password,(err,isMatch)=>{
                            if(!isMatch) return reject({isAuth : false,message : "Incorrect password."})
                
                        user.generateToken((err,user)=>{
                            if(err) {
                                return reject(err)
                            } else{
                                return resolve({ isAuth : true, user: user});
                            }
                        });    
                    });
                  });
                }
            });

        });
    },
    logout: function (req){
        return new Promise((resolve, reject) => {
            req.user.deleteToken(req.token,(err,user)=>{
                if(err){
                    return reject(err)
                } else{
                    return resolve({status: 'success'})
                }
            });
        }) 
    },
    forgetPassword: function(req){
        return new Promise((resolve, reject) => {
            async.waterfall(
                [
                    function(callback) {
                        crypto.randomBytes(20, function(err, buf) {
                          var token = buf.toString('hex');
                          callback(err, token);
                        });
                    },
                    function updateUser (token, callback){
                        User.findOne({ email: req.body.email })
                        .then(user =>{
                            if(!user){
                                callback('user not found', null)
                            }else{
                                user.resetPasswordToken = token;
                                user.resetPasswordExpires = moment().add(1, 'h');
                                user.save(function(err) {
                                    callback(err, token, user);
                                });
                            }
                        })
                    },
                    function sendMail(token, user, callback){
                        let emailData = {
                            subject: 'Flight logger | Reset Password',
                            to: user.email,
                            // body:
                            //     `<!DOCTYPE html><html><head><meta name='viewport' content='width=device-width, initial-scale=1' /></head><body>Hi ${doc.firstname}<br><br><p>You are successfully registered.</p><br><br>Thanks,<br><br></body></html>`
                            body:  'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
                            'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
                            'http://' + req.headers.host + '/api/auth/reset?token=' + token + '\n\n' +
                            'If you did not request this, please ignore this email and your password will remain unchanged.\n'
                        };

                        emailManager
                        .sendMail(emailData)
                        .then((response) => {
                            callback(null, response)
                        })
                        .catch((error) => {
                            callback(error, null)
                        });
                    }
                ],
                function (asyncError, result) {
                    if (asyncError) {
                        reject(asyncError);
                    } else {
                        resolve(result);
                    }
                }
            ); 
        });
    },
    resetPasswordAuth: function(req){
        return new Promise((resolve, reject) => {
            console.log('token', req.query)
            let now = moment();
            User.findOne({ resetPasswordToken: req.query.token, resetPasswordExpires: { $gt:  now} }, function(err, user) {
              if (!user) {
                  return reject('Password reset token is invalid or has expired.')
              }else{
                  return resolve(user)
              }
            });
        });
    },
    resetPassword: function(req){
        return new Promise((resolve, reject) => {
            console.log(req.body);
            
            async.waterfall(
                [
                    function(callback) {
                        User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
                            if (!user) {
                                callback('Password reset token is invalid or has expired.', null)
                            }else{
                                user.password = req.body.password;
                                user.password2 = req.body.password;
                                user.resetPasswordToken = undefined;
                                user.resetPasswordExpires = undefined;
                                callback(null, user)
                            }
                          });
                    },
                    function updateUser (user, callback){
                        user.save(function(err) {
                            if(err){
                                callback(err, null)
                            }else{
                                callback(null, user)
                            }
                        });
                    },
                    function sendMail(user, callback){
                        let emailData = {
                            subject: 'Flight logger | Reset Password successful',
                            to: user.email,
                            // body:
                            //     `<!DOCTYPE html><html><head><meta name='viewport' content='width=device-width, initial-scale=1' /></head><body>Hi ${doc.firstname}<br><br><p>You are successfully registered.</p><br><br>Thanks,<br><br></body></html>`
                            body:  'Hello,\n\n' +
                            ' - This is a confirmation that the password for your account ' + user.email + ' has just been changed.\n'
                        };

                        emailManager
                        .sendMail(emailData)
                        .then((response) => {
                            callback(null, response)
                        })
                        .catch((error) => {
                            callback(error, null)
                        });
                    }
                ],
                function (asyncError, result) {
                    if (asyncError) {
                        reject(asyncError);
                    } else {
                        resolve(result);
                    }
                }
            );
        });
    }
}