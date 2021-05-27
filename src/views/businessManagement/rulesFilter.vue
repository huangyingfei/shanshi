<template>
  <div>
    <el-row>
      <el-col :span="8"
        ><div class="allrules">
          <span class="exact">伙食费:</span>

          <el-input
            style="width: 180px; margin-left: 20px"
            v-model="formsearch.foodturn"
            placeholder="请输入内容"
          ></el-input>
          <span style="margin-left: 10px">元/天</span>
        </div></el-col
      >
      <el-col :span="8">
        <div class="allrules">
          <span class="exact">应退伙食费:</span>

          <el-input
            style="width: 180px; margin-left: 20px"
            v-model="formsearch.refunded"
            placeholder="请输入内容"
          ></el-input>
          <span style="margin-left: 10px">元/天</span>
        </div>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="24">
        <div class="amount">
          <div class="choose">退费条件选择</div>
          <div class="refunded">
            <span style="">停课、中途入校、离校退费标准：</span>
            <el-radio v-model="refunds" label="1">按伙食费退</el-radio>
            <el-radio v-model="refunds" label="2">按应退金额退</el-radio>
            <el-radio v-model="refunds" label="3">不退费</el-radio>
          </div>

          <div class="bridleway">
            <div class="bridleway1">可退费的缺勤天数计算方式：</div>
            <div>
              <el-radio v-model="runway" label="1"
                >自然月中累计缺勤天数满</el-radio
              >
              <el-input
                style="width: 100px; margin-right: 10px"
                v-model="daysoticks"
                placeholder="请输入内容"
              ></el-input
              >天，<span>即可退累计缺勤减</span
              ><el-input
                style="width: 100px; margin-left: 10px"
                v-model="rightcost"
                placeholder="请输入内容"
              ></el-input
              >天费用
            </div>
            <div class="creations">
              <el-radio v-model="runway" label="2">连续缺勤天数满</el-radio>
              <el-input
                style="width: 100px; margin-right: 10px"
                v-model="semi"
                placeholder="请输入内容"
              ></el-input
              >天，即可退累计缺勤减<el-input
                style="width: 100px; margin-left: 10px"
                v-model="failed"
                placeholder="请输入内容"
              ></el-input
              >天费用
            </div>
            <div class="creations">
              <el-radio v-model="runway" label="3"
                >自然月中累计的“连续”缺勤天数满</el-radio
              >
              <el-input
                style="width: 100px; margin-right: 10px"
                v-model="natural"
                placeholder="请输入内容"
              ></el-input
              >天并且连续缺勤天数满
              <el-input
                style="width: 100px; margin-right: 10px"
                v-model="naturals"
                placeholder="请输入内容"
              ></el-input
              >天，即可退累计的（连续缺勤减
              <el-input
                style="width: 100px; margin-right: 10px"
                v-model="naturalhair"
                placeholder="请输入内容"
              ></el-input
              >天）费用
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <div class="excsave1">
          <el-button
            icon="el-icon-download"
            size="medium"
            type="primary"
            @click="saveddata"
            >保存</el-button
          >
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formsearch: {
        foodturn: "",
        refunded: "", //应退伙食费
      },
      rulescan: "", //ID
      refunds: "1",
      runway: "1", //计算方式
      daysoticks: "", //累计缺勤天数
      rightcost: "", //
      semi: "", //连续缺勤
      failed: "",
      natural: "", //自然月
      naturals: "", //
      naturalhair: "", //
    };
  },
  beforeMount() {
    this.getRules();
  },
  methods: {
    //保存
    saveddata() {
      let rules = {};
      if (this.rulescan == "") {
        rules = {};
      } else {
        rules = { id: this.rulescan };
      }
      let obj = {};
      if (this.runway == 1) {
        obj = { param1: this.daysoticks, param2: this.rightcost };
      } else if (this.runway == 2) {
        obj = { param3: this.semi, param4: this.failed };
      } else if (this.runway == 3) {
        obj = {
          param5: this.natural,
          param6: this.naturals,
          param7: this.naturalhair,
        };
      }
      this.$axios
        .post(`api/blade-food/returnmeal/save`, {
          ...rules,
          mealExpenses: this.formsearch.foodturn, //伙食费
          returnFee: this.formsearch.refunded, //应退伙食费
          type: this.refunds, //标准
          calType: this.runway, //计算方式
          ...obj,
        })
        .then((res) => {
          this.$message({
            message: "保存成功",
            type: "success",
          });
          this.getRules();
        });
    },
    getRules() {
      this.$axios.get(`api/blade-food/returnmeal/detail`, {}).then((res) => {
        // console.log(res);
        this.scheduler = res.data.data;
        // console.log(this.scheduler);
        this.rulescan = this.scheduler.id; //ID
        this.formsearch.foodturn = this.scheduler.mealExpenses;
        this.formsearch.refunded = this.scheduler.returnFee;
        this.refunds = this.scheduler.type + "";
        this.runway = this.scheduler.calType + "";
        this.daysoticks = this.scheduler.param1;
        this.rightcost = this.scheduler.param2;
        this.semi = this.scheduler.param3;
        this.failed = this.scheduler.param4;
        this.natural = this.scheduler.param5;
        this.naturals = this.scheduler.param6;
        this.naturalhair = this.scheduler.param7;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.allrules {
  font-size: 14px;
  margin-left: 20px;
}
.amount {
  padding-left: 19px;
  font-size: 14px;
}
.choose {
  margin-top: 20px;
  /* padding-left: 19px; */
  font-size: 14px;
}
.refunded {
  margin-top: 20px;
  /* padding-left: 19px; */
}
.bridleway {
  margin-top: 20px;
}
.bridleway1 {
  margin-bottom: 20px;
}
.creations {
  margin-top: 30px;
}
.excsave1 {
  width: 100%;
  height: 50px;
  margin-top: 30px;
  text-align: center;
}
</style>
