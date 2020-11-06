<template>
  <div>
    <el-row :gutter="20" style="padding: 0px; margin-top: 5px">
      <el-col :span="24">
        <el-form :gutter="10" :inline="true" :model="formInline">
          <el-form-item>
            <el-input
              placeholder="请选择周期"
              v-model="WeekInfo.WeekTtitle"
              class="input-with-select"
              style="width: 350px"
              suffix-icon="el-icon-date"
            >
              <el-select
                v-model="WeekInfo.weekType"
                slot="prepend"
                placeholder="周长设置"
              >
                <el-option label="5天一周" value="5"></el-option>
                <el-option label="6天一周" value="6"></el-option>
                <el-option label="7天一周" value="7"></el-option>
              </el-select>
            </el-input>

            <el-date-picker
              v-model="WeekInfo.weekValue"
              type="week"
              format="yyyy-MM"
              :picker-options="{ firstDayOfWeek: 1 }"
              @focus="FixWeek"
              placeholder="选择时间"
              name="WeekSelect"
              @change="SelectWeek"
              style="
                width: 230px;
                opacity: 0;
                position: absolute;
                left: 120px;
                top: -10px;
              "
              clear-icon=""
              ref="refweekSelect"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="餐谱名称">
            <el-input
              v-model="WeekInfo.Weekdetails"
              style="width: 400px"
            ></el-input>
          </el-form-item>

          <el-form-item label="餐点设置">
            <el-checkbox-group
              v-model="WeekInfo.foodCatalog"
              @change="AppendFoodType"
            >
              <el-checkbox label="早餐" checked name="早餐"></el-checkbox>
              <el-checkbox label="早点" name="早点"></el-checkbox>
              <el-checkbox label="午餐" name="午餐"></el-checkbox>
              <el-checkbox label="晚餐" name="晚餐"></el-checkbox>
              <el-checkbox label="晚点" name="晚点"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>

    <el-row :gutter="20" style="padding: 0px">
      <el-col :span="24">
        <el-divider></el-divider>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="24">
        <el-form :gutter="10" :inline="true" :model="WeekInfo">
          <el-form-item label="选择人群">
            <el-select v-model="WeekInfo.crowd" placeholder="选择人群">
              <el-option label="幼儿" value="1"></el-option>
              <el-option label="成人" value="2"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item>
            <el-switch v-model="WeekInfo.shareOrg" inactive-text="分享组织">
            </el-switch>

            <el-switch
              style="margin-left: 10px"
              v-model="WeekInfo.sharePlant"
              inactive-text="分享平台"
            >
            </el-switch>

            <el-switch
              style="margin-left: 10px"
              v-model="WeekInfo.shareTell"
              inactive-text="公告"
            >
            </el-switch>

            <el-switch
              style="margin-left: 10px"
              v-model="WeekInfo.collection"
              inactive-text="收藏"
              active-color="#13ce66"
              inactive-color="#ff4949"
            >
            </el-switch>

            <el-button style="margin-left: 30px" size="medium" type="success"
              >智能配平</el-button
            >

            <el-button style="margin-left: 10px" size="medium"
              >自动设置油盐糖</el-button
            >

            <el-button style="margin-left: 10px" size="medium"
              >自动清除油盐糖</el-button
            >

            <el-button style="margin-left: 10px" size="medium"
              >营养素</el-button
            >

            <el-button style="margin-left: 10px" size="medium"
              >带量食谱</el-button
            >
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>

    <el-row :gutter="20" style="padding: 0px">
      <el-col :span="24">
        <el-divider></el-divider>
      </el-col>
    </el-row>

    <el-row :gutter="20" style="padding: 0px; margin-top: 0px">
      <el-col :span="4">
        <el-card class="box-car" shadow="never">
          <div class="clearfix panel_head">
            <el-button-group>
              <el-button size="small" style="bo">食谱</el-button>
              <el-button size="small">菜品</el-button>
            </el-button-group>
          </div>

          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="分享食谱" name="first">
              <div style="margin-top: 0px;padding:5px;">
                <el-input
                  size="small"
                  placeholder="请输入内容"
                  v-model="input3"
                  class="input-with-select"
                >
                  <el-button slot="append" icon="el-icon-search"></el-button>
                </el-input>
              </div>
              <div style="margin-top: 3px">
                <el-tag type="success" style="margin-left: 5px">区域</el-tag>
                <el-tag type="success" style="margin-left: 5px">季节</el-tag>
              </div>

              <div style="margin-top: 5px; margin-bottom: 2px">
                <el-divider></el-divider>
              </div>

              <ul class="foodWeekListHis">
                <li><a>第一周菜谱</a></li>
                <li>2</li>
                <li>3</li>
              </ul>
            </el-tab-pane>
            <el-tab-pane label="个人食谱" name="second">配置管理</el-tab-pane>
          </el-tabs>
        </el-card>
      </el-col>
      <el-col :span="20">
        <div class="foodPanel">
          <foods-week :headers="headers" :datas="datas" days="5"> </foods-week>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import foodsWeek from "@/views/foods/components/foodsweek";
