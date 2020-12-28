<template>
  <div class="wel">
    <!-- 总量 -->
    <div class="total">
      <div class="mechanism">
        <!-- <img src="http://www.huangyingfei.cn/img/123.jpg" alt /> -->
        <div class="nism1">
          <div class="ingredients">机构总量</div>
          <div class="food1">{{ this.newhead.organ }}</div>
        </div>
      </div>
      <div class="mechanism">
        <!-- <img src="http://www.huangyingfei.cn/img/123.jpg" alt /> -->
        <div class="nism1">
          <div class="ingredients">政府总量</div>
          <div class="food1">{{ this.newhead.gover }}</div>
        </div>
      </div>
      <div class="mechanism">
        <!-- <img src="http://www.huangyingfei.cn/img/123.jpg" alt /> -->
        <div class="nism1">
          <div class="ingredients">食材总量</div>
          <div class="food1">{{ this.newhead.food }}</div>
        </div>
      </div>
      <div class="mechanism">
        <!-- <img src="http://www.huangyingfei.cn/img/123.jpg" alt /> -->
        <div class="nism1">
          <div class="ingredients">菜品总量</div>
          <div class="food1">{{ this.newhead.dish }}</div>
        </div>
      </div>
      <div class="mechanism">
        <!-- <img src="http://www.huangyingfei.cn/img/123.jpg" alt /> -->
        <div class="nism1">
          <div class="ingredients">食谱总量</div>
          <div class="food1">{{ this.newhead.recipe }}</div>
        </div>
      </div>
    </div>
    <!-- 排行榜 -->
    <div class="dishes">
      <!-- 菜谱排行榜 -->
      <div class="variety">
        <h4 class="welcome">本周最受欢迎菜品</h4>
        <div class="menu">
          <div class="menuimg">
            <!-- <img src="http://www.huangyingfei.cn/img/123.jpg" alt /> -->
          </div>
          <div class="menutext">爆炒金针菇</div>
          <div class="menunum">655</div>
        </div>
        <div class="menu1">
          <div class="menuimg">
            <!-- <img src="http://www.huangyingfei.cn/img/123.jpg" alt /> -->
          </div>
          <div class="menutext">翠竹报春</div>
          <div class="menunum">642</div>
        </div>
        <div class="menu1">
          <div class="menuimg">
            <!-- <img src="http://www.huangyingfei.cn/img/123.jpg" alt /> -->
          </div>
          <div class="menutext">炒三丁</div>
          <div class="menunum">598</div>
        </div>
        <div class="menu1">
          <div class="menuimg">
            <!-- <img src="http://www.huangyingfei.cn/img/123.jpg" alt /> -->
          </div>
          <div class="menutext">扶手观音莲</div>
          <div class="menunum">576</div>
        </div>
        <div class="menu1">
          <div class="menuimg">
            <!-- <img src="http://www.huangyingfei.cn/img/123.jpg" alt /> -->
          </div>
          <div class="menutext">干锅土豆片</div>
          <div class="menunum">566</div>
        </div>
      </div>
      <!-- 健康指数排行榜 -->
      <div class="recipes">
        <h4 class="welcome1">本周食谱健康指数排行榜</h4>
        <div class="school">
          <div class="ranking">1</div>
          <div class="schoolimg">
            <!-- <img src="http://www.huangyingfei.cn/img/123.jpg" alt /> -->
          </div>
          <div class="schooltxt">杭州市实验外国语学校</div>
          <div class="schoolnum">4.50分</div>
        </div>
        <div class="school1">
          <div class="ranking1">2</div>
          <div class="schoolimg">
            <!-- <img src="http://www.huangyingfei.cn/img/123.jpg" alt /> -->
          </div>
          <div class="schooltxt">杭州市大成实验学校</div>
          <div class="schoolnum">4.25分</div>
        </div>

        <div class="school1">
          <div class="ranking2">3</div>
          <div class="schoolimg">
            <!-- <img src="http://www.huangyingfei.cn/img/123.jpg" alt /> -->
          </div>
          <div class="schooltxt">浙江省东阳市外国语学校</div>
          <div class="schoolnum">4.00分</div>
        </div>

        <div class="school1">
          <div class="ranking3">4</div>
          <div class="schoolimg">
            <!-- <img src="http://www.huangyingfei.cn/img/123.jpg" alt /> -->
          </div>
          <div class="schooltxt">杭州市览新第二幼儿园</div>
          <div class="schoolnum">4.00分</div>
        </div>

        <div class="school1">
          <div class="ranking4">5</div>
          <div class="schoolimg">
            <!-- <img src="http://www.huangyingfei.cn/img/123.jpg" alt /> -->
          </div>
          <div class="schooltxt">杭州外国语学校</div>
          <div class="schoolnum">4.00分</div>
        </div>
      </div>
      <!-- !!! -->
    </div>
    <!-- !echarts图标! -->
    <div class="daychart">
      <div class="foodinta">
        <div id="myChart" :style="{ width: '500px', height: '500px' }"></div>
      </div>
      <div class="nutrient">
        <div id="mynutrient" :style="{ width: '500px', height: '500px' }"></div>
      </div>
    </div>
    <!-- -->
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "wel",
  data() {
    return {
      newhead: {
        organ: "", //机构
        gover: "", //政府
        food: "", //食材
        dish: "", //菜品
        recipe: "" //食谱
      },
      activeNames: ["1", "2", "3", "5"],
      logActiveNames: ["17"]
    };
  },
  computed: {
    ...mapGetters(["userInfo"])
  },
  mounted() {
    this.drawLine();
    this.extract();
  },
  beforeMount() {
    this.siteheader(); //头部
    this.welcomeUser();
  },
  methods: {
    //头部
    siteheader() {
      this.$axios.get(`api/blade-food/food/getTotal`).then(res => {
        // console.log(res);
        this.newhead = res.data.data;
        // console.log(this.newhead);
      });
    },
    //本周最受欢迎菜品
    welcomeUser() {
      this.$axios.get(`api/blade-food/food/dishTotal`).then(res => {
        console.log(res);
      });
    },
    handleChange(val) {
      window.console.log(val);
    },
    extract() {
      let mynutrient = this.$echarts.init(
        document.getElementById("mynutrient")
      );
      // 绘制图表
      mynutrient.setOption({
        title: {
          text: "儿童每人每日营养素提取（DRls）",
          left: "center"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          orient: "vertical",
          left: "left",
          data: [
            "直接访问",
            "邮件营销",
            "联盟广告",
            "视频广告",
            "搜索引擎",
            "水果"
          ]
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            data: [
              { value: 335, name: "直接访问" },
              { value: 310, name: "邮件营销" },
              { value: 234, name: "联盟广告" },
              { value: 135, name: "视频广告" },
              { value: 1548, name: "搜索引擎" },
              { value: 450, name: "水果" }
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      });
    },
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("myChart"));
      // 绘制图表
      myChart.setOption({
        title: {
          text: "儿童每人每日进食量",
          left: "center"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          orient: "vertical",
          left: "left",
          data: [
            "直接访问",
            "邮件营销",
            "联盟广告",
            "视频广告",
            "搜索引擎",
            "水果"
          ]
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            data: [
              { value: 335, name: "直接访问" },
              { value: 310, name: "邮件营销" },
              { value: 234, name: "联盟广告" },
              { value: 135, name: "视频广告" },
              { value: 1548, name: "搜索引擎" },
              { value: 450, name: "水果" }
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      });
    }
  }
};
</script>

<style>
.wel {
  width: 100%;
}
.el-font-size {
  font-size: 14px;
}

.total {
  width: 100%;
  height: 60px;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
}
.mechanism {
  width: 120px;
  height: 60px;
  margin-left: 20px;
  margin-right: 20px;
  background-color: #fff;
  line-height: 60px;
  /* justify-content: space-between; */
  /* display: flex; */
}
.mechanism img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-top: 5px;
  float: left;
}
.nism1 {
  width: 60px;
  height: 60px;
  float: left;
  /* background-color: yellow; */
  font-size: 14px;
  margin-left: 10px;
}
.ingredients {
  width: 100%;
  height: 30px;
  line-height: 30px;
}
.food1 {
  width: 100%;
  height: 30px;
  line-height: 30px;
}
.dishes {
  width: 100%;
  height: 600px;
  /* background-color: yellow; */
  display: flex;
  margin-top: 5px;
}
.variety {
  width: 50%;
  height: 600px;
  background-color: #fff;
}
.recipes {
  width: 50%;
  height: 600px;
  background-color: #fff;
  margin-bottom: 40px;
}
.welcome {
  margin-left: 20px;
  margin-top: 40px;
}
.welcome1 {
  margin-top: 40px;
}
.menu {
  width: 100%;
  height: 80px;
  /* background-color: red; */
  /* line-height: 80px; */
}
.menu1 {
  width: 100%;
  height: 80px;
  /* background-color: red; */
  margin-top: 25px;
}
.menuimg {
  width: 80px;
  height: 80px;
  background-color: #fff;
  margin-left: 20px;
  float: left;
}
.menuimg img {
  width: 80px;
  height: 80px;
}
.menutext {
  float: left;
  width: 100px;
  height: 80px;
  line-height: 80px;
  margin-left: 20px;
  font-size: 14px;
}
.menunum {
  float: right;
  width: 100px;
  height: 80px;
  line-height: 80px;
  font-size: 14px;
}
.school {
  width: 100%;
  height: 60px;
}
.school1 {
  width: 100%;
  height: 60px;

  margin-top: 40px;
}
.ranking {
  width: 30px;
  height: 30px;
  background: red;
  text-align: center;
  line-height: 30px;
  color: #fff;
  float: left;
  margin-top: 15px;
}
.ranking1 {
  width: 30px;
  height: 30px;
  background: #f18546;
  text-align: center;
  line-height: 30px;
  color: #fff;
  float: left;
  margin-top: 15px;
}
.ranking2 {
  width: 30px;
  height: 30px;
  background: #f5aa3c;
  text-align: center;
  line-height: 30px;
  color: #fff;
  float: left;
  margin-top: 15px;
}
.ranking3 {
  width: 30px;
  height: 30px;
  background: #00aca0;
  text-align: center;
  line-height: 30px;
  color: #fff;
  float: left;
  margin-top: 15px;
}
.ranking4 {
  width: 30px;
  height: 30px;
  background: #00aca0;
  text-align: center;
  line-height: 30px;
  color: #fff;
  float: left;
  margin-top: 15px;
}
.schoolimg {
  width: 50px;
  height: 50px;
  background-color: #fff;
  float: left;
  margin-left: 30px;
  margin-top: 5px;
}
.schoolimg img {
  width: 50px;
  height: 50px;
}
.schooltxt {
  width: 200px;
  height: 60px;
  line-height: 60px;
  margin-left: 20px;
  float: left;
  font-size: 14px;
}
.schoolnum {
  float: right;
  width: 100px;
  height: 60px;
  line-height: 60px;
  text-align: center;
  font-size: 14px;
}
.daychart {
  width: 100%;
  height: 600px;
  background-color: #fff;
  margin-top: 10px;
}
.foodinta {
  width: 50%;
  height: 100%;
  float: left;
}
.nutrient {
  width: 50%;
  height: 100%;
  float: left;
}
</style>
