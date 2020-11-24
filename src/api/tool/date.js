export function formateDate(date, fmt) {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'H+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  }
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + ''
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str))
    }
  }
  return fmt
}
// 左边补0函数
export function padLeftZero(str) {
  return ('00' + str).substr(str.length)
}


export function getInervalHour(startDate, endDate) {
  if (typeof endDate == "string") {
    endDate = getDate(endDate)
  }
  if (typeof startDate == "string") {
    startDate = getDate(startDate)
  }
  var ms = endDate.getTime() - startDate.getTime();
  if (ms < 0) return 0;
  return Math.floor(ms / 1000 / 60 / 60 /24);
}

export function getDate(strDate) {
  var date = new Date(strDate);
  return date;
}


export function getFormatDate() {
  var date = new Date();
  var month = date.getMonth() + 1;
  var strDate = date.getDate();
  if (month >= 1 && month <= 9) {
    month = "0" + month;
  }
  if (strDate >= 0 && strDate <= 9) {
    strDate = "0" + strDate;
  }
  var currentDate = date.getFullYear() + "-" + month + "-" + strDate
    + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
  return currentDate;
}

