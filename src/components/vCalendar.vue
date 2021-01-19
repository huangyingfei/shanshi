<template>
  <div style="width: 322px; text-align: center">
    <div class="calendar_herder">
      <!-- 上一年 -->
      <el-button
        type="text"
        icon="el-icon-d-arrow-left"
        class="el-date-picker__prev-btn"
        @click="getNewDate(2)"
      ></el-button>
      <!-- 上月 -->
      <el-button
        type="text"
        icon="el-icon-arrow-left"
        class="el-date-picker__prev-btn"
        @click="getNewDate(0)"
      ></el-button>
      <label style="line-height: 40px">
        {{ yearNum }}年 {{ monthNum + 1 }}月
      </label>
      <!-- 下一年 -->
      <el-button
        type="text"
        icon="el-icon-d-arrow-right"
        class="el-date-picker__next-btn"
        @click="getNewDate(3)"
      ></el-button>
      <!-- 下月 -->
      <el-button
        type="text"
        icon="el-icon-arrow-right"
        class="el-date-picker__next-btn"
        @click="getNewDate(1)"
      ></el-button>
    </div>
    <div class="calendar_content">
      <table>
        <tr>
          <th
            v-for="item in ['日', '一', '二', '三', '四', '五', '六']"
            :key="yearNum + monthNum + item"
          >
            {{ item }}
          </th>
        </tr>
        <tr v-for="days in dayArray" :key="yearNum + monthNum + days">
          <td v-for="day in days" :key="yearNum + monthNum + day">
            <span
              :class="{
                'color-1': day.type == 1,
                'color-2': day.type == 2,
                'color-3': day.type == 3,
                'color-4': day.type == 4,
                'color-font': day.isNow == 0,
              }"
              @click="getRvent($event, day)"
              >{{ day.value }}</span
            >
          </td>
        </tr>
      </table>
      <div>
        <div style="display: inline-block; font-size: 14px; margin: 6px">
          <i
            style="
              display: inline-block;
              background-color: rgb(0, 172, 160);
              width: 10px;
              height: 10px;
              border-radius: 50%;
            "
          ></i>
          <span>请假一天</span>
        </div>
        <div style="display: inline-block; font-size: 14px; margin: 6px">
          <i
            style="
              display: inline-block;
              background-color: rgb(230, 162, 60);
              width: 10px;
              height: 10px;
              border-radius: 50%;
            "
          ></i
          ><span>请假半天</span>
        </div>
        <div style="display: inline-block; font-size: 14px; margin: 6px">
          <i
            style="
              display: inline-block;
              background-color: rgb(245, 108, 108);
              width: 10px;
              height: 10px;
              border-radius: 50%;
            "
          ></i
          ><span>补假</span>
        </div>
        <div style="display: inline-block; font-size: 14px; margin: 6px">
          <i
            style="
              display: inline-block;
              background-color: rgb(183, 242, 237);
              width: 10px;
              height: 10px;
              border-radius: 50%;
            "
          ></i
          ><span>请假作废</span>
        </div>
      </div>
      <div>
        <el-button type="text" style="width: 50%" @click="closeCalendar"
          >取消</el-button
        >
        <el-button
          type="text"
          style="width: 50%; margin-left: 0"
          @click="saveCalendar"
          >确定</el-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import { deepClone } from "@/util/util";

