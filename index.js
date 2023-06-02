// <a href="https://iconscout.com/lotties/loading" target="_blank">Free Loading Animated Icon</a> by <a href="https://iconscout.com/contributors/motionstkstudio">MotionsTK.studio</a> on <a href="https://iconscout.com">IconScout</a>
const express = require('express')
const app = express()

const path = require('path')
const http = require('http')
const { Server } = require('socket.io')
const port = 4000

const server = http.createServer(app)

const io = new Server(server)
app.use(express.static(path.resolve("")))

app.get('/', (req, res) => {
    return res.sendFile('index.html')
})

server.listen(port, () => {
    console.log(`Connected port ${port}`);
})