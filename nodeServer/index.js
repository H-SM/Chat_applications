//nodeServer which will handle SocketIO connections

const io = require('socket.io')(8000)

const users = {};

io.on('connection', socket =>{
    //socket.IO instance here
    socket.on('new-user-joined',name =>{
        // when a connection over the IO is formed then what to do
        // console.log("user -> "+ name)
        users[socket.id] = name;
        socket.broadcast.emit('user-joined', name);
        //emits / lay off the names of the user which just joined the chat, <to get printed on later on
    });

    socket.on('send', message =>{
        socket.broadcast.emit('receive',{message : message, name : users[socket.id]});
        //these are the messages over that user which is getting broadcasted to all the users
    });

    socket.on('disconnect', message =>{
        socket.broadcast.emit('left', users[socket.id]);
        delete users[socket.id];
    });

});

console.log("running.. ")