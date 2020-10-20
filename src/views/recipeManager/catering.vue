<template>
  <div class="choose">
    <div class="flexi">
      <span class="demonstration" style="padding-right: 10px;">选择日期</span>
      <el-date-picker
        style="width:300px"
        v-model="value1"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
      >
      </el-date-picker>
      <span style="padding-right: 10px;padding-left: 10px;">餐点设置</span>
      <el-checkbox v-model="checked">早餐</el-checkbox>
      <el-checkbox v-model="checked1">早点</el-checkbox>
      <el-checkbox v-model="checked2">午餐</el-checkbox>
      <el-checkbox v-model="checked3">午点</el-checkbox>
      <el-checkbox v-model="checked4">晚餐</el-checkbox>
      <el-checkbox v-model="checked5">晚点</el-checkbox>

      <span style="padding-right: 10px;padding-left: 10px;">餐点设置</span>
      <el-checkbox v-model="checked6">早餐</el-checkbox>
      <el-checkbox v-model="checked7">早点</el-checkbox>
      <el-checkbox v-model="checked8">午餐</el-checkbox>

      <div class="results">
        <span style="padding-right: 10px;">人群年龄</span>
        <el-input
          style="width:140px"
          placeholder="请输入内容"
          v-model="input"
          clearable
        >
        </el-input>
        ~
        <el-input
          style="width:140px"
          placeholder="请输入内容"
          v-model="input"
          clearable
        >
        </el-input>
        <span style="padding-left: 10px;padding-right: 10px;">公开</span>
        <el-switch v-model="delivery"></el-switch>
        <span style="padding-left: 30px;padding-right: 10px;">推荐</span>
        <el-switch v-model="delivery1"></el-switch>
        <span style="padding-left: 30px;padding-right: 10px;">收藏</span>
        <el-switch v-model="delivery2"></el-switch>
        <el-button type="primary" size="small" style="margin-left: 20px;"
          >智能配平</el-button
        >
        <el-button type="primary" size="small" style="margin-left: 20px;"
          >自动设置油盐糖</el-button
        >
        <el-button type="primary" size="small" style="margin-left: 20px;"
          >自动清除油盐糖</el-button
        >
        <el-button type="primary" size="small" style="margin-left: 20px;"
          >营养素</el-button
        >
        <el-button type="primary" size="small" style="margin-left: 20px;"
          >带量食谱</el-button
        >
      </div>
    </div>
    <div class="gresults">
      <div class="search">
        <div class="tab" style=" width: 100%;height:35px;">
          <el-button
            style="margin-left: 5px;width:120px"
            :type="0 == display ? 'primary' : 'default'"
            @click="displayCheck(0)"
            >食谱
          </el-button>
          <el-button
            style="width:120px"
            :type="1 == display ? 'primary' : 'default'"
            @click="displayCheck(1)"
            >菜品</el-button
          >
          <div v-show="display == 0">1</div>
          <div v-show="display == 1">2</div>
        </div>
      </div>
      <div class="field">
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column
            align="center"
            prop="date"
            label="菜品/食物"
            width="100"
          >
          </el-table-column>
          <el-table-column align="center" width="400" prop="name" label="周一">
            <el-table
              :data="tableData1"
              style="width: 100%;margin-bottom: 20px;"
              row-key="id"
              :default-expand-all="false"
              :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
            >
              <el-table-column
                prop="date"
                align="center"
                label="食品/食材"
                width="170"
              >
              </el-table-column>
              <el-table-column label="用量(g)" align="center" width="100">
                <template slot-scope="scope">
                  <el-input
                    v-model="scope.row.name"
                    type="text"
                    placeholder="请输入内容"
                  ></el-input>
                </template>
              </el-table-column>
              <el-table-column width="100" label="操作" align="center">
                <template slot-scope="scope">
                  <!-- <el-button type="text" size="small" style="margin-left: 10px"
                  >查看</el-button
                > -->
                  <el-button
                    type="text"
                    size="small"
                    style="margin-left: 10px"
                    @click="handleDelete(scope.$index, scope.row)"
                    >删除</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
          </el-table-column>
          <el-table-column align="center" prop="name" label="周二">
          </el-table-column>
          <el-table-column align="center" prop="name" label="周三">
          </el-table-column>
          <el-table-column align="center" prop="name" label="周四">
          </el-table-column>
          <el-table-column align="center" prop="name" label="周五">
          </el-table-column>
          <el-table-column align="center" prop="name" label="周六">
          </el-table-column>
          <el-table-column align="center" prop="name" label="周天">
          </el-table-column>
        </el-table>
      </div>
      <div class="profile">
        <el-button type="primary">编辑保存</el-button>
        <el-button type="primary">保存并新增</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cur: 0,
      display: "0",
      value1: "", //时间
      checked: true,
      checked1: true,
      checked2: true,
      checked3: true,
      checked4: false,
      checked5: false,
      checked6: false,
      checked7: false,
      checked8: false,
      delivery: false, //公开
      delivery1: false, //常用
      delivery2: false, //收藏

      tableData: [
        {
          date: "早餐"
        },
        {
          date: "早点"
        },
        {
          date: "午餐"
        },
        {
          date: "午点"
        }
        // {
        //   date: "晚餐"
        // },
        // {
        //   date: "晚点"
        // }
      ],
      tableData1: [
        {
          id: 3,
          date: "番茄炒鸡蛋",
          name: "100",
          children: [
            {
              id: 31,
              date: "番茄",
              name: "50"
            },
            {
              id: 32,
              date: "鸡蛋",
              name: "50"
            }
          ]
        }
      ]
    };
  },
  methods: {
    displayCheck(flat) {
      this.display = flat;
    }
  }
};
</script>

<style scoped>
.choose {
  width: 100%;
  height: 800px;
  background-color: #fff;
}
.flexi {
  width: 100%;
  height: 110px;
  /* background-color: red; */
  padding-top: 15px;
  padding-left: 5px;
}
.block {
  width: 480px;
  float: left;
}
.results {
  margin-top: 20px;
}
.gresults {
  width: 100%;
  height: 700px;
  /* background-color: red; */
  margin-top: 30px;
}
.search {
  width: 20%;
  height: 700px;
  float: left;
}
.field {
  width: 79%;
  height: 700px;
  float: left;
  margin-left: 10px;
}
.profile {
  text-align: center;
  margin-bottom: 100px;
}
</style>
