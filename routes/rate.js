var express = require("express");
const NewsModel = require("../models/News");
const RateModel = require("../models/Rate");
var router = express.Router();
const auth = require("../middleware/auth");
const authCus = require("../middleware/checkCus");

router.get("/", auth, async function(req, res, next) {
  try {
    const rates = await RateModel.find({ isDelete: false })
      .populate("createdBy")
      .populate("news");
    return res.json({
      code: 200,
      err: null,
      data: rates
    });
  } catch (err) {
    return res.json({
      code: 400,
      err: err.messege,
      data: null
    });
  }
});

router.post("/news/:_idNews", authCus, async function(req, res, next) {
  try {
    const idNews = req.params._idNews;
    const comment = req.body.comment;
    const score = req.body.score;
    const newsCheck = await NewsModel.findOne({
      _id: idNews,
      isDelete: false
    });
    if (!newsCheck) {
      return res.json({
        message: "khong co san pham nay"
      });
    } else {
      const Rate = new RateModel({
        news: idNews,
        comment: comment,
        score: score,
        createdBy: req.user._id
      });
      const RateClass = await Rate.save();
      const rated = await RateModel.find({ news: idNews });
      let scoreRate = [];
      for (let i = 0; i < rated.length; i++) {
        scoreRate.push(rated[i].score);
      }
      let average = scoreRate.reduce((a, b) => a + b) / scoreRate.length;
      const ratePro = await NewsModel.findOneAndUpdate(
        { _id: idNews },
        { $inc: { ratingCount: 1 }, avangeRating: average }
      );
      return res.json({
        code: 200,
        err: null,
        data: RateClass,
        avgRate: average
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

router.put("/:_idRate", auth, async function(req, res, next) {
  try {
    const idRate = req.params._idRate;
    const score = req.body.score;
    const comment = req.body.comment;
    const checkRate = await RateModel.findOne({ _id: idRate });
    if (checkRate.createdBy.toString() == req.user._id.toString()) {
      const rateUpdate = await RateModel.findOneAndUpdate(
        { _id: idRate },
        { comment: comment, score: score }
      );
      const rated = await RateModel.find({ news: checkRate.news });
      console.log(rated);
      let scoreRate = [];
      for (let i = 0; i < rated.length; i++) {
        scoreRate.push(rated[i].score);
      }
      const average = scoreRate.reduce((a, b) => a + b) / scoreRate.length;
      const rateNews = await NewsModel.findOneAndUpdate(
        { _id: checkRate.news },
        { $inc: { ratingCount: 1 }, avangeRating: average }
      );
      return res.json({
        code: 200,
        data: rateUpdate,
        err: null,
        avg: average
      });
    }
  } catch (err) {
    return res.json({
      code: 400,
      messege: err.message,
      data: null
    });
  }
});

router.delete("/:_idRate", auth, async function(req, res, next) {
  try {
    const idRate = req.params._idNews;
    const rateCheck = await RateModel.findOne({ _id: idRate, isDelete: false });
    if (!rateCheck) {
      return res.json({
        message: "khong co binh luan nay"
      });
    }
    if (
      rateCheck.createdBy.toString() == req.user._id.toString() ||
      req.user.role === "admin"
    ) {
      const rateUpdate = await RateModel.findOneAndUpdate(
        { _id: idRate },
        { isDelete: true }
      );
      const ratePro = await NewsModel.findOneAndUpdate(
        { _id: idNews },
        { $inc: { ratingCount: -1 } }
      );
      const rated = await RateModel.find({ news: idRate.news });
      let scoreRate = [];
      for (let i = 0; i < rated.length; i++) {
        scoreRate.push(rated[i].score);
      }
      let average = scoreRate.reduce((a, b) => a + b) / scoreRate.length;
      const ratePro = await NewsModel.findOneAndUpdate(
        { _id: idNews },
        { $inc: { ratingCount: 1 }, avangeRating: average }
      );
      return res.json({
        code: 200,
        err: null,
        data: rateUpdate,
        avgRate: average
      });
    } else {
      return res.json({ message: "khong co quyen thay doi" });
    }
  } catch (err) {
    return res.json({
      code: 400,
      err: err,
      data: null
    });
  }
});

router.get("/:_idRate", auth, async function(req, res, next) {
  try {
    const idRate = req.params._idRate;
    const rates = await RateModel.find({ _id: idRate, isDelete: false })
      .populate("createdBy")
      .populate("news");
    return res.json({
      code: 200,
      err: null,
      data: rates
    });
  } catch (err) {
    return res.json({
      code: 400,
      err: err.messege,
      data: null
    });
  }
});

module.exports = router;
