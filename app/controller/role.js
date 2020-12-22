'use strict';

const Controller = require('egg').Controller;
const rule = {
  roleName: { type: 'string', required: true },
  menuIds: { type: 'array', required: true },
  permissionIds: { type: 'array', required: true },
};
class RoleController extends Controller {
  // 创建
  async create () {
    const { ctx } = this;
    const { body } = ctx.request;
    const { roleName, menuIds, permissionIds } = body;
    const params = { roleName, menuIds, permissionIds };
    try {
      ctx.helper.validate(rule);
      const isExcit = await ctx.service.role.findOne(params);
      if (isExcit) {
        ctx.helper.setBody(null, '该角色已存在');
      } else {
        const list = await ctx.service.role.findAll();
        this.setId(params, list);
        const Info = await ctx.service.role.save(params);
        Info && ctx.helper.setBody({ message: '创建成功' });
      }
    } catch (error) {
      ctx.helper.setBody(null, error);
      return;
    }
  }
  // 设置roleId
  setId (params, list) {
    params.roleId = list.length ? ++(list.pop().roleId) : 1
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
      const query = {
        _id,
      };
      const users = await ctx.service.user.findAll();
      const currentRole = await ctx.service.role.findOne(query);
      if (this.checkRoleIsCanDel(users, currentRole)) {
        const roleInfo = await ctx.service.role.del(query);
        if (roleInfo) {
          ctx.helper.setBody({ message: '删除成功' });
        } else {
          ctx.helper.setBody(null, '删除失败');
        }
      } else {
        ctx.helper.setBody(null, '该角色下面存在用户关联，不可删除');
      }
    } catch (error) {
      ctx.helper.setBody(null, error);
    }
  }
  checkRoleIsCanDel (users, currentRole) {
    if (currentRole) {
      const { length } = users;
      for (let i = 0; i < length; i++) {
        const { roleId } = users[i];
        if (roleId.includes(currentRole.roleId)) {
          return false;
        }
      }
      return true;
    }
    return true;

  }
  // 更新
  async update () {
    const { ctx } = this;
    const { body } = ctx.request;
    const { roleName, menuIds, permissionIds, roleId } = body;
    try {
      ctx.helper.validate(rule);
      const roleInfo = {
        roleName,
        menuIds,
        permissionIds,
        updateTime: new Date(),
      };
      const Info = await ctx.service.role.update({ roleId }, roleInfo);
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
        roleName: { type: 'string', maxLength: 30, required: false },
      };
      ctx.helper.validate(rules);
      const data = await ctx.service.role.paginationFind(ctx.request.body);
      ctx.helper.setBody(data);
    } catch (error) {
      ctx.helper.setBody(null, error);
    }
  }
  // 查询
  async queryAll () {
    const { ctx } = this;
    try {
      const data = await ctx.service.role.findAll(ctx.request.body);
      ctx.helper.setBody(data);
    } catch (error) {
      ctx.helper.setBody(null, error);
    }
  }
}
module.exports = RoleController;
