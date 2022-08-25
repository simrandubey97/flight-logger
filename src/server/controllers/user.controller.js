userService = require('../services/user.service')

module.exports = {
    register: function (req, res){
        userService.register(req)
        .then(user =>{
            return res.status(200).send(user);
        })
        .catch(error =>{
            return res.status(400).send({ status: 'error', message: error.message ? error.message : error })
        })
    },
    getProfile: function (req, res){
        userService.getProfile(req)
        .then(user =>{
            return res.status(200).send(user);
        })
        .catch(error =>{
            return res.status(400).send({ status: 'error', message: error.message ? error.message : error })
        })
    },
    editProfile: function (req, res){
        userService.editProfile(req)
        .then(user =>{
            return res.status(200).send({status: 'success', user, user});
        })
        .catch(error =>{
            return res.status(400).send({ status: 'error', message: error.message ? error.message : error })
        })
    },
    changePassword: function (req, res){
        userService.changePassword(req)
        .then(user =>{
            return res.status(200).send({status: 'success', user, user});
        })
        .catch(error =>{
            return res.status(400).send({ status: 'error', message: error.message ? error.message : error })
        })
    },
    getUsers: function (req, res){
        userService.getUsers(req)
        .then(user =>{
            return res.status(200).send(user);
        })
        .catch(error =>{
            return res.status(400).send({ status: 'error', message: error.message ? error.message : error })
        })
    }
}
