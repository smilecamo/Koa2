const Router = require('koa-router');
const requireDirectory = require('require-directory');
class InitManager {
  static InitCore(app) {
    // 入口方法
    InitManager.app = app;
    InitManager.error();
    InitManager.initLoadRouters();
    InitManager.loadConfig();
  }
  // 自动加载路由函数
  static initLoadRouters() {
    // process.cwd() //返回 Node.js 进程的当前工作目录 ;
    const apiDirectory = `${process.cwd()}/app/api`;
    requireDirectory(module, apiDirectory, {
      visit: whenLoadModule
    });
    function whenLoadModule(obj) {
      if (obj instanceof Router) {
        InitManager.app.use(obj.routes());
      }
    }
  }
  //
  static loadConfig(path = '') {
    const configPath = path || process.cwd() + '/config/config.js';
    const config = require(configPath);
    global.config = config;
  }
  static error() {
    const errors = require('./http-exception');
    global.errs = errors;
  }
}

module.exports = InitManager;
