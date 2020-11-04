<template>
  <div class="management">
    <!-- <h2>分享食谱</h2> -->
    <!-- 左边 -->
    <div class="onchange">
      <div class="const">
        <el-button size="small" type="primary">添加子部门</el-button>
        <el-button size="small" type="primary">部门排序</el-button>
      </div>
      <div class="block">
        <p></p>
        <el-tree
          :data="data"
          node-key="id"
          :default-expand-all="false"
          :expand-on-click-node="false"
        >
          <span class="custom-tree-node" slot-scope="{ node, data }">
            <span>{{ node.label }}</span>
            <span>
              <el-button type="text" size="mini" @click="() => append(data)">
                查看
              </el-button>
              <el-button
                type="text"
                size="mini"
                @click="() => remove(node, data)"
              >
                删除
              </el-button>
            </span>
          </span>
        </el-tree>
      </div>
    </div>
    <div class="consults">
      <div class="header">
        <span style=" margin-right: 10px;">关键字:</span>
        <el-input
          v-model="input"
          placeholder="请输入内容"
          style="width:200px;"
          size="small"
        ></el-input>
        <span style="margin-right: 10px;margin-left: 15px;">职务:</span>
        <el-select
          style="width:100px; height: 30px;"
          v-model="callback"
          placeholder="请选择"
        >
          <el-option
            v-for="item in prompt"
            :key="item.value"
            :label="item.label"
            :value="item.value"
            style="width:100px;"
          >
          </el-option>
        </el-select>
        <span style="margin-right: 10px;margin-left: 15px;">当前状态:</span>
        <el-select
          style="width:100px; height: 30px;"
          v-model="driver"
          placeholder="请选择"
        >
          <el-option
            v-for="item in mState"
            :key="item.value"
            :label="item.label"
            :value="item.value"
            style="width:100px;"
          >
          </el-option>
        </el-select>
        <span style="margin-right: 10px;margin-left: 15px;">工号排序:</span>
        <el-select
          style="width:100px; height: 30px;"
          v-model="working"
          placeholder="请选择"
        >
          <el-option
            v-for="item in number"
            :key="item.value"
            :label="item.label"
            :value="item.value"
            style="width:100px;"
          >
          </el-option>
        </el-select>
      </div>
      <div class="network">
        <el-button
          style=" margin-left: 20px;"
          icon="el-icon-search"
          size="medium"
          type="primary"
          >搜索</el-button
        >
        <el-button
          style=" margin-left: 20px;"
          icon="el-icon-delete"
          size="medium"
          >清空</el-button
        >
        <el-button
          style=" margin-left: 20px;"
          size="medium"
          type="primary"
          icon="el-icon-plus"
          >添加员工</el-button
        >
        <el-button
          icon="el-icon-download"
          style=" margin-left: 20px;"
          size="medium"
          type="primary"
          >导出</el-button
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    const data = [
      {
        id: 1,
        label: "一级 1",
        children: [
          {
            id: 4,
            label: "二级 1-1",
            children: [
              {
                id: 9,
                label: "三级 1-1-1"
              },
              {
                id: 10,
                label: "三级 1-1-2"
              }
            ]
          }
        ]
      }
    ];
    return {
      data: JSON.parse(JSON.stringify(data)),
      prompt: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        },
        {
          value: "选项3",
          label: "蚵仔煎"
        }
      ],
      callback: "", //职务搜索
      mState: [
        {
          value: "1",
          label: "全部"
        },
        {
          value: "2",
          label: "在职"
        },
        {
          value: "3",
          label: "离职"
        },
        {
          value: "4",
          label: "停职"
        },
        {
          value: "5",
          label: "退休"
        }
      ],
      driver: "", //当前状态
      number: [
        {
          value: "1",
          label: "升序"
        },
        {
          value: "2",
          label: "降序"
        }
      ],
      working: ""
    };
  }
};
</script>

<style scoped>
.management {
  width: 100%;
  height: 700px;
  background-color: #fff;
  display: flex;
  margin-bottom: 40px;
}
.onchange {
  width: 24%;
  height: 700px;
  /* background-color: red; */
  border-right: 1px solid #e0e0e0;
}
.consults {
  width: 75%;
  height: 700px;
  /* background-color: yellow; */
  margin-left: 10px;
}
.const {
  width: 250px;
  height: 50px;

  margin-top: 15px;
  text-align: center;
  line-height: 50px;
}
.header {
  width: 98%;
  height: 50px;
  line-height: 50px;
  font-size: 13px;
  /* background-color: red; */
  margin-left: 10px;
  margin-top: 10px;
}
.network {
  width: 100%;
  height: 50px;
  /* background-color: yellow; */
  line-height: 50px;
}
</style>
