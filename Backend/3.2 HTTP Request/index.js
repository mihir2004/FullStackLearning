import express from "express";
const app = express();
const port = 3000;

app.get("/", (req,res)=>{
    res.send("<h1>New changes</h1>");
})
app.get("/contact", (req,res)=>{
    res.send("<h1>Contact Me</h1><br><h3>+91 9136724826</h3>");
})
app.get("/about", (req,res)=>{
    res.send("<h1>Mihir Kasare DB</h1>");
})

app.listen(port, () => {
  console.log(`Server running on port ${port}.`);
});

