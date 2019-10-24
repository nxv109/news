var express = require("express");
const NewsModel = require("../models/News");
const RateModel = require("../models/Rate");
const LikeModel = require("../models/Like");
const ViewModel = require("../models/View");
var router = express.Router();
const auth = require("../middleware/auth");
const authJour = require("../middleware/checkJournalist");
const authEditor = require("../middleware/checkEditor");
/* GET users listing. */

router.get("/", async function(req, res, next) {
  try {
    const News = await NewsModel.find({ isDelete: false })
      .populate("cateNews")
      .populate("createdBy");
    return res.json({
      code: 200,
      err: null,
      data: News
    });
  } catch (err) {
    return res.json({
      code: 400,
      err: err.messege,
      data: null
    });
  }
});

router.get("/:_idNews", async function(req, res, next) {
  try {
    const idNews = req.params._idNews;
    const News = await NewsModel.find({
      _id: idNews,
      isDelete: false
    })
      .populate("cateNews")
      .populate("createdBy");
    return res.json({
      code: 200,
      err: null,
      data: News
    });
  } catch (err) {
    return res.json({
      code: 400,
      err: err.messege,
      data: null
    });
  }
});

router.post("/", authJour, async function(req, res, next) {
  try {
    const body = req.body;
    const News = new NewsModel({
      title: body.title,
      content: body.content,
      cateNews: body.cateNews,
      createdBy: req.user._id
    });
    const NewsClass = await News.save();
    return res.json({ code: 200, message: null, data: NewsClass });
  } catch (err) {
    return res.json({
      code: 400,
      err: err,
      data: null
    });
  }
});

router.put("/:_id", authJour, async function(req, res, next) {
  try {
    const _id = req.params._id;
    const newsCheck = await NewsModel.findOne({ _id: _id });
    if (newsCheck == null) {
      return res.json({
        data: null,
        messege: "Khong co san pham nay",
        code: 200
      });
    }
    if (newsCheck != null) {
      console.log(newsCheck);
      console.log(req.user._id);
      if (newsCheck.createdBy.toString() == req.user._id.toString()) {
        const body = req.body;
        const NewsUpdate = await NewsModel.updateOne(
          { _id: _id },
          {
            title: body.title,
            content: body.content,
            cateNews: body.cateNews
          }
        );
        return res.json({ code: 200, message: null, data: NewsUpdate });
      } else {
        return res.json({
          data: null,
          message: "Khong co quyen thay doi"
        });
      }
    }
  } catch (err) {
    console.log(err);
    return res.json({
      code: 400,
      err: err,
      data: null
    });
  }
});

router.delete("/:_id", authJour, async function(req, res, next) {
  try {
    const _id = req.params._id;
    const newsCheck = await NewsModel.findOne({ _id: _id });
    if (newsCheck == null) {
      return res.json({
        data: null,
        messege: "Khong co san pham nay",
        code: 200
      });
    }
    if (newsCheck != null) {
      if (newsCheck.createdBy._id.toString() == req.user._id.toString()) {
        const body = req.body;
        const NewsUpdate = await NewsModel.updateOne(
          { _id: _id },
          { isDelete: true }
        );
        return res.json({ code: 200, message: "da xoa", data: NewsUpdate });
      } else {
        return res.json({
          code: 300,
          data: null,
          message: "KHong co quyen xoa"
        });
      }
    }
  } catch (err) {
    return res.json({
      code: 400,
      err: err,
      data: null
    });
  }
});

router.get("/favorite", auth, async function(req, res, next) {
  try {
    const postLike = await LikeModel.find({
      createdBy: req.user._id,
      isDelete: false
    });
    const postFav = await NewsModel.find({ _id: postLike.News });
    return res.json({
      code: 200,
      err: null,
      data: postFav
    });
  } catch (err) {
    return res.json({
      code: 400,
      err: err,
      data: null
    });
  }
});

router.get("/bestNews", auth, async function(req, res, next) {
  try {
    const Newss = await NewsModel.find({ isDelete: false }).sort({
      avangeRating: "desc"
    });
    return res.json({
      code: 200,
      err: null,
      data: Newss
    });
  } catch (err) {
    return res.json({
      code: 400,
      err: err,
      data: null
    });
  }
});

module.exports = router;
