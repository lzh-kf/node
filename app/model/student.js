'use strict';

const defaultSchema = require('../utils/baseModel');

module.exports = app => {
  const mongoose = app.mongoose;
  mongoose.set('useFindAndModify', false);
  const Schema = mongoose.Schema;
  const StudentSchema = new Schema({
    // 名字
    name: {
      required: true,
      type: String,
      minlength: 2,
      maxlength: 30,
    },
    // 班级
    class: {
      required: true,
      type: String,
      maxlength: 300,
    },
    // 兴趣
    interest: {
      required: false,
      type: String,
      maxlength: 300,
      default: null,
    },
    // 性别
    gender: {
      required: false,
      type: String,
      default: '0',
      // 0代表女 1代表男
      enum: ['0', '1'],
    },
    ...defaultSchema
  });
  return mongoose.model('Student', StudentSchema);
};

