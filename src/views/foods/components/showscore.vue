<template>
  <div class="showscore">
    <h3>周食谱营养分析报告（平均每人每日量）</h3>
    <span>幼儿园名称：华园健康智慧幼儿园</span><br/>
    <span>日期：{{startTime}}-{{endTime}}  </span>    <span> 总评分（优秀分数90分）：{{score}}</span>
    <hr></hr>
    <h4>  一、平均每人进食量  《中国学龄前儿童平衡膳食宝塔》</h4>
    <el-table
      :data="intake.data"
      style="width: 100%">
      <el-table-column
        prop="name"
        label="种属"
        width="180">
      </el-table-column>
      <el-table-column
        prop="range"
        :label="intake.mealSelect"
        width="180">
      </el-table-column>
      <el-table-column
        prop="jl"
        :label="intake.avg"
        width="180">
      </el-table-column>
      <el-table-column
        prop="grade"
        label="评价">
      </el-table-column>
      <el-table-column
        prop="point"
        label="扣分">
      </el-table-column>
    </el-table>
    <h4>  二、营养素摄入量</h4>
    <el-table
      :data="nutrition"
      style="width: 100%">
      <el-table-column
        prop="name"
        label="营养素"
        width="100">
      </el-table-column>
      <el-table-column
        prop="dris2"
        label="DRIs"
        width="100">
      </el-table-column>
      <el-table-column
        prop="realIntake"
        label="实际摄入">
      </el-table-column>
      <el-table-column
        prop="reqPropor"
        label="要求比例(%)">
      </el-table-column>
      <el-table-column
        prop="realPropor"
        label="实际比例(%)">
      </el-table-column>
      <el-table-column
        prop="grade"
        label="评价">
      </el-table-column>
      <el-table-column
        prop="point"
        label="扣分">
      </el-table-column>
    </el-table>
    <h4>  三、能量来源分布（2013年（中国营养学会））</h4>
    <el-table
      :data="power"
      style="width: 100%">
      <el-table-column
        prop="name"
        label="能量占比"
        width="200">
      </el-table-column>
      <el-table-column
        prop="req"
        label="要求（%）"
        width="200">
      </el-table-column>
      <el-table-column
        prop="real"
        label="实际(%)">
      </el-table-column>
      <el-table-column
        prop="grade"
        label="评价">
      </el-table-column>
      <el-table-column
        prop="point"
        label="扣分">
      </el-table-column>
    </el-table>
    <h4>  四、蛋白质来源分布</h4>
    <el-table
      :data="protein"
      style="width: 100%">
      <el-table-column
        prop="typeCode"
        label="优质蛋白质"
        width="180">
      </el-table-column>
      <el-table-column
        prop="req"
        label="要求"
        width="90">
      </el-table-column>
      <el-table-column
        prop="real"
        label="实际">
      </el-table-column>
      <el-table-column
        prop="realSum"
        label="实际和">
      </el-table-column>
      <el-table-column
        prop="grade"
        label="评价">
      </el-table-column>
      <el-table-column
        prop="point"
        label="扣分">
      </el-table-column>
    </el-table>
    <h4>  五、配餐能量结构</h4>
    <el-table
      :data="meal"
      style="width: 100%">
      <el-table-column
        prop="mealTypeName"
        label="餐别"
        width="180">
      </el-table-column>
      <el-table-column
        prop="min"
        label="要求（%）"
        width="120">
      </el-table-column>
      <el-table-column
        prop="real"
        width="200"
        label="实际">
      </el-table-column>
      <el-table-column
        prop="grade"
        label="评价">
      </el-table-column>
      <el-table-column
        prop="point"
        label="扣分">
      </el-table-column>
    </el-table>
    <span class="fontColor">注：此评分分析仅供参考</span>
  </div>
</template>
<script>
  export  default {
    props:{
      startTime:'',
      endTime:'',
      scoreResult:[],
      score:'',
      intake:{},
      nutrition:[],
      power:[],
      protein:[],
      meal:[]

    },
    data(){
      return {

      }
    }
  }
</script>
<style>
  .showscore h3{
    text-align: center;
  }
  .showscore  span {
    margin-right: 15px;
  }
  .showscore {
   padding-left: 10px;
  }
  .fontColor{
    color: red;
    font-size: 12px;
  }
</style>
