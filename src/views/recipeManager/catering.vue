<template>
  <div class="choose">
    <div class="flexi">
      <div>
        <span class="demonstration" style="padding-right: 10px;">选择日期</span>
        <el-date-picker
          style="width:300px"
          v-model="value1"
          type="daterange"
          format="yyyy 年 MM 月 dd 日"
          value-format="yyyy-MM-dd"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        >
        </el-date-picker>
        <span style="padding-right: 10px;padding-left: 30px;">人群年龄</span>
        <el-input
          style="width:140px"
          placeholder="请输入内容"
          v-model="input"
          clearable
        >
        </el-input>
        ~
        <el-input
          style="width:140px"
          placeholder="请输入内容"
          v-model="input"
          clearable
        >
        </el-input>
        <span style="padding-left: 50px;padding-right: 10px;">公开</span>
        <el-switch v-model="delivery"></el-switch>
        <span style="padding-left: 30px;padding-right: 10px;">推荐</span>
        <el-switch v-model="delivery1"></el-switch>
        <span style="padding-left: 30px;padding-right: 10px;">收藏</span>
        <el-switch v-model="delivery2"></el-switch>
      </div>
      <div class="groups">
        <span style="padding-right: 10px;">餐点设置</span>
        <el-checkbox v-model="checked">早餐</el-checkbox>
        <el-checkbox v-model="checked1">早点</el-checkbox>
        <el-checkbox v-model="checked2">午餐</el-checkbox>
        <el-checkbox v-model="checked3">午点</el-checkbox>
        <el-checkbox v-model="checked4">晚餐</el-checkbox>
        <el-checkbox v-model="checked5">晚点</el-checkbox>

        <span style="padding-right: 10px;padding-left: 10px;">周天数</span>
        <el-checkbox v-model="checked6">5天</el-checkbox>
        <el-checkbox v-model="checked7">6天</el-checkbox>
        <el-checkbox v-model="checked8">7天</el-checkbox>

        <span style="padding-right: 10px;padding-left: 10px;">周天数</span>
        <el-radio-group v-model="radio">
          <el-radio :label="3">5天</el-radio>
          <el-radio :label="6">6天</el-radio>
          <el-radio :label="9">5天</el-radio>
        </el-radio-group>
      </div>

      <div class="results">
        <el-button type="primary" size="small" style="margin-left: 0px;"
          >智能配平</el-button
        >
        <el-button type="primary" size="small" style="margin-left: 20px;"
          >自动设置油盐糖</el-button
        >
        <el-button type="primary" size="small" style="margin-left: 20px;"
          >自动清除油盐糖</el-button
        >
        <el-button type="primary" size="small" style="margin-left: 20px;"
          >营养素</el-button
        >
        <el-button type="primary" size="small" style="margin-left: 20px;"
          >带量食谱</el-button
        >
        <el-button type="success">编辑保存</el-button>
        <el-button @click="autosave" type="success">保存并新增</el-button>
      </div>
    </div>
    <div class="gresults">
      <div class="search">
        <div class="tab" style=" width: 100%;height:35px;">
          <el-button
            style="margin-left: 5px;width:100px"
            :type="0 == display ? 'primary' : 'default'"
            @click="displayCheck(0)"
            >食谱
          </el-button>
          <el-button
            style="width:100px"
            :type="1 == display ? 'primary' : 'default'"
            @click="displayCheck(1)"
            >菜品</el-button
          >
          <div v-show="display == 0">
            <div class="opening">
              <div class="export">全部</div>
              <div class="export1">公开</div>
              <div class="export2">隐藏</div>
              <div class="export3">推荐</div>
            </div>
            <!-- 查找 -->
            <div class="and-query">
              <div class="country1">
                <template>
                  <el-select
                    style="width:100px"
                    v-model="value"
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="item in examine"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </template>
                <template>
                  <el-select
                    style="width:100px;margin-left: 10px;"
                    v-model="value"
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="item in examine"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </template>
              </div>
            </div>
            <!-- 结束 -->
            <el-tree
              :data="data1"
              :props="defaultProps"
              @node-click="handleNodeClick"
            ></el-tree>
          </div>
          <div v-show="display == 1">
            <div class="opening">
              <div class="export4">全部</div>
              <div class="export5">公开</div>
              <div class="export3">隐藏</div>
            </div>
            <div class="and-query1">
              <div class="country1">
                <template>
                  <el-select
                    style="width:100px"
                    v-model="value"
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="item in examine"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </template>
                <template>
                  <el-select
                    style="width:100px;margin-left: 10px;"
                    v-model="before1"
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="item in before"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </template>
                <template>
                  <el-select
                    style="width:100px;margin-top: 10px;"
                    v-model="really1"
                    placeholder="请选择"
                  >
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
                  node-key="id"
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
            </div>
            <!-- 结束 -->
          </div>
        </div>
      </div>
      <!-- 表格 -->
      <div class="field">
        <el-table :data="tableData" border style="width: 100%;heigth:100%">
          <el-table-column
            align="center"
            prop="date"
            label="菜品/食物"
            width="100"
          >
          </el-table-column>
          <el-table-column align="center" width="400" label="周一">
            <template slot-scope="scope">
              <el-table
                :data="scope.row.tabaldata1"
                style="width: 100%;margin-bottom: 20px;"
                row-key="id"
                :default-expand-all="false"
                :tree-props="{
                  children: 'children',
                  hasChildren: 'hasChildren'
                }"
              >
                <el-table-column
                  prop="name"
                  align="center"
                  label="食品/食材"
                  width="170"
                >
                </el-table-column>
                <el-table-column label="用量(g)" align="center" width="100">
                  <template slot-scope="scope">
                    <el-input
                      v-model="scope.row.date"
                      type="text"
                      placeholder="请输入内容"
                    ></el-input>
                  </template>
                </el-table-column>
                <el-table-column width="100" label="操作" align="center">
                  <template slot-scope="scope">
                    <!-- <el-button
                      type="text"
                      size="small"
                      @click="Choice(scope.row, scope.$index)"
                      >选择</el-button
                    > -->
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
              <el-button
                type="primary"
                size="small"
                @click="Choice(scope.row.tabaldata1, scope.$index, 1)"
                >选择食谱/菜品</el-button
              >
            </template>
          </el-table-column>
          <el-table-column align="center" width="400" prop="name" label="周二">
            <template slot-scope="scope">
              <el-table
                :data="scope.row.tabaldata2"
                style="width: 100%;margin-bottom: 20px;"
                row-key="id"
                :default-expand-all="false"
                :tree-props="{
                  children: 'children',
                  hasChildren: 'hasChildren'
                }"
              >
                <el-table-column
                  prop="name"
                  align="center"
                  label="食品/食材"
                  width="170"
                >
                </el-table-column>
                <el-table-column label="用量(g)" align="center" width="100">
                  <template slot-scope="scope">
                    <el-input
                      v-model="scope.row.date"
                      type="text"
                      placeholder="请输入内容"
                    ></el-input>
                  </template>
                </el-table-column>
                <el-table-column width="100" label="操作" align="center">
                  <template slot-scope="scope">
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
              <el-button
                type="primary"
                size="small"
                @click="Choice(scope.row.tabaldata2, scope.$index, 2)"
                >选择食谱/菜品</el-button
              >
            </template>
          </el-table-column>
          <el-table-column align="center" width="400" prop="name" label="周三">
            <template slot-scope="scope">
              <el-table
                :data="scope.row.tabaldata3"
                style="width: 100%;margin-bottom: 20px;"
                row-key="id"
                :default-expand-all="false"
                :tree-props="{
                  children: 'children',
                  hasChildren: 'hasChildren'
                }"
              >
                <el-table-column
                  prop="name"
                  align="center"
                  label="食品/食材"
                  width="170"
                >
                </el-table-column>
                <el-table-column label="用量(g)" align="center" width="100">
                  <template slot-scope="scope">
                    <el-input
                      v-model="scope.row.date"
                      type="text"
                      placeholder="请输入内容"
                    ></el-input>
                  </template>
                </el-table-column>
                <el-table-column width="100" label="操作" align="center">
                  <template slot-scope="scope">
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
              <el-button
                type="primary"
                size="small"
                @click="Choice(scope.row.tabaldata3, scope.$index, 3)"
                >选择食谱/菜品</el-button
              >
            </template>
          </el-table-column>
          <el-table-column align="center" width="400" prop="name" label="周四">
            <template slot-scope="scope">
              <el-table
                :data="scope.row.tabaldata4"
                style="width: 100%;margin-bottom: 20px;"
                row-key="id"
                :default-expand-all="false"
                :tree-props="{
                  children: 'children',
                  hasChildren: 'hasChildren'
                }"
              >
                <el-table-column
                  prop="name"
                  align="center"
                  label="食品/食材"
                  width="170"
                >
                </el-table-column>
                <el-table-column label="用量(g)" align="center" width="100">
                  <template slot-scope="scope">
                    <el-input
                      v-model="scope.row.date"
                      type="text"
                      placeholder="请输入内容"
                    ></el-input>
                  </template>
                </el-table-column>
                <el-table-column width="100" label="操作" align="center">
                  <template slot-scope="scope">
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
              <el-button
                type="primary"
                size="small"
                @click="Choice(scope.row.tabaldata4, scope.$index, 4)"
                >选择食谱/菜品</el-button
              >
            </template>
          </el-table-column>
          <el-table-column align="center" width="400" prop="name" label="周五">
            <template slot-scope="scope">
              <el-table
                :data="scope.row.tabaldata5"
                style="width: 100%;margin-bottom: 20px;"
                row-key="id"
                :default-expand-all="false"
                :tree-props="{
                  children: 'children',
                  hasChildren: 'hasChildren'
                }"
              >
                <el-table-column
                  prop="name"
                  align="center"
                  label="食品/食材"
                  width="170"
                >
                </el-table-column>
                <el-table-column label="用量(g)" align="center" width="100">
                  <template slot-scope="scope">
                    <el-input
                      v-model="scope.row.date"
                      type="text"
                      placeholder="请输入内容"
                    ></el-input>
                  </template>
                </el-table-column>
                <el-table-column width="100" label="操作" align="center">
                  <template slot-scope="scope">
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
              <el-button
                type="primary"
                size="small"
                @click="Choice(scope.row.tabaldata5, scope.$index, 5)"
                >选择食谱/菜品</el-button
              >
            </template>
          </el-table-column>
          <el-table-column
            v-if="checked7"
            align="center"
            width="400"
            prop="name"
            label="周六"
          >
          </el-table-column>
          <el-table-column
            v-if="checked8"
            align="center"
            width="400"
            prop="name"
            label="周天"
          >
          </el-table-column>
        </el-table>
      </div>
      <!-- 弹出框 -->
      <el-dialog
        title="选择食谱/菜品"
        append-to-body
        :visible.sync="dateTime"
        :close-on-click-modal="false"
      >
        <div>
          <el-button
            style="margin-left: 5px;width:200px"
            :type="0 == display ? 'primary' : 'default'"
            @click="displayCheck(0)"
            >食谱
          </el-button>
          <el-button
            style="width:200px"
            :type="1 == display ? 'primary' : 'default'"
            @click="displayCheck(1)"
            >菜品</el-button
          >
          <div v-show="display == 0">
            0000
          </div>
          <div v-show="display == 1">
            <div class="block">
              <p></p>
              <el-tree
                :data="data"
                node-key="id"
                @node-click="handleNodeClick1"
                :expand-on-click-node="false"
              >
              </el-tree>
            </div>
          </div>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dateTime = false">取 消</el-button>
          <el-button @click="setlist" type="primary">确 定</el-button>
        </div>
      </el-dialog>
      <div class="profile">
        <el-button type="success">编辑保存</el-button>
        <el-button @click="autosave" type="success">保存并新增</el-button>
      </div>
    </div>
  </div>
