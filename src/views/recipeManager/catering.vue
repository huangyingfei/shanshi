<template>
  <basic-container>
  <div class="meals">
    <div
      ref="layershipu"
      id="tooltip_shipu"
      class="el-popover el-popper el-popover--plain"
      style="
        display:none;
        width: 400px;
        position: absolute;
        top: 10px;
        left: 10px;
        z-index: 2064;
      "
      v-show="layershipu"
      tabindex="0"
      x-placement="bottom"
    >
      <div class="el-popover__title">{{curentHoverFood.name}}</div>

      <showfoods-week
        :headers="showHeaders"
        :datas="showDatas"
        days="5"
        :title="title"

      >
      </showfoods-week>
    </div>


    <div
      ref="foodmenudLayer"
      id="foodmenudLayer"
      class="el-popover el-popper el-popover--plain"
      style="
        display:none;
        width: 400px;
        position: absolute;
        top: 10px;
        left: 10px;
        z-index: 2064;
      "
      v-show="layershipu"
      tabindex="0"
      x-placement="bottom"
    >
      <nutrient :nutritionValue="nutritionValue"></nutrient>
    </div>

    <el-row :gutter="20" style="padding: 0px; margin-top: 5px">
      <el-col :span="24">
        <el-form :gutter="10" :inline="true" :model="formInline">
          <el-form-item>
            <el-input
              placeholder="请选择周期"
              v-model="WeekInfo.WeekTtitle"
              class="input-with-select"
              style="width: 350px"
              suffix-icon="el-icon-date"
            >
              <el-select
                style="width: 120px"
                v-model="WeekInfo.weekType"
                slot="prepend" value-key="请选择周期"
                placeholder="周长设置"
                @change="selectWeekType"
              >
                <el-option label="5天一周" value="5"></el-option>
                <el-option label="6天一周" value="6"></el-option>
                <el-option label="7天一周" value="7"></el-option>
              </el-select>
            </el-input>

            <el-date-picker
              v-model="WeekInfo.weekValue"
              type="week"
              format="yyyy-MM"
              :picker-options="{ firstDayOfWeek: 1 }"
              @focus="FixWeek"
              placeholder="选择时间"
              name="WeekSelect"
              @change="SelectWeek1"
              style="
                width: 230px;
                opacity: 0;
                position: absolute;
                left: 120px;
                top: -10px;
              "
              clear-icon=""
              ref="refweekSelect"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="餐谱名称">
            <el-input
              v-model="WeekInfo.Weekdetails"
              style="width: 300px"
            ></el-input>
          </el-form-item>
          <el-form-item label="手工输入人群平均年龄">

            <el-input-number size="small" @change="selectAge" style="width: 110px" v-model="WeekInfo.startAge" controls-position="right" :min="1" :max="100"></el-input-number>
            -
            <el-input-number size="small"  @change="selectAge"  style="width: 110px" v-model="WeekInfo.endAge" controls-position="right"  :min="1" :max="100"></el-input-number>

          </el-form-item>
          <!--<el-form-item label="选择人群">-->

          <!--<el-select v-model="WeekInfo.crowd" placeholder="选择人群"  class="crow-item" @change="mealsTypeById" >-->
            <!--<el-option  v-for="(item ,index) in crowdData" :label="item.peopleName" :value="item.id" :key="item.id"></el-option>-->
          <!--</el-select>-->
          <!--</el-form-item>-->
          <!-- <el-form-item style="  margin-left: 30px;">
            <div class="scores">123123</div>
          </el-form-item> -->
        </el-form>
      </el-col>
    </el-row>

    <el-row :gutter="20" style="padding: 0px">
      <el-col :span="24">
        <el-divider></el-divider>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="24">
        <el-form :gutter="10" :inline="true" :model="WeekInfo">
          <el-form-item label="餐点设置">
            <el-checkbox-group
              v-model="WeekInfo.foodCatalog"
              @change="AppendFoodType"
            >
              <el-checkbox label="早餐" checked name="早餐"></el-checkbox>
              <el-checkbox label="早点" checked  name="早点"></el-checkbox>
              <el-checkbox label="午餐" checked name="午餐"></el-checkbox>
              <el-checkbox label="午点" name="午点"></el-checkbox>
              <el-checkbox label="晚餐" name="晚餐"></el-checkbox>
              <el-checkbox label="晚点" name="晚点"></el-checkbox>
            </el-checkbox-group>


          </el-form-item>

          <el-form-item>



            <el-switch
              style="margin-left: 10px"
              v-model="WeekInfo.isPub"
              inactive-text="公开"
            >
            </el-switch>

            <el-switch
              style="margin-left: 10px"
              v-model="WeekInfo.isRecommend"
              inactive-text="推荐"
            >
            </el-switch>

            <el-switch
              style="margin-left: 10px"
              v-model="WeekInfo.isUse"
              inactive-text="收藏"
            >
            </el-switch>

            <el-button
              @click="wrapscan"
              style="margin-left: 10px"
              size="medium"
              type="primary"
              >智能配平</el-button
            >
            <el-button
              @click="buttonend"
              style="margin-left: 10px"
              size="medium"
              type="primary"
            >保存食谱</el-button
            >
            <!--<el-button style="margin-left: 10px" size="medium"-->
              <!--&gt;自动设置油盐糖</el-button-->
            <!--&gt;-->

            <!--<el-button style="margin-left: 10px" size="medium"-->
              <!--&gt;自动清除油盐糖</el-button-->
            <!--&gt;-->
            <el-button style="margin-left: 10px" size="medium"  @click="dishClear"
            >清空</el-button
            >

            <!--<el-button style="margin-left: 10px" size="medium"  @click="allergy()"-->
            <!--&gt;过敏</el-button>-->


            <el-popover
              placement="right"
              width="300"
              trigger="click">
              <div v-if="foodMutuals.length==0" > <p>无相克食材</p></div>
              <div v-if="foodMutuals.length>0"  v-for="(item,index) in foodMutuals" > <p>{{index+1}}、{{item.msg}}</p></div>
              <el-button  slot="reference" style="margin-left: 10px" size="medium"  v-if="foodMutuals.length==0"
              > 不宜同食</el-button>
              <!--<button  slot="reference" > 不宜同食</button>-->
              <el-button  slot="reference" style="margin-left: 10px" size="medium"  v-if="foodMutuals.length>0"   type="primary"
              > 不宜同食</el-button>
            </el-popover>

            <el-popover
              placement="right"
              width="300"
              trigger="click">
              <nutrient-with-color :nutrition="nutrition"  :WeekTtitle="WeekInfo.WeekTtitle" :titleFlag="true"></nutrient-with-color>
              <el-button  slot="reference" style="margin-left: 10px" size="medium"
              ><img src="/img/baobiao.png" width="10px" /> 营养素</el-button
              >
            </el-popover>
            <el-button style="margin-left: 10px" size="medium"
            ><img src="/img/baobiao.png" width="10px" /> 带量食谱</el-button
            >
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>

    <el-row :gutter="20" style="padding: 0px">
      <el-col :span="24">
        <el-divider></el-divider>
      </el-col>
    </el-row>
    <el-row :gutter="20" style="padding: 0px; margin-top: 0px">
      <el-col :span="5">
        <el-card class="box-car" shadow="never">
          <div class="clearfix panel_head">
            <el-button-group>
              <el-button size="small" :class="{'showFoodListColor':!showFoodList}" @click="showFoodList = false"
              >食谱</el-button
              >
              <el-button size="small"  :class="{'showFoodListColor':showFoodList}"   @click="showFoodList = true"
              >菜品</el-button
              >
            </el-button-group>
          </div>

          <div v-if="!showFoodList">
            <div style="margin-top: 0px; padding: 5px">
              <el-input
                size="small"
                placeholder="请输入内容"
                v-model="recipeNameSharePub"
                class="input-with-select"
                @change="recipeNameShareSearchPub()"
              >
              </el-input>
            </div>
            <div style=" font-size: 10px;margin:0 10px;display: flex;justify-content: space-between">
              <el-link :underline="false" :class="{'recipeColor':recipeSelect=='1'}"   @click="recipeNameShareSearchPub('1',undefined,undefined)">全部</el-link>|
              <el-link :underline="false" :class="{'recipeColor':recipeSelect=='2'}"   @click="recipeNameShareSearchPub('2',0,undefined)">公开</el-link>|
              <el-link :underline="false" :class="{'recipeColor':recipeSelect=='3'}"   @click="recipeNameShareSearchPub('3',1,undefined)">隐藏</el-link>|
              <el-link :underline="false" :class="{'recipeColor':recipeSelect=='4'}"   @click="recipeNameShareSearchPub('4',undefined,1)">收藏</el-link>
            </div>

            <div style="margin-top: 5px; margin-bottom: 2px">
              <!--<el-divider></el-divider>-->
            </div>
            <ul class="foodWeekListHis">
              <li  v-for="f in mealListLeft" :key="f.id" style="font-size: 14px" >
                <span  @mouseover="ShowFoodTips($event,f)"  @mouseout="HidenFoodTips($event)">{{f.recipeName}}</span> <img style="width: 20px" @click="mealLoad(f.id,f.recipeName)" src="/img/arrow.png" alt />
              </li>

            </ul>
          </div>
          <div v-if="showFoodList">
            <div style="margin-top: 0px; padding: 5px">
              <el-input
                size="small"
                placeholder="请输入内容"
                v-model="dishSharePub"
                class="input-with-select"
                @change="dishShareSearchPub()"
              >
              </el-input>
            </div>
            <div style=" font-size: 10px;margin:0 15px;display: flex;justify-content: space-between">
              <el-link :underline="false" :class="{'dishColor':dishSelect=='1'}"   @click="dishShareSearchPub('1',1)">全部</el-link>
              |
              <el-link :underline="false" :class="{'dishColor':dishSelect=='2'}"  @click="dishShareSearchPub('2',1,0)">公开</el-link>
              |
              <el-link :underline="false" :class="{'dishColor':dishSelect=='3'}"  @click="dishShareSearchPub('3',1,1)">隐藏</el-link>
            </div>
            <div class="select-item" >
              <el-cascader style="width: 100px" size="mini"
                           :options="belongRegionOption"  v-model="belongRegion" @change="dishShareSearchPub()"
                           :props="{ checkStrictly: true,label:'name',value:'code' }"
                           clearable></el-cascader>
              <el-select v-model="seasonl" clearable    style="width: 60px" placeholder="请选择" @change="dishShareSearchPub()" size="mini">
                <el-option
                  v-for="item in seasonlOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value" >
                </el-option>
              </el-select>
              <el-select v-model="isUse"  clearable  style="width: 70px" placeholder="请选择" @change="dishShareSearchPub()" size="mini">
                <el-option
                  v-for="item in isUseOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
            <div style="margin-top: 5px; margin-bottom: 2px">
              <!--<el-divider></el-divider>-->
            </div>

            <el-tree
              class="filter-tree"
              :data="menuDishList"
              :props="defaultProps"
              default-expand-all
              :filter-node-method="filterNode"
              draggable
              @node-drag-start="foodmenueDragStart"
              :allow-drop="foodmenueDragEnd"
              @node-drag-over="foodmenueDragMove"

            >
            </el-tree>
          </div>
        </el-card>
      </el-col>
      <el-col :span="19">
        <div class="foodPanel" @mouseover="HidenFoodTips($event)">
          <foods-week
            :foodCatalog="WeekInfo.foodCatalog"
            @childfn="parentFn"
            :headers="headers"
            :datas="datas"
            @jundgeFood="jundgeFood"
            days="5"
            :score="score"
            :foodMutuals="foodMutuals"
            :startAge="WeekInfo.startAge"
            :endAge="WeekInfo.endAge"
            :dragnode="drogNode"
            ref="child"
          >
          </foods-week>
        </div>
      </el-col>
    </el-row>

    <!--<el-row :gutter="20" style="padding: 0px; margin-top: 0px">-->
      <!--<el-col :span="5">-->
        <!--<el-card class="box-car" shadow="never">-->
          <!--<div class="clearfix panel_head">-->
            <!--<el-button-group>-->
              <!--<el-button size="small" :class="{'showFoodListColor':!showFoodList}"  @click="showFoodList = false"-->
                <!--&gt;食谱</el-button-->
              <!--&gt;-->
              <!--<el-button size="small"  :class="{'showFoodListColor':showFoodList}"   @click="showFoodList = true"-->
                <!--&gt;菜品</el-button-->
              <!--&gt;-->
            <!--</el-button-group>-->
          <!--</div>-->

          <!--<el-tabs-->
            <!--v-show="!showFoodList"-->
            <!--v-model="activeName"-->
          <!--&gt;-->
            <!--&lt;!&ndash;//分享食谱&ndash;&gt;-->
            <!--<el-tab-pane label="分享食谱" name="first" >-->
              <!--<div style="margin-top: -5px; padding:5px">-->
                <!--<el-input-->
                  <!--size="small"-->
                  <!--placeholder="请输入内容"-->
                  <!--v-model="recipeNameSharePub"-->
                  <!--class="input-with-select"-->
                  <!--@change="recipeNameShareSearchPub()">-->
                <!--</el-input>-->
              <!--</div>-->
              <!--<div style="font-size: 10px;margin:0 10px;display: flex;justify-content:space-around">-->
                <!--<el-link :underline="false" :class="{'recipeColor':recipeSelectPub=='1'}"   @click="recipeNameShareSearchPub('1')">全部</el-link>-->
                 <!--|-->
                <!--<el-link :underline="false"  :class="{'recipeColor':recipeSelectPub=='2'}"  @click="recipeNameShareSearchPub('2',1)">收藏</el-link>-->
              <!--</div>-->

              <!--<div style="margin-top: 5px; margin-bottom: 2px">-->
                <!--&lt;!&ndash;<el-divider></el-divider>&ndash;&gt;-->
              <!--</div>-->

              <!--<ul class="foodWeekListHis">-->
                <!--<li  v-for="f in mealListLeft" :key="f.id"  style="font-size: 14px">-->
                  <!--<span  @mouseover="ShowFoodTips($event,f)"  @mouseout="HidenFoodTips($event)">{{f.recipeName}}</span> <img style="width: 20px" @click="mealLoad(f.id,f.recipeName)" src="/img/arrow.png" alt />-->
                <!--</li>-->
              <!--</ul>-->
            <!--</el-tab-pane>-->


            <!--&lt;!&ndash;//个人食谱&ndash;&gt;-->
            <!--<el-tab-pane label="个人食谱" name="second">-->
              <!--<div style="margin-top: -5px; padding: 5px">-->
                <!--<el-input-->
                  <!--size="small"-->
                  <!--placeholder="请输入内容"-->
                  <!--v-model="recipeNameSharePri"-->
                  <!--class="input-with-select"-->
                  <!--@change="recipeNameShareSearchPri()"-->
                <!--&gt;-->
                  <!--&lt;!&ndash;<el-button slot="append" icon="el-icon-search" @click="recipeNameShareSearchPri()"></el-button>&ndash;&gt;-->
                <!--</el-input>-->
              <!--</div>-->
              <!--<div style="font-size: 10px;margin:0 10px;display: flex;justify-content: space-between">-->
                <!--<el-link :underline="false"  :class="{'recipeColor':recipeSelectPri=='1'}" @click="recipeNameShareSearchPri('1')">全部</el-link>-->
                <!--|-->
                <!--<el-link :underline="false"   :class="{'recipeColor':recipeSelectPri=='2'}" @click="recipeNameShareSearchPri('2',0)">公开</el-link>-->
                <!--|-->
                <!--<el-link :underline="false"   :class="{'recipeColor':recipeSelectPri=='3'}" @click="recipeNameShareSearchPri('3',1)">隐藏</el-link>-->
              <!--</div>-->

              <!--<div style="margin-top: 5px; margin-bottom: 2px">-->
                <!--&lt;!&ndash;<el-divider></el-divider>&ndash;&gt;-->
              <!--</div>-->

              <!--<ul class="foodWeekListHis">-->
                <!--<li  v-for="f in peopleMealListLeft" :key="f.id"  style="font-size: 14px" >-->
                  <!--<span  @mouseover="ShowFoodTips($event,f)"  @mouseout="HidenFoodTips($event)">{{f.recipeName}}</span>  <img style="width: 20px" @click="mealLoad(f.id,f.recipeName)" src="/img/arrow.png" alt />-->
                <!--</li>-->
              <!--</ul>-->
            <!--</el-tab-pane>-->
          <!--</el-tabs>-->

          <!--&lt;!&ndash;菜品&ndash;&gt;-->
          <!--<el-tabs-->
            <!--v-show="showFoodList"-->
            <!--v-model="activeName2"-->
          <!--&gt;-->
            <!--<el-tab-pane label="公共菜品" name="thread">-->

              <!--<div style="margin-top: -5px; padding: 5px">-->
                <!--<el-input-->
                  <!--size="small"-->
                  <!--placeholder="请输入内容"-->
                  <!--v-model="dishSharePub"-->
                  <!--class="input-with-select"-->
                  <!--@change="dishShareSearchPub()"-->
                <!--&gt;-->
                  <!--&lt;!&ndash;<el-button slot="append" icon="el-icon-search" ></el-button>&ndash;&gt;-->
                <!--</el-input>-->
              <!--</div>-->
              <!--<div style=" font-size: 10px;margin:0 15px;display: flex;justify-content: space-between">-->
                <!--<el-link :underline="false"  :class="{'recipeColor':dishSelectPub=='1'}"  @click="dishShareSearchPub('1')">全部</el-link>-->
                <!--|-->
                <!--<el-link :underline="false" :class="{'recipeColor':dishSelectPub=='2'}"  @click="dishShareSearchPub('2',0)">常用</el-link>-->
              <!--</div>-->

              <!--<div style="margin-top: 5px; margin-bottom: 2px">-->
                <!--&lt;!&ndash;<el-divider></el-divider>&ndash;&gt;-->
              <!--</div>-->

              <!--<el-tree-->
                <!--class="filter-tree"-->
                <!--:data="menuDishList"-->
                <!--:props="defaultProps"-->
                <!--default-expand-all-->
                <!--:filter-node-method="filterNode"-->
                <!--draggable-->
                <!--@node-drag-start="foodmenueDragStart"-->
                <!--:allow-drop="foodmenueDragEnd"-->
                <!--@node-drag-over="foodmenueDragMove"-->

              <!--&gt;-->
              <!--</el-tree>-->
            <!--</el-tab-pane>-->
            <!--<el-tab-pane label="个人菜品" name="four">-->
              <!--<div style="margin-top: -5px; padding: 5px">-->
                <!--<el-input-->
                  <!--size="small"-->
                  <!--placeholder="请输入内容"-->
                  <!--v-model="dishSharePri"-->
                  <!--class="input-with-select"-->
                  <!--@change="dishShareSearchPri()"-->
                <!--&gt;-->
                  <!--&lt;!&ndash;<el-button slot="append" icon="el-icon-search"></el-button>&ndash;&gt;-->
                <!--</el-input>-->
              <!--</div>-->
              <!--<div style=" font-size: 10px;margin:0 15px;display: flex;justify-content: space-between">-->
                <!--<el-link :underline="false" :class="{'recipeColor':dishSelectPri=='1'}" @click="dishShareSearchPri('1',2)">全部</el-link>-->
                <!--|-->
                <!--<el-link :underline="false" :class="{'recipeColor':dishSelectPri=='2'}"  @click="dishShareSearchPri('2',0)">公开</el-link>-->
                <!--|-->
                <!--<el-link :underline="false"  :class="{'recipeColor':dishSelectPri=='3'}"  @click="dishShareSearchPri('3',1)">隐藏</el-link>-->
              <!--</div>-->
              <!--<div class="select-item" >-->


                <!--<el-cascader  size="mini"-->
                  <!--:options="belongRegionOption"   style="width: 100px"  v-model="belongRegion" @change="dishShareSearchPri()"-->
                  <!--:props="{ checkStrictly: true,label:'name',value:'code' }"-->
                  <!--clearable></el-cascader>-->
                <!--<el-select  size="mini" v-model="seasonl"  clearable  style="width: 60px" placeholder="请选择" @change="dishShareSearchPri()">-->
                  <!--<el-option-->
                    <!--v-for="item in seasonlOptions"-->
                    <!--:key="item.value"-->
                    <!--:label="item.label"-->
                    <!--:value="item.value" >-->
                  <!--</el-option>-->
                <!--</el-select>-->
                <!--<el-select size="mini"  v-model="isUse"  clearable  style="width: 70px"  placeholder="请选择" @change="dishShareSearchPri()">-->
                  <!--<el-option-->
                    <!--v-for="item in isUseOptions"-->
                    <!--:key="item.value"-->
                    <!--:label="item.label"-->
                    <!--:value="item.value"-->
                    <!--&gt;-->
                  <!--</el-option>-->
                <!--</el-select>-->
              <!--</div>-->

              <!--<div style="margin-top: 5px; margin-bottom: 2px">-->
                <!--&lt;!&ndash;<el-divider></el-divider>&ndash;&gt;-->
              <!--</div>-->
              <!--<el-tree-->
                <!--class="filter-tree"-->
                <!--:data="personMenuDishList"-->
                <!--:props="defaultProps"-->
                <!--default-expand-all-->
                <!--:filter-node-method="filterNode"-->
                <!--draggable-->
                <!--@node-drag-start="foodmenueDragStart"-->
                <!--:allow-drop="foodmenueDragEnd"-->
                <!--@node-drag-over="foodmenueDragMove"-->
              <!--&gt;-->
              <!--</el-tree>-->
            <!--</el-tab-pane>-->
          <!--</el-tabs>-->

        <!--</el-card>-->
      <!--</el-col>-->
      <!--<el-col :span="19">-->
        <!--<div class="foodPanel"  @mouseover="HidenFoodTips($event)">-->
          <!--<foods-week-->
            <!--@childfn="parentFn"-->
            <!--@jundgeFood="jundgeFood"-->
            <!--:headers="headers"-->
            <!--:datas="datas"-->
            <!--days="5"-->
            <!--:score="score"-->
            <!--:crowd="WeekInfo.crowd"-->
            <!--:dragnode="drogNode"-->
             <!--ref="child"-->
            <!--:foodMutuals="foodMutuals"-->
          <!--&gt;-->
          <!--</foods-week>-->
        <!--</div>-->
      <!--</el-col>-->

    <!--</el-row>-->
    <div  id="df" class="scores" >
      <div v-if="parseFloat(score)>=85" class="scores1">
        <div class="scores3">
        <p class="gnus" @click="tfractio">{{score}}</p>
        <p class="scorefor">分</p>
          </div>
        <div class="scores2">
          <div class="scores2-item"><img class="picture" src="/img/fenshu.png" alt="" />
          <p class="vertical">{{scoreTitle}}</p></div>
         <p v-show="parseFloat(scxjSc)!=0&&parseFloat(scxjSc)<0" class="scores2-item2">
           <img src="/img/arrowdown.png" width="20px" height="20px"/><span style="height: 20px;line-height: 20px;margin-top: 0px">{{scxjSc}}</span>
         </p>
          <p v-show="parseFloat(scxjSc)!=0&&parseFloat(scxjSc)>0" class="scores2-item2">
            <img src="/img/arrowup.png" width="20px" height="20px"/><span style="height: 20px;line-height: 20px;margin-top: 0px">{{scxjSc}}</span>
          </p>
        </div>
      </div>
      <div v-if="parseFloat(score)<85"  class="scores1-1">
        <div class="scores3">
          <p class="gnus" @click="tfractio">{{score}}</p>
          <p class="scorefor">分</p>
        </div>
        <div class="scores2">
          <div class="scores2-item"><img class="picture" src="/img/fenshu2.png" alt="" />
            <p class="vertical" style="color: #d94d00;">{{scoreTitle}}</p></div>
          <p v-show="parseFloat(scxjSc)!=0&&parseFloat(scxjSc)<0"   class="scores2-item2">
            <img src="/img/arrowdown.png" width="20px" height="20px"/><span style="height: 20px;line-height: 20px;margin-top: 0px">{{scxjSc}}</span>
          </p>
          <p v-show="parseFloat(scxjSc)!=0&&parseFloat(scxjSc)>0" class="scores2-item2">
            <img src="/img/arrowup.png" width="20px" height="20px"/><span style="height: 20px;line-height: 20px;margin-top: 0px">{{scxjSc}}</span>
          </p>
        </div>
      </div>
    </div>
    <!-- 分数弹框 -->
    <el-drawer
      title="我是标题" id="drawerid"
      :modal-append-to-body="false"
      :visible.sync="drawer"
      :with-header="false"
    >
      <show-score :intake="intake"   :nutrition="nutrition" :power="power"  :meal="meal" :protein="protein"  :startTime="startTimeStr"   :endTime="endTimeStr" :score="score"></show-score>
    </el-drawer>
    <!-- 分数弹框 结束-->
    <!-- 智能配平弹框 -->
    <el-dialog
      title="食谱配平"
      append-to-body
      :fullscreen="true"
      :visible.sync="pointscan"
      width="600px"
    >
      <div class="header">
        <div class="headerTime">
          <span class="demonstration" style="padding-right: 20px">日期：{{startTimeStr}}-{{endTimeStr}}</span>

          <el-radio v-model="foodRadio" label="1">调整食材的量</el-radio>
        </div>
        <div class="nutrition">
          <span style="margin-right: 20px">选择营养素</span>
          <el-select v-model="node.nowCode" placeholder="请选择" @change="ncodeChange">
            <el-option
              v-for="item in nutritionValue"
              :key="item.code"
              :label="item.name"
              :value="item.code"
            >
            </el-option>
          </el-select>
          <span style="padding-right: 10px; padding-left: 30px">起始值(%)</span>
          <el-input disabled
            style="width: 140px"
            placeholder="请输入内容"
            v-model="node.nowValue"
            clearable
          >
          </el-input>
          ~
          <span style="padding-right: 10px; padding-left: 10px">期望值(%)</span>
          <el-input-number v-model="node.exceptValue" controls-position="right"></el-input-number>
          <!--<el-input-->
            <!--style="width: 140px"-->
            <!--placeholder="请输入内容"-->
            <!--v-model="node.exceptValue"-->
            <!--clearable-->
          <!--&gt;-->
          <!--</el-input>-->

          <el-button style="margin-left: 30px" type="primary"  @click="startTrim"
            >开始配平</el-button
          >
          <el-button type="primary" @click="application">应用</el-button>
          <el-button type="primary" @click="resetMeals">重置</el-button>
        </div>
      </div>
      <!-- 表格 -->
      <div class="onblur">
        <nutrient-with-color :nutrition="nutrition"  ></nutrient-with-color>

        <smartfoods-week    @childfn="parentFn"
                       :headers="headers"
                       :smartDatas="smartDatas"
                       days="5"
                            :foodCatalog="WeekInfo.foodCatalog"
                            :startAge="WeekInfo.startAge"
                            :endAge="WeekInfo.endAge"
                       :dragnode="drogNode"
                            :nutritionValue="nutritionValue"
                            :peipScore="peipScore"
                       ref="child2" > </smartfoods-week>
      </div>

      <div  class="scores">
        <!--<div class="scores1">-->
          <!--<div class="scores3">-->
            <!--<p class="gnus">{{peipScore}}</p>-->
            <!--<p class="scorefor">分</p>-->
          <!--</div>-->
          <!--<div class="scores2">-->
            <!--<img class="picture" src="/img/fenshu.png" alt="" />-->
            <!--<p class="vertical">{{scoreTitle}}</p>-->
          <!--</div>-->
        <!--</div>-->
        <div v-if="parseFloat(peipScore)>=85" class="scores1">
          <div class="scores3">
            <p class="gnus">{{peipScore}}</p>
            <p class="scorefor">分</p>
          </div>
          <div class="scores2">
            <div class="scores2-item"><img class="picture" src="/img/fenshu.png" alt="" />
              <p class="vertical">{{scoreTitle}}</p></div>
            <p v-show="parseFloat(ppscxjSc)!=0&&parseFloat(ppscxjSc)<0" class="scores2-item2">
              <img src="/img/arrowdown.png" width="20px" height="20px"/><span style="height: 20px;line-height: 20px;margin-top: 0px">{{ppscxjSc}}</span>
            </p>
            <p v-show="parseFloat(ppscxjSc)!=0&&parseFloat(ppscxjSc)>0" class="scores2-item2">
              <img src="/img/arrowup.png" width="20px" height="20px"/><span style="height: 20px;line-height: 20px;margin-top: 0px">{{ppscxjSc}}</span>
            </p>
          </div>
        </div>
        <div v-if="parseFloat(peipScore)<85"  class="scores1-1">
          <div class="scores3">
            <p class="gnus">{{peipScore}}</p>
            <p class="scorefor">分</p>
          </div>
          <div class="scores2">
            <div class="scores2-item"><img class="picture" src="/img/fenshu2.png" alt="" />
              <p class="vertical" style="color: #d94d00;">{{scoreTitle}}</p></div>
            <p v-show="parseFloat(ppscxjSc)!=0&&parseFloat(ppscxjSc)<0"   class="scores2-item2">
              <img src="/img/arrowdown.png" width="20px" height="20px"/><span style="height: 20px;line-height: 20px;margin-top: 0px">{{ppscxjSc}}</span>
            </p>
            <p v-show="parseFloat(ppscxjSc)!=0&&parseFloat(ppscxjSc)>0" class="scores2-item2">
              <img src="/img/arrowup.png" width="20px" height="20px"/><span style="height: 20px;line-height: 20px;margin-top: 0px">{{ppscxjSc}}</span>
            </p>
          </div>
        </div>

      </div>
    </el-dialog>
    <!-- 智能配平弹框结束 -->

    <!--&lt;!&ndash;过敏&ndash;&gt;-->
    <!--<el-dialog-->
      <!--title="食物过敏"-->
      <!--append-to-body-->
      <!--:visible.sync="jundgeallergy"-->
      <!--:close-on-click-modal="false"-->
    <!--&gt;-->
