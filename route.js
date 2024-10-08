let express=require('express');
let route=express.Router();
let {student}=require("./student");
let {teacher}=require('./teacher.js');
let {admin}=require('./admin.js');
route.use(student);
route.use(teacher);
route.use(admin);
module.exports={route};