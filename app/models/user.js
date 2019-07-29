const { Sequelize, Model } = require('sequelize');
const bcrypt = require('bcryptjs');
const { db } = require('../../core/db');

class User extends Model {
  
}

User.init(
  {
    id: {
      // 类型
      type: Sequelize.INTEGER,
      // 主键设置
      primaryKey: true,
      // id自增
      autoIncrement: true
    },
    nickname: Sequelize.STRING,
    email: {
      type: Sequelize.STRING(32),
      unique: true
    },
    password: {
      type: Sequelize.STRING,
      set(val) {
        // 盐
        const salt = bcrypt.genSaltSync(10);
        // 加密密码
        const psw = bcrypt.hashSync(val, salt);
        this.setDataValue('password',psw);
      }
    },
    openid: {
      type: Sequelize.STRING(64),
      unique: true
    }
  },
  {
    sequelize: db,
    tableName: 'user'
  }
);

module.exports = {
  User
};
