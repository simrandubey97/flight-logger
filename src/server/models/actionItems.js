var mongoose=require('mongoose');
const confiq=require('../config/config').get(process.env.NODE_ENV);

const actionItemsSchema = mongoose.Schema ({
    userId:{
        type: String,
        required: true
    },
    actionItems: [{
        title:String,
        ratio: Number,
        criticality: Number,
        category: {catId: Number, catName: String}
    }],
    createdAt: {
        type: Date,
        required: true
    }
});

module.exports=mongoose.model('ActionItems',actionItemsSchema);