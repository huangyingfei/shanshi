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

    <!-- table start -->
    <el-table
      :data="datas"
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
      <el-table-column prop="count" align="center" label="用量(g)" width="150">
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-link
            v-if="scope.row.children"
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
    return {
      filter: { keyword: "" },
      datas: []
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
        {
          id: 101,
          name: "绿豆粥",
          count: 1,
          children: [
            { id: 101001, name: "绿豆", count: 1 },
            { id: 101002, name: "白糖", count: 1 }
          ]
        },
        {
          id: 102,
          name: "番茄鸡蛋",
          count: 1,
          children: [
            { id: 102001, name: "番茄", count: 1 },
            { id: 102002, name: "鸡蛋", count: 1 }
          ]
        },
        {
          id: 103,
          name: "牛奶",
          count: 1,
          children: [
            { id: 103001, name: "奶粉", count: 1 },
            { id: 103002, name: "白糖", count: 1 }
          ]
        }
      ];
    },

    // 选择
    onChoice(item) {
      this.$emit("change", { ...item });
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
