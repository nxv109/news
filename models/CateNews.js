const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;
const schema = new Schema({
    name: String,
    createdBy: { type: ObjectId, ref: 'User' },
    isDelete: {
        type: Boolean,
        default: false
    }
});

const CateNewsModel = mongoose.model('CateNews', schema);

module.exports = CateNewsModel;