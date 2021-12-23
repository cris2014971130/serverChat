'use strict'

const express = require('express');
const app = express();
const serverHttp = require('http').Server(app);
const io = require('socket.io')(serverHttp);
const cors = require('cors');
app.use(cors({
    origin: '*'
}));

const myMessages = []

app.use(function (req, res, next){
    res.header('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

io.on('connection', function(socket) {
    socket.on('send-message', function(data) {
        myMessages.push(data);
        socket.emit('text-event', myMessages);
        socket.broadcast.emit('text-event', myMessages);
    })
})

serverHttp.listen(3002, () => {
    console.log(`Server runnning on port ${3002}`);
})
