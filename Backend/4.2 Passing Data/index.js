import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
let count = 0;
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs");
});
function wordCounter(req,res,next){
  console.log(req.body);
  count = req.body["fName"].length+ req.body["lName"].length;
  next();
}

app.use(wordCounter)

app.post("/submit", (req, res) => {
  res.render("index.ejs", {numberOfLetters: count})
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
