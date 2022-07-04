scoreService = require('../services/generate-score');

module.exports = {
    getScoreAndActionItems: function (req, res){
        scoreService.generateScoreAndActionItems(req)
        .then(response =>{
            return res.status(200).send(response);
        })
        .catch(error =>{
            return res.status(400).send({ status: 'error', message: error.message ? error.message : error })
        })
    },
    getActionItems: function (req, res){
        scoreService.getActionItems(req)
        .then(response =>{
            return res.status(200).send(response);
        })
        .catch(error =>{
            return res.status(400).send({ status: 'error', message: error.message ? error.message : error })
        })
    },
    getActionItemsByUserId: function (req, res){
        scoreService.getActionItemsByUserId(req)
        .then(response =>{
            return res.status(200).send(response);
        })
        .catch(error =>{
            return res.status(400).send({ status: 'error', message: error.message ? error.message : error })
        })
    },
    getScoreByUserId: function (req, res){
        scoreService.getScoreByUserId(req)
        .then(response =>{
            return res.status(200).send(response);
        })
        .catch(error =>{
            return res.status(400).send({ status: 'error', message: error.message ? error.message : error })
        })
    },
}
