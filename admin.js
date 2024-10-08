const express=require('express');
const { dataadmin,datastudent,datateacher,datateacherclass } = require('./database');
let multer=require('multer');
let admin=express.Router();
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      
      cb(null, Date.now()+"_"+file.originalname);
    }
  })
  
  const upload = multer({ storage: storage });
  admin.post("/uploadstudentpic",upload.single('image'),async (req,res)=>{
    let image=req.file;
    let id=req.body.picid;
    let v=await datastudent.findOne({id});
    if(v){
        await datastudent.updateOne({id},{image:image.filename});
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
admin.post("/adminlogin",async (req,res)=>{
    let id=req.body.id;
    let password=req.body.password;
    let v=await dataadmin.findOne({id,password});
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
admin.post("/newstudentadd",async (req,res)=>{
    let {id,password,name,home,hall,email,phone}=req.body;
    let y="1-1";
    let p="Not Published Yet";
    let pp=await datastudent.findOne({id});
    let image="avatar.png";
    if(!pp){
        let v=await datastudent.insertMany([{id,password,image,name,home,hall,email,phone,currentsemester:y,result11:p,result12:p,result21:p,result22:p,result31:p,result32:p,result41:p,result42:p}]);
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
    else{
        res.json({
            ok:false
        })
    }
   
});
admin.post("/studentupdateadmin",async (req,res)=>{
    let {id,password,email,phone,currentsemester,osemester,result}=req.body;
    let v=await datastudent.findOne({id});
    if(v){
        
        if(id==""){
            id=v.id;
        }
        if(password==""){
           password=v.password;
        }
        if(email==""){
            email=v.email;
         }
         if(phone==""){
            phone=v.phone;
         }
         if(currentsemester==""){
            currentsemester=v.currentsemester;
         }
         if(result==""){
            result="Not Published Yet";
         }
         await datastudent.updateOne({id},{id,password,email,phone,currentsemester});
         if(osemester=="1-1"){
            await datastudent.updateOne({id},{result11:result})
         }
         else if(osemester=="1-2"){
            await datastudent.updateOne({id},{result12:result});
         }
         else if(osemester=="2-1"){
            await datastudent.updateOne({id},{result21:result});
         }
         else if(osemester=="2-2"){
            await datastudent.updateOne({id},{result22:result});
         }
         else if(osemester=="3-1"){
            await datastudent.updateOne({id},{result31:result});
         }
         else if(osemester=="3-2"){
            await datastudent.updateOne({id},{result32:result});
         }
         else if(osemester=="4-1"){
            await datastudent.updateOne({id},{result41:result});
         }
         else if(osemester=="4-2"){
            await datastudent.updateOne({id},{result42:result});
         }
         res.json({
            ok:true,
            
         })
    }
    else{
        res.json({
            ok:false
         })
    }
})
admin.post("/studentdelete",async (req,res)=>{
    let {id}=req.body;
    let v=await datastudent.findOne({id});
    if(v){
        await datastudent.deleteOne({id});
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
admin.post("/adminupdate",async (req,res)=>{
    let password=req.body.password;
     let v=await dataadmin.updateOne({id:"1910977118"},{password});
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
//teacher

admin.post("/addteacheradmin",async (req,res)=>{
    let {id,password,name,home,email,phone}=req.body;
    let v=await datateacher.findOne({id});
    let image="avatar.png";
    if(!v){
        await datateacher.insertMany([{id,password,image,name,home,email,phone}]);
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
admin.post("/teacherpic",upload.single('image1'),async (req,res)=>{
    let image=req.file;
    let id=req.body.picid;
    let f=await datateacher.findOne({id});
    if(f){
    let v=await datateacher.updateOne({id},{image:image.filename});
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
else{
    res.json({
        ok:false
    })
}
});
admin.post("/updateteacher",async (req,res)=>{
    let {id,password,phone,email}=req.body;
    let v=await datateacher.findOne({id});
    if(v){
        if(password=="")
        password=v.password;
        if(phone=="")
        phone=v.phone;
        if(email=="")
        email=v.email;
    await datateacher.updateOne({id},{password,phone,email});
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
admin.get("/allteacher",async (req,res)=>{
  let v=await datateacher.find({});
  res.json(v);
})
admin.post("/teacherdel/:id",async (req,res)=>{
    let id=req.params.id;
    let v=await datateacher.findOne({id});
    if(v){
        await datateacher.deleteOne({id});
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
admin.post("/teacherclassadd",async (req,res)=>{
    let {id,day,am9,am10,am11,am12,am2}=req.body;
     let v=await datateacherclass.findOne({id,day});
     if(!v){
        await datateacherclass.insertMany([{id,day,am9,am10,am11,am12,am2}]);
        res.json({
            ok:true
        })
     }
     else if(v){
        if(am9==""){
            am9=v.am9;
        }
        if(am10==""){
            am10=v.am10;
        }
        if(am11==""){
            am11=v.am11;
        }
        if(am12==""){
            am12=v.am12;
        }
        if(am2==""){
            am2=v.am2;
        }
        await datateacherclass.updateOne({id,day},{am9,am10,am11,am12,am2});
        res.json({
            ok:true
        })
     }
})
module.exports={admin};