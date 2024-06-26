import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import bcrypt from "bcrypt";

const app = express();
const port = 3000;
const saltRounds = 10;

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
          bcrypt.genSalt(saltRounds, async function(err, salt) {
            if(err){
              console.log(err);
            }else{
              bcrypt.hash(password, salt, async function(err, hash) {
                if(err){
                  console.log(err);
                }else{
                  // Store hash in your password DB.
                  const result = await db.query(
                    "INSERT INTO users(email,password) VALUES ($1,$2)",
                    [email,hash]
                  );
                  res.render("secrets.ejs");
                }
                  
              });
            }
        });
        
     }         
    } catch (error) {
        console.log(error);
    }
          
});

app.post("/login", async (req, res) => {
    const email = req.body.username;
    const enteredPassword = req.body.password;
    try {
      const response = await db.query(
        "SELECT * FROM users WHERE email = ($1)",
        [email]
      );
      if(response.rows.length==0){
        
        res.redirect("/register");
      }
      else{

      const hash = response.rows[0].password;
      bcrypt.compare(enteredPassword, hash, function(err, result) {
          if(err){
            console.log(err);
          }
          else{
            if(result==true){
              console.log("Logged In");
              res.render("secrets.ejs");
            }
            else{
              console.log("Incorrect Password");
              res.redirect("/login");
            }
          }
      });
      }
    } catch (error) {
      console.log(error)
    }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
