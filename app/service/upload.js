'use strict';

const Service = require('egg').Service;
const fs = require('fs');
const path = require('path');
const { getTimestamp } = require('../utils/index')
const ip = 'http://127.0.0.1:7001/public/image/';
class UploadService extends Service {
  constructor(ctx) {
    super(ctx);
    const baseDir = ctx.app.baseDir;
    const basePath = path.join(baseDir, '/app/public/image/');
    this.basePath = basePath;
  }
  // 上传
  async index ({ filepath, filename }) {
    try {
      const data = await fs.readFileSync(filepath);
      const currentTimestamp = getTimestamp()
      await fs.writeFileSync(this.basePath + currentTimestamp + filename, data);
      return ip + currentTimestamp + filename;
    } catch (error) {
      return error;
    } finally {
      // 删除本地磁盘临时文件
      fs.unlinkSync(filepath);
    }
  }
}
module.exports = UploadService;
