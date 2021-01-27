<template>
  <basic-container>

    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="网站标题：" prop="webTitle">
        <el-input v-model="ruleForm.webTitle"></el-input>
      </el-form-item>
      <el-form-item label="首页logo：" prop="dialogImageUrl">
        <el-upload action="#" list-type="picture-card" :auto-upload="false" limit="1">
          <i slot="default" class="el-icon-plus"></i>
          <div slot="file" slot-scope="{file}">
            <img class="el-upload-list__item-thumbnail" :src="file.url" alt="">
            <span class="el-upload-list__item-actions">
              <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
                <i class="el-icon-zoom-in"></i>
              </span>
              <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleDownload(file)">
                <i class="el-icon-download"></i>
              </span>
              <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleRemove(file)">
                <i class="el-icon-delete"></i>
              </span>
            </span>
          </div>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="ruleForm.dialogImageUrl" alt="">
        </el-dialog>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">保存设置</el-button>
      </el-form-item>
    </el-form>

  </basic-container>
</template>

<script>
  import { saveWeb, getOneWeb } from "@/api/system/setting";
  export default {
    data() {
      return {
        ruleForm: {
          webTitle: '',//标题
          dialogImageUrl: '',//图片地址
          id: null//id
        },
        rules: {
          webTitle: [
            { required: true, message: '请输入标题名称', trigger: 'blur' },
          ]
        },
        dialogVisible: false,
        disabled: false,
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
              this.ruleForm.dialogImageUrl = data.data.dialogImageUrl;
              this.ruleForm.id = data.data.id;
            }
          }
        })
      },
      handleRemove(file) {
        console.log(file);
      },
      handlePictureCardPreview(file) {
        this.ruleForm.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      handleDownload(file) {
        console.log(file);
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.saveWeb()
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      saveWeb() {
        //
        var params;
        if (!this.saveOrUpdate) {//新增
          params = {
            webTitle: this.ruleForm.webTitle,
            webLogo: this.ruleForm.dialogImageUrl
          }

        } else {
          params = {
            webTitle: this.ruleForm.webTitle,
            webLogo: this.ruleForm.dialogImageUrl,
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

<style scoped>
  .el-card__body {
    font-size: 14px;
  }

  /*
  .item-left {
    float: left;
    width: 80px;
    height: 19px;
  }

  .contain-item {
    margin-top: 10px;
    margin-bottom: 30px;
  } */

  .el-button,
  .el-button--primary {
    background-color: rgba(39, 181, 156, 1)
  }

  .el-button--primary.is-active,
  .el-button--primary:active {
    background-color: rgba(39, 181, 156, 1)
  }

  .el-button--primary:hover {
    background-color: rgba(39, 181, 156, 1)
  }

  .el-button--primary:visited {
    background-color: rgba(39, 181, 156, 1)
  }

  .el-button--primary:link {
    background-color: rgba(39, 181, 156, 1)
  }
</style>
