const { LinValidator, Rule } = require('../../core/lin-validator-v2');
const { User } = require('../../app/models/user');
const { LoginType } = require('../lib/enum');
class PositiveIntegerValidator extends LinValidator {
  constructor() {
    super();
    this.id = [new Rule('isInt', '需要为正整数', { min: 1 })];
  }
}
class RegisterValidator extends LinValidator {
  constructor() {
    super();
    this.email = [new Rule('isEmail', '不符合email格式')];
    this.password1 = [
      new Rule('isLength', '密码6-32位', {
        min: 6,
        max: 32
      }),
      new Rule(
        'matches',
        '密码长度必须在6~22位之间，包含字符、数字和 _ ',
        '^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]'
      )
    ];
    this.password2 = this.password1;
    this.nickname = [
      new Rule('isLength', '昵称4-32位', {
        min: 4,
        max: 32
      })
    ];
  }
  // 自定义校验参数
  validatePassword(vals) {
    const pwd1 = vals.body.password1;
    const pwd2 = vals.body.password2;
    if (pwd1 !== pwd2) {
      throw new Error('两次密码需要保持一致');
    }
  }
  async validateEmail(vals) {
    const email = vals.body.email;
    const user = await User.findOne({
      where: {
        email
      }
    });
    if (user) {
      throw new Error('email 已经存在!');
    }
  }
}
class TokenValidator extends LinValidator {
  constructor() {
    super();
    this.account = [
      new Rule('isLength', '不符合账号规则', {
        min: 4,
        max: 32
      })
    ];
    this.secret = [
      // 可传可不传
      new Rule('isOptional'),
      new Rule('isLength', '最少6位', {
        min: 6,
        max: 128
      })
    ];
  }
  // 登录类型校验
  validateLoginType(vals) {
    if (!vals.body.type) {
      throw new Error('type为必传');
    }
    if (!LoginType.isThisType(vals.body.type)) {
      throw new Error('type参数不合法');
    }
  }
}
module.exports = {
  PositiveIntegerValidator,
  RegisterValidator,
  TokenValidator
};
