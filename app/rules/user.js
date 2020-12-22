'use strict';

// 校验规则
// 用户信息
const userInfoRule = {
  userName: { type: 'string', maxLength: 12, minLength: 3, required: true },
  password: { type: 'string', maxLength: 12, minLength: 6, required: true },
};
// key和中文名的映射关系
const userInfoMap = {
  userName: '用户名',
  password: '密码',
};
module.exports = {
  userInfoRule,
  userInfoMap,
};
