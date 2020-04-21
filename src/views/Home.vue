<template>
  <div>
    <el-header class="home_header">
      <span class="title">微人事</span>
      <el-dropdown class="user_info"  @command="commandHandler">
        <span class="el-dropdown-link">
            {{user.name}}
            <i>
              <img :src="user.userface" alt />
            </i>
          </span>
           <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="userinfo">个人中心</el-dropdown-item>
            <el-dropdown-item command="setting">设置</el-dropdown-item>
            <el-dropdown-item command="logout" divided>注销</el-dropdown-item>
          </el-dropdown-menu>
      </el-dropdown>
    </el-header>

    <el-container>
      <el-aside width="200px">
        <el-menu :default-openeds="['1', '3']">
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-message"></i>员工资料
            </template>
            <el-menu-item index="1-1">基本资料</el-menu-item>
          </el-submenu>

          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-menu"></i>人事管理
            </template>
            <el-menu-item index="2-1">员工奖罚</el-menu-item>
            <el-menu-item index="2-2">员工培训</el-menu-item>
            <el-menu-item index="2-3">员工调薪</el-menu-item>
            <el-menu-item index="2-3">员工调动</el-menu-item>
          </el-submenu>

          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-setting"></i>薪资管理
            </template>
            <el-menu-item index="2-1">工资账套管理</el-menu-item>
            <el-menu-item index="2-2">员工账套设置</el-menu-item>
            <el-menu-item index="2-3">工资表管理</el-menu-item>
            <el-menu-item index="2-3">月末处理</el-menu-item>
            <el-menu-item index="2-3">工资表查询</el-menu-item>
          </el-submenu>

          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-setting"></i>统计管理
            </template>
            <el-menu-item index="2-1">综合信息统计</el-menu-item>
            <el-menu-item index="2-2">员工积分统计</el-menu-item>
            <el-menu-item index="2-3">员工信息统计</el-menu-item>
            <el-menu-item index="2-3">员工记录统计</el-menu-item>
          </el-submenu>

          <el-submenu index="5">
            <template slot="title">
              <i class="el-icon-setting"></i>系统管理
            </template>
            <el-menu-item index="2-1">基础信息设置</el-menu-item>
            <el-menu-item index="2-2">系统管理</el-menu-item>
            <el-menu-item index="2-3">操作日志管理</el-menu-item>
            <el-menu-item index="2-3">操作员管理</el-menu-item>
            <el-menu-item index="2-1">备份恢复数据库</el-menu-item>
            <el-menu-item index="2-2">初始化数据库</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>

      <el-main>
         <el-breadcrumb
            separator-class="el-icon-arrow-right"
            v-if="this.$router.currentRoute.path !== '/home'">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>{{this.$router.currentRoute.name}}</el-breadcrumb-item>
          </el-breadcrumb>
          <div class="home_welcome" v-else>欢迎来到微人事</div>
          <router-view />
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      user: JSON.parse(window.sessionStorage.getItem("user"))
    };
  },
  mounted() {
    // axios
    //   .get("/home", JSON.stringify({ username: localStorage.username }))
    //   .then(res => {
    //     this.$store.commit("", res.data.data);
    //   });
  },
    computed: {
    routes() {
      return this.$store.state.routes;
    }
  },
  methods: {
    commandHandler(cmd) {
      if (cmd === "logout") {
        this.$confirm("此操作将注销登录, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.getRequest("/logout");
            // 1. 移除storage存储的数据
            window.sessionStorage.removeItem("user");
            // 2. 路由跳转到首页
            this.$router.replace("/");
            // 3. 清空store存储的菜单信息
            this.$store.commit("initRoutes", []);
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消操作"
            });
          });
      }
    }
  }
};
</script>

<style scoped>
.home_header {
  background: #729abd;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 15px;
  box-sizing: border-box;
}
.home_header .title {
  font-size: 30px;
  font-family: 思源黑体, serif;
  color: #ffffff;
}
.home_header .user_info {
  cursor: pointer;
}
.el-dropdown-link {
  display: flex;
  align-items: center;
  color: #eeeeee;
}
.el-dropdown-link img {
  width: 36px;
  height: 36px;
  border-radius: 18px;
  margin-left: 8px;
}
.home_welcome {
  text-align: center;
  font-size: 30px;
  color: #4078aa;
  padding-top: 50px;
}
</style>
};
</script>
