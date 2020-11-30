<template>
  <basic-container>
    <avue-crud :option="option"
               :table-loading="loading"
               :data="data"
               :page.sync="page"
               :permission="permissionList"
               :before-open="beforeOpen"
               v-model="form"
               ref="crud"
               @row-update="rowUpdate"
               @row-save="rowSave"
               @row-del="rowDel"
               @search-change="searchChange"
               @search-reset="searchReset"
               @selection-change="selectionChange"
               @current-change="currentChange"
               @size-change="sizeChange"
               @refresh-change="refreshChange"
               @on-load="onLoad">
      <template slot="menuLeft">
        <el-button type="danger"
                   size="small"
                   icon="el-icon-delete"
                   plain
                   v-if="permission.post_delete"
                   @click="handleDelete">删 除
        </el-button>
      </template>
      <template slot-scope="scope" slot="menu">
        <el-button
          type="text"
          icon="el-icon-view"
          size="small"
          @click="seeRecipeInfo(scope.row,1)"
        >查看
        </el-button>
        <el-button
          type="text"
          icon="el-icon-edit"
          size="small"
          @click="updateInfo(scope.row,scope)"
        >编辑
        </el-button>
          <el-button
          type="text"
          icon="el-icon-delete"
          size="small"
          @click="changeInfo(scope.row.id,1)"
        >删除
        </el-button>
        <el-button
          type="text"
          icon="el-icon-circle-plus-outline"
          size="small"
          v-show="scope.row.isPub!=0"
          @click="changeInfo(scope.row.id,1)"
        >公开
        </el-button>
        <el-button
          type="text"
          icon="el-icon-circle-plus-outline"
          size="small"
          v-show="scope.row.isPub==0"
          @click="changeInfo(scope.row.id,2)"
        >取消公开
        </el-button>
        <el-button
          type="text"
          icon="el-icon-circle-plus-outline"
          size="small"
          v-show="scope.row.isRecommend==0"
          @click="changeInfo(scope.row.id,3)"
        >推荐
        </el-button>
        <el-button
          type="text"
          icon="el-icon-circle-plus-outline"
          size="small"
          v-show="scope.row.isRecommend!=0"
          @click="changeInfo(scope.row.id,4)"
        >取消推荐
        </el-button>
        <el-button
          type="text"
          icon="el-icon-circle-plus-outline"
          size="small"
          v-show="scope.row.isUse!=0"
          @click="changeInfo(scope.row.id,5)"
        >取消收藏
        </el-button>
        <el-button
          type="text"
          icon="el-icon-circle-plus-outline"
          size="small"
          v-show="scope.row.isUse==0"
          @click="changeInfo(scope.row.id,6)"
        >收藏
        </el-button>
      </template>
      <!-- <template slot-scope="{row}"
                slot="category">
        <el-tag>{{row.categoryName}}</el-tag>
      </template> -->
    </avue-crud>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="80%"
      :append-to-body = "true"
      :before-close="handleClose">
      <el-row :gutter="20">
        <el-col :span="8">食谱名称：{{dialogListData.recipeName}}</el-col>
        <el-col :span="8">食谱周期：{{dialogListData.recipeDay}}</el-col>
        <el-col :span="8">收藏：{{dialogListData.isUse == 1?"已收藏":"未收藏"}}</el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">创建机构：{{dialogListData.orgName}}</el-col>
        <el-col :span="8">创建人：{{dialogListData.createName}}</el-col>
        <el-col :span="8">创建时间：{{dialogListData.createTime}}</el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-table
            :data="recipeTableData"
            border
            style="width: 100% "
            class="recipeTableWeekData"
            >
            <el-table-column
              type="index"
              :index="indexMethod">
            </el-table-column>
            <el-table-column
              prop="week1"
              label="周一"
              width="180">
            </el-table-column>
            <el-table-column
              prop="week2"
              label="周二"
              width="180">
            </el-table-column>
            <el-table-column
              prop="week3"
              label="周三">
            </el-table-column>
            <el-table-column
              prop="week4"
              label="周四"
              width="180">
            </el-table-column>
            <el-table-column
              prop="week5"
              label="周五"
              width="180">
            </el-table-column>
            <el-table-column
              prop="week6"
              label="周六">
            </el-table-column>
            <el-table-column
              prop="week7"
              label="周日" >
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
    </el-dialog>
  </basic-container>
  
