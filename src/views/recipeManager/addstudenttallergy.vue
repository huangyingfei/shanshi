<template>
  <basic-container>
    <avue-form :option="option" v-model="form" @submit="submit" @error="error">
    </avue-form>
    <el-dialog
      title="添加食材信息"
      append-to-body
      :visible.sync="dialog"
      :close-on-click-modal="false"
    >
      <el-tabs v-model="angelfood" @tab-click="foodmatters">
        <el-tab-pane label="公共食材库" name="third">
          <div class="block">
            <p></p>
            <el-tree
              :data="foodDataPub"
              node-key="id"
              show-checkbox
              :props="defaultProps"
              v-loading="loadFlag2"
              :default-expand-all="false"
              @node-click="handleNodeClickPub"
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
              v-loading="loadFlag2"
              :default-expand-all="false"
              @node-click="handleNodeClickPri"
            >
            </el-tree>
          </div>
        </el-tab-pane>

      </el-tabs>
    </el-dialog>
  </basic-container>
</template>

<script>
  import {getList, getDetail, add, update, remove,getTree,getStudentClass,getFoodByBaseId} from "@/api/food/studentallergy";

  export default {
    data() {
      return {
        angelfood: "fourth",
        defaultProps:{
          children: 'foods',
          label: 'foodName'
        },
        form: {
          loadFlag2:false
        },
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
                { required: true, trigger: "blur" },
              ],
              change:({value,column})=>{
                // debugger;
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
              prop: "foodId",
              hide:true,
              span:24,
              rules: [{
                required: true,
                message: "请选择过敏食材",
                trigger: "blur"
              }],
              click:()=>{
                debugger
                this.dialog=true;
             //   this.$set(this.form,"dialog",true)
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
    methods: {

      handleNodeClickPub(){

      },
      handleNodeClickPri(){

      },
      submit(form, done) {
        add(form).then(() => {
          this.onLoad(this.page);
          this.$message({
            type: "success",
            message: "操作成功!"
          });
          done();
        }, error => {
          loading();
          window.console.log(error);
        });
      },

    },
    mounted() {
      debugger
      if (this.$route.query.id) {

      }else{
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
        })//平台
      }
    }
  };
</script>
