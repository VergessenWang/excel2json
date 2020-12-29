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
  width: 5px;
}

::-webkit-scrollbar-thumb {
  cursor: pointer;
  border-radius: 5px;
  background: $main-gray;
  transition: color 0.2s ease;
}

::-webkit-scrollbar-corner {
  background: $main-gray;
}
</style>
