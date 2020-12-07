<template>
  <div>
    <h4 v-if="titleFlag">周期：{{WeekTtitle}}</h4>
    <div class="color"><span class="red">不足</span><span class="green">适量</span><span class="orange">过量</span></div>
    <div class="item-blo font">
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
        // debugger
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
    width: 150px;
    font-size: 8px;
    color: #FFFFFF;
  }

.red{
  width: 70px;
  height: 16px;
  text-align: center;
  vertical-align: middle;
  background-color: red;
}
.green{
  width: 70px;
  height: 16px;
  text-align: center;
  vertical-align: middle;
  background-color: green;
}
.orange{
  width: 70px;
  height: 16px;
  text-align: center;
  vertical-align: middle;
  background-color: orange;
}
  .item-blo {
    padding-left: 10px;
    display: flex;
    width: 210px;
    font-size: 12px;
    font-weight: bold;
    justify-content: start;
  }
  .item-blo span{
    width: 60px;
    text-align: left;
    line-height: 25px;
  }
  .item-blo span:nth-child(3){
    width: 70px;
    text-align: left;
  }
  .font{
    color: #ccc;
  }
  .item-mid {
    margin-top: 10px;
    text-align: center;
    font-size: 12px;
  }

</style>
