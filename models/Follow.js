const mongoose = require("mongoose");
require("mongoose-double")(mongoose);
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;
const schema = new Schema({
  username: String,
  content: String,
  createdBy: { type: ObjectId, ref: "User" },
  isDelete: { type: Boolean, default: false }
});

const ContactModel = mongoose.model("Contact", schema);

module.exports = ContactModel;
