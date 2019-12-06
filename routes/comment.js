const express = require('express');
const router = express.Router();

// Models
const UserModel = require("../models/User");
const NewsModel = require("../models/News");
const ProhibitedWordsModel = require("../models/ProhibitedWords");
const CommentModel = require("../models/Comment");

router.get('/prohibitedWords', async (req, res) => {
	try {
		const prohibitedWords = await ProhibitedWordsModel.find({});

		if (prohibitedWords) {
			return res.json({
				code: 200,
				data: prohibitedWords
			});
		}
	}
	catch (e) {
		return res.json({
			code: 400,
			message: e
		});
	}
});

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


// comment
router.post('/', async (req, res) => {
	try {
		const body = req.body;

		// check từ ngữ cấm
		const prohibitedWords = await ProhibitedWordsModel.find({});
		const words = prohibitedWords[0].words;
		const content = body.content;

		if (words && content) {
			const getWord = content.split(" ");

			let result = "";

			function checkLength (number) {
			  switch (number) {
			    case 2:
			      return "**";
			    case 3:
			      return "***";
			    case 4:
			      return "****";
			    default:
			      return "*****";
			  }
			};

			getWord.forEach(v => {
			  if (words.includes(v)) {
			    result = content.replace(v, checkLength(v.length));
			  } else {
			  	result = content;
			  }
			});

			const comment = new CommentModel({
				news: body.newsId,
				createdBy: body.userId,
				content: result
			});

			const saveComment = await comment.save();
			const CommentsOfNews = await CommentModel.find({ news: body.newsId }).limit(5).sort({ date: -1 }).populate("createdBy");

			return res.json({
				code: 200,
				data: CommentsOfNews
			});
		}
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

// them tu comment cấm

router.put("/prohibitedWords", async (req, res) => {
	try {
		const body = req.body;

		const words = await ProhibitedWordsModel.find({});
		const pushWords = [ ...words[0].words, body.word ];

		await ProhibitedWordsModel.findOneAndUpdate({ _id: "5de60e175ec272280876975e" }, { words: pushWords });

		return res.json({
			code: 200,
      message: "Thêm thành công"
		});
	} catch (e) {
		return res.json({
      code: 400,
      message: "Thêm thất bại",
      err: err
    });
	}
});

module.exports = router;