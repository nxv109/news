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

// get latestnews
router.get("/latestNews", async function(req, res, next) {
  try {
    const News = await NewsModel.find({ status: 'published' }).limit(8).sort({ dateCreate: -1 })
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

// news other
router.get("/other", async function(req, res, next) {
  try {
    const number = +req.query.number;
    console.log(typeof number);
    const News = await NewsModel.find({ status: 'published' }).limit(number).sort({ view: -1 })
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

// news ( status = "published" )
router.get("/published", async function(req, res, next) {
  try {
    const News = await NewsModel.find({ status: 'published', view: { $gt: 9 } }).limit(3).sort({ view: -1 })
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

// news ( isDelete = false ) by id user
router.get("/:id", async function(req, res, next) {
  try {
    const id = req.params.id;
    const News = await NewsModel.find({ createdBy: { _id: id }, isDelete: false })
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

// news ( edit )
router.get("/new/:id", async function(req, res, next) {
  try {
    const id = req.params.id;
    const News = await NewsModel.find({ _id: id })
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
router.get("/trash/:id", async function(req, res, next) {
  try {
    const id = req.params.id;
    const News = await NewsModel.find({ createdBy: { _id: id }, isDelete: true })
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

// show news of category ( status = "published" )
router.get("/categories/:id", async function(req, res, next) {
  try {
    const id = req.params.id;
    const News = await NewsModel.find({ status: 'published', cateNews: { _id: id } })
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

// show news of users ( status = "published" ) channel
router.get("/users/:id", async function(req, res, next) {
  try {
    const id = req.params.id;
    const News = await NewsModel.find({ status: 'published', createdBy: { _id: id } })
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

// tin tức tương tự
router.get("/similar/:id", async function(req, res, next) {
  try {
    const id = req.params.id;
    const News = await NewsModel.find({ status: 'published', cateNews: { _id: id } }).limit(8)
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

    const news = News[0];
    const data = {
      title: news.title,
      content: news.content,
      categoryId: news.cateNews._id,
      categoryName: news.cateNews.name,
      tags: news.tag,
      articlePicture: news.articlePicture
    };

    return res.json({
      code: 200,
      err: null,
      data: data
    });
  } catch (err) {
    return res.json({
      code: 400,
      err: err.messege,
      data: null
    });
  }
});

// get news detail
router.get("/details/:_idNews", async function(req, res, next) {
  try {
    const idNews = req.params._idNews;
    const News = await NewsModel.find({
      _id: idNews,
      isDelete: false
    })
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

    if (JSON.parse(body.draft)) {
      const News = new NewsModel({
        title: body.title,
        content: body.content,
        tag: JSON.parse(body.tags),
        cateNews: body.category,
        status: "draft",
        createdBy: body.createdBy,
        articlePicture: file.name
      });

      const NewsClass = await News.save();

      return res.json({
        code: 200,
        message: "Đã lưu vào nháp",
        data: NewsClass
      });
    } else {
      const News = new NewsModel({
        title: body.title,
        content: body.content,
        tag: JSON.parse(body.tags),
        cateNews: body.category,
        createdBy: body.createdBy,
        articlePicture: file.name
      });

      const NewsClass = await News.save();

      return res.json({
        code: 200,
        message: "Gửi yêu cầu thành công",
        data: NewsClass
      });
    }
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

router.put("/:_id", async function(req, res, next) {
  try {
    const _id = req.params._id;
    const newExist = await NewsModel.findOne({ _id: _id });

    if (newExist) {
      const body = req.body;
      const files = req.files;

      if (files) {
        files.file.mv(`${__dirname}/../client/public/uploads/news/${files.file.name}`);

        const news = {
          title: body.title,
          content: body.content,
          cateNews: body.categoryId,
          tag: JSON.parse(body.tags),
          articlePicture: files.file.name
        };

        if (news) {
          await NewsModel.findOneAndUpdate({ _id: _id }, news);

          return res.json({
            code: 200,
            message: "Sửa bài viết thành công"
          });
        }
      } else {
        const news = {
          title: body.title,
          content: body.content,
          cateNews: body.categoryId,
          tag: JSON.parse(body.tags)
        };

        if (news) {
          await NewsModel.findOneAndUpdate({ _id: _id }, news);

          return res.json({
            code: 200,
            message: "Sửa bài viết thành công"
          });
        }
      }
    }
  } catch (err) {
    console.log(err);
    return res.json({
      code: 400,
      message: "Sửa bài viết thất bại",
      err: err,
      data: null
    });
  }
});

// increase views
router.put("/views/:_id", async function(req, res, next) {
  try {
    const _id = req.params._id;
    const newExist = await NewsModel.findOne({ _id: _id });

    if (newExist) {
      const views = req.body.views;
      const increaseViews = await NewsModel.findOneAndUpdate(
        { _id: _id },
        { view: views }
      );

      const news = await NewsModel.find({
        _id: _id,
        isDelete: false
      })
        .populate("createdBy");

      if (increaseViews) {
        res.json({
          code: 200,
          data: news
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

// Give up draft
router.put("/giveUpDraft/:_id", async function(req, res, next) {
  try {
    const _id = req.params._id;
    const newExist = await NewsModel.findOne({ _id: _id });

    if (newExist) {
      const giveUpDraft = await NewsModel.findOneAndUpdate(
        { _id: _id },
        { status: "new" }
      );
      const news = await NewsModel.find({});

      if (giveUpDraft) {
        res.json({
          code: 200,
          message: "Bỏ nháp thành công",
          data: news
        });
      }
    }
  } catch (err) {
    return res.json({
      code: 400,
      message: "Bỏ nháp thất bại",
      err: err,
      data: null
    });
  }
});

// save draft
router.put("/saveDraft/:_id", async function(req, res, next) {
  try {
    const _id = req.params._id;
    const newExist = await NewsModel.findOne({ _id: _id });

    if (newExist) {
      const giveUpDraft = await NewsModel.findOneAndUpdate(
        { _id: _id },
        { status: "draft" }
      );
      const news = await NewsModel.find({});

      if (giveUpDraft) {
        res.json({
          code: 200,
          message: "Lưu nháp thành công",
          data: news
        });
      }
    }
  } catch (err) {
    return res.json({
      code: 400,
      message: "Lưu nháp thất bại",
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
      const news = await NewsModel.find({})
        .populate("createdBy");

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
      const news = await NewsModel.find({ isDelete: true })
        .populate("createdBy");

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
      const news = await NewsModel.find({ isDelete: true })
        .populate("createdBy");

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

module.exports = router;
