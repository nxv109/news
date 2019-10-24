const mongoose = require('mongoose')
require('mongoose-double')(mongoose);
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;
const schema = new Schema({
    news: { type: ObjectId, ref: 'News' },
    createdBy: { type: ObjectId, ref: 'User' },
    isDelete: { type: Boolean, default: false }
});

const LikeModel = mongoose.model('Like', schema);

module.exports = LikeModel;