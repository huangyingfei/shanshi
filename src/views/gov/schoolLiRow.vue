<template>
  <div class="demo-image__preview">
    <el-row>
      <el-col :span="1">
        <span>{{ 1 }}</span>
      </el-col>
      <el-col :span="5">
        <el-image style="width: 100px; height: 100px" :src="imgurl"> </el-image>
      </el-col>
      <el-col :span="6">
        <span>{{ schoolName }}</span>
      </el-col>
      <el-col :span="6">
        <span>{{ schoolNum }}</span>
      </el-col>
      <el-col :span="6">
        <el-button type="text" @click="$emit('openDialog')">查看食谱</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  props: {
    imgurl: {
      type: String,
      default:
        "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
    },
    schoolName: {
      type: String,
      default: "杭州市实验外国语学校",
    },
    schoolNum: {
      type: String,
      default: "4.50分",
    },
  },
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
// span {
//   display: block;
//   line-height: 100px;
// }
.el-col {
  line-height: 100px;
}
</style>>
