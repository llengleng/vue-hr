<template>
  <div>
    <div class="permission_input">
      <el-input style="width: 300px;" placeholder="请输入角色英文名称..." v-model="role.name" size="small">
        <template slot="prepend">ROLE_</template>
      </el-input>
      <el-input
        style="width: 200px; margin-left: 5px;margin-right: 5px"
        placeholder="请输入角色中文名称..."
        v-model="role.namezh"
        size="small"
      ></el-input>
      <el-button
        type="primary"
        size="small"
        icon="el-icon-plus"
        @click="addRole"
        @keydown.enter.native="addRole"
      >添加角色</el-button>
    </div>
    <div class="permission_main">
      <el-collapse
        v-model="activeName"
        accordion
        size="small"
        @change="changeMenu"
        style="width:500px"
      >
        <el-collapse-item
          :title="item.namezh"
          :name="item.id"
          v-for="(item,index) in roles"
          :key="index"
        >
          <el-card class="box-card">
            <div slot="hander" class="clearfix">
              <span>可访问的资源</span>
              <el-button
                icon="el-icon-delete"
                @click="deleteRole(item)"
                style="float:right; padding:3px,0; color:#ff0000"
              ></el-button>
               </div>
              <div>
                <el-tree
                  :data="allMenus"
                  show-checkbox node-key="id"
                  :props="defaultProps"
                  ref="tree"
                  :key="index"
                  :default-checked-keys="selectedMenus"
                ></el-tree>
              <div class="update_btn">
                <el-button size="mini" @click="cancelUpdate">取消修改</el-button>
                <el-button size="mini" type="primary" @click="doUpdate(item.id,index)">确认修改</el-button>
              </div>
            </div>
          </el-card>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      role: {
        name: '',
        namezh: ''
      },
      activeName: -1,
      roles: [],
      allMenus: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      selectedMenus: []
    };
  },
  mounted() {
    this.initRoles();
  },
  methods: {
     initRoles() {
      this.getRequest("/system/basic/permission/roles").then(resp => {
        console.log(resp)
        if (resp) {
          this.roles = resp.obj;
        }
      });
    },
    changeMenu(rid) {
      if (rid) {
        this.initAllMenus();
        this.initSelectdMenu(rid);
      }
    },
     initAllMenus() {
      this.getRequest("/system/basic/permission/menus").then(resp => {
        console.log(resp)
        if (resp) {
          this.allMenus = resp.obj;
        }
      });
    },
     initSelectdMenu(rid) {
      this.getRequest("/system/basic/permission/mid/" + rid).then(resp => {
        if (resp) {
          console.log(resp);
          this.selectedMenus = resp.obj;
        }
      });
    },
    addRole() {
      if (this.role.name && role.nameZh) {
        this.postRequest("/system/basic/permission/role", this.role).then(
          resp => {
            if (resp) {
              this.initRoles();
              this.role.name = "";
              this.role.namezh = "";
            } else {
              this.$message.error("数据不能为空");
            }
          }
        );
      }
    },
    
    cancelUpdate() {
      this.activeName = -1;
    },
    doUpdate(rid, index) {
      let tree = this.$refs.tree[index];
      var selectedKeys = tree.getCheckedKeys(true);
      console.log(selectedKeys);
      let url = "/system/basic/permission/?rid" + rid;
      selectKeys.forEach(key => {
        url += "&mids=" + key;
      });
      this.putRequest(url).then(resp => {
        if (resp) {
          this.activeName = -1;
        }
      });
    },
    deleteRole() {
      this.$confirm(
        "此操作将永久删除" + role.nameZh + "角色，是否继续？",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(() => {
          this.deleteRequest("/system/basic/permission/role/" + role.id).then(
            resp => {
              if (resp) {
                this.initRoles();
              }
            }
          );
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消操作"
          });
        });
    }
  }
};
</script>

<style scoped>
.update_btn {
  display: flex;
  justify-self: flex-start;
  margin-top: 20px;
  margin-left: 240px;
}
</style>

