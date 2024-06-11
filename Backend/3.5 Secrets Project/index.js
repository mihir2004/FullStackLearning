//To see how the final website should work, run "node solution.js".
//Make sure you have installed all the dependencies with "npm i".
//The password is ILoveProgramming
import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { log } from "console";

const app = express();
const port = 3000;
const __dirname = dirname(fileURLToPath(import.meta.url));
let userIdAuth = false;

app.use(bodyParser.urlencoded({extended:true}));
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

function passwordAuth(req,res,next){
    console.log(req.body);
    const password = req.body["password"];
    if(password === "Mihir@2004"){
        userIdAuth = true;
    }
    next();
}

app.use(passwordAuth);

app.post("/check",(req,res)=>{
    if(userIdAuth){
        res.sendFile(__dirname + "/public/secret.html")
    }else {
        res.sendFile(__dirname + "/public/index.html");
        //Alternatively res.redirect("/");
      }
})