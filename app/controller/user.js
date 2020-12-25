'use strict';

const Controller = require('egg').Controller;
const rule = {
  userName: { type: 'string', required: true },
  userAccount: { type: 'string', required: true },
  password: { type: 'string', required: true },
  roleId: { type: 'array', required: true },
};
class UserController extends Controller {

  // 新建用户
  async create () {
    const { ctx } = this;
    const { body } = ctx.request;
    const { userName, password, roleId, userAccount, isSuper } = body;
    const params = { userName, password, userAccount, roleId };
    try {
      ctx.helper.validate(rule);
      if (isSuper) {
        ctx.helper.setBody(null, '不允许添加超级管理员');
        return
      }
      const isExcit = await ctx.service.user.findOne({ userName, userAccount });
      if (isExcit) {
        ctx.helper.setBody(null, '该用户已存在');
      } else {
        const Info = await ctx.service.user.save(params);
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
      const userInfo = await ctx.service.user.findOne({ _id });
      if (userInfo.isSuper) {
        ctx.helper.setBody(null, '不允许删除超级管理员');
      } else {
        const userInfo = await ctx.service.user.del({ _id });
        if (userInfo) {
          ctx.helper.setBody({ message: '删除成功' });
        } else {
          ctx.helper.setBody(null, '删除失败');
        }
      }
    } catch (error) {
      ctx.helper.setBody(null, error);
    }
  }
  // 更新
  async update () {
    const { ctx } = this;
    const { body } = ctx.request;
    const { userName, password, roleId, _id, isSuper } = body;
    if (isSuper) {
      ctx.helper.setBody(null, '不允许添加超级管理员');
      return
    }
    try {
      const rules = {
        userName: { type: 'string', required: true },
        userAccount: { type: 'string', required: true },
        roleId: { type: 'array', required: true }
      }
      ctx.helper.validate(rules);
      const userInfo = {
        userName,
        roleId,
        updateTime: new Date(),
      };
      if (password) {
        userInfo.password = password;
      }
      const Info = await ctx.service.user.update({ _id }, userInfo);
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
    try {
      const rules = {
        pageSize: { type: 'number', max: 100, min: 1, required: true },
        pageNum: { type: 'number', min: 1, required: true },
        userName: { type: 'string', maxLength: 30, required: false },
      };
      ctx.helper.validate(rules);
      const data = await ctx.service.user.paginationFind(ctx.request.body);
      this.setData(data.list);
      ctx.helper.setBody(data);
    } catch (error) {
      ctx.helper.setBody(null, error);
    }
  }
  setData (data) {
    // 过滤超级管理员
    data = data.filter(item => !item.isSuper)
    data.forEach((item) => {
      delete item.password;
    });
  }
}
module.exports = UserController;

