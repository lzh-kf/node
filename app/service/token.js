'use strict';

const Service = require('./base');
class TokenService extends Service {
  constructor(model) {
    super(model);
    this.model = this.ctx.model.Token;
  }
}
module.exports = TokenService;
