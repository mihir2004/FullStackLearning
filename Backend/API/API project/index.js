import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:true}));

app.listen(port,()=>{
    console.log(`Listening on port: ${port}`);
})

app.get("/",async (req,res)=>{
    try {
        const response = await axios.get("https://api.coindesk.com/v1/bpi/currentprice.json");
        const result = response.data;
        res.render("index.ejs", {data:result});
    } catch (error) {
        console.error("Failed to post request", error.message);
        res.render("index.ejs",{
            error: error.message,
        });
    }    
})

app.post("/", async (req,res)=>{
    try {
        console.log(req.body);
        const info = req.body.info;
        console.log(info);
        const response = await axios.get("https://api.coindesk.com/v1/bpi/currentprice.json");
        const result = response.data;
        console.log(result);
        res.render("index.ejs", {data:result});
    } catch (error) {
        console.error("Failed to make a request", error.message);
        res.render("index.ejs", {
            error: "Failed",
        })
    }
})

