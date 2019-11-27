const express = require('express');
const router = express.Router();

const FollowerModel = require("../models/Follow");
const UserModel = require("../models/User");

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

// follow
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
        message: "Following"
      });
    }
  } catch (e) {
    res.json({
      code: 400,
      message: e
    });
  }
});

router.put("/increase/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const userExist = await UserModel.findOne({ _id: _id });

    if (userExist) {
      const body = req.body;

      const updateFollow =  await UserModel.findOneAndUpdate({ _id: _id }, { follow: body.follow });
      const followers = await FollowerModel.find({});

      if (updateFollow) {
        return res.json({
          code: 200,
          message: "Theo dõi thành công",
          data: followers
        });
      }
    }
  } catch (err) {
    console.log(err);
    return res.json({
      code: 400,
      message: "Theo dõi thất bại",
      err: err,
      data: null
    });
  }
});

// unfollow
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const checkFollwer = await FollowerModel.findOne({ _id: id });
    console.log(id);

    if (checkFollwer) {

      const removeFollower = await FollowerModel.findOneAndDelete({ _id: id });
      // const followers = await FollowerModel.find({});

      if (removeFollower) {
        res.json({
          code: 200,
          message: "Huy Following thanh cong"
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

router.put("/decrease/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const userExist = await UserModel.findOne({ _id: _id });

    if (userExist) {
      const body = req.body;

      const updateFollow =  await UserModel.findOneAndUpdate({ _id: _id }, { follow: body.follow });
      const followers = await FollowerModel.find({});

      if (updateFollow) {
        return res.json({
          code: 200,
          message: "Bỏ theo dõi thành công",
          data: followers
        });
      }
    }
  } catch (err) {
    console.log(err);
    return res.json({
      code: 400,
      message: "Bỏ theo dõi thất bại",
      err: err,
      data: null
    });
  }
});

module.exports = router;
