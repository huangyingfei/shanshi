<template>
  <div>
    <el-table class="table-week" :data="datas" border fit>
      <el-table-column align="center" width="100" fixed class-name="col-date3 colNoneBorder" >
        <template slot="header"> 菜品/食物 </template>
        <template slot-scope="scope">
          <div v-bind:data="scope.row.name" class="foodType">{{ scope.row.name }}</div>
        </template>
      </el-table-column>
      <!-- 周一   -->
      <el-table-column
        v-if="headers.find((p) => p.name == 'week1')"
        align="center"
        width="400">
        <template slot="header">
          <div class="">
            {{ headers.find((p) => p.name == "week1").lable }}({{
              headers.find((p) => p.name == "week1").date
            }})
          </div>
          <div class="">
            <!--<el-checkbox-->
              <!--label="设置为假期"-->
              <!--:checked="headers.find((p) => p.name == 'week1').is_vacation"-->
              <!--@change="onCheck('week1', $event)"-->
            <!--&gt;</el-checkbox>-->
          </div>
        </template>
        <template slot-scope="scope">
          <div
            class="drapIn"
            @drop="drop($event, scope.row.id, 'week1')"
            @dragleave="ondragleave($event)"
            @dragenter="ondragenter($event)"
            @dragover="ondragover($event)"
          >
            <!-- table start -->
            <el-table
              class="table-foods"
              style="width: 100%"
              @expand-change="expandchange"
              :data="scope.row.weeks.find((p) => p.name == 'week1').foods"
              row-key="id"
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
                      v-if="!scope1.row.children"
                      type="text"
                      size="mini"
                      placeholder="请输入内容"
                    ></el-input>
                    <el-input
                      style="flex: 1"
                      v-model="scope1.row.count"
                      v-if="scope1.row.children"
                      disabled
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
                            scope.row.weeks.find((p) => p.name == 'week1').id,
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
                      scope.row.weeks.find((p) => p.name == 'week1')
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
                          scope.row.weeks.find((p) => p.name == 'week1').id,
                          $event
                        )
                      "
                    >
                      <img
                        v-if="
                          scope.row.weeks.find((p) => p.name == 'week1').image
                        "
                        :src="
                          scope.row.weeks.find((p) => p.name == 'week1').image
                        "
                        style="width: 100%; height: 100%"
                      />
                      <img
                        v-if="
                          !scope.row.weeks.find((p) => p.name == 'week1').image
                        "
                        :src="empty_image"
                        style="width: 100%; height: 100%"
                      />
                    </el-upload>
                  </div>
                </template>
              </el-table-column>
            </el-table>
            <!-- table end -->
            <!--<div style="padding: 6px; background: #fff">-->
              <!--<el-button-->
                <!--type="primary"-->
                <!--size="mini"-->
                <!--plain-->
                <!--@click="-->
                  <!--onChoice(-->
                    <!--scope.row.id,-->
                    <!--scope.row.weeks.find((p) => p.name == 'week1').id-->
                  <!--)-->
                <!--"-->
                <!--&gt;选择食谱/菜品</el-button-->
              <!--&gt;-->
            <!--</div>-->
          </div>
        </template>
      </el-table-column>
      <!-- 周二   -->
      <el-table-column
        v-if="headers.find((p) => p.name == 'week2')"
        align="center"
        width="400"
      >
        <template slot="header">
          <div class="">
            {{ headers.find((p) => p.name == "week2").lable }}({{
              headers.find((p) => p.name == "week2").date
            }})
          </div>
          <!--<div class="">-->
            <!--<el-checkbox-->
              <!--label="设置为假期"-->
              <!--:checked="headers.find((p) => p.name == 'week2').is_vacation"-->
              <!--@change="onCheck('week2', $event)"-->
            <!--&gt;</el-checkbox>-->
          <!--</div>-->
        </template>
        <template slot-scope="scope">
          <div
            class="drapIn"
            @drop="drop($event, scope.row.id, 'week2')"
            @dragleave="ondragleave($event)"
            @dragenter="ondragenter($event)"
            @dragover="ondragover($event)"
          >
            <!-- table start -->
            <el-table
              class="table-foods"
              style="width: 100%"
              :data="scope.row.weeks.find((p) => p.name == 'week2').foods"
              row-key="id"
              @expand-change="expandchange"
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
                      v-if="!scope1.row.children"
                      type="text"
                      size="mini"
                      placeholder="请输入内容"
                    ></el-input>
                    <el-input
                      style="flex: 1"
                      v-model="scope1.row.count"
                      v-if="scope1.row.children"
                      disabled
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
                            scope.row.weeks.find((p) => p.name == 'week2').id,
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
                      scope.row.weeks.find((p) => p.name == 'week2')
                    "
                    style="width: 100px; height: 100px; margin: 0 auto"
                  >
                    <img
                      v-if="
                        scope.row.weeks.find((p) => p.name == 'week2').image
                      "
                      :src="
                        scope.row.weeks.find((p) => p.name == 'week2').image
                      "
                      style="width: 100%; height: 100%"
                    />
                    <img
                      v-if="
                        !scope.row.weeks.find((p) => p.name == 'week2').image
                      "
                      :src="empty_image"
                      style="width: 100%; height: 100%"
                    />
                  </div>
                </template>
              </el-table-column>
            </el-table>
            <!-- table end -->
            <!--<div style="padding: 6px; background: #fff">-->
              <!--<el-button-->
                <!--type="primary"-->
                <!--size="mini"-->
                <!--plain-->
                <!--@click="-->
                  <!--onChoice(-->
                    <!--scope.row.id,-->
                    <!--scope.row.weeks.find((p) => p.name == 'week2').id-->
                  <!--)-->
                <!--"-->
                <!--&gt;选择食谱/菜品</el-button-->
              <!--&gt;-->
            <!--</div>-->
          </div>
        </template>
      </el-table-column>
      <!-- 周三   -->
      <el-table-column
        v-if="headers.find((p) => p.name == 'week3')"
        align="center"
        width="400"
      >
        <template slot="header">
          <div class="">
            {{ headers.find((p) => p.name == "week3").lable }}({{
              headers.find((p) => p.name == "week3").date
            }})
          </div>
          <!--<div class="">-->
            <!--<el-checkbox-->
              <!--label="设置为假期"-->
              <!--:checked="headers.find((p) => p.name == 'week3').is_vacation"-->
              <!--@change="onCheck('week3', $event)"-->
            <!--&gt;</el-checkbox>-->
          <!--</div>-->
        </template>
        <template slot-scope="scope">
          <div
            class="drapIn"
            @drop="drop($event, scope.row.id, 'week3')"
            @dragleave="ondragleave($event)"
            @dragenter="ondragenter($event)"
            @dragover="ondragover($event)"
          >
            <!-- table start -->
            <el-table
              class="table-foods"
              style="width: 100%"
              :data="scope.row.weeks.find((p) => p.name == 'week3').foods"
              row-key="id"
                @expand-change="expandchange"
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
                      v-if="!scope1.row.children"
                      type="text"
                      size="mini"
                      placeholder="请输入内容"
                    ></el-input>
                    <el-input
                      style="flex: 1"
                      v-model="scope1.row.count"
                      v-if="scope1.row.children"
                      disabled
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
                            scope.row.weeks.find((p) => p.name == 'week3').id,
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
                      scope.row.weeks.find((p) => p.name == 'week3')
                    "
                    style="width: 100px; height: 100px; margin: 0 auto"
                  >
                    <img
                      v-if="
                        scope.row.weeks.find((p) => p.name == 'week3').image
                      "
                      :src="
                        scope.row.weeks.find((p) => p.name == 'week3').image
                      "
                      style="width: 100%; height: 100%"
                    />
                    <img
                      v-if="
                        !scope.row.weeks.find((p) => p.name == 'week3').image
                      "
                      :src="empty_image"
                      style="width: 100%; height: 100%"
                    />
                  </div>
                </template>
              </el-table-column>
            </el-table>
            <!-- table end -->
            <!--<div style="padding: 6px; background: #fff">-->
              <!--<el-button-->
                <!--type="primary"-->
                <!--size="mini"-->
                <!--plain-->
                <!--@click="-->
                  <!--onChoice(-->
                    <!--scope.row.id,-->
                    <!--scope.row.weeks.find((p) => p.name == 'week3').id-->
                  <!--)-->
                <!--"-->
                <!--&gt;选择食谱/菜品</el-button-->
              <!--&gt;-->
            <!--</div>-->
          </div>
        </template>
      </el-table-column>
      <!-- 周四   -->
      <el-table-column
        v-if="headers.find((p) => p.name == 'week4')"
        align="center"
        width="400"
      >
        <template slot="header">
          <div class="">
            {{ headers.find((p) => p.name == "week4").lable }}({{
              headers.find((p) => p.name == "week4").date
            }})
          </div>
          <!--<div class="">-->
            <!--<el-checkbox-->
              <!--label="设置为假期"-->
              <!--:checked="headers.find((p) => p.name == 'week4').is_vacation"-->
              <!--@change="onCheck('week4', $event)"-->
            <!--&gt;</el-checkbox>-->
          <!--</div>-->
        </template>
        <template slot-scope="scope">
          <div
            class="drapIn"
            @drop="drop($event, scope.row.id, 'week4')"
            @dragleave="ondragleave($event)"
            @dragenter="ondragenter($event)"
            @dragover="ondragover($event)"
          >
            <!-- table start -->
            <el-table
              class="table-foods"
              style="width: 100%"
              :data="scope.row.weeks.find((p) => p.name == 'week4').foods"
              row-key="id"
                @expand-change="expandchange"
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
                      v-if="!scope1.row.children"
                      type="text"
                      size="mini"
                      placeholder="请输入内容"
                    ></el-input>
                    <el-input
                      style="flex: 1"
                      v-model="scope1.row.count"
                      v-if="scope1.row.children"
                      disabled
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
                            scope.row.weeks.find((p) => p.name == 'week4').id,
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
                      scope.row.weeks.find((p) => p.name == 'week4')
                    "
                    style="width: 100px; height: 100px; margin: 0 auto"
                  >
                    <img
                      v-if="
                        scope.row.weeks.find((p) => p.name == 'week4').image
                      "
                      :src="
                        scope.row.weeks.find((p) => p.name == 'week4').image
                      "
                      style="width: 100%; height: 100%"
                    />
                    <img
                      v-if="
                        !scope.row.weeks.find((p) => p.name == 'week4').image
                      "
                      :src="empty_image"
                      style="width: 100%; height: 100%"
                    />
                  </div>
                </template>
              </el-table-column>
            </el-table>
            <!-- table end -->
            <!--<div style="padding: 6px; background: #fff">-->
              <!--<el-button-->
                <!--type="primary"-->
                <!--size="mini"-->
                <!--plain-->
                <!--@click="-->
                  <!--onChoice(-->
                    <!--scope.row.id,-->
                    <!--scope.row.weeks.find((p) => p.name == 'week4').id-->
                  <!--)-->
                <!--"-->
                <!--&gt;选择食谱/菜品</el-button-->
              <!--&gt;-->
            <!--</div>-->
          </div>
        </template>
      </el-table-column>
      <!-- 周五  -->
      <el-table-column
        v-if="headers.find((p) => p.name == 'week5')"
        align="center"
        width="400"
      >
        <template slot="header">
          <div class="">
            {{ headers.find((p) => p.name == "week5").lable }}({{
              headers.find((p) => p.name == "week5").date
            }})
          </div>
          <!--<div class="">-->
            <!--<el-checkbox-->
              <!--label="设置为假期"-->
              <!--:checked="headers.find((p) => p.name == 'week5').is_vacation"-->
              <!--@change="onCheck('week5', $event)"-->
            <!--&gt;</el-checkbox>-->
          <!--</div>-->
        </template>
        <template slot-scope="scope">
          <div
            class="drapIn"
            @drop="drop($event, scope.row.id, 'week5')"
            @dragleave="ondragleave($event)"
            @dragenter="ondragenter($event)"
            @dragover="ondragover($event)"
          >
            <!-- table start -->
            <el-table
              class="table-foods"
              style="width: 100%"
              :data="scope.row.weeks.find((p) => p.name == 'week5').foods"
              row-key="id"
                @expand-change="expandchange"
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
                      v-if="!scope1.row.children"
                      type="text"
                      size="mini"
                      placeholder="请输入内容"
                    ></el-input>
                    <el-input
                      style="flex: 1"
                      v-model="scope1.row.count"
                      v-if="scope1.row.children"
                      disabled
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
                            scope.row.weeks.find((p) => p.name == 'week5').id,
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
                      scope.row.weeks.find((p) => p.name == 'week5')
                    "
                    style="width: 100px; height: 100px; margin: 0 auto"
                  >
                    <img
                      v-if="
                        scope.row.weeks.find((p) => p.name == 'week5').image
                      "
                      :src="
                        scope.row.weeks.find((p) => p.name == 'week5').image
                      "
                      style="width: 100%; height: 100%"
                    />
                    <img
                      v-if="
                        !scope.row.weeks.find((p) => p.name == 'week5').image
                      "
                      :src="empty_image"
                      style="width: 100%; height: 100%"
                    />
                  </div>
                </template>
              </el-table-column>
            </el-table>
            <!-- table end -->
            <!--<div style="padding: 6px; background: #fff">-->
              <!--<el-button-->
                <!--type="primary"-->
                <!--size="mini"-->
                <!--plain-->
                <!--@click="-->
                  <!--onChoice(-->
                    <!--scope.row.id,-->
                    <!--scope.row.weeks.find((p) => p.name == 'week5').id-->
                  <!--)-->
                <!--"-->
                <!--&gt;选择食谱/菜品</el-button-->
              <!--&gt;-->
            <!--</div>-->
          </div>
        </template>
      </el-table-column>
      <!-- 周六   -->
      <el-table-column
        v-if="headers.find((p) => p.name == 'week6')"
        align="center"
        width="400"
      >
        <template slot="header">
          <div class="">
            {{ headers.find((p) => p.name == "week6").lable }}({{
              headers.find((p) => p.name == "week6").date
            }})
          </div>
          <!--<div class="">-->
            <!--<el-checkbox-->
              <!--label="设置为假期"-->
              <!--:checked="headers.find((p) => p.name == 'week6').is_vacation"-->
              <!--@change="onCheck('week6', $event)"-->
            <!--&gt;</el-checkbox>-->
          <!--</div>-->
        </template>
        <template slot-scope="scope">
          <div
            class="drapIn"
            @drop="drop($event, scope.row.id, 'week6')"
            @dragleave="ondragleave($event)"
            @dragenter="ondragenter($event)"
            @dragover="ondragover($event)"
          >
            <!-- table start -->
            <el-table
              class="table-foods"
              style="width: 100%"
              :data="scope.row.weeks.find((p) => p.name == 'week6').foods"
              row-key="id"
                @expand-change="expandchange"
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
                      v-if="!scope1.row.children"
                      type="text"
                      size="mini"
                      placeholder="请输入内容"
                    ></el-input>
                    <el-input
                      style="flex: 1"
                      v-model="scope1.row.count"
                      v-if="scope1.row.children"
                      disabled
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
                            scope.row.weeks.find((p) => p.name == 'week6').id,
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
                      scope.row.weeks.find((p) => p.name == 'week6')
                    "
                    style="width: 100px; height: 100px; margin: 0 auto"
                  >
                    <img
                      v-if="
                        scope.row.weeks.find((p) => p.name == 'week6').image
                      "
                      :src="
                        scope.row.weeks.find((p) => p.name == 'week6').image
                      "
                      style="width: 100%; height: 100%"
                    />
                    <img
                      v-if="
                        !scope.row.weeks.find((p) => p.name == 'week6').image
                      "
                      :src="empty_image"
                      style="width: 100%; height: 100%"
                    />
                  </div>
                </template>
              </el-table-column>
            </el-table>
            <!-- table end -->
            <!--<div style="padding: 6px; background: #fff">-->
              <!--<el-button-->
                <!--type="primary"-->
                <!--size="mini"-->
                <!--plain-->
                <!--@click="-->
                  <!--onChoice(-->
                    <!--scope.row.id,-->
                    <!--scope.row.weeks.find((p) => p.name == 'week6').id-->
                  <!--)-->
                <!--"-->
                <!--&gt;选择食谱/菜品</el-button-->
              <!--&gt;-->
            <!--</div>-->
          </div>
        </template>
      </el-table-column>
      <!-- 周天  -->
      <el-table-column
        v-if="headers.find((p) => p.name == 'week7')"
        align="center"
        width="400"
      >
        <template slot="header">
          <div class="">
            {{ headers.find((p) => p.name == "week7").lable }}({{
              headers.find((p) => p.name == "week7").date
            }})
          </div>
          <!--<div class="">-->
            <!--<el-checkbox-->
              <!--label="设置为假期"-->
              <!--:checked="headers.find((p) => p.name == 'week7').is_vacation"-->
              <!--@change="onCheck('week7', $event)"-->
            <!--&gt;</el-checkbox>-->
          <!--</div>-->
        </template>
        <template slot-scope="scope">
          <div
            class="drapIn"
            @drop="drop($event, scope.row.id, 'week7')"
            @dragleave="ondragleave($event)"
            @dragenter="ondragenter($event)"
            @dragover="ondragover($event)"
          >
            <!-- table start -->
            <el-table
              class="table-foods"
              style="width: 100%"
              :data="scope.row.weeks.find((p) => p.name == 'week7').foods"
              row-key="id"
                @expand-change="expandchange"
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
                      v-if="!scope1.row.children"
                      type="text"
                      size="mini"
                      placeholder="请输入内容"
                    ></el-input>
                    <el-input
                      style="flex: 1"
                      v-model="scope1.row.count"
                      v-if="scope1.row.children"
                      disabled
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
                            scope.row.weeks.find((p) => p.name == 'week7').id,
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
                      scope.row.weeks.find((p) => p.name == 'week7')
                    "
                    style="width: 100px; height: 100px; margin: 0 auto"
                  >
                    <img
                      v-if="
                        scope.row.weeks.find((p) => p.name == 'week7').image
                      "
                      :src="
                        scope.row.weeks.find((p) => p.name == 'week7').image
                      "
                      style="width: 100%; height: 100%"
                    />
                    <img
                      v-if="
                        !scope.row.weeks.find((p) => p.name == 'week7').image
                      "
                      :src="empty_image"
                      style="width: 100%; height: 100%"
                    />
                  </div>
                </template>
              </el-table-column>
            </el-table>
            <!-- table end -->
            <!--<div style="padding: 6px; background: #fff">-->
              <!--<el-button-->
                <!--type="primary"-->
                <!--size="mini"-->
                <!--plain-->
                <!--@click="-->
                  <!--onChoice(-->
                    <!--scope.row.id,-->
                    <!--scope.row.weeks.find((p) => p.name == 'week7').id-->
                  <!--)-->
                <!--"-->
                <!--&gt;选择食谱/菜品</el-button-->
              <!--&gt;-->
            <!--</div>-->
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
  
</template>

<script>
export default {
  
}
</script>

<style scoped>

</style>