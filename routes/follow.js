const express = require('express');
const router = express.Router();

const FollowerModel = require("../models/Follow");

router.get("/", async (req, res) => {
  try {
    const followers = await FollowerModel.find({});

    if (followers) {
      res.json({
        code: 200,
        data: followers
      });
    }
  } catch (e) {
    res.json({
      code: 400,
      message: e
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const body = req.body;
    const follower = new FollowerModel({
      channel: body.channel,
      followBy: body.user
    });

    const saveFollower = await follower.save();

    if (saveFollower) {
      res.json({
        code: 200,
        message: "Following",
        data: saveFollower
      });
    }
  } catch (e) {
    res.json({
      code: 400,
      message: e
    });
  }
});

router.delete("/", async (req, res) => {
  try {
    const body = req.body;
    const checkFollwer = await FollowerModel.findOne({ channel: body.channel, followBy: body.user });

    if (checkFollwer) {

      const removeFollower = await FollowerModel.findOneAndDelete({ channel: body.channel, followBy: body.user });
      const followers = await FollowerModel.find({});

      if (saveFollower) {
        res.json({
          code: 200,
          message: "Huy Following thanh cong",
          data: followers
        });
      }
    }

  } catch (e) {
    res.json({
      code: 400,
      message: e
    });
  }
});

module.exports = router;
