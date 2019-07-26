const Koa = require('koa');
// 获取请求中body参数
const bodyParser = require('koa-bodyparser');
// 工具类函数
const InitManager = require('./core/init');
// 全局异常处理
const throwError = require('./middle/exception');
const app = new Koa();
app.use(throwError);
app.use(bodyParser());
InitManager.InitCore(app);
app.listen(3000);