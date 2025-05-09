const http=require('http');

const route=require('./routes.js');
route.testFun();
const server=http.createServer(route.handler)
server.listen(3000,()=>{
    console.log('server is listening on port 3000');
})
