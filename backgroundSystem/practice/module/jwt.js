const jwt=require('jsonwebtoken')
const scrict='wang_chua_udon_gdxm'

function creatToken(palyload){
    palyload.ctime=Date.now()
    return jwt.sign(palyload,scrict)
}
function checkToken(token){
    return  new Promise((resovle,reject)=>{
        jwt.verify(token,scrict,(err,data)=>{
           if(err){ reject('token 验证失败')}
           resovle(data)
           })
    })
    
}
module.exports={
    creatToken,checkToken
}


