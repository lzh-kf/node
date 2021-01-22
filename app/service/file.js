'use strict';

const Service = require('./base');
class FileService extends Service {
  constructor(model) {
    super(model);
    this.model = this.ctx.model.File;
  }
}

module.exports = FileService;
