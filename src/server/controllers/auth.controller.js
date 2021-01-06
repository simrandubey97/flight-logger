userService = require('../services/user.service')
authService = require('../services/auth.service')

module.exports = {
    login: function (req, res){
        authService.login(req)
        .then(user =>{
            return res.status(200).send(user);
        })
        .catch(error =>{
            return res.status(400).send({ status: 'error', message: error.message ? error.message : error })
        })
    },
    logout: function (req, res){
        authService.logout(req)
        .then(status =>{
            return res.status(200).send(status)
        })
        .catch(error =>{
            return res.status(400).send({ status: 'error', message: error.message ? error.message : error })
        })
    },
    forgetPassword: function (req, res){
        authService.forgetPassword(req)
        .then(status =>{
            return res.status(200).send({status: status})
        })
        .catch(error =>{
            return res.status(400).send({ status: 'error', message: error.message ? error.message : error })
        })
    },
    resetPasswordAuth: function (req, res){
        authService.resetPasswordAuth(req)
        .then(user =>{
            // return res.redirect('http://localhost:4200/reset?token='+user.resetPasswordToken);
            return res.redirect('http://localhost:4200/reset/'+user.resetPasswordToken);
        })
        .catch(error =>{
            return res.status(400).send({ status: 'error', message: error.message ? error.message : error })
        })
    },
    resetPassword: function (req, res){
        authService.resetPassword(req)
        .then(status =>{
            return res.status(200).send({status: status})
        })
        .catch(error =>{
            return res.status(400).send({ status: 'error', message: error.message ? error.message : error })
        })
    }
}