<template>
  <div class="buttons">
    <!-- 智能配平 -->
    <div class="header">
      <div class="time">
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
        <!-- <span></span> -->
        <el-checkbox style="padding-left: 50px;" v-model="focus"
          >调整食材的量</el-checkbox
        >
        <el-checkbox style="padding-left: 50px;" v-model="tment"
          >调整菜品的量</el-checkbox
        >
        <el-checkbox style="padding-left: 50px;" v-model="changed"
          >保留整数</el-checkbox
        >
      </div>
      <div class="nutrition">
        <span>选择营养素</span>
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
        <span style="padding-right: 10px;padding-left: 30px;">起始值</span>
        <el-input
          style="width:140px"
          placeholder="请输入内容"
          v-model="input"
          clearable
        >
        </el-input>
        ~
        <span style="padding-right: 10px;padding-left: 10px;">期望值</span>
        <el-input
          style="width:140px"
          placeholder="请输入内容"
          v-model="input"
          clearable
        >
        </el-input>

        <el-button style="margin-left: 30px;" type="primary"
          >开始配平</el-button
        >
        <el-button type="primary">应用</el-button>
        <el-button type="primary">重置</el-button>
      </div>
    </div>
    <div class="action">
      <div class="arrow">
        <div class="season">不足</div>
        <div class="season1">适量</div>
        <div class="season2">过量</div>
      </div>
      <div class="fonts">
        <el-table
          style="width: 100%;margin-bottom: 20px;"
          row-key="id"
          :data="secondary"
          :border="false"
          :default-expand-all="false"
          :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
        >
          <el-table-column
            prop="date"
            align="center"
            label="营养素"
            width="140"
          >
          </el-table-column>
          <el-table-column prop="name" align="center" label="含量" width="80">
          </el-table-column>
          <el-table-column prop="address" align="center" label="DRIs%">
          </el-table-column>
        </el-table>
      </div>
    </div>
    <!-- 表格 -->
    <div class="onblur">
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
              :border="false"
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
          </template>
        </el-table-column>
        <el-table-column
          v-if="radio == 6 || radio == 9"
          align="center"
          width="400"
          prop="name"
          label="周六"
        >
        </el-table-column>
        <el-table-column
          v-if="radio == 9"
          align="center"
          width="400"
          prop="name"
          label="周天"
        >
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      focus: false,
      tment: false,
      changed: false,
      value1: "2020-10-28,2020-10-29",
      options: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        }
      ],
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
      secondary: [
        {
          id: 3,
          date: "蛋白质",
          name: "322",
          address: "123.91",
          children: [
            {
              id: 31,
              date: "完全蛋白质",
              name: "233",
              address: "94"
            },
            {
              id: 32,
              date: "半完全蛋白质",
              name: "234",
              address: "94"
            }
          ]
        }
      ]
    };
  }
};
</script>
<style scoped>
.buttons {
  width: 100%;
  height: 1000px;
  background-color: #fff;
}
.header {
  width: 100%;
  height: 120px;
  /* background-color: red; */
}
.time {
  width: 100%;
  height: 55px;
}
.nutrition {
  width: 100%;
  height: 55px;
  /* background-color: blue; */
}
.action {
  width: 23%;
  height: 700px;
  /* background: yellow; */
  float: left;
}
.onblur {
  width: 75%;
  height: 700px;
  /* background-color: red; */
  float: left;
  margin-left: 15px;
  margin-bottom: 70px;
}
.arrow {
  width: 100%;
  height: 50px;
  line-height: 50px;
  /* background-color: blue; */
  display: flex;
}
.season {
  width: 80px;
  height: 30px;
  text-align: center;
  color: #fff;
  line-height: 30px;
  margin-top: 10px;
  background-color: rgba(255, 0, 0, 1);
}
.season1 {
  width: 80px;
  height: 30px;
  margin-left: 20px;
  text-align: center;
  color: #fff;
  line-height: 30px;
  margin-top: 10px;
  background-color: rgba(0, 172, 160, 1);
}
.season2 {
  width: 80px;
  height: 30px;
  margin-left: 20px;
  text-align: center;
  color: #fff;
  line-height: 30px;
  margin-top: 10px;
  background-color: rgba(255, 153, 51, 1);
}
.fonts {
  width: 100%;
  /* height: 500px; */
  /* background-color: yellow; */
}
</style>
