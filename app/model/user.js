'use strict';

const defaultSchema = require('../utils/baseModel');

// 用户表
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const UserSchema = new Schema({
    // 用户名
    userName: {
      type: String,
      required: true,
    },
    // 用户账号
    userAccount: {
      type: String,
      required: true,
    },
    // 邮箱
    email: {
      type: String,
      required: true,
    },
    // 密码
    password: {
      type: String,
      required: true,
    },
    // 角色Id
    roleId: {
      type: Array,
      required: true,
    },
    // 用户名
    isSuper: {
      type: Boolean,
      required: false,
      default: false,
    },
    ...defaultSchema
  });

  return mongoose.model('User', UserSchema);
};

