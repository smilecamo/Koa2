// 校验token
const basicAuth = require('basic-auth');
const jwt = require('jsonwebtoken');
class Auth {
  constructor(level) {
    // 权限等级
    this.level = level || 1;
    Auth.USER = 8;
    Auth.ADMIN = 16;
  }
  get m() {
    return async (ctx, next) => {
      const userToken = basicAuth(ctx.req);
      let msg = 'token不合法';
      // 判断token合法性
      if (!userToken || !userToken.name) {
        throw new global.errs.Forbbiden(msg);
      }
      // token 合法性验证
      try {
        var decode = jwt.verify(
          userToken.name,
          global.config.security.secretKey
        );
      } catch (error) {
        if (error.name == 'TokenExpiredError') {
          msg = 'token已经过期';
          throw new global.errs.Forbbiden(msg);
        }
        throw new global.errs.Forbbiden(msg);
      }
      if (decode.scope < this.level) {
        msg = '权限不足';
        throw new global.errs.Forbbiden(msg);
      }
      ctx.auth = {
        uid: decode.uid,
        scope: decode.scope
      };
      await next();
    };
  }
}

module.exports = {
  Auth
};
