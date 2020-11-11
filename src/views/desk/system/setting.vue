<template>
  <basic-container>

    <avue-form :option="option" v-model="ruleForm" @submit="submitForm" :upload-preview="uploadPreview" :upload-error="uploadError" :upload-exceed="uploadExceed" :upload-delete="uploadDelete" :upload-before="uploadBefore" :upload-after="uploadAfter"> </avue-form>


  </basic-container>
</template>

<script>
  import { saveWeb, getOneWeb } from "@/api/system/setting";
  export default {
    data() {
      return {
        option: {
          labelWidth: 120,
          menuPosition:"left",
          submitText:"保存设置",
          emptyBtn:false,
          column: [
            {
              label: "id",
              prop: "id",
              display:false,
              span:24
            },
            {
              label: "网站标题",
              prop: "webTitle",
              span:24,
              rules: [
                {
                  required: true,
                  message: "请输入标题名称",
                  trigger: "blur",
                },
              ],
            },
            {
              label: '首页logo',
              prop: 'webLogo',
              type: 'upload',
              listType: 'picture-img',
              span: 24,
              propsHttp: {
                res: 'data',
                url: 'link',
              },
              canvasOption: {
                text: ' ',
                ratio: 0.1
              },
              tip: '建议上传500px x 200px的图片，具体尺寸需确认下',
              action: '/api/blade-resource/oss/endpoint/put-file'
            },
          ]
        },

        ruleForm: {
          webTitle: '',//标题
          webLogo: '',//图片地址
          id: null//id
        },
        // rules: {
        //   webTitle: [
        //     { required: true, message: '请输入标题名称', trigger: 'blur' },
        //   ]
        // },
        // dialogVisible: false,
        // disabled: false,
        saveOrUpdate: false,

      };
    },
    created() {
      this.getOneWeb();
    },
    methods: {
      getOneWeb() {
        getOneWeb().then(res => {
          var data = res.data;
          if (data.success) {
            if (data.data == null) {
              this.saveOrUpdate = false;//新增
            } else {
              this.saveOrUpdate = true;
              this.ruleForm.webTitle = data.data.webTitle;
              this.ruleForm.webLogo = data.data.webLogo;
              this.ruleForm.id = data.data.id;
            }
          }
        })
      },
      // handleRemove(file) {
      //   console.log(file);
      // },
      // handlePictureCardPreview(file) {
      //   this.ruleForm.dialogImageUrl = file.url;
      //   // this.dialogVisible = true;
      // },
      // handleDownload(file) {
      //   console.log(file);
      // },
      submitForm() {
        this.saveWeb();
        // this.$refs[formName].validate((valid) => {
        //   if (valid) {
        //     this.saveWeb()
        //   } else {
        //     console.log('error submit!!');
        //     return false;
        //   }
        // });
      },
      // resetForm(formName) {
      //   this.$refs[formName].resetFields();
      // },
      saveWeb() {
        debugger
        var params;
        if (!this.saveOrUpdate) {//新增
          params = {
            webTitle: this.ruleForm.webTitle,
            webLogo: this.ruleForm.webLogo
          }

        } else {
          params = {
            webTitle: this.ruleForm.webTitle,
            webLogo: this.ruleForm.webLogo,
            id: this.ruleForm.id
          }
        }
        saveWeb(params).then(res => {
          var data = res.data;
          const flag = data.success;
          console.log(res)
          if (flag) {
            this.$message({
              message: '保存成功',
              type: 'success'
            });

          } else {
            this.$message.error('保存失败');
          }

        });
        this.getOneWeb();
      }
    }
  };
</script>


