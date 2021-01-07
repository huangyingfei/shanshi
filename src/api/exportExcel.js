
export function exportExcel(axios, data, url1) {
  axios({
    method: "get",
    url: url1,
    data: data,
    resopnseType: "arraybuffer",
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
    }
  }).then((res) => {
    const { data, headers } = res;
    const fileName = headers["content-disposition"].replace(
      /\w+;filename=(.*)/,
      "$1"
    );
    // 此处当返回json文件时需要先对data进行JSON.stringify处理，其他类型文件不用做处理
    //const blob = new Blob([JSON.stringify(data)], ...)
    const blob = new Blob([res.data], { type: "application/vnd.ms-excel;charset=UTF-8" });
    let dom = document.createElement("a");
    let url = window.URL.createObjectURL(blob);
    dom.href = url;
    dom.setAttribute("download", decodeURI(fileName));
    dom.style.display = "none";
    document.body.appendChild(dom);
    dom.click();
    dom.parentNode.removeChild(dom);
    window.URL.revokeObjectURL(url);
  });
}