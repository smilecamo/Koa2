// 数据库配置
const {
  dbName,
  host,
  port,
  user,
  password
} = require('../config/config').database;
const Sequelize = require('sequelize');

const sequelize = new Sequelize(dbName, user, password, {
  dialect: 'mysql',
  host,
  port,
  logging: true,
  timezone: '+08:00',
  define: {
    // 添加时间戳属性 (updatedAt, createdAt)
    timestamps: true,
    // 不删除数据库条目,但将新添加的属性deletedAt设置为当前日期(删除完成时).
    // paranoid 只有在启用时间戳时才能工作
    paranoid: true,
    // 时间戳
    createAt: 'created_at',
    updatedAt:'updated_at',
    deletedAt:'deleted_at',
    underscored:true
  }
});
sequelize.sync();
module.exports = {
  db: sequelize
};
