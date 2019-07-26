const { HttpException } = require('../core/http-exception');
const throwError = async (ctx, next) => {
  try {
    await next();
  } catch (error) {
    // 已知异常
    if (global.config.environment === 'dev') {
      throw error
    }
    if (error instanceof HttpException) {
      ctx.body = {
        msg: error.msg,
        error_code: error.errorCode,
        requestUrl: `${ctx.method} ${ctx.path}`
      };
      ctx.status = error.code;
    } else {
      // 未知异常
      ctx.body = {
        msg: 'we made a mistake',
        error_code: 999,
        requestUrl: `${ctx.method} ${ctx.path}`
      };
      ctx.status = 500;
    }
  }
};

module.exports = throwError;
