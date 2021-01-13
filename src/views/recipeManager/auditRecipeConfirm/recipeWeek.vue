<template>
  <div style="padding: 0px;">
    <!-- table-week start   -->
    <el-table class="foods-table-week" :data="datas" border max-height = "430px">
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
        <template slot-scope="scope">
          <div
            class="drapIn"
            @drop="drop($event, scope.row.id, 'week1')"
            @dragleave="ondragleave($event)"
            @dragenter="ondragenter($event)"
            @dragover="ondragover($event)">
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
                    v-show="
                      scope1.$index === 0 &&
                      scope.row.weeks.find((p) => p.name == 'week1')
                    "
                    style="width: 100px; height: 100px; margin: 0 auto"
                  >
                    <el-upload
                      :multiple="false"
                      :show-file-list="false"
                      :action="dialog_choice.upload_url"
                      :headers="token"
                      :on-success="(res,file)=>{handleAvatarSuccess(scope.row.id,
                          scope.row.weeks.find((p) => p.name == 'week1').id,res,file)}">
                      <img
                        v-show="scope.row.weeks.find((p) => p.name == 'week1').image" :src="scope.row.weeks.find((p) => p.name == 'week1').image"
                        style="width: 100%; height: 100%"/>
                      <img
                        v-show="
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
                    v-show="
                      scope1.$index === 0 &&
                      scope.row.weeks.find((p) => p.name == 'week2')
                    "
                    style="width: 100px; height: 100px; margin: 0 auto"
                  >
                    <el-upload
                      :multiple="false"
                      :show-file-list="false"
                      :action="dialog_choice.upload_url"
                      :headers="token"
                      :on-success="(res,file)=>{handleAvatarSuccess(scope.row.id,
                          scope.row.weeks.find((p) => p.name == 'week2').id,res,file)}">
                      <img
                        v-show="scope.row.weeks.find((p) => p.name == 'week2').image" :src="scope.row.weeks.find((p) => p.name == 'week2').image"
                        style="width: 100%; height: 100%"/>
                      <img
                        v-show="
                          !scope.row.weeks.find((p) => p.name == 'week2').image
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
                    v-show="
                      scope1.$index === 0 &&
                      scope.row.weeks.find((p) => p.name == 'week3')
                    "
                    style="width: 100px; height: 100px; margin: 0 auto"
                  >
                    <el-upload
                      :multiple="false"
                      :show-file-list="false"
                      :action="dialog_choice.upload_url"
                      :headers="token"
                      :on-success="(res,file)=>{handleAvatarSuccess(scope.row.id,
                          scope.row.weeks.find((p) => p.name == 'week3').id,res,file)}">
                      <img
                        v-show="scope.row.weeks.find((p) => p.name == 'week3').image" :src="scope.row.weeks.find((p) => p.name == 'week3').image"
                        style="width: 100%; height: 100%"/>
                      <img
                        v-show="
                          !scope.row.weeks.find((p) => p.name == 'week3').image
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
                            scope1.row.id,'week4'
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
                    v-show="
                      scope1.$index === 0 &&
                      scope.row.weeks.find((p) => p.name == 'week4')
                    "
                    style="width: 100px; height: 100px; margin: 0 auto"
                  >
                    <el-upload
                      :multiple="false"
                      :show-file-list="false"
                      :action="dialog_choice.upload_url"
                      :headers="token"
                      :on-success="(res,file)=>{handleAvatarSuccess(scope.row.id,
                          scope.row.weeks.find((p) => p.name == 'week4').id,res,file)}">
                      <img
                        v-show="scope.row.weeks.find((p) => p.name == 'week4').image" :src="scope.row.weeks.find((p) => p.name == 'week4').image"
                        style="width: 100%; height: 100%"/>
                      <img
                        v-show="
                          !scope.row.weeks.find((p) => p.name == 'week4').image
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
                    v-show="
                      scope1.$index === 0 &&
                      scope.row.weeks.find((p) => p.name == 'week5')
                    "
                    style="width: 100px; height: 100px; margin: 0 auto"
                  >
                    <el-upload
                      :multiple="false"
                      :show-file-list="false"
                      :action="dialog_choice.upload_url"
                      :headers="token"
                      :on-success="(res,file)=>{handleAvatarSuccess(scope.row.id,
                          scope.row.weeks.find((p) => p.name == 'week5').id,res,file)}">
                      <img
                        v-show="scope.row.weeks.find((p) => p.name == 'week5').image" :src="scope.row.weeks.find((p) => p.name == 'week5').image"
                        style="width: 100%; height: 100%"/>
                      <img
                        v-show="
                          !scope.row.weeks.find((p) => p.name == 'week5').image
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
                    v-show="
                      scope1.$index === 0 &&
                      scope.row.weeks.find((p) => p.name == 'week6')
                    "
                    style="width: 100px; height: 100px; margin: 0 auto"
                  >
                    <el-upload
                      :multiple="false"
                      :show-file-list="false"
                      :action="dialog_choice.upload_url"
                      :headers="token"
                      :on-success="(res,file)=>{handleAvatarSuccess(scope.row.id,
                          scope.row.weeks.find((p) => p.name == 'week6').id,res,file)}">
                      <img
                        v-show="scope.row.weeks.find((p) => p.name == 'week6').image" :src="scope.row.weeks.find((p) => p.name == 'week6').image"
                        style="width: 100%; height: 100%"/>
                      <img
                        v-show="
                          !scope.row.weeks.find((p) => p.name == 'week6').image
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
                    v-show="
                      scope1.$index === 0 &&
                      scope.row.weeks.find((p) => p.name == 'week7')
                    "
                    style="width: 100px; height: 100px; margin: 0 auto"
                  >
                    <el-upload
                      :multiple="false"
                      :show-file-list="false"
                      :action="dialog_choice.upload_url"
                      :headers="token"
                      :on-success="(res,file)=>{handleAvatarSuccess(scope.row.id,
                          scope.row.weeks.find((p) => p.name == 'week7').id,res,file)}">
                      <img
                        v-show="scope.row.weeks.find((p) => p.name == 'week7').image" :src="scope.row.weeks.find((p) => p.name == 'week7').image"
                        style="width: 100%; height: 100%"/>
                      <img
                        v-show="
                          !scope.row.weeks.find((p) => p.name == 'week7').image
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
          </div>
        </template>
      </el-table-column>
    </el-table>
    <!-- table-week end   -->
  </div>
