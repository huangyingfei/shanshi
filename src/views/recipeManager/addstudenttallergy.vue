<template>
  <basic-container class="addstudenttallergy">
    <avue-form :option="option" v-model="form" @submit="submit" @error="error">
    </avue-form>
    <el-dialog class="item-tallergy"
      title="添加食材信息"
      append-to-body
      :visible.sync="dialog"
      :close-on-click-modal="false"
               :before-close="cancel"
    >

      <el-tabs v-model="angelfood" >
        <el-tab-pane label="公共食材库" name="third">
          <div class="block">
            <p></p>
            <el-input
              placeholder="输入关键字进行过滤"
              v-model="filterText">
            </el-input>
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
              :filter-node-method="filterNode"
            >
            </el-tree>
          </div>
        </el-tab-pane>
        <el-tab-pane label="个人食材库" name="fourth">
          <div class="block">
            <p></p>
            <el-input
              placeholder="输入关键字进行过滤"
              v-model="filterText1">
            </el-input>
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
              :filter-node-method="filterNode1"
            >
            </el-tree>
          </div>
        </el-tab-pane>

      </el-tabs>

      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
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
        dialog: false, //弹出框
        foodIds:"",
        oldFoodIds:"",
        oldFoodNames:"",

        filterText:'',
        filterText1:'',
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
              prop: "foodNames2",
              hide:true,
              span:24,
              rules: [{
                required: true,
                message: "请选择过敏食材",
                trigger: this.validatefoodIds
              }],
              click:this.openDialog
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
              }],
              minlength:0,
              maxlength:255
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
              }],
              minlength:0,
              maxlength:255
            }
          ]
        },
      };
    },
    watch:{
      filterText(val) {
        this.$refs.treePub.filter(val);
      },
      filterText1(val) {
        this.$refs.treePri.filter(val);
      },
      'form.studentId'(){
        // var x=  document.getElementsByClassName("el-input__inner")[5]
        // x.value="";
      }
    },
    methods: {
      openDialog(){
          this.dialog=true;
          debugger
          this.oldFoodIds=this.foodIds;
          this.oldFoodNames=this.form.foodNames2;
          let foodIds=this.foodIds.split(",");
          let checkedDataPub=[];
          let checkedDataPri=[];
          for(let i=0;i<foodIds.length;i++){
            this.foodDataPub.forEach(_=>{
              if(_.foods){
                _.foods.forEach(__=>{
                  if(foodIds[i]==__.id){
                    checkedDataPub.push(foodIds[i])
                  }
                })
              }
            })
            this.foodDataPri.forEach(_=>{
              if(_.foods){
                _.foods.forEach(__=>{
                  if(foodIds[i]==__.id){
                    checkedDataPri.push(foodIds[i])
                  }
                })
              }
            })
          }
          let that=this;
          setTimeout(function () {
            that.$refs.treePub.setCheckedKeys(checkedDataPub)
            that.$refs.treePri.setCheckedKeys(checkedDataPri)
          },1000)


          if(this.form.foodNames2!=""){
            this.$set(this.form,"foodNames2",this.form.foodNames2+",");
            this.$set( this,'foodIds',this.foodIds+",")
          }
      },
      validatefoodIds(rule, value, callback) {
        if (value === ""||value=="undefined"||!value) {
          callback(new Error("请选择过敏食材"));
        }
        callback();
      },
      cancel(){
        this.dialog = false;
        this.foodIds=this.oldFoodIds;
        debugger
        this.$set(this.form,"foodNames2",this.oldFoodNames);
        let foodIds=this.foodIds.split(",");
        let checkedDataPub=[];
        let checkedDataPri=[];
        for(let i=0;i<foodIds.length;i++){
          this.foodDataPub.forEach(_=>{
            if(_.foods){
              _.foods.forEach(__=>{
                if(foodIds[i]==__.id){
                  checkedDataPub.push(foodIds[i])
                }
              })
            }
          })
          this.foodDataPri.forEach(_=>{
            if(_.foods){
              _.foods.forEach(__=>{
                if(foodIds[i]==__.id){
                  checkedDataPri.push(foodIds[i])
                }
              })
            }
          })
        }
        this.$refs.treePub.setCheckedKeys(checkedDataPub)
        this.$refs.treePri.setCheckedKeys(checkedDataPri)
      },
      certain(){
        this.dialog = false;
        if(this.form.foodNames2!=''){
          this.$set(this.form,'foodNames2',this.form.foodNames2.substring(0,this.form.foodNames2.length-1))
          this.$set( this,'foodIds',this.foodIds.substring(0,this.foodIds.length-1))
        }
      },
      filterNode(value, data) {
        if (!value) return true;
        return data.foodName.indexOf(value) !== -1;
      },
      filterNode1(value, data) {
        if (!value) return true;
        return data.foodName.indexOf(value) !== -1;
      },
      handleCheckChange(data, checked, indeterminate) {
        debugger
        if(checked&&!data.foods&&this.foodIds.indexOf(data.id)==-1){
          this.form.foodNames2+=data.foodName+","
          this.$set( this.form,'foodNames2',this.form.foodNames2)

          this.foodIds+=data.id+","
        }else if(!checked&&!data.foods&&this.foodIds.indexOf(data.id)!=-1){
          this.$set( this.form,'foodNames2',this.form.foodNames2.replace(data.foodName+",",""))

          this.$set( this,'foodIds',this.foodIds.replace(data.id+",",""))
        }
      },
      submit(form, done) {
        let that=this;
        let foods=[];
        let foodIds= this.foodIds.split(",")
        foodIds.forEach(_=>{
          foods.push({"foodId":_})
        })
        if(this.form.id){
          let row={
            id:this.form.id,
            studentId:this.form.studentId,
            foods:foods,
            symptom:this.form.symptom,
            remark:this.form.remark
          }
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
      let that=this;
      if (this.$route.query.id) {
        getDetail(this.$route.query.id).then(res => {
          that.form=res.data.data
          debugger
          that.$set(that.form,"foodNames2",res.data.data.foodNames)
          let foodIds="";
          that.form.foods.forEach(_=>{
            foodIds+=_.foodId+","
          })
          this.foodIds=foodIds.substring(0,foodIds.length-1)

          // let checkedDataPub=[];
          // let checkedDataPri=[];
          // that.form.foods.forEach(_=>{
          //   checkedDataPub.push(_.foodId)
          //   checkedDataPri.push(_.foodId)
          //   foodIds+=_.foodId+","
          // })

          // that.checkedDataPub=checkedDataPub
          // that.checkedDataPri=checkedDataPri
        });
      }else{

      }
      getFoodByBaseId(0).then(res=>{
        res.data.data.forEach(_=>{
          _.foodName=_.typeName
          _.disabled=true
        })
        that.foodDataPri=res.data.data;
      })//机构
      getFoodByBaseId(1).then(res=>{
        res.data.data.forEach(_=>{
          _.foodName=_.typeName
          _.disabled=true
        })
        that.foodDataPub=res.data.data;
        // if (that.$route.query.id) {
        //   debugger
        //   setTimeout(function () {
        //     // that.$refs.treePub.setCheckedKeys(that.checkedDataPub)
        //     // that.$refs.treePri.setCheckedKeys(that.checkedDataPri)
        //   },1000)
        // }

      })//平台
    }
  };
</script>
<style>
 .item-tallergy  .el-dialog__body{
    height: 400px;
    overflow-y: scroll;
  }
</style>
