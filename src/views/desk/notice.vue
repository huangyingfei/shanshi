<template>
  <div class="wel">
    <!-- 总量 -->
    <div class="total">
      <div class="mechanism">
        <img src="../../../public/img/jgtotal.png" alt />
        <div class="nism1">
          <div class="ingredients">机构总量</div>
          <div class="food1">{{ this.newhead.organ }}</div>
        </div>
      </div>
      <div class="mechanism">
        <img src="../../../public/img/zftotal.png" alt />
        <div class="nism1">
          <div class="ingredients">政府总量</div>
          <div class="food1">{{ this.newhead.gover }}</div>
        </div>
      </div>
      <div class="mechanism">
        <img src="../../../public/img/sctotal.png" alt />
        <div class="nism1">
          <div class="ingredients">食材总量</div>
          <div class="food1">{{ this.newhead.food }}</div>
        </div>
      </div>
      <div class="mechanism">
        <img src="../../../public/img/cptotal.png" alt />
        <div class="nism1">
          <div class="ingredients">菜品总量</div>
          <div class="food1">{{ this.newhead.dish }}</div>
        </div>
      </div>
      <div class="mechanism">
        <img src="../../../public/img/sptotal.png" alt />
        <div class="nism1">
          <div class="ingredients">食谱总量</div>
          <div class="food1">{{ this.newhead.recipe }}</div>
        </div>
      </div>
    </div>
    <!-- 排行榜 -->
    <div class="dishes">
      <!-- 菜谱排行榜 -->
      <div class="variety" v-if="this.empty == 1">
        <h4 class="welcome">本周最受欢迎菜品</h4>
        <div class="pictures">
          <!-- <img src="../../../public/img/shuj.png" alt="" /> -->
          <p>暂无数据</p>
        </div>
      </div>
      <div class="variety" v-else>
        <h4 class="welcome">本周最受欢迎菜品</h4>
        <div class="menu1" v-for="(item, i) in double" :key="i">
          <div class="menuimg">
            <!-- <img :src="item.dishPic" alt /> -->
            <el-image style="width: 80px; height: 80px" :src="item.dishPic">
              <div
                slot="error"
                class="image-slot"
                style="width: 80px; height: 80px; text-align: center;  line-height: 80px;"
              >
                <!-- <i class="el-icon-picture-outline"></i> -->
                <div class="el-image__error">
                  暂无图片
                </div>
              </div>
            </el-image>
          </div>
          <div class="menutext">{{ item.dishName }}</div>
          <div class="menunum">{{ item.dishCount }}</div>
        </div>
      </div>
      <!-- 健康指数排行榜 -->
      <div class="recipes">
        <!-- <div class="chooser">
          <el-select clearable v-model="activity" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div> -->
        <h4 class="welcome1">本周食谱健康指数排行榜</h4>
        <div class="school1" v-for="(item1, i) in getHealth" :key="i" lazy>
          <div class="ranking">{{ item1.list }}</div>
          <div class="schoolimg">
            <!-- <img :src="item1.dishPic" alt /> -->
            <el-image style="width: 80px; height: 80px" :src="item1.logoUrl">
              <div
                slot="error"
                class="image-slot"
                style="width: 80px; height: 80px; text-align: center;  line-height: 80px;"
              >
                <!-- <i class="el-icon-picture-outline"></i> -->
                <div class="el-image__error">
                  暂无图片
                </div>
              </div>
            </el-image>
          </div>
          <div class="schooltxt">{{ item1.tenantName }}</div>
          <div class="schoolnum">{{ item1.score }}</div>
        </div>
      </div>
      <!-- !!! -->
    </div>
    <!-- !echarts图标! -->
    <!-- <div class="daychart">
      <div class="foodinta">
        <div id="leiDaTu" :style="{ width: '500px', height: '500px' }"></div>
      </div>
      <div class="nutrient">
        <div id="mynutrient" :style="{ width: '500px', height: '500px' }"></div>
      </div>
    </div> -->
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
      options: [],
      activity: "",
      double: [],
      getHealth: [],
      today: [], //
      greater: [],
      activeNames: ["1", "2", "3", "5"],
      logActiveNames: ["17"],
      empty: ""
    };
  },
  computed: {
    ...mapGetters(["userInfo"])
  },

  beforeMount() {
    this.siteheader(); //头部
    this.welcomeUser();
    this.HealthBar();
  },
  mounted() {},
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
      let urlParams = `?size=${500}&current=${1}`;
      this.$axios.get(`api/blade-food/food/dishTotal` + urlParams).then(res => {
        // console.log(res);
        this.double = res.data.data.records;
        console.log(this.double);
        if (this.double.length == 0) {
          this.empty = 1;
        } else {
          this.empty = 2;
        }
      });
    },
    //本周食谱健康指数排行榜
    HealthBar() {
      let urlParams = `?size=${500}&current=${1}`;
      this.$axios
        .get(`api/blade-food/food/recipeTotal` + urlParams)
        .then(res => {
          // console.log(res);
          this.getHealth = res.data.data.records;
          // console.log(this.getHealth);
          this.getHealth.forEach((item, i) => {
            item.list = i + 1;
          });
          // console.log(this.getHealth);
        });
    },

    handleChange(val) {
      window.console.log(val);
    }
  }
};
</script>

<style lang="scss" scoped>
.wel {
  width: 100%;
  height: 100%;
  /* background-color: #fff; */
  margin-bottom: 50px;
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
  height: 750px;
  background-color: #fff;
  display: flex;
  margin-top: 5px;
  margin-bottom: 40px;
}
.variety {
  width: 50%;
  height: 700px;
  overflow-y: auto;
  overflow-x: hidden;
  background-color: #fff;
}
.pictures {
  width: 200px;
  height: 200px;
  // background-color: red;
  margin: auto;
  margin-top: 150px;
  img {
    width: 200px;
    height: 200px;
  }
  p {
    font-size: 20px;
    font-weight: bold;
    color: #c0c4cc;
  }
}
.recipes {
  width: 50%;
  height: 700px;
  overflow-y: auto;
  overflow-x: hidden;
  background-color: #fff;
  // margin-bottom: 40px;
}
.welcome {
  margin-left: 20px;
  // margin-top: 40px;
}
.welcome1 {
  margin-top: 20px;
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
  height: 90px;
  margin-top: 20px;
}
.ranking {
  width: 30px;
  height: 30px;
  // background: red;
  text-align: center;
  line-height: 30px;
  color: #000;
  float: left;
  margin-top: 20px;
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
  width: 80px;
  height: 80px;
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
  height: 80px;
  line-height: 80px;
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
.chooser {
  width: 400px;
  height: 50px;
  /* background-color: red; */
  margin-left: 20px;
  margin-top: 10px;
}
</style>
