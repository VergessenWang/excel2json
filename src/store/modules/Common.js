
export default {
  namespaced: true,
  // 公共模块
  state: {
    clientHeight: 100,
    clientWidth: 100,
    // 窗口相对于1080高度的比例
    heightRatio: 1,
    widthRatio: 1,
  },
  mutations: {
    setClientHeight(state, val) {
      state.clientHeight = val;
    },
    setClientWidth(state, val) {
      state.clientWidth = val;
    },
    setHeightRatio(state, val) {
      state.heightRatio = val;
    },
    setWidthRatio(state, val) {
      state.widthRatio = val;
    },
  }
};
