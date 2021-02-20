<template>
  <basic-container class="setting">
    <avue-form :option="option" v-model="ruleForm" @submit="submitForm" :upload-preview="uploadPreview" :upload-error="uploadError" :upload-exceed="uploadExceed" :upload-delete="uploadDelete" :upload-before="uploadBefore" :upload-after="uploadAfter">
      <template slot-scope="{}" slot="expireTime">
        <div>
          <avue-date v-model="ruleForm.endTime"  value-format="yyyy-MM-dd" placeholder="请选择日期" disabled></avue-date>
          <div>还有<span style="color: red;font-weight: 500;font-size: 16px;padding: 0 5px">{{ruleForm.day}}</span>天到期</div>
        </div>
      </template>
    </avue-form>
  </basic-container>
</template>

<script>
  import  {getInervalHour} from "@/api/tool/date"
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
              label: "day",
              prop: "day",
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
              minlength:0,
              maxlength:32
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
              tip: '建议上传240 x 64px的图片，具体尺寸需确认下',
              action: '/api/blade-resource/oss/endpoint/put-file'
            },
            {
              label: '机构排名logo',
              prop: 'organLogo',
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
              tip: '建议上传180 x 180px的图片，具体尺寸需确认下',
              action: '/api/blade-resource/oss/endpoint/put-file'
            },
            {
              label: "开始使用时间",
              prop: "startUseTime",
              type:"date",
              span:24,
              disabled:true
            },
            {
              label: "到期时间",
              prop: "expireTime",
              type:"date",
              span:24,
              disabled:true,
              formslot:true
            },
          ]
        },
        ruleForm: {
          webTitle: '',//标题
          webLogo: '',//图片地址
          id: null,//id
          startUseTime:'',
          endTime:'',
          day:'',
        },
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
              this.$set( this.ruleForm,"webTitle" , data.data.webTitle);
              this.$set(this.ruleForm,"webLogo", data.data.webLogo);
              this.$set(this.ruleForm,"organLogo", data.data.organLogo);
              this.$set(this.ruleForm,"id" , data.data.id);
              this.$set(this.ruleForm,"startUseTime",data.data.startUseTime)
              this.$set(this.ruleForm,"endTime",data.data.endTime)
              let s = data.data.endTime.replace(/-/g, "/");
              var date = new Date(data.data.endTime);
              this.$set(this.ruleForm,"day", Math.ceil((date.getTime()-new Date().getTime()) / 1000 / 60 / 60 /24))

            }
          }
        })
      },
      submitForm(form,done) {
        this.saveWeb(done);

      },
      saveWeb(done) {
        var params;
        if (!this.saveOrUpdate) {//新增
          params = {
            webTitle: this.ruleForm.webTitle,
            webLogo: this.ruleForm.webLogo,
            organLogo:this.ruleForm.organLogo
          }
        } else {
          params = {
            webTitle: this.ruleForm.webTitle,
            webLogo: this.ruleForm.webLogo,
            id: this.ruleForm.id,
            organLogo:this.ruleForm.organLogo
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
            this.$store.dispatch("setWebLogo",this.ruleForm.webLogo)
            this.getOneWeb();
            done()
          } else {
            this.$message.error('保存失败');
          }
        });

      }
    }
  };
</script>

<style>
  .setting  .el-button--primary{
    margin-left: 120px;
  }
</style>
