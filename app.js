const Koa = require('koa');
// 获取请求中body参数
const parser = require('koa-bodyparser');
// 工具类函数
const InitManager = require('./core/init');
const app = new Koa();
InitManager.InitCore(app);
app.use(parser());
app.listen(3000);
