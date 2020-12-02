<template>
  <div>
    <el-dialog
      title="提示"
      :visible.sync="nutritionDialogVisible"
      :fullscreen = "true"
      :modal= "false"
      :before-close="handleClose">
      <div>
        <section class="print-page page-a4" ref="printSec" id="printMe">
        <span>带量食谱</span>
          <el-row>
            <el-col :span="24">
              <span>华园健康智慧幼儿园带量食谱</span>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="20">
            </el-col>
            <el-col :span="4">
              <span>2020-08-31~2020-09-04</span>
            </el-col>
          </el-row>
          <!-- 食谱表格开始 -->
          <el-row>
            <el-col :span="24">
              <el-table size = "small">
                <el-table-column label="星期一(Mon)" align="center">
                  <el-table-column
                    prop="mondayRecipe"
                    label="食谱"  min-width="50">
                  </el-table-column>
                  <el-table-column
                    prop="mondayRecipeWeight"
                    label="带量/人(克)" min-width="60">
                  </el-table-column>
                </el-table-column>
                <el-table-column label="星期二(Tue)" align="center">
                  <el-table-column
                    prop="tuesdayRecipe"
                    label="食谱" min-width="50">
                  </el-table-column>
                  <el-table-column
                    prop="tuesdayRecipeWeight"
                    label="带量/人(克)" min-width="60">
                  </el-table-column>
                </el-table-column>
                <el-table-column label="星期三(Wed)" align="center">
                  <el-table-column
                    prop="wednesdayRecipe"
                    label="食谱" min-width="50">
                  </el-table-column>
                  <el-table-column
                    prop="wednesdayRecipeWeight"
                    label="带量/人(克)" min-width="60">
                  </el-table-column>
                </el-table-column>
                <el-table-column label="星期四(Thu)" align="center">
                  <el-table-column
                    prop="thursdayRecipe"
                    label="食谱" min-width="50">
                  </el-table-column>
                  <el-table-column
                    prop="thursdayRecipeWeight"
                    label="带量/人(克)" min-width="60">
                  </el-table-column>
                </el-table-column>
                <el-table-column label="星期五(Fri)" align="center">
                  <el-table-column
                    prop="fridayRecipe"
                    label="食谱" min-width="50">
                  </el-table-column>
                  <el-table-column
                    prop="fridayRecipeWeight"
                    label="带量/人(克)" min-width="60">
                  </el-table-column>
                </el-table-column>
                <el-table-column label="星期六(Sat)" align="center">
                  <el-table-column
                    prop="saturdayRecipe"
                    label="食谱" min-width="50">
                  </el-table-column>
                  <el-table-column
                    prop="saturdayRecipeWeight"
                    label="带量/人(克)" min-width="60">
                  </el-table-column>
                </el-table-column>
                <el-table-column label="星期日(Sun)" align="center">
                  <el-table-column
                    prop="sundayRecipe"
                    label="食谱" min-width="50">
                  </el-table-column>
                  <el-table-column
                    prop="sundayRecipeWeight"
                    label="带量/人(克)" min-width="60">
                  </el-table-column>
                </el-table-column>

              </el-table>
            </el-col>
          </el-row>
          <!-- 食谱表格结束 -->      
          <el-row>
            <el-col :span="20">
              <span>一.平均每人进食量</span>
            </el-col>
            <el-col :span="4">
              <span>2020-08-31~2020-09-04</span>
            </el-col>
          </el-row>
          <!-- 食物类别表格开始 -->
          <el-row>
            <el-col :span="24">
              <el-table size = "small">
                <el-table-column label="食物类别" prop="sundayRecipe" min-width="43">
                </el-table-column>
                <el-table-column label="谷物及制品" prop="sundayRecipe" min-width="43">
                </el-table-column>
                <el-table-column label="薯类、淀粉及制品" prop="sundayRecipe" min-width="60">
                </el-table-column>
                <el-table-column label="小吃、甜饼、速食食品" prop="sundayRecipe" min-width="60">
                </el-table-column>
                <el-table-column label="薯类、淀粉及制品" prop="sundayRecipe" min-width="60">
                </el-table-column>
                <el-table-column label="">
                  <el-table-column
                    prop="sundayRecipeWeight"
                    label="深色蔬菜" min-width="43">
                  </el-table-column>
                </el-table-column>
                <el-table-column label="菌藻类" prop="sundayRecipe" min-width="43">
                </el-table-column>
                <el-table-column label="水果类及制品" prop="sundayRecipe" min-width="43">
                </el-table-column>
                <el-table-column label="坚果,种子类" prop="sundayRecipe" min-width="43">
                </el-table-column>
                <el-table-column label="乳类及制品" prop="sundayRecipe" min-width="43">
                </el-table-column>
                <el-table-column label="蛋类及制品" prop="sundayRecipe" min-width="43">
                </el-table-column>
                <el-table-column label="肉类及制品" prop="sundayRecipe" min-width="43">
                </el-table-column>

                <el-table-column label="">
                  <el-table-column 
                    label="肝类" 
                    prop="sundayRecipe" min-width="43">
                  </el-table-column>
                </el-table-column>
                <el-table-column label="鱼虾蟹贝类" prop="sundayRecipe" min-width="43">
                </el-table-column>
                <el-table-column label="糖,蜜饯类" prop="sundayRecipe" min-width="43">
                </el-table-column>
                <el-table-column label="油脂类" prop="sundayRecipe" min-width="43">
                </el-table-column>
                <el-table-column label="调味品类" prop="sundayRecipe" min-width="43">
                </el-table-column>

                <el-table-column label="" align="center">
                  <el-table-column
                    prop="sundayRecipe"
                    label="盐" min-width="43">
                  </el-table-column>
                </el-table-column>
              </el-table>
            </el-col>
          </el-row>
          <!-- 食物类别表格结束 -->
          <el-row>
            <el-col :span="24">
              <span>二.营养素摄入量：(要求日托儿童没人每日各种营养素摄入量达到DRIs的80%以上，全托儿童能量和蛋白质达到DRIs的90%以上，其他营养素达到80%以上)</span>
            </el-col>
          </el-row>
          <!-- 营养素摄入量表格开始 -->
          <el-row>
            <el-col :span="24">
              <el-table size = "small">
                <el-table-column label="平均每人每日" prop="sundayRecipe" min-width="42">
                </el-table-column>
                <el-table-column label="能量" align="center">>
                  <el-table-column
                    prop="sundayRecipeWeight"
                    label="(千卡)" min-width="40">
                  </el-table-column>
                  <el-table-column
                    prop="sundayRecipeWeight"
                    label="(千焦)" min-width="42">
                  </el-table-column>              
                </el-table-column>
                <el-table-column label="蛋白质(克)" prop="sundayRecipe" min-width="42">
                </el-table-column>
                <el-table-column label="脂肪(克)" prop="sundayRecipe" min-width="42">
                </el-table-column>
                <el-table-column label="碳水化合物(克)" prop="sundayRecipe" min-width="50">
                </el-table-column>
                <el-table-column label="膳食纤维(克)" prop="sundayRecipe" min-width="43">
                </el-table-column>
                <el-table-column label="维生素A(微克)" prop="sundayRecipe" min-width="43">
                </el-table-column>
                <el-table-column label="视黄醇当量(微克)" prop="sundayRecipe" min-width="50"> 
                </el-table-column>
                <el-table-column label="维生素B1(微克)" prop="sundayRecipe" min-width="50">
                </el-table-column>
                <el-table-column label="维生素B2(微克)" prop="sundayRecipe" min-width="50">
                </el-table-column>
                <el-table-column label="尼克酸(毫克)" prop="sundayRecipe" min-width="43">
                </el-table-column>
                <el-table-column label="维生素C(毫克)" prop="sundayRecipe" min-width="50">
                </el-table-column>
                <el-table-column label="维生素E(毫克)" prop="sundayRecipe" min-width="50">
                </el-table-column>
                <el-table-column label="胡萝卜素(毫克)" prop="sundayRecipe" min-width="50">
                </el-table-column>
                <el-table-column label="钙(毫克)" prop="sundayRecipe" min-width="40">
                </el-table-column>
                <el-table-column label="磷(毫克)" prop="sundayRecipe" min-width="40">
                </el-table-column>
                <el-table-column label="钾(毫克)" prop="sundayRecipe" min-width="40">
                </el-table-column>
                <el-table-column label="锌(毫克)" prop="sundayRecipe" min-width="40">
                </el-table-column>
                <el-table-column label="镁(毫克)" prop="sundayRecipe" min-width="40">
                </el-table-column>
                <el-table-column label="铁(毫克)" prop="sundayRecipe" min-width="40">
                </el-table-column>
                <el-table-column label="钠(毫克)" prop="sundayRecipe" min-width="40">
                </el-table-column>
                <el-table-column label="硒(毫克)" prop="sundayRecipe" min-width="40">
                </el-table-column>
                <el-table-column label="铜(毫克)" prop="sundayRecipe" min-width="40">
                </el-table-column>
                <el-table-column label="锰(毫克)" prop="sundayRecipe" min-width="40">
                </el-table-column>
                <el-table-column label="碘(毫克)" prop="sundayRecipe" min-width="40">
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
              <el-table size = "small">
                <el-table-column label="">
                  <el-table-column
                    prop="sundayRecipeWeight"
                    label="" min-width="50">
                  </el-table-column>
                  <el-table-column
                    prop="sundayRecipeWeight"
                    label="" min-width="50">
                  </el-table-column>
                </el-table-column>
                <el-table-column label="脂肪" align="center">
                  <el-table-column
                    prop="sundayRecipeWeight"
                    label="要求" min-width="50" align="center">
                  </el-table-column>
                  <el-table-column
                    prop="sundayRecipeWeight"
                    label="现状" min-width="50" align="center">
                  </el-table-column>
                </el-table-column>

                <el-table-column label="蛋白质" align="center">
                  <el-table-column 
                    label="要求" 
                    prop="sundayRecipe" min-width="50" align="center">
                  </el-table-column>
                  <el-table-column 
                    label="现状" 
                    prop="sundayRecipe" min-width="50" align="center">
                  </el-table-column>
                </el-table-column>


              </el-table>
            </el-col>
            <!-- 能量来源分布表格结束 -->
            <!-- 蛋白质来源分布表格开始 -->
            <el-col :span="12">
              <el-table size = "small">
                <el-table-column label="" prop="sundayRecipe" min-width="43" align="center">
                </el-table-column>
                <el-table-column label="优质蛋白质" align="center">
                  <el-table-column
                    prop="sundayRecipeWeight"
                    label="要求" min-width="50" align="center">
                  </el-table-column>
                  <el-table-column
                    prop="sundayRecipeWeight"
                    label="动物性食物" min-width="60" align="center">
                  </el-table-column>
                  <el-table-column
                    prop="sundayRecipeWeight"
                    label="豆类" min-width="50" align="center">
                  </el-table-column>                  
                </el-table-column>

              </el-table>
            </el-col>
            <!-- 蛋白质来源分布表格结束 -->
          </el-row>

          <el-row>
            <el-col :span="24">
              <span>五.配餐能量结构表:</span>
            </el-col>
          </el-row>

        </section>
      </div>
      <div>
        <el-row type="flex" justify="center">
          <el-col :span="4">
            <el-button>取消</el-button>
          </el-col>
          <el-col :span="4">
            <el-button>导出Excel</el-button>
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
export default {
  data() {
    return {
      nutritionDialogVisible: false,
      recipeWidth:"20",
      printObj: {
        id: "printMe",
        popTitle: 'good print',
      }
    };
  },
  created(){
    let boxCollection= document.getElementsByClassName("print-page");
    console.log('created')
    console.log(boxCollection)
  },
  beforeMount(){
    let boxCollection= document.getElementsByClassName("print-page");
    console.log('beforeMount')
    console.log(boxCollection)
  },
  mounted(){
    let boxCollection= document.getElementById("printMe");
    console.log('mounted')
    console.log(boxCollection)
  },

  methods:{
    openNutritionDialog(){
      console.log(this);
      let getMenuText = this.$refs;
      console.log(getMenuText)
      this.nutritionDialogVisible = true
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
/* .page-a4{
  width: 300mm;
  position: relative
} */

.print-page{
  width: 310mm;
  margin: 0 auto;
  margin-bottom: 14mm;
  border: 1px solid #bbb;
  border-bottom: 0;
}

</style>
