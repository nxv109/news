const express = require("express");
const cron = require("node-cron");
const ViewModel = require("../models/View");
const StatisticModel = require("../models/Statistical");
const NewsModel = require("../models/News");
const Users = require("../models/User");

const moment = require("moment");
let timedate = moment().format();
const router = express.Router();

// lay time bat dau va ket thuc
const today = new Date(
  moment(timedate)
  .utc()
  .startOf("day")
  .toDate()
);

const endDay = new Date(
  moment(today)
  .utc()
  .endOf("day")
  .toDate()
);

// len lich cap nhap tong views ngay
cron.schedule("0 30 9 * * *", async function(req, res) {
  console.log("running...");

  try {
    // get tin tuc trong ngay
    const allNews = await ViewModel.find({
      isDelete: false,
      date: {
        $gte: today,
        $lte: endDay
      }
    });

    // dem luot views cua tung tin tuc
    const countView = allNews.reduce((a, b) => {
      a[b['news']] = (++a[b['news']]) || 1;
      return a;
    }, {});

    // convert thanh arr -> thuc hien loop -> get key,value ( news id, views )
    const rs = Object.entries(countView);

    // add vao database
    rs.forEach(([key, value]) => {
      const statistic = new StatisticModel({
        view: value,
        news: key,
        date: today
      });
      const statisticClass = statistic.save();
    });
  } catch (err) {
    return res.json({
      data: null,
      code: 400,
      err: err.message
    });
  }
});

router.get("/channels", async (req, res) => {
  try {
    const Users = await UsersModel.find({
      isDelete: false,
      role: "journalist"
    });

    if (Users) {
      return res.json({
        code: 200,
        err: null,
        data: Users
      });
    }
  } catch (error) {
    return res.json({
      code: 400,
      err: error
    });
  }
});

// ADD tin tuc trong ngay de thong ke thoi diem nguoi dung xem tin
router.post("/news", async (req, res) => {
  try {
    const id = req.body.id;
    if (id) {
      const newsViews = new ViewModel({
        news: id
      });

      const saveNewsViews = await newsViews.save();

      if (saveNewsViews) {
        return res.json({
          code: 200,
          err: null,
          data: newsViews
        });
      }
    }

  } catch (error) {
    return res.json({
      code: 400,
      err: error
    });
  }
});

// GET tin tuc trong ngay de thong ke thoi diem nguoi dung xem tin
router.get('/news', async (req, res) => {
  try {
    const news = await ViewModel.find({
      isDelete: false,
      date: {
        $gte: today,
        $lte: endDay
      }
    });

    res.json({
      code: 200,
      data: news
    })
  } catch (e) {
    res.json({
      code: 400,
      message: e
    })
  }
});

router.get("/viewsOfDay", async (req, res) => {
  try {
    const today = moment().startOf("day");
    // console.log(today);
    const viewToDay = await ViewModel.find({
        isDelete: false,
        date: {
          $gte: today.toDate(),
          $lte: moment(today)
            .endOf("day")
            .toDate()
        }
      })
      .sort({
        view: -1
      })
      .populate("news");

    return res.json({
      data: viewToDay
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

router.get("/viewsOfMonth", async (req, res) => {
  try {
    const startMonth = moment()
      .startOf("month")
      .format("YYYY-MM-DD hh:mm");
    const endMonth = moment()
      .endOf("month")
      .format("YYYY-MM-DD hh:mm");
    const viewToMonth = await ViewModel.find({
        isDelete: false,
        date: {
          $gte: startMonth,
          $lte: endMonth
        }
      }).sort({
        view: -1
      })
      .populate("createdBy");

    return res.json({
      viewToMonth
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

module.exports = router;
