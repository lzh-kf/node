'use strict';

const Service = require('./base');
class UserService extends Service {
  constructor(model) {
    super(model);
    this.model = this.ctx.model.User;
  }
}
module.exports = UserService;
