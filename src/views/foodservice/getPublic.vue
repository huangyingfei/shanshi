<template>
  <div class="typeList">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="个人菜品库" name="first">
        <div class="dishes">
          <!-- 左边 -->
          <div class="coffee">
            <!-- <el-input
              style="
                width: 250px;
                height: 35px;
                margin-left: 20px;
                margin-top: 10px;
              "
              placeholder="请输入内容"
              v-model="input"
              clearable
            ></el-input> -->
            <div class="import">
              <el-button type="primary" plain size="mini">导入</el-button>
              <el-button type="primary" plain size="mini">导出</el-button>
              <el-button type="primary" plain size="mini">加分类</el-button>
              <el-button type="primary" plain size="mini">加食材</el-button>
            </div>
            <div class="whole">
              <div class="export">全部</div>
              <div class="export1">公开</div>
              <div class="export2">隐藏</div>
            </div>
            <!-- 全国查找 -->
            <div class="country">
              <div class="country1">
                <template>
                  <el-select v-model="value" placeholder="请选择">
                    <el-option
                      v-for="item in examine"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </template>
              </div>
              <div class="country2">
                <template>
                  <el-select v-model="before1" placeholder="请选择">
                    <el-option
                      v-for="item in before"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </template>
              </div>
              <div class="country2">
                <template>
                  <el-select v-model="really1" placeholder="请选择">
                    <el-option
                      v-for="item in really"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </template>
              </div>
            </div>
            <!-- 结束 -->
            <div class="monly">
              <div class="block">
                <p></p>
                <el-tree
                  :data="data"
                  :props="defaultProps"
                  node-key="id"
                  :default-expand-all="false"
                  :expand-on-click-node="false"
                >
                  <span class="custom-tree-node" slot-scope="{ node, data }">
                    <span>{{ node.label }}</span>
                    <span>
                      <el-button
                        type="text"
                        size="mini"
                        @click="() => prepare(data)"
                      >
                        查看
                      </el-button>
                      <el-button
                        type="text"
                        v-if="!data.isUse"
                        size="mini"
                        @click="() => append(data)"
                      >
                        常用
                      </el-button>
                      <el-button
                        type="text"
                        v-else
                        size="mini"
                        @click="() => insert(data)"
                      >
                        不常用
                      </el-button>
                      <el-button
                        v-if="!data.isPub"
                        type="text"
                        size="mini"
                        @click="() => multi(data)"
                      >
                        隐藏
                      </el-button>
                      <el-button
                        v-else
                        type="text"
                        size="mini"
                        @click="() => docs(data)"
                      >
                        公开
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
          </div>
          <!--右边 -->
          <div class="mation">
            <div class="mationtxt">食材主要信息</div>
            <div class="mationinput">
              <el-form
                :model="ruleForm"
                :rules="rules"
                :inline="true"
                ref="ruleForm"
                label-width="100px"
                class="demo-ruleForm"
              >
                <el-form-item label="菜品名字" prop="name" style="width: 350px">
                  <el-input
                    style="width: 200px"
                    v-model="ruleForm.name"
                  ></el-input>
                </el-form-item>
                <el-form-item
                  label="菜品分类"
                  prop="fooddata"
                  style="width: 350px"
                >
                  <el-select
                    style="width: 200px"
                    v-model="ruleForm.fooddata"
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="item in foodPos"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="所属区域" style="width: 350px">
                  <el-cascader
                    style="width: 200px"
                    v-model="valuepark"
                    placeholder="请选择省市区"
                    :options="options"
                    :props="{ multiple: true, checkStrictly: true }"
                    @change="handleChange"
                  ></el-cascader>
                </el-form-item>

                <el-form-item label="所属季节" style="width: 350px">
                  <el-select v-model="value1" multiple placeholder="请选择">
                    <el-option
                      style="width: 200px"
                      v-for="item in before"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>

                <el-form-item label="特点" style="width: 350px">
                  <el-input
                    type="textarea"
                    style="width: 200px"
                    v-model="ruleForm.region"
                  ></el-input>
                </el-form-item>
                <el-form-item label="做法" style="width: 350px">
                  <el-input
                    type="textarea"
                    style="width: 200px"
                    v-model="ruleForm.desc"
                  ></el-input>
                </el-form-item>
                <el-form-item label="图片" style="width: 350px">
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
                <el-switch
                  v-model="ruleForm.delivery"
                  active-text="分享平台"
                  inactive-text="不分享平台"
                >
                </el-switch>
                <el-switch
                  style="margin-left: 20px"
                  v-model="ruleForm.delivery1"
                  active-text="常用"
                  inactive-text="不常用"
                >
                </el-switch>
              </el-form>
            </div>

            <!-- 菜品所含信息 -->
            <!-- 菜品所含食材信息 -->
            <div class="mationtxt">菜品所含食材信息</div>
            <div>
              <el-button @click="addLine">添加行数</el-button>
              <el-button @click="save">保存</el-button>
              <el-table
                :data="officeonce"
                border
                v-loading="loadFlag1"
                max-height="300"
                show-summary
                style="width: 100%"
                :summary-method="getSummaries"
              >
                <el-table-column
                  prop="id"
                  label="序号"
                  width="100"
                  align="center"
                >
                </el-table-column>
                <el-table-column
                  prop="frame"
                  label="分类ID "
                  width="100"
                  align="center"
                >
                </el-table-column>
                <el-table-column label="食品名称" width="190" align="center">
                  <template slot-scope="scope">
                    <el-input
                      style="width: 90px"
                      v-model="scope.row.name"
                      :disabled="true"
                    >
                    </el-input>
                    <el-button
                      type="primary"
                      size="small"
                      style="margin-left: 10px"
                      @click="columnEvent(scope.row, scope.$index)"
                      plain
                      >选择</el-button
                    >
                  </template>
                </el-table-column>
                <el-table-column
                  prop="address"
                  label="食品分类"
                  width="120"
                  align="center"
                ></el-table-column>
                <el-table-column
                  prop="stats"
                  label="用量(g)"
                  width="120"
                  align="center"
                >
                  <template slot-scope="scope">
                    <el-input
                      style="width: 90px"
                      @input="hello(scope.row, scope.$index)"
                      v-model="scope.row.stats"
                      clearable
                    >
                    </el-input>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="malloc"
                  label="能量"
                  width="120"
                  align="center"
                ></el-table-column>
                <el-table-column
                  prop="malloc"
                  label="能量(kcal)"
                  width="110"
                  align="center"
                >
                  <template slot-scope="scope">
                    <!-- {{scope.row.malloc}} -->
                    <!-- <span v-if="!scope.row.stats">{{ scope.row.malloc }}</span>
              <span v-else>{{
                (scope.row.stats / 100) * scope.row.malloc
              }}</span> -->
                    <el-input
                      :disabled="true"
                      style="width: 90px"
                      v-model="scope.row.malloc"
                      clearable
                    >
                    </el-input>
                  </template>
                </el-table-column>

                <!--操作格-->
                <el-table-column label="操作" align="center">
                  <template slot-scope="scope">
                    <el-button
                      type="text"
                      size="small"
                      style="margin-left: 10px"
                      >查看</el-button
                    >
                    <el-button
                      type="text"
                      size="small"
                      style="margin-left: 10px"
                      @click="handleDelete(scope.$index, scope.row)"
                      >删除</el-button
                    >
                  </template>
                </el-table-column>
              </el-table>
            </div>
            <!-- 菜品营养素信息 -->
            <div class="mationtxt">菜品营养素信息</div>
            <div class="saveas">
              <el-table
                :data="mailto"
                style="width: 100%; margin-bottom: 20px"
                row-key="id"
                max-height="400"
                v-loading="loadFlag"
                :default-expand-all="false"
                :tree-props="{
                  children: 'children',
                  hasChildren: 'hasChildren'
                }"
              >
                <el-table-column
                  prop="title"
                  label="营养素"
                  align="center"
                  width="200"
                ></el-table-column>
                <el-table-column
                  prop="unit"
                  label="单位"
                  width="180"
                  align="center"
                ></el-table-column>

                <el-table-column label="含量" align="center">
                  <template slot-scope="scope">
                    <el-input
                      v-model="scope.row.result"
                      type="text"
                      v-if="scope.row.level != 1 ? true : false"
                      placeholder="请输入内容"
                    ></el-input>
                  </template>
                  <!-- v-if="scope.row.dients" -->
                </el-table-column>
              </el-table>
            </div>
          </div>
          <!-- 结束 -->
        </div>
        <div class="autosave">
          <el-button @click="saveItem" type="primary">编辑保存</el-button>
          <el-button @click="savefiles" type="primary">保存并新增</el-button>
        </div>
      </el-tab-pane>
      <!-- 公共菜品库 -->
      <el-tab-pane label="公共菜品库" name="second">
        <div class="coffee">
          <div class="whole">
            <div class="export">全部</div>
            <div class="export1">公开</div>
            <div class="export2">隐藏</div>
          </div>
          <!-- 全国查找 -->
          <div class="country">
            <div class="country1">
              <template>
                <el-select v-model="value" placeholder="请选择">
                  <el-option
                    v-for="item in examine"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </template>
            </div>
            <div class="country2">
              <template>
                <el-select v-model="before1" placeholder="请选择">
                  <el-option
                    v-for="item in before"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </template>
            </div>
            <div class="country2">
              <template>
                <el-select v-model="really1" placeholder="请选择">
                  <el-option
                    v-for="item in really"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </template>
            </div>
          </div>
          <!-- 结束 -->
          <div class="monly">
            <div class="block">
              <p></p>
              <el-tree
                :data="data"
                :props="defaultProps"
                node-key="id"
                :default-expand-all="false"
                :expand-on-click-node="false"
              >
                <span class="custom-tree-node" slot-scope="{ node, data }">
                  <span>{{ node.label }}</span>
                  <span>
                    <el-button
                      type="text"
                      size="mini"
                      @click="() => prepare(data)"
                    >
                      查看
                    </el-button>
                  </span>
                </span>
              </el-tree>
            </div>
            <!-- 结束 -->
          </div>
        </div>
        <div class="mation">
          <div class="mationtxt">菜品信息</div>
          <div class="mationinput">
            <el-form
              :model="ruleForm"
              :rules="rules"
              :inline="true"
              ref="ruleForm"
              label-width="100px"
              class="demo-ruleForm"
            >
              <el-form-item label="菜品名字" prop="name" style="width: 350px">
                <!-- <el-input style="width: 200px" v-model="ruleForm.name"></el-input> -->
                <span>{{ ruleForm1.name }}</span>
              </el-form-item>
              <el-form-item
                label="菜品分类"
                prop="fooddata"
                style="width: 350px"
              >
                <el-select
                  style="width: 200px"
                  v-model="ruleForm1.fooddata"
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in foodPos"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="所属区域" style="width: 350px">
                <el-cascader
                  style="width: 200px"
                  v-model="valuepark1"
                  placeholder="请选择省市区"
                  :options="options"
                  :props="{ multiple: true, checkStrictly: true }"
                  @change="handleChange"
                ></el-cascader>
              </el-form-item>

              <el-form-item label="所属季节" style="width: 350px">
                <el-select v-model="value2" multiple placeholder="请选择">
                  <el-option
                    style="width: 200px"
                    v-for="item in before"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="特点" style="width: 350px">
                <span>{{ ruleForm1.region }}</span>
              </el-form-item>

              <el-form-item label="做法" style="width: 350px">
                <span>{{ ruleForm1.desc }}</span>
              </el-form-item>
              <el-form-item label="图片" style="width: 350px">
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
              <!-- <el-form-item label="常用" style="">
                <el-switch v-model="ruleForm1.delivery1"></el-switch>
              </el-form-item> -->
              <!-- <el-switch
                v-model="ruleForm1.delivery1"
                active-text="常用"
                inactive-text="不常用"
              >
              </el-switch> -->
            </el-form>
          </div>
          <!-- 菜品所含食材信息 -->
          <div class="mationtxt">菜品所含食材信息</div>
          <div>
            <!-- <el-button @click="addLine">添加行数</el-button>
            <el-button @click="save">保存</el-button> -->
            <el-table
              :data="officeonce"
              border
              v-loading="loadFlag1"
              show-summary
              style="width: 100%"
              :summary-method="getSummaries"
            >
              <el-table-column
                prop="id"
                label="序号"
                width="100"
                align="center"
              >
              </el-table-column>
              <el-table-column
                prop="frame"
                label="分类ID "
                width="100"
                align="center"
              >
              </el-table-column>
              <el-table-column label="食品名称" width="190" align="center">
                <template slot-scope="scope">
                  <el-input
                    style="width: 90px"
                    v-model="scope.row.name"
                    :disabled="true"
                  >
                  </el-input>
                  <!-- <el-button
                    type="primary"
                    size="small"
                    style="   margin-left: 10px;"
                    @click="columnEvent(scope.row, scope.$index)"
                    plain
                    >选择</el-button
                  > -->
                </template>
              </el-table-column>
              <el-table-column
                prop="address"
                label="食品分类"
                width="120"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="stats"
                label="用量(g)"
                width="120"
                align="center"
              >
                <template slot-scope="scope">
                  <el-input
                    style="width: 90px"
                    @input="hello(scope.row, scope.$index)"
                    v-model="scope.row.stats"
                    clearable
                  >
                  </el-input>
                </template>
              </el-table-column>
              <el-table-column
                prop="malloc"
                label="能量"
                width="120"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="malloc"
                label="能量(kcal)"
                width="110"
                align="center"
              >
                <template slot-scope="scope">
                  <!-- {{scope.row.malloc}} -->
                  <!-- <span v-if="!scope.row.stats">{{ scope.row.malloc }}</span>
              <span v-else>{{
                (scope.row.stats / 100) * scope.row.malloc
              }}</span> -->
                  <el-input
                    :disabled="true"
                    style="width: 90px"
                    v-model="scope.row.malloc"
                    clearable
                  >
                  </el-input>
                </template>
              </el-table-column>

              <!--操作格-->
            </el-table>
          </div>
          <!-- 菜品营养素信息 -->
          <div class="mationtxt">菜品营养素信息</div>
          <div class="saveas">
            <el-table
              :data="mailto"
              style="width: 100%; margin-bottom: 20px"
              row-key="id"
              border
              v-loading="loadFlag"
              :default-expand-all="false"
              :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
            >
              <el-table-column
                prop="title"
                label="营养素"
                align="center"
                width="200"
              ></el-table-column>
              <el-table-column
                prop="unit"
                label="单位"
                width="180"
                align="center"
              ></el-table-column>

              <el-table-column label="含量" align="center">
                <template slot-scope="scope">
                  <el-input
                    v-model="scope.row.result"
                    type="text"
                    v-if="scope.row.level != 1 ? true : false"
                    placeholder="请输入内容"
                  ></el-input>
                </template>
                <!-- v-if="scope.row.dients" -->
              </el-table-column>
            </el-table>
          </div>
        </div>
      </el-tab-pane>
      <!-- 结束 -->
    </el-tabs>
    <!-- 树形结构 -->
    <el-dialog
      title="添加食品名称"
      append-to-body
      :visible.sync="dateTime"
      :close-on-click-modal="false"
    >
      <div class="monly">
        <div class="block">
          <p></p>
          <el-tree
            :data="data1"
            node-key="id"
            :default-expand-all="false"
            :expand-on-click-node="false"
            @node-click="handleNodeClick"
          ></el-tree>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dateTime = false">取 消</el-button>
        <el-button @click="setlist" type="primary">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    const data = [
      {
        id: 1,
        label: "一级 1",
        children: [
          {
            id: 4,
            label: "二级 1-1"
          }
        ]
      }
      //树形结构
    ];
    return {
      data: JSON.parse(JSON.stringify(data)), //树形结构
      activeName: "second",
      ruleForm1: {
        name: "1223123", //菜品名字
        fooddata: "", //菜品分类
        region: "", //特点
        desc: "", //做法
        delivery: false, //公开
        delivery1: false //常用
      },
      ruleForm: {
        name: "", //菜品名字
        fooddata: "", //菜品分类
        region: "", //特点
        desc: "", //做法
        delivery: false, //公开
        delivery1: false //常用
      },
      foodPos: [], //菜品分类
      valuepark: [], //所属区域
      valuepark1: [],
      options: [], //所属区域
      mailto: [], //营养素含量
      dateTime: false, //弹出框
      officeonce: [
        //菜品所含信息
        {
          id: "",
          frame: "", //分类ID
          name: "", //食品名称
          address: "", //食品分类
          stats: "", //用量
          malloc: "" //能量
        }
      ],
      //季节查询
      value1: [], //所属季节
      value2: [], //所属季节
      before: [
        {
          value: "0",
          label: "全部"
        },
        {
          value: "1",
          label: "春季"
        },
        {
          value: "2",
          label: "夏季"
        },
        {
          value: "3",
          label: "秋季"
        },
        {
          value: "4",
          label: "冬季"
        }
      ],
      before1: "0",
      //全部 常用
      really: [
        {
          value: "0",
          label: "全部"
        },
        {
          value: "1",
          label: "常用"
        }
      ],
      really1: "0",
      csListIndex: null,
      temp: [],
      lower: 0
    };
  },
  beforeMount() {
    this.Protocol(); //营养素含量
    this.muito(); //分类
    this.Provinces(); //省市区
    this.Addraudit(); //树形结构渲染
    this.obtains(); //左边树形结构
  },
  methods: {
    handleClick(tab) {
      this.lower = tab.index;
      console.log(this.lower);
      // console.log(tab);
    },
    //表格弹出框
    columnEvent(row, index) {
      this.dateTime = true;
      this.csListIndex = index;
      //   for (let k in row) {
      //     this.csList[k] = row[k];
      //   }
    },
    hello(row, i) {
      // row.malloc = (row.stats / 100) * row.malloc;
      // row.malloc = row.malloc100;
      // row.malloc = (row.malloc / 100) * row.stats;
      // console.log(row.malloc);
      if (row.stats) {
        console.log(this.temp[i]);
        row.malloc = ((this.temp[i] / 100) * Number(row.stats)).toFixed(2);
        // console.log(row.malloc);
      } else {
        row.malloc = this.temp[i];
      }
    },

    //点击查看详情
    handleNodeClick(data) {
      console.log(data);
      this.flour = data.id;
      this.$axios
        .get(`api/blade-food/food/detail?id=${this.flour}`, {
          headers: {
            "Content-Type": "application/json"
          }
        })
        .then(res => {
          //   console.log(res);

          this.inquired = res.data.data;
          console.log(this.inquired);
          this.inquired.nutritions.forEach((item, index) => {
            // console.log(item);
            if (item.nutrientId == 101) {
              this.officeonce[this.csListIndex].malloc = item.value;
            }
          });
          //   this.getInput.cs = this.inquired.foodName; //食材名
          this.officeonce[this.csListIndex].id = this.inquired.id;
          this.officeonce[this.csListIndex].frame = this.inquired.foodType;
          this.officeonce[this.csListIndex].name = this.inquired.foodName;
          this.officeonce[
            this.csListIndex
          ].address = this.inquired.foodTypeName;
          // this.officeonce[this.csListIndex].name = this.inquired.foodName;
          //   console.log(this.getInput);
          this.temp.length = 0;
          this.officeonce.forEach((item, i) => {
            this.temp[i] = Number(item.malloc);
          });
          console.log(this.temp);
        });
    },
    //添加行数
    addLine() {
      var newValue = {
        id: "",
        name: "", //食品名称
        address: "", //食品分类
        stats: "", //用量
        malloc: "" //能量
      };
      //添加新的行数
      this.officeonce.push(newValue);
    },
    handleDelete(index) {
      //删除行数
      this.officeonce.splice(index, 1);
    },
    save() {
      //这部分应该是保存提交你添加的内容
      console.log(JSON.stringify(this.officeonce));
    },
    //获取树形结构
    obtains() {
      this.$axios

        .get(
          `api/blade-food/basetype/getDishByBaseId?isPrivate=${1}&typeTemp=${2}`
        )
        .then(res => {
          //   console.log(res);
          this.obtain = res.data.data;
          let foto = [];
          this.obtain.forEach((item, index) => {
            // console.log(item);
            foto[index] = {
              id: item.id,
              label: item.typeName
            };
            foto[index].children = [];
            item.dishes.forEach((item1, index1) => {
              foto[index].children[index1] = {
                id: item1.id,
                label: item1.dishName,
                isPub: item1.isPub,
                isUse: item1.isUse
              };
            });
          });
          this.data = foto;
          console.log(foto);
        });
    },
    //树形渲染数
    Addraudit() {
      this.$axios
        .get(`api/blade-food/basetype/getFoodByBaseId?isPrivate=1`, {
          headers: {
            "Content-Type": "application/json"
          }
        })
        .then(res => {
          // console.log(res);
          this.fication = res.data.data;
          //   console.log(this.fication);
          let Front = [];
          this.fication.forEach((item, index) => {
            // console.log(item);
            Front[index] = {
              id: item.id,
              label: item.typeName
            };
            Front[index].children = [];
            item.foods.forEach((item1, index1) => {
              Front[index].children[index1] = {
                id: item1.id,
                label: item1.foodName
              };
            });
          });
          // console.log(Front);
          this.data1 = Front;
        });
    },
    //营养素含量
    Protocol() {
      this.$axios
        .get(`api/blade-food/nutrition/tree`, {
          headers: {
            "Content-Type": "application/json"
          }
        })
        .then(res => {
          // console.log(res);
          this.mailto = res.data.data;
        });
    },
    //省市区
    handleChange(value) {
      console.log(value);
    },
    Provinces() {
      // http://api.yytianqi.com/citylist/id/2

      this.$axios
        .get(`api/blade-system/region/selectCityOrProvince`, {
          headers: {
            "Content-Type": "application/json"
          }
        })
        .then(res => {
          // console.log(res);
          this.national = res.data.data;
          // console.log(this.national);
          let arr = [];
          this.national.forEach((item, index) => {
            arr[index] = {
              value: item.id,
              label: item.name
            };
            arr[index].children = [];
            // console.log(item.children instanceof Array);
            if (item.children) {
              item.children.forEach((item1, index1) => {
                arr[index].children[index1] = {
                  value: item1.id,
                  label: item1.name
                };
              });
            }
          });

          // this.$set(this.national, arr)
          this.options = arr;
        });
    },
    // 分类
    muito() {
      this.$axios
        .get(`api/blade-food/basetype/getList?type=${2}&isPrivate=${1}`, {})
        .then(res => {
          //   console.log(res);
          this.details = res.data.data;
          let obtain = [];
          this.details.forEach((item, index) => {
            // console.log(item);
            obtain.push({
              value: item.id,
              label: item.typeName
            });
          });
          console.log(obtain);
          this.foodPos = obtain;
        });
    }
  }
};
</script>

