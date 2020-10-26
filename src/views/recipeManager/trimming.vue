<template>
  <div>
    <!-- 智能配平 -->
    <div class="header">
      <div class="time">
        <span class="demonstration" style="padding-right: 10px;">选择日期</span>
        <el-date-picker
          style="width:300px"
          v-model="value1"
          type="daterange"
          format="yyyy 年 MM 月 dd 日"
          value-format="yyyy-MM-dd"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        >
        </el-date-picker>
        <!-- <span></span> -->
        <el-checkbox style="padding-left: 50px;" v-model="focus"
          >调整食材的量</el-checkbox
        >
        <el-checkbox style="padding-left: 50px;" v-model="tment"
          >调整菜品的量</el-checkbox
        >
        <el-checkbox style="padding-left: 50px;" v-model="changed"
          >保留整数</el-checkbox
        >
      </div>
      <div class="nutrition">
        <span>选择营养素</span>
        <el-cascader
          style="padding-left: 20px;"
          v-model="value"
          :options="options"
          @change="handleChange"
        ></el-cascader>
        <span style="padding-right: 10px;padding-left: 30px;">起始值</span>
        <el-input
          style="width:140px"
          placeholder="请输入内容"
          v-model="input"
          clearable
        >
        </el-input>
        ~
        <span style="padding-right: 10px;padding-left: 30px;">期望值</span>
        <el-input
          style="width:140px"
          placeholder="请输入内容"
          v-model="input"
          clearable
        >
        </el-input>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      focus: false,
      tment: false,
      changed: false,
      value1: "2020-10-28,2020-10-29",
      options: [
        {
          value: "zhinan",
          label: "指南",
          children: [
            {
              value: "shejiyuanze",
              label: "设计原则"
            }
          ]
        }
      ]
    };
  }
};
</script>
<style scoped>
.header {
  width: 100%;
  height: 120px;
  background-color: red;
}
.time {
  width: 100%;
  height: 55px;
  /* background-color: yellow; */
}
.nutrition {
  width: 100%;
  height: 55px;
  /* background-color: blue; */
}
</style>