<!--<div class="item-allergy">-->
  <!--<el-table  :span-method="objectSpanMethod"-->
    <!--:data="tableData"-->
    <!--border-->
    <!--style="width: 100%; margin-top: 20px">-->
    <!--<el-table-column-->
      <!--prop="className"-->
      <!--label="班级"-->
      <!--width="180">-->
    <!--</el-table-column>-->
    <!--<el-table-column-->
      <!--prop="studentName"-->
      <!--label="姓名">-->
    <!--</el-table-column>-->
    <!--<el-table-column-->
      <!--prop="dishName"-->
      <!--label="菜品">-->
    <!--</el-table-column>-->
    <!--<el-table-column-->
      <!--prop="foodName"-->
      <!--label="食材">-->
    <!--</el-table-column>-->
    <!--<el-table-column-->
      <!--prop="symptom"-->
      <!--label="过敏症状">-->
    <!--</el-table-column>-->
  <!--</el-table>-->
<!--</div>-->

      <!--<div slot="footer" class="dialog-footer">-->
        <!--<el-button @click="jundgeallergy=false" type="primary">确 定</el-button>-->
      <!--</div>-->
    <!--</el-dialog>-->
  </div>
  </basic-container>
</template>

<script>
  import foodsWeek from "@/views/recipeManager/foods/components/foodsweek";
  import showfoodsWeek from "@/views/recipeManager/foods/components/showfoodsweek";
  import {mealList,getDishByBaseId,dishDetail,save,detail,update,grantTree,jundgeFood} from "@/api/system/meals"
  import nutrient from "@/views/recipeManager/foods/components/nutrient";
  import nutrientWithColor from "@/views/foods/components/nutrientwithcolor";
  import showScore from "@/views/foods/components/showscore";
  import smartfoodsWeek from "@/views/recipeManager/foods/components/smartfoodsweek";
  // import foodsWeek from "@/views/foods/components/foodsweek";
  // import showfoodsWeek from "@/views/foods/components/showfoodsweek";
  // import {getList} from "@/api/system/special"
  // import {mealList,getDishByBaseId,dishDetail,save,detail,update,grantTree,jundgeFood,jundgeAllergy} from "@/api/system/meals"
  // import nutrient from "@/views/foods/components/nutrient";
  // import nutrientWithColor from "@/views/foods/components/nutrientwithcolor";
  // import showScore from "@/views/foods/components/showscore";
  // import smartfoodsWeek from "@/views/foods/components/smartfoodsweek";
  // import {detailByPeopleId} from "@/api/system/special";
  export default {
  components: {
    foodsWeek,
    showfoodsWeek,
    nutrient,
    nutrientWithColor,
    showScore,
    smartfoodsWeek
  },
  mounted(){
    this.initData()
    this.dragFunc("df");
  },
  created() {
    //this.init();
    var that=this;
    document.body.ondrop = function (event) {
      event.preventDefault();
      event.stopPropagation();
    };
document.oncontextmenu = function(){return false};


  },
  data() {
    const data = [];
    return {
      tableData: [],
      jundgeallergy:false,//过敏
      foodRadio:'1',
      isUse:undefined,
      belongRegion:undefined,
      seasonl:undefined,
      belongRegionOption:[],
      seasonlOptions:[
        {
          label:'春',
          value:'1'
        },
        {
          label:'夏',
          value:'2'
        },
        {
          label:'秋',
          value:'3'
        },
        {
          label:'冬',
          value:'4'
        }
      ],
      isUseOptions:[
        {
          label:'常用',
          value:0
        },
        {
          label:'不常用',
          value:1
        }
      ],
      recipeNameSharePub:'',
      recipeNameSharePri:'',
      dishSharePri:'',
      dishSharePub:'',
      id:'',
      score:'0',
      pcScore:'0',//配餐保存的分数
      peipScore:'0',//配平分数
      peippcScore:'0',//配平保存的分数
      scoreTitle:'加油',
      scxjSc:'0',//配餐上升下降分数
      ppscxjSc:'0',//配平上升下降分数
      intake:{},
      nutrition:[],
      power:[],
      meal:[],
      protein:[],
      drawer: false, //分数弹框
      pointscan: false, //智能配餐弹框
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
              address: "94",
            },
            {
              id: 32,
              date: "半完全蛋白质",
              name: "234",
              address: "94",
            },
          ],
        },
      ],
      WeekInfo: {
        startAge:undefined,
        endAge:undefined,
        isRecommend:false,
        isUse:false,
        isPub:false,
        weekType: "5", //周期类型
        WeekTtitle: "", //周期标题
        Weekdetails: "", //周期明细
        weekValue: "",
        foodCatalog: [], //餐点类型
        crowd: "", //人群
        shareOrg: true,
        showFoodCatalog:""//餐点类型
      },
      activeName: "first",
      activeName2: 'thread',
      // 表格头部
      headers: [],
      showHeaders:[],
      // 表格数据
      datas: [],
      smartDatas:[],
      showDatas:[],
      title:'',
      WeekList: [], //所选的时间周期
      showWeekList:[],
      FoodTypeList: [], //所选餐点类型
      rebuild: false,
      showFoodList: false,
      recipeSelectPub:'1',
      recipeSelectPri:'1',
      dishSelectPub:'1',
      dishSelectPri:'1',
      personMenuDishList:[],
      menuDishList: [
        {
          id: 1,
          label: "番茄鸡蛋",
          node: {
            id: 102,
            name: "番茄鸡蛋",
            count: 1,
            children: [
              { id: 101001, name: "绿豆", count: 1 },
              { id: 101002, name: "白糖", count: 1 },
            ],
          },
        },
        {
          id: 2,
          label: "绿豆粥",
          node: {
            id: 103,
            name: "绿豆粥",
            count: 1,
            children: [
              { id: 101001, name: "绿豆", count: 1 },
              { id: 101002, name: "白糖", count: 1 },
            ],
          },
        },
      ],
      ncode:'101',

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
      foodMutuals:[],
      node:{
        nowCode:'101',
        nowValue:'',
        exceptValue:undefined,
      },
      mealListLeft:[
        // {name:"周一食谱",id:"1"},
        // {name:"周二食谱",id:"2"},
        // {name:"周三食谱",id:"3"},
        // {name:"周四食谱",id:"4"}
      ],
      peopleMealListLeft:[],
      curentHoverFood:{},
      //拖动的节点
      drogNode: {},
      //是否正在拖拽节点
      drogNodeStats:false,
      year:'',
      month:'',
      startTime:'',
      startTimeStr:'',
      endTime:'',
      endTimeStr:'',
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
      ]
    };
  },
  beforeMount() {},

  watch:{
    score(val){
      if(parseFloat(val)==85){
        this.scoreTitle="合格"
      }
      if(parseFloat(val)>85){
        this.scoreTitle="真棒"
      }
      if(parseFloat(val)<85){
        this.scoreTitle="加油"
      }
      // debugger

    },
    // pcScore(val){
    //   this.scxjSc=(parseFloat(this.score)-parseFloat(this.pcScore)).toFixed(2)
    // }
  },
  methods: {
    selectAge(){
      if(!this.WeekInfo.startAge){

      }else if(!this.WeekInfo.endAge){

      }else{
        let that =this;
        setTimeout(function () {
          that.$refs.child.getFoodScore();
        },200)
      }
    },
     dragFunc(id) {
    var Drag = document.getElementById(id);
    Drag.onmousedown = function(event) {
      var ev = event || window.event;
      event.stopPropagation();
      var disX = ev.clientX - Drag.offsetLeft;
      var disY = ev.clientY - Drag.offsetTop;
      document.onmousemove = function(event) {
        var ev = event || window.event;
        Drag.style.left = ev.clientX - disX + "px";
        Drag.style.top = ev.clientY - disY + "px";
        Drag.style.cursor = "move";
      };
    };
    Drag.onmouseup = function() {
      document.onmousemove = null;
      this.style.cursor = "default";
    };
  },

    mealsTypeById(){
      var that=this;
      that.AppendFoodType();
      that.WeekInfo.weekValue=new Date()
      that.FixWeek();
      that.ShowWeekSelect();
      that.SelectWeek(new Date())
      that.$refs.refweekSelect.hidePicker();
    //   detailByPeopleId(this.WeekInfo.crowd).then(res=>{
    // //    debugger
    //     let arr= [];
    //     if(res.data.data.defaultMeal){
    //       let defaultMeal= res.data.data.defaultMeal.split(",")
    //       for(let i=0;i<defaultMeal.length;i++){
    //         arr.push(defaultMeal[i])
    //       }
    //     }
    //     // for(let i=0;i< that.WeekInfo.foodCatalog.length;i++){
    //     //   if(arr.indexOf(parseInt(that.getmealTypeData(that.WeekInfo.foodCatalog[i])))==-1){
    //     //     arr.push(parseInt(that.getmealTypeData(that.WeekInfo.foodCatalog[i])))
    //     //   }
    //     // }
    //     // arr.sort()
    //     let foodCatalog= []
    //     for(let i=0;i<arr.length;i++){
    //   //    debugger
    //       foodCatalog.push(that.getmealTypeDataValue(arr[i]))
    //     }
    //     that.WeekInfo.foodCatalog=foodCatalog;

      // })
    },
    recipeNameShareSearchPub(recipeSelect,isPub,isUse){
      if(recipeSelect){
        this.recipeSelect=recipeSelect;
      }else{
        if(this.recipeSelect=="2"){
          isPub='0'
        }
        if(this.recipeSelect=="3"){
          isPub='1'
        }
        if(this.recipeSelect=="4"){
          isUse='1'
        }
      }
      mealList(0,isPub,this.recipeNameSharePub,isUse).then(res=>{
        this.mealListLeft=res.data.data;
      })
    },
    // recipeNameShareSearchPri(recipeSelectPri,isPub){
    //   // debugger
    //   if(recipeSelectPri){
    //     this.recipeSelectPri=recipeSelectPri;
    //   }else{
    //     if( this.recipeSelectPri=='2'){
    //       isPub='0';
    //     }
    //     if( this.recipeSelectPri=='3'){
    //       isPub='1';
    //     }
    //   }
    //     mealList(2,isPub,this.recipeNameSharePri,1).then(res=>{
    //       this.peopleMealListLeft=res.data.data;
    //     })
    // },
    mealLoad(id,name){
     let that=this;
     if(this.WeekInfo.weekValue){
       this.$confirm("请确定是否导入食谱："+name+"?", "提示", {
         confirmButtonText: "确定",
         cancelButtonText: "取消",
         type: "warning"
       }).then(()=>{
         that.inserMeal(id,that)
       })
     }else{
       this.$message({
         message: "请先选择周期",
         type: "info"
       });
     }
   },
    inserMeal(id,that){
      detail(id).then(res=>{
        if(res.data.success){
          let mealsType=[];
          let data=res.data.data;
          data.recipeCycles.forEach(_=>{
            mealsType.push(_.mealsType);
          })
          let arr= Array.from(new Set(mealsType));
          for(let i=0;i< that.WeekInfo.foodCatalog.length;i++){
            if(arr.indexOf(parseInt(that.getmealTypeData(that.WeekInfo.foodCatalog[i])))==-1){
              arr.push(parseInt(that.getmealTypeData(that.WeekInfo.foodCatalog[i])))
            }
          }
          arr.sort()
          let foodCatalog= []
          for(let i=0;i<arr.length;i++){
            foodCatalog.push(that.getmealTypeDataValue(arr[i]))
          }
          that.$set(that.WeekInfo,"foodCatalog",foodCatalog)
          that.AppendFoodType();
          let recipeCycles=res.data.data.recipeCycles;
          setTimeout(function () {
            that.insertDishesData("datas",recipeCycles,that);
          }, 1000);
        }})
    },
    insertDishesData(datas,recipeCycles,that){
      that[datas].forEach(_=>{
        _.weeks.forEach(__=>{
          let foods=[];
          for(let i=0;i<recipeCycles.length;i++){
            if(recipeCycles[i].mealsType+""==that.getmealTypeData(_.name)&&recipeCycles[i].week+""==__.name.slice(4)){
              let recipeConncts=recipeCycles[i].recipeConncts;
              for(let k=0;k<recipeConncts.length;k++){//菜品
                let food={};
                let recipevals=recipeConncts[k].recipevals;  let children=[];
                for(let j=0;j<recipevals.length;j++){//食材
                  let nutrientIds=[];
                  let foodNutritionList=recipevals[j].foodNutritionList;
                  foodNutritionList.forEach(_=>{
                      this.nutritionValue.forEach(n=>{
                        if(n.code==_.nutrientId+""){
                          nutrientIds.push({id:_.nutrientId,name:n.name, value:_.value})//数值>0即可，此时的value不准确  因为要/100*食部
                        }
                  })})
                  children.push({
                    id:recipevals[j].foodId,
                    name:recipevals[j].foodName,
                    count:recipevals[j].val,
                    nutrientIds:nutrientIds
                  })
                }
                food.id=recipeConncts[k].dishId;
                food.name=recipeConncts[k].dishName;
                food.count=recipeConncts[k].value;
                food.children=children;
                foods.push(food)
              }
            }
          }
          that.$set(__,"foods",foods);
        })
      })
      that.$refs.child.getFoodScore();
      that.$refs.child.refreshData();
    },
    mealDetail(id,that){//根据id查询菜品详情
      detail(id).then(res=>{
        if(res.data.success){
          let mealsType=[];
          let data=res.data.data;
          data.recipeCycles.forEach(_=>{
            mealsType.push(_.mealsType);
          })
          let arr= Array.from(new Set(mealsType));
          for(let i=0;i< that.WeekInfo.foodCatalog.length;i++){
            if(arr.indexOf(parseInt(that.getmealTypeData(that.WeekInfo.foodCatalog[i])))==-1){
              arr.push(parseInt(that.getmealTypeData(that.WeekInfo.foodCatalog[i])))
            }
          }
          arr.sort()
          let foodCatalog= []
          for(let i=0;i<arr.length;i++){
              foodCatalog.push(that.getmealTypeDataValue(arr[i]))
          }
          that.WeekInfo.foodCatalog=foodCatalog;
          that.WeekInfo.weekType=res.data.data.recipeDay
          that.WeekInfo.weekValue=new Date(res.data.data.startTime)
          that.FixWeek();
          that.ShowWeekSelect();
          let recipeCycles=data.recipeCycles;
          that.SelectWeek(new Date(data.startTime),data.recipeName,recipeCycles)
          that.$refs.refweekSelect.hidePicker();
          that.WeekInfo.Weekdetails=data.recipeName;
          // that.WeekInfo.crowd=data.peopleId;
          that.WeekInfo.isRecommend=data.isRecommend=="1"?true:false
          that.WeekInfo.isUse=data.isUse==1?true:false;
          that.WeekInfo.isPub=data.isPub==0?true:false

          setTimeout(function () {
            that.dishesData("datas",recipeCycles,that);
          }, 1000);
        }
      })
    },
    //详情数据绑定前端

    dishesData(datas,recipeCycles,that){
      that[datas].forEach(_=>{
        _.weeks.forEach(__=>{
          /////
          let foods=__.foods;
          for(let i=0;i<recipeCycles.length;i++){

            if(recipeCycles[i].mealsType+""==that.getmealTypeData(_.name)&&recipeCycles[i].week+""==__.name.slice(4)){
              __.image=recipeCycles[i].pic
              let recipeConncts=recipeCycles[i].recipeConncts;
              for(let k=0;k<recipeConncts.length;k++){//菜品
                let food={};
                let recipevals=recipeConncts[k].recipevals;  let children=[];

                for(let j=0;j<recipevals.length;j++){//食材
                  children.push({id:recipevals[j].foodId,name:recipevals[j].foodName,count:recipevals[j].val})
                }
                food.id=recipeConncts[k].dishId;
                food.name=recipeConncts[k].dishName;
                food.count=recipeConncts[k].value;
                food.children=children;
                foods.push(food)
              }
            }
          }
          that.$set(__,"foods",foods);
        })
      })
      that.$refs.child.refreshData();
    },
    parentFn(score,type,pscore,intake,nutrition,power,protein,meal){
      if(type=="smartDatas"){
        this.peipScore=score;
        this.peippcScore=pscore
        debugger
        this.ppscxjSc=(parseFloat(this.peipScore)-parseFloat(this.peippcScore)).toFixed(2)
      }
      if(type=="datas"){
        debugger
        this.score=score;this.pcScore=pscore
        this.scxjSc=(parseFloat(this.score)-parseFloat(this.pcScore)).toFixed(2)
      }

        this.intake=intake;
        this.nutrition=nutrition
        this.nutrition.forEach(_=>{
          if(parseFloat(_.dris)<_.min){
            _["red"]=true
            _["orange"]=false
            _["green"]=false
          }
          if(parseFloat(_.dris)>_.max){
            _["orange"]=true
            _["red"]=false
            _["green"]=false
          }
          if(parseFloat(_.dris)>=_.min&&parseFloat(_.dris)<=_.max){
            _["green"]=true
            _["orange"]=false
            _["red"]=false
          }
        })
        console.log("this.nutrition",this.nutrition)
        this.power=power
        this.protein=protein
        this.meal=meal
        this.ncodeChange();

    },
    initMealData(){
      //公开
      mealList(1,undefined,undefined,undefined,1).then(res=>{
        this.mealListLeft=res.data.data;
      })

      mealList(2,undefined,undefined,undefined,1).then(res=>{
        this.peopleMealListLeft=res.data.data;
      })
    },
    dishShareSearchPub(dishSelect,isPrivate,typeTemp){
      //公共
      if(dishSelect){
        this.dishSelect=dishSelect
      }else{
        if(this.dishSelect=="1"){
          isPrivate=1
        }
        if(this.dishSelect=="2"){
          isPrivate=1
          typeTemp=0;
        }
        if(this.dishSelect=="3"){
          isPrivate=1
          typeTemp=1;
        }
      }
      let dishSharePub= this.dishSharePub?this.dishSharePub:undefined
      getDishByBaseId(isPrivate,typeTemp,dishSharePub,this.belongRegion?(this.belongRegion.length>1?this.belongRegion[1]:this.belongRegion[0]):undefined,this.seasonl,this.isUse).then(res=>{
        if(res.data.success){
          let data=[];
          res.data.data.forEach(_=>{
            let item={};
            item["id"]=_.id;
            item["label"]=_.typeName;
            let children=[];
            _.dishes.forEach(__=>{
              let item1={};
              item1["id"]=__.id;
              item1["label"]=__.dishName;
              children.push(item1)
            })
            item["children"]=children
            data.push(item)
          })
          this.menuDishList=data;
        }
      })
    },

    // dishShareSearchPri(dishSelectPri,typeTemp){
    //   //私人
    //   if(dishSelectPri){
    //     this.dishSelectPri=dishSelectPri;
    //   }else{
    //     if(this.dishSelectPri=='1'){
    //     }
    //     if(this.dishSelectPri=='2'){
    //       typeTemp=0
    //     }
    //     if(this.dishSelectPri=='3'){
    //       typeTemp=1
    //     }
    //   }
    //   let dishSharePri= this.dishSharePri?this.dishSharePri:undefined;
    //   let belongRegion= this.belongRegion?this.belongRegion[0]:undefined;
    //   let seasonl= this.seasonl?this.seasonl:undefined;
    //   let isUse= (this.isUse||this.isUse==0)&&this.isUse!=""?this.isUse:undefined;
    //   // debugger
    //   getDishByBaseId(0,typeTemp,dishSharePri,belongRegion,seasonl,isUse).then(res=>{
    //     if(res.data.success){
    //       let data=[];
    //       res.data.data.forEach(_=>{
    //         let item={};
    //         item["id"]=_.id;
    //         item["label"]=_.typeName;
    //         let children=[];
    //         _.dishes.forEach(__=>{
    //           let item1={};
    //           item1["id"]=__.id;
    //           item1["label"]=__.dishName;
    //           children.push(item1)
    //         })
    //         item["children"]=children
    //         data.push(item)
    //       })
    //       this.personMenuDishList=data;
    //     }
    //   })
    // },
    initData(){
      this.initMealData();
      let that=this;
      that.mealsTypeById();
      if(that.$route.query.userid){
        that.id=this.$route.query.userid;
        that.mealDetail(that.$route.query.userid,that)
      }
      // getList().then(res=>{
      //   this.crowdData=res.data.data;
      //   this.WeekInfo.crowd=this.crowdData[0].id;
      //
      // })
      this.dishShareSearchPub()
      // this.dishShareSearchPri()

      grantTree().then(res=>{
        res.data.data.forEach(_=>{
          if(_.children){
            _.children.forEach(__=>{
              if(__.children){
                __.children.forEach(___=>{
                  delete __.children
                })
              }
            })
          }
        })
          this.belongRegionOption=res.data.data
      })
    },

  GetAbsoluteLocation(element)
  {
      if ( arguments.length != 1 || element == null )
      {
          return null;
      }
      var offsetTop = element.offsetTop;
      var offsetLeft = element.offsetLeft;
      var offsetWidth = element.offsetWidth;
      var offsetHeight = element.offsetHeight;
      while( element = element.offsetParent )
      {
          offsetTop += element.offsetTop;
          offsetLeft += element.offsetLeft;
      }
      return { absoluteTop: offsetTop-300, absoluteLeft: offsetLeft-300,
          offsetWidth: offsetWidth+800, offsetHeight: offsetHeight };
  },

    MoveFoodLayer(ev){
      var x=ev.pageX;
      var y=ev.pageY;
      this.$refs.foodmenudLayer.style.top=y+'px';
      this.$refs.foodmenudLayer.style.left=x+'px';
      this.$refs.foodmenudLayer.style.width='180px';
      this.$refs.foodmenudLayer.style.display="block";
  },
    //食谱跟随显示
    ShowFoodTips(ev,f){
      var that=this;
      this.curentHoverFood=f;
      var pose= this.GetAbsoluteLocation(ev.srcElement);
      pose.absoluteLeft+=ev.srcElement.offsetWidth+30;
      detail(f.id).then(res=> {
        if (res.data.success) {
          that.title=res.data.data.recipeName;
          that.showDatas=[];
          let day=res.data.data.recipeDay;
          this.day=day;
          let startTime=new Date(res.data.data.startTime);
          var year = startTime.getFullYear();
          var mouth = startTime.getMonth() + 1;
          var begin_day = startTime.getDate();
          that.showWeekList=[];
          let mealsType=[];
          res.data.data.recipeCycles.forEach(_=>{
            mealsType.push(_.mealsType);
          })
          let arr= Array.from(new Set(mealsType));
          let foodCatalog=[]
          for(let i=0;i<arr.length;i++){
            foodCatalog.push(that.getmealTypeDataValue(arr[i]))
          }
          that.WeekInfo.showFoodCatalog=foodCatalog;
          for(let i=1;i<day+1;i++){
            that.showWeekList.push({
              name:"week"+i,
              lable:"周"+ that.GetChinesDay(i),
              date:mouth+"月"+begin_day+"日",
            })
            startTime=new Date(startTime.getTime()+1000*60*60*24)
            var year = startTime.getFullYear();
            var mouth = startTime.getMonth() + 1;
            var begin_day = startTime.getDate();
          }
          var hd = JSON.parse(JSON.stringify(that.showWeekList));
          let header=[]
          for (let j = 0; j < hd.length; j++) {
            header.push(hd[j]);
          }
          that.showHeaders=header;
          var date3 = JSON.parse(JSON.stringify(that.WeekInfo.showFoodCatalog));
          //新增餐点类型
          for (let i = 0; i < date3.length; i++) {
            if (!that.hasShowFoodType(date3[i])) {
              var row = {
                id: that.guid(),
                pid: that.id,
                name: date3[i],
                weeks: [],
              };
              // debugger
              // 填充周数据
              for (let j = 0; j < 7; j++) {
                row.weeks.push({
                  id: that.guid(),
                  week: that.showHeaders[j],
                  name: "week" + (j + 1),
                  image: "",
                  // 填充食谱数据
                  foods: [],
                });
              }
              that.showDatas.push(row);
            }
          }
          let recipeCycles=res.data.data.recipeCycles;
          that.dishesData("showDatas",recipeCycles,that);
          that.$refs.layershipu.style.top='300px';
          that.$refs.layershipu.style.left='300px';
         // debugger
          if(that.day==5){
            that.$refs.layershipu.style.width='682px';
          }
          if(that.day==6){
            that.$refs.layershipu.style.width='802px';
          }
          if(that.day==7){
            that.$refs.layershipu.style.width='922px';
          }
          that.$refs.layershipu.style.display="block";
        }
      })

    },
    HidenFoodTips(ev)
    {
   //   debugger
      setTimeout(() => {
         this.$refs.layershipu.style.display="none";
      }, 200);

    },
    drop(ev) {},
    //菜谱拖动
    foodmenueDragStart(node, ev) {

        var that=this;
      ev.srcElement.addEventListener("drag",function(e){
        that.MoveFoodLayer(e);
      });
      ev.srcElement.addEventListener("dragend",function(e){
         that.$refs.foodmenudLayer.style.display="none";
      });
      if(node.childNodes.length==0) {
        var that = this;
        dishDetail(node.data.id).then(res => {
          let data = res.data.data;
          if (data.dishMxVos) {
            let children = [];
            this.nutritionValue.forEach(_=>{_.value='0'})
            let dishCount=0;
            data.dishMxVos.forEach(_ => {
              let item = {};
              item["id"] = _.foodId;
              item["name"] = _.name;
              item["count"] = _.value
              dishCount+=_.value;
              let nutrientIds=[];
              _.foodNutritions.forEach(__=>{
                this.nutritionValue.forEach(n=>{
                  if(n.code==__.nutrientId+""){
                    nutrientIds.push({id:__.nutrientId,name:n.name, value:__.value/100*_.foodEat*0.01})
                  }
                })
              })
              this.nutritionValue.forEach(n=>{
                _.foodNutritions.forEach(__=>{
                  if(n.code==__.nutrientId+""){
                      n.value=parseFloat(n.value)+parseFloat((__.value/100*_.foodEat*0.01)*_.value)
                  }
                })
              })
              item["nutrientIds"]=nutrientIds;
              children.push(item);
            })
            node.data = {
              id: data.id,
              label: data.dishName,
              node: {
                id: data.id,
                name: data.dishName,
                count: dishCount,
                children: children,
                dishNutrient:this.nutritionValue
              }
            }
          }
          that.drogNode = JSON.parse(JSON.stringify(node.data));
          ev.dataTransfer.setData("Text", JSON.stringify(node.data));
          console.log("node.data",node.data)
          console.log("this.datas",this.datas)
          that.drogNodeStats = true;
          setTimeout(() => {
            that.$refs.child.refreshData();
            // that.$refs.child.resizeExpendHeight();
          }, 1000);
        })
      }

    },
    // //过敏
    // allergy(){
    //   this.jundgeallergy=true;
    //   let recipeCycles=[];
    //   console.log(this.datas)
    //   this.datas.forEach(data=>{
    //     data.weeks.forEach(week=>{
    //       week.foods.forEach(food=>{
    //         let childrens=[]
    //         food.children.forEach(_=>{
    //           childrens.push({foodId:_.id})
    //         })
    //         recipeCycles.push({week:week.name.slice(4),mealsType:this.getmealTypeData(data.name),dishName:food.name,childrens:childrens})
    //       })
    //     })
    //   })
    //   let row={
    //     // peopleId:this.WeekInfo.crowd,
    //     recipeDay:this.WeekInfo.weekType,
    //     recipeCycles:recipeCycles
    //   }
    //   jundgeAllergy(row).then(res=>{
    //     this.tableData=res.data.data.foods
    //   })
    //
    // },
    jundgeFood(res, id, wk) {
      if (!res.id) return;
      let recipeCycles=[];
      let children=[];
      let name="";
      this.datas.forEach((data) => {
        if (data.id === id) {
          name=data.name;
          data.weeks.forEach((week) => {
            if (week.name === wk) {
               week.foods.forEach(dish=>{
                 dish.children.forEach(food=>{
                   children.push({foodId:food.id})
                 })
               })
            }
          });
        }
      });
      recipeCycles.push({week:wk.slice(4),mealsType:this.getmealTypeData(name),childrens:children})
      let row={
        // peopleId:this.WeekInfo.crowd,
        recipeDay:this.WeekInfo.weekType,
        recipeCycles:recipeCycles
      }
      let that=this;
      //食材相克
      jundgeFood(row).then(result=>{
        // debugger
        let foodMutuals=that.foodMutuals;
        let msg=""
          if(result.data.data.foodMutuals.length>0){
            for(let i=0;i<result.data.data.foodMutuals.length;i++){
              let flag=false;
              that.foodMutuals.forEach(_=>{
                if(_["data_id"]==id&&_["week_id"]==wk&&(_["foodId"]==result.data.data.foodMutuals[i].foodId&&_["foodId1"]==result.data.data.foodMutuals[i].foodId1)){
                  flag=true;
                }
              })
              if(!flag){
                foodMutuals.push({data_id:id,week_id:wk,foodId:result.data.data.foodMutuals[i].foodId,foodId1:result.data.data.foodMutuals[i].foodId1,msg:result.data.data.msg[i]})
              }
              msg+=result.data.data.msg[i];
            }
            that.foodMutuals=foodMutuals;

            this.$message.warning(msg);
            console.log("that.foodMutuals",that.foodMutuals)
          }
      })
    },
    foodmenueDragEnd(a, b, c) {
      this.drogNodeStats=false;
      this.$refs.foodmenudLayer.style.display="none";

      return false;
    },
    tfractio() {
      this.drawer = true;
    },
    ncodeChange(){
      let that=this;
     this.nutrition.forEach(_=>{
       if(_.code==that.node.nowCode){
         that.$set(that.node,"nowValue",_.dris)
       }
     })
      this.node.exceptValue=undefined;
    },
    startTrim(){
      if(this.node.exceptValue) {
        let that = this;

        this.smartDatas.forEach(week => {
          week.weeks.forEach(_ => {
            _.foods.forEach(__ => {
              __.children.forEach(___ => {
                let flag = false;
                ___.nutrientIds.forEach(n => {
                  if (n.id == that.node.nowCode) {
                    if (n.value != "0") {
                      flag = true;
                    }
                  }
                })
                if (flag) {
                  let add = (((parseFloat(that.node.exceptValue) - parseFloat(that.node.nowValue)) / parseFloat(that.node.nowValue)))
                  if (add > 0) {
                    this.$set(___, "up", (add * parseFloat(100)).toFixed(2));
                    delete ___["down"]

                  } else if (add < 0) {
                    this.$set(___, "down", Math.abs((add * parseFloat(100)).toFixed(2)));
                    delete ___["up"]
                  }
                  else {
                    delete ___["down"]
                    delete ___["up"]
                  }
                  let count = (parseFloat(___.count) + parseFloat(___.count) * add)
                  this.$set(___, "count", count.toFixed(2));
                }
                else{
                  debugger
                  Vue.delete(___,'down');
                  Vue.delete(___,'up');
                  // delete ___["down"]
                  // delete ___["up"]
                  // this.$set(___, "count", ___.count);
                }
              })
            })
          })
        })
        console.log(this.smartDatas)
        this.smartDatas.forEach(item => {
          this.$set(item, "flag", true);
          item.weeks.forEach(_ => {
            _.foods.forEach(__ => {
              let count = 0;
              __.children.forEach(___ => {
                count += parseFloat(___.count ? ___.count : 0)
              })
              if (parseFloat(__.count) > parseFloat(count)) {//下降
                this.$set(__, "down", Math.abs(((parseFloat(count) - parseFloat(__.count)) / parseFloat(__.count) * 100).toFixed(2)));
                delete __["up"]
              }
              else if (parseFloat(__.count) < parseFloat(count)) {//上升
                this.$set(__, "up", (((parseFloat(count) - parseFloat(__.count)) / parseFloat(__.count) * 100).toFixed(2)));
                delete __["down"]
              } else {
                delete __["down"]
                delete __["up"]
              }
              this.$set(__, "count", count);
            })
          })
        })

        this.$refs.child2.getFoodScoreSmart();
      }else{
        this.$message({
          message: "期望值不可为空",
          type: "info",
        });
      }
    },
    application(){
      this.smartDatas.forEach(week=>{
        delete week["flag"]
        week.weeks.forEach(_=>{
          _.foods.forEach(__=>{
            __.children.forEach(___=>{
                  delete ___["down"]
                  delete ___["up"]
            })
            delete __["down"]
            delete __["up"]
            }
          )
        })
      })
      localStorage.setItem("smartDatas",JSON.stringify(this.smartDatas))
      this.datas= JSON.parse(localStorage.getItem("smartDatas"))
      this.pointscan = false;
      console.log(this.score)
      let that=this;
      setTimeout(function () {
        that.$refs.child.getFoodScore();
      },200)

      this.$refs.child.refreshData();
    },
    resetMeals(){
  //  debugger
        this.smartDatas=JSON.parse(localStorage.getItem("mealsDatas"))
      let that=this;
      setTimeout(function () {
        that.$refs.child2.getFoodScoreSmart();
      },200)
    },
    //清空菜品
    dishClear(){
      console.log(this.datas)
      this.datas.forEach(_=>{
        _.weeks.forEach(week=>{
          this.$set(week,"foods",[])
          this.$set(week,"image","")
        })
      })
    },
   //智能配平
    wrapscan() {
      this.ncodeChange();
      localStorage.setItem("mealsDatas",JSON.stringify(this.datas))
      this.smartDatas=JSON.parse(localStorage.getItem("mealsDatas"))
      this.pointscan = true;
      this.peipScore=this.score
      this.ppscxjSc='0'
    },
    getmealTypeData(name){
      return  this.mealTypeData.filter(_=>{
        if(_.name==name){
          return _.value
        }
      })[0].value
    },
    getmealTypeDataValue(value){
      return  this.mealTypeData.filter(_=>{
        if(_.value==value){
          return _.value
        }
      })[0].name
    },
    //保存食谱
    buttonend() {
      let recipeCycles=[];
      let flag=false;
      this.datas.forEach(_=>{
        _.weeks.forEach(__=>{
          __.foods.forEach(___=>{
            if( ___.children){
              let children=[];
              ___.children.forEach(____=>{
                if(!____.count){
                  flag=true;
                }
                children.push({
                  foodId:____.id,
                  val:____.count,
                })
              })
              if(!___.count){
                flag=true;
              }
              recipeCycles.push({
                week:__.name.slice(4),
                mealsType:this.getmealTypeData(_.name),
                dishId:___.id,
                value:___.count,
                year:this.year,
                month:__.week.date,
                childrens:children,
                pic:__.image
              })
            }

          })
        })
      })
      let row={
        recipeName:this.WeekInfo.Weekdetails,
        startAge:this.WeekInfo.startAge,
        endAge:this.WeekInfo.endAge,
        isPub:this.WeekInfo.isPub?0:1,
        recipeDay:this.WeekInfo.weekType,
        recipeCycles:recipeCycles,
        isUse:this.WeekInfo.isUse?1:0,
        recipeCategory:1,
        startTime:this.startTime,
        endTime:this.endTime,
        isRecommend:this.WeekInfo.isRecommend?1:0,
        score:this.score
      }
      if(row.recipeName&&row.recipeCycles.length>0&&row.startTime&&!flag&&this.WeekInfo.startAge&&this.WeekInfo.endAge)  {
        if (this.id) {
          row["id"] = this.id;
          update(row).then(res => {
            if (res.data.success) {
              this.$message({
                type: "success",
                message: "编辑成功!"
              });
              this.initMealData();
              this.$router.$avueRouter.closeTag();
              this.$router.push({
                path: "./recipe"
              });
            }
          })
        } else {
          save(row).then(res => {
            if (res.data.success) {
              this.$message({
                type: "success",
                message: "新增成功!"
              });
              this.initMealData();
            }
          })
        }
      }else{
        this.$message({
          type: "info",
          message: "存在空值，无法保存!"
        });
      }


    },
    init() {
      this.initRemoteData();
    },
    //重新构建表格
    rebuildTable() {
      var that = this;
      this.headers = [];
      setTimeout(function () {
        // debugger
        var hd = JSON.parse(JSON.stringify(that.WeekList));
        for (let j = 0; j < hd.length; j++) {
          that.headers.push(hd[j]);
        }
        that.initEmptyData();
      }, 100);
    },

    //餐点类型改变
    AppendFoodType() {
      var date3 = JSON.parse(JSON.stringify(this.WeekInfo.foodCatalog));
      let datas=this.datas;
      let res=[];
      //新增餐点类型
      for (let i = 0; i < date3.length; i++) {
        // debugger
        if (!this.hasFoodType(date3[i])) {
          var row = {
            id: this.guid(),
            pid: this.id,
            name: date3[i],
            weeks: [],
          };
          // 填充周数据
          for (let j = 0; j < 7; j++) {
            row.weeks.push({
              id: this.guid(),
              week: this.headers[j],
              name: "week" + (j + 1),
              image: "",
              // 填充食谱数据
              foods: [],
            });
          }

          datas.push(row);
        }
      }
      this.mealTypeData.forEach(_=>{
          for(let i=0;i<datas.length;i++){
            if(_.name==datas[i].name){
              res.push(datas[i])
            }
          }
      })
      this.datas=res
      //删除餐点类型
      var deleteList = [];
      for (let i = 0; i < this.datas.length; i++) {
        var needremove = true;
        this.WeekInfo.foodCatalog.forEach((e) => {
          if (e == this.datas[i].name) {
            needremove = false;
          }
        });
        if (needremove) {
          deleteList.push(i);
        }
      }
      deleteList.forEach((e) => {
        this.datas.splice(e, 1);
      });
    },

    hasFoodType(foodTypeName) {
      var result = this.datas.find((p) => p.name == foodTypeName);
      if (!result) {
        return false;
      } else {
        return true;
      }
    },
    hasShowFoodType(foodTypeName) {
      var result = this.showDatas.find((p) => p.name == foodTypeName);
      if (!result) {
        return false;
      } else {
        return true;
      }
    },
    // 初始化表格数据(根据id获取远程数据)
    initEmptyData() {

    // debugger
      this.datas = [];
      var date3 = JSON.parse(JSON.stringify(this.WeekInfo.foodCatalog));
      for (let i = 0; i < date3.length; i++) {
        var row = {
          id: this.guid(),
          pid: this.id,
          name: date3[i],
          weeks: [],
        };
        // 填充周数据
        for (let j = 0; j < 7; j++) {
          row.weeks.push({
            id: this.guid(),
            week: this.headers[j],
            name: "week" + (j + 1),
            image: "",
            // 填充食谱数据
            foods: [],
          });
        }
        this.datas.push(row);
      }
      console.log(this.datas)
    },

    ///初始化远程数据
    initRemoteData() {
      var remoteStr =
        // '[{"id":"7317b146-7fc5-fcbd-2969-5b59f321e831","name":"早餐","weeks":[{"id":"79ba0527-a10a-22e0-2df4-b58d9c8b1191","week":{"name":"week1","lable":"周一","date":"11月2日","is_vacation":false},"name":"week1","image":"","foods":[{"id":101,"name":"绿豆粥","count":1,"children":[{"id":101001,"name":"绿豆","count":1,"spans":3},{"id":101002,"name":"白糖","count":1,"spans":3}],"spans":3}]},{"id":"880061e2-66d2-fed1-11bc-b9b2489fc0af","week":{"name":"week2","lable":"周二","date":"11月3日","is_vacation":false},"name":"week2","image":"","foods":[]},{"id":"ee2c62a0-5d95-9d34-0df3-212081347a45","week":{"name":"week3","lable":"周三","date":"11月4日","is_vacation":false},"name":"week3","image":"","foods":[]},{"id":"7383fe68-8ec8-e72b-879d-d99805c9813f","week":{"name":"week4","lable":"周四","date":"11月5日","is_vacation":false},"name":"week4","image":"","foods":[]},{"id":"148b984c-76f5-b856-3965-6925b0f1e694","week":{"name":"week5","lable":"周五","date":"11月6日","is_vacation":false},"name":"week5","image":"","foods":[]},{"id":"2b524e1a-4b03-d446-f09e-597a4afce450","name":"week6","image":"","foods":[]},{"id":"8eac338a-acda-78c2-e837-bae237cad7ea","name":"week7","image":"","foods":[]}]}]';
        '[{"id":"7317b146-7fc5-fcbd-2969-5b59f321e831","name":"早餐","weeks":[{"id":"79ba0527-a10a-22e0-2df4-b58d9c8b1191","week":{"name":"week1","lable":"周一","date":"11月2日","is_vacation":false},"name":"week1","image":"","foods":[{"id":101,"name":"绿豆粥","count":1,"children":[{"id":101001,"name":"绿豆","count":1,"spans":3},{"id":101002,"name":"白糖","count":1,"spans":3}],"spans":3}]},{"id":"880061e2-66d2-fed1-11bc-b9b2489fc0af","week":{"name":"week2","lable":"周二","date":"11月3日","is_vacation":false},"name":"week2","image":"","foods":[]},{"id":"ee2c62a0-5d95-9d34-0df3-212081347a45","week":{"name":"week3","lable":"周三","date":"11月4日","is_vacation":false},"name":"week3","image":"","foods":[]},{"id":"7383fe68-8ec8-e72b-879d-d99805c9813f","week":{"name":"week4","lable":"周四","date":"11月5日","is_vacation":false},"name":"week4","image":"","foods":[]},{"id":"148b984c-76f5-b856-3965-6925b0f1e694","week":{"name":"week5","lable":"周五","date":"11月6日","is_vacation":false},"name":"week5","image":"","foods":[]},{"id":"2b524e1a-4b03-d446-f09e-597a4afce450","name":"week6","image":"","foods":[]},{"id":"8eac338a-acda-78c2-e837-bae237cad7ea","name":"week7","image":"","foods":[]}]}]';
      var remoteData = JSON.parse(remoteStr);
      this.headers = [];
      remoteData[0].weeks.forEach((e) => {
        if (e.week) {
          this.headers.push(e.week);
        }
      });
      this.datas = remoteData;
    },
    //生成随机 GUID 数
    guid() {
      function S4() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
      }
      return (
        S4() +
        S4() +
        "-" +
        S4() +
        "-" +
        S4() +
        "-" +
        S4() +
        "-" +
        S4() +
        S4() +
        S4()
      );
    },
    //周选择添加周次
    FixWeek() {
      var weekSelect = document.getElementsByName("WeekSelect");
      if (weekSelect == undefined) return;

      if (weekSelect[0].getAttribute("isFixWeek") != undefined) return;

      setTimeout(function () {
        var zs = document.createElement("th");
        zs.innerText = "周次";
        var RootweekFirst = document.querySelector(
          ".el-picker-panel__content table tr th"
        );
        var Rootweek = document.querySelector(".el-picker-panel__content tr");
        Rootweek.insertBefore(zs, RootweekFirst);
        var listRow = document.querySelectorAll(".el-date-table__row");

        for (var i = 0; i < listRow.length; i++) {
          var firstNode = listRow[i].children[0];
          var zs_index = document.createElement("td");
          zs_index.style.fontWeight = "bold";
          zs_index.style.color = "#fe6c6f";
          var z = i + 1;
          switch (z) {
            case 1:
              zs_index.innerText = "一";
              break;
            case 2:
              zs_index.innerText = "二";
              break;
            case 3:
              zs_index.innerText = "三";
              break;
            case 4:
              zs_index.innerText = "四";
              break;
            case 5:
              zs_index.innerText = "五";
              break;
            case 6:
              zs_index.innerText = "六";
              break;
          }

          listRow[i].insertBefore(zs_index, firstNode);
        }
        document
          .getElementsByName("WeekSelect")[0]
          .setAttribute("isFixWeek", "true");
      }, 100);
    },
    GetChinesDay(z) {
      var cday = "";
      switch (z) {
        case 1:
          cday = "一";
          break;
        case 2:
          cday = "二";
          break;
        case 3:
          cday = "三";
          break;
        case 4:
          cday = "四";
          break;
        case 5:
          cday = "五";
          break;
        case 6:
          cday = "六";
          break;
        case 7:
          cday = "天";
          break;
      }

      return cday;
    },
    selectWeekType(){
      let that=this;
      this.$confirm("重新选择周期会清空已有菜品", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(()=>{
        let weekType=that.WeekInfo.weekType;
        that.$refs.refweekSelect.showPicker();
        that.SelectWeek(this.startTime)
        that.$refs.refweekSelect.hidePicker();
      })
    },
    SelectWeek1(d){
      this.$confirm("重新选择周期会清空已有菜品", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(()=>{
        this.SelectWeek(d)
      })
    },
    //选择周
    SelectWeek(d,name,recipeCycles) {

      if(typeof  d =="string"){
        d=new Date(d)
      }
      var that = this;
      setTimeout(function (v) {
        var year = d.getFullYear();
        that.year=year;
        var begin_year;
        var end_year;
        begin_year = year;
        end_year = year;
        var begin_mouth;
        var end_mouth;
        var mouth = d.getMonth() + 1;

        begin_mouth = mouth;
        end_mouth = mouth;
        var StartEliment = document.querySelectorAll(".in-range.start-date");
        var begin_day = StartEliment[0].innerText.trim();
        that.month=begin_mouth+"-"+begin_day+"";
        //判断是否为上一个月
        if (StartEliment[0].className.indexOf("prev-month") >= 0) {
          begin_mouth = mouth - 1;
          if (begin_mouth == 0) {
            begin_mouth = 12;
          }
        }

        //判断是否为下一个月
        var endtime = document.querySelectorAll(".in-range.end-date");
        if (endtime[0].className.indexOf("next-month") >= 0) {
          if (mouth == 12) {
            end_year = end_year + 1;
            end_mouth = 1;
          }
        }
        var end_day = endtime[0].innerText.trim();

        //获取周数本月

        //获取周数
        var curentWeek = document.querySelectorAll(
          ".el-date-table__row.current"
        )[0].firstChild.innerText;

        var full_week = year + "年" + mouth + "月" + "第" + curentWeek + "周";

        that.WeekInfo.WeekTtitle = full_week;
        if(parseInt(begin_day)>parseInt(end_day)) {
          end_mouth=begin_mouth+1;
          if(end_mouth>12){
            end_mouth=1
          }
        }
        var full_weekDetails =
          year +
          "年" +
          mouth +
          "月" +
          "第" +
          curentWeek +
          "周" +
          // begin_year +
          // "-" +
          begin_mouth +
          "-" +
          begin_day +
          "至" +
          // end_year +
          // "-" +
          end_mouth +
          "-" +
          end_day;

        if(name){
          that.WeekInfo.Weekdetails=name;
        }else{
          that.WeekInfo.Weekdetails = full_weekDetails;
        }
        that.startTime=new Date(year+"-"+begin_mouth+"-"+begin_day);
        that.startTimeStr=year+"-"+begin_mouth+"-"+begin_day;
        that.endTime=new Date(year+"-"+end_mouth+"-"+end_day);
        that.endTimeStr=year+"-"+end_mouth+"-"+end_day;
        //获取每天
        that.WeekList = [];

        var alldday = document.querySelectorAll(
          ".el-date-table__row.current"
        )[0].children;

        for (let i = 1; i < alldday.length; i++) {
          if (i <= that.WeekInfo.weekType) {
            var y = year;
            var m = mouth;
            if (alldday[i].className.indexOf("prev-month") >= 0) {
              m = mouth - 1;
              if (m == 0) {
                m = 12;
              }
            }

            if (alldday[i].className.indexOf("next-month") >= 0) {
              if (mouth == 12) {
                y = year + 1;
                m = 1;
              }
            }


            that.WeekList.push({
              name: "week" + i,
              lable: "周" + that.GetChinesDay(i),
              date: m + "月" + alldday[i].innerText.trim() + "日",
              is_vacation: false,
            });
          }
        }
        that.rebuildTable();
      }, 100);
    },
    //打开周选择
    ShowWeekSelect() {
      this.$refs.refweekSelect.showPicker();
    },
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

  .item-allergy{
    min-height: 100px;
    max-height: 250px;
    overflow:scroll;
  }
.meals .el-row {
  padding: 5px;
}
/*.meals .el-select .el-input {*/
  /*width: 120px;*/
/*}*/
.meals .el-form-item {
  margin-bottom: 0px;
}
.meals .el-divider {
  margin: 0px !important;
}
.meals .clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.meals .clearfix:after {
  clear: both;
}
.meals .box-car {
  border: 1px solid #ebebeb !important;
  border-radius: 3px !important;
  padding: 0px;
  height: 600px;
}
.meals .el-card__body {
  padding: 0px !important;
}
.meals .panel_head {
  background-color: rgba(0, 172, 160, 1);
  padding-top: 10px;
  text-align: center;
  border-radius: 3px;
}
.meals .panel_head button {
  border-bottom: 0px;
  border-bottom-right-radius: 0px;
  border-bottom-left-radius: 0px;
  margin-bottom: 1px;
}
.meals .foodWeekListHis {
  padding: 0 0 0 10px;
  overflow-y: scroll;
  height: 280px;
}
.meals .foodWeekListHis li {
  list-style: none;
  margin-bottom: 5px;
}
.meals .foodPanel {
   height: calc(100vh - 180px);
  overflow-y: scroll;
  overflow-x: auto;
}
.meals .foodrate {
  width: 100%;
  height: 50px;
  /* background-color: red; */
  text-align: center;
  margin-bottom: 50px;
}
.scores {
  cursor: pointer;
  width: 230px;
  height: 102px;
  /* background-color: red; */
  position: absolute;
  top: 90px;
  right: 30px;
  z-index: 999;
}
.scores3{
  width: 100px;
}
  .scores1-1 {
    width: 216px;
    height: 102px;
    /* background-color: yellow; */
    background-image: url("/img/yuan1.png");
    background-size: 100% 100%;
    display: flex;
    justify-content:space-between;
  }
.scores1 {
  width: 216px;
  height: 102px;
  /* background-color: yellow; */
  background-image: url("/img/yuan.png");
  background-size: 100% 100%;
  display: flex;
  justify-content:space-between;
}
.scores2-item{
  display: flex;
  flex-direction:row;
}
.scores2-item2{
  margin-top: -20px;
  padding-left: 20px;
}
 .scores2 {
  width: 120px;
  height: 65px;
  margin-top: 10px;
  display: flex;
   flex-direction:column;
  /* background-color: blue; */
  background-size: 100% 100%;
}
.gnus {
  font-size: 24px;
  text-align: center;
  color: #ffffff;
}
.picture {
  width: 30px;
  height: 30px;
  margin-top: 20px;
  margin-left: 10px;
}
.vertical {
  font-size: 20px;
  color: #00bfaf;
  line-height: 30px;
  padding-left: 5px;
}
.scorefor {
  text-align: center;
  color: #ffffff;
  font-size: 10px;
  margin-top: -23px;
}
.meals .header {
  width: 100%;
  height: 120px;
  /* background-color: red; */
}
.headerTime {
  width: 100%;
  height: 55px;
}
.meals .nutrition {
  width: 100%;
  height: 55px;
  /* background-color: blue; */
}
.meals .action {
  width: 23%;
  height: 700px;
  /* background: yellow; */
  float: left;
}
.onblur {
  width: 100%;
  display: flex;
  justify-content: start;
  height: 700px;
  /* background-color: red; */
  float: left;
  margin-top: 20px;
  margin-left: 15px;
  margin-bottom: 70px;
}
.meals .arrow {
  width: 100%;
  height: 50px;
  line-height: 50px;
  /* background-color: blue; */
  display: flex;
}
.meals .season {
  width: 80px;
  height: 30px;
  text-align: center;
  color: #fff;
  line-height: 30px;
  margin-top: 10px;
  background-color: rgba(255, 0, 0, 1);
}

.meals .season1 {
  width: 80px;
  height: 30px;
  margin-left: 20px;
  text-align: center;
  color: #fff;
  line-height: 30px;
  margin-top: 10px;
  background-color: rgba(0, 172, 160, 1);
}
.meals .season2 {
  width: 80px;
  height: 30px;
  margin-left: 20px;
  text-align: center;
  color: #fff;
  line-height: 30px;
  margin-top: 10px;
  background-color: rgba(255, 153, 51, 1);
}
.meals .fonts {
  width: 100%;
  /* height: 500px; */
  /* background-color: yellow; */
}
.meals  .el-checkbox{
   width: 35px;
  }
  .select-item{
    margin-top: 5px;
    display: flex;
    justify-content: space-between;
    font-size: 12px!important
  }
.meals .el-input{
    font-size: 12px!important;
  }
/*.meals .select-item .el-input__icon{*/
  /*width:5px !important;*/
/*}*/
/*.meals .select-item  .el-input--suffix .el-input__inner{*/
  /*padding-right: 15px!important;*/
/*}*/

.showFoodListColor{
  color: #00b1a2 !important;
  border-color: #b3e8e3 !important;
  background-color: #e6f7f6 !important;
}
.recipeColor{
  color: #00b1a2 !important;
}
.dishColor{
  color: #00b1a2 !important;
}
.filter-tree{
  font-size: 14px;
  margin-left: 5px;
  margin-top: 15px;
  overflow-y: scroll;
  height: 450px;
}
/*.crow-item{*/
  /*width:100px;*/
/*}*/

</style>
