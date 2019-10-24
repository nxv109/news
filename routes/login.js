const express = require("express");
const router = express.Router();
const fileUpload = require("express-fileupload");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const key = {
  tokenKey: "djghhhhuuwiwuewieuwieuriwu"
};
const UserModel = require("../models/User");

const app = express();

app.use(fileUpload());

router.post("/register", async function(req, res) {
  try {
    const userExist = await UserModel.findOne({ email: req.body.email });

    if (!userExist) {
      const hash = await bcrypt.hash(req.body.password, 8);
      const User = new UserModel();
      const file = req.files.file;

      User.username = req.body.userName;
      User.password = hash;
      User.image = file.name;
      User.email = req.body.email;

      const userCreate = await User.save();
      file.mv(`${__dirname}/../client/public/uploads/${file.name}`);
      return res.json({
        code: 200,
        message: "Bạn đã đăng ký thành công",
        data: { userCreate }
      });
    } else {
      return res.json({
        code: 200,
        message: "Người dùng đã tồn tại",
        data: null
      });
    }
  } catch (err) {
    return res.json({ code: 400, message: err.message, data: null });
  }
});

router.post("/", async function(req, res, next) {
  try {
    const user = await UserModel.findOne({ email: req.body.email });
    if (!user) {
      return res.json({ code: 401, message: "Sai tên đăng nhập", data: null });
    }
    const result = await bcrypt.compare(req.body.password, user.password);
    if (result) {
      var token = jwt.sign({ _id: user._id }, key.tokenKey);
      return res.header("auth-token", token).json({
        code: 200,
        message: "Đăng nhập thành công",
        data: { user },
        token
      });
    } else {
      return res.json({ code: 400, message: "Nhập sai password", data: null });
    }
  } catch (err) {
    return res.json({ code: 400, message: err.message, data: null });
  }
});

module.exports = router;
