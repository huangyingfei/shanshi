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
.avue-header{
 background-color: #00aca0 !important;
  color:#FFFFFF !important;
}
.avue-logo_title{
  background-color: #00aca0 !important;
  color:#FFFFFF !important;
}
.icon-navicon{
  color: #fff!important;
}
.el-dropdown{
  color: #fff!important;
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
</style>
