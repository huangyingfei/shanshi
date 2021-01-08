<template>
  <div class="flex-box">
    <label>采购日期</label>
    <div style="position: relative; width: 100%">
      <slot>
        <el-input
          placeholder="请选择周期"
          v-model="WeekInfo.stockTimeStr"
          suffix-icon="el-icon-date"
        >
        </el-input>
      </slot>
      <el-date-picker
        v-model="weekValue"
        type="week"
        format="yyyy-MM"
        :picker-options="{ firstDayOfWeek: 1 }"
        placeholder="选择时间"
        name="WeekSelect"
        @change="SelectWeek"
        style="opacity: 0; position: absolute; left: 0px; top: 0px; width: 100%"
        clear-icon=""
        ref="refweekSelect"
      >
      </el-date-picker>
    </div>
  </div>
</template>

<script>
import { formateDate } from "@/api/tool/date";

export default {
  data() {
    return {
      WeekInfo: {
        stockTimeStr: "", //周期标题
        startTime: "",
        endTime: "",
      },
      weekValue: "",
    };
  },
  methods: {
    SelectWeek(d) {
      var toDay = new Date(d);
      var week = toDay.getDay();
      var day = toDay.getDate();
      var year = toDay.getFullYear();
      var month = toDay.getMonth() + 1;
      var time = toDay.getTime();
      var monthWeek = Math.ceil((day + 7 - week) / 7);
      this.WeekInfo.stockTimeStr = `${year}年${month}月 第${monthWeek}周`;
      this.WeekInfo.startTime = formateDate(
        new Date(time - (week - 1) * 24 * 60 * 60 * 1000),
        "yyyy-MM-dd 00:00:00"
      );
      this.WeekInfo.endTime = formateDate(
        new Date(time + (7 - week) * 24 * 60 * 60 * 1000),
        "yyyy-MM-dd 00:00:00"
      );
      this.$emit("weekChange", this.WeekInfo);
    },
  },
};
</script>

<style scoped>
.flex-box {
  display: flex;
  align-items: center;
}
label {
  font-size: 14px;
  color: #606266;
  padding: 0 12px 0 0;
  white-space: nowrap;
}
</style>