import express from "express"

const app = express();

console.log("Hello~");

app.set("view engine", "pug"); //pug 엔진 사용한다.
app.set("views", __dirname + "/views") // static assets
// __dirname -> 현재 폴더를 의미
app.use("/public", express.static(__dirname+"/public"));

const handleReq = (req, res) => {
    res.render("home")
}
app.get("/", handleReq)

app.listen(4000);

