<template>
  <basic-container class="addstudenttallergy">
    <avue-form :option="option" v-model="form" @submit="submit" @error="error">
    </avue-form>
    <el-dialog
      title="添加食材信息"
      append-to-body
      :visible.sync="dialog"
      :close-on-click-modal="false"
    >
      <el-tabs v-model="angelfood" >
        <el-tab-pane label="公共食材库" name="third">
          <div class="block">
            <p></p>
            <el-tree
              :data="foodDataPub"
              node-key="id"
              show-checkbox
              :props="defaultProps"
              :default-checked-keys="checkedDataPub"
              v-loading="loadFlag2"
              check-strictly
              ref="treePub"
              :default-expand-all="false"
              @check-change="handleCheckChange"
            >
            </el-tree>
          </div>
        </el-tab-pane>
        <el-tab-pane label="个人食材库" name="fourth">
          <div class="block">
            <p></p>
            <el-tree
              :data="foodDataPri"
              node-key="id"
              :props="defaultProps"
              show-checkbox
              :default-checked-keys="checkedDataPri"
              check-strictly
              ref="treePri"
              v-loading="loadFlag2"
              :default-expand-all="false"
              @check-change="handleCheckChange"
            >
            </el-tree>
          </div>
        </el-tab-pane>

      </el-tabs>

      <div slot="footer" class="dialog-footer">
        <el-button @click="certain">取 消</el-button>
        <el-button @click="certain" type="primary">确 定</el-button>
      </div>
    </el-dialog>
  </basic-container>
</template>

<script>
  import {getList, getDetail, add, update, remove,getTree,getStudentClass,getFoodByBaseId} from "@/api/food/studentallergy";

  export default {
    data() {
      return {
        angelfood: "third",
        defaultProps:{
          children: 'foods',
          label: 'foodName'
        },
        loadFlag2:false,
        form: {
        },
        checkedDataPub:[],
        checkedDataPri:[],
        foodIdArr:[],
        dialog: false, //弹出框
        option: {
          detail: false,
          height:'auto',
          column: [
            {
              label: "姓名",
              prop: "studentId",
              multiple: false,
              span:24,
              type: "tree",
              dicUrl:"/api/blade-food/class/getStudent",
              hide:true,
              dicData: [],
              props: {
                label: "name",
                value:"id"
              },
              rules: [
                { required: true, trigger: "blur" ,   message: "请输入姓名", },
              ],
              change:({value,column})=>{
                 // debugger;
                 // console.log(this.form)
                if(value!='' && value!=null){
                  getStudentClass(value).then(res => {
                    /*                    console.log(res);*/
                    this.form.className = res.data.data.className;
                  })
                }

              },
            },
            {
              label: "班级",
              prop: "className",
              span:24,
              disabled:true,
              search:true
            },
            {
              label: "姓名",
              prop: "peopleName",
              display:false,
              search:true,
              rules: [{
                required: true,
                message: "请输入姓名",
                trigger: "blur"
              }]
            },
            {
              label: "食材名称",
              prop: "foodNames",
              display:false,
              rules: [{
                required: true,
                message: "请输入主键",
                trigger: "blur"
              }]
            },
            {
              label: "过敏食材",
              prop: "foodIds",
              hide:true,
              span:24,
              rules: [{
                required: true,
                message: "请选择过敏食材",
                trigger: this.validatefoodIds
              }],
              click:()=>{
                this.dialog=true;
                if(this.form.foodIds!=""){
                  this.$set(this.form,"foodIds",this.form.foodIds+",");
                }
              }
            },
            {
              label: "过敏症状",
              prop: "symptom",
              type:"textarea",
              span:24,
              rules: [{
                required: true,
                message: "请输入过敏症状",
                trigger: "blur"
              }]
            },
            {
              label: "备注",
              prop: "remark",
              span:24,
              type:"textarea",
              rules: [{
                required: false,
                message: "请输入备注",
                trigger: "blur"
              }]
            }
          ]
        },
      };
    },
    watch:{
      'form.studentId'(){
        // var x=  document.getElementsByClassName("el-input__inner")[5]
        // x.value="";
        debugger
      }
    },
    methods: {
      validatefoodIds(rule, value, callback) {
        debugger
        if (value === ""||value=="undefined"||!value) {
          callback(new Error("请选择过敏食材"));
        }
        callback();
      },
      certain(){
        this.dialog = false;
        if(this.form.foodIds!=''){
          this.$set(this.form,'foodIds',this.form.foodIds.substring(0,this.form.foodIds.length-1))
        }
      },
      handleCheckChange(data, checked, indeterminate) {
        debugger
        if(checked&&!data.foods&&this.form.foodIds.indexOf(data.foodName)==-1){
          this.form.foodIds+=data.foodName+","
          this.$set( this.form,'foodIds',this.form.foodIds)
        }else if(!checked&&!data.foods&&this.form.foodIds.indexOf(data.foodName)!=-1){
          this.$set( this.form,'foodIds',this.form.foodIds.replace(data.foodName+",",""))
        }
      },
      submit(form, done) {
        let that=this;
        let treePri=that.$refs.treePri.getCheckedKeys()
        let treePub=that.$refs.treePub.getCheckedKeys()
        let foods=[];
        treePri.forEach(id=>{
          foods.push({"foodId":id})
        })
        treePub.forEach(id=>{
          foods.push({"foodId":id})
        })
        if(this.form.id){
          let row={
            id:this.form.id,
            studentId:this.form.studentId,
            foods:foods,
            symptom:this.form.symptom,
            remark:this.form.remark
          }
          debugger
          update(row).then(() => {
            this.$message({
              type: "success",
              message: "修改成功!"
            });
            done();
            this.$router.push({ path: "/recipeManager/studentallergy" });
          }, error => {
            loading();
            window.console.log(error);
          });
        }else{
          let row={
            studentId:this.form.studentId,
            foods:foods,
            symptom:this.form.symptom,
            remark:this.form.remark
          }
          debugger
          add(row).then(() => {
            this.$message({
              type: "success",
              message: "操作成功!"
            });
            done();
            this.$router.push({ path: "/recipeManager/studentallergy" });
          }, error => {
            loading();
            window.console.log(error);
          });
        }
      },

    },
    mounted() {

      debugger
      let that=this;
      if (this.$route.query.id) {
        getDetail(this.$route.query.id).then(res => {
          that.form=res.data.data
          that.$set(that.form,"foodIds",res.data.data.foodNames)
          that.checkedDataPub=[];
          that.checkedDataPri=[];
          debugger
          that.form.foods.forEach(_=>{
            that.checkedDataPub.push(_.foodId)
            that.checkedDataPri.push(_.foodId)
          })
          console.log(res.data.data)
        });
      }else{

      }
      getFoodByBaseId(0).then(res=>{
        res.data.data.forEach(_=>{
          _.foodName=_.typeName
          _.disabled=true
        })
        this.foodDataPri=res.data.data;
      })//机构
      getFoodByBaseId(1).then(res=>{
        res.data.data.forEach(_=>{
          _.foodName=_.typeName
          _.disabled=true
        })
        this.foodDataPub=res.data.data;
        that.$refs.treePub.setCheckedKeys(this.checkedDataPub)
        that.$refs.treePri.setCheckedKeys(this.checkedDataPri)

      })//平台
    }
  };
</script>
<style>
  .el-dialog__body{
    height: 400px;
    overflow-y: scroll;
  }
</style>
