// node server which will handle socket io connections
const io = require('socket.io')(8000, {
    cors: {
        origin: "http://127.0.0.1:5500", // Adjust based on where your client is running
        methods: ["GET", "POST"]
    }
});
const users={};

io.on('connection',socket=>{
    // when a new user joins the chat then we 
    // append name into the list of users and tell everyone about the new user
    socket.on('new-user-joined', name=>{
        users[socket.id]=name;
        socket.broadcast.emit('user-joined',name);
    });

    socket.on('send',message=>{
        socket.broadcast.emit('recieve',{message:message,name:users[socket.id]})
    });

    socket.on('disconnect',message=>{
        socket.broadcast.emit('left',users[socket.id])
        delete users[socket.id]; 
    });







})