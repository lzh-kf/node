'use strict';

const defaultSchema = require('../utils/baseModel');

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
    ...defaultSchema
  });
  return mongoose.model('Token', TokenSchema);
};

