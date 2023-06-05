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


let array = []
let playingArray = []

io.on('connection', (socket) => {
    socket.on("find", (e)=> {
        if (e.name!=null){
            array.push(e.name)
            
            if (array.length>=2){
                let player1 = {
                    p1name:array[0],
                    p1value:'x',
                    p1move: ''
                }
                let player2 = {
                    p2name:array[1],
                    p2value:'o',
                    p2move: ''
                }
                
                let players = {
                    p1: player1,
                    p2: player2
                }
                
                playingArray.push(players)
                
                array.splice(0,2)
                
                io.emit('find', {allPlayers: playingArray})
            }
        }
    })
})

app.get('/', (req, res) => {
    return res.sendFile('index.html')
})

server.listen(port, () => {
    console.log(`Connected port ${port}`);
})