<template>
  <div>
    <div class="management">
      <!-- <h2>分享食谱</h2> -->
      <!-- 左边 -->
      <div class="onchange">
        <div class="const">
          <el-button @click="added(1)" size="small" type="primary"
            >添加部门</el-button
          >
          <!-- <el-button size="small" type="primary">部门排序</el-button> -->
        </div>
        <div class="block">
          <p></p>
          <el-tree
            :data="data"
            node-key="id"
            v-loading="loadFlag"
            :default-expand-all="false"
            :expand-on-click-node="false"
            @node-click="handleNodeClick"
          >
            <span class="custom-tree-node" slot-scope="{ node, data }">
              <span>{{ node.label }}</span>
              <span>
                <!-- <el-button
                  type="text"
                  size="mini"
                  @click="() => defcustom(data)"
                >
                  查看
                </el-button> -->
                <el-button
                  v-if="data.view == 0"
                  type="text"
                  size="mini"
                  @click.stop="() => editorBase(data, 2)"
                >
                  编辑
                </el-button>
                <el-button
                  v-if="data.tment == 1"
                  type="text"
                  size="mini"
                  @click.stop="() => setDepartment(data, 2)"
                >
                  编辑子部门
                </el-button>
                <el-button
                  v-if="data.into == 1"
                  type="text"
                  size="mini"
                  @click.stop="() => gate(data, 1)"
                >
                  添加
                </el-button>

                <el-button
                  type="text"
                  size="mini"
                  @click.stop="() => remove(node, data)"
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
          title="部门"
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
            <el-form-item label="部门名称" style="width: 355px">
              <el-input
                maxlength="10"
                show-word-limit
                style="width: 250px"
                v-model="storage.name"
              ></el-input>
            </el-form-item>
            <!-- <el-form-item label="部门排序" style="width: 355px">
            <el-input
              type="number"
              style="width: 250px"
              v-model="storage.sorting"
            ></el-input>
          </el-form-item> -->
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="department = false">取 消</el-button>
            <el-button
              v-if="this.departments == 1"
              @click="Determine"
              type="primary"
              >确 定</el-button
            >
            <el-button
              v-if="this.departments == 2"
              @click="selection"
              type="primary"
              >编辑确定</el-button
            >
          </div>
        </el-dialog>
        <!-- 添加子部门弹框 -->
        <el-dialog
          title="子部门"
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
            <el-form-item label="子部门名称" style="width: 355px">
              <el-input
                maxlength="10"
                show-word-limit
                style="width: 250px"
                v-model="acetone.name"
              ></el-input>
            </el-form-item>
            <!-- <el-form-item label="子部门排序" style="width: 355px">
              <el-input
                style="width: 250px"
                v-model="acetone.sorting"
              ></el-input>
            </el-form-item> -->
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="obtained = false">取 消</el-button>
            <el-button v-if="this.support == 0" @click="atomic" type="primary"
              >确 定</el-button
            >
            <el-button
              v-if="this.support == 1"
              @click="addNotify"
              type="primary"
              >编辑确定</el-button
            >
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
            <el-form-item label="姓名" style="width: 355px" prop="name">
              <el-input style="width: 250px" v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="性别" style="width: 355px">
              <el-radio
                style="margin-left: 30px"
                v-model="ruleForm.radio"
                label="1"
                >男</el-radio
              >
              <el-radio v-model="ruleForm.radio" label="2">女</el-radio>
            </el-form-item>
            <el-form-item style="width: 355px" label="图片">
              <el-upload
                action="api/blade-resource/oss/endpoint/put-file"
                list-type="picture-card"
                :limit="imgLimit"
                :file-list="productImgs"
                :on-exceed="handleExceed"
                :on-preview="handlePictureCardPreview"
                :before-upload="beforeAvatarUpload"
                :on-success="handleAvatarSuccess"
                :on-remove="handleRemove"
                :headers="headerObj"
              >
                <!-- <img v-if="dialogImageUrl" :src="dialogImageUrl" class="avatar" /> -->
                <i class="el-icon-plus"></i>
              </el-upload>
              <span style="color:#e0e0e0;  font-size: 11px;"
                >上传图片不能超过2M 只能是JPG PNG格式</span
              >
              <el-dialog append-to-body :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImageUrl" alt />
              </el-dialog>
            </el-form-item>
            <el-form-item style="width: 355px" label="婚姻状况">
              <el-radio
                style="margin-left: 30px"
                v-model="ruleForm.marriages"
                label="0"
                >已婚</el-radio
              >
              <el-radio v-model="ruleForm.marriages" label="1">未婚</el-radio>
            </el-form-item>
            <el-form-item label="出生日期" style="width: 355px" prop="value1">
              <el-date-picker
                v-model="ruleForm.value1"
                style="width: 250px"
                format="yyyy 年 MM 月 dd 日 HH 时 mm 分 ss 秒 "
                value-format="yyyy-MM-dd HH:mm:ss"
                type="datetime"
                placeholder="选择日期时间"
              >
              </el-date-picker>
            </el-form-item>
            <el-form-item label="手机号码" style="width: 355px" prop="phones">
              <el-input
                style="width: 250px"
                v-model="ruleForm.phones"
              ></el-input>
            </el-form-item>
            <el-form-item label="民族" style="width: 355px">
              <el-select
                style="width: 250px"
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
            <el-form-item label="职务" style="width: 355px" prop="position">
              <el-select
                clearable
                style="width: 250px"
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
            <el-form-item label="所在年级/班级" style="width: 355px">
              <el-select
                style="width: 250px"
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
            <el-form-item label="工号" style="width: 355px">
              <el-input
                style="width: 250px"
                v-model="ruleForm.thejob"
              ></el-input>
            </el-form-item>
            <el-form-item style="width: 355px">
              <span style="font-size: 12px"
                >若为年级组长、保教主任、老师、保育员时需选择
                所在年级/班级</span
              >
            </el-form-item>
            <el-form-item
              label="入职日期"
              style="width: 355px"
              prop="inductions"
            >
              <!-- <el-date-picker
              style="width: 250px"
              v-model="ruleForm.inductions"
              format="yyyy 年 MM 月 dd 日"
              type="date"
              placeholder="选择日期"
            >
            </el-date-picker> -->
              <el-date-picker
                v-model="ruleForm.inductions"
                style="width: 250px"
                format="yyyy 年 MM 月 dd 日 HH 时 mm 分 ss 秒 "
                value-format="yyyy-MM-dd HH:mm:ss"
                type="datetime"
                placeholder="选择日期时间"
              >
              </el-date-picker>
            </el-form-item>
            <el-form-item label="参加工作日期" style="width: 355px">
              <!--  -->
              <!-- <el-date-picker
              style="width: 250px"
              @change="stop()"
              v-model="ruleForm.workin"
              format="yyyy 年 MM 月 dd 日"
              type="date"
              placeholder="选择日期"
            >
            </el-date-picker> -->
              <el-date-picker
                v-model="ruleForm.workin"
                style="width: 250px"
                @change="stop()"
                format="yyyy 年 MM 月 dd 日 HH 时 mm 分 ss 秒 "
                value-format="yyyy-MM-dd HH:mm:ss"
                type="datetime"
                placeholder="选择日期时间"
              >
              </el-date-picker>
            </el-form-item>
            <el-form-item label="工龄" style="width: 355px">
              <el-input
                style="width: 250px"
                v-model="ruleForm.process"
              ></el-input>
            </el-form-item>
            <el-form-item label="证件号码" style="width: 355px">
              <el-input
                style="width: 250px"
                v-model="ruleForm.update"
              ></el-input>
            </el-form-item>
            <el-form-item label="工作单位" style="width: 355px">
              <el-input
                style="width: 250px"
                v-model="ruleForm.worker"
              ></el-input>
            </el-form-item>
            <el-form-item label="邮箱" style="width: 355px">
              <el-input
                style="width: 250px"
                v-model="ruleForm.emails"
              ></el-input>
            </el-form-item>
            <el-form-item label="当前状态" style="width: 355px">
              <el-select
                style="width: 250px"
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
            <el-form-item label="状态更新日期" style="width: 355px">
              <!-- <el-date-picker
              style="width: 250px"
              v-model="ruleForm.nextstate"
              format="yyyy 年 MM 月 dd 日"
              type="date"
              placeholder="选择日期"
            >
            </el-date-picker> -->
              <el-date-picker
                v-model="ruleForm.nextstate"
                format="yyyy 年 MM 月 dd 日 HH 时 mm 分 ss 秒 "
                value-format="yyyy-MM-dd HH:mm:ss"
                type="datetime"
                placeholder="选择日期时间"
              >
              </el-date-picker>
            </el-form-item>
          </el-form>

          <div slot="footer" class="dialog-footer">
            <el-button @click="dateTime = false">取 消</el-button>
            <!-- <el-button @click="resetForm('ruleForm')">重置</el-button> -->
            <el-button
              v-if="this.under == 1"
              @click="cameras('ruleForm')"
              type="primary"
              >确 定</el-button
            >
            <el-button v-if="this.under == 2" @click="edittab" type="primary"
              >编辑 确定</el-button
            >
            <!-- <el-button @click="stop" type="primary">计算</el-button>  -->
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
          <el-button
            style="margin-left: 20px"
            icon="el-icon-delete"
            size="medium"
            >清空</el-button
          >
          <el-button
            style="margin-left: 20px"
            size="medium"
            type="primary"
            icon="el-icon-plus"
            @click="addition(1)"
            >添加员工</el-button
          >
          <!-- <el-button
          icon="el-icon-download"
          style="margin-left: 20px"
          size="medium"
          type="primary"
          >导出</el-button
        > -->
        </div>
        <!-- 表格数据 -->
        <div class="address">
          <el-table
            v-loading="loadFlag1"
            :data="tableData"
            border
            style="width: 100%"
          >
            <el-table-column
              label="序号"
              type="index"
              width="50"
              align="center"
            >
            </el-table-column>
            <el-table-column
              prop="jobNumber"
              label="工号"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="name"
              label="姓名"
              align="center"
            ></el-table-column>
            <el-table-column prop="sex" label="性别" align="center">
              <template slot-scope="scope">
                <p v-if="scope.row.sex == 1">男</p>
                <p v-else-if="scope.row.sex == 2">
                  女
                </p>
              </template>
            </el-table-column>
            <el-table-column
              prop="birthDate"
              label="出生日期"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="mobile"
              label="手机号"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="post"
              label="职务"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="reason"
              label="所在班级"
              align="center"
            ></el-table-column>

            <el-table-column
              prop="entryTime"
              label="入职日期"
              align="center"
            ></el-table-column>
            <el-table-column prop="stutas" label="当前状态" align="center">
              <template slot-scope="scope">
                <p v-if="scope.row.stutas == 1">在职</p>
                <p v-else-if="scope.row.stutas == 2">
                  离职
                </p>
                <p v-else-if="scope.row.stutas == 3">
                  停职
                </p>
                <p v-else-if="scope.row.status == 4">
                  退休
                </p>
              </template>
            </el-table-column>
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
                  type="text"
                  size="small"
                  icon="el-icon-edit"
                  style="margin-left: 20px"
                  >编辑</el-button
                >
                <el-button
                  type="text"
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
      dialogImageUrl: "", //图片
      imgLimit: 1, //文件个数
      productImgs: [],
      dialogVisible: false,
      headerObj: {
        "Blade-Auth": ""
      }, //上传图片请求头
      acetone: {
        id: "", //ID
        name: "", //子部门名称
        sorting: "" //部门排序
      },
      storage: {
        id: "",
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
        update: "", //证件号码
        worker: "", //工作单位
        ddeparture: "", //当前状态
        nextstate: "", //状态更新日期
        desc: "",
        resource: ""
      },
      rules: {
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        phones: [
          { required: true, message: "请输入手机号码", trigger: "blur" }
        ],
        value1: [
          { required: true, message: "请选择出生日期", trigger: "blur" }
        ],
        position: [{ required: true, message: "请选择职务", trigger: "blur" }],
        inductions: [
          { required: true, message: "请选择入职日期", trigger: "blur" }
        ]
      },
      tableData: [],
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
          value: "园长",
          label: "园长"
        },
        {
          value: "副园长",
          label: "副园长"
        },
        {
          value: "保健园",
          label: "保健园"
        },
        {
          value: "老师",
          label: "老师"
        },
        {
          value: "保教主任",
          label: "保教主任"
        },
        {
          value: "保育员",
          label: "保育员"
        },
        {
          value: "年级组长",
          label: "年级组长"
        },
        {
          value: "教研组长",
          label: "教研组长"
        },
        {
          value: "后勤主任",
          label: "后勤主任"
        },
        {
          value: "炊事员",
          label: "炊事员"
        },
        {
          value: "保洁",
          label: "保洁"
        },
        {
          value: "保安",
          label: "保安"
        },
        {
          value: "财务",
          label: "财务"
        },
        {
          value: "跟车老师",
          label: "跟车老师"
        },
        {
          value: "办公司人员",
          label: "办公司人员"
        },
        {
          value: "办事员",
          label: "办事员"
        },
        {
          value: "其他",
          label: "其他"
        }
      ],
      college: [
        {
          label: "汉族",
          value: 1
        },
        {
          label: "满族",
          value: 2
        },
        {
          label: "蒙古族",
          value: 3
        },
        {
          label: "回族",
          value: 4
        },
        {
          label: "藏族",
          value: 5
        },
        {
          label: "维吾尔族",
          value: 6
        },
        {
          label: "苗族",
          value: 7
        },
        {
          label: "彝族",
          value: 8
        },
        {
          label: "壮族",
          value: 9
        },
        {
          label: "布依族",
          value: 10
        },
        {
          label: "侗族",
          value: 11
        },
        {
          label: "瑶族",
          value: 12
        },
        {
          label: "白族",
          value: 13
        },
        {
          label: "土家族",
          value: 14
        },
        {
          label: "哈尼族",
          value: 15
        },
        {
          label: "哈萨克族",
          value: 16
        },
        {
          label: "傣族",
          value: 17
        },
        {
          label: "黎族",
          value: 18
        },
        {
          label: "傈僳族",
          value: 19
        },
        {
          label: "佤族",
          value: 20
        },
        {
          label: "畲族",
          value: 21
        },
        {
          label: "高山族",
          value: 22
        },
        {
          label: "拉祜族",
          value: 23
        },
        {
          label: "水族",
          value: 24
        },
        {
          label: "东乡族",
          value: 25
        },
        {
          label: "纳西族",
          value: 26
        },
        {
          label: "景颇族",
          value: 27
        },
        {
          label: "柯尔克孜族",
          value: 28
        },
        {
          label: "土族",
          value: 29
        },
        {
          label: "达斡尔族",
          value: 30
        },
        {
          label: "仫佬族",
          value: 31
        },
        {
          label: "羌族",
          value: 32
        },
        {
          label: "布朗族",
          value: 33
        },
        {
          label: "撒拉族",
          value: 34
        },
        {
          label: "毛南族",
          value: 35
        },
        {
          label: "仡佬族",
          value: 36
        },
        {
          label: "锡伯族",
          value: 37
        },
        {
          label: "阿昌族",
          value: 38
        },
        {
          label: "普米族",
          value: 39
        },
        {
          label: "朝鲜族",
          value: 40
        },
        {
          label: "塔吉克族",
          value: 41
        },
        {
          label: "怒族",
          value: 42
        },
        {
          label: "乌孜别克族",
          value: 43
        },
        {
          label: "俄罗斯族",
          value: 44
        },
        {
          label: "鄂温克族",
          value: 45
        },
        {
          label: "德昂族",
          value: 46
        },
        {
          label: "保安族",
          value: 47
        },
        {
          label: "裕固族",
          value: 48
        },
        {
          label: "京族",
          value: 49
        },
        {
          label: "塔塔尔族",
          value: 50
        },
        {
          label: "独龙族",
          value: 51
        },
        {
          label: "鄂伦春族",
          value: 52
        },
        {
          label: "赫哲族",
          value: 53
        },
        {
          label: "门巴族",
          value: 54
        },
        {
          label: "珞巴族",
          value: 55
        },
        {
          label: "基诺族",
          value: 56
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
      working: "",
      under: "", //添加员工下标
      edits: "", //ID
      view: "",
      departments: "", //添加部门
      support: "" //添加子部门
    };
  },
  beforeMount() {
    this.getStorage(); //获取部门树形结构
    this.getToolkit(); //获取班级
    this.Takeone();
  },
  methods: {
    //初始数据获取token
    Takeone() {
      let str = JSON.parse(localStorage.getItem("saber-token"));
      this.headerObj["Blade-Auth"] = `bearer ${str.content}`;
      console.log(this.headerObj);
    },
    resetForm(formName) {
      console.log(12321);
      this.$refs[formName].resetFields();
    },
    //添加员工
    cameras(formName) {
      // console.log(this.ruleForm.name); //姓名
      // console.log(this.ruleForm.radio); //性别
      // console.log(this.ruleForm.marriages); //婚姻状况
      // console.log(this.ruleForm.value1); //出生日期
      // console.log(this.ruleForm.phones); //手机号码
      // console.log(this.ruleForm.national); //民族
      // console.log(this.ruleForm.position); //职务
      // console.log(this.ruleForm.getClass); //班级
      // console.log(this.ruleForm.thejob); //工号
      // console.log(this.ruleForm.inductions); //入职日期
      // console.log(this.ruleForm.workin); //参加工作日期
      // console.log(this.ruleForm.process); //工龄
      // console.log(this.ruleForm.update); //证件号码
      // console.log(this.ruleForm.worker); //工作单位
      // console.log(this.ruleForm.emails); //邮箱
      // console.log(this.ruleForm.ddeparture); //当前状态
      // console.log(this.ruleForm.nextstate); //状态更新日期
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$axios
            .post(`api/blade-food/teacher/save`, {
              deptId: this.view,
              name: this.ruleForm.name, //姓名
              sex: this.ruleForm.radio, //性别
              pic: this.dialogImageUrl, //图片
              marriage: this.ruleForm.marriages, //婚姻状况
              birthDate: this.ruleForm.value1, //出生日期
              mobile: this.ruleForm.phones, //手机号码
              nation: this.ruleForm.national, //民族
              post: this.ruleForm.position, //职务
              jobNumber: this.ruleForm.thejob, //工号
              entryTime: this.ruleForm.inductions, //入职日期
              workTime: this.ruleForm.workin, //参加工作日期
              cardNo: this.ruleForm.update, //证件号码
              workUnit: this.ruleForm.worker, //工作单位
              email: this.ruleForm.emails, //邮箱
              stutas: this.ruleForm.ddeparture, //当前状态
              changeDate: this.ruleForm.nextstate //状态变更日期
            })
            .then(res => {
              // console.log(res);

              this.dateTime = false;
              this.$message({
                message: "添加成功",
                type: "success"
              });
              this.loadFlag1 = true;
              this.$axios
                .get(`api/blade-food/teacher/list?deptId=${this.view}`, {})
                .then(res => {
                  // console.log(res);
                  // this.store = res.data.data.records;
                  // console.log(this.store);
                  this.$message({
                    message: "查询成功",
                    type: "success"
                  });
                  this.loadFlag1 = false;
                  this.tableData = res.data.data.records;
                })
                .catch(() => {
                  this.$message.error("查询失败");
                });
            })
            .catch(() => {
              this.$message.error("添加失败");
            });
        } else {
          // console.log("error submit!!");
          this.$message({
            message: "信息未填全",
            type: "warning"
          });
          return false;
        }
      });
    },
    //编辑保存
    edittab() {
      this.$axios
        .post(`api/blade-food/teacher/update`, {
          id: this.edits,
          name: this.ruleForm.name, //姓名
          sex: this.ruleForm.radio, //性别
          pic: this.dialogImageUrl, //图片
          marriage: this.ruleForm.marriages, //婚姻状况
          birthDate: this.ruleForm.value1, //出生日期
          mobile: this.ruleForm.phones, //手机号码
          nation: this.ruleForm.national, //民族
          post: this.ruleForm.position, //职务
          jobNumber: this.ruleForm.thejob, //工号
          entryTime: this.ruleForm.inductions, //入职日期
          workTime: this.ruleForm.workin, //参加工作日期
          cardNo: this.ruleForm.update, //证件号码
          workUnit: this.ruleForm.worker, //工作单位
          email: this.ruleForm.emails, //邮箱
          stutas: this.ruleForm.ddeparture, //当前状态
          changeDate: this.ruleForm.nextstate //状态变更日期
        })
        .then(res => {
          console.log(res);

          this.$message({
            message: "编辑成功",
            type: "success"
          });

          this.dateTime = false;
          this.loadFlag1 = true;
          this.$axios
            .get(`api/blade-food/teacher/list?deptId=${this.view}`, {})
            .then(res => {
              // console.log(res);
              // this.store = res.data.data.records;
              // console.log(this.store);
              this.$message({
                message: "查询成功",
                type: "success"
              });
              this.loadFlag1 = false;
              this.tableData = res.data.data.records;
            })
            .catch(() => {
              this.$message.error("查询失败");
            });
        })
        .catch(() => {
          this.$message.error("编辑失败");
        });
    },
    //计算工龄
    stop() {
      //  let add = this.ruleForm.workin.replace(/-/g, "");
      //   console.log(add);
      //   let topyear = add.substring(0, 4);
      //   let topmonth = add.substring(4, 6);
      //   let topday = add.substring(6, 9);

      let add = this.ruleForm.workin;
      // console.log(this.ruleForm.workin);

      let afterTime = new Date(add).getTime();
      var myDate = new Date().getTime();
      let year = ((myDate - afterTime) / (24 * 60 * 60 * 1000 * 365)).toFixed(
        0
      );
      console.log(year);
      this.ruleForm.process = year;
      // console.log(myDate);
      // let vtop = d.getFullYear();
      // console.log(myDate.getMonth());

      // let going = myDate.getFullYear() - topyear - 1;

      // if (
      //   topmonth < myDate.getMonth() ||
      //   (topmonth == myDate.getMonth() && topday <= myDate.getDate())
      // ) {
      //   going++;
      // }
      // console.log(going);
      // this.ruleForm.process = going;
    },
    //编辑员工
    editorTheme(row, index1) {
      console.log(row);
      this.edits = row.id; //ID
      this.under = index1;
      this.dateTime = true;
      this.ruleForm.name = row.name; //姓名
      this.ruleForm.radio = row.sex + ""; //性别
      let picture = [];
      if (row.pic) {
        picture[0] = {
          url: row.pic
        };
      }
      this.productImgs = picture;
      this.ruleForm.marriages = row.marriage + ""; //婚姻状况
      this.ruleForm.value1 = row.birthDate; //出生日期
      this.ruleForm.phones = row.mobile; //手机号码
      this.ruleForm.national = row.nation; //民族
      this.ruleForm.position = row.post; //职务
      //所在班级
      this.ruleForm.thejob = row.jobNumber; //工号
      this.ruleForm.inductions = row.entryTime; //入职日期
      this.ruleForm.workin = row.workTime; //参加工作日期
      this.ruleForm.update = row.cardNo; //证件号码
      this.ruleForm.worker = row.workUnit; //工作单位
      this.ruleForm.emails = row.email; //邮箱
      this.ruleForm.ddeparture = row.stutas; //当前状态
      this.ruleForm.nextstate = row.changeDate; //状态变更日期
    },
    //删除员工
    DeleteUser(row) {
      console.log(row);
      // blade-food/teacher/save
      let addid = `?ids=${row.id}`;
      this.$confirm("确认删除该部门?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$axios
            .post(`api/blade-food/teacher/remove` + addid, {})
            .then(res => {
              // console.log(res);
              this.defcustom();
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
    //添加员工弹框
    addition(index1) {
      // console.log(index1);
      console.log(this.view);
      this.under = index1;
      this.dateTime = true;
    },
    //添加部门
    added(index) {
      this.storage.name = "";
      this.departments = index;
      console.log(this.departments);
      this.department = true;
    },
    //添加子部门
    gate(data, index) {
      this.acetone.name = "";
      // console.log(data);
      this.support = data.tment;
      console.log(this.support);
      this.adds = data.id;
      console.log(this.adds);
      this.obtained = true;
    },
    //编辑部门
    editorBase(data, index) {
      this.storage.name = "";
      this.departments = index;
      console.log(this.departments);
      console.log(data);
      this.storage.name = data.label;
      (this.storage.id = data.id),
        //  this.adds = data.id;
        (this.department = true);
    },
    //编辑子部门
    setDepartment(data, index) {
      this.support = data.tment;
      console.log(this.support);
      console.log(data);
      this.acetone.name = data.label;
      this.acetone.id = data.id;
      this.obtained = true;
    },
    //编辑子部门
    addNotify() {
      this.$axios
        .post(`api/blade-food/teacherdept/submit`, {
          parentId: this.adds, //上级ID
          id: this.acetone.id, //子部门ID
          deptName: this.acetone.name //部门名称
          // level: this.acetone.sorting //部门排序
        })
        .then(res => {
          this.getStorage();
          this.obtained = false;
          this.acetone.name = "";
          // this.acetone.storage = "";
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
    //编辑部门
    selection() {
      if (this.storage.name != "") {
        this.$axios
          .post(`api/blade-food/teacherdept/submit`, {
            id: this.storage.id, //部门ID
            deptName: this.storage.name //部门名称
            // level: this.storage.sorting //部门排序
          })
          .then(res => {
            this.getStorage();
            this.department = false;
            this.storage.name = "";
            // this.storage.storage = "";
            console.log(res);
            this.$message({
              message: "添加成功",
              type: "success"
            });
          })
          .catch(() => {
            this.$message.error("添加失败");
          });
      } else {
        this.$message.error("部门不能为空");
      }
    },
    //添加部门
    Determine() {
      if (this.storage.name != "") {
        this.$axios
          .post(`api/blade-food/teacherdept/submit`, {
            deptName: this.storage.name //部门名称
            // level: this.storage.sorting //部门排序
          })
          .then(res => {
            this.getStorage();
            this.department = false;
            this.storage.name = "";
            // this.storage.storage = "";
            console.log(res);
            this.$message({
              message: "添加成功",
              type: "success"
            });
          })
          .catch(() => {
            this.$message.error("添加失败");
          });
      } else {
        this.$message.error("部门不能为空");
      }
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
    //查看
    handleNodeClick(data) {
      this.view = data.id;
      console.log(this.view);
      this.loadFlag1 = true;
      this.$axios
        .get(`api/blade-food/teacher/list?deptId=${this.view}`, {})
        .then(res => {
          // console.log(res);
          // this.store = res.data.data.records;
          // console.log(this.store);
          this.$message({
            message: "查询成功",
            type: "success"
          });
          this.loadFlag1 = false;
          this.tableData = res.data.data.records;
        })
        .catch(() => {
          this.$message.error("查询失败");
        });
    },
    //查看详情
    defcustom(data) {
      // console.log(data);
      this.view = data.id;
      console.log(this.view);
      this.loadFlag1 = true;
      this.$axios
        .get(`api/blade-food/teacher/list?deptId=${this.view}`, {})
        .then(res => {
          // console.log(res);
          // this.store = res.data.data.records;
          // console.log(this.store);
          this.$message({
            message: "查询成功",
            type: "success"
          });
          this.loadFlag1 = false;
          this.tableData = res.data.data.records;
        })
        .catch(() => {
          this.$message.error("查询失败");
        });
    },
    // api/blade-food/class/tree

    //获取所属班级
    getToolkit() {
      this.$axios.get(`api/blade-food/class/tree`, {}).then(res => {
        console.log(res);
        this.bufs = res.data.data;
        let fwork = [];
        this.bufs.forEach((item, index) => {
          console.log(item);
          fwork[index] = {
            id: item.id,
            label: item.label
          };
          // item.children.forEach(item1 => {
          //   // console.log(item1);
          //   if (item1.children) {
          //     item1.children.forEach((item2, index2) => {
          //       // console.log(item2);
          //       fwork[index2] = {
          //         id: item2.id,
          //         label: item2.classType
          //       };
          //       fwork[index2].children = [];
          //       if (item2.children) {
          //         item2.children.forEach((item3, index3) => {
          //           // console.log(item3);
          //           fwork[index2].children[index3] = {
          //             id: item3.id,
          //             label: item3.classType
          //           };
          //         });
          //       }
          //     });
          //   }
          // });
        });
        console.log(fwork);
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
            into: item.level,
            view: 0,
            tment: 0
          };
          auto[index].children = [];
          if (item.children) {
            item.children.forEach((item1, index1) => {
              auto[index].children[index1] = {
                id: item1.id,
                label: item1.title,
                into: item1.level,
                view: 1,
                tment: 1
              };
            });
          }
        });
        console.log(auto);
        this.data = auto;
      });
    },
    //移除图片
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    //预览图片
    handlePictureCardPreview(file) {
      console.log(file.url);

      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleExceed(files, fileList) {
      //图片上传超过数量限制
      this.$message.error("上传图片不能超过1张!");
      console.log(files, fileList);
    },
    // 上传成功
    handleAvatarSuccess(res, file) {
      console.log(res);
      this.dialogImageUrl = URL.createObjectURL(file.raw);
      this.dialogImageUrl = res.data.link;
      // this.imageUrl = URL.createObjectURL(file.raw);
      // this.imageUrl = res.data.link;
      console.log(this.dialogImageUrl);
    },
    beforeAvatarUpload(file) {
      // const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      // if (!isJPG) {
      //   this.$message.error("上传图片只能是 JPG 格式!");
      // }
      if (!isLt2M) {
        this.$message.error("上传图片大小不能超过 2MB!");
      }
      return isLt2M;
    }
  }
};
</script>

<style scoped>
.avue-view {
  padding: 0 5px !important;
}
.management {
  width: 100%;
  height: 100%;
  background-color: #fff;
  display: flex;
  /* margin-bottom: 40px; */
}
.onchange {
  width: 24%;
  /* height: 700px; */
  /* background-color: red; */
  border-right: 1px solid #e0e0e0;
}
.consults {
  width: 75%;
  /* height: 700px; */
  /* background-color: yellow; */
  margin-left: 10px;
}
.const {
  width: 250px;
  height: 50px;

  margin-top: 15px;
  margin-left: 10px;
  /* text-align: center; */
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
.address {
  margin-top: 50px;
}
</style>
