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
module.exports = {
  HttpException,
  paramsError
};
