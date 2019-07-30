const Router = require('koa-router');
const { TokenValidator } = require('../../validators/validator');
const { LoginType } = require('../../lib/enum');
const { User } = require('../../models/user');
const { Auth } = require('../../../middle/auth');
const { generateToken } = require('../../../core/util');
const router = new Router({
  // 路由前缀
  prefix: '/v1/token'
});

router.post('/', async (ctx, next) => {
  const v = await new TokenValidator().validate(ctx);
  let token;
  // 登录方式验证
  switch (v.get('body.type')) {
    case LoginType.USER_EMAIL:
      token = await emailLogin(v.get('body.account'), v.get('body.secret'));
      break;
    case LoginType.USER_MINI_PROGRAM:
      break;
    default:
      throw new global.errs.paramsError('没有相应的处理函数');
  }
  ctx.body = {
    token
  };
});
// 邮箱登录验证函数
async function emailLogin (account, secret) {
  const user = await User.verifyEmailPassword(account, secret);
  return (token = generateToken(user.id, Auth.USER));
}
module.exports = router;
