<template>
  <div class="student-contain">
    <el-row>
      <el-col :span="5" >
        <div class="box"   id="boxTree">
          <el-scrollbar>
            <basic-container   >
              <el-input placeholder="输入关键字进行过滤" v-model="filterText">
              </el-input>

              <el-tree default-expand-all
                       :data="treeData"
                       :props="treeProps"
                       @node-click="nodeClick"
                       :filter-node-method="filterNode"
                       :expand-on-click-node="false"
                       :highlight-current="true"
                       ref="tree"
              >
                <span
                  class="custom-tree-node"
                  slot-scope="{ node, data }"
                >
                  <span>
                    <span
                      class="ant-tree-node-content-0"
                      v-if="!data.addBtn && data.classType == 3"
                    ></span>

                    <img
                      src="/img/bg/edu-oa-file.png"
                      width="16px"
                      class="ant-tree-node-content-1"
                      v-if="!data.addBtn && data.classType != 3"
                    />
                    <span   v-if="!data.addBtn && data.classType == 0">{{
                      data.label
                    }}</span>
                    <span    v-if="!data.addBtn && data.classType == 1">{{
                      data.label
                    }}</span>
                    <span    v-if="!data.addBtn && data.classType == 2">{{
                      data.label
                    }}</span>
                    <el-tooltip    :content="data.classAlias" placement="bottom" effect="light">
                    <span    v-if="!data.addBtn && data.classType == 3">{{
                      data.label
                    }}</span>
                    </el-tooltip>
                    <span
                      class="ant-tree-node-content-wrapper-addItem"
                      v-if="data.addBtn"
                      @click="addClass(node, data)"
                    >{{ data.label }}</span
                    >
                  </span>
                    <span class="ant-tree-node-content-btn">
                    <img
                      src="/img/bg/edit.png"
                      width="15px"
                      class="ant-tree-node-content-1"
                      v-if="
                        !data.addBtn &&
                        data.classType == 3
                      "
                      @click="editClass(data.id,data.label,data.classAlias)"
                    />
                  </span>
                  <span class="ant-tree-node-content-btn">
                    <img
                      src="/img/bg/delete.png"
                      @click="removeClass(data.id)"
                      width="15px"
                      class="ant-tree-node-content-1"
                      v-if="
                        !data.addBtn &&
                        data.classType != 0 &&
                        (!data.children || data.children.length == 1)
                      "
                    />
                  </span>
                </span>
              </el-tree>
              <!-- <avue-tree :option="treeOption" :data="treeData" @node-click="nodeClick"/> -->
            </basic-container>
          </el-scrollbar>
        </div>
      </el-col>
      <el-col :span="19">
        <basic-container>
          <avue-crud
            :option="option"
            :search.sync="search"
            :table-loading="loading"
            :data="data"
            ref="crud"
            v-model="form"
            :permission="permissionList"
            :before-open="beforeOpen"
            :page.sync="page"
            @search-change="searchChange"
            @search-reset="searchReset"
            @selection-change="selectionChange"
            @current-change="currentChange"
            @size-change="sizeChange"
            @refresh-change="refreshChange"
            @on-load="onLoad"
          >
            <template slot="menuLeft">
              <!--<router-link to="/oprate/addStudent">-->
              <el-button
                type="el-button el-button--primary el-button--small"
                size="small"
                @click="addStudent"
                icon="el-icon-plus"
              >
                添加学生
              </el-button>
              <!--</router-link>-->
              <el-button
                type="danger"
                size="small"
                plain
                icon="el-icon-delete"
                @click="handleDelete"
              >删 除
              </el-button>
              <el-button type="success"
                         size="small"
                         plain
                         icon="el-icon-upload2"
                         @click="handleImport">导入
              </el-button>
            </template>
            <template slot-scope="scope" slot="menu">
              <el-button
                type="text"
                icon="el-icon-view"
                size="small"
                @click.stop="handleView(scope.row)"
              >查看
              </el-button>
              <el-button
                type="text"
                icon="el-icon-edit"
                size="small"
                @click.stop="handleEdit(scope.row)"
              >编辑
              </el-button>
              <el-button
                type="text"
                icon="el-icon-edit"
                size="small"
                @click.stop="rowDel(scope.row)"
              >删除
              </el-button>
              <el-button
                type="text"
                icon="el-icon-edit"
                size="small"

                @click.stop="leaveSchool(scope)"
              >离校
              </el-button>
              <el-button
                type="text"
                icon="el-icon-edit"
                size="small"
                @click.stop="handleUpdate(scope.row, scope.index, 3)"
              >毕业
              </el-button>
            </template>
          </avue-crud>
        </basic-container>
      </el-col>
    </el-row>
    <el-dialog
      :title="离校"
      append-to-body="true"
      :visible.sync="leaveVisible"
      width="30%"
      :before-close="handleClose"
    >
      <!--<el-row>-->
      <!--<el-col :span="5">离校原因</el-col>-->
      <!--<el-col :span="19">-->
      <!--<el-input v-model="leaveReason" placeholder="请输入内容"></el-input>-->
      <!--</el-col>-->
      <!--</el-row>-->
      <!--<el-row>-->
      <!--<el-col :span="5">离校时间</el-col>-->
      <!--<el-col :span="19">-->
      <!--<avue-date v-model="leaveDate" placeholder="请选择日期"></avue-date>-->
      <!--</el-col>-->
      <!--</el-row>-->
      <!--<span slot="footer" class="dialog-footer">-->
      <!--<el-button @click="cancel()">取 消</el-button>-->
      <!--<el-button type="primary" @click="handleUpdate(rowId, null, 2)"-->
      <!--&gt;确 定</el-button-->
      <!--&gt;-->
      <!--</span>-->
      <avue-form :option="leaveOption" v-model="leaveData" @submit="handleUpdate(rowId,null,2)" @error="error"></avue-form>
    </el-dialog>

    <!--<el-dialog-->
    <!--:title="tclass.classTitle"-->
    <!--append-to-body="true"-->
    <!--:visible.sync="outerVisible"-->
    <!--width="30%"-->
    <!--:before-close="handleClose"-->
    <!--&gt;-->
    <!--<el-row>-->
    <!--<el-col :span="5">{{ tclass.classPName }}</el-col>-->
    <!--<el-col :span="19">-->
    <!--<el-select v-model="addValue.pidValue" disabled placeholder="请选择">-->
    <!--<el-option-->
    <!--v-for="item in pidOptions"-->
    <!--:key="item.value"-->
    <!--:label="item.label"-->
    <!--:value="item.value"-->
    <!--&gt;-->
    <!--</el-option> </el-select-->
    <!--&gt;</el-col>-->
    <!--</el-row>-->
    <!--<el-row>-->
    <!--<el-col :span="5">{{ tclass.className }}</el-col>-->
    <!--<el-col :span="19">-->
    <!--<el-input-->
    <!--v-model="addValue.nameValue"-->
    <!--placeholder="请输入内容"-->
    <!--&gt;</el-input>-->
    <!--</el-col>-->
    <!--</el-row>-->

    <!--<el-row v-if="tclass.classType == 3">-->
    <!--<el-col :span="5">{{ tclass.classAlias }}</el-col>-->
    <!--<el-col :span="19">-->
    <!--<el-input-->
    <!--v-model="addValue.aliasValue"-->
    <!--placeholder="请输入内容"-->
    <!--&gt;</el-input>-->
    <!--</el-col>-->
    <!--</el-row>-->
    <!--&lt;!&ndash; <el-row v-if="tclass.classType == 3">-->
    <!--<el-col :span="5">{{ tclass.classEdu }}</el-col>-->
    <!--<el-col :span="19">-->
    <!--<el-input-->
    <!--v-model="addValue.eduValue"-->
    <!--placeholder="请输入内容"-->
    <!--oninput="value=value.replace(/\d{5}/g,'')"-->
    <!--&gt;</el-input>-->
    <!--</el-col>-->
    <!--</el-row> &ndash;&gt;-->
    <!--<span slot="footer" class="dialog-footer">-->
    <!--<el-button @click="cancel()">取 消</el-button>-->
    <!--<el-button type="primary" @click="submitClass()">确 定</el-button>-->
    <!--</span>-->
    <!--</el-dialog>-->
    <el-drawer
      title="修改班级"  :destroy-on-close="true"
      :visible.sync="banjiUpVisible"
      :modal-append-to-body="false"  :before-close="beforeClosebjUp"
    >
      <div class="_1OGXkpwTB-08ZVOTYhQESl">班级信息</div>
      <el-form
        status-icon
        :rules="banjiUpRules"
        ref="banjiUpForm"
        :model="banjiUpForm"
        label-width="0">
        <el-form-item prop="className"  class="item-ck"  label="班级名称:">
          <div class="item-ck-bj">
            <el-input v-model="banjiUpForm.className" disabled placeholder="请输入内容"></el-input>
          </div>
        </el-form-item>
        <el-form-item    class="item-ck"   prop="classAlias"  label="班级别名:">
          <div class="item-ck-bj">
            <el-input v-model="banjiUpForm.classAlias" placeholder="请输入内容"></el-input>
          </div>
        </el-form-item>
        <div class="item-footer">
          <el-button type="primary" @click="subCodebjUp" >确 定</el-button>
          <el-button @click="beforeClosebjUp">取 消</el-button>

        </div>
      </el-form>
    </el-drawer>
    <el-drawer
      title="新建班级"  :destroy-on-close="true"
      :visible.sync="banjiVisible"
      :modal-append-to-body="false"  :before-close="beforeClosebj"
    >
      <div class="_1OGXkpwTB-08ZVOTYhQESl">班级信息</div>
      <el-form
        status-icon
        :rules="banjiRules"
        ref="banjiForm"
        :model="banjiForm"
        label-width="0">
        <el-form-item prop="className"  class="item-ck"  label="班级名称:">
          <div >
            <span class="item-ck-title">{{banjiName}}</span>
            <el-select   v-model="banjiForm.className" placeholder="">
              <el-option
                v-for="item in banjiSelect"
                :key="item.value"
                :label="item.title"
                :value="item.title"
                :disabled="item.disabled"
              >
              </el-option>
            </el-select>
            班
          </div>
        </el-form-item>
        <el-form-item    class="item-ck"   prop="classAlias"  label="班级别名:">
          <div class="item-ck-bj">
            <el-input v-model="banjiForm.classAlias" placeholder="请输入内容"></el-input>
          </div>
        </el-form-item>
        <div class="item-footer">
          <el-button type="primary" @click="subCodebj" >确 定</el-button>
          <el-button @click="beforeClosebj">取 消</el-button>

        </div>
      </el-form>
    </el-drawer>

    <el-drawer
      title="新建年级"  :destroy-on-close="true"
      :visible.sync="xuejiVisible"
      :modal-append-to-body="false"  :before-close="beforeClosenj"
    >
      <div class="_1OGXkpwTB-08ZVOTYhQESl">年级信息</div>
      <el-form
        status-icon
        :rules="xuejiRules"
        ref="xuejiForm"
        :model="xuejiForm"
        label-width="0">
        <el-form-item prop="className" v-if="!showYear"  class="item-ck-xj"  label="所在年级:">
          <div >
            <el-select   v-model="xuejiForm.className" placeholder="请选择">
              <el-option
                v-for="item in xuejiSelect"
                :key="item.title"
                :label="item.title"
                :disabled="item.disabled"
                :value="item.title">
              </el-option>
            </el-select>
          </div>
        </el-form-item>
        <el-form-item prop="startYear"  v-if="showYear"  class="item-ck-xj"  label="入学年份:">
          <div >
            <el-select   v-model="xuejiForm.startYear" placeholder="请选择">
              <el-option
                v-for="item in xuejiSelect"
                :key="item.title"
                :label="item.title"
                :disabled="item.disabled"
                :value="item.title">
              </el-option>
            </el-select>
          </div>
        </el-form-item>
        <el-form-item    class="item-ck-xj"   prop="classes"  label="班级数量:">
          <div>
            <el-select v-model="xuejiForm.classes" placeholder="请选择">
              <el-option
                v-for="item in xdInfo.classOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </el-form-item>
        <div class="item-footer">
          <el-button type="primary" @click="subCodeNj" >确 定</el-button>
          <el-button @click="beforeClosenj">取 消</el-button>

        </div>
      </el-form>
    </el-drawer>

    <el-drawer
      title="新建学段"  :destroy-on-close="true"
      :visible.sync="xueduanVisible"
      :modal-append-to-body="false"  :before-close="beforeClosexd"

    >
      <div class="_1OGXkpwTB-08ZVOTYhQESl">学段信息</div>
      <el-form
        status-icon
        :rules="xueduanRules"
        ref="xueduanForm"
        :model="xueduanForm"
        label-width="0">
        <el-form-item prop="xueduanCk"  class="item-ck" label="学段:">
          <div >
            <el-checkbox-group v-model="xueduanForm.xueduanCk" @change="ckChange">
              <div  v-for="(claStuItem,index) in claStu" :key="index"><el-checkbox  :label="claStuItem.className"  :name="claStuItem.className"></el-checkbox>
                <span>
            <el-select :disabled="claStuItem.disFlag" @change="numbChange"  v-model="claStuItem.disValue" placeholder="请选择">
            <el-option
              v-for="item in claStuItem.disOption"
              :key="item.value"
              :label="item.value"
              :value="item.value">
            </el-option>
          </el-select>
          </span><span class="el-checkbox__label"> 个年级</span></div>

            </el-checkbox-group>
          </div>
        </el-form-item>
        <el-form-item     class="item-ck"   label="选择班级数量:">
          <div class="item-title"><b>智能升班：</b>每个新学年开始，各年级将自动升班。如：明年9月，「一年级1班」自动更名「二年级1班」，「小班1班」自动更名「中班1班」</div>
          <div class="item-class" v-if="!claStu.find((p)=>p.className=='幼儿园').disFlag"  >
            <div class="item-class-title" >幼儿园</div>
            <div class="item-class-content" v-for="(gradeItem,index) in (claStu.find((p)=>p.className=='幼儿园').children)"><span class="item-samewidth">{{gradeItem.className}}：</span>
              <el-select v-model="gradeItem.classNum" placeholder="请选择">
                <el-option
                  v-for="item in xdInfo.classOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
              个班级
            </div>
          </div>
          <div class="item-class" v-if="!claStu.find((p)=>p.className=='小学').disFlag"  >
            <div class="item-class-title" >小学</div>
            <div class="item-class-content" v-for="(gradeItem,index) in (claStu.find((p)=>p.className=='小学').children)"><span class="item-samewidth">{{gradeItem.className}}：</span>
              <el-select v-model="gradeItem.classNum" placeholder="请选择">
                <el-option
                  v-for="item in xdInfo.classOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
              个班级
            </div>
          </div>
          <div class="item-class" v-if="!claStu.find((p)=>p.className=='初中').disFlag"  >
            <div class="item-class-title" >初中</div>
            <div class="item-class-content" v-for="(gradeItem,index) in (claStu.find((p)=>p.className=='初中').children)"><span class="item-samewidth">{{gradeItem.className}}：</span>
              <el-select v-model="gradeItem.classNum" placeholder="请选择">
                <el-option
                  v-for="item in xdInfo.classOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
              个班级
            </div>
          </div>
          <div class="item-class" v-if="!claStu.find((p)=>p.className=='高中').disFlag"  >
            <div class="item-class-title" >高中</div>
            <div class="item-class-content" v-for="(gradeItem,index) in (claStu.find((p)=>p.className=='高中').children)"><span class="item-samewidth">{{gradeItem.className}}：</span>
              <el-select v-model="gradeItem.classNum" placeholder="请选择">
                <el-option
                  v-for="item in xdInfo.classOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
              个班级
            </div>
          </div>
        </el-form-item>
        <div class="item-footer">
          <el-button type="primary" @click="subCodeXd" >确 定</el-button>
          <el-button @click="beforeClosexd">取 消</el-button>

        </div>
      </el-form>
    </el-drawer>

    <el-dialog title="学生信息导入"
               append-to-body
               :visible.sync="excelBox"
               width="555px">
      <avue-form :option="excelOption" v-model="excelForm" :upload-after="uploadAfter">
        <template slot="excelTemplate">
          <el-button type="primary" @click="handleTemplate">
            点击下载<i class="el-icon-download el-icon--right"></i>
          </el-button>
        </template>
      </avue-form>
    </el-dialog>
  </div>