export default {
  props: {
    leaveDate: {
      type: Array,
      default: function () {
        return [];
      },
    },
    leaveDateInfo: {
      type: Array,
      default: function () {
        return [];
      },
    },
  },
  data() {
    return {
      leaveDateCopy: [],
      leaveDateInfoCopy: [],
      dayArray: [],
      yearNum: 0,
      monthNum: 0,
      dayNum: 0,
    };
  },

  created() {
    this.updateCalendar();
  },
  mounted() {
    this.leaveDateCopy = deepClone(this.leaveDate);
    console.log(this.leaveDateCopy);
    this.leaveDateInfoCopy = deepClone(this.leaveDateInfo);
  },
  methods: {
    getRvent(val, day) {
      // 1:请假一天，2：请假半天，3：补假 4：请假作废
      var arrayIndex = this.leaveDateCopy.indexOf(day.dateStr);

      if (day.type == 0) {
        day.type = 3;
      } else if (day.type == 1) {
        day.type = 4;
      } else if (day.type == 2) {
        day.type = 4;
      } else if (day.type == 3) {
        day.type = 0;
      }
      if (arrayIndex != -1) {
        this.leaveDateInfoCopy[arrayIndex].type = day.type;
      }
      // val.target.style.backgroundColor = "#409EFF";
    },
    // 1.为了获得每个月的日期有多少，我们需要判断 平年闰年[四年一闰，百年不闰，四百年再闰]
    isLeapYear(year) {
      return year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0);
    },
    // 2.获得每个月的日期有多少，注意 month - [0-11]
    getMonthCount(year, month, isNow) {
      let arr = [31, null, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
      let count = arr[month] || (this.isLeapYear(year) ? 29 : 28);
      let val = [];

      for (let i = 1; i <= count; i++) {
        let dateStr = `${year}-${month}-${i} 00:00:00`;
        let dateInfo = {
          value: i,
          type: 0,
          dateStr: dateStr,
          isNow: isNow,
        };
        console.log(this.leaveDateCopy);
        var arrayIndex = this.leaveDateCopy.indexOf(dateStr);
        if (arrayIndex != -1) {
          dateInfo.type = this.leaveDateInfoCopy[arrayIndex].type || 0;
        }
        val.push(dateInfo);
      }
      return val;
    },
    // 3.获得某年某月的 1号 是星期几，这里要注意的是 JS 的 API-getDay() 是从 [日-六](0-6)，返回 number
    getWeekday(year, month) {
      let date = new Date(year, month, 1);
      return date.getDay();
    },
    // 4.获得上个月的天数
    getPreMonthCount(year, month) {
      if (month === 0) {
        return this.getMonthCount(year - 1, 11, 0);
      } else {
        return this.getMonthCount(year, month - 1, 0);
      }
    },
    // 5.获得下个月的天数
    getNextMonthCount(year, month) {
      if (month === 11) {
        return this.getMonthCount(year + 1, 0, 0);
      } else {
        return this.getMonthCount(year, month + 1, 0);
      }
    },
    //数组拆分
    group(array, subGroupLength) {
      let index = 0;
      let newArray = [];
      while (index < array.length) {
        newArray.push(array.slice(index, (index += subGroupLength)));
      }
      return newArray;
    },
    // 这里获得我们第一次的 数据 数组
    updateCalendar(year, month, day) {
      if (
        typeof year === "undefined" &&
        typeof month === "undefined" &&
        typeof day === "undefined"
      ) {
        let nowDate = new Date();
        year = nowDate.getFullYear();
        month = nowDate.getMonth();
        day = nowDate.getDate();
      }
      this.yearNum = year;
      this.monthNum = month;
      this.dayNum = day;
      // 更新一下顶部的年月显示
      // 生成日历数据，上个月剩下的的 x 天 + 当月的 28（平年的2月）或者29（闰年的2月）或者30或者31天 + 下个月的 y 天 = 42
      let res = [];
      let currentMonth = this.getMonthCount(year, month, 1);
      let preMonth = this.getPreMonthCount(year, month);
      let nextMonth = this.getNextMonthCount(year, month);
      let whereMonday = this.getWeekday(year, month);
      if (whereMonday === 0) {
        whereMonday = 7;
      }
      console.log(currentMonth);
      // 感谢网友 luoyiming 的测试（哈哈！谢谢！）：这里当 whereMonday 为 0 的时候会截取上月的所有数据
      let preArr = preMonth.slice(-1 * whereMonday);
      let nextArr = nextMonth.slice(0, 42 - currentMonth.length - whereMonday);
      res = [].concat(preArr, currentMonth, nextArr);

      this.dayArray = this.group(res, 7);
    },
    //上月，下月,上一年,下一年
    getNewDate(type) {
      console.log(type);
      switch (type) {
        case 0: //上月
          if (this.monthNum == 0) {
            this.monthNum = 11;
            this.yearNum--;
          } else {
            this.monthNum--;
          }
          break;
        case 1: //下月
          if (this.monthNum == 11) {
            this.monthNum = 0;
            this.yearNum++;
          } else {
            this.monthNum++;
          }
          break;
        case 2: //上一年
          this.yearNum--;
          break;
        case 3: //下一年
          this.yearNum++;
          break;
        default:
          break;
      }
      console.log(this.monthNum);
      this.updateCalendar(this.yearNum, this.monthNum, this.dayNum);
    },
    saveCalendar() {
      this.$emit("saveCalendar", this.leaveDateInfoCopy);
    },
    closeCalendar() {
      this.$emit("closeCalendar");
    },
  },
};
</script>

<style scoped>
span:hover {
  cursor: pointer;
}
.calendar_content {
}
.calendar_herder {
  height: 40px;
}
.calendar_content td {
  width: 41px;
  height: 38px;
}
.calendar_content table {
  width: 100%;
}
.calendar_content td span {
  width: 24px;
  height: 24px;
  display: block;
  margin: 0 auto;
  line-height: 24px;
  border-radius: 50%;
}
.color-1 {
  /* 1:请假一天，2：请假半天，3：补假 4：请假作废 */

  background-color: rgb(0, 172, 160);
  color: #ffffff;
}
.color-2 {
  background-color: rgb(230, 162, 60);
  color: #ffffff;
}
.color-3 {
  background-color: rgb(245, 108, 108);
}
.color-4 {
  background-color: rgb(183, 242, 237);
  color: #ffffff;
}
.color-font {
  color: #c0c4cc;
}
</style>