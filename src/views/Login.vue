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
        <el-button type="primary" @click="login()">登录</el-button>
        <el-button type="info" @click="reset()">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
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
      this.$refs.loginFormRef.validate( valid => {
        if (valid) {
          alert("登录成功!");
        } else {
          console.log("登录失败!!");
          return false;
        }
        // const result = axios.post("/login", this.loginForm);
      });
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
.login_rem{
  text-align: left;
  margin: 0px 0px 15px 0px;
}
.login-btn {
  display: flex;
  justify-content: flex-end;
}
</style>
  

