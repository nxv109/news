const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { USERS } = require('../constant');
const schema = new Schema({
    username: String,
    password: String,
    image: { type: String, default: "avatar-default.jpg" },
    email: String,
    role: { type: String, default: USERS.ROLE.CUSTOMER },
    follow: { type: Number, default: 0 },
    isDelete: {
        type: Boolean,
        default: false
    }
});

const UserModel = mongoose.model('User', schema);

module.exports = UserModel;
