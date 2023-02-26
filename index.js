const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const db = require("./config/mongoose");
const PORT = process.env.PORT || 8080;
dotenv.config();
const app = express();
const path=require('path')
const expressLayout = require('express-ejs-layouts');
const session = require('express-session');
const flash = require('connect-flash');
const customMiddlware = require('./config/middleware');
const MongoStore = require('connect-mongo');

// set view engine
app.set('view engine','ejs');
app.set('views','./views');

// DB Path
app.set('views',path.join(__dirname,'views'));

// extract style and scripts from subpages to layout
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);
// All API route goes here
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//Use router
app.use(express.urlencoded());
app.use(express.static('./assets'));
app.use(expressLayout);

// Setting up express session
app.use(session({
    name: 'csv',
    secret : process.env.session_cookie_key,
    resave: true,
    saveUninitialized: true,
    coookie: {
      maxAge: (1000 * 60 * 100)
    },
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_DB_URL,
      autoRemove: 'disabled'
    },
    function(err){
      console.log(err || 'connect-mongodb setup ok');
    })
  }));

app.use(flash());
app.use(customMiddlware.setFlash);

// using router
app.use('/',require('./routes/index'));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})