import { getToken } from "@/util/auth";

export function exportExcel2(vm, datas, url) {
  var downUrl = `${url}?${vm.website.tokenHeader}=${getToken()}`
  for (let k in datas) {
    downUrl += `&${k}=${datas}`
  }
  window.open(downUrl);
}

export function exportExcel(axios, data, url1) {
  axios({
    method: "get",
    url: url1,
    params: data,
    resopnseType: "blob",
  }).then((res) => {
    const { data, headers } = res;
    const fileName = headers["content-disposition"].replace(
      /\w+;filename=(.*)/,
      "$1"
    );
    console.log(res);
    // 此处当返回json文件时需要先对data进行JSON.stringify处理，其他类型文件不用做处理
    //const blob = new Blob([JSON.stringify(data)], ...)
    var blob = new Blob([res.data], { type: "application/octet-stream" });
    console.log(blob);
    let dom = document.createElement("a");
    let url = window.URL.createObjectURL(blob);
    dom.href = url;
    // dom.setAttribute("download", decodeURI(fileName));
    dom.download = "学生出勤管理模板.xlsx"
    dom.style.display = "none";
    document.body.appendChild(dom);
    dom.click();
    dom.body.removeChild(dom);
    // window.URL.revokeObjectURL(url);
  });
}