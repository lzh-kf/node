'use strict';

const Controller = require('egg').Controller;


const rule = {
  userAccount: { type: 'string', required: true },
  password: { type: 'string', required: true },
};
class HomeController extends Controller {
  // 登录
  async login () {
    const { ctx } = this;
    const { body } = ctx.request;
    const { userAccount, password } = body;
    try {
      ctx.helper.validate(rule);
      const userInfo = await ctx.service.user.findOne({ userAccount, password });
      if (userInfo) {
        const { userName, userAccount, roleId, isSuper } = userInfo;
        const token = ctx.helper.jwt.createToken({ roleId, userAccount, isSuper }, ctx.app.config.publicKey);
        ctx.helper.setBody({ token, userInfo: { userName, userAccount } });
      } else {
        ctx.helper.setBody(null, '账号或密码错误请检查');
      }
    } catch (error) {
      ctx.helper.setBody(null, error);
    }
  }
  // 登出
  async logout () {
    const { ctx } = this;
    const tokenId = ctx.request.headers.authorization;
    try {
      const isExict = await ctx.service.token.findOne({ tokenId });
      if (!isExict) {
        await ctx.service.token.save({ tokenId });
        ctx.helper.setBody('退出成功');
      }
    } catch (error) {
      ctx.helper.setBody(null, error);
    }
  }
  // 刷新token
  async refreshToken () {
    const {ctx} = this;
    const userAccount = ctx.request.body.userAccount;
    try {
      ctx.helper.validate({
        userAccount: { type: 'string', required: true },
      });
      const userInfo = await ctx.service.user.findOne({ userAccount });
      if (userInfo) {
        const { userAccount, roleId, isSuper } = userInfo;
        const token = ctx.helper.jwt.createToken({ roleId, userAccount, isSuper }, ctx.app.config.publicKey);
        ctx.helper.setBody({ token });
      } else {
        ctx.helper.setBody(null, '该账号下无用户信息');
      }
    } catch (error) {
      ctx.helper.setBody(null, error);
    }
  }
  // 查询菜单和权限
  async queryMenusAndPermission () {
    const { ctx, app } = this;
    const { roleId, userAccount, isSuper } = ctx.userInfo;
    const roleQuery = this.setRoleQuery(roleId);
    try {
      let menus
      let permissions
      //如果是超级管理员则直接查去所有数据
      if (isSuper) {
        menus = await ctx.service.menu.findAll({});
        permissions = await ctx.service.permission.findAll({});
      } else {
        const roles = await ctx.service.role.findAll(roleQuery);
        const menuQuery = this.setMenuQuery(roles);
        const permisionQuery = this.setPermisionQuery(roles);
        menus = await ctx.service.menu.findAll(menuQuery);
        permissions = await ctx.service.permission.findAll(permisionQuery);
      }
      await app.redis.set(`${userAccount}permissions`, JSON.stringify(permissions));
      ctx.permissions = permissions;
      ctx.helper.setBody({ menus, permissions });
    } catch (error) {
      ctx.helper.setBody(null, '服务端错误');
    }
  }
  setRoleQuery (roles) {
    const roleQuery = { $or: [] };
    roles.forEach(roleId => {
      roleQuery.$or.push({ roleId });
    });
    return roleQuery;
  }
  setMenuQuery (roles) {
    const menuQuery = { $or: [] };
    roles.forEach(item => {
      item.menuIds.forEach(menuId => {
        menuQuery.$or.push({ menuId });
      });
    });
    return menuQuery;
  }
  setPermisionQuery (roles) {
    const permisionQuery = { $or: [] };
    roles.forEach(item => {
      item.permissionIds.forEach(permissionId => {
        permisionQuery.$or.push({ permissionId });
      });
    });
    return permisionQuery;
  }
}

module.exports = HomeController;
