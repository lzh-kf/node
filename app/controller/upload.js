'use strict';

const Controller = require('egg').Controller;

class UploadController extends Controller {
  async index () {
    const { ctx } = this;
    try {
      const file = ctx.request.files[0];
      const size = 2
      const flag = await ctx.helper.checkFileSize(file.filepath, size);
      if (!flag) {
        ctx.helper.setBody(null, {
          message: `上传文件大小最大为${size}M`,
        });
        return;
      }
      const path = await ctx.service.upload.index(file);
      ctx.helper.setBody({ path });
    } catch (error) {
      ctx.helper.setBody(null, error);
    }
  }
}

module.exports = UploadController;
