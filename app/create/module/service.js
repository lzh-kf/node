'use strict';

`const Service = require('./base');
class {{service}}Service extends Service {
  constructor(model) {
    super(model);
    this.model = this.ctx.model.{{tableName}};
  }
}

module.exports = {{service}}Service`;
