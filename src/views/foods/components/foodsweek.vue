<template>
  <div style="padding: 10px">
    <!-- table-week start   -->
    <el-table class="table-week" style="width: 100%" :data="datas" border fit>
      <el-table-column align="center" width="100" fixed class-name="col-date3">
        <template slot="header"> 菜品/食物 </template>
        <template slot-scope="scope">
          <div class="">{{ scope.row.name }}</div>
        </template>
      </el-table-column>
      <!-- 周一   -->
      <el-table-column
        v-if="headers.find(p => p.name == 'week1')"
        align="center"
        width="400"
      >
        <template slot="header">
          <div class="">
            {{ headers.find(p => p.name == "week1").lable }}({{
              headers.find(p => p.name == "week1").date
            }})
          </div>
          <div class="">
            <el-checkbox
              label="设置为假期"
              :checked="headers.find(p => p.name == 'week1').is_vacation"
              @change="onCheck('week1', $event)"
            ></el-checkbox>
          </div>
        </template>
        <template slot-scope="scope">
          <!-- table start -->
          <el-table
            class="table-foods"
            style="width: 100%"
            :data="scope.row.weeks.find(p => p.name == 'week1').foods"
            row-key="id"
            default-expand-all
            :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
            :span-method="onTableSpanMethod"
          >
            <el-table-column
              label="食品/食材"
              prop="name"
              header-align="center"
              align="left"
            ></el-table-column>
            <el-table-column label="用量(g)" prop="count" align="center">
              <template slot-scope="scope1">
                <div style="display: flex">
                  <el-input
                    style="flex: 1"
                    v-model="scope1.row.count"
                    type="text"
                    size="mini"
                    placeholder="请输入内容"
                  ></el-input>
                  <div style="width: 35px; text-algin: center">
                    <el-link
                      v-if="scope1.row.children"
                      type="primary"
                      @click="
                        onRemove(
                          scope.row.id,
                          scope.row.weeks.find(p => p.name == 'week1').id,
                          scope1.row.id
                        )
                      "
                      >移除</el-link
                    >
                  </div>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="图片" align="center">
              <template slot-scope="scope1">
                <div
                  v-if="
                    scope1.$index === 0 &&
                      scope.row.weeks.find(p => p.name == 'week1')
                  "
                  style="width: 100px; height: 100px; margin: 0 auto"
                >
                  <el-upload
                    :multiple="false"
                    :show-file-list="false"
                    :action="upload_url"
                    :on-change="
                      onUploadImage(
                        scope.row.id,
                        scope.row.weeks.find(p => p.name == 'week1').id,
                        $event
                      )
                    "
                  >
                    <img
                      v-if="scope.row.weeks.find(p => p.name == 'week1').image"
                      :src="scope.row.weeks.find(p => p.name == 'week1').image"
                      style="width: 100%; height: 100%"
                    />
                    <img
                      v-if="!scope.row.weeks.find(p => p.name == 'week1').image"
                      :src="empty_image"
                      style="width: 100%; height: 100%"
                    />
                  </el-upload>
                </div>
              </template>
            </el-table-column>
          </el-table>
          <!-- table end -->
          <div style="padding: 6px; background: #fff">
            <el-button
              type="primary"
              size="mini"
              plain
              @click="
                onChoice(
                  scope.row.id,
                  scope.row.weeks.find(p => p.name == 'week1').id
                )
              "
              >选择食谱/菜品</el-button
            >
          </div>
        </template>
      </el-table-column>
      <!-- 周二   -->
      <el-table-column
        v-if="headers.find(p => p.name == 'week2')"
        align="center"
        width="400"
      >
        <template slot="header">
          <div class="">
            {{ headers.find(p => p.name == "week2").lable }}({{
              headers.find(p => p.name == "week2").date
            }})
          </div>
          <div class="">
            <el-checkbox
              label="设置为假期"
              :checked="headers.find(p => p.name == 'week2').is_vacation"
              @change="onCheck('week2', $event)"
            ></el-checkbox>
          </div>
        </template>
        <template slot-scope="scope">
          <!-- table start -->
          <el-table
            class="table-foods"
            style="width: 100%"
            :data="scope.row.weeks.find(p => p.name == 'week2').foods"
            row-key="id"
            default-expand-all
            :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
            :span-method="onTableSpanMethod"
          >
            <el-table-column
              label="食品/食材"
              prop="name"
              header-align="center"
              align="left"
            ></el-table-column>
            <el-table-column label="用量(g)" prop="count" align="center">
              <template slot-scope="scope1">
                <div style="display: flex">
                  <el-input
                    style="flex: 1"
                    v-model="scope1.row.count"
                    type="text"
                    size="mini"
                    placeholder="请输入内容"
                  ></el-input>
                  <div style="width: 35px; text-algin: center">
                    <el-link
                      v-if="scope1.row.children"
                      type="primary"
                      @click="
                        onRemove(
                          scope.row.id,
                          scope.row.weeks.find(p => p.name == 'week2').id,
                          scope1.row.id
                        )
                      "
                      >移除</el-link
                    >
                  </div>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="图片" align="center">
              <template slot-scope="scope1">
                <div
                  v-if="
                    scope1.$index === 0 &&
                      scope.row.weeks.find(p => p.name == 'week2')
                  "
                  style="width: 100px; height: 100px; margin: 0 auto"
                >
                  <img
                    v-if="scope.row.weeks.find(p => p.name == 'week2').image"
                    :src="scope.row.weeks.find(p => p.name == 'week2').image"
                    style="width: 100%; height: 100%"
                  />
                  <img
                    v-if="!scope.row.weeks.find(p => p.name == 'week2').image"
                    :src="empty_image"
                    style="width: 100%; height: 100%"
                  />
                </div>
              </template>
            </el-table-column>
          </el-table>
          <!-- table end -->
          <div style="padding: 6px; background: #fff">
            <el-button
              type="primary"
              size="mini"
              plain
              @click="
                onChoice(
                  scope.row.id,
                  scope.row.weeks.find(p => p.name == 'week2').id
                )
              "
              >选择食谱/菜品</el-button
            >
          </div>
        </template>
      </el-table-column>
      <!-- 周三   -->
      <el-table-column
        v-if="headers.find(p => p.name == 'week3')"
        align="center"
        width="400"
      >
        <template slot="header">
          <div class="">
            {{ headers.find(p => p.name == "week3").lable }}({{
              headers.find(p => p.name == "week3").date
            }})
          </div>
          <div class="">
            <el-checkbox
              label="设置为假期"
              :checked="headers.find(p => p.name == 'week3').is_vacation"
              @change="onCheck('week3', $event)"
            ></el-checkbox>
          </div>
        </template>
        <template slot-scope="scope">
          <!-- table start -->
          <el-table
            class="table-foods"
            style="width: 100%"
            :data="scope.row.weeks.find(p => p.name == 'week3').foods"
            row-key="id"
            default-expand-all
            :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
            :span-method="onTableSpanMethod"
          >
            <el-table-column
              label="食品/食材"
              prop="name"
              header-align="center"
              align="left"
            ></el-table-column>
            <el-table-column label="用量(g)" prop="count" align="center">
              <template slot-scope="scope1">
                <div style="display: flex">
                  <el-input
                    style="flex: 1"
                    v-model="scope1.row.count"
                    type="text"
                    size="mini"
                    placeholder="请输入内容"
                  ></el-input>
                  <div style="width: 35px; text-algin: center">
                    <el-link
                      v-if="scope1.row.children"
                      type="primary"
                      @click="
                        onRemove(
                          scope.row.id,
                          scope.row.weeks.find(p => p.name == 'week3').id,
                          scope1.row.id
                        )
                      "
                      >移除</el-link
                    >
                  </div>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="图片" align="center">
              <template slot-scope="scope1">
                <div
                  v-if="
                    scope1.$index === 0 &&
                      scope.row.weeks.find(p => p.name == 'week3')
                  "
                  style="width: 100px; height: 100px; margin: 0 auto"
                >
                  <img
                    v-if="scope.row.weeks.find(p => p.name == 'week3').image"
                    :src="scope.row.weeks.find(p => p.name == 'week3').image"
                    style="width: 100%; height: 100%"
                  />
                  <img
                    v-if="!scope.row.weeks.find(p => p.name == 'week3').image"
                    :src="empty_image"
                    style="width: 100%; height: 100%"
                  />
                </div>
              </template>
            </el-table-column>
          </el-table>
          <!-- table end -->
          <div style="padding: 6px; background: #fff">
            <el-button
              type="primary"
              size="mini"
              plain
              @click="
                onChoice(
                  scope.row.id,
                  scope.row.weeks.find(p => p.name == 'week3').id
                )
              "
              >选择食谱/菜品</el-button
            >
          </div>
        </template>
      </el-table-column>
      <!-- 周四   -->
      <el-table-column
        v-if="headers.find(p => p.name == 'week4')"
        align="center"
        width="400"
      >
        <template slot="header">
          <div class="">
            {{ headers.find(p => p.name == "week4").lable }}({{
              headers.find(p => p.name == "week4").date
            }})
          </div>
          <div class="">
            <el-checkbox
              label="设置为假期"
              :checked="headers.find(p => p.name == 'week4').is_vacation"
              @change="onCheck('week4', $event)"
            ></el-checkbox>
          </div>
        </template>
        <template slot-scope="scope">
          <!-- table start -->
          <el-table
            class="table-foods"
            style="width: 100%"
            :data="scope.row.weeks.find(p => p.name == 'week4').foods"
            row-key="id"
            default-expand-all
            :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
            :span-method="onTableSpanMethod"
          >
            <el-table-column
              label="食品/食材"
              prop="name"
              header-align="center"
              align="left"
            ></el-table-column>
            <el-table-column label="用量(g)" prop="count" align="center">
              <template slot-scope="scope1">
                <div style="display: flex">
                  <el-input
                    style="flex: 1"
                    v-model="scope1.row.count"
                    type="text"
                    size="mini"
                    placeholder="请输入内容"
                  ></el-input>
                  <div style="width: 35px; text-algin: center">
                    <el-link
                      v-if="scope1.row.children"
                      type="primary"
                      @click="
                        onRemove(
                          scope.row.id,
                          scope.row.weeks.find(p => p.name == 'week4').id,
                          scope1.row.id
                        )
                      "
                      >移除</el-link
                    >
                  </div>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="图片" align="center">
              <template slot-scope="scope1">
                <div
                  v-if="
                    scope1.$index === 0 &&
                      scope.row.weeks.find(p => p.name == 'week4')
                  "
                  style="width: 100px; height: 100px; margin: 0 auto"
                >
                  <img
                    v-if="scope.row.weeks.find(p => p.name == 'week4').image"
                    :src="scope.row.weeks.find(p => p.name == 'week4').image"
                    style="width: 100%; height: 100%"
                  />
                  <img
                    v-if="!scope.row.weeks.find(p => p.name == 'week4').image"
                    :src="empty_image"
                    style="width: 100%; height: 100%"
                  />
                </div>
              </template>
            </el-table-column>
          </el-table>
          <!-- table end -->
          <div style="padding: 6px; background: #fff">
            <el-button
              type="primary"
              size="mini"
              plain
              @click="
                onChoice(
                  scope.row.id,
                  scope.row.weeks.find(p => p.name == 'week4').id
                )
              "
              >选择食谱/菜品</el-button
            >
          </div>
        </template>
      </el-table-column>
      <!-- 周五  -->
      <el-table-column
        v-if="headers.find(p => p.name == 'week5')"
        align="center"
        width="400"
      >
        <template slot="header">
          <div class="">
            {{ headers.find(p => p.name == "week5").lable }}({{
              headers.find(p => p.name == "week5").date
            }})
          </div>
          <div class="">
            <el-checkbox
              label="设置为假期"
              :checked="headers.find(p => p.name == 'week5').is_vacation"
              @change="onCheck('week5', $event)"
            ></el-checkbox>
          </div>
        </template>
        <template slot-scope="scope">
          <!-- table start -->
          <el-table
            class="table-foods"
            style="width: 100%"
            :data="scope.row.weeks.find(p => p.name == 'week5').foods"
            row-key="id"
            default-expand-all
            :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
            :span-method="onTableSpanMethod"
          >
            <el-table-column
              label="食品/食材"
              prop="name"
              header-align="center"
              align="left"
            ></el-table-column>
            <el-table-column label="用量(g)" prop="count" align="center">
              <template slot-scope="scope1">
                <div style="display: flex">
                  <el-input
                    style="flex: 1"
                    v-model="scope1.row.count"
                    type="text"
                    size="mini"
                    placeholder="请输入内容"
                  ></el-input>
                  <div style="width: 35px; text-algin: center">
                    <el-link
                      v-if="scope1.row.children"
                      type="primary"
                      @click="
                        onRemove(
                          scope.row.id,
                          scope.row.weeks.find(p => p.name == 'week5').id,
                          scope1.row.id
                        )
                      "
                      >移除</el-link
                    >
                  </div>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="图片" align="center">
              <template slot-scope="scope1">
                <div
                  v-if="
                    scope1.$index === 0 &&
                      scope.row.weeks.find(p => p.name == 'week5')
                  "
                  style="width: 100px; height: 100px; margin: 0 auto"
                >
                  <img
                    v-if="scope.row.weeks.find(p => p.name == 'week5').image"
                    :src="scope.row.weeks.find(p => p.name == 'week5').image"
                    style="width: 100%; height: 100%"
                  />
                  <img
                    v-if="!scope.row.weeks.find(p => p.name == 'week5').image"
                    :src="empty_image"
                    style="width: 100%; height: 100%"
                  />
                </div>
              </template>
            </el-table-column>
          </el-table>
          <!-- table end -->
          <div style="padding: 6px; background: #fff">
            <el-button
              type="primary"
              size="mini"
              plain
              @click="
                onChoice(
                  scope.row.id,
                  scope.row.weeks.find(p => p.name == 'week5').id
                )
              "
              >选择食谱/菜品</el-button
            >
          </div>
        </template>
      </el-table-column>
      <!-- 周六   -->
      <el-table-column
        v-if="headers.find(p => p.name == 'week6')"
        align="center"
        width="400"
      >
        <template slot="header">
          <div class="">
            {{ headers.find(p => p.name == "week6").lable }}({{
              headers.find(p => p.name == "week6").date
            }})
          </div>
          <div class="">
            <el-checkbox
              label="设置为假期"
              :checked="headers.find(p => p.name == 'week6').is_vacation"
              @change="onCheck('week6', $event)"
            ></el-checkbox>
          </div>
        </template>
        <template slot-scope="scope">
          <!-- table start -->
          <el-table
            class="table-foods"
            style="width: 100%"
            :data="scope.row.weeks.find(p => p.name == 'week6').foods"
            row-key="id"
            default-expand-all
            :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
            :span-method="onTableSpanMethod"
          >
            <el-table-column
              label="食品/食材"
              prop="name"
              header-align="center"
              align="left"
            ></el-table-column>
            <el-table-column label="用量(g)" prop="count" align="center">
              <template slot-scope="scope1">
                <div style="display: flex">
                  <el-input
                    style="flex: 1"
                    v-model="scope1.row.count"
                    type="text"
                    size="mini"
                    placeholder="请输入内容"
                  ></el-input>
                  <div style="width: 35px; text-algin: center">
                    <el-link
                      v-if="scope1.row.children"
                      type="primary"
                      @click="
                        onRemove(
                          scope.row.id,
                          scope.row.weeks.find(p => p.name == 'week6').id,
                          scope1.row.id
                        )
                      "
                      >移除</el-link
                    >
                  </div>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="图片" align="center">
              <template slot-scope="scope1">
                <div
                  v-if="
                    scope1.$index === 0 &&
                      scope.row.weeks.find(p => p.name == 'week6')
                  "
                  style="width: 100px; height: 100px; margin: 0 auto"
                >
                  <img
                    v-if="scope.row.weeks.find(p => p.name == 'week6').image"
                    :src="scope.row.weeks.find(p => p.name == 'week6').image"
                    style="width: 100%; height: 100%"
                  />
                  <img
                    v-if="!scope.row.weeks.find(p => p.name == 'week6').image"
                    :src="empty_image"
                    style="width: 100%; height: 100%"
                  />
                </div>
              </template>
            </el-table-column>
          </el-table>
          <!-- table end -->
          <div style="padding: 6px; background: #fff">
            <el-button
              type="primary"
              size="mini"
              plain
              @click="
                onChoice(
                  scope.row.id,
                  scope.row.weeks.find(p => p.name == 'week6').id
                )
              "
              >选择食谱/菜品</el-button
            >
          </div>
        </template>
      </el-table-column>
      <!-- 周天  -->
      <el-table-column
        v-if="headers.find(p => p.name == 'week7')"
        align="center"
        width="400"
      >
        <template slot="header">
          <div class="">
            {{ headers.find(p => p.name == "week7").lable }}({{
              headers.find(p => p.name == "week7").date
            }})
          </div>
          <div class="">
            <el-checkbox
              label="设置为假期"
              :checked="headers.find(p => p.name == 'week7').is_vacation"
              @change="onCheck('week7', $event)"
            ></el-checkbox>
          </div>
        </template>
        <template slot-scope="scope">
          <!-- table start -->
          <el-table
            class="table-foods"
            style="width: 100%"
            :data="scope.row.weeks.find(p => p.name == 'week7').foods"
            row-key="id"
            default-expand-all
            :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
            :span-method="onTableSpanMethod"
          >
            <el-table-column
              label="食品/食材"
              prop="name"
              header-align="center"
              align="left"
            ></el-table-column>
            <el-table-column label="用量(g)" prop="count" align="center">
              <template slot-scope="scope1">
                <div style="display: flex">
                  <el-input
                    style="flex: 1"
                    v-model="scope1.row.count"
                    type="text"
                    size="mini"
                    placeholder="请输入内容"
                  ></el-input>
                  <div style="width: 35px; text-algin: center">
                    <el-link
                      v-if="scope1.row.children"
                      type="primary"
                      @click="
                        onRemove(
                          scope.row.id,
                          scope.row.weeks.find(p => p.name == 'week7').id,
                          scope1.row.id
                        )
                      "
                      >移除</el-link
                    >
                  </div>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="图片" align="center">
              <template slot-scope="scope1">
                <div
                  v-if="
                    scope1.$index === 0 &&
                      scope.row.weeks.find(p => p.name == 'week7')
                  "
                  style="width: 100px; height: 100px; margin: 0 auto"
                >
                  <img
                    v-if="scope.row.weeks.find(p => p.name == 'week7').image"
                    :src="scope.row.weeks.find(p => p.name == 'week7').image"
                    style="width: 100%; height: 100%"
                  />
                  <img
                    v-if="!scope.row.weeks.find(p => p.name == 'week7').image"
                    :src="empty_image"
                    style="width: 100%; height: 100%"
                  />
                </div>
              </template>
            </el-table-column>
          </el-table>
          <!-- table end -->
          <div style="padding: 6px; background: #fff">
            <el-button
              type="primary"
              size="mini"
              plain
              @click="
                onChoice(
                  scope.row.id,
                  scope.row.weeks.find(p => p.name == 'week7').id
                )
              "
              >选择食谱/菜品</el-button
            >
          </div>
        </template>
      </el-table-column>
    </el-table>
    <!-- table-week end   -->
    <!-- foods choice start-->
    <el-dialog
      :title="'选择食谱 / 菜品'"
      append-to-body
      :visible.sync="dialog_choice.opened"
      width="600px"
    >
      <foods-choice v-if="dialog_choice.opened" @change="onChoiceChange" />
    </el-dialog>
    <!-- foods choice end -->
  </div>
