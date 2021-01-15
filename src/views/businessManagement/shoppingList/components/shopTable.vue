<template>
  <div style="width: 100%">
    <div class="shop-table-box" style="" v-show="shopListData.length > 0">
      <div v-for="(item, index) in shopListData" :key="index" style="">
        <ul>
          <li style="text-align: center">{{ item.headerStr }}</li>
          <li>
            <label>人数</label>
            <el-input-number
              :value="peopleSum(item.peopleStrs)"
              :controls="false"
              size="small"
              disabled
            ></el-input-number>
            <el-popover placement="right" width="250" trigger="click">
              <el-form size="mini" label-width="80px">
                <el-form-item
                  :label="people.peopleName"
                  v-for="people in item.peopleStrs"
                  :key="people"
                >
                  <el-input-number
                    v-model="people.finalNum"
                    :controls="false"
                    :disabled="people.peopleName == '请假人数'"
                    @change="
                      peopleChange(
                        people.peopleName,
                        item.children,
                        people.finalNum
                      )
                    "
                  ></el-input-number>
                </el-form-item>
                <el-form-item label="合计">
                  <el-input-number
                    :value="peopleSum(item.peopleStrs)"
                    :controls="false"
                    disabled
                  ></el-input-number>
                </el-form-item>
              </el-form>
              <el-button type="text" slot="reference">查看全部</el-button>
            </el-popover>
          </li>
          <li>
            <label>配送时间</label>
            <el-date-picker
              v-model="item.deliverTime"
              type="datetime"
              size="small"
              value-format="yyyy-MM-dd HH:mm:ss"
              default-time="10:00:00"
            >
            </el-date-picker>
          </li>
          <li>
            <span class="label-center">食材</span>
            <span class="label-center">采购量</span>
          </li>
          <li v-for="food in item.children" :key="food">
            <div style="">
              <label>{{ food.foodName }}</label>
              <el-input-number
                v-model="food.stockVal"
                :controls="false"
                size="small"
                @change="handleChange(food)"
              ></el-input-number>
              <span>{{ food.unit }}</span>
              <span
                @click="listCardsHandle($event)"
                style="width: 50px; display: inline-block; text-align: right"
              >
                <i class="el-icon-arrow-right"></i>
              </span>
            </div>
            <div
              style="
                display: none;
                text-align: center;
                border-top: 2px solid #dcdfe6;
              "
            >
              <span>1</span>
              <el-select v-model="food.unit" size="small">
                <el-option label="Kg" value="Kg"></el-option>
                <el-option label="包" value="包"></el-option>
                <el-option label="斤" value="斤"></el-option>
                <el-option label="桶" value="桶"></el-option>
                <el-option label="瓶" value="瓶"></el-option>
                <el-option label="箱" value="箱"></el-option>
                <el-option label="袋" value="袋"></el-option>
                <el-option label="盒" value="盒"></el-option>
              </el-select>
              <span>=</span>
              <el-input-number
                v-model="food.unitVal"
                :controls="false"
                size="small"
                @change="foodUnitChange(food)"
              ></el-input-number>
              <span>Kg</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div
      v-show="shopListData.length == 0"
      style="border: 1px solid #dcdfe6; text-align: center; line-height: 100px"
    >
      暂无数据
    </div>
  </div>
</template>

<script>
import { calcfoodWeight } from "../../../../api/businessManagement/shoppingList";

export default {
  props: {
    shopListData: {
      type: Array,
      default: function () {
        return [1, 2, 3, 4, 5, 6, 7];
      },
    },
  },
  data() {
    return {
      num: "",
      value1: "",
    };
  },
  mounted() {
    console.log(this.shopListData.length);
  },
  methods: {
    dataChange(val) {
      console.log(val);
    },
    //展开折叠面板
    listCardsHandle(e) {
      //根据当前点击的dom，获取需要展示隐藏的dom
      var listCardsBlock =
        e.currentTarget.parentElement.parentElement.lastElementChild;
      //获取箭头所在的dom
      var arrow = e.currentTarget.firstElementChild;
      //箭头的样式改变，块也跟着显示隐藏
      if (arrow.getAttribute("class") == "el-icon-arrow-down") {
        arrow.setAttribute("class", "el-icon-arrow-right");
        listCardsBlock.style.display = "none";
      } else {
        arrow.setAttribute("class", "el-icon-arrow-down");
        listCardsBlock.style.display = "block";
      }
    },
    //食材采购量输入框改变
    handleChange(food) {
      console.log(food);
      food.isLock = 1;
    },
    //计算人数总量
    peopleSum(peopleStrs) {
      console.log(peopleStrs);
      var finalNum = 0;
      peopleStrs.forEach((el) => {
        finalNum += el.finalNum;
      });
      return finalNum;
    },
    //人群人数改变
    peopleChange(peopleName, foods, peopleNameNum) {
      console.log(peopleName);
      console.log(foods);
      calcfoodWeight(peopleName, foods, peopleNameNum);
    },
    foodUnitChange(food) {
      console.log(food);
      food.stockVal = food.stockSumVal / (1000 * food.unitVal);
    },
  },
};
</script>

<style scoped>
ul {
  padding-left: 0px;
  margin-bottom: 0px;
  margin-top: 0px;
  min-width: 340px;
  list-style-type: none;
}
ul li {
  border: 1px solid #dcdfe6;
  line-height: 40px;
}
li .el-card {
  padding-top: 5px;
  padding-bottom: 5px;
}
.label-center {
  width: 50%;
  display: inline-block;
  text-align: center;
}
li label {
  font-size: 14px;
  color: #606266;
  width: 120px;
  display: inline-block;
  text-align: center;
}
.el-input-number {
  width: 110px;
  margin-right: 12px;
  margin-left: 12px;
}
.el-select {
  width: 70px;
  margin-right: 12px;
  margin-left: 12px;
}
.el-date-editor {
  width: 180px !important;
  margin-right: 12px;
  margin-left: 12px;
}
.shop-table-box {
  overflow: auto;
  border: 1px solid #dcdfe6;
  display: flex;
  max-height: calc(100vh - 200px);
}
</style>