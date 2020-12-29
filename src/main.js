import Vue from "vue";
import App from "./App.vue";
import store from "./store";


// 全局配置
import "@/scss/bootstrap.scss";
import "@/scss/reset.scss";
import "@/scss/elementui.scss";
import "@/scss/index.scss";
import "@/util/rem";
import 'default-passive-events';


// 第三方包
import "element-ui/lib/theme-chalk/index.css";
import ElementUI from "element-ui";
Vue.use(ElementUI);

// json格式化
import JsonViewer from 'vue-json-viewer'
Vue.use(JsonViewer)

// 复制内容到剪贴板
import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard)

// 阻止 vue 在启动时生成生产提示
Vue.config.productionTip = false;

new Vue({
  store,
  render: h => h(App)
}).$mount("#app");
