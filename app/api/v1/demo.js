const Router = require('koa-router');
const router = new Router();
const { paramsError } = require('../../../core//http-exception');
const { PositiveIntegerValidator } = require('../../validators/validator');
router.post('/demo/:id', (ctx, next) => {
  /**
   * ctx.param //获取:id
   * ctx.request.query // 获取?后面的
   * ctx.request.header //获取header中的(token类似的)
   * ctx.request.body //获取body中参数
   */
  const path = ctx.params;
  const query = ctx.request.query;
  const header = ctx.request.header;
  const body = ctx.request.body;
  const v = new PositiveIntegerValidator().validate(ctx);

  ctx.body = {
    path,
    query,
    header,
    body
  };
});

module.exports = router;
