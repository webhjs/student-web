/*
 * @Descripttion: 
 * @version: 
 * @Author: 金苏
 * @Date: 2021-08-17 11:28:56
 * @LastEditors: 金苏
 * @LastEditTime: 2021-08-17 11:29:45
 */
// 唯一id
function guid() {
  return Number(
    Math.random()
      .toString()
      .substr(3, 3) + Date.now()
  ).toString(36);
}

function dateFormat(fmt, date) {
  let ret;
  const opt = {
    "Y+": date.getFullYear().toString(),        // 年
    "m+": (date.getMonth() + 1).toString(),     // 月
    "d+": date.getDate().toString(),            // 日
    "H+": date.getHours().toString(),           // 时
    "M+": date.getMinutes().toString(),         // 分
    "S+": date.getSeconds().toString()          // 秒
    // 有其他格式化字符需求可以继续添加，必须转化成字符串
  };
  for (let k in opt) {
    ret = new RegExp("(" + k + ")").exec(fmt);
    if (ret) {
      fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
    }
  }
  return fmt;
}

function isJSON(str) {
  try {
    JSON.parse(str);
    return true;
  } catch (e) {
    return false;
  }
}

function converter(value) {
  // A-Z计数器转换器
  const type = typeof value;
  let finaly = null;
  switch (type) {
    case "number":
      finaly = "";
      let divisor = Math.floor(value / 26), remainder = value % 26 ? [value % 26] : value <= 26 ? [value] : [];
      while (divisor > 26) {
        divisor = Math.floor(divisor / 26);
        remainder.unshift(divisor % 26);
      }
      value > 26 && remainder.unshift(divisor);
      for (let val of remainder) {
        finaly += String.fromCharCode(val + 64);
      }
      break;
    case "string":
      finaly = 0;
      const length = value.length;
      for (let len = 0; len < length; len++) {
        finaly +=
          (value.charAt(len).charCodeAt() - 64) *
          Math.pow(26, length - len - 1);
      }
      break;
  }
  return finaly;
}

// 异步加载路由给路由配置routename
const Lazy = async function(component = new Promise(resolve => resolve), componentName) {
  const _component = await component
  componentName && (_component.default.name = componentName)
  return Promise.resolve(_component)
}

export { guid, dateFormat, isJSON, converter, Lazy }