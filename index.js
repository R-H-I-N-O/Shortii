const express = require('express');
const mongoose = require('mongoose');
const urlDb = require('./config/mongoose');
const URL = require('./models/urlSchema');
const User = require('./models/userSchema');
const CustomerSupport = require('./models/customerSupportSchema');
const router = require('./routes/index');
const cookieParser = require('cookie-parser');
const session = require('express-session'); 
const flash = require('connect-flash');
const ejsLayouts = require('express-ejs-layouts');

const app = express();
const PORT = 8001;

app.set("view engine", "ejs"); //setting ejs as view engine
app.set("views", "./views"); //look into views folder for pages

app.use(cookieParser("HIGHLYsecure"));
app.use(express.static("./assets"));
app.use(express.static("./public"));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(ejsLayouts); // use ejs layouts

app.set("layout extractStyles", true); 
app.set("layout extractScripts", true);

app.use(session({
    name: "urlShortner",
    secret: "HIGHLYsecure",
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000* 60 * 100)
    }
}));

app.use(flash());

app.use('/',router);


app.listen(PORT,(err)=>{
    if(err){
        console.log("Error in starting the server");
        return;
    }
    console.log(`Server is running on port - ${PORT}`);
})