</template>

<script>
let id = 1000;
export default {
  data() {
    const data = [];
    return {
      right: false,
      data: JSON.parse(JSON.stringify(data)), //树形结构
      dateTime: false, //弹出框
      cur: 0,
      display: "0",
      value1: "", //时间
      checked: true,
      checked1: true,
      checked2: true,
      checked3: true,
      checked4: false,
      checked5: false,
      checked6: false,
      checked7: false,
      checked8: false,
      delivery: false, //公开
      delivery1: false, //常用
      delivery2: false, //收藏
      thehabit: [],
      tableData: [
        {
          date: "早餐",
          tabaldata1: [
            {
              id: "11",
              name: "西红柿鸡蛋",
              date: "200",
              children: [
                {
                  id: "22",
                  name: "西红柿",
                  date: "100"
                },
                {
                  id: "33",
                  name: "鸡蛋",
                  date: "100"
                }
              ]
            }
          ],
          tabaldata2: [
            {
              id: 3,
              name: "绿豆粥",
              date: "200",
              children: [
                {
                  id: 31,
                  name: "绿豆",
                  date: "50"
                },
                {
                  id: 32,
                  name: "粥",
                  date: "50"
                }
              ]
            }
          ]
        },
        {
          date: "早点",
          tabaldata1: [
            {
              id: 3,
              name: "酸奶",
              date: "200",
              children: [
                {
                  id: 31,
                  name: "酸奶",
                  date: "50"
                },
                {
                  id: 32,
                  name: "水",
                  date: "50"
                }
              ]
            }
          ]
        },
        {
          date: "午餐",
          tabaldata1: [
            {
              id: 3,
              name: "肉末豆腐",
              date: "300",
              children: [
                {
                  id: 31,
                  name: "肉",
                  date: "150"
                },
                {
                  id: 32,
                  name: "豆腐",
                  date: "50"
                }
              ]
            }
          ]
        },
        {
          date: "午点",
          tabaldata1: [
            {
              id: 3,
              name: "夹心饼干",
              date: "30",
              children: [
                {
                  id: 31,
                  name: "面粉",
                  date: "150"
                },
                {
                  id: 32,
                  name: "饼干",
                  date: "50"
                }
              ]
            }
          ]
        }
        // {
        //   date: "晚餐"
        // },
        // {
        //   date: "晚点"
        // }
      ],

      datadata1: [],
      dataindex1: undefined,
      dataindex2: undefined,

      name: "",
      examine: [
        //下拉框分类
        {
          value: "选项1",
          label: "全国"
        },
        {
          value: "选项2",
          label: "浙江"
        },
        {
          value: "选项3",
          label: "上海"
        }
      ],
      value: "",
      data1: [
        {
          label: "2020年8月（8.29-9.04）食谱"
        },
        {
          label: "2020年8月（8.29-9.04）食谱"
        },
        {
          label: "2020年8月（8.29-9.04）食谱"
        }
      ],
      //季节查询
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
      radio: 6
    };
  },
  beforeMount() {
    this.obtains(); //获取树形结构
  },
  methods: {
    //保存并新增
    autosave() {
      // console.log(this.checked7);
      console.log(this.radio);
      console.log(this.value1); //时间
      console.log(this.tableData);
      // this.tableData.forEach((item, index) => {
      //   console.log(item.date);
      // });
      // console.log(bionu);
      // this.$axios.post(`api/blade-food/recipe/save`,{

      // }).then(res=>{
      //   console.log(res);
      // })
    },
    //点击查看详情
    handleNodeClick1(data) {
      // console.log(data);
      this.auto = data.id;
      this.$axios
        .get(`api/blade-food/dish/dishDetail?id=${this.auto}`, {})
        .then(res => {
          // console.log(res);
          this.thehabit = res.data.data;
          console.log(this.thehabit);

          // this.thehabit.
          // let arr = [];
          // arr.push({
          //   id: this.thehabit.id,
          //   name: this.thehabit.dishName,
          //   date: this.thehabit.provinces,
          //   children: this.thehabit.dishMxVos
          // });
          // console.log(arr);

          if (this.dataindex2 == 1) {
            this.tableData[this.dataindex1].tabaldata1.push({
              week: this.dataindex2,
              id: this.thehabit.id,
              name: this.thehabit.dishName,
              date: this.thehabit.provinces,
              children: this.thehabit.dishMxVos
            });
            console.log(this.tableData[this.dataindex1].tabaldata1);
          } else if (this.dataindex2 == 2) {
            this.tableData[this.dataindex1].tabaldata2.push({
              week: this.dataindex2,
              id: this.thehabit.id,
              name: this.thehabit.dishName,
              date: this.thehabit.provinces,
              children: this.thehabit.dishMxVos
            });
          } else if (this.dataindex2 == 3) {
            this.tableData[this.dataindex1].tabaldata3.push({
              id: this.thehabit.id,
              name: this.thehabit.dishName,
              date: this.thehabit.provinces,
              children: this.thehabit.dishMxVos
            });
          } else if (this.dataindex2 == 4) {
            this.tableData[this.dataindex1].tabaldata4.push({
              id: this.thehabit.id,
              name: this.thehabit.dishName,
              date: this.thehabit.provinces,
              children: this.thehabit.dishMxVos
            });
          } else if (this.dataindex2 == 5) {
            this.tableData[this.dataindex1].tabaldata5.push({
              id: this.thehabit.id,
              name: this.thehabit.dishName,
              date: this.thehabit.provinces,
              children: this.thehabit.dishMxVos
            });
          }
          // console.log(this.tableData[this.dataindex1].tabaldata1);
          // let open = [];

          // this.thehabit.dishMxVos.forEach((item, index) => {
          //   // console.log(item, index);
          //   open[index] = {
          //     id: item.id,
          //     date: item.name,
          //     name: item.value
          //   };
          // });
          // console.log(open);
          // arr.push({
          //   id: this.thehabit.id,
          //   date: this.thehabit.dishName,
          //   name: this.thehabit.provinces,
          //   children: open
          // });
          // console.log(arr);
          // this.tableData.tabaldata1 = arr;
          // console.log(this.tableData.tabaldata1);
          // this.thehabit.forEach((item, index) => {
          //   arr[index] = {
          //     id: item.id,
          //     date: item.dishName,
          //     name: item.provinces
          //   };
          // });
          // console.log(arr);
          // for(var item in this.thehabit){
          //   console.log(item)
          // }
        });
    },
    handleDelete(index, row) {
      console.log(index);
      console.log(row);
      // console.log(this.tableData[0].tabaldata1);
      // this.tableData[0].tabaldata1.splice(index, 1);
    },
    handleNodeClick(data) {
      console.log(data);
    },

    //表格弹出框
    Choice(row, index1, index2) {
      this.datadata1 = row;
      this.dataindex1 = index1;
      this.dataindex2 = index2;
      console.log(index1);
      console.log(index2);
      // console.log(this.dataindex2);
      this.dateTime = true;
      // this.csListIndex = index;
      //   for (let k in row) {
      //     this.csList[k] = row[k];
      //   }
    },
    setlist() {
      this.dateTime = false;
    },
    displayCheck(flat) {
      this.display = flat;
    },

    prepare(data) {
      console.log(data);
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
    }
  }
};
</script>