</template>

<script>
  import {getList, getDetail, add, update, remove,changeInfo} from "@/api/food/recipe";
  import {mapGetters} from "vuex";

  export default {
    data() {
      return {
        dialogVisible: false,//弹框打开或者关闭
        recipeTableData:[],
        form: {},
        query: {},
        loading: true,
        page: {
          pageSize: 10,
          currentPage: 1,
          total: 0
        },
        dialogListData:{
          recipeName: '',
          recipeDay: '',
          isUse: '',
          orgName:'',
          createName: '',
          createTime: ''
        },

        selectionList: [],
        option: {
          height: 'auto',
          calcHeight: 30,
          tip: false,
          searchShow: true,
          searchMenuSpan: 6,
          border: true,
          index: true,
          editBtn: false,
          delBtn: false,
          selection: true,
          menuWidth:450,
          dialogHeight: '600',
          dialogWidth: '80%',
          dialogClickModal: false,
          addBtn:false,
          column: [
            {
              label: "食谱名称",
              prop: "recipeName",
              search: true,
              rules: [{
                required: true,
                message: "请输入食谱名称",
                trigger: "blur"
              }]
            },
            {
              label: "食谱周期",
              prop: "recipeDay",
              search: true,
              rules: [{
                required: true,
                message: "请输入食谱周期",
                trigger: "blur"
              }]
            },
            {
              label: "收藏",
              prop: "isUse",
              type: "select",
              search: true,
              dicData: [
                {
                  label: "已收藏",
                  value: 1
                },
                {
                  label: "未收藏",
                  value: 0
                }
              ],
              rules: [
                {
                  required: true,
                  message: "请选择",
                  trigger: "blur"
                }
              ]
            },
            {
              label: "创建机构",
              prop: "orgName",
              search: true,
            },
            {
              label: "创建人",
              prop: "createName",
              // span: 24,
              minRows: 6,
            },
            {
              label: "创建时间",
              prop: "createTime",
              type:'datetime',
              width: 140,
              // span: 24,
              minRows: 6,
              search: true,
              searchRange:true,
            },
          ]
        },
        ownthis:{},
        infoData:[],
        infoOption:{
          column: [{
            label: '年龄',
            prop: 'sex',
          }]
        },
        data: []
      };
    },
    computed: {
      ...mapGetters(["permission"]),
      permissionList() {
        return {
          /* addBtn: this.vaildData(this.permission.recipe_add, false),
           viewBtn: this.vaildData(this.permission.recipe_view, false),
           delBtn: this.vaildData(this.permission.recipe_delete, false),
           editBtn: this.vaildData(this.permission.recipe_edit, false)*/
        };
      },
      ids() {
        let ids = [];
        this.selectionList.forEach(ele => {
          ids.push(ele.id);
        });
        return ids.join(",");
      },
    },
    methods: {
      updateInfo(row,that){
        console.log(this);
        console.log(that)
        console.log(row)
        this.$router.push({
          path: './catering',
          query: {
            userid: row.id,
            tenantId: row.tenantId
				  }
        })
      }
      ,
      indexMethod(index){
        let _tableLineHead = ["早餐","早点","午餐","午点","晚餐","晚点"]
        return _tableLineHead[index]
      },
      seeRecipeInfo(row){
        this.dialogListData = row
        debugger
        getDetail(row.id).then(res => {
          let recipeCycles = res.data.data.recipeCycles
          let recipeTableData1 = [];
          let recipeTableData = {
            mealsType1:[],
            mealsType2:[],
            mealsType3:[],
            mealsType4:[],
            mealsType5:[],
            mealsType6:[],
            
          }
          for(let i in recipeCycles){
            let mealsTypeNum = recipeCycles[i].mealsType
            switch (mealsTypeNum) {
              case 1:
                recipeTableData.mealsType1.push(recipeCycles[i])    
                break;
              case 2:
                recipeTableData.mealsType2.push(recipeCycles[i]) 
                break;
              case 3:
                recipeTableData.mealsType3.push(recipeCycles[i]) 
                break;
              case 4:
                recipeTableData.mealsType4.push(recipeCycles[i]) 
                break;
              case 5:
                recipeTableData.mealsType5.push(recipeCycles[i]) 
                break;
              case 6:
                recipeTableData.mealsType6.push(recipeCycles[i]) 
                break;             
              default:
                break;
            }
          }
          for (let key in recipeTableData) {
            var weekData = {
              week1:'',
              week2:'',
              week3:'',
              week4:'',
              week5:'',
              week6:'',
              week7:'',
            }
            for (let index = 0; index < recipeTableData[key].length; index++) {
              var weekNum = "week" +recipeTableData[key][index].week;

              // weekData[weekNum].push(recipeTableData[key][index].recipeConncts[0].dishName)
              weekData[weekNum] += recipeTableData[key][index].recipeConncts[0].dishName+"\n"
            }
            console.log(weekData);
            recipeTableData1.push(weekData)
          }
          this.recipeTableData = recipeTableData1
          this.dialogVisible = true
        });
      },
      rowSave(row, done, loading) {
        add(row).then(() => {
          this.onLoad(this.page);
          this.$message({
            type: "success",
            message: "操作成功!"
          });
          done();
        }, error => {
          window.console.log(error);
          loading();
        });
      },
      rowUpdate(row, index, done, loading) {
        update(row).then(() => {
          this.onLoad(this.page);
          this.$message({
            type: "success",
            message: "操作成功!"
          });
          done();
        }, error => {
          window.console.log(error);
          loading();
        });
      },
      rowDel(row) {
        this.$confirm("确定将选择数据删除?", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            return remove(row.id);
          })
          .then(() => {
            this.onLoad(this.page);
            this.$message({
              type: "success",
              message: "操作成功!"
            });
          });
      },
      changeInfo(id,type) {
        // debugger;
        var isPub;//是否公开
        var isRecommend;//是否推荐
        var isUse;//是否收藏
        if(type==1){
          isPub=0
        }else if(type==2){
          isPub=1
        }else if(type==3){
          isRecommend=1
        }else if(type==4){//取消推荐
          isRecommend=0
        }else if(type==5){//取消收藏
          isUse=0
        }else if(type==6){
          isUse=1
        }

        this.$confirm("确定执行按钮?", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            return changeInfo(id,isPub,isRecommend,isUse);
          })
          .then(() => {
            this.onLoad(this.page);
            this.$message({
              type: "success",
              message: "操作成功!"
            });
          });
      },

      handleDelete() {
        if (this.selectionList.length === 0) {
          this.$message.warning("请选择至少一条数据");
          return;
        }
        this.$confirm("确定将选择数据删除?", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            return remove(this.ids);
          })
          .then(() => {
            this.onLoad(this.page);
            this.$message({
              type: "success",
              message: "操作成功!"
            });
            this.$refs.crud.toggleSelection();
          });
      },
      beforeOpen(done, type) {
        if (["edit", "view"].includes(type)) {
          getDetail(this.form.id).then(res => {
            // this.form = res.data.data;
          });
        }
        done();
      },
      searchReset() {
        this.query = {};
        this.onLoad(this.page);
      },
      searchChange(params, done) {
        this.query = params;
        this.page.currentPage = 1;
        this.onLoad(this.page, params);
        done();
      },
      selectionChange(list) {
        this.selectionList = list;
      },
      selectionClear() {
        this.selectionList = [];
        this.$refs.crud.toggleSelection();
      },
      currentChange(currentPage) {
        this.page.currentPage = currentPage;
      },
      sizeChange(pageSize) {
        this.page.pageSize = pageSize;
      },
      refreshChange() {
        this.onLoad(this.page, this.query);
      },
      onLoad(page, params = {}) {
        this.loading = true;
        params=
          {
            searchType:0
          }
        getList(page.currentPage, page.pageSize, Object.assign(params, this.query)).then(res => {
          const data = res.data.data;
          this.page.total = data.total;
          this.data = data.records;
          this.loading = false;
          this.selectionClear();
        });
      }
    }
  };
</script>

<style>
.recipeTableWeekData .cell {
  white-space: pre-line!important; 
}
</style>
