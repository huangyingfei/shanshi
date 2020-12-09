<template>
  <div>
    <el-dialog
      title=""
      :visible.sync="nutritionDialogVisible"
      :fullscreen = "true"
      :modal= "false"
      :before-close="handleClose"> 

      <div>
        <section class="print-page" ref="printSec" id="printMe">
          <el-row>
            <el-col :span="24" style="text-align:center;font-weight:bold;font-size: 16px">
              <span>华园健康智慧幼儿园带量食谱</span>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="24" style="text-align:right">
              <span>{{dateRange}}</span>
            </el-col>
          </el-row>
          <!-- 食谱表格开始 -->
          <el-row>
            <el-col :span="24">
              <el-table size = "small" :data="dtos" :span-method="dtosSpanMethod" class="dtosTable">
                <el-table-column label="" prop="mealType" align="center" min-width="50">
                </el-table-column>
                <el-table-column label="星期一(Mon)" align="center">
                  <el-table-column
                    label="食谱"  min-width="50">
                    <template slot-scope="scope">
                      <el-row v-for="item in scope.row.monRecipeName" :key="item">
                        <el-col :span="24">{{item}}&nbsp;</el-col>
                      </el-row>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="带量/人(克)" min-width="60" >
                    <template slot-scope="scope">
                      <el-row v-for="(item, index) in scope.row.monFoodName" :key="item">
                        <div v-if="scope.row.mealType[0] ==='日人均总带量'">
                          <el-col :span="24">{{scope.row.monValue[index]}}&nbsp;</el-col>
                        </div>
                        <div v-else>
                          <el-col :span="12" style="text-align:left;">{{item}}&nbsp;</el-col>
                          <el-col :span="12" style="text-align:right;">&nbsp;{{scope.row.monValue[index]}}</el-col>
                        </div>
                      </el-row>
                    </template>
                  </el-table-column>
                </el-table-column>
                <el-table-column label="星期二(Tue)" align="center">
                  <el-table-column
                    prop="tuesdayRecipe"
                    label="食谱" min-width="50">
                    <template slot-scope="scope">
                      <el-row v-for="item in scope.row.tueRecipeName" :key="item">
                        <el-col :span="24">{{item}}&nbsp;</el-col>
                      </el-row>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="带量/人(克)" min-width="60">
                    <template slot-scope="scope">
                      <el-row v-for="(item, index) in scope.row.tueFoodName" :key="item">
                        <div v-if="scope.row.mealType[0] ==='日人均总带量'">
                          <el-col :span="24">{{scope.row.tueValue[index]}}&nbsp;</el-col>
                        </div>
                        <div v-else>
                          <el-col :span="12" style="text-align:left;">{{item}}&nbsp;</el-col>
                          <el-col :span="12" style="text-align:right;">&nbsp;{{scope.row.tueValue[index]}}</el-col>
                        </div>
                      </el-row>
                    </template>
                  </el-table-column>
                </el-table-column>
                <el-table-column label="星期三(Wed)" align="center">
                  <el-table-column
                    prop="wednesdayRecipe"
                    label="食谱" min-width="50">
                    <template slot-scope="scope">
                      <el-row v-for="item in scope.row.wedRecipeName" :key="item">
                        <el-col :span="24">{{item}}&nbsp;</el-col>
                      </el-row>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="带量/人(克)" min-width="60">
                    <template slot-scope="scope">
                      <el-row v-for="(item, index) in scope.row.wedFoodName" :key="item">
                        <div v-if="scope.row.mealType[0] ==='日人均总带量'">
                          <el-col :span="12">{{scope.row.wedValue[index]}}</el-col>
                        </div>
                        <div v-else>
                          <el-col :span="12" style="text-align:left;">{{item}}</el-col>
                          <el-col :span="12" style="text-align:right;">{{scope.row.wedValue[index]}}</el-col>
                        </div>
                      </el-row>
                    </template>
                  </el-table-column>
                </el-table-column>
                <el-table-column label="星期四(Thu)" align="center">
                  <el-table-column
                    prop="thursdayRecipe"
                    label="食谱" min-width="50">
                    <template slot-scope="scope">
                      <el-row v-for="item in scope.row.thuRecipeName" :key="item">
                        <el-col :span="24">{{item}}&nbsp;</el-col>
                      </el-row>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="带量/人(克)" min-width="60">
                    <template slot-scope="scope">
                      <el-row v-for="(item, index) in scope.row.thuFoodName" :key="item">
                        <div v-if="scope.row.mealType[0] ==='日人均总带量'">
                          <el-col :span="24">{{scope.row.thuValue[index]}}&nbsp;</el-col>
                        </div>
                        <div v-else>
                          <el-col :span="12" style="text-align:left;">{{item}}&nbsp;</el-col>
                          <el-col :span="12" style="text-align:right;">&nbsp;{{scope.row.thuValue[index]}}</el-col>
                        </div>
                      </el-row>
                    </template>
                  </el-table-column>
                </el-table-column>
                <el-table-column label="星期五(Fri)" align="center">
                  <el-table-column
                    prop="fridayRecipe"
                    label="食谱" min-width="50">
                    <template slot-scope="scope">
                      <el-row v-for="item in scope.row.friRecipeName" :key="item">
                        <el-col :span="24">{{item}}&nbsp;</el-col>
                      </el-row>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="带量/人(克)" min-width="60">
                    <template slot-scope="scope">
                      <el-row v-for="(item, index) in scope.row.friFoodName" :key="item">
                        <div v-if="scope.row.mealType[0] ==='日人均总带量'">
                          <el-col :span="12">{{scope.row.friValue[index]}}</el-col>
                        </div>
                        <div v-else>
                          <el-col :span="12" style="text-align:left;">{{item}}</el-col>
                          <el-col :span="12" style="text-align:right;">{{scope.row.friValue[index]}}</el-col>
                        </div>
                      </el-row>
                    </template>
                  </el-table-column>
                </el-table-column>
                <el-table-column label="星期六(Sat)" align="center" v-if="satShow">
                  <el-table-column
                    prop="saturdayRecipe"
                    label="食谱" min-width="50">
                    <template slot-scope="scope">
                      <el-row v-for="item in scope.row.satRecipeName" :key="item">
                        <el-col :span="24">{{item}}&nbsp;</el-col>
                      </el-row>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="带量/人(克)" min-width="60">
                    <template slot-scope="scope">
                      <el-row v-for="(item, index) in scope.row.satFoodName" :key="item">
                        <div v-if="scope.row.mealType[0] ==='日人均总带量'">
                          <el-col :span="12">{{scope.row.satValue[index]}}</el-col>
                        </div>
                        <div v-else>
                          <el-col :span="12" style="text-align:left;">{{item}}</el-col>
                          <el-col :span="12" style="text-align:right;">{{scope.row.satValue[index]}}</el-col>
                        </div>
                      </el-row>
                    </template>
                  </el-table-column>
                </el-table-column>
                <el-table-column label="星期日(Sun)" align="center" v-if="sunShow">
                  <el-table-column
                    prop="sundayRecipe"
                    label="食谱" min-width="50">
                    <template slot-scope="scope">
                      <el-row v-for="item in scope.row.sunRecipeName" :key="item">
                        <el-col :span="24">{{item}}&nbsp;</el-col>
                      </el-row>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="带量/人(克)" min-width="60">
                    <template slot-scope="scope">
                      <el-row v-for="(item, index) in scope.row.sunFoodName" :key="item">
                        <div v-if="scope.row.mealType[0] ==='日人均总带量'">
                          <el-col :span="12">{{scope.row.sunValue[index]}}</el-col>
                        </div>
                        <div v-else>
                          <el-col :span="12" style="text-align:left;">{{item}}</el-col>
                          <el-col :span="12" style="text-align:right;">{{scope.row.sunValue[index]}}</el-col>
                        </div>
                      </el-row>
                    </template>
                  </el-table-column>
                </el-table-column>

              </el-table>
            </el-col>
          </el-row>
          <!-- 食谱表格结束 -->      
          <el-row>
            <el-col :span="12">
              <span>一.平均每人进食量</span>
            </el-col>
            <el-col :span="12" style="text-align:right">
              <span>{{dateRange}}</span>
            </el-col>
          </el-row>
          <!-- 平均每人进食量表格开始 -->
          <el-row>
            <el-col :span="24">
              <el-table size = "small" :data="foodAvgPeopleExcelDto" border :header-cell-style="headerRowStyle"> 
                <el-table-column label="食物类别" prop="foodName" min-width="43">
                </el-table-column>
                <el-table-column label="谷物及制品" prop="gl" min-width="43">
                </el-table-column>
                <el-table-column label="薯类、淀粉及制品" prop="sl" min-width="60">
                </el-table-column>
                <el-table-column label="蔬菜类及制品" prop="sc" min-width="60">
                </el-table-column>
                <el-table-column label="水果类及制品" prop="sg" min-width="43">
                </el-table-column>
                <el-table-column label="乳类及制品" prop="rzp" min-width="43">
                </el-table-column>
                <el-table-column label="干豆类及制品" prop="dd" min-width="60">
                </el-table-column>
                <el-table-column label="畜禽肉类及制品" prop="xql" min-width="43">
                </el-table-column>
                <el-table-column label="蛋类及制品" prop="dl" min-width="43">
                </el-table-column>
                <el-table-column label="鱼虾蟹贝类" prop="scp" min-width="43">
                </el-table-column>
                <el-table-column label="坚果,种子类" prop="jg" min-width="43">
                </el-table-column>
                <el-table-column label="油脂类" prop="syy" min-width="43">
                </el-table-column>
                <el-table-column label="菌藻类" prop="jzl" min-width="43">
                </el-table-column>
                <el-table-column label="婴幼儿食品" prop="yye" min-width="60">
                </el-table-column>

                <el-table-column label="小吃、甜饼" prop="xcl" min-width="60">
                </el-table-column>
                <el-table-column label="速食食品" prop="yll" min-width="60">
                </el-table-column>
                <el-table-column label="含酒精饮料" prop="hjl" min-width="60">
                </el-table-column>

                <el-table-column label="糖、蜜饯类" prop="mjl" min-width="43">
                </el-table-column>

                <el-table-column label="调味品类" prop="twp" min-width="43">
                </el-table-column>

              </el-table>
            </el-col>
          </el-row>
          <!-- 平均每人进食量表格结束 -->
          <el-row>
            <el-col :span="24">
              <span>二.营养素摄入量：(要求日托儿童没人每日各种营养素摄入量达到DRIs的80%以上，全托儿童能量和蛋白质达到DRIs的90%以上，其他营养素达到80%以上)</span>
            </el-col>
          </el-row>
          <!-- 营养素摄入量表格开始 -->
          <el-row>
            <el-col :span="24">
              <el-table size = "small" :data="foodNutritionExcleDtoList" border :header-cell-style="headerRowStyle">
                <el-table-column label="" prop="target" min-width="42">
                </el-table-column>
                <el-table-column label="能量(千卡)" align="center" min-width="40" prop="cal">            
                </el-table-column>
                <el-table-column label="蛋白质(克)" prop="pro" min-width="42">
                </el-table-column>
                <el-table-column label="脂肪(克)" prop="fat" min-width="42">
                </el-table-column>
                <el-table-column label="碳水化合物(克)" prop="ch" min-width="50">
                </el-table-column>
                <el-table-column label="膳食纤维(克)" prop="df" min-width="43">
                </el-table-column>
                <el-table-column label="维生素A(微克)" prop="va" min-width="43">
                </el-table-column>
                <el-table-column label="视黄醇当量(微克)" prop="va2" min-width="50"> 
                </el-table-column>
                <el-table-column label="维生素B1(微克)" prop="vb1" min-width="50">
                </el-table-column>
                <el-table-column label="维生素B2(微克)" prop="vb2" min-width="50">
                </el-table-column>
                <el-table-column label="尼克酸(毫克)" prop="vb3" min-width="43">
                </el-table-column>
                <el-table-column label="维生素C(毫克)" prop="vc" min-width="50">
                </el-table-column>
                <el-table-column label="维生素E(毫克)" prop="ve" min-width="50">
                </el-table-column>
                <el-table-column label="胡萝卜素(毫克)" prop="caro" min-width="50">
                </el-table-column>
                <el-table-column label="钙(毫克)" prop="ca" min-width="40">
                </el-table-column>
                <el-table-column label="磷(毫克)" prop="p" min-width="40">
                </el-table-column>
                <el-table-column label="钾(毫克)" prop="k" min-width="40">
                </el-table-column>
                <el-table-column label="锌(毫克)" prop="zn" min-width="40">
                </el-table-column>
                <el-table-column label="镁(毫克)" prop="mg" min-width="40">
                </el-table-column>
                <el-table-column label="铁(毫克)" prop="fe" min-width="40">
                </el-table-column>
                <el-table-column label="钠(毫克)" prop="na2" min-width="40">
                </el-table-column>
                <el-table-column label="硒(毫克)" prop="se" min-width="40">
                </el-table-column>
                <el-table-column label="铜(毫克)" prop="cu" min-width="40">
                </el-table-column>
                <el-table-column label="锰(毫克)" prop="mn" min-width="40">
                </el-table-column>
                <el-table-column label="碘(毫克)" prop="i" min-width="40">
                </el-table-column>
              </el-table>
            </el-col>
          </el-row>
          <!-- 营养素摄入量表格结束 -->
          <el-row :gutter="40">
            <el-col :span="12">
              <span>三.能量来源分布:</span>
            </el-col>
            <el-col :span="12">
              <span>四.蛋白质来源分布:</span>
            </el-col>
          </el-row>

          <el-row :gutter="40">
            <!-- 能量来源分布表格开始 -->
            <el-col :span="12">
              <el-table size = "small" :data="powerSourceExcelDtoList">
                <el-table-column label="" prop="target">
                </el-table-column>
                <el-table-column label="脂肪" align="center">
                  <el-table-column
                    prop="fatAsk"
                    label="要求" min-width="50" align="center">
                  </el-table-column>
                  <el-table-column
                    prop="fatReal"
                    label="现状" min-width="50" align="center">
                  </el-table-column>
                </el-table-column>

                <el-table-column label="蛋白质" align="center">
                  <el-table-column 
                    label="要求" 
                    prop="proAsk" min-width="50" align="center">
                  </el-table-column>
                  <el-table-column 
                    label="现状" 
                    prop="proReal" min-width="50" align="center">
                  </el-table-column>
                </el-table-column>


              </el-table>
            </el-col>
            <!-- 能量来源分布表格结束 -->
            <!-- 蛋白质来源分布表格开始 -->
            <el-col :span="12">
              <el-table size = "small" :data="proteinrSourceExcelDtoList">
                <el-table-column label="" prop="target" min-width="43" align="center">
                </el-table-column>
                <el-table-column label="优质蛋白质" align="center">
                  <el-table-column
                    prop="ask"
                    label="要求" min-width="50" align="center">
                  </el-table-column>
                  <el-table-column
                    prop="rlReal"
                    label="动物性食物" min-width="60" align="center">
                  </el-table-column>
                  <el-table-column
                    prop="dlReal"
                    label="豆类" min-width="50" align="center">
                  </el-table-column>                  
                </el-table-column>

              </el-table>
            </el-col>
            <!-- 蛋白质来源分布表格结束 -->
          </el-row>

          <el-row>
            <el-col :span="24">
              <span>五.配餐能量结构表</span>
            </el-col>
          </el-row>
          <!-- 配餐能量结构表格开始 -->
          <el-row>
            <el-col :span="24">
              <el-table size = "small" border="ture" :header-cell-style="cateringEnergyHead" :data="calSourceExcelDTOList">
                <el-table-column label="" align="center" prop="target">
                </el-table-column>
                <el-table-column label="标准(%)" align="center" prop="bz">
                </el-table-column>
                <el-table-column label="平均(%)" align="center" prop="avg">
                </el-table-column>
                <el-table-column label="单位" align="center" prop="unit">
                </el-table-column>
                <el-table-column label="星期一(Mon)" align="center">
                  <el-table-column
                    prop="mon"
                    label="能量"  min-width="50">
                  </el-table-column>
                  <el-table-column
                    prop="monProp"
                    label="占比%" min-width="60">
                  </el-table-column>
                </el-table-column>
                <el-table-column label="星期二(Tue)" align="center">
                  <el-table-column
                    prop="tue"
                    label="能量" min-width="50">
                  </el-table-column>
                  <el-table-column
                    prop="tueProp"
                    label="占比%" min-width="60">
                  </el-table-column>
                </el-table-column>
                <el-table-column label="星期三(Wed)" align="center">
                  <el-table-column
                    prop="wed"
                    label="能量" min-width="50">
                  </el-table-column>
                  <el-table-column
                    prop="wedProp"
                    label="占比%" min-width="60">
                  </el-table-column>
                </el-table-column>
                <el-table-column label="星期四(Thu)" align="center">
                  <el-table-column
                    prop="thu"
                    label="能量" min-width="50">
                  </el-table-column>
                  <el-table-column
                    prop="thuProp"
                    label="占比%" min-width="60">
                  </el-table-column>
                </el-table-column>
                <el-table-column label="星期五(Fri)" align="center">
                  <el-table-column
                    prop="fri"
                    label="能量" min-width="50">
                  </el-table-column>
                  <el-table-column
                    prop="friProp"
                    label="占比%" min-width="60">
                  </el-table-column>
                </el-table-column>
                <el-table-column label="星期六(Sat)" align="center" v-if="satShow">
                  <el-table-column
                    prop="sat"
                    label="能量" min-width="50">
                  </el-table-column>
                  <el-table-column
                    prop="satProp"
                    label="占比%" min-width="60">
                  </el-table-column>
                </el-table-column>
                <el-table-column label="星期日(Sun)" align="center" v-if="sunShow">
                  <el-table-column
                    prop="sun"
                    label="能量" min-width="50">
                  </el-table-column>
                  <el-table-column
                    prop="sunProp"
                    label="占比%" min-width="60">
                  </el-table-column>
                </el-table-column>
              </el-table>
            </el-col>
          </el-row>
          <!-- 食谱表格结束 -->      
        </section>
      </div>
      <div class="fixed">
        <el-row type="flex" justify="center">
          <el-col :span="4">
            <el-button @click="nutritionDialogVisible=false">取消</el-button>
          </el-col>
          <el-col :span="4">
            <el-button @click="exportRrecipeInfo">导出Excel</el-button>
          </el-col>
          <el-col :span="4">
            <el-button type="primary" v-print="printObj">打印</el-button>
          </el-col>        
        </el-row> 
      </div>
    </el-dialog>
  </div>
