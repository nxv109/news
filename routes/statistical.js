const express = require("express");
const cron = require("node-cron");
const ViewModel = require("../models/View");
const StatisticModel = require("../models/Statistical");
const NewsModel = require("../models/News");
const UsersModel = require("../models/User");

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

// len lich thong ke views ngay
cron.schedule("0 0 23 * * *", async function(req, res) {
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
    const { id, createdBy } = req.body;
    if (id) {
      const newsViews = new ViewModel({
        news: id,
        createdBy: createdBy
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
router.get('/viewsOfDay', async (req, res) => {
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

router.get("/viewsOfMonth", async (req, res) => {
  try {
    const month = req.query.month;
    console.log(month);

    const startMonth = new Date(
      moment(month)
      .startOf("month")
      .format("YYYY-MM-DD")
    );

    const endMonth = new Date(
      moment(startMonth)
      .endOf("month")
      .format("YYYY-MM-DD")
    );
 
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
      data: viewToMonth
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

// journalist

router.get("/channels/follows", async (req, res) => {
  try {
    const { channelId } = req.query;
    const Users = await UsersModel.find({
      isDelete: false,
      role: "journalist",
      _id: channelId
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

// top 5 bai viet
router.get("/channels/bestNews", async (req, res) => {
  try {
    const { channelId } = req.query;
    const Users = await NewsModel.find({
      isDelete: false,
      createdBy: channelId
    }).limit(5).sort({ view: -1 });

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

router.get("/viewsOfMonthByChannel", async (req, res) => {
  try {
    const { month, channelId } = req.query;
    console.log(month, channelId);

    const startMonth = new Date(
      moment(month)
      .startOf("month")
      .format("YYYY-MM-DD")
    );

    const endMonth = new Date(
      moment(startMonth)
      .endOf("month")
      .format("YYYY-MM-DD")
    );
 
    const viewToMonth = await ViewModel.find({
        isDelete: false,
        date: {
          $gte: startMonth,
          $lte: endMonth
        },
        createdBy: channelId
      }).sort({
        view: -1
      })
      .populate("createdBy");

    return res.json({
      data: viewToMonth
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
