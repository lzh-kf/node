'use strict';

const Controller = require('egg').Controller;
const rule = {
  parentId: { type: 'number', required: true },
  action: { type: 'string', required: true },
  permissionName: { type: 'string', required: true },
};
class PermissionController extends Controller {
  // 创建
  async create () {
    const { ctx } = this;
    const { body } = ctx.request;
    const { parentId, action, permissionName } = body;
    const params = { action, permissionName };
    try {
      ctx.helper.validate(rule);
      const isExcit = await ctx.service.permission.findOne(params);
      if (isExcit) {
        ctx.helper.setBody(null, '该权限已存在');
      } else {
        const params = { parentId, action, permissionName };
        const list = await ctx.service.permission.findAll();
        params.permissionId = list.length ? `${parentId}-${list.length + 1}` : `${parentId}-${1}`;
        const Info = await ctx.service.permission.save(params);
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
      const actionInfo = await ctx.service.permission.del({ _id });
      if (actionInfo) {
        ctx.helper.setBody({ message: '删除成功' });
      } else {
        ctx.helper.setBody(null, '删除成功');
      }
    } catch (error) {
      ctx.helper.setBody(null, error);
    }
  }
  // 更新
  async update () {
    const { ctx } = this;
    const { body } = ctx.request;
    const { parentId, action, permissionName, _id } = body;
    try {
      ctx.helper.validate(rule);
      const actionInfo = {
        parentId,
        action,
        permissionName,
        updateTime: new Date(),
      };
      const Info = await ctx.service.permission.update({ _id }, actionInfo);
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
      const menus = await ctx.service.menu.findAll();
      const permissions = await ctx.service.permission.findAll();
      const data = this.setPermission(menus, permissions);
      this.setData(menus);
      ctx.helper.setBody(data);
    } catch (error) {
      ctx.helper.setBody(null, error);
    }
  }
  setPermission (menus, permissions) {
    permissions.forEach(item => {
      const index = menus.findIndex(i => item.parentId === i.menuId);
      item.menuId = item.permissionId;
      item.menuName = item.permissionName;
      menus[index].children = menus[index].children || [];
      menus[index].children.push(item);
    });
    return menus.filter(item => item.parentId === 0);
  }
  setData (data) {
    const length = data.length;
    for (let i = 0; i < length; i++) {
      const item = data[i];
      for (let j = 0; j < length; j++) {
        const filterItem = data[j];
        if (item.menuId === filterItem.parentId) {
          item.children = item.children || [];
          item.children.push(filterItem);
        }
      }
    }
  }
}
module.exports = PermissionController;
