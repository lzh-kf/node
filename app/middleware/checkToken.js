'use strict';
let tokenIds = null;
module.exports = () => {
  return async function(ctx, next) {
    const authorization = ctx.request.headers.authorization;
    try {
      if (tokenIds) {
        if (tokenIds.includes(authorization)) {
          ctx.helper.setBody(null, { message: 'token已过期，请重新登录' });
        } else {
          await next();
        }
      } else {
        let _tokenIds = await ctx.service.token.findAll();
        _tokenIds = _tokenIds.map(item => item.tokenId);
        tokenIds = _tokenIds;
        if (_tokenIds.includes(authorization)) {
          ctx.helper.setBody(null, { message: 'token已过期，请重新登录' });
        } else {
          await next();
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
};
