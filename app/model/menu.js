'use strict';

// 菜单表
module.exports = app => {
  const mongoose = app.mongoose;
  mongoose.set('useFindAndModify', false);
  const Schema = mongoose.Schema;
  const MenuSchema = new Schema({
    // 菜单名
    menuName: {
      required: true,
      type: String,
    },
    // 父级Id
    parentId: {
      required: false,
      type: Number,
      default: 0,
    },
    // 自增Id
    menuId: {
      required: false,
      type: Number,
    },
    // 页面路径
    path: {
      required: true,
      type: String,
      maxlength: 100,
    },
    // 组件文件路径
    componentFilePath: {
      required: true,
      type: String,
      maxlength: 100,
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
  return mongoose.model('Menu', MenuSchema);
};

