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
    
    /*------------------------------------页码查询----------------------*/

    router.post('/getFoodByPage',(req,res)=>{
        let page=req.body.page||1
        let pageSize=req.body.pageSize||1
        let result={count:0,lists:[]}
        foodModel.find()
        .then((data)=>{
         result.count=data.length// 获取总的数据条数
         return foodModel.find().skip(Number((page-1)*pageSize)).limit(Number(pageSize))
        })
        .then((data)=>{
            result.lists=data
            res.send({err:0,msg:"发送成功",data:result})
        })
        .catch((err)=>{
         res.send({err:0,msg:"发送失败"})
        })
    })

    router.post('/getFoodByKw',(req,res)=>{
        let {keyword}=req.body
        let page=req.body.page||1
        let pageSize=req.body.pageSize||1
        let result={count:0,lists:[]}
        let reg=new RegExp(keyword)
        // console.log(reg)
        foodModel.find({$or:[{name:{$regex:reg}},{type:{$regex:reg}},{desc:{$regex:reg}}]})
        .then((data)=>{
            result.count=data.length// 获取总的数据条数
            return foodModel.find({$or:[{name:{$regex:reg}},{type:{$regex:reg}},{desc:{$regex:reg}}]}).skip(Number((page-1)*pageSize)).limit(Number(pageSize))
           })
        .then((data)=>{
          result.lists=data
          res.send({err:0,msg:"查询成功",data:result})
        })
        .catch((err)=>{
            res.send({err:0,msg:"查询失败"})
      })
    })



module.exports=router