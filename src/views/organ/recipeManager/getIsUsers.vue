<template>
  <div>
    <el-row>
      <el-col :span="24">
        <div class="subtitle">学段信息</div>
      </el-col>
      <el-col :span="24">
        <div class="helper">
          <span>学段</span>
          <div class="include">
            <el-checkbox style="width:80px" v-model="checked"
              >幼儿园</el-checkbox
            >
            <el-select
              style="width:100px;margin-left:10px"
              v-model="value"
              placeholder="请选择"
            >
              <el-option
                clearable
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
            <span class="context">个年级</span>
          </div>
          <div class="include">
            <el-checkbox style="width:80px" v-model="checked1"
              >小学</el-checkbox
            >
            <el-select
              clearable
              style="width:100px;margin-left:10px"
              v-model="value1"
              placeholder="请选择"
            >
              <el-option
                v-for="item in options1"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
            <span class="context">个年级</span>
          </div>
        </div>
      </el-col>
      <el-col :span="24">
        <div class="loadClass">
          <span>选择班级数量</span>
          <div class="include">
            <span>小班</span>
            <el-select
              clearable
              style="width:100px;margin-left:10px"
              v-model="value1"
              placeholder="请选择"
            >
              <el-option
                v-for="item in options1"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
            <span class="context">个班级</span>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      checked: false, //幼儿园
      checked1: false, //小学
      value: "",
      options: [
        {
          value: "1",
          label: "1"
        },
        {
          value: "2",
          label: "2"
        },
        {
          value: "3",
          label: "3"
        },
        {
          value: "4",
          label: "5"
        },
        {
          value: "5",
          label: "5"
        }
      ],
      value1: "",
      options1: [
        {
          value: "1",
          label: "1"
        },
        {
          value: "2",
          label: "2"
        },
        {
          value: "3",
          label: "3"
        },
        {
          value: "4",
          label: "5"
        },
        {
          value: "5",
          label: "5"
        }
      ]
    };
  }
};
</script>

<style scoped>
.subtitle {
  width: 300px;
  min-height: 36px;
  line-height: 36px;
  background: #99a9bf;
  font-size: 13px;
  color: rgb(224, 224, 224);
  padding-left: 20px;
  margin-left: 30px;
}
.helper {
  width: 300px;
  height: 200px;
  margin-left: 30px;
  font-size: 14px;
}
.loadClass {
  width: 300px;
  margin-left: 30px;
  font-size: 14px;
}
.context {
  font-size: 14px;
  color: #606266;
  margin-left: 10px;
}
.include {
  margin-top: 20px;
}
</style>
