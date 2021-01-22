'use strict';

const interfaceMap = {
  // 菜单路由
  '/menu/create': 'menu.create',
  '/menu/del': 'menu.del',
  '/menu/update': 'menu.update',
  '/menu/query': 'menu.query',
  // 权限路由
  '/permission/create': 'permission.create',
  '/permission/del': 'permission.del',
  '/permission/update': 'permission.update',
  '/permission/query': 'permission.query',
  // 角色路由
  '/role/create': 'role.create',
  '/role/del': 'role.del',
  '/role/update': 'role.update',
  '/role/query': 'role.query',
  '/role/queryAll': 'role.queryAll',
  // 用户路由
  '/user/create': 'user.create',
  '/user/del': 'user.del',
  '/user/update': 'user.update',
  '/user/query': 'user.query',
  // 学生信息
  '/student/create': 'student.create',
  '/student/update': 'student.update',
  '/student/del': 'student.del',
  '/student/query': 'student.query',
  '/student/download': 'student.download',
  // 上传
  '/base/upload': 'base.upload'
};

module.exports = {
  interfaceMap,
};
