import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const API_URL = "https://api.openuv.io/api/v1";

const API_key = "openuv-dis23rlxln0e2o-io";
const config = {
    headers : { "x-access-token" : API_key},
};
app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static('public'));

app.get("/", (req, res) => {
    res.render("index.ejs", { content: "Waiting for data..." });
  });

app.post("/get-uv",async (req,res)=>{
    const lat = req.body.Latitude;
    const long = req.body.Longitude;
    const alt = req.body.Altitude;
    const dt = req.body.dateTime;
    try {
        const result = await axios.get(API_URL+`/uv?lat=${lat}&lng=${long}&alt=${alt}&dt=${dt}`,config);
        res.render("index.ejs", {content : JSON.stringify(result.data)});
    } catch (error) {
        res.render("index.ejs", {content: error.response.message});
    }
})

app.post("/get-forcast", async(req,res)=>{
    const lat = req.body.Latitude;
    const long = req.body.Longitude;
    const alt = req.body.Altitude;
    const dt = req.body.dateTime;
    try {
        const result = await axios.get(API_URL+`/forecast?lat=${lat}&lng=${long}&alt=${alt}&dt=${dt}`,config);
        res.render("index.ejs", {content: JSON.stringify(result.data)});
    } catch (error) {
        res.render("index.ejs",{content: JSON.stringify(error.response.message)});
    }   
})

app.post("/get-stat", async(req,res)=>{
    const lat = req.body.Latitude;
    const long = req.body.Longitude;
    const alt = req.body.Altitude;
    const dt = req.body.dateTime;
    try {
        const result = await axios.get(API_URL+`/stat`,config);
        res.render("index.ejs", {content: JSON.stringify(result.data)});
    } catch (error) {
        res.render("index.ejs",{content: JSON.stringify(error.response.message)});
    }   
})

app.post("/get-status", async(req,res)=>{
    const lat = req.body.Latitude;
    const long = req.body.Longitude;
    const alt = req.body.Altitude;
    const dt = req.body.dateTime;
    try {
        const result = await axios.get(API_URL+`/status`,config);
        res.render("index.ejs", {content: JSON.stringify(result.data)});
    } catch (error) {
        res.render("index.ejs",{content: JSON.stringify(error.response.message)});
    }   
})
  
app.listen(port,()=>{
    console.log(`Server running at port : ${port}`);
});
