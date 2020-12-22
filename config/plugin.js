'use strict';

/** @type Egg.EggPlugin */
module.exports = {
  // had enabled by egg
  // static: {
  //   enable: true,
  // }
  // 模板引擎
  nunjucks: {
    enable: true,
    package: 'egg-view-nunjucks',
  },
  // 数据库
  mongoose: {
    enable: true,
    package: 'egg-mongoose',
  },
  // 跨域处理
  cors: {
    enable: true,
    package: 'egg-cors',
  },
  // 参数校验
  validate: {
    enable: true,
    package: 'egg-validate',
  },
  // redis缓存
  redis: {
    enable: true,
    package: 'egg-redis',
  },
};
