'use strict';

const Controller = require('egg').Controller;
const { rules, map } = require('../rules/student');
class StudentCOntroller extends Controller {
  // 创建
  async create () {
    const { ctx } = this;
    const { body } = ctx.request;
    const { name, interest, gender } = body;
    try {
      ctx.helper.validate(rules, map);
      const isExcit = await ctx.service.student.findOne({ name });
      if (isExcit) {
        ctx.helper.setBody(null, '该学生已存在');
      } else {
        const studentInfo = {
          name,
          class: body.class,
          gender,
          interest,
        };
        const Info = await ctx.service.student.save(studentInfo);
        Info && ctx.helper.setBody({ message: '创建成功' });
      }
    } catch (error) {
      ctx.helper.setBody(null, error);
    }
  }
  // 删除
  async del () {
    const { ctx } = this;
    const { body } = ctx.request;
    const { _id } = body;
    try {
      const rule = {
        _id: { type: 'string', required: true },
      };
      ctx.helper.validate(rule, { _id: 'ID' });
      const studentInfo = await ctx.service.student.del({ _id });
      if (studentInfo) {
        ctx.helper.setBody({ message: '删除成功' });
      } else {
        ctx.helper.setBody(null, '删除失败');
      }
    } catch (error) {
      ctx.helper.setBody(null, error);
    }
  }
  // 更新
  async update () {
    const { ctx } = this;
    const { body } = ctx.request;
    const { name, gender, interest, _id } = body;
    try {
      const userInfoRule = {
        _id: { type: 'string', required: true },
      };
      ctx.helper.validate({ ...userInfoRule, ...rules }, { ...map, ...{ _id: 'ID' } });
      const studentInfo = {
        class: body.class,
        interest,
        gender,
        name,
        updateTime: new Date(),
      };
      const Info = await ctx.service.student.update({ _id }, studentInfo);
      if (Info) {
        ctx.helper.setBody({ message: '更新成功' });
      } else {
        ctx.helper.setBody(null, { message: '更新失败' });
      }
    } catch (error) {
      ctx.helper.setBody(null, error);
    }
  }
  // 查询
  async query () {
    const { ctx } = this;
    const rules = {
      pageSize: { type: 'number', max: 100, min: 1, required: true },
      pageNum: { type: 'number', min: 1, required: true },
      name: { type: 'string', maxLength: 30, required: false },
      class: { type: 'string', maxLength: 300, required: false },
      gender: { type: 'string', required: false, emun: ['0', '1'] },
      interest: { type: 'string', maxLength: 300, required: false },
    };
    const customMap = {
      pageSize: 'pageSize',
      pageNum: 'pageNum',
    };
    try {
      ctx.helper.validate(rules, { ...map, ...customMap });
      const data = await ctx.service.student.paginationFind(ctx.request.body);
      ctx.helper.setBody(data);
    } catch (error) {
      ctx.helper.setBody(null, error);
    }
  }
  // 下载
  async download () {
    const { ctx } = this;
    const rules = {
      name: { type: 'string', maxLength: 30, required: false },
      class: { type: 'string', maxLength: 300, required: false },
      gender: { type: 'string', required: false, emun: ['0', '1'] },
      interest: { type: 'string', maxLength: 300, required: false },
    };
    try {
      ctx.helper.validate(rules, map);
      const studentInfo = await ctx.service.student.findAll(ctx.request.body);
      const buffer = await ctx.service.excel.downlaod(studentInfo, '学生信息表.xls');
      ctx.helper.setBody(buffer);
    } catch (error) {
      ctx.helper.setBody(null, error);
    }
  }
}
module.exports = StudentCOntroller;
