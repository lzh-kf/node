'use strict';

`const Controller = require('egg').Controller;

class {{ControllerName}}Controller extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'hi, egg';
  }
}

module.exports = {{ControllerName}}Controller`;
