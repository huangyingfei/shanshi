<template>
  <div class="management">
    <!-- <h2>分享食谱</h2> -->
    <!-- 左边 -->
    <div class="onchange">
      <div class="const">
        <el-button @click="added" size="small" type="primary"
          >添加部门</el-button
        >
        <el-button size="small" type="primary">部门排序</el-button>
      </div>
      <div class="block">
        <p></p>
        <el-tree
          :data="data"
          node-key="id"
          v-loading="loadFlag"
          :default-expand-all="false"
          :expand-on-click-node="false"
        >
          <span class="custom-tree-node" slot-scope="{ node, data }">
            <span>{{ node.label }}</span>
            <span>
              <el-button
                v-if="data.into == 1"
                type="text"
                size="mini"
                @click="() => gate(data)"
              >
                添加
              </el-button>
              <el-button
                v-if="data.into != 1"
                type="text"
                size="mini"
                @click="() => defcustom(data)"
              >
                查看
              </el-button>
              <el-button
                type="text"
                size="mini"
                @click="() => remove(node, data)"
              >
                删除
              </el-button>
            </span>
          </span>
        </el-tree>
      </div>
    </div>
    <div class="consults">
      <div class="header">
        <span style="margin-right: 10px">关键字:</span>
        <el-input
          v-model="input"
          placeholder="请输入内容"
          style="width: 200px"
          size="small"
        ></el-input>
        <span style="margin-right: 10px; margin-left: 15px">职务:</span>
        <el-select
          style="width: 100px; height: 30px"
          v-model="callback"
          placeholder="请选择"
        >
          <el-option
            v-for="item in prompt"
            :key="item.value"
            :label="item.label"
            :value="item.value"
            style="width: 100px"
          >
          </el-option>
        </el-select>
        <span style="margin-right: 10px; margin-left: 15px">当前状态:</span>
        <el-select
          style="width: 100px; height: 30px"
          v-model="driver"
          placeholder="请选择"
        >
          <el-option
            v-for="item in mState"
            :key="item.value"
            :label="item.label"
            :value="item.value"
            style="width: 100px"
          >
          </el-option>
        </el-select>
        <span style="margin-right: 10px; margin-left: 15px">工号排序:</span>
        <el-select
          style="width: 100px; height: 30px"
          v-model="working"
          placeholder="请选择"
        >
          <el-option
            v-for="item in number"
            :key="item.value"
            :label="item.label"
            :value="item.value"
            style="width: 100px"
          >
          </el-option>
        </el-select>
      </div>
      <!-- 添加部门弹框 -->
      <el-dialog
        title="添加部门"
        width="30%"
        append-to-body
        :visible.sync="department"
        :close-on-click-modal="false"
      >
        <el-form
          :model="storage"
          :rules="rules"
          ref="ruleForm"
          :inline="true"
          label-width="105px"
          class="demo-ruleForm"
        >
          <el-form-item label="部门名称" style="width:355px">
            <el-input style="width:250px" v-model="storage.name"></el-input>
          </el-form-item>
          <el-form-item label="部门排序" style="width:355px">
            <el-input
              type="number"
              style="width:250px"
              v-model="storage.sorting"
            ></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="department = false">取 消</el-button>
          <el-button @click="Determine" type="primary">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 添加子部门弹框 -->
      <el-dialog
        title="添加部门"
        width="30%"
        append-to-body
        :visible.sync="obtained"
        :close-on-click-modal="false"
      >
        <el-form
          :model="acetone"
          :rules="rules"
          ref="ruleForm"
          :inline="true"
          label-width="105px"
          class="demo-ruleForm"
        >
          <el-form-item label="子部门名称" style="width:355px">
            <el-input style="width:250px" v-model="acetone.name"></el-input>
          </el-form-item>
          <el-form-item label="子部门排序" style="width:355px">
            <el-input style="width:250px" v-model="acetone.sorting"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="obtained = false">取 消</el-button>
          <el-button @click="atomic" type="primary">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 添加员工弹框 -->
      <el-dialog
        title="添加员工"
        width="60%"
        append-to-body
        :visible.sync="dateTime"
        :close-on-click-modal="false"
      >
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          :inline="true"
          label-width="105px"
          class="demo-ruleForm"
        >
          <el-form-item label="姓名" style="width:355px">
            <el-input style="width:250px" v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item label="性别" style="width:355px">
            <el-radio
              style="margin-left:30px"
              v-model="ruleForm.radio"
              label="1"
              >男</el-radio
            >
            <el-radio v-model="ruleForm.radio" label="2">女</el-radio>
          </el-form-item>
          <el-form-item style="width:355px" label="图片">
            <el-upload
              action="https://jsonplaceholder.typicode.com/posts/"
              list-type="picture-card"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove"
            >
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt />
            </el-dialog>
          </el-form-item>
          <el-form-item style="width:355px" label="婚姻状况">
            <el-radio
              style="margin-left:30px"
              v-model="ruleForm.marriages"
              label="1"
              >已婚</el-radio
            >
            <el-radio v-model="ruleForm.marriages" label="2">未婚</el-radio>
          </el-form-item>
          <el-form-item label="出生日期" style="width:355px">
            <el-date-picker
              style="width:250px"
              v-model="ruleForm.value1"
              type="date"
              placeholder="选择日期"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="手机号码" style="width:355px">
            <el-input style="width:250px" v-model="ruleForm.phones"></el-input>
          </el-form-item>
          <el-form-item label="民族" style="width:355px">
            <el-select
              style="width:250px"
              v-model="ruleForm.national"
              placeholder="请选择"
            >
              <el-option
                v-for="item in college"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="职务" style="width:355px">
            <el-select
              style="width:250px"
              v-model="ruleForm.position"
              placeholder="请选择"
            >
              <el-option
                v-for="item in vposition"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="所在年级/班级" style="width:355px">
            <el-select
              style="width:250px"
              v-model="ruleForm.getClass"
              placeholder="请选择"
            >
              <el-option
                v-for="item in loadClass"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="工号" style="width:355px">
            <el-input style="width:250px" v-model="ruleForm.thejob"></el-input>
          </el-form-item>
          <el-form-item style="width:355px">
            <span style="font-size: 12px;"
              >若为年级组长、保教主任、老师、保育员时需选择 所在年级/班级</span
            >
          </el-form-item>
          <el-form-item label="入职日期" style="width:355px">
            <el-date-picker
              style="width:250px"
              v-model="ruleForm.inductions"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
              type="date"
              placeholder="选择日期"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="参加工作日期" style="width:355px">
            <el-date-picker
              style="width:250px"
              v-model="ruleForm.workin"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
              type="date"
              placeholder="选择日期"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="工龄" style="width:355px">
            <el-input style="width:250px" v-model="ruleForm.process"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" style="width:355px">
            <el-input style="width:250px" v-model="ruleForm.emails"></el-input>
          </el-form-item>
          <el-form-item label="当前状态" style="width:355px">
            <el-select
              style="width:250px"
              v-model="ruleForm.ddeparture"
              placeholder="请选择"
            >
              <el-option
                v-for="item in emailslist"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="状态更新日期" style="width:355px">
            <el-date-picker
              style="width:250px"
              v-model="ruleForm.nextstate"
              type="date"
              placeholder="选择日期"
            >
            </el-date-picker>
          </el-form-item>
        </el-form>

        <div slot="footer" class="dialog-footer">
          <el-button @click="dateTime = false">取 消</el-button>
          <el-button type="primary">确 定</el-button>
          <el-button @click="stop" type="primary">计算</el-button>
        </div>
      </el-dialog>
      <!-- 弹框结束 -->
      <div class="network">
        <el-button
          style="margin-left: 20px"
          icon="el-icon-search"
          size="medium"
          type="primary"
          >搜索</el-button
        >
        <el-button style="margin-left: 20px" icon="el-icon-delete" size="medium"
          >清空</el-button
        >
        <el-button
          style="margin-left: 20px"
          size="medium"
          type="primary"
          icon="el-icon-plus"
          @click="addition"
          >添加员工</el-button
        >
        <el-button
          icon="el-icon-download"
          style="margin-left: 20px"
          size="medium"
          type="primary"
          >导出</el-button
        >
      </div>
      <!-- 表格数据 -->
      <div class="address">
        <el-table
          v-loading="loadFlag1"
          :data="tableData"
          border
          style="width: 100%"
        >
          <el-table-column label="序号" type="index" width="50" align="center">
          </el-table-column>
          <el-table-column
            prop="name"
            label="工号"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="foodName"
            label="姓名"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="foodName1"
            label="性别"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="reason"
            label="出生原因"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="reason"
            label="手机号"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="reason"
            label="职务"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="reason"
            label="所在班级"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="reason"
            label="所在班级"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="reason"
            label="入职日期"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="reason"
            label="当前状态"
            align="center"
          ></el-table-column>
          <!-- <el-table-column label="是否有效" width="120" align="center">
            <template slot-scope="scope">
              <p class="stop" v-if="scope.row.isActive == 0">是</p>
              <p style="color: #409eff" v-else-if="scope.row.isActive == 1">
                否
              </p>
            </template>
          </el-table-column> -->

          <!--操作格-->
          <el-table-column label="操作" width="220" align="center">
            <template slot-scope="scope">
              <el-button
                @click="editorTheme(scope.row, 2)"
                type="primary"
                size="small"
                icon="el-icon-edit"
                style="margin-left: 20px"
                >编辑</el-button
              >
              <el-button
                type="danger"
                size="small"
                icon="el-icon-delete"
                style="margin-left: 20px"
                @click="DeleteUser(scope.row)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    const data = [];
    return {
      data: JSON.parse(JSON.stringify(data)),
      loadFlag: false, //加载flag
      loadFlag1: false, //加载flag
      dateTime: false, //弹框
      department: false, //部门弹框
      obtained: false, //子部门弹框
      acetone: {
        name: "", //子部门名称
        sorting: "" //部门排序
      },
      storage: {
        name: "", //部门名称
        sorting: "" //部门排序
      },
      ruleForm: {
        name: "", //姓名
        radio: "", //性别
        marriages: "", //婚姻状况
        value1: "", //出生日期
        phones: "", //手机号码
        national: "", //民族
        position: "", //职务
        getClass: "", //班级
        thejob: "", //工号
        inductions: "", //入职日期
        workin: "", //参加工作日期
        process: "", //工龄
        emails: "", //邮箱
        ddeparture: "", //当前状态
        nextstate: "", //状态更新日期
        desc: "",
        resource: ""
      },
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        }
      ],
      emailslist: [
        //当前状态
        {
          value: "1",
          label: "在职"
        },
        {
          value: "2",
          label: "离职"
        },
        {
          value: "3",
          label: "停职"
        },
        {
          value: "4",
          label: "退休"
        }
      ],
      loadClass: [
        //
        {
          value: "1",
          label: "中班"
        },
        {
          value: "2",
          label: "小班"
        }
      ],
      vposition: [
        //职务
        {
          value: "1",
          label: "园长"
        },
        {
          value: "2",
          label: "老师"
        }
      ],
      college: [
        {
          value: "1",
          label: "汉族"
        },
        {
          value: "2",
          label: "回族"
        }
      ],
      prompt: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        },
        {
          value: "选项3",
          label: "蚵仔煎"
        }
      ],
      callback: "", //职务搜索
      mState: [
        {
          value: "1",
          label: "全部"
        },
        {
          value: "2",
          label: "在职"
        },
        {
          value: "3",
          label: "离职"
        },
        {
          value: "4",
          label: "停职"
        },
        {
          value: "5",
          label: "退休"
        }
      ],
      driver: "", //当前状态
      number: [
        {
          value: "1",
          label: "升序"
        },
        {
          value: "2",
          label: "降序"
        }
      ],
      working: ""
    };
  },
  beforeMount() {
    this.getStorage(); //获取部门树形结构
  },
  methods: {
    //计算
    stop() {
      console.log(this.ruleForm.workin);
      let add = this.ruleForm.workin.replace(/-/g, "");
      console.log(add);
      let topyear = add.substring(0, 4);
      let topmonth = add.substring(4, 6);
      let topday = add.substring(6, 9);

      var myDate = new Date();
      // let vtop = d.getFullYear();
      console.log(myDate.getMonth());
      // let myyear=myDate
      let going = myDate.getFullYear() - topyear - 1;
      // console.log(going);
      if (
        topmonth < myDate.getMonth() ||
        (topmonth == myDate.getMonth() && topday <= myDate.getDate())
      ) {
        going++;
      }
      console.log(going);
      this.ruleForm.process = going;
    },
    //添加员工弹框
    addition() {
      this.dateTime = true;
    },
    added() {
      this.department = true;
    },
    gate(data) {
      // console.log(data);
      this.adds = data.id;
      console.log(this.adds);
      this.obtained = true;
    },

    //添加子部门
    atomic() {
      this.$axios
        .post(`api/blade-food/teacherdept/submit`, {
          parentId: this.adds, //上级ID
          deptName: this.acetone.name, //部门名称
          level: this.acetone.sorting //部门排序
        })
        .then(res => {
          this.getStorage();
          this.obtained = false;
          this.acetone.name = "";
          this.acetone.storage = "";
          console.log(res);
          this.$message({
            message: "添加成功",
            type: "success"
          });
        })
        .catch(() => {
          this.$message.error("添加失败");
        });
    },
    //添加部门
    Determine() {
      this.$axios
        .post(`api/blade-food/teacherdept/submit`, {
          deptName: this.storage.name, //部门名称
          level: this.storage.sorting //部门排序
        })
        .then(res => {
          this.getStorage();
          this.department = false;
          this.storage.name = "";
          this.storage.storage = "";
          console.log(res);
          this.$message({
            message: "添加成功",
            type: "success"
          });
        })
        .catch(() => {
          this.$message.error("添加失败");
        });
    },
    //删除部门
    remove(node, data) {
      // console.log(data);
      let addid = `?ids=${data.id}`;
      this.$confirm("确认删除该部门?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$axios
            .get(`api/blade-food/teacherdept/remove` + addid, {})
            .then(res => {
              // console.log(res);
              this.getStorage();
              this.$message.success("删除成功");
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //查看详情
    defcustom(data) {
      // console.log(data);
      this.view = data.id;
      this.$axios
        .get(`api/blade-food/teacherdept/detail?id=${this.view}`, {})
        .then(res => {
          console.log(res);
        });
    },
    //获取部门树形结构
    getStorage() {
      this.loadFlag = true;
      this.$axios.get(`api/blade-food/teacherdept/tree`).then(res => {
        this.loadFlag = false;
        this.factors = res.data.data;
        // console.log(this.factors);
        let auto = [];
        this.factors.forEach((item, index) => {
          // console.log(item);
          auto[index] = {
            id: item.id,
            label: item.title,
            into: item.level
          };
          auto[index].children = [];
          if (item.children) {
            item.children.forEach((item1, index1) => {
              auto[index].children[index1] = {
                id: item1.id,
                label: item1.title,
                into: item1.level
              };
            });
          }
        });
        console.log(auto);
        this.data = auto;
      });
    }
  }
};
</script>

<style scoped>
.management {
  width: 100%;
  height: 700px;
  background-color: #fff;
  display: flex;
  margin-bottom: 40px;
}
.onchange {
  width: 24%;
  height: 700px;
  /* background-color: red; */
  border-right: 1px solid #e0e0e0;
}
.consults {
  width: 75%;
  height: 700px;
  /* background-color: yellow; */
  margin-left: 10px;
}
.const {
  width: 250px;
  height: 50px;

  margin-top: 15px;
  text-align: center;
  line-height: 50px;
}
.header {
  width: 98%;
  height: 50px;
  line-height: 50px;
  font-size: 13px;
  /* background-color: red; */
  margin-left: 10px;
  margin-top: 10px;
}
.network {
  width: 100%;
  height: 50px;
  /* background-color: yellow; */
  line-height: 50px;
}
</style>