</template>

<script>
  import { grant, resetPassword } from "@/api/system/user";
  import {
    tree,
    add,
    remove,
    update,
    orderClass,
    getList,
    removeStuId,
    createClass
  } from "@/api/system/student";
  import { nation } from "@/api/tool/data";
  import { formateDate } from "@/api/tool/date";
  import { mapGetters } from "vuex";
  import website from "@/config/website";
  import { getToken } from "@/util/auth";
  export default {
    data() {
      return {
        banjiUpPid:"",
        banjiUpForm:{
          className:'',
          classAlias:''
        },


        banjiPid:'',
        banjiStartYear:"",
        banjiName:'',
        banjiForm:{
          className:'',
          classAlias:''
        },
        banjiSelect:[],
        banjiRules:{
          className:[{required:true,trigger:"blur",message:"请至少选择一个班级"}],
        },



        xuejiRules:{
          startYear:[{required:true,trigger:"blur",message:"请至少选择一个年份"}],
          classes:[{required:true,trigger:"blur",message:"请选择班级数量"}],
          className:[{required:true,trigger:"blur",message:"请选择所在年级"}],
        },
        xuejiPid:"",
        showYear:false,
        xuejiSelect:[],
        xuejiForm:{
          startYear:"",
          classes:"",
          className:""
        },


        yey:[
          {
            title:"小小班" ,
            value:1
          },
          {
            title:"小班" ,
            value:2
          },
          {
            title:"中班" ,
            value:3
          },
          {
            title:"大班" ,
            value:4
          },
          {
            title:"学前班" ,
            value:5
          }
        ],
        same:[
          {
            title:"一" ,
            value:1
          },
          {
            title:"二" ,
            value:2
          },
          {
            title:"三" ,
            value:3
          },
          {
            title:"四" ,
            value:4
          },{
            title:"五" ,
            value:5
          },
          {
            title:"六" ,
            value:6
          },
          {
            title:"七" ,
            value:7
          },
          {
            title:"八" ,
            value:8
          },

        ],
        xueduanRules:{
          xueduanCk:[{required:true,trigger:"blur",message:"请至少选择一个学段"}]
        },
        xueduanForm:{
          xueduanCk:[],
          classOptionsValue:1
        },
        claStu:[
          {
            disFlag:true,
            disValue:3,
            grade:1,
            className:"幼儿园",
            classType:1,
            children:[],
            disOption:[
              {
                value:3
              },
              {
                value:4
              },{
                value:5
              },
            ]
          },
          {
            disFlag:true,
            disValue:6,
            className:"小学",
            grade:2,
            classType:1,
            children:[],
            disOption:[
              {
                value:6
              },{
                value:7
              },{
                value:8
              },
            ]
          },
          {
            disFlag:true,
            disValue:3,
            grade:3,
            className:"初中",
            classType:1,
            children:[],
            disOption:[
              {
                value:3
              },{
                value:4
              },{
                value:5
              }]
          },
          {
            disFlag:true,
            disValue:3,
            className:"高中",
            grade:4,
            classType:1,
            children:[],
            disOption:[
              {
                value:3
              },{
                value:4
              },{
                value:5
              }
            ]
          }
        ],
        xdInfo:{
          classOptions:[{
            value:1,
          },{
            value:2,
          },{
            value:3,
          },{
            value:4,
          },{
            value:5,
          },{
            value:6,
          },{
            value:7,
          },{
            value:8,
          },{
            value:9,
          },{
            value:10,
          },{
            value:11,
          },{
            value:12,
          },{
            value:13,
          },{
            value:14,
          },{
            value:15,
          },{
            value:16,
          },{
            value:17,
          },{
            value:18,
          },{
            value:19,
          },{
            value:20,
          },{
            value:21,
          },{
            value:22,
          },{
            value:23,
          },{
            value:24,
          },{
            value:25,
          },{
            value:26,
          },{
            value:27,
          },{
            value:28,
          },{
            value:29,
          },{
            value:30,
          }]
        },
        banjiUpVisible:false,
        xueduanVisible:false,
        xuejiVisible:false,
        banjiVisible:false,
        leaveData:{},
        leaveOption:{
          column:[
            {
              label:'离校原因',
              prop:'leaveReason',
              rules: [{
                required: true,
                message: "请输入离校原因",
                trigger: "blur"
              }],
              span:24
            }, {
              label:'离校时间',
              prop:'leaveDate',
              type:"datetime",
              rules: [{
                required: true,
                message: "请输入离校时间",
                trigger: "blur"
              }],
              span:24
            }
          ]
        },
        rowId: "",
        rowName:'',
        leaveReason: "",
        leaveDate: "",
        outerVisible: false,
        leaveVisible: false,
        filterText: "",
        form: {},
        search: {},
        roleBox: false,
        excelBox: false,
        initFlag: true,
        selectionList: [],
        query: {},
        loading: true,
        page: {
          pageSize: 10,
          currentPage: 1,
          total: 0,
        },
        classes: [
          { type: 1, pName: "所属校区", title: "新增学段", name: "学段名称" },
          {
            type: 2,
            pName: "所属学段",
            title: "新增年级",
            name: "年级名称",
            alias: "年级别名",
          },
          {
            type: 3,
            pName: "所属年级",
            title: "新增班级",
            name: "班级名称",
            alias: "班级别名",
            edu: "学界",
          },
        ],
        tclass: {
          classType: "",
          classPName: "",
          classTitle: "",
          className: "",
          classAlias: "",
          classEdu: "",
        },
        addValue: {
          id: "",
          pidValue: "",
          nameValue: "",
          aliasValue: "",
          // eduValue: "",
        },
        init: {
          roleTree: [],
          deptTree: [],
        },
        props: {
          label: "title",
          value: "key",
        },
        roleGrantList: [],
        roleTreeObj: [],
        classId: "",//包括年级学校
        selectClassId:'',//只有班级,
        treeData: [],
        treeProps: {
          children: "children",
          label: "label",
        },
        option: {
          height: "auto",
          calcHeight: 80,
          tip: false,
          searchShow: true,
          searchMenuSpan: 6,
          border: true,
          index: true,
          indexLabel:'序号',
          selection: true,
          menuWidth: 200,
          columnBtn:false,
          refreshBtn:false,
          refreshBtn:false,
          // viewBtn: true,
          editBtn: false,
          addBtn: false,
          delBtn: false,
          //dialogType: 'drawer',
          dialogClickModal: false,
          column: [
            {
              label: "学级",
              prop: "educationalCircles",
              search: true,
              display: false,
              minlength:0,
              maxlength:4
            },
            {
              label: "姓名",
              prop: "name",
              search: true,
              display: false,
              minlength:0,
              maxlength:10,
              width:100,
              overHidden: true,
            },
            {
              label: "班级名称",
              prop: "className",
              display: false,
              width:100,
              overHidden: true,
            },
            {
              label: "学号",
              prop: "childNo",
              search: false,
              display: false,
              minlength:0,
              maxlength:10,
              width:100,
              overHidden: true,
            },
            {
              label: "性别",
              prop: "sex",
              type: "select",
              dicData: [
                {
                  label: "男",
                  value: 1,
                },
                {
                  label: "女",
                  value: 2,
                },
              ],
              search: true,
              display: false,
            },
            {
              label: "出生日期",
              prop: "birthDate",
              display: false,
              width:100,
              overHidden: true,
            },
            {
              label: "年龄",
              prop: "age",
              display: false,
            },
            {
              label: "民族",
              prop: "nation",
              display: false,
              type: "select",
              dicData: nation,
              overHidden: true,
            },
            {
              label: "户口所在地",
              prop: "location",
              display: false,
              width:100,
              overHidden: true,
            },
            {
              label: "档案号",
              prop: "fileNumber",
              display: false,
              width:100,
              overHidden: true,
            },
            {
              label: "入园日期",
              prop: "admissionDate",
              display: false,
              width:100,
              overHidden: true,
            },
          ],
        },
        data: [],
        excelForm: {},
        excelOption: {
          submitBtn: false,
          emptyBtn: false,
          column: [
            {
              label: "模板上传",
              prop: "excelFile",
              type: "upload",
              drag: true,
              loadText: "模板上传中，请稍等",
              span: 24,
              propsHttp: {
                res: "data",
              },
              tip: "请上传 .xls,.xlsx 标准格式文件",
              action: "/api/blade-food/student/import-info",
            },
            {
              label: "模板下载",
              prop: "excelTemplate",
              formslot: true,
              span: 24,
            },
          ],
        },
      };
    },
    watch: {
      filterText(val) {
        this.$refs.tree.filter(val);
      },
      "form.tenantId"() {
        if (this.form.tenantId !== "" && this.initFlag) {
          this.initData(this.form.tenantId);
        }
      },
      // "excelForm.isCovered"() {
      //   if (this.excelForm.isCovered !== "") {
      //     const column = this.findObject(this.excelOption.column, "excelFile");
      //     column.action = `/api/blade-user/import-user?isCovered=${this.excelForm.isCovered}`;
      //   }
      // },
    },
    computed: {
      ...mapGetters(["userInfo", "permission"]),
      permissionList() {
        return {
          // addBtn: this.vaildData(this.permission.user_add, false),
          // viewBtn: this.vaildData(this.permission.user_view, false),
          // delBtn: this.vaildData(this.permission.user_delete, false),
          // editBtn: this.vaildData(this.permission.user_edit, false)
        };
      },
      ids() {
        let ids = [];
        this.selectionList.forEach((ele) => {
          ids.push(ele.id);
        });
        return ids.join(",");
      },
    },
    mounted() {
      this.initData();
      document.getElementById('boxTree').style.height=(document.body.clientHeight-113)+"px";
    },
    methods: {
      uploadAfter(res, done, loading, column) {
        window.console.log(column);
        this.excelBox = false;
        this.refreshChange();
        done();
      },
      handleTemplate() {
        window.open(`/api/blade-food/student/export-template?${this.website.tokenHeader}=${getToken()}`);
      },
      beforeClosebjUp(){
        this.banjiUpVisible=false;
        this.banjiUpForm.className="";
        this.banjiUpForm.classAlias="";
      },
      beforeClosebj(){
        this.banjiPid="";
        this.banjiStartYear="",
          this.banjiName="";
        this.banjiForm.className="";
        this.banjiForm.classAlias="";
        this.banjiSelect=[];
        this.banjiVisible=false;
      },
      beforeClosenj(){
        this.xuejiVisible=false;
        this.xuejiPid=undefined;
        this.showYear=false;
        this.xuejiForm.startYear=undefined;
        this.xuejiForm.classes=undefined;
        this.xuejiForm.className=undefined;
        this.xuejiSelect=[]
      },
      beforeClosexd(){
        this.xueduanVisible=false;
        this.xueduanForm.xueduanCk=[];
        this.claStu.forEach(_=>{
          _.disFlag=true;
          _.disValue=3;
          if(_.className=="小学"){
            _.disValue=6;
          }
          _.children=[];
        })
      },
      numbChange(){
        this.sameChange();
      },
      ckChange(){
        this.claStu.forEach(_=>{_.disFlag=true;_.children=[]})
        this.sameChange();
      },
      sameChange(){
        for(let i=0;i<this.xueduanForm.xueduanCk.length;i++){
          let obj =this.claStu.find(p=>p.className==this.xueduanForm.xueduanCk[i]);
          let children=[];
          let year=  parseInt(new Date().getFullYear());
          if(obj.className=="幼儿园"){
            if(obj.disValue==3){
              for(let j=0;j<3;j++){
                children.push({startYear:year-j-1,className:this.yey[1+j].title,grade:this.yey[1+j].value,classNum:5,classStr:this.yey[1+j].title})
              }
            }
            if(obj.disValue==4||obj.disValue==5){
              for(let j=0;j<obj.disValue;j++){
                children.push({startYear:year-j,className:this.yey[0+j].title,grade:this.yey[0+j].value,classNum:5,classStr:this.yey[0+j].title})
              }
            }
          }
          if(obj.className=="小学"){
            for(let j=0;j<obj.disValue;j++){
              children.push({startYear:year-j,className:this.same[j].title+"年级"+parseInt(year-j).toString()+"级",grade:this.same[j].value,classNum:5,classStr:this.same[j].title+"年级"})
            }
          }
          if(obj.className=="初中"){
            for(let j=0;j<obj.disValue;j++){
              children.push({startYear:year-j,className:this.same[j].title+"年级"+parseInt(year-j).toString()+"级",grade:this.same[j].value,classNum:5,classStr:this.same[j].title+"年级"})
            }
          }
          if(obj.className=="高中"){
            for(let j=0;j<obj.disValue;j++){
              children.push({startYear:year-j,className:this.same[j].title+"年级"+parseInt(year-j).toString()+"级",grade:this.same[j].value,classNum:5,classStr:this.same[j].title+"年级"})
            }
          }
          this.claStu.find(p=>p.className==this.xueduanForm.xueduanCk[i]).disFlag=false;
          this.claStu.find(p=>p.className==this.xueduanForm.xueduanCk[i]).children=children;
        }
      },
      subCodebjUp(){
        let that=this;
        let  row = {
          id: this.banjiUpPid,
          classAlias:this.banjiUpForm.classAlias
        };
        update(row).then(res=>{
          if(res.data.success){
            that.$message({
              type: "success",
              message: "修改成功!"
            });
            that.initData();
            that.beforeClosebjUp();
          }
        })
      },
      subCodebj(){
        let that =this;
        this.$refs.banjiForm.validate(function (valid ) {
          if (valid) {
            let row=[]
            row.push({
              parentId:that.banjiPid,
              classType:3,
              className:that.banjiName+that.banjiForm.className+"班",
              classAlias:that.banjiForm.classAlias,
              grade:that.banjiForm.className,
              startYear:that.banjiStartYear
            })
            createClass(row).then((res)=>{
              if(res.data.success){
                that.$message({
                  type: "success",
                  message: "新增成功!"
                });
                that.initData();
                that.beforeClosebj();
              }
            })
          }}
        )
      },
      subCodeNj(){
        let that =this;
        this.$refs.xuejiForm.validate(function (valid ) {
            if (valid) {
              let row=[];
              let className="";
              let classStr="";
              let year= new Date().getFullYear();
              let grade=undefined;
              let startYear=undefined;
              if(that.showYear){//年份
                that.same.forEach(_=>{
                  if(_.value==(year-that.xuejiForm.startYear)+1){
                    className=_.title+"年级"+that.xuejiForm.startYear+"级";
                    classStr=_.title+"年级";
                    grade=_.value
                  }
                })
                startYear=that.xuejiForm.startYear;
              }else{
                className=that.xuejiForm.className
                classStr=that.xuejiForm.className
                that.yey.forEach(_=>{
                  if(_.title==className){
                    grade=_.value;
                  }
                })
                startYear=year-grade+1;
              }
              row.push({parentId:that.xuejiPid ,className:className,classType:2,grade:grade,startYear:startYear,classStr:classStr,classNum:that.xuejiForm.classes})
              createClass(row).then((res)=>{

                if(res.data.success){
                  that.$message({
                    type: "success",
                    message: "新增成功!"
                  });
                  that.initData();
                  that.beforeClosenj();
                }
              })
            }
          }
        )
      },
      subCodeXd(){
        let that =this;
        this.$refs.xueduanForm.validate(function (valid ) {
          if (valid) {
            let row=[];
            that.claStu.forEach(stu=>{
              if(stu.children.length>0){
                row.push(stu)
              }
            })
            createClass(row).then((res)=>{

              if(res.data.success){
                that.$message({
                  type: "success",
                  message: "新增成功!"
                });
                that.initData();
                that.beforeClosexd();
              }
            })
          }
        })
      },
      // allowDrag(draggingNode) {
      //   return draggingNode.data.classType == 3;
      // },
      // allowDrop(draggingNode, dropNode, type) {
      //   return type !== "inner";
      // },
      // updateClass(node, data) {
      //   // if (data.parentId != 0) {
      //   //   // ;
      //   //   this.outerVisible = true;
      //   //   let classs = this.classes.filter((_) => {
      //   //     return _.type == data.classType;
      //   //   })[0];
      //   //   if (classs.type == 2) {
      //   //     this.tclass.classAlias = classs.alias;
      //   //   }
      //   //   if (classs.type == 3) {
      //   //     this.tclass.classAlias = classs.alias;
      //   //     this.tclass.classEdu = classs.edu;
      //   //   }
      //   //   this.tclass.classType = classs.type;
      //   //   this.tclass.classPName = classs.pName;
      //   //   this.tclass.classTitle = classs.title;
      //   //   this.tclass.className = classs.name;
      //   //   this.pidOptions = [{ value: data.parentId, label: data.parentName }];
      //   //   this.addValue.pidValue = data.parentId;
      //   //   this.addValue.nameValue = data.label;
      //   //   this.addValue.id = data.id;
      //   //   if (classs.type == 1) {
      //   //     this.tclass.classTitle = "修改学段";
      //   //   }
      //   //   if (classs.type == 2) {
      //   //     this.tclass.classTitle = "修改年级";
      //   //   }
      //   //   if (classs.type == 3) {
      //   //     this.tclass.classTitle = "修改班级";
      //   //     this.addValue.aliasValue = data.classAlias;
      //   //     // this.addValue.eduValue = data.educationalCircles;
      //   //   }
      //   // }
      // },
      // orderClass() {},
      editClass(id,className,classAlias){
        this.banjiUpVisible=true;

        this.banjiUpPid=id;
        this.$set( this.banjiUpForm,"className",className)
        this.$set( this.banjiUpForm,"classAlias",classAlias)

      },
      removeClass(id) {
        this.$confirm("是否确认删除", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            remove(id).then((res) => {
              if (res.data.success) {
                this.$message({
                  type: "success",
                  message: "删除成功!",
                });
                this.initData();
              }
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除",
            });
          });
      },
      emptyDialog() {
        // this.addValue.pidValue = "";
        // this.addValue.nameValue = "";
        // this.addValue.aliasValue = "";
        // this.addValue.id="";
        // // this.addValue.eduValue = "";
        this.leaveReason = "";
        this.leaveDate = "";
      },
      filterNode(value, data) {
        if (!value) return true;
        return data.label.indexOf(value) !== -1;
      },
      addClass(node, data) {
        let classs = this.classes.filter((_) => {
          return _.type == data.type;
        })[0];
        if (classs.type == 2) {
          this.xuejiVisible=true;
          if(data.pName=="幼儿园"){
            this.showYear=false
          }else{
            this.showYear=true
          }
          this.xuejiSelect=data.nbSelect;
          this.xuejiPid=data.pId
        }
        if (classs.type == 3) {

          this.banjiVisible=true;
          this.banjiSelect=data.nbSelect;
          this.banjiName=data.classStr;
          this.banjiPid=data.pId;
          this.banjiStartYear=data.year;
        }
        if(classs.type==1){
          this.xueduanVisible=true;

        }
        // // ;
        // this.tclass.classType = classs.type;
        // this.tclass.classPName = classs.pName;
        // this.tclass.classTitle = classs.title;
        // this.tclass.className = classs.name;
        // this.pidOptions = [{ value: data.pId, label: data.pName }];
        // this.addValue.pidValue = data.pId;
      },
      cancel() {
        this.leaveVisible = false;
        this.emptyDialog();
      },
      // submitClass() {
      //   let row = {};
      //   // ;
      //   if (this.tclass.classType == 1) {
      //     row = {
      //       id: this.addValue.id,
      //       parentId: this.addValue.pidValue,
      //       className: this.addValue.nameValue,
      //       classType: this.tclass.classType,
      //     };
      //   }
      //   if (this.tclass.classType == 2) {
      //     row = {
      //       id: this.addValue.id,
      //       parentId: this.addValue.pidValue,
      //       className: this.addValue.nameValue,
      //       classType: this.tclass.classType,
      //     };
      //   }
      //   if (this.tclass.classType == 3) {
      //     row = {
      //       id: this.addValue.id,
      //       parentId: this.addValue.pidValue,
      //       className: this.addValue.nameValue,
      //       classType: this.tclass.classType,
      //       classAlias: this.addValue.aliasValue,
      //       // educationalCircles: this.addValue.eduValue,
      //     };
      //   }
      //   if (this.addValue.id != null && this.addValue.id != "") {
      //     update(row).then((res) => {
      //       if (res.data.success) {
      //         // this.outerVisible = false;
      //         this.$message({
      //           type: "success",
      //           message: "修改成功!",
      //         });
      //         this.initData();
      //         this.emptyDialog();
      //       }
      //     });
      //   } else {
      //     add(row).then((res) => {
      //       if (res.data.success) {
      //         // this.outerVisible = false;
      //         this.$message({
      //           type: "success",
      //           message: "添加成功!",
      //         });
      //         this.initData();
      //         this.emptyDialog();
      //       }
      //     });
      //   }
      // },
      nodeClick(data) {
        this.classId = data.id;
        if(data.classType&&data.classType==3){
          this.selectClassId=data.id;
        }
        this.page.currentPage = 1;
        this.onLoad(this.page);
      },
      addTreeItem(data, value, type, pId, pName,classStr,startYear) {


        let tData = [];
        let nbSelect=[];//年级/班级select
        let  year=new Date().getFullYear();
        if(type==2) {//年级
          if (pName == "幼儿园") {
            this.yey.forEach(_ => {
              nbSelect.push({title: _.title, value: _.value, disabled: false})
            })
          }
          if (pName == "小学") {
            for(let j=0;j<8;j++){
              nbSelect.push({title: (year - j) + "", value: j + 1, disabled: false})
            }
          }
          if (pName == "初中"||pName == "高中") {
            for(let j=0;j<5;j++){
              nbSelect.push({title: (year - j) + "", value: j + 1, disabled: false})
            }
          }
        }
        if(type==3){
          this.xdInfo.classOptions.forEach(_=>{
            nbSelect.push({title: _.value, value: _.value, disabled: false})
          })
        }
        if (data) {
          for (let i = 0; i < data.length; i++) {
            tData.push(data[i]);
            nbSelect.forEach(_ => {
              if (_.value == data[i].grade) {
                _.disabled= true
              }
            })
          }
        }
        tData.push({
          label: value,
          addBtn: true,
          type: type,
          pId: pId,
          pName: pName,
          nbSelect:nbSelect,
          classStr:classStr,
          year:startYear
        });
        return tData;
      },
      // handleDrop(draggingNode, dropNode, dropType, ev) {
      //   let rows = [];
      //   let rowData = [];
      //   this.treeData.forEach((_) => {
      //     if (_.children) {
      //       _.children.forEach((__) => {
      //         if (__.children) {
      //           __.children.forEach((___) => {
      //             if (___.id == draggingNode.data.parentId) {
      //               rows = ___.children;
      //             }
      //           });
      //         }
      //       });
      //     }
      //   });
      //   if (dropType == "after") {
      //     rows = rows.filter((_) => {
      //       return dropNode.data.sort
      //         ? _.sort <= dropNode.data.sort && _.sort >= draggingNode.data.sort
      //         : _.sort >= draggingNode.data.sort;
      //     });
      //     for (let i = 0; i < rows.length; i++) {
      //       if (i >= 1) {
      //         rowData.push({ id: rows[i].id, sort: rows[i - 1].sort });
      //       }
      //     }
      //     rowData.push({ id: rows[0].id, sort: rows[rows.length - 1].sort });
      //     console.log(rows);
      //   }
      //   if (dropType == "before") {
      //     rows = rows.filter((_) => {
      //       return (
      //         _.sort >= dropNode.data.sort && _.sort <= draggingNode.data.sort
      //       );
      //     });
      //     for (let i = 0; i <= rows.length; i++) {
      //       if (i < rows.length - 1) {
      //         rowData.push({ id: rows[i].id, sort: rows[i + 1].sort });
      //       }
      //     }
      //     rowData.push({ id: rows[rows.length - 1].id, sort: rows[0].sort });
      //
      //     console.log(rows);
      //   }
      //   orderClass(rowData).then(res=>{
      //
      //     if(res.data.success){
      //       this.$message({
      //         type: "success",
      //         message: "排序成功!",
      //       });
      //       this.initData();
      //     }
      //   });
      //
      // },
      initData() {
        tree(true).then((res) => {
          for (let i = 0; i < res.data.data.length; i++) {
            //学校
            if (res.data.data[i].children) {
              for (let k = 0; k < res.data.data[i].children.length; k++) {
                //学段
                if (res.data.data[i].children[k].children) {
                  for (
                    let j = 0;
                    j < res.data.data[i].children[k].children.length;
                    j++
                  ) {
                    //年级
                    res.data.data[i].children[k].children[
                      j
                      ].children = this.addTreeItem(
                      res.data.data[i].children[k].children[j].children,
                      "+ 新增班级",
                      3,
                      res.data.data[i].children[k].children[j].id,
                      res.data.data[i].children[k].children[j].label,
                      res.data.data[i].children[k].children[j].classStr,
                      res.data.data[i].children[k].children[j].startYear,
                    );
                  }
                }
                res.data.data[i].children[k].children = this.addTreeItem(
                  res.data.data[i].children[k].children,
                  "+ 新增年级",
                  2,
                  res.data.data[i].children[k].id,
                  res.data.data[i].children[k].label //1-学段，2-年级，3-班级,

                );
              }
            }
            res.data.data[i].children = this.addTreeItem(
              res.data.data[i].children,
              "+ 新增学段",
              1,
              res.data.data[i].id,
              res.data.data[i].label,
            );
          }
          this.treeData = res.data.data;
          console.log(this.treeData)
        });


      },
      rowSave(row, done, loading) {
        row.deptId = row.deptId.join(",");
        row.roleId = row.roleId.join(",");
        row.postId = row.postId.join(",");
        add(row).then(
          () => {
            this.initFlag = false;
            this.onLoad(this.page);
            this.$message({
              type: "success",
              message: "操作成功!",
            });
            done();
          },
          (error) => {
            loading();
          }
        );
      },
      rowUpdate(row, index, done, loading) {
        row.deptId = row.deptId.join(",");
        row.roleId = row.roleId.join(",");
        row.postId = row.postId.join(",");
        update(row).then(
          () => {
            this.initFlag = false;
            this.onLoad(this.page);
            this.$message({
              type: "success",
              message: "操作成功!",
            });
            done();
          },
          (error) => {
            loading();
          }
        );
      },
      rowDel(row) {
        this.$confirm("确定将选择数据删除?", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            let rows = [];
            rows.push({ id: row.id, isDelete: 1 });
            return removeStuId(rows);
          })
          .then(() => {
            this.onLoad(this.page);
            this.$message({
              type: "success",
              message: "操作成功!",
            });
          });
      },
      leaveSchool(scope){
        //
        this.leaveVisible = true;
        this.rowId = scope.row.id;
        this.rowName=scope.row.className;
        this.$set(this.leaveData,'leaveDate',new Date())
      },
      addStudent(){
        this.$router.push({ path: "/oprate/addStudent",query:{selectClassId: this.selectClassId} });
      },
      handleImport() {
        this.excelBox = true;
      },
      handleView(row){
        this.$router.push({ path: "/oprate/addStudent",query:{id:row.id,detailFlag:true,addView:true} });
      },
      handleEdit(row) {
        this.$router.push({ path: "/oprate/addStudent", query: { id: row.id } });
      },
      searchReset() {
        this.query = {};
        this.classId = "";
        this.onLoad(this.page);
      },
      searchChange(params, done) {
        this.query = params;
        this.page.currentPage = 1;
        this.onLoad(this.page, params);
        done();
      },
      selectionChange(list) {
        this.selectionList = list;
      },
      selectionClear() {
        this.selectionList = [];
        this.$refs.crud.toggleSelection();
      },
      handleUpdate(row, index, type) {
        // ;
        let rows = [];
        if (type == "2") {
          rows.push({
            id: row,
            isDelete: type,
            leaveDate: formateDate(this.leaveData.leaveDate, "yyyy-MM-dd HH:mm:ss"),
            reason: this.leaveData.leaveReason,
            leaveClassName:this.rowName
          });
          this.emptyDialog();
          removeStuId(rows).then((res) => {
            this.onLoad(this.page);
            this.$message({
              type: "success",
              message: "操作成功!",
            });
          });
          this.leaveVisible = false;
        } else {
          rows.push({ id: row.id, isDelete: type,leaveClassName:row.className });
          this.$confirm("是否确认毕业?", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          }).then(() => {
            removeStuId(rows).then((res) => {
              this.onLoad(this.page);
              this.$message({
                type: "success",
                message: "操作成功!",
              });
            });
          });
        }
      },
      handleDelete() {
        if (this.selectionList.length === 0) {
          this.$message.warning("请选择至少一条数据");
          return;
        }
        this.$confirm("确定将选择数据删除?", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            let id = this.ids.split(",");
            let row = [];
            for (let i = 0; i < id.length; i++) {
              row.push({ id: id[i], isDelete: 1 });
            }
            return removeStuId(row);
          })
          .then(() => {
            this.onLoad(this.page);
            this.$message({
              type: "success",
              message: "操作成功!",
            });
            this.$refs.crud.toggleSelection();
          });
      },
      handleImport() {
        this.excelBox = true;
      },
      handleExport() {
        this.$confirm("是否导出用户数据?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }).then(() => {
          window.open(
            `/api/blade-user/export-user?${
              this.website.tokenHeader
              }=${getToken()}&account=${this.search.account}&realName=${
              this.search.realName
              }`
          );
        });
      },
      currentChange(currentPage) {
        this.page.currentPage = currentPage;
      },
      sizeChange(pageSize) {
        this.page.pageSize = pageSize;
      },
      refreshChange() {
        this.onLoad(this.page, this.query);
      },
      onLoad(page, params = {}) {
        this.loading = true;
        params["isDelete"] = 0;
        getList(page.currentPage, page.pageSize, params, this.classId).then(
          (res) => {
            const data = res.data.data;
            this.page.total = data.total;
            this.data = data.records;
            this.loading = false;
            this.selectionClear();
          }
        );
      },
    },
  };
