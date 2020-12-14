<template>
  <el-form class="login-form"
           status-icon
           :rules="loginRules"
           ref="loginForm"
           :model="loginForm"
           label-width="0">
    <el-form-item prop="phone">
      <el-input size="small"
                @keyup.enter.native="handleLogin"
                v-model="loginForm.phone"
                auto-complete="off"
                :placeholder="$t('login.phone')">
        <i slot="prefix"
           class="icon-shouji"/>
      </el-input>
    </el-form-item>
    <el-form-item prop="code">
      <el-input size="small"
                @keyup.enter.native="handleLogin"
                v-model="loginForm.code"
                auto-complete="off"
                :placeholder="$t('login.code')">
        <i slot="prefix"
           class="icon-yanzhengma"
           />
        <template slot="append">
          <span @click="handleSend"
                class="msg-text"
                :class="[{display:msgKey}]">{{msgText}}</span>
        </template>
      </el-input>
    </el-form-item>

    <el-form-item prop="newPassword">
      <el-input size="small"
                @keyup.enter.native="handleLogin"
                type="password"
                v-model="loginForm.newPassword"
                auto-complete="off"
                placeholder="请输入新的密码"
                >
        <i slot="prefix"
           class="icon-mima"/>
      </el-input>
    </el-form-item>
    <el-form-item prop="newPassword1">
      <el-input size="small"
                @keyup.enter.native="handleLogin"
                v-model="loginForm.newPassword1"
                auto-complete="off"
                type="password"
                placeholder="请输入确认密码"
      >
        <i slot="prefix"
           class="icon-mima"/>
      </el-input>
    </el-form-item>
    <el-form-item>
      <!--<el-button size="small"-->
                 <!--type="primary"-->
                 <!--@click.native.prevent="handleLogin"-->
                 <!--class="login-submit">{{$t('login.submit')}}</el-button>-->
    </el-form-item>

  </el-form>
</template>

<script>
import md5 from 'js-md5'
import {sendMsg, vilateCode,vilatePhone} from "@/api/system/user";
import { validatenull } from "@/util/validate";
import { mapGetters } from "vuex";
export default {
  name: "codelogin",
  data() {
    const validatePhone = (rule, value, callback) => {
      let list;
        this.isvalidatemobile(value).then(res=>{
          list=res;
          if (list[0]) {
            callback(new Error(list[1]));
          }
          else {
            callback();
          }
     });

    };

    const validateCode = (rule, value, callback) => {
      if (value.length !== 6) {
        callback(new Error("请输入6位数的验证码"));
      } else {
        callback();
      }
    };
    return {
      msgText: "",
      msgTime: "",
      msgKey: false,
      loginForm: {
        phone: "",
        code: "",
        newPassword:"",
        newPassword1:""
      },
      loginRules: {
        phone: [{ required: true, trigger: "blur", validator: validatePhone }],
        code: [{ required: true, trigger: "blur", validator: validateCode }],
        newPassword:[{required:true,trigger:"blur",message:"请输入密码"}],
        newPassword1:[{required:true,trigger:"blur",message:"请输入确认密码"}]
      }
    };
  },
  created() {
    this.msgText = this.config.MSGINIT;
    this.msgTime = this.config.MSGTIME;
  },
  mounted() {

  },

  computed: {
    ...mapGetters(["tagWel"]),
    config() {
      return {
        MSGINIT: this.$t("login.msgText"),
        MSGSCUCCESS: this.$t("login.msgSuccess"),
        MSGTIME: 60
      };
    }
  },
  props: [],
  methods: {
    empty(){
      this.loginForm.phone="";
      this.loginForm.code="";
      this.loginForm.newPassword="";
      this.loginForm.newPassword1="";
    },
  async  isvalidatemobile(phone) {
      let list = [];
      let result = true;
      let msg = '';
      var isPhone = /^0\d{2,3}-?\d{7,8}$/;
      //增加134 减少|1349[0-9]{7}，增加181,增加145，增加17[678]
      if (!validatenull(phone)) {
        if (phone.length == 11) {
          if (isPhone.test(phone)) {
            msg = '手机号码格式不正确';
            list.push(result);
            list.push(msg);
            return list;
          } else {
            let user={};
            user["phone"]=phone;
            await  vilatePhone(user).then(res=>{
              debugger
              if(res.data.success){
                if(res.data.msg){
                  msg= '该手机号没有对应的用户';
                }else{
                  result = false;
                }
              }
            })
            list.push(result);
            list.push(msg);
            return list;
          }
        } else {
          msg = '手机号码长度不为11位';
          list.push(result);
          list.push(msg);
          return list;
        }
      } else {
        msg = '手机号码不能为空';
        list.push(result);
        list.push(msg);
        return list;
      }
    },
    subCodeLogin(){
      let that=this;
      this.$refs.loginForm.validate(function (valid ) {
        if (valid) {
          let user = {};
          user.phone = that.loginForm.phone;
          user.code = that.loginForm.code;
          user.newPassword = md5(that.loginForm.newPassword);
          user.newPassword1 = md5(that.loginForm.newPassword1);
          vilateCode(user).then(res => {
            if (res.data.success) {
              that.empty();
              that.$message({
                type: "success",
                message: "修改密码成功!"
              });
            }
          })
        }})
    },
    handleSend() {
      if (this.msgKey) return;
      let that=this;

      sendMsg(this.loginForm.phone).then(res=>{
        if(res.data.success){
          if (res.data.msg!="操作成功") {
            this.$message({
              type: "info",
              message:res.data.msg
            });
          }else{
            that.msgText = that.msgTime + that.config.MSGSCUCCESS;
            that.msgKey = true;
            const time = setInterval(() => {
              that.msgTime--;
              that.msgText = this.msgTime + that.config.MSGSCUCCESS;
              if (that.msgTime === 0) {
                that.msgTime = this.config.MSGTIME;
                that.msgText = this.config.MSGINIT;
                that.msgKey = false;
                clearInterval(time);
              }
            }, 1000);
          }
        }
      })
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.$store.dispatch("LoginByPhone", this.loginForm).then(() => {
            this.$router.push({ path: this.tagWel.value });
          });
        }
      });
    }
  }
};
</script>

<style>
.msg-text {
  display: block;
  width: 60px;
  font-size: 12px;
  text-align: center;
  cursor: pointer;
}
.msg-text.display {
  color: #ccc;
}
</style>
