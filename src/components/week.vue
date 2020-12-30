<template>
  <div>
    <el-date-picker
      v-model="WeekInfo.weekValue"
      type="week"
      format="yyyy-MM"
      :picker-options="{ firstDayOfWeek: 1 }"
      @focus="FixWeek"
      placeholder="选择时间"
      name="WeekSelect"
      @change="SelectWeek"
      clear-icon=""
      ref="refweekSelect"
    >
    </el-date-picker>
  </div>
</template>

<script>
export default {
  data() {
    return {
      WeekInfo: {
        weekType: "5", //周期类型
        WeekTtitle: "", //周期标题
        Weekdetails: "", //周期明细
        shareOrg: true,
        showFoodCatalog: "", //餐点类型
        weekValue: "",
      },

      WeekList: [], //所选的时间周期
      showWeekList: [],

      year: "",
      month: "",
      startTime: "",
      startTimeStr: "",
      endTime: "",
      endTimeStr: "",
    };
  },
  methods: {
    FixWeek() {
      var weekSelect = document.getElementsByName("WeekSelect");
      if (weekSelect == undefined) return;

      if (weekSelect[0].getAttribute("isFixWeek") != undefined) return;

      setTimeout(() => {
        var zs = document.createElement("th");
        zs.innerText = "周次";
        var RootweekFirst = document.querySelector(
          ".el-picker-panel__content table tr th"
        );
        var Rootweek = document.querySelector(".el-picker-panel__content tr");
        Rootweek.insertBefore(zs, RootweekFirst);
        var listRow = document.querySelectorAll(".el-date-table__row");

        for (var i = 0; i < listRow.length; i++) {
          var firstNode = listRow[i].children[0];
          var zs_index = document.createElement("td");
          zs_index.style.fontWeight = "bold";
          zs_index.style.color = "#fe6c6f";
          var z = i + 1;
          switch (z) {
            case 1:
              zs_index.innerText = "一";
              break;
            case 2:
              zs_index.innerText = "二";
              break;
            case 3:
              zs_index.innerText = "三";
              break;
            case 4:
              zs_index.innerText = "四";
              break;
            case 5:
              zs_index.innerText = "五";
              break;
            case 6:
              zs_index.innerText = "六";
              break;
          }

          listRow[i].insertBefore(zs_index, firstNode);
        }
        document
          .getElementsByName("WeekSelect")[0]
          .setAttribute("isFixWeek", "true");
      }, 100);
    },
    GetChinesDay(z) {
      var cday = "";
      switch (z) {
        case 1:
          cday = "一";
          break;
        case 2:
          cday = "二";
          break;
        case 3:
          cday = "三";
          break;
        case 4:
          cday = "四";
          break;
        case 5:
          cday = "五";
          break;
        case 6:
          cday = "六";
          break;
        case 7:
          cday = "天";
          break;
      }

      return cday;
    },
    SelectWeek(d, name, recipeCycles) {
      console.log(d);
      if (typeof d == "string") {
        d = new Date(d);
      }
      setTimeout((v) => {
        var year = d.getFullYear();
        this.year = year;
        var begin_year;
        var end_year;
        begin_year = year;
        end_year = year;
        var begin_mouth;
        var end_mouth;
        var mouth = d.getMonth() + 1;

        begin_mouth = mouth;
        end_mouth = mouth;
        var StartEliment = document.querySelectorAll(".in-range.start-date");
        var begin_day = StartEliment[0].innerText.trim();
        this.month = begin_mouth + "-" + begin_day + "";
        //判断是否为上一个月
        if (StartEliment[0].className.indexOf("prev-month") >= 0) {
          begin_mouth = mouth - 1;
          if (begin_mouth == 0) {
            begin_mouth = 12;
          }
        }

        //判断是否为下一个月
        var endtime = document.querySelectorAll(".in-range.end-date");
        if (endtime[0].className.indexOf("next-month") >= 0) {
          if (mouth == 12) {
            end_year = end_year + 1;
            end_mouth = 1;
          }
        }
        var end_day = endtime[0].innerText.trim();

        //获取周数本月

        //获取周数
        var curentWeek = document.querySelectorAll(
          ".el-date-table__row.current"
        )[0].firstChild.innerText;

        var full_week = year + "年" + mouth + "月" + "第" + curentWeek + "周";

        this.WeekInfo.WeekTtitle = full_week;
        if (parseInt(begin_day) > parseInt(end_day)) {
          end_mouth = begin_mouth + 1;
          if (end_mouth > 12) {
            end_mouth = 1;
          }
        }
        var full_weekDetails =
          year +
          "年" +
          mouth +
          "月" +
          "第" +
          curentWeek +
          "周" +
          // begin_year +
          // "-" +
          begin_mouth +
          "-" +
          begin_day +
          "至" +
          // end_year +
          // "-" +
          end_mouth +
          "-" +
          end_day;

        if (name) {
          this.WeekInfo.Weekdetails = name;
        } else {
          this.WeekInfo.Weekdetails = full_weekDetails;
        }
        this.startTime = new Date(year + "-" + begin_mouth + "-" + begin_day);
        this.startTimeStr = year + "-" + begin_mouth + "-" + begin_day;
        this.endTime = new Date(year + "-" + end_mouth + "-" + end_day);
        this.endTimeStr = year + "-" + end_mouth + "-" + end_day;
        //获取每天
        this.WeekList = [];

        var alldday = document.querySelectorAll(
          ".el-date-table__row.current"
        )[0].children;

        for (let i = 1; i < alldday.length; i++) {
          if (i <= this.WeekInfo.weekType) {
            var y = year;
            var m = mouth;
            if (alldday[i].className.indexOf("prev-month") >= 0) {
              m = mouth - 1;
              if (m == 0) {
                m = 12;
              }
            }

            if (alldday[i].className.indexOf("next-month") >= 0) {
              if (mouth == 12) {
                y = year + 1;
                m = 1;
              }
            }

            this.WeekList.push({
              name: "week" + i,
              lable: "周" + this.GetChinesDay(i),
              date: m + "月" + alldday[i].innerText.trim() + "日",
              is_vacation: false,
            });
          }
        }
      }, 100);
    },
  },
};
</script>

<style>
</style>