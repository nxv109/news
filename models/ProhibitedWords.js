const mongoose = require('mongoose')
require('mongoose-double')(mongoose);
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const schema = new Schema({
    words: { type: Array, default: [] },
    isDelete: {
        type: Boolean,
        default: false
    }
});

const ProhibitedWordsModel = mongoose.model('ProhibitedWords', schema);

module.exports = ProhibitedWordsModel;