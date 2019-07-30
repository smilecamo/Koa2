const Router = require('koa-router');
const router = new Router({
  prefix: '/v1/classic'
});
const {Auth} = require('../../../middle/auth')
const { paramsError } = require('../../../core/http-exception');
const { PositiveIntegerValidator } = require('../../validators/validator');

router.get('/latest',new Auth().m, async (ctx, next) => {
  ctx.body=ctx.auth
});

module.exports = router;
