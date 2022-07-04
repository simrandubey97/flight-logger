var mongoose=require('mongoose');
const confiq=require('../config/config').get(process.env.NODE_ENV);

const scoreSchema = mongoose.Schema ({
    userId:{
        type: String,
        required: true
    },
    scoreByParts: [{
        categoryName: String,
        num: Number,
        weightage: Number
    }],
    score: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        required: true
    }
});

module.exports=mongoose.model('Score',scoreSchema);