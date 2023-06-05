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
    socket.on("find", (e) => {
        if (e.name != null) {
            array.push(e.name)

            if (array.length >= 2) {
                let player1 = {
                    p1name: array[0],
                    p1value: 'x',
                    p1move: ''
                }
                let player2 = {
                    p2name: array[1],
                    p2value: 'o',
                    p2move: ''
                }

                let players = {
                    p1: player1,
                    p2: player2,
                    turn: 1
                }

                playingArray.push(players)

                array.splice(0, 2)

                io.emit('find', { allPlayers: playingArray })
            }
        }
    })

    socket.on('playing', (e) => {
        if (e.value == 'x') {
            let objToChange = playingArray.find(obj => obj.p1.p1name === e.name)

            objToChange.p1.p1move = e.id
            objToChange.turn++
        }
        if (e.value == 'o') {
            let objToChange = playingArray.find(obj => obj.p2.p2name === e.name)

            objToChange.p2.p2move = e.id
            objToChange.turn++
        }

        io.emit('playing', { allPlayers: playingArray })
    })

    socket.on('gameOver', (e) => {
        playingArray = playingArray.filter(obj => obj.p1.p1name !== e.name)
        console.log(playingArray);
    })

})

app.get('/', (req, res) => {
    return res.sendFile('index.html')
})

server.listen(port, () => {
    console.log(`Connected port ${port}`);
})