import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const db = new pg.Client({
  user:"",
  host:"",
  database:"",
  password:"",
  port: 5432
});
db.connect();




app.get("/", (req, res) => {
  res.render("home.ejs");
});

app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.get("/register", (req, res) => {
  res.render("register.ejs");
});

app.post("/register", async (req, res) => {
      const email = req.body.username;
      const password = req.body.password;
      const checkResult = await db.query(
        "SELECT * FROM users WHERE email=($1)",
        [email]
      );
      try {
        if(checkResult.rows.length>0){
          res.send("Email already exists, Try Loging in");
        }
        else{
          const result = await db.query(
            "INSERT INTO users(email,password) VALUES ($1,$2)",
            [email,password]
          );
          console.log(result);
          res.render("secrets.ejs");
        }         
      } catch (error) {
        console.log(error);
      }
          
});

app.post("/login", async (req, res) => {
    const email = req.body.username;
    const password = req.body.password;
    try {
      const response = await db.query(
        "SELECT * FROM users WHERE email = ($1)",
        [email]
      );
      if(response.rows.length==0){
        
        res.redirect("/register");
      }
      else{
        const correctPassword = response.rows[0].password;
        if(correctPassword == password){
          console.log("Logged In");
          res.render("secrets.ejs");
        }
        else{
          console.log("Incorrect Password");
          res.redirect("/login");
        }
      }
    } catch (error) {
      console.log(error)
    }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
