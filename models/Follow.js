const mongoose = require("mongoose");
const moment = require("moment");
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

let timedate = moment().format();

const schema = new Schema({
  channel: { type: ObjectId, ref: 'User' },
  followBy: { type: ObjectId, ref: "User" },
  dateCreated: {
    type: Date,
    default: moment(timedate)
      .add(7, "hour")
      .format("YYYY-MM-DD HH:mm:ss Z")
  }
});

const FollowerModel = mongoose.model("Follower", schema);

module.exports = FollowerModel;
