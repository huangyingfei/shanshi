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
              suffix-icon="el-icon-date">
              <el-select
                style="width: 120px"
                v-model="WeekInfo.weekType"
                slot="prepend" value-key="请选择周期"
                placeholder="周长设置"
                @change="selectWeekType">
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
              @change="SelectWeek1"
              style="width: 230px;
                     opacity: 0;
                     position: absolute;
                     left: 120px;
                     top: -10px;"
              clear-icon=""
              ref="refweekSelect">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="餐谱名称">
            <el-input v-model="WeekInfo.Weekdetails" style="width: 300px">
            </el-input>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return{
      WeekInfo: {
        startAge:undefined,
        endAge:undefined,
        isRecommend:false,
        isUse:false,
        isPub:false,
        weekType: "5", //周期类型
        WeekTtitle: "", //周期标题
        Weekdetails: "", //周期明细
        weekValue: "",
        foodCatalog: [], //餐点类型
        crowd: "", //人群
        shareOrg: true,
        showFoodCatalog:""//餐点类型
      },
    }
  },
  mounted() {
    console.log('aaa')
  },
  methods:{
    selectWeekType(){
      let that=this;
      this.$confirm("重新选择周期会清空已有菜品", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(()=>{
        let weekType=that.WeekInfo.weekType;
        that.$refs.refweekSelect.showPicker();
        that.SelectWeek(this.startTime)
        that.$refs.refweekSelect.hidePicker();
      })
    },
    SelectWeek1(d){
      this.$confirm("重新选择周期会清空已有菜品", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(()=>{
        this.SelectWeek(d)
      })
    },
  }
}
</script>

<style scoped>

</style>