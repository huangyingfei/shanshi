<template>
  <div
    style="width: 322px; text-align: center; border-bottom: 1px solid #ebeef5"
  >
    <el-card shadow="always">
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
        <span>{{ yearNum }}年</span>
        <span>{{ monthNum + 1 }}月</span>
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
                  'color-1': day == 1,
                  'color-2': day == 2,
                  'color-3': day == 3,
                }"
                @click="getRvent($event)"
                >{{ day }}</span
              >
            </td>
          </tr>
        </table>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dayArray: [],
      yearNum: 0,
      monthNum: 0,
      dayNum: 0,
    };
  },
  created() {
    this.updateCalendar();
  },
  methods: {
    getRvent(val) {
      console.log(val);
      console.log(val.target.style.backgroundColor);
      // val.target.style.backgroundColor = "#409EFF";
    },
    // 1.为了获得每个月的日期有多少，我们需要判断 平年闰年[四年一闰，百年不闰，四百年再闰]
    isLeapYear(year) {
      return year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0);
    },
    // 2.获得每个月的日期有多少，注意 month - [0-11]
    getMonthCount(year, month) {
      let arr = [31, null, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
      let count = arr[month] || (this.isLeapYear(year) ? 29 : 28);
      return Array.from(new Array(count), (item, value) => value + 1);
    },
    // 3.获得某年某月的 1号 是星期几，这里要注意的是 JS 的 API-getDay() 是从 [日-六](0-6)，返回 number
    getWeekday(year, month) {
      let date = new Date(year, month, 1);
      return date.getDay();
    },
    // 4.获得上个月的天数
    getPreMonthCount(year, month) {
      if (month === 0) {
        return this.getMonthCount(year - 1, 11);
      } else {
        return this.getMonthCount(year, month - 1);
      }
    },
    // 5.获得下个月的天数
    getNextMonthCount(year, month) {
      if (month === 11) {
        return this.getMonthCount(year + 1, 0);
      } else {
        return this.getMonthCount(year, month + 1);
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
      let currentMonth = this.getMonthCount(year, month);
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
      // 上面经过我本人的测试是没有什么问题，接下来就是更新 dom 的信息的问题
      // let hadDom = document.getElementsByClassName("date-item");
      // if (hadDom && hadDom.length) {
      //   let domArr = document.getElementsByClassName("date-item");
      //   for (let i = 0; i < domArr.length; i++) {
      //     domArr[i].innerHTML = res.shift();
      //   }
      // } else {
      //   // 如果之前没有结构的话
      //   let str = "";
      //   for (let i = 0; i < 6; i++) {
      //     str += '<div class="date-line">';
      //     for (let j = 0; j < 7; j++) {
      //       str += `<span class='date-item'>${res.shift()}</span>`;
      //       if (j === 6) {
      //         str += "</div>";
      //       }
      //     }
      //   }
      //   document.getElementById("dateWrap").innerHTML = str;
      // }
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
  },
};
</script>

<style scoped>
span:hover {
  cursor: pointer;
}
.calendar_content {
  margin: 15px;
}
.calendar_herder {
  margin: 15px;
}

.calendar_content span {
  width: 24px;
  height: 24px;
  display: block;
  margin: 0 auto;
  line-height: 24px;
  left: 50%;
  border-radius: 50%;
}
.color-1 {
  background-color: #f56c6c;
  color: #ffffff;
}
.color-2 {
  background-color: #00aca0;
  color: #ffffff;
}
.color-3 {
  background-color: #b7f2ed;
}
</style>