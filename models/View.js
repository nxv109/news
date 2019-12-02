const mongoose = require('mongoose');
const moment = require("moment");
let timedate = moment().format();
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const schema = new Schema({
  news: { type: ObjectId, ref: 'News' },
  createdBy: { type: ObjectId, ref: 'User' },
  isDelete: {
      type: Boolean,
      default: false
  },
  date: {
    type: Date,
    default: moment(timedate)
      .add(7, "hour")
      .format("YYYY-MM-DD HH:mm:ss Z")
  }
});

const ViewModel = mongoose.model('View', schema);

module.exports = ViewModel;
