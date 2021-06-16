const express = require("express")
const http = require("http")
const app = express();
const server = http.createServer(app);
const path = require("path")
const socketIO = require("socket.io")

const io = socketIO(server);

const PORT = process.env.PORT || 5000;


app.set('view engine', 'ejs');
app.set('views', './views');


let room = ['room1', 'room2'];

let lobby =[];

let a = 0;


app.get('/', (req, res) => {
  res.render('lobby');
});

app.post('/enter', function(req,res){
});


let nickname = "";
app.post("/nickname", function(req, data){
  console.log(req);
  nickname = data.name;
})

io.on('connection', (socket) => {
  lobby.push({nickname: nickname});

  io.emit('enteredLobby', lobby);

  socket.on('disconnect', () => {
    console.log('disconnected');
  });

  socket.on('leaveRoom', (num, name) => {
    socket.leave(room[num]);
    io.to(room[num]).emit('leaveRoom', num, name);
  });
  
  socket.on('joinRoom',(num,name)=>{
    socket.join(room[num]) 
    io.to(room[num]).emit('joinRoom', num, name);
  })

  socket.on('chat message', (num, name, msg) => {
    a = num;
    io.to(room[a]).emit('chat message', name, msg);
  });
});


server.listen(PORT, () => console.log(`server is running ${PORT}`))