'use strict';

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
    //  创建时间
    createDate: {
      type: Date,
      default: new Date(),
    },
    // 更新时间
    updateDate: {
      type: Date,
      default: new Date(),
    },
  });

  return mongoose.model('User', UserSchema);
};

