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


router.get("/trash", async function(req, res, next) {
  try {
    const cateNews = await CateNewsModel.find({ isDelete: true }).populate(
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

// move to trash
router.put("/trash/:_id", async function(req, res, next) {
  try {
    const _id = req.params._id;
    const cateExist = await CateNewsModel.findOne({ _id: _id });

    if (cateExist) {
      const moveToTrash = await CateNewsModel.findOneAndUpdate({ _id: _id }, { isDelete: true });
      const categories = await CateNewsModel.find({});

      if (moveToTrash) {
        res.json({
          data: categories,
          message: "Đã thêm vào giỏ rác",
          code: 200
        });
      }
    }
  } catch (err) {
    return res.json({
      code: 400,
      message: "Thêm vào giỏ rác thất bại",
      err: err,
      data: null
    });
  }
});

// restore from trash
router.put("/restore/:_id", async function(req, res, next) {
  try {
    const _id = req.params._id;
    const cateExist = await CateNewsModel.findOne({ _id: _id });

    if (cateExist) {
      const restoreFromTrash = await CateNewsModel.findOneAndUpdate({ _id: _id }, { isDelete: false });
      const categories = await CateNewsModel.find({ isDelete: true });

      if (restoreFromTrash) {
        res.json({
          data: categories,
          message: "Restore thành công",
          code: 200
        });
      }
    }
  } catch (err) {
    return res.json({
      code: 400,
      message: "Restore thất bại",
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
      const cateDelete = await CateNewsModel.findOneAndDelete({ _id: cateId });
      const cateNews = await CateNewsModel.find({ isDelete: true }).populate(
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
