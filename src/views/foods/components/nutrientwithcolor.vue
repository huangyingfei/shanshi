<template>
  <div>
    <h4 v-if="titleFlag">周期：{{WeekTtitle}}</h4>
    <div class="color" style="margin-top: -10px"><span class="red">不足</span><span class="green">适量</span><span class="orange">过量</span></div>
    <div class="item-blo font" style="margin-top: 10px">
      <span>营养素</span>
      <span v-if="titleFlag">含量</span>
      <span>DRIs%</span>
      <span  v-if="!titleFlag">标准</span>
    </div>
    <div class="item-mid">
    <span v-for="(item,index) in nutrition" :class="{'item-blo':true,'bgred':item.red,'bggreen':item.green,'bgorange':item.orange}">

      <span>{{ item.name }}</span>
      <span v-if="titleFlag">{{item.realIntake}}</span>
      <span>{{item.dris}}</span>
       <span  v-if="!titleFlag">{{item.bz}}</span>
    </span>
    </div>
  </div>
</template>
<script>
  import {list } from "@/api/system/nutrientsetting";
  export default {
    props:{
      nutrition:[],
      WeekTtitle:'',
      titleFlag:false
    },
    data() {
      return {
        titleFlag:false,
      };
    },
    mounted(){
    },
    created() {
      this.onLoad();
    },
    methods: {
      onLoad() {
        //
        // list().then((res) => {
        //   this.data = res.data.data;
        // });
      },

    },
  };
</script>

<style scoped>
.bgorange{
 background-color: #fff6ee;
  color: orange;
}
.bggreen{
  background-color: #e6fbf5;
  color: green;
}
.bgred{
  background-color: #feeded;
  color: red;
}
  .color{
    display: flex;
    justify-content: space-between;
    width: 220px;
    font-size: 8px;
    color: #FFFFFF;
  }

.red{
  width: 33%;
  height: 16px;
  text-align: center;
  vertical-align: middle;
  background-color: red;
}
.green{
  width: 33%;
  height: 16px;
  text-align: center;
  vertical-align: middle;
  background-color: green;
}
.orange{
  width: 33%;
  height: 16px;
  text-align: center;
  vertical-align: middle;
  background-color: orange;
}
  .item-blo {
    display: flex;
    width: 220px;
    font-size: 12px;
    font-weight: bold;
    justify-content: start;

  }
  .item-blo span{
    width: 33%;
    text-align: center;
    line-height: 25px;
  }
  .item-blo span:nth-child(3){
    width: 70px;
    text-align: left;
  }
  .font span{
    text-align: center!important;
  }
  .item-mid {
    text-align: center;
    font-size: 12px;
  }

</style>
