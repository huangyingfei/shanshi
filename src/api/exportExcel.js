

export function exportExcel(vm, datas, url) {
  vm.axios
    .post(url, datas, {
      responseType: "blob"
    })
    .then(res => {
      console.log(res);
      var blob = new Blob([res.data], {
        type: "application/octet-stream"
      }); //type这里表示xlsx类型

      var downloadElement = document.createElement("a");
      var href = window.URL.createObjectURL(blob); //创建下载的链接
      downloadElement.href = href;
      downloadElement.download = "学生出勤管理模板.xlsx"; //下载后文件名
      document.body.appendChild(downloadElement);
      downloadElement.click(); //点击下载
      document.body.removeChild(downloadElement); //下载完成移除元素
    });
}

export function exportExcel1(vm, data, url1) {
  vm.axios({
    method: "post",
    url: url1,
    data: data,
    headers: { resopnseType: "blob", }

  }).then((res) => {
    const { data, headers } = res;
    const fileName = headers["content-disposition"].replace(
      /\w+;filename=(.*)/,
      "$1"
    );
    console.log(res);
    // 此处当返回json文件时需要先对data进行JSON.stringify处理，其他类型文件不用做处理
    //const blob = new Blob([JSON.stringify(data)], ...)
    var blob = new Blob([res.data], {
      type: "application/octet-stream"
    }); //type这里表示xlsx类型

    var downloadElement = document.createElement("a");
    var href = window.URL.createObjectURL(blob); //创建下载的链接
    downloadElement.href = href;
    downloadElement.download = "学生出勤管理模板.xlsx"; //下载后文件名
    document.body.appendChild(downloadElement);
    downloadElement.click(); //点击下载
    document.body.removeChild(downloadElement); //下载完成移除元素
  });
}