<template>
  <div>
    <el-table
      :data="tableData"
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
      :span-method = "spanMethod"
      :default-expand-all = "false"
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      border
      @expand-change = "expandChange"
      ref="recipeTable">
      <el-table-column
        prop="name"
        label="食品/食材">
      </el-table-column>
      <el-table-column
        label="用量(g)">
        <template slot-scope="scope">
          <el-input-number v-model="scope.row.count" @change="handleChange" label="描述文字" :controls="false" size="small"></el-input-number>
          <el-button type="text">移除</el-button>
        </template>
      </el-table-column>
      <el-table-column
        label="图片">
        <template slot-scope="scope1">
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="true"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data(){
    return {
      imageUrl:"blob:https://element.eleme.cn/68c89b27-a7f5-4fdd-b0a2-9722653c9f55",
      tableData: [],
      spanMethodId:[],
      isexpansionTable:false,
    }
  },
  mounted(){
    console.log(this);
    console.log('mounted');
    // this.tableData= [{
    //     id: 1,
    //     date: '2016-05-02',
    //     name: '王小虎',
    //     address: '上海市普陀区金沙江路 1518 弄'
    //   }, {
    //     id: 2,
    //     date: '2016-05-04',
    //     name: '王小虎',
    //     address: '上海市普陀区金沙江路 1517 弄'
    //   }, {
    //     id: 3,
    //     date: '2016-05-01',
    //     name: '王小虎',
    //     address: '上海市普陀区金沙江路 1519 弄',
    //     children: [{
    //         id: 31,
    //         date: '2016-05-01',
    //         name: '王小虎',
    //         address: '上海市普陀区金沙江路 1520 弄'
    //       }, {
    //         id: 32,
    //         date: '2016-05-01',
    //         name: '王小虎',
    //         address: '上海市普陀区金沙江路 1521 弄'
    //     }]
    //   }, {
    //     id: 4,
    //     date: '2016-05-03',
    //     name: '王小虎',
    //     address: '上海市普陀区金沙江路 1516 弄'
    //   }]
  },
  watch: {
    tableData:{
      handler(newdata, olddata){
        let that = this
        that.spanMethodId = []
        newdata.forEach(element => {
          if(element.children){
            element.children.forEach(el =>{
              that.spanMethodId.push(el.id)
            })
          }
        });
      },
      immediate: true,
      deep:true,
    }
  },
  methods:{
    expandChange(row, doType){
      console.log(row);
      console.log(doType);
      this.isexpansionTable= doType;
      setTimeout(() => {
        this.$refs.recipeTable.doLayout()        
      }, 100);
    },
    handleAvatarSuccess(res, file){
      console.log('this-------------')
      console.log(this);
      this.imageUrl = URL.createObjectURL(file.raw);
      setTimeout(() => {
        this.$refs.recipeTable.doLayout()        
      }, 100);
    },
    spanMethod({row, column, rowIndex, columnIndex}){
      if(this.isexpansionTable){
        if(columnIndex ===2){
          if(this.spanMethodId.includes(row.id)){
            console.log('row.id')
            console.log(row.id)
            return {
                rowspan: 0,
                colspan: 0
              };
          }else if(row.children){
              return {
                rowspan: row.children.length +1,
                colspan: 1
              };
          }      
        }
      }
    },
  }

}
</script>

<style scoped>

  .avatar {
    width: 50px;
    height: 50px;
    display: block;
  }

</style>
