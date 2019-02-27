function  testValidate(){
    let url='/select/food' 
    let data={token:_getCookie("token")} 
      $.post(rootpath+url,data,function(res){
      if(res.err!==0){ 
        console.log(res)
      }else{
      //   console.log(res)
        location.href = rootpath+'/static/html/index.html'
      }
    })
  }




  function _cookie(key,value,path,expires){
    var str = "";
    str += key + "=" + value + ";";
    if(path){
          str += "path=" + path + ";";
    }
    if(expires){
          var d = new Date();
          d.setDate(d.getDate() + expires);
          str += "expires=" + d + ";";
    }     
    document.cookie = encodeURI(str);
    return str;
}

function _removeCookie(key,path){
    _cookie(key,"",path,-1)
}

function _getCookie(key){
    // 1. 目标  根据 key 值 获取cookie之中对应的value值;
    // 2. 有啥 ? 1. cookie字符串 2. key;  3. some ;

    // 1. 获取cookie字符串;
    var cookieString = decodeURI(document.cookie);
    // 2. 把字符串转换成数组;
    var cookieArray = cookieString.split("; ");
    // console.log(cookieArray);
    // 3. 利用some 只要有一个ture就终止的特性; 判定是否存在这个key;
    
    var res = "";
    var hasKey = cookieArray.some(function(item){
          // 4. 判定当前字符串之中是否存在这个key值;
          // console.log(item.split("=")[0]);
          res = item.split("=")[1];
          return item.split("=")[0] === key
    })

    if(hasKey){
          return res;
    }else{
          return "";
    }
}