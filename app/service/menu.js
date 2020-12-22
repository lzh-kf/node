'use strict';

const Service = require('./base');
class MenuService extends Service {
  constructor(model) {
    super(model);
    this.model = this.ctx.model.Menu;
  }
}
module.exports = MenuService;
