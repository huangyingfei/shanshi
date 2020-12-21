<template>
  <div>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="70%"
      :append-to-body = "true"
      :before-close="handleClose">

        <el-row>
          <el-col :span="24">
           <section id="printMe2" class="print-page" action="#"> 
            <el-table
              :data="recipeTableData"
              border
              class="recipeTableWeekData"  >
              <el-table-column
                prop="mealsType"
                label=""
                width="100px">
              </el-table-column>
              <el-table-column
                prop="week1"
                label="周一"
                min-width="100px">
              </el-table-column>
              <el-table-column
                prop="week2"
                label="周二"
                min-width="100px">
              </el-table-column>
              <el-table-column
                prop="week3"
                label="周三"
                min-width="100px">
              </el-table-column>
              <el-table-column
                prop="week4"
                label="周四"
                min-width="100px">
              </el-table-column>
              <el-table-column
                prop="week5"
                label="周五"
                min-width="100px">
              </el-table-column>

              <el-table-column
                prop="week6"
                label="周六"
                v-if="recipeDay =='6'||recipeDay =='7'"
                min-width="100px">
              </el-table-column>
              <el-table-column
                prop="week7"
                label="周日"
                v-if='recipeDay =="7"'
                min-width="100px">
              </el-table-column>
            </el-table>
       </section>        
          </el-col>
        </el-row>

      
      <div class="fixed">
        <el-row type="flex" justify="center">
          <el-col :span="4">
            <el-button @click="dialogVisible=false">取消</el-button>
          </el-col>
          <el-col :span="4">
            <el-button type="primary" @click="printObj">打印</el-button>
          </el-col>        
        </el-row> 
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {calData} from "@/api/recipeManager/auditRecipe.js"
import print from 'print-js'

export default {
  props:['datas','recipeDay'],
  data(){
    return{
      dialogVisible: false,
    //   printObj: {
    //     id: "printMe2",
    //     popTitle: '',
    //     extraHead: '<meta http-equiv="Content-Language"content="zh-cn"/>,<style> #printMe2 { height: auto !important;width: 100% !important } <style>' ,
    // }
    }
  },
  computed: {
    recipeTableData: function(){
      console.log(calData(this.datas))
      return calData(this.datas)
    }
  },
  mounted(){
    console.log(calData(this.datas))
  },
  methods:{
    openDialogVisible(){
      this.dialogVisible = true
    },
    printObj(){
    var properties =  [
      { field: 'mealsType', displayName: ''},
      { field: 'week1', displayName: '周一'},
      { field: 'week2', displayName: '周二'},
      { field: 'week3', displayName: '周三'},
      { field: 'week4', displayName: '周四'},
      { field: 'week5', displayName: '周五'},
    ]
    if(parseInt(this.recipeDay)>5){
      properties.push(
        { field: 'week6', displayName: '周六'},
        { field: 'week7', displayName: '周日'}
      )
    }
      printJS({printable: this.recipeTableData, properties: properties, type: 'json'})
      
    }
  }


}
</script>

<style>
.recipeTableWeekData .cell {
  white-space: pre-line!important;
}
.print-page{
  margin: 0 auto;
  margin-bottom: 14mm;
  border-bottom: 0;
}

/* @page {
  margin: 5px;
} */
/* @media print {
  .noprint {
    display: none;
  }
} */

</style>