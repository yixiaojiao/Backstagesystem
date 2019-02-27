/** 
 * 倒计时
 *  countDown  返回的是当前时间和目标时间的距离 用时分秒表示 
 * 
 *  参数 : 时间字符串 "yyyy/mm/dd[ hh:mm:ss]"
 * 
 *  返回值 : 
 *  {
 *    hour : string,
 *    minute : string,
 *    second : string
 *  }
 * */
function randomInt(min , max){
      return min + parseInt( Math.random() * (max - min + 1));
}
function randomColor(){
      var r = randomInt(0 , 255),
          g = randomInt(0 , 255),
          b = randomInt(0 , 255)
      var _randomColor = "rgb("+ r +","+ g +"," + b + ")";
      return _randomColor;
}



function countDown(dateString){
      var target = new Date(dateString);
      var now = Date.now();
      //差值时间(单位为ms);
      var Dtime = target.getTime() - now;

      var hour = parseInt(Dtime / 1000 / 3600) ;
      var minute = parseInt((Dtime - hour * 1000 * 3600) / 1000 / 60);
      var second = parseInt((Dtime - hour * 1000 * 3600 - minute * 1000 * 60) / 1000);
      var ms = Dtime % 1000;
      return {
            hour : buling(hour),
            minute : minute,
            second : second,
            ms : ms
      }
}
function buling(num){
      return num < 10 ? "0" + num : num;
}

function _(select){
      // 如果选择的数组只有一项,直接返回这个项而不是数组;
      var doms = document.querySelectorAll(select);
      if(doms.length === 0){
            return null;
      }
      return doms.length === 1 ? doms[0] : doms;
}

// 伪数组转换成真数组的方法;
function _toArray(list){
      return Array.prototype.slice.call(list);
}

function _on(dom,event_type,fn){
      dom.addEventListener(event_type,fn);
}

function _off(dom,event_type,fn){
      dom.removeEventListener(event_type,fn);
}

function _once(dom,event_type,fn){
      dom.addEventListener(event_type,fn);

      // 当个事件执行的时候,移除掉当前监听的事件;
      dom.addEventListener(event_type,removeEvent)

      // 是清空参数函数及当前清空函数的功能;
      function removeEvent(){
            _off(dom,event_type,fn);
            _off(dom,event_type,removeEvent);
      }
}
// 事件委托封装;
function _delegation(parent_node,event_type,target_selector,fn){
      // 1. 绑定不同的事件;
     parent_node.addEventListener(event_type,handlerClick)
     // 2. 事件处理函数;
     function handlerClick(evt){
           // 2.1 判断部分;
           var e = evt || window.event;
           var target = e.target || e.srcElement;
           // 2.1.1 选择范围会改变
           var targets = document.querySelectorAll(target_selector);
           targets = Array.from(targets);
           if(targets.indexOf(target) === -1) return false;
           // 2.2 事件处理函数;
           fn(e);
     }
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

function animate(dom,attr,target){
      // if(timer !== null) return false;
      clearInterval(dom.timer);
      dom.timer = setInterval(()=>{
            let distance = target - getStyle(dom,attr,"number");
            let speed = distance > 0 ? Math.ceil(distance/10) : Math.floor(distance / 10);
            dom.style[attr] = getStyle(dom,attr,"number") + speed + "px";
            if(distance === 0){
                  clearInterval(dom.timer);
                  timer = null;
            }
      },50)
}

function getStyle(dom,attr,type){
      // 用 新方法取值;
      var res_attr = getComputedStyle(dom)[attr];
      // 如果要求转换成数字,那么就转换;
      if(type === "number"){
            return parseInt(res_attr);
      }
      // 如果不要求就原样返回;
      return res_attr;
}

function ajaxPost(url,data){
      return new Promise(function(resolve,reject){
            var xhr = new XMLHttpRequest();
            xhr.open("POST",url);
            xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");

            // 现在的data是一个对象, 但是根据我们的设置我们要把data转换成一个对象;

            var data_str = "";
            for(var attr in data){
                  if(data_str.length !== 0){
                      data_str += "&";
                  }
                  data_str += attr + "=" + data[attr];
            }
            // {username : 123456, password :12346};

            xhr.send(data_str);

            xhr.onreadystatechange = function(){
                  if(xhr.readyState === 4 && xhr.status === 200){
                        resolve(xhr.response);
                  }
            }

      })
 }

 function ajaxGet(url){
      return new Promise(function(resolve,reject){
            var xhr = new XMLHttpRequest();
            xhr.open("GET",url);
            xhr.send(null);
            xhr.onreadystatechange = function(){
                  if(xhr.readyState === 4 && xhr.status === 200){
                        resolve(xhr.response);
                  }
            }
      })
 }
 function jsonp(url,jsonp_key){
      return new Promise(function(resolve,reject){
            // 函数名随机处理避免占用命名空间，避免冲突;
            var randomName = "_" + Date.now()
            window[randomName] = function(res){
                  resolve(res);
            }
            // 2. 创建并插入script标签;
            var script = document.createElement("script");
            // 当前url之中是否存在 ? （存在问好表示已经有数据了），我应该用& 去拼接数据，反之则用 ?;
            url = url + (/\?/.test(url) ? "&" : "?") + jsonp_key + "=" + randomName;
            script.src = url;
            // 3. 标签放入页面之中;
            document.body.appendChild(script);
            // 4. 清理垃圾;
            script.onload = function(){
                  this.remove();
                  window[randomName] = null;
                  delete window[randomName];
            }
      })
}

function _debounce(callback,dealy){
      // 利用闭包，让 timer 私有化;
      var timer = null;
      return function(){
            // 去抖函数; 确保,callback在正确的时机被调用?
            // 事件执行的时候，真正会执行的函数是这个;
            if(timer !== null) return false;
            // 如果已经过了规定的时间可以再次执行代码了;
            timer = setTimeout(function(){
                 callback(); 
                 timer = null;
            },dealy)
      }
}

function _throttle(callback,dealy){
      // 利用闭包，让 timer 私有化;
      var timer = null;
      return function(){
            clearTimeout(timer);
            // 如果已经过了规定的时间可以再次执行代码了;
            timer = setTimeout(function(){
                 callback(); 
            },dealy)
      }
}