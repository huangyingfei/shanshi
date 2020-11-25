<template>
  <div>
  <el-tabs v-model="angelfood" @tab-click="foodmatters">
    <el-tab-pane label="公共食材库123123" name="third"></el-tab-pane>
    <el-tab-pane label="个人食材库" name="fourth"></el-tab-pane>
    <div class="block">
      <p></p>
      <el-tree
        :data="data1"
        node-key="id"
        v-loading="loadFlag2"
        :default-expand-all="false"
        :expand-on-click-node="false"
        @node-click="handleNodeClick"
      >
      </el-tree>
    </div>
  </el-tabs>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dateTime = false">取 消</el-button>
    <el-button @click="dateTime1" type="primary">确 定</el-button>
  </div>
  </div>
</template>

<script>
  export default {
    data(){
      return{
        more: "0",
        loadFlag2: false,
        data1:[],
        angelfood: "fourth",
      }
    } ,
    beforeMount() {
      this.Addraudit(); //树形结构渲染
    },
    methods:{
      foodmatters(tab) {
        // console.log(tab);
        console.log(tab.index);
        this.more = tab.index;
        this.Addraudit();
      },

      //点击查看详情
      handleNodeClick(data) {
        console.log(data);
        this.flour = data.id;
        this.$axios
          .get(`api/blade-food/food/detail?id=${this.flour}`, {
            headers: {
              "Content-Type": "application/json"
            }
          })
          .then(res => {
            //   console.log(res);

            this.inquired = res.data.data;
            console.log(this.inquired);

      })
      },
      dateTime1(){
         this.$emit("addevent",this.inquired )
        this.dateTime = false;
      },
      //树形渲染数
      Addraudit(){
        this.loadFlag2 = true;
        this.$axios
          .get(`api/blade-food/basetype/getFoodByBaseId?isPrivate=${this.more}`, {
            headers: {
              "Content-Type": "application/json"
            }
          })
          .then(res => {
            this.loadFlag2 = false;
            // console.log(res);
            this.fication = res.data.data;
            //   console.log(this.fication);
            let Front = [];
            this.fication.forEach((item, index) => {
              // console.log(item);
              Front[index] = {
                id: item.id,
                label: item.typeName
              };
              Front[index].children = [];
              item.foods.forEach((item1, index1) => {
                Front[index].children[index1] = {
                  id: item1.id,
                  label: item1.foodName
                };
              });
            });
            // console.log(Front);
            this.data1 = Front;
          });
      },
    }
  }

</script>
