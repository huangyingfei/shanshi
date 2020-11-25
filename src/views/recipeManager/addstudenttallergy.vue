<template>
  <basic-container>
    <avue-form :option="option" v-model="form" @submit="submit" @error="error">
    </avue-form>
  </basic-container>
</template>

<script>
  import {getList, getDetail, add, update, remove,getTree,getStudentClass} from "@/api/food/studentallergy";

  import {
    save,
    detail,
    getById,
    updateStu,
    getChildNo,
  } from "@/api/system/student";
  export default {
    data() {
      return {
        form: {

        },
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
              click(){
                debugger
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
      if (this.$route.query.id) {

      }else{

      }
    }
  };
</script>
