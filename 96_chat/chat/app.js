const express = require('express');
const app = express();
const http = require('http').Server(app);
const path = require('path');
const socketIo = require('socket.io')(http);

app.use(express.static(path.join(__dirname, 'public')));

let chatters = [];
socketIo.on('connection', socket => {
    socket.emit('chatters', chatters.map(c => c.name));
    let name;
    socket.on('login', (data, callback) => {
        const n = data.trim();
        console.log('in');
        if (!n.length) {
            return callback('Username is required');
        }
        if (chatters.find(c => c.name === n)) {
            return callback('Username taken. Try another');
        }
        name = n;
        chatters.push(new (require('./chatterClass'))(name, socket.id));
        socket.emit('loggedIn', {name,socketID:socket.id});
        socket.broadcast.emit('status', `${name} has joined the chat`);
        socket.broadcast.emit('chatters', chatters.map(c => c.name));
        callback();
    });

    socket.on('message', msg => {
        socketIo.emit('message', { name: name, msg });
    });

    socket.on('disconnect', () => {
        chatters = chatters.filter(c => name !== c.name);
        if (name) {
            socket.broadcast.emit('status', `${name} has left the chat`);
        }
        socket.broadcast.emit('chatters', chatters.map(c => c.name));
    });

    socket.on('typing',()=>{
        socket.broadcast.emit('someoneIsTyping', name);
    });

    socket.on('checkForUser',(name,findUserName)=>{
        findUserName(chatters.find(c=>c.name === name));
    });

    socket.on('personalMessage',(recieverName,message)=>{
        const user = chatters.find(c => c.name === recieverName);
        const userSocketID = user.id;
        if(userSocketID){
            socketIo.to(userSocketID).emit('message',{name,msg:message},{personal:true});
        }
    });

});

http.listen(3000);
