const app = require('express')()
const http = require('http').Server(app)
const config = require('./config')
const io = require('socket.io')(http)

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

io.on('connection', (socket) => {
    console.log('user connected')
    io.on('disconnect', () => {
        console.log('User disconnect')
    })
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg)
    })
    // socket.broadcast.emit('hi') emite un canal
})

http.listen(config.port, () => {
    console.log(`Server on port ${config.port}`)
})
