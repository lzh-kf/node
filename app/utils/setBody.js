'use strict';
const { dataType } = require('./index');

/**
  * param { object } data 响应数据
  * param { object||string } error 错误对象error:{message:""}或者message(字符串)
  * param { object } ctx 上下文对象
  * return void
  */
/* code映射
1001 token失效 */
function setBody (data, error, err_code, ctx) {
  if (error) {
    const type = dataType(error);
    if (type === 'object') {
      ctx.body = {
        err_code: err_code || 1,
        error,
      };
    } else if (type === 'string') {
      ctx.body = {
        err_code: err_code || 1,
        error: {
          message: error,
        },
      };
    }
  } else {
    ctx.body = {
      err_code: 0,
      data,
    };
  }
}


module.exports = setBody;
