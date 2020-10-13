<template>
  <div class="often">
    <div class="coffee">
      <el-input
        style=" width: 250px;height: 35px;"
        placeholder="请输入内容"
        v-model="input"
        clearable
      ></el-input>
      <div class="import">
        <el-button type="success" plain size="mini">导入</el-button>
        <el-button type="success" plain size="mini">导出</el-button>
        <el-button type="success" plain size="mini">加分类</el-button>
        <el-button type="success" plain size="mini">加食材</el-button>
      </div>
      <div class="whole">
        <div class="export">全部(326)</div>
        <div class="export1">公开(320)</div>
        <div class="export2">隐藏(6)</div>
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
      </div>
      <!-- 结束 -->
      <div class="monly">
        <div class="block">
          <p></p>
          <el-tree
            :data="data"
            show-checkbox
            node-key="id"
            default-expand-all
            :expand-on-click-node="false"
            :render-content="renderContent"
          ></el-tree>
        </div>
      </div>
    </div>
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
          <el-form-item label="菜品名字" prop="name" style=" width: 350px;">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item label="菜品分类" prop="fooddata" style=" width: 350px;">
            <el-select v-model="ruleForm.fooddata" placeholder="请选择">
              <el-option
                v-for="item in foodPos"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="所属区域" style="  width: 350px;  ">
            <el-cascader
              v-model="valuepark"
              placeholder="请选择省市区"
              :options="options"
              :props="{ multiple: true, checkStrictly: true }"
              @change="handleChange"
            ></el-cascader>
          </el-form-item>

          <el-form-item label="所属季节" style=" width: 350px;">
            <el-select v-model="value1" multiple placeholder="请选择">
              <el-option
                v-for="item in crashof"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="特点" style=" width: 350px; ">
            <el-input
              type="textarea"
              style=" width: 250px; "
              v-model="ruleForm.region"
            ></el-input>
          </el-form-item>
          <el-form-item label="做法" style=" width: 350px; ">
            <el-input
              type="textarea"
              style=" width: 250px; "
              v-model="ruleForm.desc"
            ></el-input>
          </el-form-item>
          <el-form-item label="图片" style=" width: 350px; ">
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
          <el-form-item label="公开" style="  ">
            <el-switch v-model="ruleForm.delivery"></el-switch>
          </el-form-item>

          <el-form-item label="常用" style="   ">
            <el-switch v-model="ruleForm.delivery1"></el-switch>
          </el-form-item>
        </el-form>
      </div>
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
              default-expand-all
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
      <!-- 菜品所含食材信息 -->
      <div class="mationtxt">菜品所含食材信息</div>
      <div>
        <el-table
          :data="officeonce"
          border
          style="width: 100%"
          v-loading="loadFlag"
        >
          <el-table-column prop="id" label="序号" width="100" align="center">
          </el-table-column>
          <el-table-column label="食品名称" width="160" align="left">
            <template slot-scope="scope">
              <el-input
                style="width:90px"
                v-model="scope.row.name"
                :disabled="true"
              >
              </el-input>
              <el-button
                type="primary"
                @click="columnEvent(scope.row, scope.$index)"
                icon="el-icon-edit"
                circle
              ></el-button>
            </template>
          </el-table-column>
          <el-table-column
            prop="address"
            label="食品分类"
            width="120"
            align="center"
          ></el-table-column>
          <el-table-column label="用量(g)" width="120" align="center">
            <template slot-scope="scope">
              <el-input style="width:90px" v-model="scope.row.stats" clearable>
              </el-input>
            </template>
          </el-table-column>
          <el-table-column
            prop="malloc"
            label="能量(kcal)"
            width="100"
            align="center"
          ></el-table-column>
          <!--操作格-->
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button type="text" size="small" style=" margin-left: 10px;"
                >查看</el-button
              >
              <el-button
                type="text"
                size="small"
                style=" margin-left: 10px;"
                @click="DeleteUser(scope.row)"
                >删除</el-button
              >
              <el-button
                type="text"
                size="small"
                style=" margin-left: 10px;margin-top: 10px;"
                >添加</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 菜品营养素信息 -->
      <div class="mationtxt">菜品营养素信息</div>
      <div class="saveas">
        <el-table
          :data="tableData"
          style="width: 100%;margin-bottom: 20px;"
          row-key="id"
          border
          default-expand-all
          :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
        >
          <el-table-column
            prop="name"
            label="营养素"
            sortable
            width="180"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="address"
            label="单位"
            sortable
            width="180"
            align="center"
          ></el-table-column>

          <el-table-column prop="address" label="含量" align="center">
            <template slot-scope="scope">
              <el-input
                v-model="input1"
                type="text"
                placeholder="请输入内容"
                v-if="scope.row.dients"
              ></el-input>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div style="   text-align: center;">
        <el-button type="primary">保存</el-button>
        <el-button @click="savefiles">保存并新增</el-button>
      </div>
    </div>
  </div>
