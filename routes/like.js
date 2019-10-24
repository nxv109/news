var express = require("express");
const NewsModel = require("../models/News");
const LikeModel = require("../models/Like");
var router = express.Router();

const auth = require("../middleware/auth");
const authAdmin = require("../middleware/checkAdmin");
const authCus = require("../middleware/checkCus");

router.get("/", auth, async function(req, res, next) {
  try {
    if (req.user.role == "admin") {
      const likes = await LikeModel.find({ isDelete: false })
        .populate("createdBy")
        .populate("news");
      return res.json({
        code: 200,
        err: null,
        data: likes
      });
    }
    if (req.user.role == "customer") {
      const likes = await LikeModel.find({
        isDelete: false,
        createdBy: req.user._id
      })
        .populate("createdBy")
        .populate("news");
      return res.json({
        code: 200,
        err: null,
        data: likes
      });
    }
  } catch (err) {
    return res.json({
      code: 400,
      err: err.messege,
      data: null
    });
  }
});

router.post("/:_idNews", authCus, async function(req, res, next) {
  try {
    const idNews = req.params._idNews;
    const likeCheck = await LikeModel.findOne({
      news: idNews,
      createdBy: req.user._id
    });
    if (!likeCheck) {
      const Like = new LikeModel({ news: idNews, createdBy: req.user._id });
      const newlike = await Like.save();
      const liked = await NewsModel.findOneAndUpdate(
        { _id: idNews },
        { $inc: { countLike: 1 } }
      );
      console.log(liked);
      return res.json({
        code: 200,
        message: "like thanh cong",
        likeCount: liked.countLike,
        data: null
      });
    }
    if (likeCheck.isDelete == true) {
      const unlike = await LikeModel.findOneAndUpdate(
        { news: idNews, createdBy: req.user._id },
        { isDelete: false }
      );
      const liked = await NewsModel.findOneAndUpdate(
        { _id: idNews },
        { $inc: { countLike: 1 } }
      );
      return res.json({
        code: 200,
        message: "like thanh cong",
        likeCount: liked.countLike
      });
    } else {
      const liked = await NewsModel.findOne({ _id: idNews, isDelete: false });
      console.log(liked);
      return res.json({
        code: 200,
        message: "da like bai nay",
        likeCount: liked.countLike
      });
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

router.post("/unlike/:_idNews", auth, async function(req, res, next) {
  try {
    const idNews = req.params._idNews;
    const likeCheck = await LikeModel.findOne({
      news: idNews,
      createdBy: req.user._id
    });
    if (!likeCheck) {
      const liked = await NewsModel.findOne({ _id: idNews, isDelete: false });
      return res.json({
        code: 200,
        message: "chua like bai nay",
        likeCount: liked.countLike
      });
    } else {
      if (likeCheck.isDelete === false) {
        const unlike = await LikeModel.findOneAndUpdate(
          { news: idNews, createdBy: req.user._id },
          { isDelete: true }
        );
        const liked = await NewsModel.findOneAndUpdate(
          { _id: idNews },
          { $inc: { countLike: -1 } }
        );
        return res.json({
          code: 200,
          message: "unlike thanh cong",
          likeCount: liked.countLike
        });
      } else {
        const liked = await NewsModel.findOne({ _id: idNews });
        return res.json({
          code: 200,
          message: "chua like bai nay",
          likeCount: liked.countLike
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

module.exports = router;
