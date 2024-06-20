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

app.put("/user/:id",(req,res)=>{
    const userID = req.params.id;
    const userData = 
})





app.listen(port,()=>{
    console.log(`API is live at port ${port}`);
})