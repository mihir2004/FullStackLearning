import express from "express";
const app = express();
const port = 3000;
app.listen(port, ()=>{
    console.log("server is running ar port 3000");
})
app.get("/", (req,res)=>{
    res.send("<h1>Hello world !</h1>");
})

app.post("/register", (req,res)=>{
    res.sendStatus(201);
})

app.post("/user/mihir",(req,res)=>{
    res.sendStatus(200)
})

app.patch("/user/mihir", (req,res)=>{
    res.sendStatus(200)
})

app.delete("/user/mihir", (req,res)=>{
    res.sendStatus(404);
})