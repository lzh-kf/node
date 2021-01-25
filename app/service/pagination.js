'use strict';
const dayjs = require('dayjs')

const Service = require('egg').Service;

// 分页函数
class PaginationService extends Service {
  constructor(model) {
    super(model);
    this.model = model;
  }
  // 查询
  async index (query = {}, ignoreParam = {}) {
    try {
      const [beginRow, endRow] = this.getPaginationParams(query);
      const params = this.getQueryParams(query);
      const count = await this.model.count(params);
      const list = await this.model.find(params, ignoreParam).skip(beginRow).limit(endRow)
        .lean(true);
      this.formatDate(list)
      return {
        count,
        list,
      };
    } catch (error) {
      return error;
    }
  }
  formatDate (list) {
    list.forEach(item => {
      ['createTime', 'updateTime'].forEach(key => {
        if (item[key] && dayjs(item[key]).isValid()) {
          item[key] = dayjs(item[key]).format('YYYY-MM-DD HH:mm:ss')
        }
      })
    })
  }
  // 获取查询参数
  getQueryParams (query) {
    const params = {};
    const filterKeys = ['pageNum', 'pageSize'];
    Object.keys(query).forEach(key => {
      if (!filterKeys.includes(key) && query[key] !== undefined) {
        if ([true, false].includes(query[key])) {
          params[key] = query[key];
        } else {
          // 模糊查询
          params[key] = new RegExp(query[key]);
        }
      }
    });
    return params;
  }
  // 获取分页参数
  getPaginationParams (query) {
    const beginRow = Number(query.pageNum * query.pageSize - query.pageSize);
    const endRow = Number(query.pageSize || 10);
    return [beginRow, endRow];
  }
}
module.exports = PaginationService;
