/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
const path = require('path');
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1600074591429_4676';

  // 运行中间件配置
  config.middleware = ['authentication', 'checkToken', 'checkPermission'];

  // 配置鉴权白名单
  config.authentication = {
    enable: true,
    ignore: ['/login', '/public/', '/logout', '/refreshToken'], // 哪些请求不需要
  };

  // 配置权限白名单
  config.checkPermission = {
    enable: true,
    ignore: ['/login', '/public/', '/queryMenusAndPermission', '/refreshToken', '/logout'] // 哪些请求不需要校验权限
  };

  // 配置校验无效token白名单
  config.checkToken = {
    enable: true,
    ignore: ['/login', '/refreshToken', '/logout'], // 哪些请求不需要认证
  };

  config.publicKey = 'egg-key';

  //  mongodb数据库配置
  config.mongoose = {
    client: {
      url: 'mongodb://127.0.0.1/test',
      options: {},
      plugins: [],
    },
  };

  // redis缓存配置
  config.redis = {
    client: {
      port: 6379, // Redis port
      host: '127.0.0.1', // Redis host
      password: 'auth',
      db: 0,
    },
  };

  // cors配置
  exports.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS',
  };

  // 关闭csrf校验
  exports.security = {
    csrf: {
      enable: false,
    },
  };

  // 上传文件类型配置
  exports.multipart = {
    mode: 'file',
    fileExtensions: ['.doc', '.xls', '.txt'],
  };

  // 前后端不分离的时候才会用到
  // exports.security = {
  //   csrf: {
  //     queryName: '_csrf', // 通过 query 传递 CSRF token 的默认字段为 _csrf
  //     bodyName: '_csrf',
  //   },
  // };

  // 模板引擎配置
  exports.view = {
    root: [
      path.join(appInfo.baseDir, 'app/view'),
    ].join(','),
    mapping: {
      '.nj': 'nunjucks',
    },
    defaultViewEngine: 'nunjucks',
    defaultExtension: '.nj',
  };

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
