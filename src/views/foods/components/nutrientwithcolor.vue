<template>
  <div>
    <h4 v-if="titleFlag">周期：{{WeekTtitle}}</h4>
    <div class="color"><span class="red">不足</span><span class="green">适量</span><span class="orange">过量</span></div>
    <div class="item-blo font">
      <span>营养素</span>
      <span>含量</span>
      <span>DRIs%</span>
    </div>
    <div class="item-mid">
    <span v-for="(item,index) in nutrition" class="item-blo">
      <span>{{ item.name }}</span>
      <span>{{item.realIntake}}</span>
      <span>{{item.dris}}</span>
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
  .color{
    display: flex;
    justify-content: space-between;
    width: 150px;
    font-size: 8px;
    color: #FFFFFF;
  }

.red{
  width: 50px;
  height: 16px;
  text-align: center;
  vertical-align: middle;
  background-color: red;
}
.green{
  width: 50px;
  height: 16px;
  text-align: center;
  vertical-align: middle;
  background-color: green;
}
.orange{
  width: 50px;
  height: 16px;
  text-align: center;
  vertical-align: middle;
  background-color: orange;
}
  .item-blo {
    display: flex;
    width: 180px;
    font-size: 12px;
    justify-content: start;
  }
  .item-blo span{
    width: 60px;
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
