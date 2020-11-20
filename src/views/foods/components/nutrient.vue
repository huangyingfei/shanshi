<template>
  <div>
  <div class="item-blo font">
    <span>营养素</span>
    <span>含量</span>
  </div>
  <div class="item-mid">
    <span v-for="(item,index) in data" class="item-blo">
      <span>{{ item.label }}</span>
      <span>12.2</span>
    </span>
  </div>
  </div>
</template>
<script>
  import {list } from "@/api/system/nutrientsetting";
  export default {
    data() {
      return {
        data: [{
          label:"能量",
          value:"12.3"
        },{
          label:"能量",
          value:"12.3"
        },{
          label:"能量",
          value:"12.3"
        },{
          label:"能量",
          value:"12.3"
        },{
          label:"能量",
          value:"12.3"
        },{
          label:"能量",
          value:"12.3"
        }],
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

  .item-blo {
    display: flex;
    width: 130px;
    justify-content: space-between;
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
