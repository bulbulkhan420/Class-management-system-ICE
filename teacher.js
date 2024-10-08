const express=require('express');
let axios=require('axios');

const { datateacher,dataassignment,datateacherclass,datastudentclass, datamessage} = require('./database');
let teacher=express.Router();

teacher.post("/teacherlogin",async (req,res)=>{
    let id=req.body.id;
    let password=req.body.password;
    let v=await datateacher.findOne({id,password});
    if(v){
        res.json({
            ok:true
        });
    }
    else{
        res.json({
            ok:false
        });  
    }
})
teacher.post("/alldownload",async (req,res)=>{
    let id=req.body.id;
    let v=await dataassignment.find({id});
    if(v){
        res.json(v);
    }
})
teacher.post("/downloads",async (req,res)=>{
    let id=req.body.id;
    const cloudinaryUrl = id;
    // Fetch the file from Cloudinary
    const response = await axios.get(cloudinaryUrl, { responseType: 'arraybuffer' });

    // Set the response headers to indicate a PDF download
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="downloaded-file.pdf"');

    // Send the PDF file content to the client
    res.send(response.data);
})
teacher.post("/teacherinfo",async (req,res)=>{
    let {id}=req.body;
    let v=await datateacher.findOne({id});
    if(v){
        res.status(200).json(v);
    }
    else{
        res.status(404).send("Error");
    }
})

teacher.post("/allsub",async (req,res)=>{
    let {year,id}=req.body;
    let v=await dataassignment.find({id,year});
    if(v){
        res.json(v);
    }
    else{
        res.status(404).send("Not Found");
    }
})
teacher.post("/delsub",async (req,res)=>{
    let filename=req.body.fname;
    let v=await dataassignment.deleteOne({filename});
    if(v){
        res.json({
            ok:true
        })
    }
    else{
        res.json({
            ok:false
        }) 
    }
})
teacher.post("/teacherclassinfo",async (req,res)=>{
    let id=req.body.id;
    let v=await datateacherclass.find({id});
    if(v){
        res.status(200).json(v);
    }
    else{
        res.status(404).send("Error");
    }
})
teacher.post("/sendmessage",async (req,res)=>{
    let data=req.body;
    let v=await datamessage.insertMany([{name:data.id,year:data.year,message:data.msg}]);
    if(v){
        res.json({
            ok:true
        })
    }
    else{
        res.json({
            ok:false
        })
    }

})
teacher.post("/studentclassinfo",async (req,res)=>{
    let {year,day,am9,am10,am11,am12,am2}=req.body;
    let p=await datastudentclass.findOne({year,day});
    if(p){
        if(am9==""){
            am9=p.am9;
        }
        if(am10==""){
            am10=p.am10;
        }
        if(am11==""){
            am11=p.am11;
        }
        if(am12==""){
            am12=p.am12;
        }
        if(am2==""){
            am2=p.am2;
        }
       let i= await datastudentclass.updateOne({year,day},{year,day,am9,am10,am11,am12,am2});
       if(i){
        res.json({
            ok:true
        })
       }
    }
    else{
        
       let v=await datastudentclass.insertMany([{year,day,am9,am10,am11,am12,am2}]);
        if(v){
          res.json({
              ok:true
          })
        }
        else{
          res.json({
              ok:false
          })
        }
    }
 
})


module.exports={teacher};