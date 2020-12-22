'use strict';

const Service = require('egg').Service;

// 分页函数
class PaginationService extends Service {
  constructor(model) {
    super(model);
    this.model = model;
  }
  // 查询
  async index(query = {}) {
    try {
      const [ beginRow, endRow ] = this.getPaginationParams(query);
      const params = this.getQueryParams(query);
      const count = await this.model.count(params);
      const list = await this.model.find(params).skip(beginRow).limit(endRow)
        .lean(true);
      const docs = {
        count,
        list,
      };
      return docs;
    } catch (error) {
      return error;
    }
  }
  // 获取查询参数
  getQueryParams(query) {
    const params = {};
    const filterKeys = [ 'pageNum', 'pageSize' ];
    Object.keys(query).forEach(key => {
      if (!filterKeys.includes(key) && query[key]) {
        params[key] = new RegExp(query[key]);
      }
    });
    return params;
  }
  // 获取分页参数
  getPaginationParams(query) {
    const beginRow = Number(query.pageNum * query.pageSize - query.pageSize);
    const endRow = Number(query.pageSize || 10);
    return [ beginRow, endRow ];
  }
}
module.exports = PaginationService;
