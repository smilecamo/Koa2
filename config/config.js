module.exports={
  // 环境区分
  environment:'dev',
  // 数据库配置
  database:{
    dbName:'demo',
    host:'localhost',
    port:3306,
    user:'root',
    password:'123456789qq'
  },
  // token key配置
  security:{
    secretKey:'shsadqqwcfssfhu12$^%&*()&%$%^',
    // 令牌过期时间
    expiresIn: 60*60*24*30
  }

}