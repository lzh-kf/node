'use strict';

const Service = require('./base');
class StudentService extends Service {
  constructor(model) {
    super(model);
    this.model = this.ctx.model.Student;
  }
}
module.exports = StudentService;
