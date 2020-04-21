<template>
  <div>
    <el-form
      :model="loginForm"
      :rules="loginRules"
      ref="loginFormRef"
      label-width="0px"
      class="login"
    >
      <h3 class="login_title">系统登录</h3>
      <el-form-item label prop="username">
        <el-input v-model="loginForm.username" prefix-icon="iconfont icon-mima"></el-input>
      </el-form-item>
      <el-form-item label prop="password">
        <el-input v-model="loginForm.password" show-password prefix-icon="iconfont icon-ren"></el-input>
      </el-form-item>
      <el-checkbox v-model="checked" class="login_rem">记住我</el-checkbox>
      <el-form-item class="login-btn">
        <el-button type="primary" @click="login">登录</el-button>
        <el-button type="info" @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import {postKeyValueRequest} from '../utils/api'
export default {
  name: "Login",
  data() {
    return {
      checked: true,
      loginForm: {
        username: "admin",
        password: "123"
      },
      loginRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 3, max: 20, message: "长度在 3 到 20 个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    login() {
      // this.$refs.loginFormRef.validate(valid =>{
      //   if(!valid){
      //     return this.$message.error("用户名或密码不正确，请重新输入")
      //   }
      //   this.postKeyValueRequest('/doLogin',this.loginForm).then(resp=>{
      //     if(resp){
      //       this.$message.success("登录成功")
      //       window.sessionStorage.setItem('user',JSON.stringify(resp.obj));
      //       this.$router.replace('/home')
      //     }
      //   })
      // })




         this.$refs.loginFormRef.validate(async valid => {
        // console.log(valid)
        if (!valid) {
          return this.$message.error('用户名或密码格式不正确，请重新输入')
        }
        const resp = await this.postKeyValueRequest('/doLogin', this.loginForm)
        console.log(resp)
        if (resp) {
          console.log(resp.obj)
          this.$message.success('登录成功')
          // 1. 将登录成功之后的user保存到客户端的sessionStorage中
          //    1.1 项目中出了登录之外的其它API接口，必须在登录之后才能访问
          //    1.2 user只应在当前网站打开期间生效，所以将user保存在sessionStorage中
          window.sessionStorage.setItem('user', JSON.stringify(resp.obj));
          // 2. 通过编程式导航跳转到后台主页，路由地址是 /home
          this.$router.replace('/home')
        }
      })





      // this.$refs.loginFormRef.validate(async valid => {
      //   axios.post("/dologin",JSON.stringify(this.loginForm))
      //   .then(rst => {
      //     if(res.status == 200){
      //       this.$store.commit('',res,data);
      //       localStorage.username = this.$loginForm.username;
      //       localStorage.token_expire = res.data.expire;
      //       localStorage.token = res.data.token;
      //       this.$notify({
      //         title:'提示信息',
      //         message:'登录成功',
      //         type:'success'
      //       });
      //       this.$router.push({path:'/home'})
      //   }else{
      //     this.$notify({
      //       title:'提示信息',
      //         message:'用户名或密码错误',
      //         type:'error'
      //     });
      //   }
      //   })
      // });
    },
    reset() {
      console.log(this.$refs)
      this.$refs.loginFormRef.resetFields();
    }
  }
};
</script>

<style scoped>
.login {
  width: 350px;
  border: 1px solid #eaeaea;
  border-radius: 15px;
  box-shadow: 0 0 25px #cac6c6;
  padding: 15px 35px 15px 35px;
  background: #fff;
  position: absolute;
  left: 25%;
  top: 25%;
  transform: transform(-50%, -50%);
}
.login-title {
  width: 100%;
  margin: 15px auto 20px auto;
  text-align: center;
  color: #505458;
}
.login_rem {
  text-align: left;
  margin: 0px 0px 15px 0px;
}
.login-btn {
  display: flex;
  justify-content: flex-end;
}
</style>
  

