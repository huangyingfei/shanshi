<template>
  <div class="demo-image__preview">
    <el-row>
      <el-col :span="1">
        <span>{{ index }}</span>
      </el-col>
      <el-col :span="5">
        <el-image style="width: 100px; height: 100px" :src="logoUrl">
          <div
            slot="error"
            class="image-slot"
            style="line-height: 100px; text-align: center"
          >
            <div class="el-image__error">暂无图片</div>
          </div>
        </el-image>
      </el-col>
      <el-col :span="6">
        <span>{{ tenantName }}</span>
      </el-col>
      <el-col :span="6">
        <span>{{ score }}</span>
      </el-col>
      <el-col :span="6">
        <el-button type="text" @click="$emit('openDialog', tenantId)"
          >查看食谱</el-button
        >
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  props: {
    logoUrl: {
      type: String,
    },
    index: {
      type: Number,
    },
    tenantName: {
      type: String,
    },
    tenantId: {
      type: String,
    },
    score: {
      type: String,
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
