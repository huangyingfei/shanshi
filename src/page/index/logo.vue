<template>
  <div class="avue-logo">
    <transition name="fade">
      <span v-if="keyCollapse" class="avue-logo_subtitle" key="0">{{website.logo}}</span>
    </transition>
    <transition-group name="fade">
      <template v-if="!keyCollapse">
        <div class="avue-logo_title" key="1">
          <!-- <img class="logoicon" src="/img/logoicon.png" alt /> -->
          <img :src="webLogo" alt />
          <!--<span class="logoicon">-->
            <!--<img src="/img/huayuanlogo2.png" alt />-->
          <!--</span>-->

          <!--<span > <img src="/img/huayuanlogo.png" style="width: 180px"/></span>-->
        </div>
      </template>
    </transition-group>
  </div>
</template>

<script>
  import {  getOneWeb } from "@/api/system/setting";
  import router from '@/router/router'
import { mapGetters } from "vuex";
export default {
  name: "logo",
  webLogo:'',
  data() {
    return {
      webLogo:'',
    };
  },
  created() {},
  mounted(){
    this.init()
  },
  computed: {
    ...mapGetters(["website", "keyCollapse"])
  },
  methods: {
    init(){
      getOneWeb().then(res=>{
        if(res.data.success){
          this.webLogo=res.data.data.webLogo
          router.$avueRouter.setTitle(res.data.data.webTitle);
        }
      })
    }
  }
};
</script>

<style lang="scss">
.logoicon img {
  width: 40px;
  height: 40px;
  float: left;
  margin-top: 10px;
  padding-left: 10px;
  // align-items: center;
}
.avue-logo_title {
  display: block;
  text-align: left !important;
  font-weight: 300;
  font-size: 20px;
}
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter-active {
  transition: opacity 2.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.avue-sidebar .el-menu-item i,
.avue-sidebar .el-menu-item span,
.avue-sidebar .el-submenu__title i,
.avue-sidebar .el-submenu__title span {
  // color: rgba(255, 255, 255, 0.7);
  color: #000 !important;
}
.avue-sidebar .el-menu-item.is-active,
.avue-sidebar .el-submenu__title.is-active {
  // background-color: rgba(0, 0, 0, 0.8);
  background-color: rgba(0, 172, 160, 0.0470588235294118) !important;
}
.avue-logo {
  position: fixed;
  top: 0;
  left: 0;
  width: 240px;
  height: 64px;
  line-height: 64px;
  // background-color: #20222a;
  font-size: 20px;
  overflow: hidden;
  box-sizing: border-box;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.15);
  // color: rgba(255, 255, 255, 0.8);
  color: #000;
  z-index: 1024;
  &_title {
    display: block;
    text-align: center;
    font-weight: 300;
    font-size: 20px;
  }
  &_subtitle {
    display: block;
    text-align: center;
    font-size: 18px;
    font-weight: bold;
    color: #fff;
  }
}
</style>
