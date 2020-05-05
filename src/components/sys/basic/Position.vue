<template>
  <div>
    <div style="display: flex;justify-content: space-between">
    <div>
      <el-input
        placeholder="添加职位"
        class="input_type"
        size="small"
        prefix-icon="el-icon-plus"
        @keydown.enter.native="addPosition"
        v-model="pos.name"
      ></el-input>
      <el-button type="primary" icon="el-icon-plus" @click="addPosition">添加</el-button>
    </div>
    <div>
      <el-upload
        :show-file-list="false"
        :before-upload="beforeUpload"
        :on-success="onSuccess"
        :on-error="onError"
        :disabled="importBtnDisabled"
        style="display: inline-flex; margin-right: 8px"
        action="/system/basic/pos/import">
        <el-button type="success" :icon="importBtnIcon" size="small">{{importBtnText}}</el-button>
      </el-upload>
      <el-button type="success" icon="el-icon-download" size="small" @click="pullData">导出数据</el-button>
    </div>
    </div>

    <div>
      <el-table
        :data="positions"
        stripe
        border
        type="small"
        style="width: 70%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="id" label="编号" width="56"></el-table-column>
        <el-table-column prop="name" label="职位名称" width="180"></el-table-column>
        <el-table-column prop="createDate" label="创建时间" width="200"></el-table-column>
        <el-table-column label="操作" fixed="right">
          <template slot-scope="scope">
            <el-button size="mini" @click="showEditDialog(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pageAble">
        <el-pagination
          background
          layout="sizes,prev, pager, next,jumper,->,total,slot"
          :total="pageInfo.total"
          :page-sizes="[5,10,20,50,100]"
          :page-size="5"
          @current-change="handleCurrentChange"
          @size-change="handleSizeChange"
        ></el-pagination>
      </div>
      <el-button
        type="danger"
        size="small"
        style="margin-top: 8px"
        @click="deleteMany"
        :disabled="multipleSelection.length === 0"
      >批量删除</el-button>
    </div>
    <el-dialog title="修改职位" :visible.sync="dialogVisible" width="30%">
      <div>
        <el-tag>职位名称</el-tag>
        <el-input class="update_input" size="small" v-model="updatePos.name"></el-input>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="doUpdate" size="small">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "Position",
  data() {
    return {
      pos: {
        name: ""
      },
      positions: [],
      updatePos: {
        name: ""
      },
      pageInfo: {
        total: 0,
        page: 1,
        size: 5
      },
      dialogVisible: false,
      multipleSelection: [],
      importBtnDisabled: false,
      importBtnText: '导入数据',
      importBtnIcon: 'el-icon-upload2',
    }
  },
  methods: {
    async initPositions() {
      const resp = await this.getRequest(
        "/system/basic/pos/?page=" +
          this.pageInfo.page +
          "&size=" +
          this.pageInfo.size
      );
      if (resp) {
        this.positions = resp.obj.list;
        this.pageInfo.total = resp.obj.total;
      }
    },

    async addPosition() {
      if (this.pos.name) {
        const resp = await this.postRequest("/system/basic/pos/", this.pos);
        this.$message.success("添加成功");
        if (resp) {
          this.initPositions();
          this.pos.name = "";
        }
      } else {
        this.$message.warning("职位名称不能为空");
      }
    },

    showEditDialog(index, data) {
      Object.assign(this.updatePos, data);
      this.dialogVisible = true;
    },

    async doUpdate() {
      const resp = await this.putRequest("/system/basic/pos/", this.updatePos);
      if (resp) {
        this.initPositions();
        this.updatePos.name = "";
        this.dialogVisible = false;
      }
    },

    handleCurrentChange(currentPage) {
      this.pageInfo.page = currentPage;
      this.initPositions();
    },

    handleSizeChange(currentSize) {
      this.pageInfo.size = currentSize;
      this.initPositions();
    },

    onSuccess(response, file, fileList) {
      this.importBtnText = '导入数据'
      this.importBtnIcon = 'el-icon-upload2'
      this.importBtnDisabled = false
      this.initPositions()
    },
    onError(err, file, fileList) {
      this.importBtnText = '导入数据'
      this.importBtnIcon = 'el-icon-upload2'
      this.importBtnDisabled = false
    },
    beforeUpload () {
      this.importBtnText = '正在导入'
      this.importBtnIcon = 'el-icon-loading'
      this.importBtnDisabled = true
    },
    pullData() {
       window.open('/system/basic/pos/export', '_parent')
    },

    handleDelete(index, data) {
      this.$confirm(
        "此操作将永久删除" + data.name + "职位, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(() => {
          this.deleteRequest("/system/basic/pos/" + data.id).then(resp => {
            this.initPositions();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消操作"
          });
        });
    },

    handleSelectionChange(val) {
      console.log(val);
      this.multipleSelection = val;
    },

    deleteMany() {
      this.$confirm(
        "此操作将永久删除" +
          this.multipleSelection.length +
          "条记录, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(() => {
          let ids = "?";
          this.multipleSelection.forEach(item => {
            ids += "ids=" + item.id + "&";
          });
          this.deleteRequest("/system/basic/pos/" + ids).then(resp => {
            this.initPositions();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消操作"
          });
        });
    }
  },
  mounted() {
    this.initPositions();
  }
};
</script>

<style scoped>
.input_type {
  width: 300px;
  margin-right: 8px;
  margin-bottom: 16px;
}
.update_input {
  width: 200px;
  margin-left: 8px;
}
.pageable {
    display: flex;
    justify-content: flex-start;
    margin-top: 8px;
  }
</style>