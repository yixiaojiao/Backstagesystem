//数据模型
const mongoose=require('mongoose')
let UserSchema = new mongoose.Schema({
    user:{type:String ,required:true} ,
    pass:{type:String ,required:true}, //required 必须
  });
let user = mongoose.model('user', UserSchema); 
module.exports=user