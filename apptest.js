const express = require("express")
const http = require("http")
const app = express();
const server = http.createServer(app);
const path = require("path")
const socketIO = require("socket.io")

const io = socketIO(server);

app.use(express.static(path.join(__dirname, "src")))

// app.get("/", (req, res) => {
//     res.sendFile(__dirname, "/index.html");
// });

const namespace1 = io.of('/namespace1');

// first namespace
namespace1.on('connection', (socket) => {

    namespace1.emit('news', {
        hello: "Someone connected at namespc1"
    });

});

// second namespace
namespace2.on('conncetion', (socket) =>{

    namespace2.emit('news', {
        hello:"Somenoe connected ata namespc2"
    });

});

const PORT = process.env.PORT || 5000;

io.on("connection", (socket) => {
    console.log("connected");
    socket.on("chatting", (data) => {
        io.emit("chatting", data)
    });

    socket.on("disconnect", () => {
        console.log("disconnected");
    });
});

server.listen(PORT, () => console.log(`server is running ${PORT}`))