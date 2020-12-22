'use strict';
module.exports = () => {
  return async function(ctx, next) {
    const authorization = ctx.request.headers.authorization;
    const publicKey = ctx.app.config.publicKey;
    try {
      const valid = ctx.helper.jwt.verify(authorization, publicKey);
      if (valid) {
        ctx.userInfo = valid;
        await next();
      } else {
        ctx.helper.setBody(null, { message: '用户无权限' });
      }
    } catch (error) {
      ctx.helper.setBody(null, '无效的token，请检查token');
    }
  };
};
