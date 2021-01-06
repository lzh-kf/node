'use strict';
let message = 'token已过期'
module.exports = () => {
  return async function (ctx, next) {
    const authorization = ctx.request.headers.authorization;
    const publicKey = ctx.app.config.publicKey;
    try {
      const valid = ctx.helper.jwt.verify(authorization, publicKey);
      if (valid) {
        ctx.userInfo = valid;
        await next();
      } else {
        ctx.helper.setBody(null, { message }, 1001);
      }
    } catch (error) {
      ctx.helper.setBody(null, message, 1001);
    }
  };
};
