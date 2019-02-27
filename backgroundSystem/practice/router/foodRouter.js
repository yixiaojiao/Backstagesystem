const express =require('express')
const router=express.Router()
const foodModel=require('../db/model/foodModel')


router.post('/foodAdd',(req,res)=>{
    let {name,price,imgPath,desc,type,num}= req.body
    foodModel.insertMany({name,price:Number(price),imgPath,desc,type,num:Number(num)})
    .then((data)=>{
        // console.log(data)
      res.send({err:0,msg:"增加成功"})
    })
    .catch((err)=>{
        console.log(err)
        res.send({err:-1,msg:"增加失败"})
    })
})

router.post('/foodFind',(req,res)=>{
    foodModel.find()
    .then((data)=>{
    // console.log(data)
    res.send({err:0,msg:"查询成功",data:data})
    })
    .catch((err)=>{
        console.log(err)
    res.send({err:-1,msg:"查询失败"})
    })
})

router.post('/foodUpdate',(req,res)=>{
    let {_id,name,price,imgPath,desc,type,num}= req.body
    foodModel.updateMany({_id:_id},{name,price:Number(price),imgPath,desc,type,num:Number(num)})
    .then((data)=>{
    // console.log(data)
    res.send({err:0,msg:"修改成功",data:data})
    })
    .catch((err)=>{
        console.log(err)
    res.send({err:-1,msg:"修改失败"})
    })
})

router.post('/foodDel',(req,res)=>{
    let {_id}= req.body
    foodModel.deleteMany({_id:_id})
    .then((data)=>{
    // console.log(data)
    res.send({err:0,msg:"删除成功",data:data})
    })
    .catch((err)=>{
        console.log(err)
    res.send({err:-1,msg:"删除失败"})
    })
})

router.post('/getFoodOneId',(req,res)=>{
    let {_id}=req.body
    foodModel.find({_id})
    .then((data)=>{
        // console.log(data)
        res.send({err:0,msg:"查询成功",data:data})
        })
        .catch((err)=>{
            console.log(err)
        res.send({err:-1,msg:"查询失败"})
        })
    })


    /*----------批量删除-------------*/

    router.post('/foodManyDel',(req,res)=>{
        let {arrayId}= req.body
        console.log(arrayId)
        arrayId.forEach((item,index) => {
            console.log(item)
            foodModel.deleteMany({_id:item})
            .then((data)=>{
            // console.log(data)
            res.send({err:0,msg:"删除成功",data:data})
            })
            .catch((err)=>{
                console.log(err)
            res.send({err:-1,msg:"删除失败"})
            })
        });
        
    })

module.exports=router