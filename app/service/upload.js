'use strict';

const Service = require('egg').Service;
const fs = require('fs');
const path = require('path');
class UploadService extends Service {
  constructor(ctx) {
    super(ctx);
    const baseDir = ctx.app.baseDir;
    const basePath = path.join(baseDir, '/app/public/');
    this.basePath = basePath;
  }
  // 上传
  async index({ filepath, filename }) {
    try {
      const data = await fs.readFileSync(filepath);
      await fs.writeFileSync(this.basePath + filename, data);
      return filename;
    } catch (error) {
      return error;
    } finally {
      // 删除本地磁盘临时文件
      fs.unlinkSync(filepath);
    }
  }
  async saveBookCover({ filepath, filename }) {
    const { ctx } = this;
    const currentFilePath = `{this.basePath}bookCover/${filename}.jpg`;
    try {
      const data = await ctx.curl(filepath, {
        method: 'get',
        timeout: 5000,
      }); await fs.writeFileSync(currentFilePath, data.data);
      return '/public/bookCover/' + filename + '.jpg';
    } catch (error) {
      for (let i = 0; i < 2; i++) {
        try {
          const data = await ctx.curl(filepath, {
            method: 'get',
            timeout: 5000,
          });
          await fs.writeFileSync(currentFilePath, data.data);
          return '/public/bookCover/' + filename + '.jpg';
        } catch (error) {
          break;
        }
      }
      return null;
    }
  }
}
module.exports = UploadService;
