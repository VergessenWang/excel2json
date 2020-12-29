import store from "@/store";

// rem等比适配配置文件
// 基准大小
const baseSize = 16;
// 设置 rem 函数
function setRem() {
  // 当前页面宽度相对于 1920宽的缩放比例，可根据自己需要修改。
  const scale = document.documentElement.clientWidth / 1920;
  // 设置页面根节点字体大小（“Math.min(scale, 2)” 指最高放大比例为2，可根据实际业务需求调整）
  document.documentElement.style.fontSize =
    baseSize * Math.min(scale, 4) + "px";
  store.commit("Common/setClientHeight", document.documentElement.clientHeight);
  store.commit("Common/setClientWidth", document.documentElement.clientWidth);

  let clientWidth = document.documentElement.clientWidth;
  let clientHeight = document.documentElement.clientHeight;

  // 页面相对于1920*1080的缩放比例
  let ratio = clientWidth / 1920;

  // console.log(ratio);

  // 内容区域高度=浏览器窗口高度-头部导航栏高度，因为头部导航栏不随高度拉伸，下边内容会拉伸
  let contentHeight = clientHeight - 119 * ratio;
  // console.log(contentHeight);

  // 16/9窗口下正好内容区域的宽高比是2，
  let contentAspectRatio = clientWidth / contentHeight;
  // console.log(contentAspectRatio);

  let test = 2 / contentAspectRatio;
  // console.log(test);

  store.commit("Common/setHeightRatio", test * ratio);
  store.commit("Common/setWidthRatio", ratio);
}
// 初始化
setRem();
// 改变窗口大小时重新设置 rem
window.onresize = function() {
  setRem();
};
