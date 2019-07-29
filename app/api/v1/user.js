const Router = require('koa-router');
const { User } = require('../../models/user');
const { RegisterValidator } = require('../../validators/validator');
const router = new Router({
  // 路由前缀
  prefix: '/v1/user'
});

router.post('/register', async (ctx, next) => {
  const v = await new RegisterValidator().validate(ctx);

  const user = {
    email: v.get('body.email'),
    password: v.get('body.password1'),
    nickname: v.get('body.nickname')
  };
  const r = await User.create(user);
});

module.exports = router;