</script>
<style>

  .student-contain  .item-ck  ,.item-ck-xj{
    margin-top: 30px;
    margin-left: 50px;
  }
  .item-ck-bj{
    width: 200px;
    float: left;
  }
  .item-ck-title{
    margin-right: 10px;
  }
  .item-samewidth{
    width: 110px;
    display: block;
    float: left;
    text-align: right;
  }
  .item-ck .item-title{
    margin-left: 100px;
    font-size: 12px;
    line-height: 20px;
    color: rgba(13,0,19,.56);
    margin-top: 10px;
  }
  .item-ck   .item-class{
    margin-left: 100px;
  }
  .item-ck   .item-class .item-class-title{
    line-height: 40px;
    border-bottom: 1px solid #e8e8e8;
  }
  .item-ck   .item-class  .item-class-content{
    margin-left: 100px;
    line-height: 50px;
  }
  .student-contain .item-ck .el-checkbox{
    width: 80px;
  }
  .student-contain .item-ck  .el-form-item__label, .student-contain .item-ck-xj  .el-form-item__label{
    width: 100px!important;
  }
  .item-ck .el-checkbox-group{
    margin-left: 100px;

  }
  .student-contain .el-tree-node__content {
    height: 30px !important;
  }
  .student-contain  .ant-tree-node-content-btn {
    margin-top: 4px;
  }
  .student-contain  .el-drawer__header{
    padding: 20px 20px 10px 20px!important;
    border-bottom: 1px solid #e8e8e8;
  }
  .student-contain .el-drawer__open .el-drawer.rtl{
    width: 40%!important;
    overflow-y: scroll;
    color: rgba(0,0,0,.65);
  }
  .student-contain  .el-drawer__header{
    font-size: 16px;
    font-weight: 500;
    color: rgba(0,0,0,.85);
  }
  .student-contain ._1OGXkpwTB-08ZVOTYhQESl{
    background: #eceff4;
    padding-left: 20px;
    line-height: 40px;
    margin-left: 20px;
    font-size: 14px;
  }

  .item-ck .el-select{
    width:100px;
  }

