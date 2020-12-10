<template>
  <div class="special">
    <el-row>
      <el-col :span="4">

            <basic-container>
              <el-button    @click="addPeople"  type="primary" size="small" class="el-icon-check">添加人群</el-button>

              <el-tree
                :data="treeData"
                :props="treeProps" default-expand-all
                @node-click="nodeClick"
              >
                <span class="custom-tree-node" slot-scope="{ node, data }">
                <span>{{ node.label }}</span>
                  <span v-if="data.isDefault!=1">
                    <img
                      src="/img/bg/delete.png"
                      @click="remove(data.id)"
                      width="15px"
                      v-if="!data.children"
                    />
                  </span>
                 </span>
              </el-tree>

            </basic-container>

      </el-col>
        <el-col :span="20">
        <basic-container>
          <avue-form :option="option" v-model="specialForm"   @submit="submit" disabled>
            <template slot-scope="scope" slot="moren" >
              <div style="display: flex;justify-content: start;flex-wrap: wrap">
              <div  v-for="(item, index) in morenData" :key="index" >
                <div  style="display: flex;justify-content: flex-start;margin-right: 20px">
                <avue-checkbox v-model="item.mealCheck"  :dic="item.dicData"></avue-checkbox>
                <avue-input-number style="width: 100px!important;margin: auto 6px"  v-model="item.mealNum"></avue-input-number>%
              </div>
              </div>
              </div>
            </template>

          </avue-form>

        </basic-container>
      </el-col>
    </el-row>

  </div>
</template>

