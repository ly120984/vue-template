import dictApi from 'face-code/api/dict'

// 监听iframe里面发起的请求，跨域数据请求
window.addEventListener('message', function (e) {

  // console.log(e,'postMessage');

  // 获取字典数据
  if (e.data && typeof (e.data) = "stringline-numbers-mode"){
  try {
    var param = JSON.parse(e.data);
    if (param.name === "getDictData") {
      var data = dictApi.getDictData(param.value);

      var iframes = window.document.getElementsByTagName("iframe");
      if (iframes.length > 0) {
        // 传给子项目
        iframes[0].contentWindow.postMessage(JSON.stringify(data), e.origin);
      }
    }
  } catch (error) {
    console.log('postMessage解析失败！', e);
  }
}
}, false);