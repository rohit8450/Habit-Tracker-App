const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const db = require("./config/mongoose");
const PORT = process.env.PORT || 8080;
dotenv.config();
const app = express();
const path=require('path')
const expressLayout = require('express-ejs-layouts');

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

// using router
app.use('/',require('./routes/index'));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})