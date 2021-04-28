<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {};
  },
  watch: {},
  created() {},
  methods: {},
  computed: {}
};
</script>
<style lang="scss">
#app {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.avue-header {
  background-color: #00aca0 !important;
  color: #ffffff !important;
}
.avue-logo_title {
  background-color: #00aca0 !important;
  color: #ffffff !important;
}
.icon-navicon {
  color: #fff !important;
}
.el-dropdown {
  color: #fff   !important;
}
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
.pagingClass {
  text-align: right;
  /* margin: 20px 0; */
  margin-top: 20px;
  margin-right: 40px;
}
.avue-crud__dialog .el-dialog {
  position: fixed;
  left: 50%;
  margin-left: -450px;
}
.avue-crud__dialog .el-form > .el-row > .avue-form__menu {
  position: fixed;
  top: 580px;
  background-color: #ffffff;
  width: 900px;
  margin-left: -10px;
  border-radius: 2px;
}
.avue-crud__menu .avue-crud__right .is-circle {
  visibility: hidden;
}
.currentDatePickerClass
  > .el-picker-panel__footer
  > .el-button--text:first-child {
  display: none;
}
.test{
  
}

</style>
