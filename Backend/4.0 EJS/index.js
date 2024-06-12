import express from "express";

const app = express();
const port = 3000;
let date = new Date();
let day = date.getDay();
app.get("/",(req,res)=>{
    if(day>0 && day <7){
        res.render("index.ejs", {
            dayType: "a Weekday",
            advice: "Its Time to work Hard"
        });
    }
    else{
        res.render("index.ejs", {
            dayType: "a Weekend",
            advice: "Its Time to Party"
        });
    }
    
})
app.listen(port,()=>{
    console.log(`Server running at ${port}`);
    console.log(day);
})


