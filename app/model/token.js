'use strict';

// token表
module.exports = app => {
  const mongoose = app.mongoose;
  mongoose.set('useFindAndModify', false);
  const Schema = mongoose.Schema;
  const TokenSchema = new Schema({
    // 菜单名
    tokenId: {
      required: true,
      type: String,
    },
    // 创建时间
    createTime: {
      required: false,
      type: Date,
      default: new Date(),
    },
    // 更新时间
    updateTime: {
      required: false,
      type: Date,
      default: new Date(),
    },
  });
  return mongoose.model('Token', TokenSchema);
};

