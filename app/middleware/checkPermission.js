'use strict';
const { interfaceMap } = require('../utils/const');
module.exports = () => {
  return async function(ctx, next) {
    const authorization = ctx.request.headers.authorization;
    const publicKey = ctx.app.config.publicKey;
    try {
      const valid = ctx.helper.jwt.verify(authorization, publicKey);
      if (valid) {
        const { userAccount } = valid;
        let permissions = await ctx.app.redis.get(`${userAccount}permissions`);
        permissions = permissions ? JSON.parse(permissions) : {};
        const key = ctx.request.url;
        const action = interfaceMap[key];
        const isexcit = permissions.find(i => i.action === action);
        if (isexcit) {
          await next();
        } else {
          ctx.helper.setBody(null, { message: '用户无权限' });
        }
      } else {
        ctx.helper.setBody(null, { message: '用户无权限' });
      }
    } catch (error) {
      ctx.helper.setBody(null, 'token校验失败');
    }
  };
};
