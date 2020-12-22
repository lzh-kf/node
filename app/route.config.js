'use strict';

const fs = require('fs');

module.exports = async function(app) {
  const path = app.baseDir + '/app/routes';
  try {
    const files = await fs.readdirSync(path);
    files.forEach(fileName => require(`${path}/${fileName}`)(app));
  } catch (error) {
    console.log('路由加载错误:', error);
  }
};
