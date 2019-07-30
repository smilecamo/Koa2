class HttpException extends Error {
  constructor(msg = '服务器错误', errorCode = 10001, code = 400) {
    super();
    this.msg = msg;
    this.code = code;
    this.errorCode = errorCode;
  }
}
class paramsError extends HttpException {
  constructor(msg = '参数错误', errorCode = 10000) {
    super();
    this.msg = msg;
    this.errorCode = errorCode;
  }
}
class Success extends HttpException {
  constructor(msg = 'ok', errorCode = 0) {
    super();
    this.code = 201;
    this.msg = msg;
    this.errorCode = errorCode;
  }
}
class NotFound extends HttpException {
  constructor(msg = '资源未找到', errorCode = 10000) {
    super();
    this.code = 404;
    this.msg = msg;
    this.errorCode = errorCode;
  }
}
class AuthFailed extends HttpException {
  constructor(msg = '授权失败', errorCode = 10004) {
    super();
    this.code = 401;
    this.msg = msg;
    this.errorCode = errorCode;
  }
}
class Forbbiden extends HttpException {
  constructor(msg = '禁止访问', errorCode = 10006) {
    super();
    this.code = 403;
    this.msg = msg;
    this.errorCode = errorCode;
  }
}
module.exports = {
  HttpException,
  paramsError,
  Success,
  NotFound,
  AuthFailed,
  Forbbiden
};
