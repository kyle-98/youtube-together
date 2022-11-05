const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});


io.on('connection', (socket) => {
    socket.on('video_url', (data) =>{
        io.emit('video_url', data);
        console.log("URL: " + data[0] + " Username: " + data[1]);
    });

    socket.on('time_change', (ts) =>{
        io.emit('time_change', ts);
        console.log("Timestamp: " + ts[0] + " Username: " + ts[1]);
    });

    socket.on('player_pause', (pause) =>{
        io.emit('player_pause', pause);
    });
    
    socket.on('player_play', (play) =>{
        io.emit('player_play', play);
    });
    
});


server.listen(3000, () => {
    console.log('open on port 3000');
});