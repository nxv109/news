var express = require("express");
const fileUpload = require("express-fileupload");
const NewsModel = require("../models/News");
const RateModel = require("../models/Rate");
const LikeModel = require("../models/Like");
const ViewModel = require("../models/View");
var router = express.Router();
const auth = require("../middleware/auth");
const authJour = require("../middleware/checkJournalist");
const authEditor = require("../middleware/checkEditor");
/* GET users listing. */

const app = express();
app.use(fileUpload());

// news ( isDelete = false )
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

// news ( isDelete = true )
router.get("/trash", async function(req, res, next) {
  try {
    const News = await NewsModel.find({ isDelete: true })
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

// add news
router.post("/", async function(req, res, next) {
  try {
    const body = req.body;
    const file = req.files.file;

    if (file) {
      file.mv(`${__dirname}/../client/public/uploads/news/${file.name}`);
    }

    const News = new NewsModel({
      title: body.title,
      content: body.content,
      tag: JSON.parse(body.tags),
      cateNews: body.category,
      createdBy: body.createdBy,
      articlePicture: file.name
    });

    const NewsClass = await News.save();

    return res.json({ code: 200, message: "Gửi yêu cầu thành công", data: NewsClass });
  } catch (err) {
    return res.json({
      code: 400,
      err: err,
      message: "Thêm thất bại"
    });
  }
});

// add news ( upload anh )
router.post("/upload", function(req, res, next) {
  try {
    const file = req.files.upload;

    console.log(file);

    file.mv(`${__dirname}/../client/public/uploads/news/${file.name}`);
  } catch (err) {
    return res.json({
      code: 400,
      err: err,
      message: "Upload thất bại"
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

// move a new to trash
router.put("/trash/:_id", async function(req, res, next) {
  try {
    const _id = req.params._id;
    const newExist = await NewsModel.findOne({ _id: _id });

    if (newExist) {
      const moveToTrash = await NewsModel.findOneAndUpdate(
        { _id: _id },
        { isDelete: true }
      );
      const news = await NewsModel.find({});

      if (moveToTrash) {
        res.json({
          code: 200,
          message: "Đã thêm vào giỏ rác",
          data: news
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
    const newExist = await NewsModel.findOne({ _id: _id });

    if (newExist) {
      const restoreFromTrash = await NewsModel.findOneAndUpdate(
        { _id: _id },
        { isDelete: false }
      );
      const news = await NewsModel.find({ isDelete: true });

      if (restoreFromTrash) {
        res.json({
          code: 200,
          message: "Restore thành công",
          data: news
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

router.delete("/:_id", async function(req, res, next) {
  try {
    const _id = req.params._id;
    const newExist = await NewsModel.findOne({ _id: _id });
    
    if (newExist) {
      const newDelete = await NewsModel.findOneAndDelete({ _id: _id });
      const news = await NewsModel.find({ isDelete: true });

      if (newDelete) {
        res.json({
          code: 200,
          message: "Xóa thành công",
          data: news
        });
      }
    }
  } catch (err) {
    return res.json({
      code: 400,
      message: "Xóa thất bại",
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
