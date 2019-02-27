const express =require('express')
const userModel =require('../db/model/userModel')
const router=express.Router()
const jsonwebToken=require('../module/jwt')
const utils = require("../utils/util")


/*-----------------------注册------------------------------- */
router.post('/reg',(req,res)=>{
    let {user,pass} = req.body
    userModel.insertMany({user: user ,pass: pass})
    .then((data)=>{
       res.send({err:0,msg:"注册成功"})
    })
    .catch((err)=>{
       console.log(err)
       res.send({err:0,msg:"注册失败"})
    })
     
  })

  /*-----------------------登陆------------------------------- */
  router.post('/login',(req,res)=>{
    let {user,pass}=req.body
    // console.log(user,pass)
    userModel.find({user:user,pass: pass})
    .then((data)=>{
      if(data.length !== 0){
        // console.log(data)
        let token=jsonwebToken.creatToken({id:user})
        res.send({err:0,msg:"登陆成功",data:token})
      }else{
        res.send({err:-999,msg:"登录失败"})
      } 
    })
    .catch(()=>{
      res.send({err:-999,msg:"登录失败"})
    })
  })
  module.exports=router