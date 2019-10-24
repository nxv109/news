const mongoose = require("mongoose");
require("mongoose-double")(mongoose);
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;
const schema = new Schema({
  news: [{ type: ObjectId, ref: "News" }],
  name: String,
  createdBy: { type: ObjectId, ref: "User" },
  isDelete: {
    type: Boolean,
    default: false
  }
});

const RateModel = mongoose.model("Tag", schema);

module.exports = RateModel;