</template>
<script>2
import {calRecipe} from "@/api/recipeManager/auditRecipe.js"

export default {
  name: "foodsWeek",

  props: {
    // 表格头部
    headers: [],
    // 表格数据
    datas: [],
    // 5天制 6天制 7天制
    days: {
      type: Number,
      default: 5,
    },
    height: {
      type: Number,
      default: 800,
    },
    crowd:'',
    tenantId:'',

    dragnode: {},

    auditButtonShow: false,
  },
  data() {
    return {
      intakeValue:[
        {
          name:"谷类",
          code:"gl"
        },
        {
          name:"薯类",
          code:"sl"
        },
        {
          name:"蔬菜",
          code:"sc"
        },
        {
          name:"水果",
          code:"sg"
        },
        {
          name:"畜禽肉类-蛋类-水产品",
          code:"xql:scp:dl"
        },
        {
          name:"大豆",
          code:"dd"
        },{
          name:"坚果",
          code:"jg"
        },
        ,{
          name:"乳制品",
          code:"rzp"
        },
        ,{
          name:"食用油",
          code:"syy"
        },
        ,{
          name:"盐",
          code:"sy"
        }
      ],
      nutritionValue:[
        {
          name:"能量",
          code:"101",
          value:'0',
          bz:"80%-120%",
          min:80,
          max:120,
        },
        {
          name:"蛋白质",
          code:"102",
          value:'0',
          bz:"80%-150%",
          min:80,
          max:150,
        },
        {
          name:"钙",
          code:"201",
          value:'0',
          bz:"80%-160%",
          min:80,
          max:160,
        },{
          name:"纳",
          code:"204",
          value:'0',
          bz:"80%-135%",
          min:80,
          max:135,
        },{
          name:"铁",
          code:"301",
          value:'0',
          bz:"80%-160%",
          min:80,
          max:160,

        },{
          name:"锌",
          code:"303",
          value:'0',
          bz:"80%-160%",
          min:80,
          max:160,
        }
        ,{
          name:"维生素A",
          code:"401",
          value:'0',
          bz:"80%-180%",
          min:80,
          max:180,
        },{
          name:"维生素B1",
          code:"405",
          value:'0',
          bz:"80%-250%",
          min:80,
          max:250,
        },{
          name:"维生素B2",
          code:"406",
          value:'0',
          bz:"80%-250%",
          min:80,
          max:250,
        }
        ,{
          name:"维生素C",
          code:"415",
          value:'0',
          bz:"80%-250%",
          min:80,
          max:250,
        },
      ],
      powerValue:[{name:"脂肪占总能量",code:"103"},{name:"蛋白占总能量",code:"102"},{name:"碳水化合物占总能量",code:"104"}],
      empty_image: "/img/tianjia.png",
      dialog_choice: {
        opened: false, // 是否显示
        data_id: "", // 主数据ID
        week_id: "", // 周几数据ID
        upload_url: "/api/blade-resource/oss/endpoint/put-file", // 上传地址
      },
      mealTypeData:[
        {
          name:"早餐",
          value:"1"
        },
        {
          name:"早点",
          value:"2"
        },
        {
          name:"午餐",
          value:"3"
        },
        {
          name:"午点",
          value:"4"
        },
        {
          name:"晚餐",
          value:"5"
        },
        {
          name:"晚点",
          value:"6"
        }
      ],
      token:{
        "Blade-Auth":""
      },
    };
  },
  // 计算属性computed,计算的是Name依赖的值,它不能计算在data中已经定义过的变量。
  computed: {},
  // 组件第一次加载
  mounted() {
    this.init();
    this.getToken()//获取token
  },

  methods: {
    getToken() {
      let str = JSON.parse(localStorage.getItem("saber-token"));
      this.token["Blade-Auth"] = `bearer ${str.content}`;
    },
    //同步修改高度
    resizeExpendHeight() {
      setTimeout(() => {
        //真实高度列表
      var foodTypeList = document.querySelectorAll(".colNoneBorder.is-hidden .foodType");
      for (var i = 0; i < foodTypeList.length; i++) {
        var pnode = foodTypeList[i].parentNode.parentNode.parentNode;
        if(pnode.className.indexOf("is-leaf")<0)
        {
            var nodeSelect='.colNoneBorder [data="'+foodTypeList[i].getAttribute("data")+'"]';
            var shownodelist=document.querySelectorAll(nodeSelect);
            for(var j=0;j<shownodelist.length;j++)
            {
              var tpnode=shownodelist[j].parentNode.parentNode;
              if(tpnode.className.indexOf("is-hidden")<0)
              {
                tpnode.style.height=pnode.offsetHeight+"px";
              }
            }

        }


      }
      },50);

    },
    oncontextmenuFood(e, data_id, week_id, food_id) {
      if (e.button === 2) {
        //如果button=1（鼠标左键），button=2（鼠标右键），button=0（鼠标中间键）
        this.$refs.contextmenuFood.style.top = e.clientY - 140 + "px"; //鼠标点击时给div定位Y轴
        this.$refs.contextmenuFood.style.left = e.clientX + "px"; //鼠标点击时给div定位X轴
        this.$refs.contextmenuFood.style.display = "block"; //显示div盒子
      } else {
        this.$refs.contextmenuFood.style.display = "none"; //否则不显示div盒子
      }
    },
    GetCurentNode(data_id, week_id, food_id) {
      this.datas.forEach((data) => {
        if (data.id === data_id) {
          data.weeks.forEach((week) => {
            if (week.id === week_id) {
              var idx = week.foods.find((p) => p.id === food_id);
              if (idx > -1) {
                week.foods.splice(idx, 1);

                return;
              }
            }
          });getmealTypeData
        }
      });
    },

    expandchange(a, b) {
      this.resizeExpendHeight();
    },
    // 根据名称获取mealtype
    getmealTypeData(name){
      return  this.mealTypeData.filter(_=>{
        if(_.name==name){
          return _.value
        }
      })[0].value
    },
    //拖放进入
    ondragenter(ev) {
      ev.preventDefault();
      ev.path.forEach((e) => {
        var cname = e.className;
        if (cname == "drapIn") {
          e.classList.add("drapInActive");
        }
      });
    },
    ondragleave(ev) {
      ev.preventDefault();
      var drapIn = null;

      ev.path.forEach((e) => {
        var cname = e.className;
        if (cname && cname.indexOf("drapIn") >= 0) {
          drapIn = e;
        }
      });

      if (drapIn != null) {
        if (!drapIn.contains(ev.fromElement)) {
          drapIn.classList.remove("drapInActive");
        }
      }
    },
    ondragover(ev) {
      ev.preventDefault();
    },

    //拖放结束
    drop(ev, id, week) {
      ev.preventDefault();
      var node = JSON.parse(JSON.stringify(this.dragnode.node));
      this.appendDragFood(node, id, week);

      ev.path.forEach((e) => {
        var cname = e.className;
        if (cname && cname.indexOf("drapIn") >= 0) {
          e.classList.remove("drapInActive");
        }
      });
      this.resizeExpendHeight();
      this.getFoodScore();
    },
    // //获取分数
    getFoodScore(){
      this.dragnode.node={};
      let day=[0,0,0,0,0,0,0]
      let days=0;
      let foods={}
      let mealTypes=[]
      foods["peopleId"]=this.crowd;
      let recipeVals=[];
      var that=this;
      this.datas.forEach(_=>{
        let index=0
        _.weeks.forEach(__=>{
          __.foods.forEach(___=>{
            if( ___.children){
              day[index]+=1;
              mealTypes.push(that.getmealTypeData(_.name));
              ___.children.forEach(____=>{
                   recipeVals.push({
                     foodId:____.id,
                     val:____.count?____.count:0,
                     mealType:that.getmealTypeData(_.name),
                     week:__.name.slice(4)
                   })
              })
            }
          })
          index++;

        })
      })
      if(mealTypes.length>0){
        let obj=Array.from(new Set(mealTypes))
        let resultObj="";
        for(let i=0;i<obj.length;i++){
          resultObj+=obj[i]+","
        }
        foods["mealTypes"]=resultObj.substring(0,resultObj.length-1)
      }
      for(let i=0;i<day.length;i++){
        if(day[i]>0){
          days++;
        }
      }
      foods["recipeVals"]=recipeVals
      foods["days"]=days;
      foods["tenantId"]=this.tenantId
      if(foods.recipeVals.length>0){
        calRecipe(foods).then(res=>{

          if(res.data.success){
            let resData=res.data.data;
            let intake={};
            let  data=[];
            intake.mealSelect="推荐范围("+resData.recipeCalDTOList.gl.mealSelect+"%)"
            that.intakeValue.forEach(_=>{
              if(_.code=="sl"||_.code=="jg"){
                data.push({
                  name: _.name,
                  range: "适量",
                  jl: parseFloat(resData.recipeCalDTOList[_.code].jl).toFixed(2),
                  grade: "OK",
                  point: 0,
                  avg: resData.recipeCalDTOList[_.code].avg
                })
              }else {
                data.push({
                  avg: resData.recipeCalDTOList[_.code].avg,
                  name: _.name,
                  range: resData.recipeCalDTOList[_.code].rang_min + "-" + resData.recipeCalDTOList[_.code].rang_max + "(" + resData.recipeCalDTOList[_.code].recomRangMin + "-" + resData.recipeCalDTOList[_.code].recomRangMax + ")",
                  jl: resData.recipeCalDTOList[_.code].jl,
                  grade: resData.recipeCalDTOList[_.code].grade,
                  point: resData.recipeCalDTOList[_.code].point
                })
              }
              })
            intake.data=data;
            intake.avg = "食谱净量(平均年龄"+data[0].avg+")"
            let nutrition = [];
            that.nutritionValue.forEach(_ => {
              nutrition.push({code:_.code,
                name:_.name,
                bz:_.bz,
                min:_.min,
                max:_.max,
                realIntake:resData.nutritionCalDTOList[_.code].realIntake,
                dris:resData.nutritionCalDTOList[_.code].realPropor,
                dris2:resData.nutritionCalDTOList[_.code].dris,
                realPropor:resData.nutritionCalDTOList[_.code].realPropor,
                reqPropor:resData.nutritionCalDTOList[_.code].min+"-"+resData.nutritionCalDTOList[_.code].max,
                grade:resData.nutritionCalDTOList[_.code].grade,point:resData.nutritionCalDTOList[_.code].point})
            })

            let power=[];
            that.powerValue.forEach(_=>{
              power.push({name:_.name,req:resData.powerCalDTOList[_.code].min+"-"+resData.powerCalDTOList[_.code].min,real:resData.powerCalDTOList[_.code].real,grade:resData.powerCalDTOList[_.code].grade,point:resData.powerCalDTOList[_.code].point})
            })

            let protein=[];
            protein=resData.proteinCalDTOList;
            let sum=0;
            resData.proteinCalDTOList.forEach(_=>{
              sum+=parseFloat(_.real)
            })
            protein.forEach(_=>{
              _["realSum"]=sum
              _["req"]=">="+_.min
            })
            let meal=[];
            meal=resData.mealTypeCalDTOList
            that.$emit('childfn', Math.floor(that.getData(res.data.data) * 100) / 100,intake,nutrition,power,protein,meal);
          }
        })
      }else{
        that.$emit('childfn', 0);
      }

    },

    //处理数据
    getData(data){
      let lastScore=100;
      if(data.mealTypeCalDTOList&&data.mealTypeCalDTOList.length){
        for(let i=0;i<data.mealTypeCalDTOList.length;i++){
          lastScore= parseFloat(lastScore)-parseFloat(data.mealTypeCalDTOList[i].point);
        }
      }
      if(data.nutritionCalDTOList){
        lastScore= parseFloat(lastScore)-parseFloat(data.nutritionCalDTOList["101"].point);
        lastScore= parseFloat(lastScore)-parseFloat(data.nutritionCalDTOList["102"].point);
        lastScore= parseFloat(lastScore)-parseFloat(data.nutritionCalDTOList["201"].point);
        lastScore= parseFloat(lastScore)-parseFloat(data.nutritionCalDTOList["204"].point);
        lastScore= parseFloat(lastScore)-parseFloat(data.nutritionCalDTOList["301"].point);
        lastScore= parseFloat(lastScore)-parseFloat(data.nutritionCalDTOList["303"].point);
        lastScore= parseFloat(lastScore)-parseFloat(data.nutritionCalDTOList["401"].point);
        lastScore= parseFloat(lastScore)-parseFloat(data.nutritionCalDTOList["405"].point);
        lastScore= parseFloat(lastScore)-parseFloat(data.nutritionCalDTOList["406"].point);
        lastScore= parseFloat(lastScore)-parseFloat(data.nutritionCalDTOList["415"].point);
      }
      if(data.powerCalDTOList){
        lastScore= parseFloat(lastScore)-parseFloat(data.powerCalDTOList["102"].point);
        lastScore= parseFloat(lastScore)-parseFloat(data.powerCalDTOList["103"].point);
        lastScore= parseFloat(lastScore)-parseFloat(data.powerCalDTOList["104"].point);
      }
      if(data.recipeCalDTOList){
        lastScore= parseFloat(lastScore)-parseFloat(data.recipeCalDTOList["dd"].point);
        lastScore= parseFloat(lastScore)-parseFloat(data.recipeCalDTOList["gl"].point);
        // lastScore= parseFloat(lastScore)-parseFloat(data.recipeCalDTOList["jg"].point);
        lastScore= parseFloat(lastScore)-parseFloat(data.recipeCalDTOList["rzp"].point);
        lastScore= parseFloat(lastScore)-parseFloat(data.recipeCalDTOList["sc"].point);
        lastScore= parseFloat(lastScore)-parseFloat(data.recipeCalDTOList["sg"].point);
        // lastScore= parseFloat(lastScore)-parseFloat(data.recipeCalDTOList["sl"].point);
        lastScore= parseFloat(lastScore)-parseFloat(data.recipeCalDTOList["sy"].point);
        lastScore= parseFloat(lastScore)-parseFloat(data.recipeCalDTOList["syy"].point);
        lastScore= parseFloat(lastScore)-parseFloat(data.recipeCalDTOList["xql:scp:dl"].point);
      }
      var real=0;
      if(data.proteinCalDTOList&&data.proteinCalDTOList.length){
        for(let i=0;i<data.proteinCalDTOList.length;i++){
          real+=parseFloat(data.proteinCalDTOList[i].real);
        }
        var point =10/parseFloat(data.proteinCalDTOList[0].min)*(parseFloat(data.proteinCalDTOList[0].min)-real>0?parseFloat(data.proteinCalDTOList[0].min-real):parseFloat(real-data.proteinCalDTOList[0].min));
        lastScore=lastScore-(point<10?point:10);
      }
      return lastScore;
    },
    //新增菜谱
    appendDragFood(res, id, wk) {
      if (!res.id) return;
      this.datas.forEach((data) => {
        if (data.id === id) {
          data.weeks.forEach((week) => {
            if (week.name === wk) {
              var food = week.foods.find((p) => p.id == res.id);
              if (food) {
                return;
              } else {
                if (!week.foods) {
                  week.foods = [];
                }
                week.foods.push(res);
                return;
              }
            }
          });
        }
      });
    },
    init() {
      this.refreshData();
    },

    // 处理数据
    refreshData() {
      // 计算食物数量 主要用于合并单元格
      this.datas.forEach((item) => {
        item.weeks.forEach((week) => {
          var count = 0;
          week.foods.forEach((food) => {
            count = count + 1;
            if (food.children) {
              count = count + food.children.length;
            }
          });
          if (week.foods != undefined) {
            week.foods.forEach((food) => {
              food.spans = count;
              food.children.forEach((c) => {
                c.spans = count;
              });
            });
          }
          // console.log(week.foods);
        });
      });
    },

    // 设置假期
    onCheck(week, res) {
      var idx = this.headers.findIndex((p) => p.name === week);
      if (idx > -1) {
        var item = this.headers.find((p) => p.name === week);
        item.is_vacation = res;
        this.$set(this.headers, idx, item);
      }
    },

    // 合并单元格
    onTableSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 2) {
        //     debugger
        if(row.spans){
          return [row.spans, 1];
        }else{
          return [1,1]
        }
      }
    },

    // 选择菜谱
    onChoice(data_id, week_id) {
      this.dialog_choice.data_id = data_id;
      this.dialog_choice.week_id = week_id;
      this.dialog_choice.opened = true;
      // console.log(this.dialog_choice.data_id);
    },

    // 选择菜谱结果
    onChoiceChange(res) {
      // console.log(res);
      this.datas.forEach((data) => {
        if (data.id === this.dialog_choice.data_id) {
          data.weeks.forEach((week) => {
            if (week.id === this.dialog_choice.week_id) {
              var food = week.foods.find((p) => p.id == res.id);
              if (food) {
                this.$message({
                  message: "已经存在，请重新选择",
                  type: "error",
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
      this.datas.forEach((data) => {
        if (data.id === data_id) {
          data.weeks.forEach((week) => {
            if (week.id === week_id) {
              var idx = week.foods.findIndex((p) => p.id === food_id);
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
        this.datas.forEach((data) => {
          if (data.id === data_id) {
            data.weeks.forEach((week) => {
              if (week.id === week_id) {
                week.image =
                  "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1604519021887&di=7dc08416a5f9f6301472e0974e043186&imgtype=0&src=http%3A%2F%2Fcp1.douguo.com%2Fupload%2Fcaiku%2F7%2Ff%2F0%2Fyuan_7fb557435ef7dc525adefe1efaad2070.jpg";
              }
            });
          }
        });
      }
    },
    //图片上传成功
    handleAvatarSuccess(data_id, week_id,res, file) {
      // debugger
      if (res && res.success) {
        this.datas.forEach((data) => {
          if (data.id === data_id) {
            data.weeks.forEach((week) => {
              if (week.id === week_id) {
                week.image =res.data.link;
              }
            });
          }
        });
      }
    },

    /////////  methods end ///////////
  },
};
</script>
<style>
  .meals .el-drawer__open .el-drawer.rtl{
    width: 50%!important;
    overflow-y: scroll;
  }
</style>
<style scoped>
.foods-table-week th {
  background: #f8fbfc !important;
}
.foods-table-week td {
  padding: 0 !important;
  vertical-align: top !important;
}

.foods-table-week td .cell {
  padding: 0 !important;
}
.foods-table-week .col-date3 {
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
.drapInActive .el-table th {
  background-color: red !important;
}

</style>
