'use strict';

const PaginationService = require('./pagination.js');
class CurdService extends PaginationService {
  constructor(model) {
    super(model);
    this.model = model;
  }
  // 查询所有
  async findAll(query) {
    try {
      const info = await this.model.find(query).lean(true);
      return info;
    } catch (error) {
      return error;
    }
  }
  // 查询单个
  async findOne(query) {
    try {
      const info = this.model.findOne(query);
      return info;
    } catch (error) {
      return error;
    }
  }
  // 保存
  async save(params) {
    try {
      const model = new this.model(params);
      const info = await model.save();
      return info;
    } catch (error) {
      return error;
    }
  }
  // 更新
  async update(query, doc) {
    try {
      const info = await this.model.findOneAndUpdate(query, doc);
      return info;
    } catch (error) {
      return error;
    }
  }
  // 删除
  async del(query) {
    try {
      const info = await this.model.findOneAndDelete(query);
      return info;
    } catch (error) {
      return error;
    }
  }
}
module.exports = CurdService;
