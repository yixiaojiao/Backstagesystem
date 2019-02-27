const mongoose=require('mongoose')
const connenct = require('../connenct')
let UserSchema = new mongoose.Schema({
    name:{type:String ,required:true} ,
    price:{type:Number,required:true}, //required 必须
    imgPath:{type:String ,required:true}, //default 默认
    desc:{type:String ,required:true},
    type:{type:String,required:true},
    num:{type:Number,required:true}
  });
 // 4. 将schema转化为数据模型
let model = mongoose.model('foodlibraries', UserSchema);
module.exports=model