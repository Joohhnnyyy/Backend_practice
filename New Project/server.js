import app from './src/app.js';
import {createServer} from 'http';
import {Server} from 'socket.io';

const httpServer = createServer(app);
const io = new Server(httpServer, { /* options */ });

io.on("connection", (socket) => {
  // ...
  console.log('new Connection ')
  socket.on("message", (msg)=>{
    console.log("user messaged ")
    console.log(msg)
    io.emit("abc",msg)
  })

});
// io => server 
// socket => single user 
// on => event ko listen karna 
// emit => event ki fire krna 

httpServer.listen(3000,() => {
  console.log('Server is running on port 3000');
});