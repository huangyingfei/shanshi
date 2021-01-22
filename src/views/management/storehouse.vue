<template>
<div>
  <div class="cation">
    <!-- 左边 -->
    <div class="personal">
      <el-input
        clearable
        style="width:270px; margin-left: 9px;"
        placeholder="输入关键字进行查询"
        v-model="filterText"
      >
      </el-input>
      <div class="import">
        <!-- <el-button type="primary" plain size="mini">导入</el-button>
                <el-button type="primary" plain size="mini">导出</el-button>
                <el-button type="primary" plain size="mini">加分类</el-button> -->
        <el-button @click="addition(0)" type="primary" size="mini"
          >加食材</el-button
        >
      </div>
      <div class="whole">
        <div class="export">
          <!-- 全部(326) -->
          <el-button
            size="mini"
            :type="2 == display ? 'primary' : 'default'"
            @click="buttonClick(2)"
            >全部</el-button
          >
        </div>
        <div class="toLine"></div>
        <div class="export1">
          <el-button
            size="mini"
            :type="1 == display ? 'primary' : 'default'"
            @click="buttonClick(0)"
            >分享平台</el-button
          >
        </div>
      </div>
      <!-- 全国查找 -->
      <div class="country">
        <div class="country1">
          <el-cascader
            clearable
            v-model="valuepark2"
            :options="options"
            @change="gProvinces"
            :props="{ checkStrictly: true }"
          ></el-cascader>
        </div>
        <div class="country2">
          <template>
            <el-select
              @change="disallow()"
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
        </div>
        <div class="country2">
          <template>
            <el-select
              @change="commonly()"
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
      <!-- 树形组件 -->
      <div class="monly">
        <div class="block">
          <p></p>
          <el-tree
            :data="data"
            v-loading="loadFlag"
            :props="defaultProps"
            node-key="id"
            :default-expand-all="false"
            @node-click="handleNodeClick"
            :filter-node-method="filterNode"
            ref="tree"
          >
            <span class="custom-tree-node" slot-scope="{ node, data }">
              <span :class="[data.isPub == 0 ? 'cannot' : '']">{{
                node.label
              }}</span>
              <span>
                <!-- <el-button
                          v-if="data.view == 1"
                          type="text"
                          size="mini"
                          @click="() => prepare(data, 2)"
                        >
                          查看
                        </el-button> -->
                <el-button
                  type="text"
                  v-if="data.isUse == 1"
                  size="mini"
                  @click.stop="() => append(data)"
                >
                  设置常用
                </el-button>
                <el-button
                  type="text"
                  v-if="data.isUse == 0"
                  size="mini"
                  @click.stop="() => insert(data)"
                >
                  取消常用
                </el-button>

                <!-- <el-button
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
                        </el-button> -->
                <el-button
                  v-if="data.delete == 1"
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
    </div>
    <!-- 右边 -->
    <div class="rights">
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
          <el-form-item label="食材名" prop="name" style="width: 350px">
            <el-input
              maxlength="10"
              show-word-limit
              style="300px"
              v-model="ruleForm.name"
            ></el-input>
          </el-form-item>
          <el-form-item label="食物别名1" style="width: 350px">
            <el-input
              maxlength="10"
              show-word-limit
              style="300px"
              v-model="ruleForm.foodFood"
            ></el-input>
          </el-form-item>
          <el-form-item label="食物别名2" style="width: 350px">
            <el-input
              maxlength="10"
              show-word-limit
              style="300px"
              v-model="ruleForm.ovenFood"
            ></el-input>
          </el-form-item>

          <el-form-item label="食材真名" prop="buffer" style="width: 350px">
            <el-input
              maxlength="10"
              show-word-limit
              style="300px"
              v-model="ruleForm.buffer"
            ></el-input>
          </el-form-item>

          <el-form-item label="食材分类" prop="fooddata" style="width: 350px">
            <el-select
              clearable
              style=" width: 185px; "
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

          <el-form-item label="分类别称1" style="width: 350px">
            <el-input
              maxlength="10"
              show-word-limit
              v-model="ruleForm.foods"
              placeholder="请输入食物分类"
            ></el-input>
          </el-form-item>

          <el-form-item label="分类别称2" style="width: 350px">
            <el-input
              maxlength="10"
              show-word-limit
              v-model="ruleForm.dogfood"
              placeholder="请输入食物分类"
            ></el-input>
          </el-form-item>

          <el-form-item label="食部(%)" prop="besaved" style="width: 350px">
            <el-input
              @change="research"
              type="number"
              v-model="ruleForm.besaved"
              placeholder="请输入"
            ></el-input>
          </el-form-item>

          <el-form-item label="重量（g）" prop="timers" style="width: 350px">
            <el-input
              type="number"
              v-model="ruleForm.timers"
              placeholder="请输入"
            ></el-input>
          </el-form-item>

          <el-form-item label="水分(%)" style="width: 350px">
            <el-input
              @change="ofmoisture"
              type="number"
              placeholder="请输入水分"
              v-model="ruleForm.content"
            ></el-input>
          </el-form-item>

          <el-form-item label="色系" style="width: 700px;   ">
            <el-radio-group v-model="ruleForm.resource">
              <el-radio label="1">绿</el-radio>
              <el-radio label="2">红</el-radio>
              <el-radio label="3">黄</el-radio>
              <el-radio label="4">紫</el-radio>
              <el-radio label="5">白</el-radio>
              <el-radio label="6">黑</el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item label="所属区域" style="width: 350px">
            <el-cascader
              style=" width: 185px; "
              v-model="valuepark"
              placeholder="请选择省市区"
              :options="options"
              :props="{ multiple: true, checkStrictly: true }"
              @change="handleChange"
            ></el-cascader>
          </el-form-item>
          <el-form-item label="所属季节" style="width: 350px">
            <el-select
              style=" width: 185px; "
              v-model="active"
              multiple
              placeholder="请选择季节"
            >
              <el-option
                v-for="item in context"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="功用" style="width:350px">
            <el-input
              maxlength="30"
              show-word-limit
              style=" width: 185px;  "
              type="textarea"
              v-model="ruleForm.desc"
              placeholder="请输入"
            ></el-input>
          </el-form-item>

          <el-form-item label="图片" style="width:350px">
            <el-upload
              :class="{ hide: hideUploadEdit }"
              accept=".jpeg,.jpg,.gif,.png"
              :limit="1"
              action="api/blade-resource/oss/endpoint/put-file"
              list-type="picture-card"
              :file-list="productImgs"
              :on-change="handleChangePic"
              :on-preview="handlePictureCardPreview"
              :before-upload="beforeAvatarUpload"
              :on-success="handleAvatarSuccess"
              :on-remove="handleRemove"
              :headers="headerObj"
            >
              <!-- <img v-if="dialogImageUrl" :src="dialogImageUrl" class="avatar" /> -->
              <i class="el-icon-plus"></i>
            </el-upload>
            <span style="color: #000;font-weight: bold; font-size: 11px"
              >上传图片不能超过2M 只能是<span style="color:red">JPG PNG</span
              >格式</span
            >
            <el-dialog append-to-body :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt />
            </el-dialog>
          </el-form-item>

          <el-form-item label="分享平台" style="  ">
            <el-switch v-model="ruleForm.delivery"></el-switch>
          </el-form-item>

          <el-form-item label="常用" style="   ">
            <el-switch v-model="ruleForm.delivery1"></el-switch>
          </el-form-item>
        </el-form>
      </div>
      <!-- 营养素标题 -->
      <div class="worm">
        营养素含量（这里为100克食部食品中的营养素含量）
      </div>
      <div class="saveas">
        <el-table
          :data="mailto"
          max-height="400"
          style="width: 100%; margin-bottom: 20px"
          row-key="id"
          :border="false"
          :default-expand-all="true"
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
                type="number"
                v-if="scope.row.level != 1 ? true : false"
                placeholder="请输入内容"
              ></el-input>
            </template>
            <!-- v-if="scope.row.dients" -->
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
  <div class="base">
    <el-button
      :disabled="this.edients == 0"
      v-if="this.gavatorta == 1"
      type="primary"
      @click="saved('ruleForm')"
      >编辑保存</el-button
    >
    <el-button
      v-if="this.gavatorta == 0"
      type="primary"
      @click="iptables('ruleForm')"
      >保存并新增</el-button
    >
    <!-- <el-button @click="resetForm('ruleForm')">重置</el-button> -->
  </div>
  <div>
</template>

<script>
export default {
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped></style>
