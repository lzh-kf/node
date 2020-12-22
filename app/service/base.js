'use strict';

const CurdService = require('./curd.js');
class BaseService extends CurdService {
  constructor(model) {
    super(model);
    this.model = model;
  }
  async paginationFind(query = {}) {
    try {
      const data = await this.index(query);
      return data;
    } catch (error) {
      return error;
    }
  }
}
module.exports = BaseService;
