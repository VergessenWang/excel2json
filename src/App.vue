<template>
  <div id="app">
    <home></home>
  </div>
</template>

<script>
import home from "./views/Home.vue";
export default {
  components: {
    home,
  },
  name: "App",
  data() {
    return {};
  },
};
</script>

<style lang="scss">
::-webkit-scrollbar-track {
  background: transparent;
  border-radius: 0;
}

::-webkit-scrollbar {
  -webkit-appearance: none;
  width: 12px;
  height: 12px;
}

::-webkit-scrollbar-thumb {
  cursor: pointer;
  border-radius: 5px;
  background: #f0f2f5;
  transition: color 0.2s ease;
}

::-webkit-scrollbar-corner {
  background: #f0f2f5;
}

body {
  /*三角箭头的颜色*/
  scrollbar-arrow-color: rgb(74, 76, 80);
  /*滚动条滑块按钮的颜色*/
  scrollbar-face-color: rgb(51, 55, 61);
  /*滚动条轨道颜色*/
  scrollbar-track-color: rgb(29, 33, 39);
  /*滚动条基准颜色*/
  scrollbar-base-color: #0099dd;
}
</style>
