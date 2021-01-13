<template>
  <div class="demo-image__preview">
    <el-row>
      <el-col :span="8">
        <el-image style="width: 100px; height: 100px" :src="imgurl"> </el-image
      ></el-col>
      <el-col :span="8">
        <span>{{ foodName }}</span>
      </el-col>
      <el-col :span="8">
        <span>{{ foodNum }}</span>
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
    foodName: {
      type: String,
      default: "红烧土豆",
    },
    foodNum: {
      type: String,
      default: "100",
    },
  },
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
span {
  display: block;
  line-height: 100px;
}
</style>>
