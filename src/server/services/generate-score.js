const mongoose = require('mongoose');
const ActionItems = require('../models/actionItems');
const Score = require('../models/scores');
const categoryDetails = [
    {
        id: 1,
        name: 'Legal Entity',
        ratio: 1,
        weightage: 35
    },
    {
        id: 2,
        name: 'Team',
        ratio: 1,
        weightage: 5
    },
    {
        id: 3,
        name: 'Intellectual Property',
        ratio: 1,
        weightage: 15
    },
    {
        id: 4,
        name: 'Information Technology',
        ratio: 1,
        weightage: 10
    },
    {
        id: 5,
        name: 'Contracts',
        ratio: 1,
        weightage: 15
    },
    {
        id: 6,
        name: 'Corporate Compliance',
        ratio: 1,
        weightage: 20
    }
]

module.exports = {
    generateScoreAndActionItems: function (req) {
        return new Promise((resolve, reject) => {
            let actions = [];
            //question 1
            if (req.body.question1 === 'none' || req.body.question1 === 'Partnership') {
                let dueDilObj = {

                    title: 'Incorporate a private limited company',
                    category: { catId: 1, catName: "Legal Entity" },
                    ratio: 0.1,
                    criticality: 1,
                }
                actions.push(dueDilObj);
            }
            if (req.body.question1 === 'LLP') {
                let dueDilObj = {

                    title: 'Convert LLP into company',
                    category: { catId: 1, catName: "Legal Entity" },
                    ratio: 0.5,
                    criticality: 1,
                }
                actions.push(dueDilObj);
            }
            //question 2
            if (req.body.question2a === 'Only founders not employees') {
                let dueDilObj = {

                    title: 'Execute employment agreement with employees',
                    category: { catId: 2, catName: "Team" },
                    ratio: 0.5,
                    criticality: 2,
                }
                actions.push(dueDilObj);
            }
            if (req.body.question2a === 'Only employees not founders') {
                let dueDilObj = {

                    title: 'Execute employment agreement with founder',
                    category: { catId: 2, catName: "Team" },
                    ratio: 0.5,
                    criticality: 2,
                }
                actions.push(dueDilObj);
            }
            if (req.body.question2a === 'Neither Employees nor Founders') {
                let dueDilObj = {

                    title: 'Execute employment agreement with founder',
                    category: { catId: 2, catName: "Team" },
                    ratio: 0.5,
                    criticality: 2,
                }
                actions.push(dueDilObj);
                let dueDilObj2 = {

                    title: 'Execute employment agreement with employees',
                    category: { catId: 2, catName: "Team" },
                    ratio: 0.5,
                    criticality: 2,
                }
                actions.push(dueDilObj2);
            }
            //question 3
            if (req.body.question3a === 'Neither brand name nor logo' || req.body.question3a === 'Only brand name not logo' || req.body.question3a === 'Only logo not brand name') {
                let dueDilObj = {

                    title: 'Conduct a trademark search',
                    category: { catId: 3, catName: "Intellectual Property" },
                    ratio: 0.5,
                    criticality: 2,
                }
                actions.push(dueDilObj);
            }
            //question 4
            if (req.body.question4 === 'none owned' || req.body.question4 === 'partially owned') {
                let dueDilObj = {

                    title: 'Draft assignment agreement for transfer of IP to your startup',
                    category: { catId: 3, catName: "Intellectual Property" },
                    ratio: 0.5,
                    criticality: 2,
                }
                actions.push(dueDilObj);
            }
            //question 5
            if (req.body.question5 === 'no') {
                let dueDilObj = {

                    title: 'Draft terms of service and privacy policy',
                    category: { catId: 4, catName: "Information Technology" },
                    ratio: 0.5,
                    criticality: 2,
                }
                actions.push(dueDilObj);
            }
            if (req.body.question5a === 'yes') {
                let dueDilObj = {

                    title: 'Review terms of service and privacy policy',
                    category: { catId: 4, catName: "Information Technology" },
                    ratio: 0.5,
                    criticality: 2,
                }
                actions.push(dueDilObj);
            }
            //question 6
            if (req.body.question6 === 'no' || req.body.question6 === 'with some') {
                let dueDilObj = {

                    title: 'Draft contracts with vendors and customers',
                    category: { catId: 5, catName: "Contracts" },
                    ratio: 0.5,
                    criticality: 2,
                }
                actions.push(dueDilObj);
            }
            if (req.body.question6a === 'yes') {
                let dueDilObj = {

                    title: 'Review contracts with vendors and customers',
                    category: { catId: 5, catName: "Contracts" },
                    ratio: 0.5,
                    criticality: 2,
                }
                actions.push(dueDilObj);
            }
            //question 7
            if (req.body.question7 === 'no' || req.body.question7 === 'maybe') {
                let dueDilObj = {

                    title: 'Update compliance and filings for company',
                    category: { catId: 6, catName: "Corporate Compliance" },
                    ratio: 0.5,
                    criticality: 2,
                }
                actions.push(dueDilObj);
            }
            //question 8
            if (req.body.question8b === 'no' || req.body.question8b === 'maybe') {
                let dueDilObj = {

                    title: 'Update compliance and filings for company',
                    category: { catId: 6, catName: "Corporate Compliance" },
                    ratio: 0.5,
                    criticality: 2,
                }
                actions.push(dueDilObj);
            }

            let finalArray = categoryDetails;
            for (let f = 0; f < actions.length; f++) {
                for (let g = 0; g < categoryDetails.length; g++) {
                    if (actions[f].category.catId == categoryDetails[g].id) {
                        finalArray[g].ratio = finalArray[g].ratio * actions[f].ratio
                    }
                }
            }
            // console.log("Actions generated " + JSON.stringify(actions));
            // console.log("Final array", JSON.stringify(finalArray));
            // console.log("Final Set of values", JSON.stringify(categoryDetails));

            let score = [];
            for (let k = 0; k < categoryDetails.length; k++) {
                score.push(categoryDetails[k].ratio * categoryDetails[k].weightage);
            }
            let lexscore = score.reduce(function (s, f) {
                return f + s;
            }, 0);
            // console.log("lexscore is: " + lexscore);

            let finalLexscore;
            let finaldata = [];

            if (req.body.question1 === 'none' || req.body.question1 === 'Partnership' || req.body.question1 === 'Section8') {
                finalLexscore = (lexscore / 80) * 80;
                for (let i = 0; i < finalArray.length; i++) {
                    let categoryName = finalArray[i].name;
                    let num = ((finalArray[i].ratio * finalArray[i].weightage) / 80) * 80;
                    let weightage = finalArray[i].weightage;
                    let data = { categoryName, num, weightage};
                    finaldata.push(data);
                }
            }
            if (req.body.question1 === 'LLP') {
                finalLexscore = (lexscore / 90) * 90;
                for (let j = 0; j < finalArray.length; j++) {
                    let categoryName = finalArray[j].name;
                    let num = ((finalArray[j].ratio * finalArray[j].weightage) / 90) * 90;
                    let weightage = finalArray[j].weightage;
                    let data = { categoryName, num, weightage};
                    finaldata.push(data);
                }
            }
            if (req.body.question1 === 'company') {
                finalLexscore = lexscore;
                for (let j = 0; j < finalArray.length; j++) {
                    let categoryName = finalArray[j].name;
                    let num = finalArray[j].ratio * finalArray[j].weightage;
                    let weightage = finalArray[j].weightage;
                    let data = { categoryName, num, weightage};
                    finaldata.push(data);
                }
            }
            // console.log("Final lexscore is: " + finalLexscore);
            // console.log("score by parts: " + JSON.stringify(finaldata));
            let dataToPass = {
                userId: req.user._id,
                actionItems: actions,
                createdAt: new Date()
            }
            let scoreDataToPass = {
                userId: req.user._id,
                scoreByParts: finaldata,
                score: finalLexscore,
                createdAt: new Date()
            }
            const items = new ActionItems(dataToPass);
            const scoreData = new Score(scoreDataToPass);
            items.save(dataToPass, (err, res)=>{
                if(err){
                    return reject(err);
                }else{
                    scoreData.save(scoreDataToPass, (err, scoreRes) =>{
                        if(err){
                            return reject(err);
                        }else{
                            return resolve({actions: res, score: scoreRes})
                        }
                    })
                }
            })
        })


    },
    getActionItems: function(req){
        return new Promise((resolve, reject) => {
            ActionItems.findOne({_id: req.user._id})
            .then(items => {
                return resolve(items)
            })
            .catch(error => {
                return reject(error)
            })
        });
    },
    getActionItemsByUserId: function(req){
        return new Promise((resolve, reject) => {
            ActionItems.findOne({userId: req.body.userId})
            .then(items => {
                return resolve(items)
            })
            .catch(error => {
                return reject(error)
            })
        });
    },
    getScoreByUserId: function(req){
        return new Promise((resolve, reject) => {
            Score.findOne({userId: req.body.userId})
            .then(items => {
                return resolve(items)
            })
            .catch(error => {
                return reject(error)
            })
        });
    },
}