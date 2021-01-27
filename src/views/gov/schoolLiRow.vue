<template>
  <div class="demo-image__preview">
    <el-row>
      <el-col :span="2">
        <span @click="$emit('openDialog', tenantId)">{{ index }}</span>
      </el-col>
      <el-col :span="8">
        <el-image
          style="width: 80px; height: 80px"
          :src="logoUrl"
          @click="$emit('openDialog', tenantId)"
        >
          <div
            slot="error"
            class="image-slot"
            style="line-height: 80px; text-align: center"
          >
            <div class="el-image__error">暂无图片</div>
          </div>
        </el-image>
      </el-col>
      <el-col :span="10">
        <span @click="$emit('openDialog', tenantId)">{{ tenantName }}</span>
      </el-col>
      <el-col :span="4">
        <span @click="$emit('openDialog', tenantId)">{{ score }}</span>
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
  line-height: 80px;
  font-size: 14px;
}
</style>>
