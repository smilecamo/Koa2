const Router = require('koa-router');
const { TokenValidator } = require('../../validators/validator');
const { LoginType } = require('../../lib/enum');
const router = new Router({
  // 路由前缀
  prefix: '/v1/token'
});

router.post('/', async (ctx, next) => {
  const v = await new TokenValidator().validate(ctx);
  switch (v.get('body.type')) {
    case LoginType.USER_EMAIL:
      break;
    case LoginType.USER_MINI_PROGRAM:
      break;
    default:
      break;
  }
  throw new global.errs.Success();
});
async function emailLogin(account,secret){
  
}
module.exports = router;
