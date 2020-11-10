<template>
  <div style="padding: 0">
    <!-- filter start -->
    <el-row :gutter="8">
      <el-col :span="12">
        <el-input
          v-model="filter.keyword"
          placeholder=""
          size="mini"
        ></el-input>
      </el-col>
      <el-col :span="6">
        <el-button type="primary" size="mini">查 询</el-button>
      </el-col>
    </el-row>
    <!-- filter end -->
    <!-- <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="个人菜品库" name="first"></el-tab-pane>
      <el-tab-pane label="公共菜品库" name="second"> </el-tab-pane>
       <el-tree
          style="width:400px"
          :data="data"
          :props="defaultProps"
          v-loading="loadFlag"
          node-key="id"
          :default-expand-all="false"
          :expand-on-click-node="false"
        >
          <span class="custom-tree-node" slot-scope="{ node, data }">
            <span>{{ node.label }}</span>
            <span>
              <el-button
                v-if="data.form == 1"
                type="text"
                size="mini"
                @click="() => onChoice(data)"
              >
                选择
              </el-button>
            </span>
          </span>
        </el-tree>
    </el-tabs> -->
    <!-- table start -->
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="个人菜品库" name="first"> </el-tab-pane>
      <el-tab-pane label="公共菜品库" name="second"> </el-tab-pane>
    </el-tabs>
    <el-table
      :data="datas"
      v-loading="loadFlag"
      style="width: 100%"
      border
      fit
      row-key="id"
      :default-expand-all="false"
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column
        prop="name"
        align="left"
        header-align="center"
        label="食品/食材"
        width="200"
      ></el-table-column>
      <!-- <el-table-column prop="count" align="center" label="用量(g)" width="150">
      </el-table-column> -->
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-link
            v-if="!scope.row.children"
            type="primary"
            @click="onChoice(scope.row)"
            >选择</el-link
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- table end -->
  </div>
</template>
<script>
export default {
  name: "foodschoice",
  props: {
    // Id
    id: {
      type: String,
      default: "1"
    }
  },
  data() {
    const data = [
      //树形结构
    ];
    return {
      data: JSON.parse(JSON.stringify(data)), //树形结构
      activeName: "first", //弹出框标签页
      filter: { keyword: "" },
      datas: [],
      loadFlag: false, //加载flag
      lower: 0
    };
  },
  // 计算属性computed,计算的是Name依赖的值,它不能计算在data中已经定义过的变量。
  computed: {},
  // 当属性的值发生变化时，就会调用对应属性的方法，方法里面的形参对应的是属性的新值和旧值
  watch: {
    id(val) {
      this.init();
    }
  },
  created() {
    this.obtains(); //获取树形结构
  },
  // 组件第一次加载
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.getData();
    },

    // 初始化表格数据(根据id获取远程数据)
    getData() {
      this.datas = [
        // {
        //   id: 101,
        //   name: "素食",
        //   count: 2,
        //   children: [
        //     {
        //       id: 101001,
        //       name: "青菜青菜",
        //       count: 1,
        //       children: [
        //         {
        //           id: 101002,
        //           name: "小麦",
        //           count: 22
        //         }
        //       ]
        //     }
        //   ]
        // },
        // {
        //   id: 101,
        //   name: "炒菜",
        //   count: 2,
        //   children: [
        //     {
        //       id: 101001,
        //       name: "蚂蚁上树",
        //       count: 55,
        //       children: [
        //         {
        //           id: 101002,
        //           name: "粉丝",
        //           count: 22
        //         },
        //         {
        //           id: 101002,
        //           name: "葱",
        //           count: 33
        //         }
        //       ]
        //     }
        //   ]
        // }
        // {
        //   id: 102,
        //   name: "番茄鸡蛋",
        //   count: 1,
        //   children: [
        //     { id: 102001, name: "番茄", count: 1 },
        //     { id: 102002, name: "鸡蛋", count: 1 }
        //   ]
        // },
        // {
        //   id: 103,
        //   name: "牛奶",
        //   count: 1,
        //   children: [
        //     { id: 103001, name: "奶粉", count: 1 },
        //     { id: 103002, name: "白糖", count: 1 }
        //   ]
        // }
      ];
    },
    //获取树形结构
    obtains() {
      this.loadFlag = true;
      this.$axios
        .get(
          `api/blade-food/basetype/getDishByBaseId?isPrivate=${
            this.lower
          }&typeTemp=${2}`
        )
        .then(res => {
          this.loadFlag = false;
          //   console.log(res);
          this.obtain = res.data.data;
          let foto = [];
          this.obtain.forEach((item, index) => {
            // console.log(item);
            foto[index] = {
              id: item.id,
              name: item.typeName
            };
            foto[index].children = [];
            item.dishes.forEach((item1, index1) => {
              foto[index].children[index1] = {
                id: item1.id,
                name: item1.dishName,
                form: 1
              };
            });
          });
          this.datas = foto;
          console.log(foto);
        });
    },
    handleClick(tab) {
      this.lower = tab.index;
      // console.log(this.lower);
      this.obtains();
    },
    // 选择
    onChoice(row) {
      // console.log(row);
      // console.log(data);
      this.auto = row.id;
      this.$axios
        .get(`api/blade-food/dish/dishDetail?id=${this.auto}`)
        .then(res => {
          // console.log(res);
          this.thehabit = res.data.data;
          console.log(this.thehabit);

          let open = [];
          this.thehabit.dishMxVos.forEach((item, index) => {
            open[index] = {
              id: item.id,
              name: item.name,
              count: item.value
            };
          });

          let forms = {
            id: this.thehabit.id,
            name: this.thehabit.dishName,

            children: open
          };
          // forms.push({
          //   id: this.thehabit.id,
          //   name: this.thehabit.dishName,
          //   count: this.thehabit.provinces
          //   // children: this.thehabit.dishMxVos
          // });
          console.log(forms);
          //  let item=forms
          this.$emit("change", { ...forms });
        });
      // console.log(row);
      // this.$emit("change", { ...row });
    }

    /////////  methods end ///////////
  }
};
</script>
<style>
.el-dialog__header {
  background: #f8fbfc !important;
}
</style>
