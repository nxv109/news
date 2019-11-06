var express = require('express');
var router = express.Router();

// Models
const UserModel = require("../models/User");

/* GET users listing. */
router.get('/', async (req, res, next) => {
  const users = await UserModel.find({});

  try {
    res.json({
      code: 200,
      data: users
    })
  } catch (error) {
    res.json({
      code: 500,
      error: TypeError,
    })
  }
});

// vô hiệu hóa tài khoản người dùng
router.post('/locked/:id', async (req, res, next) => {
  const userExist = await UserModel.find({ _id: req.params.id });

  try {
    if (userExist) {
      const lockUser = await UserModel.findOneAndUpdate({ _id: req.params.id }, { isDelete: req.body.isDelete });
      const users = await UserModel.find({});

      if (lockUser) {
        res.json({
          code: 200,
          message: "Thao tác thành công",
          data: users
        })
      }
    }
  } catch (error) {
    res.json({
      code: 500,
      message: "Khóa tài khoản thất bại",
      error: TypeError,
    })
  }
});

// update role
router.put('/updateRole/:id', async (req, res, next) => {
  try {
    const userRole = {
      role: req.body.role
    };
    const updateRoleUser = await UserModel.findOneAndUpdate({ _id: req.params.id }, userRole);
    const users = await UserModel.find({});

    if (updateRoleUser) {
      res.json({
        code: 200,
        message: "Thay đổi vai trò thành công",
        data: users
      })
    }
  } catch (error) {
    res.json({
      code: 500,
      message: "Thay đổi vai trò thất bại",
      error: error,
    })
  }
});

// delete user
router.delete("/:id", async function(req, res, next) {
  const userId = req.params.id;
  const userExist = UserModel.findOne({ _id: userId });
  try {
    if (userExist) {
      const userDelete = await UserModel.deleteOne({ _id: userId });
      const users = await UserModel.find({}).populate(
        "createdBy"
      );

      if (userDelete) {
        res.json({
          code: 200,
          message: "Xóa thành công",
          data: users
        });
      }
    }
  } catch (err) {
    res.json({
      code: 400,
      message: "Xóa thất bại",
      data: null
    });
  }
});

module.exports = router;
