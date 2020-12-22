'use strict';

// 校验规则
const rules = {
  name: { type: 'string', maxLength: 30, minLength: 2, required: true },
  class: { type: 'string', maxLength: 300, minLength: 5, required: true },
  interest: { type: 'string', required: true, maxlength: 300 },
  gender: { type: 'string', required: true, enum: [ '0', '1' ] },
};
// 关系映射
const map = {
  name: '名字',
  class: '班级',
  interest: '兴趣',
  gender: '性别',
};
module.exports = {
  rules,
  map,
};
