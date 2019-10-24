const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;
const schema = new Schema({
    news: { type: ObjectId, ref: 'News' },
    user: { type: ObjectId, ref: 'User' },
    isDelete: {
        type: Boolean,
        default: false
    },
    date : Date
});

const ViewModel = mongoose.model('View', schema);

module.exports = ViewModel;