<script>
  import {
    getList,
    remove,
    getClassStudent,
    detailByPeopleId,
    calAgeByStudentIds,
    submit,
  } from "@/api/system/special";
  export default {
    data() {
      const validate=(rule,value,callback)=>{
        this.morenData.forEach(_=>{
          if(!_.mealNum){
            callback(new Error('默认餐别必填'));
          }
        })
        callback();
      }
      return {

        treeData: [],
        treeProps: {
          children: "children",
          label: "peopleName",
          value:"id"
        },
        morenData:[
          {
            dicData:[{
              label:"早餐",
              value:"1"
            }],
            mealCheck:false,
            mealNum:25
          },
          {
            dicData:[{
              label:"早点",
              value:"2"
            }],
            mealCheck:true,
            mealNum:5
          },
          {
            dicData:[{
              label:"午餐",
              value:"3"
            }],
            mealCheck:true,
            mealNum:35
          },
          {
            dicData:[{
              label:"午点",
              value:"4"
            }],
            mealCheck:true,
            mealNum:5
          },
          {
            dicData:[{
              label:"晚餐",
              value:"5"
            }],
            mealCheck:false,
            mealNum:30
          },
          {
            dicData:[{
              label:"晚点",
              value:6
            }],
            mealCheck:false,
            mealNum:5
          },
        ],
        specialForm:{
        },
        option: {

          column: [
            {
              label: '人群名称',
              prop: 'peopleName',
              rules: [
                {
                  required: true,
                  message: "请输入人群名称",
                  trigger: "blur",
                },
              ],
              minlength:0,
              maxlength:16,
              span:24
            },
            {
              label: '选择人员',
              prop: 'people',
              type:"tree",
              props: {
                label: 'name',
                value: 'id',
                children:'students',

              },
              leafOnly:true,
              rules: [
                {
                  required: true,
                  message: "请选择人员",
                  trigger: "blur",
                },
              ],
              span:24,
              multiple:true,
              change:(data)=>{
                debugger
                let people=data.value;
                if(people.length>0){
                  for(let i=0;i<people.length;i++ ){
                    this.findObject(this.option.column,"people").dicData.forEach(_=>{
                      if(_.id==people[i]){
                        people.splice(i,1)
                      }
                    })
                  }
                  let ids=""
                  for(let i=0;i<people.length;i++){
                    ids+=people[i] +","
                  }
                  calAgeByStudentIds(ids).then(res=>{
                    this.$set(this.specialForm,"avgAge",res.data.data.avgAge)
                    this.$set(this.specialForm,"proportion",res.data.data.proportion)
                  })
                }else{
                  this.$set(this.specialForm,"avgAge",undefined)
                  this.$set(this.specialForm,"proportion",undefined)
                }

              }
            },
            {
              label: '是否使用',
              prop: 'isUse',
              type:"radio",
              dicData:[{
                label:"是",
                value:1
              },{
                label:"否",
                value:0
              }],
              rules: [
                {
                  required: true,
                  message: "请选择",
                  trigger: "blur",
                },
              ],
              span:8
            },
            {
              label: '是否清真',
              prop: 'isMuslim',
              type:"radio",
              dicData:[{
                label:"是",
                value:1
              },{
                label:"否",
                value:0
              }],
              rules: [
                {
                  required: true,
                  message: "请选择",
                  trigger: "blur",
                },
              ],
              span:8
            },
            {
              label: '平均年龄',
              prop: 'avgAge',
              span:24,
              disabled:true
            },
            {
              label: '男女比例',
              prop: 'proportion',
              span:24,
              disabled:true
            },
            {
              label: '默认餐别',
              prop: 'moren',
              span:24,
              formslot:true,
              rules: [{required: true, validator: validate, trigger: 'blur'}]
            },
            {
              label: '人群特点',
              type:"textarea",
              prop: 'remark',
              span:24,
              minlength:0,
              maxlength:255
            },

            ]
        }
      };
    },
    mounted() {
      this.initData();
    },
    methods: {
      nodeClick(data){
        debugger
        if(data.peopleName!="人群列表"){
          let that=this;
          this.$set(that.specialForm,"people",[])
          detailByPeopleId(data.id).then(res=>{
            that.specialForm=res.data.data;
            let ids=res.data.data.ids;
            debugger
            let people=[];
            ids.forEach(_=>{
              people.push(_.studentId+"")
            })
            that.$set(that.morenData[0],"mealNum",!res.data.data.breakfast?undefined:res.data.data.breakfast)
            that.$set(that.morenData[1],"mealNum",!res.data.data.breakfastSnack?undefined:res.data.data.breakfastSnack)
            that.$set(that.morenData[2],"mealNum",!res.data.data.lunch?undefined:res.data.data.lunch)
            that.$set(that.morenData[3],"mealNum",!res.data.data.lunchSnack?undefined:res.data.data.lunchSnack)
            that.$set(that.morenData[4],"mealNum",!res.data.data.dinner?undefined:res.data.data.dinner)
            that.$set(that.morenData[5],"mealNum",!res.data.data.dinnerSnack?undefined:res.data.data.dinnerSnack)
            if(res.data.data.defaultMeal){
              let defaultMeal =res.data.data.defaultMeal.split(",");
              that.morenData.forEach(_=>{
                that.$set(_,"mealCheck",false)
              })
              for(let i=0;i<defaultMeal.length;i++){
                that.morenData.forEach(_=>{
                  if(_.dicData[0].value==defaultMeal[i]){
                    that.$set(_,"mealCheck",true)
                  }
                })
              }
            }

            that.$set(that.specialForm,"people",people)
          })
        }

      },
      empty(){
        this.morenData.forEach(_=>{
          if(_.dicData[0].value=="1"){
            this.$set(_,"mealNum",25)
          }
          if(_.dicData[0].value=="2"){
            this.$set(_,"mealNum",5)
          }
          if(_.dicData[0].value=="3"){
            this.$set(_,"mealNum",35)
          }
          if(_.dicData[0].value=="4"){
            this.$set(_,"mealNum",5)
          }
          if(_.dicData[0].value=="5"){
            this.$set(_,"mealNum",30)
          }
          if(_.dicData[0].value=="6"){
            this.$set(_,"mealNum",5)
          }

          this.$set(_,"mealCheck",false)
            if(_.dicData[0].value=="2"||_.dicData[0].value=="3"||_.dicData[0].value=="4"){
              this.$set(_,"mealCheck",true)
            }

        })
        this.$set( this.specialForm,"id",undefined)
        this.$set( this.specialForm,"peopleName",undefined)
        this.$set( this.specialForm,"people",undefined)
        this.$set( this.specialForm,"isUse",undefined)
        this.$set( this.specialForm,"isMuslim",undefined)
        this.$set( this.specialForm,"remark",undefined)
        this.$set( this.specialForm,"avgAge",undefined)
        this.$set( this.specialForm,"proportion",undefined)
        // this.$set( this.specialForm,"proportion",undefined)
      },
      addPeople(){
        this.empty();
        this.initData();
      },

      submit(form, done){
        let people=this.specialForm.people;
        debugger
        for(let i=0;i<people.length;i++ ){
          this.findObject(this.option.column,"people").dicData.forEach(_=>{
            if(_.id==people[i]){
               people.splice(i,1)
            }
          })
        }
        let ids=[];
        for(let i=0;i<people.length;i++){
          ids.push({studentId:people[i]})
        }
        let defaultMeal="";
        this.morenData.forEach(_=>{
          if(_.mealCheck){
            defaultMeal+=_.dicData[0].value+","
          }
        })
        let row={
          id:this.specialForm.id,
          peopleName:this.specialForm.peopleName,
          ids:ids,
          isUse:this.specialForm.isUse,
          isMuslim:this.specialForm.isMuslim,
          remark:this.specialForm.remark,
          defaultMeal:defaultMeal.substring(0,defaultMeal.length-1),
          breakfast:this.morenData[0].mealNum,
          breakfastSnack:this.morenData[1].mealNum,
          lunch:this.morenData[2].mealNum,
          lunchSnack:this.morenData[3].mealNum,
          dinner:this.morenData[4].mealNum,
          dinnerSnack:this.morenData[5].mealNum,
        }
        // debugger
        submit(row).then(res=>{
            if(res.data.success){
              this.$message({
                type: "success",
                message: "提交成功!",
              });
              if(!this.specialForm.id){
                this.initData()
                this.empty();
              }
              done()
            }else{
              debugger

              // this.$message({
              //   type: "error",
              //   message: "提交失败!",
              // });
            }
        }).catch(e=>{
          done()
        })
      },
      remove(id) {
        this.$confirm("是否确认删除", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            remove(id).then((res) => {
              if (res.data.success) {
                this.$message({
                  type: "success",
                  message: "删除成功!",
                });
                this.empty();
                this.initData();
              }
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除",
            });
          });
      },
      initData() {
        getList().then((res) => {
            this.treeData=[{
              peopleName:"人群列表",
              children:res.data.data
            }]
          console.log(this.treeData)
        });

        getClassStudent().then(res=>{
          this.findObject(this.option.column,"people").dicData=res.data.data;
          this.findObject(this.option.column,"people").props={
            label: 'name',
            value: 'id',
            children:'students'
          }
        })
      },
    },
  };
</script>

<style>
  .el-tree{
    margin-top: 20px;
  }
 .special .el-input-number__decrease,.special .el-input-number__increase{
    font-size: 15px!important;
  }
  .special .el-input-number.is-controls-right .el-input-number__decrease{
    bottom: 3px;
  }
  .special .el-input-number__decrease,.special .el-input-number__increase{
    background: #fff;
  }
  /*.special   .el-input-number__decrease,special .el-input-number__increase{*/
    /*font-size: 12px!important;*/
  /*}*/
  /*.special.el-input-number__decrease, .el-input-number__increase{*/
    /*background: #fff;*/
  /*}*/
</style>
