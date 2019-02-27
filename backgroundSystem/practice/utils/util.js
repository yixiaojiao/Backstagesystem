const jsonwebtoken=require('../module/jwt')
let  utils={
    verify:function(req,res,next){
        let {token}=req.body
        // console.log(token)
        if(token == ""){
            // console.log(1)
            res.send({err:"-998",msg:'token 缺失'}) 
        }else{
        jsonwebtoken.checkToken(token)
            .then((data)=>{
                if(Date.now()-data.ctime>=10800000){
                    res.send({err:"-997",msg:'token 超时 请重新登录'})
                }else{
                    next()
                }
            })
            .catch((err)=>{
                res.send({err:"-999",msg:'token 非法'})
            })
        }
    }    
}
module.exports=utils
