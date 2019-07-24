const Koa = require('koa')

const app = new Koa()

app.use((ctx,next)=>{
  console.log('-----第一个---------');
  next()
})
app.use((ctx,next)=>{
  console.log('-----第二个---------');
  next()
})

app.listen(3000)