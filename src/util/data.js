// 判断数据是否为空
export function isEmpty(obj ,withZero = false){

    if (obj == undefined){
        return true
    }
    else if(typeof obj == "string"){
        return !obj
    }
    else if(typeof obj == "object"){
        if (obj instanceof Array)
            return obj.length == 0
        else
            return !obj
    }else if(typeof obj == "number"){
      if (withZero){
          return obj == 0
      }
      return false
    }
}

export function assignMatchingProperties(objA, objB) {
    if (typeof objA !== "object" || typeof objB !== "object" || !objA || !objB) {
      console.error("参数必须是有效的对象");
      return;
    }
  
    // 遍历对象 B 的属性
    for (const key in objB) {
      // 如果对象 A 也有该属性，则赋值
      if (objA.hasOwnProperty(key)) {
        objB[key] = objA[key];
      }
    }
  }