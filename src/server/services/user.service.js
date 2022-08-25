const mongoose= require('mongoose');
const User = require('../models/user');
const emailManager = require('../helpers/email-manager');


module.exports = {
    register: function (req){
        return new Promise((resolve, reject) => {
            const newuser=new User(req.body);
            if(newuser.password!=newuser.password2)return reject({ auth : false, message :"password not match"}) 
            User.findOne({email:newuser.email},function(err,user){
                if(user) return reject({ auth : false, message :"Email already exists. Please use different email."}) 
     
                newuser.save((err,doc)=>{
                    if(err) {
                        return reject(err._message) 
                    }
                    let emailData = {
                        subject: 'Flight logger | Registration complete',
                        to: doc.email,
                        body:
                            `<!DOCTYPE html><html><head><meta name='viewport' content='width=device-width, initial-scale=1' /></head><body>Hi ${doc.firstname}<br><br><p>You are successfully registered.</p><br><br>Thanks,<br><br></body></html>`
                    };
                    // emailManager
                    // .sendMail(emailData)
                    // .then((response) => {
                        return resolve({ succes:true, user : doc })
                    // })
                    // .catch((error) => {
                        return reject(error) 
                    // });
                });
            });
        });
    },
    getProfile: function(req){
        return new Promise((resolve, reject) => {
            User.findOne({_id: req.user._id})
            .then(user => {
                return resolve({ isAuth: true, firstname: req.user.firstname, lastname: req.user.lastname, email: req.user.email, id: req.user._id, role: req.user.role})
            })
            .catch(error => {
                return reject(error)
            })
        });
    },
    editProfile: function(req){
        return new Promise((resolve, reject) => {
            User.updateOne({_id: req.body.id}, {$set: {firstname: req.body.firstname, lastname: req.body.lastname, email: req.body.email}})
            .then(result =>{
                return resolve(result)
            })
            .catch(error =>{
                return reject(error)
            })
        });
    },
    changePassword: function(req){
        return new Promise((resolve, reject) => {
            User.findOne({_id: req.user._id},function(err,user){
                if(user){
                    user.comparepassword(req.body.currentPassword,(err,isMatch)=>{
                        if(!isMatch) {
                            return reject({isAuth : false,message : "Incorrect password."})   
                        }
                        user.password = req.body.newPassword;
                        user.password2 = req.body.newPassword;
                        user.save(function(err) {
                            if(err){
                                return reject(err)
                            }else{
                                return resolve(user)
                            }
                        });
                    });
                }
            });
        });
    },
    getUsers: function(req){
        return new Promise((resolve, reject) => {
            User.find({})
            .then(users => {
                return resolve(users)
            })
            .catch(error => {
                return reject(error)
            })
        });
    },
}

