const express = require('express');
const router = express.Router();

// Models
const UserModel = require("../models/User");
const NewsModel = require("../models/News");
const CommentModel = require("../models/Comment");

router.get('/:id', async (req, res) => {

	try {
		const NewsId = req.params.id;
		const CommentsOfNews = await CommentModel.find({ news: NewsId }).limit(5).sort({ date: -1 }).populate("createdBy");

		return res.json({
			code: 200,
			data: CommentsOfNews
		});
	}
	catch (e) {
		return res.json({
			code: 400,
			message: e
		});
	}
});

router.post('/', async (req, res) => {
	try {
		const body = req.body;

		const comment = new CommentModel({
			news: body.newsId,
			createdBy: body.userId,
			content: body.content
		});

		const saveComment = await comment.save();
		const CommentsOfNews = await CommentModel.find({ news: body.newsId }).limit(5).sort({ date: -1 }).populate("createdBy");

		return res.json({
			code: 200,
			data: CommentsOfNews
		});
	}
	catch (e) {
		return res.json({
			code: 400,
			message: e
		});
	}
});

router.get("/", async function(req, res, next) {
  try {
    const _id = req.query.commentId;
    const newsId = req.query.newsId;
    console.log(newsId);
    const commentExist = await CommentModel.findOne({ _id: _id });

    if (commentExist) {
      const commentDelete = await CommentModel.findOneAndDelete({ _id: _id });
      const CommentsOfNews = await CommentModel.find({ news: newsId }).limit(5).sort({ date: -1 }).populate("createdBy");

      if (commentDelete) {
        res.json({
          code: 200,
          message: "Xóa thành công",
          data: CommentsOfNews
        });
      }
    }
  } catch (err) {
    return res.json({
      code: 400,
      message: "Xóa thất bại",
      err: err
    });
  }
});

module.exports = router;