'use strict';

const Controller = require('egg').Controller;
const sendEmail = require('../utils/email')
const rule = {
  userName: { type: 'string', required: true },
  userAccount: { type: 'string', required: true },
  password: { type: 'string', required: true },
  sourcePassword: { type: 'string', required: true },
  roleId: { type: 'array', required: true },
};
class UserController extends Controller {

  // 新建用户
  async create () {
    const { ctx } = this;
    const { body } = ctx.request;
    const { userName, password, roleId, userAccount, isSuper, email, sourcePassword } = body;
    const params = { userName, password, userAccount, roleId, email };
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
        try {
          sendEmail({
            email,
            subject: '后台管理账号注册信息',
            html: `<p>账号:${Info.userAccount}</p>
          <p>密码:${sourcePassword}</p>
          <a href="http://172.30.15.16:8080/?userAccount=${Info.userAccount}&password=${sourcePassword}" target="_blank">登陆网址</a>`
          });
        } catch (error) {
          ctx.logger.info('发送失败', error)
        }
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
    const { userName, password, roleId, _id, isSuper, email, sourcePassword } = body;
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
        email,
        updateTime: new Date(),
      };
      if (password) {
        userInfo.password = password;
      }
      const Info = await ctx.service.user.update({ _id }, userInfo);
      if (Info) {
        ctx.helper.setBody({ message: '更新成功' });
        if (sourcePassword) {
          try {
            sendEmail({
              email,
              subject: '后台管理账号变更后信息',
              html: `<p>账号:${Info.userAccount}</p>
            <p>密码:${sourcePassword}</p>
             <a href="http://172.30.15.16:8080/?userAccount=${Info.userAccount}&password=${sourcePassword}" target="_blank">登陆网址</a>`
            });
          } catch (error) {
            ctx.logger.info('发送失败', error)
          }
        }
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
        email: { type: 'string', maxLength: 30, required: false },
      };
      ctx.helper.validate(rules);
      const data = await ctx.service.user.paginationFind({ ...ctx.request.body, isSuper: false }, { password: 0 });
      ctx.helper.setBody(data);
    } catch (error) {
      ctx.helper.setBody(null, error);
    }
  }
}
module.exports = UserController;

