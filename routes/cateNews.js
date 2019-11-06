var express = require("express");
const CateNewsModel = require("../models/CateNews");
const NewsModel = require("../models/News");
// const RateModel = require('../models/Rate');
// const UserModel = require('../models/User');
// const LikeModel = require('../models/Like');
// const ViewModel = require('../models/View');
var router = express.Router();
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/checkAdmin");
const authCus = require("../middleware/checkCus");

router.get("/", async function(req, res, next) {
  try {
    const cateNews = await CateNewsModel.find({ isDelete: false }).populate(
      "createdBy"
    );

    return res.json({
      code: 200,
      err: null,
      data: cateNews
    });
  } catch (err) {
    console.log(err);
    return res.json({
      code: 400,
      err: err.messege,
      data: null
    });
  }
});

router.get("/:_idCate", auth, async function(req, res, next) {
  try {
    const _idCate = req.params._idCate;
    const cateNews = await CateNewsModel.find({
      _id: _idCate,
      isDelete: false
    }).populate("createdBy");
    return res.json({
      code: 200,
      err: null,
      data: cateNews
    });
  } catch (err) {
    console.log(err);
    return res.json({
      code: 400,
      err: err.messege,
      data: null
    });
  }
});

router.post("/", async function(req, res, next) {
  try {
    const { category, createdBy } = req.body;
    console.log(createdBy);
    const Category = new CateNewsModel({
      name: category,
      createdBy: createdBy
    });
    const CategoryClass = await Category.save();

    return res.json({
      code: 200,
      message: "Thêm thành công",
      data: CategoryClass,
      err: null
    });
  } catch (err) {
    return res.json({
      code: 400,
      message: "Thêm thất bại",
      err: err,
      data: null
    });
  }
});

router.put("/:_id", authAdmin, async function(req, res, next) {
  try {
    const _id = req.params._id;
    const name = req.body.name;
    const cateCheck = await CateNewsModel.findOne({ _id: _id });
    if (cateCheck == null) {
      return res.json({
        data: null,
        messege: "Khong co san pham nay",
        code: 200
      });
    }
    if (cateCheck != null) {
      const cateUpdate = await CateNewsModel.updateOne(
        { _id: _id },
        { name: name, createdBy: req.user._id }
      );
      return res.json({
        code: 200,
        data: { cateUpdate },
        err: null
      });
    }
  } catch (err) {
    return res.json({
      code: 400,
      err: err,
      data: null
    });
  }
});

router.delete("/:id", async function(req, res, next) {
  const cateId = req.params.id;
  const cateCheck = CateNewsModel.findOne({ _id: cateId });
  try {
    if (cateCheck) {
      const cateDelete = await CateNewsModel.deleteOne({ _id: cateId });
      const cateNews = await CateNewsModel.find({ isDelete: false }).populate(
        "createdBy"
      );

      if (cateDelete) {
        res.json({
          code: 200,
          message: "Xóa thành công",
          data: cateNews
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
