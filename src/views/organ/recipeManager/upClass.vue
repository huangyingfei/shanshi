<template>
  <basic-container>
    <avue-crud :option="option" :data="data">
      <template slot-scope="scope" slot="menuLeft">
        <el-row>
          <el-col span="10">
            <avue-date
              v-model="currentDate"
              format="yyyy年MM月dd日"
              value-format="yyyy-MM-dd"
              placeholder="请选择日期"
            ></avue-date>
          </el-col>
          <el-col span="1"> </el-col>
          <el-col span="5"
            ><el-button type="primary" size="small">开始升班</el-button>
          </el-col>
          <el-col span="1"> </el-col>
          <el-col span="5">
            <el-button type="primary" size="small">撤销上次升班</el-button>
          </el-col>
        </el-row>
      </template>
      <template slot="parentId" slot-scope="scope">
        <avue-select
          v-model="scope.parentId"
          placeholder="请选择内容"
          type="tree"
          :dic="scope.parentData"
        ></avue-select>
      </template>
       <template slot="isGradute" slot-scope="scope">
         <avue-select
          v-model="scope.isGradute"
          placeholder="请选择内容"
          type="tree"
          :dic="scope.parentData"
        ></avue-select>
      </template>
      <template slot="className" slot-scope="scope">

        <avue-input
          v-model="scope.className"
          placeholder="请输入内容"
        ></avue-input>
      </template>
      <template slot="classAlias" slot-scope="scope">
        <avue-input
          v-model="scope.classAlias"
          placeholder="请输入内容"
        ></avue-input>
      </template>
    </avue-crud>
  </basic-container>
</template>

<script>
export default {
  data() {
    return {
      currentDate:new Date(),
      data: [
        {
          oldParentClassName: "xxx",
          oldClassName: "xxx",
          oldClassAlias: "xxx",
          parentData: [{ label: "是", value: 2 }],
          isGradute:"",
          parentId: "1",
          className: "xx",
          classAlias: "xxx",
        },
      ],
      option: {
        height: "auto",
        addBtn: false,
        menu:false,
        column: [
          {
            label: "升班前年级",
            prop: "oldParentClassName",
          },
          {
            label: "升班前班级名称",
            prop: "oldClassName",
          },
          {
            label: "班级别名",
            prop: "oldClassAlias",
          },

          {
            label: "升班后年级",
            prop: "parentId",
            slot: true,
          },
           {
            label: "是否毕业",
            prop: "isGradute",
            slot:true
          },
          {
            label: "升班后班级名称",
            prop: "className",
            slot: true,
          },
          {
            label: "升班后班级别名",
            prop: "classAlias",
            slot: true,
          },
        ],
      },
    };
  },
};
</script>
