const UserModle = require("../models/User");
const jwt = require("jsonwebtoken");
const key = {
  tokenKey: "djghhhhuuwiwuewieuwieuriwu"
};

const authEditor = async function(req, res, next) {
  const token = req.header("auth-token");
  if (!token) {
  } else {
    try {
      const verified = jwt.verify(token, key.tokenKey);
      const userCheck = await UserModle.findOne({ _id: verified._id });
      if (userCheck.role === "editor" || userCheck.role === "admin") {
        req.user = userCheck;
        next();
      } else {
        return res.json({
          code: 401,
          message: "k co quyen dang nhap",
          data: null
        });
      }
    } catch (err) {
      return res.json({
        code: 400,
        message: " token khong hop le",
        data: null
      });
    }
  }
};

module.exports = authEditor;
