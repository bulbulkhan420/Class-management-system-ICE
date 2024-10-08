const express=require('express');
const env=require('dotenv').config();
const app=express();
const cors=require("cors");
const {route}=require('./route.js');

const { datamessage } = require('./database.js');
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(route);
app.use(express.static('uploads'));
app.get("/",(req,res)=>{
    res.send("bulbul");
});



app.listen(process.env.PORT,(er)=>{
    console.log("sucess");
});