</style>

<style scoped>
  .el-form{
    padding-bottom: 60px;
  }
  .item-footer{
    position: fixed;
    right: 20%;
    padding-top: 10px;
    bottom: 0px;
    background-color: #FFFFFF;
    padding-bottom: 10px;
    margin-right: -100px;
  }
  .box {
    height: 800px;
  }
  .el-tree {
    margin-top: 20px;
  }
  .el-scrollbar {
    height: 100%;
  }
  .box .el-scrollbar__wrap {
    overflow: scroll;
  }
  .ant-tree-node-content-0::before {
    content: "\73ED";
    color: #fff;
    opacity: 0.8;
    background: #00b853;
    display: inline-block;
    width: 28px;
    height: 28px;
    border-radius: 4px;
    font-size: 20px;
    line-height: 28px;
    text-align: center;
    -webkit-transform: translateY(-50%) scale(0.5);
    -ms-transform: translateY(-50%) scale(0.5);
    transform: translateY(-50%) scale(0.5);
    font-style: normal;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    z-index: 1;
    position: relative;
    top: 18px;
  }
  .ant-tree-node-content-0 {
    margin-top: 30px;
    margin-left: -8px;
  }
  .ant-tree-node-content-1 {
    margin-right: 5px;
  }
  .ant-tree-node-content-wrapper-addItem {
    color: #92959b;
    border: #dcdfe6 1px solid;
    padding: 4px 10px;
    font-size: 12px;
  }



</style>
