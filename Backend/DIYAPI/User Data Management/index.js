import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 4000;

let user = [
    {
        user_id: 1,
        name: "john snow",
        email: "johnsnow@email.com",
        username: "john_snow",
        password: "password123",
        createdat: new Date(),
    }
]
let post = [];


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.get("/users",(req,res)=>{
    res.json(user);
})

app.post("/newuser",(req,res)=>{
    const newID = user.length+1;
    const newUser = {
        user_id : newID,
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
        createdat: new Date(),
    }
    user.push(newUser);
    res.status(201).json(newUser.username);
})

app.post("/newpost",(req,res)=>{
    const newID = post.length+1;
    const newPost = {
        id: newID,
        image: req.body.image,
        caption: req.body.caption,
        time: new Date(),
    }
    post.push(newPost);
    res.status(201).json(newPost);
})





app.listen(port,()=>{
    console.log(`API is live at port ${port}`);
})