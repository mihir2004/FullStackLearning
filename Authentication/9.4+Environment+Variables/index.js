import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import bcrypt from "bcrypt";
import session from "express-session";
import passport from "passport";
import { Strategy } from "passport-local";

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


app.use(session({
  secret: "",
  resave:false,
  saveUninitialized:true
}));

app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.render("home.ejs");
});
app.get("/login",(req,res)=>{
  res.render("login.ejs")
})
app.post("/login", passport.authenticate("local",{
  successRedirect:"/secrets",
  failureRedirect:"/login",  
}));

app.get("/register", (req, res) => {
  res.render("register.ejs");
});

app.get("/secrets",(req,res)=>{
  console.log(req.user);
  if(req.isAuthenticated()){
    res.render("secrets.ejs");
  }
  else{
    res.redirect("/login");
  }
  
})

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
                    "INSERT INTO users(email,password) VALUES ($1,$2) RETURNING *",
                    [email,hash]
                  );
                  const user = result.rows[0];
                  req.login(user,(err)=>{
                    console.log(err);
                    res.redirect("/secrets");
                  })
                }
                  
              });
            }
        });
        
     }         
    } catch (error) {
        console.log(error);
    }
          
});

// app.post("/login", async (req, res) => {
//     const email = req.body.username;
//     const enteredPassword = req.body.password;
    
// });


passport.use(new Strategy(async function verify(username,password,cb){
  const email = username;
  const enteredPassword = password;
  try {
    const response = await db.query(
      "SELECT * FROM users WHERE email = ($1)",
      [email]
    );
    if(response.rows.length==0){
      return cb("User Not Found");
    }
    else{
    const user = response.rows[0];
    const hash = user.password;
    bcrypt.compare(enteredPassword, hash, function(err, result) {
        if(err){
          return cb(err);
        }
        else{
          if(result){
            return cb(null,user);
          }
          else{
            return cb(null, false);
          }
        }
    });
    }
  } catch (error) {
    return cb(error);
  }
}))

passport.serializeUser((user,cb)=>{
  cb(null,user);
});

passport.deserializeUser((user,cb)=>{
  cb(null,user);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
