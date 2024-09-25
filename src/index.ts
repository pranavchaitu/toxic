import http, { ServerResponse } from "http"
import { WebSocketServer } from "ws";

const server = http.createServer((req ,res : ServerResponse) => {
    console.log("server is started");
    res.end("Hello from the server")
})

const wss = new WebSocketServer({ server })

wss.on('connection',(socket) => {
    socket.on('error', console.error)
    socket.on('message',(data) => {
        wss.clients.forEach(client => {
            if(client.readyState == WebSocket.OPEN) {
                client.send(data,{ binary : false })
            }
        })
    })
})

server.listen(3000,() => {
    console.log("listening to port 3000");
})