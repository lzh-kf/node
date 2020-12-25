'use strict';

const defaultSchema = require('../utils/baseModel');

// 角色表
module.exports = app => {
  const mongoose = app.mongoose;
  mongoose.set('useFindAndModify', false);
  const Schema = mongoose.Schema;
  const RoleSchema = new Schema({
    // 角色名
    roleName: {
      required: true,
      type: String,
    },
    roleId: {
      required: true,
      type: Number,
    },
    // 菜单Id
    menuIds: {
      required: true,
      type: Array,
    },
    // 权限Id
    permissionIds: {
      required: true,
      type: Array,
    },
    ...defaultSchema
  });
  return mongoose.model('Role', RoleSchema);
};