<style scoped>
.typeList {
  width: 100%;
  height: 100%;
  background-color: #fff;
}
.dishes {
  width: 100%;
  height: 100%;
  background-color: #fff;
}
.coffee {
  width: 29%;
  height: 1200px;
  background-color: #fff;
  float: left;
  border-right: 1px solid #e0e0e0;
}
.mation {
  width: 70%;
  height: 1200px;
  background-color: #fff;
  float: left;
}
.import {
  width: 100%;
  height: 50px;
  /* background-color: red; */
  margin-left: 20px;
  margin-top: 10px;
  line-height: 50px;
}
.whole {
  width: 100%;
  height: 40px;
  /* background-color: red; */
}
.export {
  width: 100px;
  height: 30px;
  /* background-color: yellow; */
  text-align: center;
  line-height: 30px;
  border-right: 1px solid#e0e0e0;
  font-size: 14px;
  float: left;
}
.export1 {
  width: 100px;
  height: 30px;
  text-align: center;
  line-height: 30px;
  border-right: 1px solid #e0e0e0;
  font-size: 14px;
  float: left;
}
.export2 {
  width: 100px;
  height: 30px;
  text-align: center;
  line-height: 30px;
  font-size: 14px;
  float: left;
}
.country {
  width: 100%;
  height: 50px;
  /* background-color: red; */
  line-height: 50px;
}
.country1 {
  width: 90px;
  float: left;
  margin-left: 10px;
}
.country2 {
  width: 90px;
  float: left;
  margin-left: 10px;
}
.mationtxt {
  width: 100%;
  height: 30px;
  line-height: 30px;
  padding-left: 20px;
  font-size: 16px;
  font-weight: bold;
}
.autosave {
  width: 100%;
  height: 50px;
  /* background-color:red; */
  /* float: left; */
  margin-bottom: 50px;
  margin-top: 20px;
  text-align: center;
  line-height: 50px;
}
</style>
