const express = require("express");
const router = express.Router();
const fileUpload = require("express-fileupload");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const UserModel = require("../models/User");

const key = {
  tokenKey: "djghhhhuuwiwuewieuwieuriwu_cus"
};

const app = express();
app.use(fileUpload());

router.post("/register", async function(req, res) {
  try {
    const userExist = await UserModel.findOne({ email: req.body.email });

    if (!userExist) {
      const hash = await bcrypt.hash(req.body.password, 8);
      const User = new UserModel();

      User.username = req.body.userName;
      User.password = hash;
      // User.image = file.name;
      User.email = req.body.email;

      const userCreate = await User.save();

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
      return res.json({
        code: 401,
        message: "Nhập sai email đăng nhập",
        data: null
      });
    }

    if (user.isDelete === true) {
      return res.json({
        code: 401,
        message: "Tài khoản của bạn đã bị khóa. Vui lòng liên hệ chổ anh Vĩnh Đẹp Trưa nha",
        data: null
      });
    }

    const result = await bcrypt.compare(req.body.password, user.password);

    if (result) {
      const token = jwt.sign({ _id: user._id }, key.tokenKey);

      const { username, role, email, image, _id } = user;

      return res.header("auth-token", token).json({
        code: 200,
        message: "Đăng nhập thành công",
        data: { username, role, email, image, _id },
        token
      });
    } else {
      return res.json({
        code: 400,
        message: "Nhập sai password",
        data: null
      });
    }
  } catch (err) {
    return res.json({ code: 400, message: err.message, data: null });
  }
});

// get user
router.get("/getUser/:id", async (req, res) => {
  const user = await UserModel.findOne({ _id: req.params.id });

  if (user) {
    const { username, role, email, image, _id } = user;

    res.json({
      data: { username, role, email, image, _id }
    });
  } else {
    res.json({
      message: "khong tim thay user nao"
    });
  }
});

// update name, email, password, photo
router.put("/updateName/:id", async (req, res) => {
  const userExist = await UserModel.findOne({ _id: req.params.id });

  if (userExist) {
    try {
      const user = {
        username: req.body.userName
      };

      const updateUserName = await UserModel.findOneAndUpdate(
        { _id: req.params.id },
        user,
        {
          new: true,
          useFindAndModify: false
        }
      );

      if (updateUserName) {
        res.json({
          data: updateUserName,
          code: 200,
          message: "Cập nhật name thành công"
        });
      }
    } catch (error) {
      res.status(500).json({
        message: error
      });
    }
  }
});

router.put("/updateEmail/:id", async (req, res) => {
  const userExist = await UserModel.findOne({ _id: req.params.id });
  const emailExist = await UserModel.findOne({ email: req.body.email });

  if (userExist) {
    if (emailExist) {
      res.json({
        code: 404,
        message: "Email đã tồn tại"
      });
    } else {
      try {
        const user = {
          email: req.body.email
        };

        const updateUserEmail = await UserModel.findOneAndUpdate(
          { _id: req.params.id },
          user,
          {
            new: true,
            useFindAndModify: false
          }
        );

        if (updateUserEmail) {
          res.json({
            code: 200,
            data: updateUserEmail,
            message: "Cập nhật email thành công"
          });
        }
      } catch (error) {
        res.status(500).json({
          message: error
        });
      }
    }
  }
});

router.put("/updatePassword/:id", async (req, res) => {
  const userExist = await UserModel.findOne({ _id: req.params.id });

  if (userExist) {
    const comparePassword = await bcrypt.compare(
      req.body.currentPassword,
      userExist.password
    );

    if (comparePassword) {
      try {
        const hashPassword = await bcrypt.hash(req.body.newPassword, 8);

        const user = {
          password: hashPassword
        };

        const updateUserPassword = await UserModel.findOneAndUpdate(
          { _id: req.params.id },
          user,
          {
            new: true,
            useFindAndModify: false
          }
        );

        if (updateUserPassword) {
          res.json({
            data: updateUserPassword,
            code: 200,
            message: "Cập nhật password thành công"
          });
        }
      } catch (error) {
        res.status(500).json({
          message: error
        });
      }
    } else {
      res.json({
        code: 404,
        message: "Nhập password hiện tại không đúng"
      });
    }
  }
});

// upload avatar
router.put("/uploadAvatar/:id", async (req, res) => {
  const userExist = await UserModel.findOne({ _id: req.params.id });

  if (userExist) {
    const file = req.files.file;

    if (file) {
      try {
        file.mv(`${__dirname}/../client/public/uploads/users/${file.name}`);

        const user = {
          image: file.name
        };

        const updateUserAvatar = await UserModel.findOneAndUpdate(
          { _id: req.params.id },
          user,
          {
            new: true,
            useFindAndModify: false
          }
        );

        if (updateUserAvatar) {
          res.json({
            data: updateUserAvatar,
            code: 200,
            message: "Thay đổi avatar thành công"
          });
        }
      } catch (error) {
        res.json({
          code: 500,
          message: "Thay đổi avatar thất bại"
        });
      }
    }
  }
});

router.post("/checkToken", (req, res) => {
  const token = req.body.token;
  const role = req.body.role;
  const tokenAuth = key.tokenKey;

  jwt.verify(tokenAuth, token, function(err, decoded) {
    if (err) {
      res.json({
        role: role,
        message: "Error"
      });
    }

    if (decoded && role === "admin") {
      res.json({
        role: role
      });
    }

    if (decoded && role === "sensor") {
      res.json({
        role: role
      });
    }

    if (decoded && role === "editor") {
      res.json({
        role: role
      });
    }

    if (decoded && role === "journalist") {
      res.json({
        role: role
      });
    }

    if (decoded && role === "customer") {
      res.json({
        role: role
      });
    }
  });
});

module.exports = router;
