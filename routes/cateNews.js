var express = require('express');
const CateNewsModel = require('../models/CateNews')
const NewsModel = require('../models/News');
// const RateModel = require('../models/Rate');
// const UserModel = require('../models/User');
// const LikeModel = require('../models/Like');
// const ViewModel = require('../models/View');
var router = express.Router();
const auth = require('../middleware/auth');
const authAdmin = require('../middleware/checkAdmin');
const authCus = require('../middleware/checkCus');


router.get('/', auth, async function (req, res, next) {
    try {
        const cateNews = await CateNewsModel.find({ isDelete: false }).populate('createdBy');
        return res.json({
            code: 200,
            err: null,
            data: cateNews
        })
    } catch (err) {
        console.log(err);
        return res.json({
            code: 400,
            err: err.messege,
            data: null
        })
    }
});

router.get('/:_idCate', auth, async function (req, res, next) {
    try {
        const _idCate = req.params._idCate;
        const cateNews = await CateNewsModel.find({ _id: _idCate, isDelete: false }).populate('createdBy');
        return res.json({
            code: 200,
            err: null,
            data: cateNews
        })
    } catch (err) {
        console.log(err);
        return res.json({
            code: 400,
            err: err.messege,
            data: null
        })
    }
});

router.post('/', authAdmin, async function (req, res, next) {
    try {
        const name = req.body.name;
        const Category = new CateNewsModel({ "name": name, "createdBy": req.user._id });
        const CategoryClass = await Category.save();
        return res.json({
            code: 200,
            data: CategoryClass,
            err: null
        })
    } catch (err) {
        return res.json({
            code: 400,
            err: err,
            data: null
        })
    }
})

router.put('/:_id', authAdmin, async function (req, res, next) {
    try {
        const _id = req.params._id;
        const name = req.body.name;
        const cateCheck = await CateNewsModel.findOne({ _id: _id });
        if (cateCheck == null) {
            return res.json({
                data: null,
                messege: "Khong co san pham nay",
                code: 200
            })
        } if (cateCheck != null) {
            const cateUpdate = await CateNewsModel.updateOne({ _id: _id }, { "name": name, "createdBy": req.user._id });
            return res.json({
                code: 200,
                data: { cateUpdate },
                err: null
            })
        }
    } catch (err) {
        return res.json({
            code: 400,
            err: err,
            data: null
        })
    }
})

router.delete('/:_id', authAdmin, async function (req, res, next) {
    try {
        const _id = req.params._id;
        const name = req.body.name;
        const cateCheck = await CateNewsModel.findOne({ _id: _id });
        if (cateCheck == null) {
            return res.json({
                data: null,
                messege: "Khong co san pham nay",
                code: 200
            })
        } if (cateCheck != null) {
            const cateDelete = await CateNewsModel.updateOne({ _id: _id }, { isDelete: true });
            const proCate = await NewsModel.updateMany({ category: _id }, { isDelete: true });
            return res.json({
                code: 200,
                data: { cateDelete },
                err: null
            })
        }
    } catch (err) {
        console.log(err)
        return res.json({
            code: 400,
            err: err,
            data: null
        })
    }
})


module.exports = router;
