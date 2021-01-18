<template>
  <div class="demo-image__preview">
    <el-row>
      <el-col :span="8">
        <el-image style="width: 100px; height: 100px" :src="dishPic">
          <div
            slot="error"
            class="image-slot"
            style="line-height: 100px; text-align: center"
          >
            <div class="el-image__error">暂无图片</div>
          </div>
        </el-image>
      </el-col>
      <el-col :span="8">
        <span>{{ dishName }}</span>
      </el-col>
      <el-col :span="8">
        <span>{{ dishCount }}</span>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  props: {
    dishPic: {
      type: String,
    },
    dishName: {
      type: String,
    },
    dishCount: {
      type: String,
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