export default {
  components: {
    foodsWeek
  },
  created() {
    this.init();
  },
  data() {
    const data = [];
    return {
      WeekInfo: {
        weekType: "", //周期类型
        WeekTtitle: "", //周期标题
        Weekdetails: "", //周期明细
        weekValue: "",
        foodCatalog: [], //餐点类型
        crowd: "", //人群
        shareOrg: true
      },
      activeName: "first",
      // 表格头部
      headers: [],
      // 表格数据
      datas: [],
      WeekList: [], //所选的时间周期
      FoodTypeList: [], //所选餐点类型
      rebuild: false
    };
  },
  beforeMount() {},
  methods: {
    init() {
      this.initRemoteData();
    },

    //重新构建表格
    rebuildTable() {
      var that = this;
      this.headers = [];
      setTimeout(function() {
        var hd = JSON.parse(JSON.stringify(that.WeekList));
        for (let j = 0; j < hd.length; j++) {
          that.headers.push(hd[j]);
        }
        that.initEmptyData();
      }, 100);
    },

    //餐点类型改变
    AppendFoodType() {
      var date3 = JSON.parse(JSON.stringify(this.WeekInfo.foodCatalog));

      //新增餐点类型
      for (let i = 0; i < date3.length; i++) {
        if (!this.hasFoodType(date3[i])) {
          var row = {
            id: this.guid(),
            pid: this.id,
            name: date3[i],
            weeks: []
          };

          // 填充周数据
          for (let j = 0; j < 7; j++) {
            row.weeks.push({
              id: this.guid(),
              week: this.headers[j],
              name: "week" + (j + 1),
              image: "",
              // 填充食谱数据
              foods: []
            });
          }

          this.datas.push(row);
        }
      }

      //删除餐点类型
      var deleteList = [];
      for (let i = 0; i < this.datas.length; i++) {
        var needremove = true;
        this.WeekInfo.foodCatalog.forEach(e => {
          if (e == this.datas[i].name) {
            needremove = false;
          }
        });

        if (needremove) {
          deleteList.push(i);
        }
      }
      deleteList.forEach(e => {
        this.datas.splice(e, 1);
      });

      console.log(JSON.stringify(this.datas));
    },

    hasFoodType(foodTypeName) {
      var result = this.datas.find(p => p.name == foodTypeName);
      if (!result) {
        return false;
      } else {
        return true;
      }
    },
    // 初始化表格数据(根据id获取远程数据)
    initEmptyData() {
      this.datas = [];
      var date3 = JSON.parse(JSON.stringify(this.WeekInfo.foodCatalog));
      for (let i = 0; i < date3.length; i++) {
        var row = {
          id: this.guid(),
          pid: this.id,
          name: date3[i],
          weeks: []
        };

        // 填充周数据
        for (let j = 0; j < 7; j++) {
          row.weeks.push({
            id: this.guid(),
            week: this.headers[j],
            name: "week" + (j + 1),
            image: "",
            // 填充食谱数据
            foods: []
          });
        }

        this.datas.push(row);
      }
    },

    ///初始化远程数据
    initRemoteData() {
      var remoteStr =
        '[{"id":"7317b146-7fc5-fcbd-2969-5b59f321e831","name":"早餐","weeks":[{"id":"79ba0527-a10a-22e0-2df4-b58d9c8b1191","week":{"name":"week1","lable":"周一","date":"11月2日","is_vacation":false},"name":"week1","image":"","foods":[{"id":101,"name":"绿豆粥","count":1,"children":[{"id":101001,"name":"绿豆","count":1,"spans":3},{"id":101002,"name":"白糖","count":1,"spans":3}],"spans":3}]},{"id":"880061e2-66d2-fed1-11bc-b9b2489fc0af","week":{"name":"week2","lable":"周二","date":"11月3日","is_vacation":false},"name":"week2","image":"","foods":[]},{"id":"ee2c62a0-5d95-9d34-0df3-212081347a45","week":{"name":"week3","lable":"周三","date":"11月4日","is_vacation":false},"name":"week3","image":"","foods":[]},{"id":"7383fe68-8ec8-e72b-879d-d99805c9813f","week":{"name":"week4","lable":"周四","date":"11月5日","is_vacation":false},"name":"week4","image":"","foods":[]},{"id":"148b984c-76f5-b856-3965-6925b0f1e694","week":{"name":"week5","lable":"周五","date":"11月6日","is_vacation":false},"name":"week5","image":"","foods":[]},{"id":"2b524e1a-4b03-d446-f09e-597a4afce450","name":"week6","image":"","foods":[]},{"id":"8eac338a-acda-78c2-e837-bae237cad7ea","name":"week7","image":"","foods":[]}]}]';

      var remoteData = JSON.parse(remoteStr);
      this.headers = [];
      remoteData[0].weeks.forEach(e => {
        if (e.week) {
          this.headers.push(e.week);
        }
      });
      this.datas = remoteData;
    },
    //生成随机 GUID 数
    guid() {
      function S4() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
      }
      return (
        S4() +
        S4() +
        "-" +
        S4() +
        "-" +
        S4() +
        "-" +
        S4() +
        "-" +
        S4() +
        S4() +
        S4()
      );
    },
    //周选择添加周次
    FixWeek() {
      var weekSelect = document.getElementsByName("WeekSelect");
      if (weekSelect == undefined) return;

      if (weekSelect[0].getAttribute("isFixWeek") != undefined) return;

      setTimeout(function() {
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
    //选择周
    SelectWeek(d) {
      var that = this;
      setTimeout(function(v) {
        var year = d.getFullYear();
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

        that.WeekInfo.WeekTtitle = full_week;

        var full_weekDetails =
          year +
          "年" +
          mouth +
          "月" +
          "第" +
          curentWeek +
          "周" +
          begin_year +
          "-" +
          begin_mouth +
          "-" +
          begin_day +
          "至" +
          end_year +
          "-" +
          end_mouth +
          "-" +
          end_day;

        that.WeekInfo.Weekdetails = full_weekDetails;

        //获取每天
        that.WeekList = [];

        var alldday = document.querySelectorAll(
          ".el-date-table__row.current"
        )[0].children;
        for (let i = 1; i < alldday.length; i++) {
          if (i <= that.WeekInfo.weekType) {
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

            that.WeekList.push({
              name: "week" + i,
              lable: "周" + that.GetChinesDay(i),
              date: m + "月" + alldday[i].innerText.trim() + "日",
              is_vacation: false
            });
          }
        }

        //console.log(JSON.stringify(that.WeekList));

        that.rebuildTable();
      }, 100);
    },
    //打开周选择
    ShowWeekSelect() {
      this.$refs.refweekSelect.showPicker();
    }
  }
};
</script>

<style scoped>
.el-row {
  padding: 5px;
}
.el-select .el-input {
  width: 120px;
}
.el-form-item {
  margin-bottom: 0px;
}
.el-divider {
  margin: 0px !important;
}
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}
.box-car {
  border: 1px solid #ebebeb !important;
  border-radius: 3px !important;
  padding: 0px;
  height: 600px;
}
.el-card__body {
  padding: 0px !important;
}
.panel_head {
  background-color: rgba(0, 172, 160, 1);
  padding-top: 10px;
  text-align: center;
  border-radius: 3px;
}
.panel_head button {
  border-bottom: 0px;
  border-bottom-right-radius: 0px;
  border-bottom-left-radius: 0px;
  margin-bottom: 1px;
}
.foodWeekListHis {
  padding: 5px;
}
.foodWeekListHis li {
  list-style: none;
  margin-bottom: 2px;
}
.foodPanel {
  height: calc(100vh - 180px);
  overflow-y: scroll;
  overflow-x: auto;
}
</style>