</template>
<script>
import foodsChoice from "@/views/foods/components/foodschoice";
export default {
  name: "foodsWeek",
  components: {
    foodsChoice
  },
  props: {
    // 表格头部
    headers: [],
    // 表格数据
    datas: [],
    // 5天制 6天制 7天制
    days: {
      type: Number,
      default: 5
    },
    height: {
      type: Number,
      default: 800
    }
  },
  data() {
    return {
      empty_image:
        "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1604518032197&di=54d8ae81d5f878fa32d5b2e55e37292f&imgtype=0&src=http%3A%2F%2Fimg.51miz.com%2FElement%2F00%2F38%2F77%2F59%2F323d6aa8_E387759_fd2eeb2b.png ",

      dialog_choice: {
        opened: false, // 是否显示
        data_id: "", // 主数据ID
        week_id: "", // 周几数据ID
        upload_url: "" // 上传地址
      }
    };
  },
  // 计算属性computed,计算的是Name依赖的值,它不能计算在data中已经定义过的变量。
  computed: {},
  // 当属性的值发生变化时，就会调用对应属性的方法，方法里面的形参对应的是属性的新值和旧值
  watch: {},
  // 组件第一次加载
  mounted() {
    this.init();
  },
  methods: {
    init() {
      console.log("----init header-----");
      console.log(this.headers);
      //   console.log(this.height);
      this.refreshData();

      console.log("----init data----");
      console.log(this.datas);
    },

    // 处理数据
    refreshData() {
      // 计算食物数量 主要用于合并单元格
      this.datas.forEach(item => {
        item.weeks.forEach(week => {
          var count = 0;
          week.foods.forEach(food => {
            count = count + 1;
            if (food.children) {
              count = count + food.children.length;
            }
          });
          week.foods.forEach(food => {
            food.spans = count;
            food.children.forEach(c => {
              c.spans = count;
            });
            console.log(food.children);
          });
          // console.log(week.foods);
        });
      });
    },

    // 设置假期
    onCheck(week, res) {
      var idx = this.headers.findIndex(p => p.name === week);
      if (idx > -1) {
        var item = this.headers.find(p => p.name === week);
        item.is_vacation = res;
        this.$set(this.headers, idx, item);
      }
    },

    // 合并单元格
    onTableSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 2) {
        return [row.spans, 1];
      }
    },

    // 选择菜谱
    onChoice(data_id, week_id) {
      this.dialog_choice.data_id = data_id;
      this.dialog_choice.week_id = week_id;
      this.dialog_choice.opened = true;
      console.log(this.dialog_choice.data_id);
    },

    // 选择菜谱结果
    onChoiceChange(res) {
      // console.log(res);
      this.datas.forEach(data => {
        if (data.id === this.dialog_choice.data_id) {
          data.weeks.forEach(week => {
            if (week.id === this.dialog_choice.week_id) {
              var food = week.foods.find(p => p.id == res.id);
              if (food) {
                this.$message({
                  message: "已经存在，请重新选择",
                  type: "error"
                });

                return;
              } else {
                week.foods.push(res);
                // 关闭对话框
                this.dialog_choice.opened = false;
                this.refreshData();
                return;
              }
            }
          });
        }
      });
    },

    // 移除
    onRemove(data_id, week_id, food_id) {
      this.datas.forEach(data => {
        if (data.id === data_id) {
          data.weeks.forEach(week => {
            if (week.id === week_id) {
              var idx = week.foods.findIndex(p => p.id === food_id);
              if (idx > -1) {
                week.foods.splice(idx, 1);

                return;
              }
            }
          });
        }
      });
    },

    // 上传图片
    onUploadImage(data_id, week_id, res) {
      //   console.log(res);
      if (res && res.status === "success") {
        this.datas.forEach(data => {
          if (data.id === data_id) {
            data.weeks.forEach(week => {
              if (week.id === week_id) {
                week.image =
                  "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1604519021887&di=7dc08416a5f9f6301472e0974e043186&imgtype=0&src=http%3A%2F%2Fcp1.douguo.com%2Fupload%2Fcaiku%2F7%2Ff%2F0%2Fyuan_7fb557435ef7dc525adefe1efaad2070.jpg";
              }
            });
          }
        });
      }
    }

    /////////  methods end ///////////
  }
};
</script>
<style>
.table-week th {
  background: #f8fbfc !important;
}
.table-week td {
  padding: 0 !important;
  vertical-align: top !important;
}

.table-week td .cell {
  padding: 0 !important;
}
.table-week .col-date3 {
  vertical-align: middle !important;
  background: #f8fbfc !important;
}

.table-foods th {
  background: #fff !important;
}
.table-foods td {
  padding: 12px 0 !important;
  vertical-align: middle !important;
  background: #fff !important;
}
.table-foods td .cell {
  padding: 0 10px !important;
}
</style>
