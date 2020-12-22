'use strict';

// 权限表
module.exports = app => {
  const mongoose = app.mongoose;
  mongoose.set('useFindAndModify', false);
  const Schema = mongoose.Schema;
  const PermissionSchema = new Schema({
    // 父级Id
    parentId: {
      required: true,
      type: Number,
    },
    // 行为
    action: {
      required: true,
      type: String,
      maxlength: 30,
    },
    // 权限Id
    permissionId: {
      required: true,
      type: String,
    },
    // 权限名（查询）
    permissionName: {
      required: true,
      type: String,
      maxlength: 30,
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
  return mongoose.model('Permission', PermissionSchema);
};