<style scoped>
.choose {
  width: 100%;
  /* height: 1000px; */
  height: 100%;
  background-color: #fff;
}
.flexi {
  width: 100%;
  height: 150px;
  /* background-color: red; */
  padding-top: 15px;
  padding-left: 5px;
}
.block {
  width: 100%;
}
.results {
  margin-top: 20px;
}
.gresults {
  width: 100%;
  height: 900px;
  /* background-color: red; */
  margin-top: 30px;
}
.search {
  width: 20%;
  height: 700px;
  float: left;
}
.field {
  width: 79%;
  height: 1500px;
  float: left;
  margin-left: 10px;
}
.profile {
  text-align: center;
  margin-bottom: 100px;
}
.opening {
  width: 250px;
  height: 50px;

  margin-top: 20px;
}
.export {
  width: 50px;
  height: 30px;
  /* background-color: yellow; */
  text-align: center;
  line-height: 30px;
  border-right: 1px solid#e0e0e0;
  font-size: 14px;
  float: left;
}
.export1 {
  width: 50px;
  height: 30px;
  text-align: center;
  line-height: 30px;
  border-right: 1px solid #e0e0e0;
  font-size: 14px;
  float: left;
}
.export2 {
  width: 50px;
  height: 30px;
  text-align: center;
  border-right: 1px solid #e0e0e0;
  line-height: 30px;
  font-size: 14px;
  float: left;
}
.export3 {
  width: 50px;
  height: 30px;
  text-align: center;

  line-height: 30px;
  font-size: 14px;
  float: left;
}
.export4 {
  width: 80px;
  height: 30px;
  text-align: center;
  line-height: 30px;
  border-right: 1px solid #e0e0e0;
  font-size: 14px;
  float: left;
}
.export5 {
  width: 80px;
  height: 30px;
  text-align: center;
  line-height: 30px;
  border-right: 1px solid #e0e0e0;
  font-size: 14px;
  float: left;
}
.and-query {
  width: 250px;
  height: 50px;
  /* background-color: yellow; */
}
.and-query1 {
  width: 250px;
  height: 100px;
  /* background-color: yellow; */
}
.monly {
  width: 100%;
  height: 300px;
  /* margin-top: 20px; */
  /* background-color: red; */
}
.groups {
  width: 100%;
  height: 30px;
  /* background-color: red; */
  margin-top: 20px;
}
</style>