</template>

<script>
let id = 1000;
export default {
  name: "often",
  data() {
    const data = [
      //树形结构
    ];
    return {
      loadFlag: false, //加载flag
      dateTime: false, //弹出框
      input: "", //搜索
      getInput: {
        cs: "123123",
        cs2: ""
      }, //表格输入框
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
      data: JSON.parse(JSON.stringify(data)), //树形结构
      ruleForm: {
        name: "", //菜品名字
        fooddata: "", //菜品分类
        region: "", //特点
        desc: "", //做法
        delivery: false, //公开
        delivery1: false //常用
      },
      foodPos: [], //菜品分类
      rules: {
        name: [{ required: true, message: "请输入活动名称", trigger: "blur" }],
        fooddata: [
          { required: true, message: "请选择菜品分类", trigger: "change" }
        ]
      },
      value1: [], //所属季节
      valuepark: [], //省市区
      options: [], //省市联动
      //季节
      crashof: [
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

      dialogImageUrl: "", //上传图片
      dialogVisible: false, //上传图片
      officeonce: [
        //菜品所含信息
        {
          id: "",
          name: "", //食品名称
          address: "", //食品分类
          stats: "", //用量
          malloc: "" //能量
        },
        {
          id: "",
          name: "", //食品名称
          address: "", //食品分类
          stats: "", //用量
          malloc: "" //能量
        }
      ],
      tableData: [],
      csList: {},
      csListIndex: null
    };
  },
  beforeMount() {
    this.Provinces(); //省市区
    this.Addraudit(); //树形结构渲染
    this.queryLite(); //获取分类
    this.obtains(); //获取树形结构
  },
  methods: {
    //保存
    savefiles() {
      console.log(this.officeonce);
      let next = [];
      this.officeonce.forEach((item, index) => {
        console.log(item);
        next.push({
          foodId: item.id,
          value: item.stats
        });
      });
      //   console.log(next);
      this.$axios
        .post(`api/blade-food/dish/save`, {
          dishName: this.ruleForm.name, //菜品名字
          dishType: this.ruleForm.fooddata, //菜品分类
          seasons: this.value1, //季节
          function: this.ruleForm.region,
          remark: this.ruleForm.desc,
          belongRegions: this.valuepark,
          isUse: this.ruleForm.delivery1 == false ? 0 : 1, //是否常用
          isPub: this.ruleForm.delivery == false ? 0 : 1, //是否公开
          dishMxVos: next
        })
        .then(res => {
          console.log(res);
        });
    },
    //表格弹出框
    columnEvent(row, index) {
      this.dateTime = true;
      this.csListIndex = index;
      //   for (let k in row) {
      //     this.csList[k] = row[k];
      //   }
    },
    setlist() {
      this.dateTime = false;
    },
    //获取树形结构
    obtains() {
      this.$axios
        .get(`api/blade-food/basetype/getDishByBaseId`, {
          isPrivate: 1,
          typeTemp: 2
        })
        .then(res => {
          console.log(res);
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
    //点击查看详情
    handleNodeClick(data) {
      //   console.log(data);
      //   this.getInput = data.label;
      //   console.log(this.getInput);
      this.flour = data.id;
      this.$axios
        .get(`api/blade-food/food/detail?id=${this.flour}`, {
          headers: {
            "Content-Type": "application/json"
          }
        })
        .then(res => {
          console.log(res);

          this.inquired = res.data.data;
          //   this.getInput.cs = this.inquired.foodName; //食材名
          this.officeonce[this.csListIndex].id = this.inquired.id;
          this.officeonce[this.csListIndex].name = this.inquired.foodName;
          this.officeonce[
            this.csListIndex
          ].address = this.inquired.foodTypeName;
          this.officeonce[this.csListIndex].name = this.inquired.foodName;
          console.log(this.getInput);
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
          console.log(this.fication);
          let Front = [];
          this.fication.forEach((item, index) => {
            console.log(item);
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
    // 分类
    queryLite() {
      this.$axios
        .get(`api/blade-food/basetype/list?type=1`, {
          headers: {
            "Content-Type": "application/json"
          }
        })
        .then(res => {
          // console.log(res);
          this.tionDate = res.data.data;
          // console.log(this.tionDate);
          let cation = [];
          // children
          this.tionDate.forEach((item, index) => {
            cation[index] = {
              value: item.id,
              label: item.typeName
            };
          });
          // console.log(cation);
          this.foodPos = cation;
        });
    },
    handleRemove(file, fileList) {
      //上传图片
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      //上传图片
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },

    //树形结构
    prepare(date) {
      console.log(date);
    },
    append(data) {
      const newChild = { id: id++, label: "testtest", children: [] };
      if (!data.children) {
        this.$set(data, "children", []);
      }
      data.children.push(newChild);
    },
    remove(node, data) {
      const parent = node.parent;
      const children = parent.data.children || parent.data;
      const index = children.findIndex(d => d.id === data.id);
      children.splice(index, 1);
    },
    renderContent(h, { node, data, store }) {
      return (
        <span class="custom-tree-node">
          <span>{node.label}</span>
          <span>
            <el-button
              size="mini"
              type="text"
              on-click={() => this.prepare(data)}
            >
              隐藏
            </el-button>
            <el-button
              size="mini"
              type="text"
              on-click={() => this.append(data)}
            >
              常用
            </el-button>
            <el-button
              size="mini"
              type="text"
              on-click={() => this.remove(node, data)}
            >
              删除
            </el-button>
          </span>
        </span>
      );
    } //树形结构
  }
};
</script>

<style scoped>
.often {
  width: 100%;
  height: 1300px;
  /* background-color: #fff; */
}
.coffee {
  width: 29%;
  height: 1300px;
  background-color: #fff;
  float: left;
  border-right: 1px solid #5c5c5c;
  margin-bottom: 40px;
}
.mation {
  width: 70%;
  height: 100%;
  background-color: #fff;
  float: left;
  margin-bottom: 40px;
}
.import {
  width: 100%;
  height: 50px;
  /* background-color: red; */
  margin-top: 10px;
  line-height: 50px;
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
}
.country2 {
  width: 90px;
  float: left;
  margin-left: 10px;
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
  border-right: 1px solid #000;
  font-size: 14px;
  float: left;
}
.export1 {
  width: 100px;
  height: 30px;
  text-align: center;
  line-height: 30px;
  border-right: 1px solid #000;
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
.monly {
  width: 100%;
  height: 300px;

  margin-top: 10px;
}
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
.mationtxt {
  width: 100%;
  height: 30px;
  line-height: 30px;
  padding-left: 20px;
  font-size: 16px;
  font-weight: bold;
}
.mationinput {
  width: 95%;
  /* height: 700px; */
  /* display: flex; */
  margin-left: 40px;
  margin-bottom: 20px;
}
.saveas {
  width: 95%;
  height: 500px;
  margin-left: 40px;
  /* background-color: red; */
}
</style>
