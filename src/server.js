import express from "express"
import http from "http";
import WebSocket from "ws";
import { homedir } from "os";

const app = express();

console.log("Hello~");

app.set("view engine", "pug"); //pug 엔진 사용한다.
app.set("views", __dirname + "/views") // static assets
// __dirname -> 현재 폴더를 의미
app.use("/public", express.static(__dirname+"/public"));

// const handleReq = (req, res) => {
//     res.render("home")
// }
app.get("/", (req, res) => {res.render("home")})
app.get("/*", (_, res) => {res.redirect("/")});

const handleListen = () => console.log(`Listening on http://localhost:4000`);

const server = http.createServer(app);

const wss = new WebSocket.Server({server});

function handleConnection(socket) {
    console.log(socket)
    console.log("Connected to Browser");
    socket.on("close", () => {
        console.log("disconnected from the Browser")
    })
    socket.on('message', (message) => {
        console.log(Buffer.from(message, "base64").toString("utf-8"))
    })
    socket.send('Hello!')
}

wss.on("connection", handleConnection)

server.listen(4000, handleListen);
// app.listen(4000);

