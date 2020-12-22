'use strict';

const Service = require('./base');
class PermissionService extends Service {
  constructor(model) {
    super(model);
    this.model = this.ctx.model.Permission;
  }
}
module.exports = PermissionService;
