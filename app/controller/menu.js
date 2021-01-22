'use strict';

const Controller = require('egg').Controller;
const rule = {
  menuName: { type: 'string', required: true },
  path: { type: 'string', required: true },
  componentFilePath: { type: 'string', required: true },
  icon: { type: 'string', required: true },
};
class MenuController extends Controller {
  // 创建
  async create () {
    const { ctx } = this;
    const { body } = ctx.request;
    const { menuName, path, componentFilePath, parentId } = body;
    const params = { menuName, path, componentFilePath, icon };
    try {
      ctx.helper.validate(rule);
      const isExcit = await ctx.service.menu.findOne(params);
      if (isExcit) {
        ctx.helper.setBody(null, '该菜单已存在');
      } else {
        const list = await ctx.service.menu.findAll();
        this.setIdandParentId(params, list, parentId);
        const Info = await ctx.service.menu.save(params);
        Info && ctx.helper.setBody({ message: '创建成功' });
      }
    } catch (error) {
      ctx.helper.setBody(null, error);
      return;
    }
  }
  // 设置父级和自身id
  setIdandParentId (params, list, parentId) {
    if (list.length) {
      params.parentId = Number(parentId || 0);
      params.menuId = ++(list.pop().menuId);
    } else {
      params.menuId = 1;
      params.parentId = 0;
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
      ctx.helper.validate(rule);
      const menuInfo = await ctx.service.menu.del({ _id });
      if (menuInfo) {
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
    const { menuName, path, componentFilePath, menuId, icon, parentId = 0 } = body;
    try {
      const customRule = {
        menuId: { type: 'number', required: true },
      };
      ctx.helper.validate({ ...customRule, ...rule });
      const menuInfo = {
        menuName,
        path,
        componentFilePath,
        menuId,
        parentId,
        icon,
        updateTime: new Date(),
      };
      const Info = await ctx.service.menu.update({ menuId }, menuInfo);
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
      const data = await ctx.service.menu.findAll();
      ctx.helper.setBody(this.setData(data));
    } catch (error) {
      ctx.helper.setBody(null, error);
    }
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
    return data.filter(item => item.parentId === 0);
  }
}
module.exports = MenuController;
