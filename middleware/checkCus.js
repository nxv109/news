const cookie = require('cookie');
var express = require('express');
const UserModle = require('../models/User');
const jwt = require("jsonwebtoken");
const key = {
    tokenKey: "djghhhhuuwiwuewieuwieuriwu"
}

const authCus = async function (req, res, next) {
    const token = req.header('auth-token');
    if (!token) {

    } else {
        try {
            const verified = jwt.verify(token, key.tokenKey);
            const userCheck = await UserModle.findOne({ _id: verified._id });
            if (userCheck.role === 'customer' || userCheck.role === "admin") {
                req.user = userCheck;
                req.user.password = null;
                next();
            } else {
                return res.json({
                    code: 401,
                    message: "k co quyen dang nhap",
                    data: null
                })
            }
        } catch (err) {
            return res.json({
                code: 400,
                message: " token khong hop le",
                data: null
            })
        }
    }
}

module.exports = authCus;