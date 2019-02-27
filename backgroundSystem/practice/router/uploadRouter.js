const express =require('express')
const router=express.Router()
const  multer  = require('multer')
const fs=require('fs')
const Path=require('path')

const  upload = multer({ dest: 'uploads/' })

router.post('/img', upload.single('haha'),(req,res)=>{
    // console.log(req)
    // console.log(req.file)
    let {path,mimetype}= req.file
    let ext=mimetype.split('/')[1]

    if(['jpg','png','gif','jpeg'].indexOf(ext)==-1){
        return res.send({err:1,msg:'格式错误'})
      }
    let name=(new Date()).getTime()+parseInt(Math.random()*999999)

    fs.readFile(path,(err,data)=>{
        if(err) res.send({err:1,msg:'读取文件错误'})
        fs.writeFile(Path.join(__dirname,`../public/img/${name}.${ext}`),data,'binary',(err)=>{
           if(err) { return res.send({err:1,msg:'写入错误'}) }
           let url=`/static/img/${name}.${ext}`
           return res.send({err:0,msg:'写入成功',data:url})
        })
    })

})

module.exports=router