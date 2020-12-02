<template>
  <div>
    <el-tabs v-model="angelfood" @tab-click="foodmatters">
      <el-tab-pane label="个人食材库" name="third"></el-tab-pane>
      <el-tab-pane label="公共食材库" name="fourth"></el-tab-pane>
      <div class="block">
        <div class="rolling">
          <p></p>
          <el-tree
            :data="data1"
            node-key="id"
            v-loading="loadFlag2"
            :default-expand-all="false"
            @node-click="handleNodeClick"
          >
          </el-tree>
        </div>
      </div>
    </el-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      angelfood: "third",
      loadFlag2: false,
      more: "0"
    };
  },
  beforeMount() {
    this.Addraudit();
  },
  methods: {
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
          7;
          if (this.inquired != null) {
            this.$emit("child-event", this.inquired);
          } else {
            this.$emit("child-event", "");
          }
        });
    },
    //树形渲染数
    Addraudit() {
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
    }
  }
};
</script>

<style scoped>
.rolling {
  width: 100%;
  height: 350px;
  overflow-y: auto;
}
</style>
