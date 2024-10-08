let mongoose=require('mongoose');
const { type } = require('os');
let env=require('dotenv').config();
mongoose.connect(process.env.URL);
let student=new mongoose.Schema({
    id:String,
    password:String,
    image:String,
    email:String,
    phone:String,
    name:String,
    home:String,
    hall:String,
    currentsemester:String,
    result11:String,
    result12:String,
    result21:String,
    result22:String,
    result31:String,
    result32:String,
    result41:String,
    result42:String
});
let datastudent=mongoose.model("student",student);
let teacher=new mongoose.Schema({
    id:String,
    password:String,
    image:String,
    name:String,
    home:String,
    email:String,
    phone:String
});
let datateacher=mongoose.model("teacher",teacher);
let admin=new mongoose.Schema({
    id:String,
    password:String
});
let dataadmin=mongoose.model("admin",admin);

let scc=new mongoose.Schema({
    id:String,
    day:String,
    am9:String,
    am10:String,
    am11:String,
    am12:String,
    am2:String
});
let datateacherclass=mongoose.model('teacherclass',scc);

let ppo=new mongoose.Schema({
    id:String,
    year:String,
    filename:String
})
let dataassignment=mongoose.model("assignment",ppo);

let poi=new mongoose.Schema({
    year:String,
    day:String,
    am9:String,
    am10:String,
    am11:String,
    am12:String,
    am2:String
})
let datastudentclass=mongoose.model("studentclasss",poi);

let ret=new mongoose.Schema({
    name:String,
    year:String,
    message:String,
    time:{
        type:Date,
        default:Date.now
    }
})
let datamessage=mongoose.model("message",ret);


module.exports={datastudent,datateacher,dataadmin,datateacherclass,dataassignment,datastudentclass,datamessage};