</template>


<script>
import axios from '@/router/axios';
import { formateDate} from "@/api/tool/date";

export default {
  props:["WeekInfo"],
  data() {
    return {
      nutritionDialogVisible: false,
      recipeWidth:"20",
      calSourceExcelDTOList:[],//配餐能量结构表格
      foodNutritionExcleDtoList:[],//营养素摄入量
      powerSourceExcelDtoList:[],//能量来源分布
      proteinrSourceExcelDtoList:[],//蛋白质来源分布
      foodAvgPeopleExcelDto:[],//平均每人进食量表格
      dtos:[],//食谱表格
      foods:{},
      printObj: {
        id: "printMe",
        popTitle: 'good print',
      }
    };
  },
  computed: {
    satShow: function () {
      return  this.WeekInfo.weekType ==='6'||this.WeekInfo.weekType ==='7'
    },
    sunShow: function () {
      return  this.WeekInfo.weekType ==='7'      
    },
    dateRange: function () {
      
      let dayNum = parseInt(this.WeekInfo.weekType, 10);
      var startDate = formateDate(new Date(this.WeekInfo.weekValue), "yyyy-MM-dd")
      var endDateMillisec = new Date(this.WeekInfo.weekValue).getTime()+1000*60*60*24*dayNum;
      var endDate = new Date(endDateMillisec)
      endDate = formateDate(endDate, "yyyy-MM-dd");
      return startDate + '~' + endDate
    }
  },
  methods:{
    dtosSpanMethod({ row, column, rowIndex, columnIndex }){

      if(rowIndex == 0 && columnIndex == 1){
        console.log(row);
        console.log(column);
      }
    },
    //导出带量食谱报表
    exportRrecipeInfo(){
      axios({
        method: 'post',
        url: '/api/blade-food/recipe/export-recipeInfo',
        data:this.foods,
        responseType: 'blob',
      }).then(res => {
        console.log('res')
        console.log(res)
        const {data, headers} = res
        const fileName = headers['content-disposition'].replace(/\w+;filename=(.*)/, '$1')
        // 此处当返回json文件时需要先对data进行JSON.stringify处理，其他类型文件不用做处理
        //const blob = new Blob([JSON.stringify(data)], ...)
        const blob = new Blob([data], {type: 'application/octet-stream'})
        let dom = document.createElement('a')
        let url = window.URL.createObjectURL(blob)
        dom.href = url
        dom.setAttribute('download', decodeURI(fileName))
        dom.style.display = 'none'
        document.body.appendChild(dom)
        dom.click()
        dom.parentNode.removeChild(dom)
        window.URL.revokeObjectURL(url)
      });
    },
    headerRowStyle({row,colunm, rowIndex,columnIndex}){
      return{
        background: '#f5f7fa'
      }
    },
    //配餐能量结构表表头样式合并
    // cateringEnergyHead({row,colunm, rowIndex,columnIndex}){
    //   if(rowIndex===1 ){
    //     return {display: 'none'}
    //   }
    // },
    getNutritionDataList(data){
      console.log(data)
      axios({
        method: 'post',
        url: '/api/blade-food/recipe/getRecipeQuantity',
        data: data
      }).then( res => {
        // console.log('res')
        // console.log(res)
        this.foodAvgPeopleExcelDto = new Array(res.data.data.foodAvgPeopleExcelDto);//平均每人进食量表格
        this.foodNutritionExcleDtoList = res.data.data.foodNutritionExcleDtoList;//营养素摄入量
        this.powerSourceExcelDtoList = res.data.data.powerSourceExcelDtoList;//能量来源分布
        this.proteinrSourceExcelDtoList = res.data.data.proteinrSourceExcelDtoList;//蛋白质来源分布
        this.calSourceExcelDTOList = res.data.data.calSourceExcelDTOList;//配餐能量结构表格
        var dtos = res.data.data.dtos;//食谱表格
        let mealTypeArray = []
        let mealTypeDataArray = []
        var FoodWeekArray = ['mealType','monRecipeName','satRecipeName','wedRecipeName','thuRecipeName','friRecipeName','tueRecipeName','sunRecipeName']
        dtos.forEach(element => {
          let indexMealType = mealTypeArray.indexOf(element.mealType);//在餐点类型数组中是否存在当前值
          if(indexMealType === -1){//不存在
            mealTypeArray.push(element.mealType);//更新数据至餐点类型数组尾部
            let mealTypeDataObj = {}
            for (let key in element) {//当前餐点行数据初始化赋值
              var arr =[]
              if (element.hasOwnProperty(key)) {
                arr.push(element[key] == null?'':element[key]);
                mealTypeDataObj[key] = arr
              }
            }
            mealTypeDataArray.push(mealTypeDataObj);
          }else{
            for (let k in element) {
              if (element.hasOwnProperty(k)) {
                var val = element[k] == null?' ':element[k];
                if(FoodWeekArray.indexOf(k) === -1){//是否是食谱列的值
                  mealTypeDataArray[indexMealType][k].push(val)//非食谱列的值直接更新

                }else if(FoodWeekArray.indexOf(k) === 0){//餐点类型列不做处理

                }else{//当前为食谱类型列
                  if(mealTypeDataArray[indexMealType][k].indexOf(val) === -1){
                    mealTypeDataArray[indexMealType][k].push(val)//不存在当前菜品直接更新
                  }else{
                    mealTypeDataArray[indexMealType][k].push(' ');//已存在往数组存入‘’
                  };
                  
                } 
              }
            }
          }
        });
        this.dtos = mealTypeDataArray;//食谱表格
      });
    },
    openNutritionDialog(foods){
      this.nutritionDialogVisible = true
      this.foods = foods;
      this.getNutritionDataList(foods);
    },
    doPrintHtml(){    
      let newstr = document.getElementById("printMe").innerHTML;
      let oldstr = document.body.innerHTML;
      document.body.innerHTML = newstr;
      window.print();
      document.body.innerHTML = oldstr;
    }
  }
};
</script>

<style scoped>
.page-a4{
  height: 100%;
  position: relative
}

.print-page{
  width: 350mm;
  margin: 0 auto;
  margin-bottom: 14mm;
  border-bottom: 0;
}
.fixed{ 
  position:fixed; 
  left:0px;
  padding-top: 10px; 
  bottom:0px;
  width:100%;  
  background-color:rgb(255, 255, 255); 
  z-index:9999;
  }
.dtosTable .el-col {
  margin-bottom: 0px;
  text-overflow:ellipsis;
  overflow: hidden;
  white-space:nowrap;   
}

</style>
