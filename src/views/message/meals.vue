<template>
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
              @change="SelectWeek"
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

          <el-form-item label="餐点设置">
            <el-checkbox-group
              v-model="WeekInfo.foodCatalog"
              @change="AppendFoodType"
            >
              <el-checkbox label="早餐" checked name="早餐"></el-checkbox>
              <el-checkbox label="早点" name="早点"></el-checkbox>
              <el-checkbox label="午餐" name="午餐"></el-checkbox>
              <el-checkbox label="午点" name="午点"></el-checkbox>
              <el-checkbox label="晚餐" name="晚餐"></el-checkbox>
              <el-checkbox label="晚点" name="晚点"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
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

          <el-form-item>
            选择人群
            <el-select v-model="WeekInfo.crowd" placeholder="选择人群"  class="crow-item" >
              <el-option  v-for="(item ,index) in crowdData" :label="item.peopleName" :value="item.id" :key="item.id"></el-option>
            </el-select>
            <el-switch
              style="margin-left: 10px"
              v-model="WeekInfo.sharePlant"
              inactive-text="分享平台"
            >
            </el-switch>

            <el-switch
              style="margin-left: 10px"
              v-model="WeekInfo.shareTell"
              inactive-text="公示"
            >
            </el-switch>

            <el-switch
              style="margin-left: 10px"
              v-model="WeekInfo.collection"
              inactive-text="收藏"
            >
            </el-switch>

            <el-button
              @click="wrapscan"
              style="margin-left: 10px"
              size="medium"
              type="success"
              >智能配平</el-button
            >
            <el-button
              @click="buttonend"
              style="margin-left: 10px"
              size="medium"
              type="success"
            >保存食谱</el-button
            >
            <el-button style="margin-left: 10px" size="medium"
              >自动设置油盐糖</el-button
            >

            <el-button style="margin-left: 10px" size="medium"
              >自动清除油盐糖</el-button
            >


            <el-popover
              placement="right"
              width="300"
              trigger="click">
              <nutrient-with-color :nutrition="nutrition"  :WeekTtitle="WeekInfo.WeekTtitle" :titleFlag="true"></nutrient-with-color>
              <el-button  slot="reference" style="margin-left: 10px" size="medium"
              >营养素</el-button
              >
            </el-popover>


            <el-button style="margin-left: 10px" size="medium"
              >带量食谱</el-button
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
              <el-button size="small" :class="{'showFoodListColor':!showFoodList}"  @click="showFoodList = false"
                >食谱</el-button
              >
              <el-button size="small"  :class="{'showFoodListColor':showFoodList}"   @click="showFoodList = true"
                >菜品</el-button
              >
            </el-button-group>
          </div>

          <el-tabs
            v-show="!showFoodList"
            v-model="activeName"
          >
            <!--//分享食谱-->
            <el-tab-pane label="分享食谱" name="first" >
              <div style="margin-top: -5px; padding:5px">
                <el-input
                  size="small"
                  placeholder="请输入内容"
                  v-model="recipeNameSharePub"
                  class="input-with-select"
                  @change="recipeNameShareSearchPub()">
                  <!--<el-button slot="append" icon="el-icon-search" @click="recipeNameShareSearchPub()"></el-button>-->
                </el-input>
              </div>
              <div style="font-size: 10px;margin:0 10px;display: flex;justify-content:space-around">
                <el-link :underline="false" :class="{'recipeColor':recipeSelectPub=='1'}"   @click="recipeNameShareSearchPub('1')">全部</el-link>
                 |
                <el-link :underline="false"  :class="{'recipeColor':recipeSelectPub=='2'}"  @click="recipeNameShareSearchPub('2',1)">收藏</el-link>
              </div>

              <div style="margin-top: 5px; margin-bottom: 2px">
                <!--<el-divider></el-divider>-->
              </div>

              <ul class="foodWeekListHis">
                <li  v-for="f in mealListLeft" :key="f.id"  style="font-size: 14px">
                  <span  @mouseover="ShowFoodTips($event,f)"  @mouseout="HidenFoodTips($event)">{{f.recipeName}}</span> <img style="width: 20px" @click="mealLoad(f.id,f.recipeName)" src="/img/arrow.png" alt />
                </li>
              </ul>
            </el-tab-pane>


            <!--//个人食谱-->
            <el-tab-pane label="个人食谱" name="second">
              <div style="margin-top: -5px; padding: 5px">
                <el-input
                  size="small"
                  placeholder="请输入内容"
                  v-model="recipeNameSharePri"
                  class="input-with-select"
                  @change="recipeNameShareSearchPri()"
                >
                  <!--<el-button slot="append" icon="el-icon-search" @click="recipeNameShareSearchPri()"></el-button>-->
                </el-input>
              </div>
              <div style="font-size: 10px;margin:0 10px;display: flex;justify-content: space-between">
                <el-link :underline="false"  :class="{'recipeColor':recipeSelectPri=='1'}" @click="recipeNameShareSearchPri('1')">全部</el-link>
                |
                <el-link :underline="false"   :class="{'recipeColor':recipeSelectPri=='2'}" @click="recipeNameShareSearchPri('2',0)">公开</el-link>
                |
                <el-link :underline="false"   :class="{'recipeColor':recipeSelectPri=='3'}" @click="recipeNameShareSearchPri('3',1)">隐藏</el-link>
              </div>

              <div style="margin-top: 5px; margin-bottom: 2px">
                <!--<el-divider></el-divider>-->
              </div>

              <ul class="foodWeekListHis">
                <li  v-for="f in peopleMealListLeft" :key="f.id"  style="font-size: 14px" >
                  <span  @mouseover="ShowFoodTips($event,f)"  @mouseout="HidenFoodTips($event)">{{f.recipeName}}</span>  <img style="width: 20px" @click="mealLoad(f.id,f.recipeName)" src="/img/arrow.png" alt />
                </li>
              </ul>
            </el-tab-pane>
          </el-tabs>

          <!--菜品-->
          <el-tabs
            v-show="showFoodList"
            v-model="activeName2"
          >
            <el-tab-pane label="公共菜品" name="thread">

              <div style="margin-top: -5px; padding: 5px">
                <el-input
                  size="small"
                  placeholder="请输入内容"
                  v-model="dishSharePub"
                  class="input-with-select"
                  @change="dishShareSearchPub()"
                >
                  <!--<el-button slot="append" icon="el-icon-search" ></el-button>-->
                </el-input>
              </div>
              <div style=" font-size: 10px;margin:0 15px;display: flex;justify-content: space-between">
                <el-link :underline="false"  :class="{'recipeColor':dishSelectPub=='1'}"  @click="dishShareSearchPub('1',1)">全部</el-link>
                |
                <el-link :underline="false" :class="{'recipeColor':dishSelectPub=='2'}"  @click="dishShareSearchPub('2',1,0)">常用</el-link>
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
            </el-tab-pane>
            <el-tab-pane label="个人菜品" name="four">
              <div style="margin-top: -5px; padding: 5px">
                <el-input
                  size="small"
                  placeholder="请输入内容"
                  v-model="dishSharePri"
                  class="input-with-select"
                  @change="dishShareSearchPri()"
                >
                  <!--<el-button slot="append" icon="el-icon-search"></el-button>-->
                </el-input>
              </div>
              <div style=" font-size: 10px;margin:0 15px;display: flex;justify-content: space-between">
                <el-link :underline="false" :class="{'recipeColor':dishSelectPri=='1'}" @click="dishShareSearchPri('1',2)">全部</el-link>
                |
                <el-link :underline="false" :class="{'recipeColor':dishSelectPri=='2'}"  @click="dishShareSearchPri('2',0)">公开</el-link>
                |
                <el-link :underline="false"  :class="{'recipeColor':dishSelectPri=='3'}"  @click="dishShareSearchPri('3',1)">隐藏</el-link>
              </div>
              <div class="select-item" >
                <!--<el-select v-model="belongRegion" placeholder="请选择">-->
                  <!--<el-option-->
                    <!--v-for="item in belongRegionOption"-->
                    <!--:key="item.value"-->
                    <!--:label="item.label"-->
                    <!--:value="item.value">-->
                  <!--</el-option>-->

                <!--</el-select>-->

                <el-cascader  size="mini"
                  :options="belongRegionOption"   style="width: 100px"  v-model="belongRegion" @change="dishShareSearchPri()"
                  :props="{ checkStrictly: true,label:'name',value:'code' }"
                  clearable></el-cascader>
                <el-select  size="mini" v-model="seasonl"  clearable  style="width: 60px" placeholder="请选择" @change="dishShareSearchPri()">
                  <el-option
                    v-for="item in seasonlOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value" >
                  </el-option>
                </el-select>
                <el-select size="mini"  v-model="isUse"  clearable  style="width: 70px"  placeholder="请选择" @change="dishShareSearchPri()">
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
                :data="personMenuDishList"
                :props="defaultProps"
                default-expand-all
                :filter-node-method="filterNode"
                draggable
                @node-drag-start="foodmenueDragStart"
                :allow-drop="foodmenueDragEnd"
                @node-drag-over="foodmenueDragMove"
              >
              </el-tree>
            </el-tab-pane>
          </el-tabs>

          <!--<div-->
            <!--class="foodSelectMenue"-->
            <!--v-show="showFoodList"-->
            <!--style="margin-top: 0px; padding: 5px"-->
          <!--&gt;-->
            <!--<el-input placeholder="输入关键字进行过滤" v-model="filterText">-->
            <!--</el-input>-->

            <!--<el-tree-->
              <!--class="filter-tree"-->
              <!--:data="menue_data"-->
              <!--:props="defaultProps"-->
              <!--default-expand-all-->
              <!--:filter-node-method="filterNode"-->
              <!--draggable-->
              <!--@node-drag-start="foodmenueDragStart"-->
              <!--:allow-drop="foodmenueDragEnd"-->
              <!--@node-drag-over="foodmenueDragMove"-->
              <!--ref="tree"-->
            <!--&gt;-->
            <!--</el-tree>-->
          <!--</div>-->
        </el-card>
      </el-col>
      <el-col :span="19">
        <div class="foodPanel">
          <foods-week
            @childfn="parentFn"
            :headers="headers"
            :datas="datas"
            days="5"
            :crowd="WeekInfo.crowd"
            :dragnode="drogNode"
             ref="child"
          >
          </foods-week>
        </div>
      </el-col>

    </el-row>
    <div class="scores" @click="tfractio">
      <div class="scores1">
        <p class="gnus">{{score}}</p>
        <p class="scorefor">分</p>
      </div>
      <div class="scores2">
        <img class="picture" src="/img/fenshu.png" alt="" />
        <p class="vertical">真棒</p>
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
          <el-input
            style="width: 140px"
            placeholder="请输入内容"
            v-model="node.exceptValue"
            clearable
          >
          </el-input>

          <el-button style="margin-left: 30px" type="primary"  @click="startTrim"
            >开始配平</el-button
          >
          <el-button type="primary" @click="application">应用</el-button>
          <el-button type="primary" @click="resetMeals">重置</el-button>
        </div>
      </div>
      <!--<div class="action">-->
        <!--<div class="arrow">-->
          <!--<div class="season">不足</div>-->
          <!--<div class="season1">适量</div>-->
          <!--<div class="season2">过量</div>-->
        <!--</div>-->
        <!--<div class="fonts">-->
          <!--<el-table-->
            <!--style="width: 100%; margin-bottom: 20px"-->
            <!--row-key="id"-->
            <!--:data="secondary"-->
            <!--:border="false"-->
            <!--:default-expand-all="false"-->
            <!--:tree-props="{ children: 'children', hasChildren: 'hasChildren' }"-->
          <!--&gt;-->
            <!--<el-table-column-->
              <!--prop="date"-->
              <!--align="center"-->
              <!--label="营养素"-->
              <!--width="140"-->
            <!--&gt;-->
            <!--</el-table-column>-->
            <!--<el-table-column prop="name" align="center" label="含量" width="80">-->
            <!--</el-table-column>-->
            <!--<el-table-column prop="address" align="center" label="DRIs%">-->
            <!--</el-table-column>-->
          <!--</el-table>-->
        <!--</div>-->
      <!--</div>-->
      <!-- 表格 -->
      <div class="onblur">
        <nutrient-with-color :nutrition="nutrition"  ></nutrient-with-color>

        <smartfoods-week    @childfn="parentFn"
                       :headers="headers"
                       :datas="smartDatas"
                       days="5"
                       :crowd="WeekInfo.crowd"
                       :dragnode="drogNode"
                            :nutritionValue="nutritionValue"
                       ref="child" > </smartfoods-week>
      </div>

      <div class="scores">
        <div class="scores1">
          <p class="gnus">{{score}}</p>
          <p class="scorefor">分</p>
        </div>
        <div class="scores2">
          <img class="picture" src="/img/fenshu.png" alt="" />
          <p class="vertical">真棒</p>
        </div>
      </div>
    </el-dialog>
    <!-- 智能配平弹框结束 -->
  </div>
</template>

<script>
  import foodsWeek from "@/views/foods/components/foodsweek";
  import showfoodsWeek from "@/views/foods/components/showfoodsweek";
  import {getList} from "@/api/system/special"
  import {mealList,getDishByBaseId,dishDetail,save,detail,update,grantTree} from "@/api/system/meals"
  import nutrient from "@/views/foods/components/nutrient";
  import nutrientWithColor from "@/views/foods/components/nutrientwithcolor";
  import showScore from "@/views/foods/components/showscore";
  import smartfoodsWeek from "@/views/foods/components/smartfoodsweek";
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
    if(this.$route.query.userid){
      this.id=this.$route.query.userid;
      this.personMealhandleNodeClick(this.$route.query.userid,this)
    }
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
        shareTell:false,
        collection:false,
        sharePlant:false,
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
          value:'0'
        },
        {
          name:"蛋白质",
          code:"102",
          value:'0'
        },
        {
          name:"钙",
          code:"201",
          value:'0'
        },{
          name:"纳",
          code:"204",
          value:'0'
        },{
          name:"铁",
          code:"301",
          value:'0'
        },{
          name:"锌",
          code:"303",
          value:'0'
        }
        ,{
          name:"维生素A",
          code:"401",
          value:'0'
        },{
          name:"维生素B1",
          code:"405",
          value:'0'
        },{
          name:"维生素B2",
          code:"406",
          value:'0'
        }
        ,{
          name:"维生素C",
          code:"415",
          value:'0'
        },
      ],
      node:{
        nowCode:'101',
        nowValue:'',
        exceptValue:'',
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
  methods: {
    recipeNameShareSearchPub(recipeSelectPub,isUse){
    if(recipeSelectPub){
      this.recipeSelectPub=recipeSelectPub;
    }else{
      if( this.recipeSelectPub=='2'){
        isUse='1';
      }
    }
    mealList(1,undefined,this.recipeNameSharePub,isUse).then(res=>{
      this.mealListLeft=res.data.data;
    })
    },
    recipeNameShareSearchPri(recipeSelectPri,isPub){
      // debugger
      if(recipeSelectPri){
        this.recipeSelectPri=recipeSelectPri;
      }else{
        if( this.recipeSelectPri=='2'){
          isPub='0';
        }
        if( this.recipeSelectPri=='3'){
          isPub='1';
        }
      }
        mealList(2,isPub,this.recipeNameSharePri).then(res=>{
          this.peopleMealListLeft=res.data.data;
        })
      // }
      // else{
      //   mealList(2,type,this.recipeNameSharePri,undefined).then(res=>{
      //     this.peopleMealListLeft=res.data.data;
      //   })
      // }
    },
   mealLoad(id,name){
     let that=this;
     this.$confirm("请确定是否导入食谱："+name+"?", "提示", {
       confirmButtonText: "确定",
       cancelButtonText: "取消",
       type: "warning"
     }).then(()=>{
       that.personMealhandleNodeClick(id,that)
     })
   },

    personMealhandleNodeClick(id,that){
      detail(id).then(res=>{
        if(res.data.success){
          let mealsType=[];
          let data=res.data.data;
          data.recipeCycles.forEach(_=>{
            mealsType.push(_.mealsType);
          })
          let arr= Array.from(new Set(mealsType));
          let foodCatalog=[]
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
          that.WeekInfo.crowd=data.peopleId;
          that.WeekInfo.shareTell=data.isBoard=="1"?true:false
          that.WeekInfo.collection=data.isUse==1?true:false;
          that.WeekInfo.sharePlant=data.isPub==0?true:false
          setTimeout(function () {
            that.detailPushData("datas",recipeCycles,that);
          }, 1000);
        }
      })
    },
    //详情数据绑定前端
    detailPushData(datas,recipeCycles,that){
      that[datas].forEach(_=>{
        _.weeks.forEach(__=>{
          /////
          let foods=__.foods;
          for(let i=0;i<recipeCycles.length;i++){

            if(recipeCycles[i].mealsType+""==that.getmealTypeData(_.name)&&recipeCycles[i].week+""==__.name.slice(4)){
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
      if(datas!="showDatas"){
        this.$refs.child.getFoodScore();
      }

    },
    parentFn(score,intake,nutrition,power,protein,meal){
    console.log(intake)
      this.score=score;
      this.intake=intake;
      this.nutrition=nutrition
      this.power=power
      this.protein=protein
      this.meal=meal
      this.ncodeChange();
    },
    initMealData(){
      //公开
      mealList(1).then(res=>{
        this.mealListLeft=res.data.data;
      })

      mealList(2).then(res=>{
        this.peopleMealListLeft=res.data.data;
      })
    },
    dishShareSearchPub(dishSelectPub,isPrivate,isUse){
      //公共
      if(dishSelectPub){
        this.dishSelectPub=dishSelectPub
      }else{
          if(this.dishSelectPub=='1'){
            isPrivate=1;
          }
          if(this.dishSelectPub=='2'){
            isUse=0;
         }
      }
      let dishSharePub= this.dishSharePub?this.dishSharePub:undefined
      getDishByBaseId(isPrivate,undefined,dishSharePub,undefined,undefined,isUse).then(res=>{
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
    dishShareSearchPri(dishSelectPri,typeTemp){
      //私人
      if(dishSelectPri){
        this.dishSelectPri=dishSelectPri;
      }else{
        if(this.dishSelectPri=='1'){
          typeTemp=2
        }
        if(this.dishSelectPri=='2'){
          typeTemp=0
        }
        if(this.dishSelectPri=='3'){
          typeTemp=1
        }
      }
      let dishSharePri= this.dishSharePri?this.dishSharePri:undefined;
      let belongRegion= this.belongRegion?this.belongRegion[0]:undefined;
      let seasonl= this.seasonl?this.seasonl:undefined;
      let isUse= (this.isUse||this.isUse==0)&&this.isUse!=""?this.isUse:undefined;
      // debugger
      getDishByBaseId(0,typeTemp,dishSharePri,belongRegion,seasonl,isUse).then(res=>{
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
          this.personMenuDishList=data;
        }
      })
    },
    initData(){
      this.initMealData();
      getList().then(res=>{
        this.crowdData=res.data.data;
        this.WeekInfo.crowd=this.crowdData[0].id;
      })
      this.dishShareSearchPub()
      this.dishShareSearchPri()

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
          that.detailPushData("showDatas",recipeCycles,that);
          console.log(that.showDatas)
          console.log(that.showHeaders)

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
            data.dishMxVos.forEach(_ => {
              let item = {};
              item["id"] = _.foodId;
              item["name"] = _.name;
              item["count"] = _.value
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
                // count: dishCount,
                children: children,
                dishNutrient:this.nutritionValue
              }
            }
          }

          console.log("node.data",node.data)
          that.drogNode = JSON.parse(JSON.stringify(node.data));
          ev.dataTransfer.setData("Text", JSON.stringify(node.data));
          that.drogNodeStats = true;
        })

      }
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
         that.$set(that.node,"nowValue",_.realIntake)
       }
     })
    },
    startTrim(){
      let that=this;
      this.smartDatas.forEach(week=>{
      week.weeks.forEach(_=>{
          _.foods.forEach(__=>{
            __.children.forEach(___=>{
              let flag=false;
              ___.nutrientIds.forEach((n)=>{
                if(n.id=that.node.nowCode){
                  flag=true;
                }
              })
              if(flag){
                ___.count=( parseFloat(___.count)+(parseFloat(___.count)*((parseFloat(that.node.exceptValue)-parseFloat(that.node.nowValue))/parseFloat(that.node.nowValue))))
                ___.count=___.count.toFixed(2);
              }
            })
          })
        })

      })
      debugger

    },
    application(){
      this.datas= this.smartDatas;
      this.pointscan = false;
    },
    resetMeals(){
  //  debugger
        this.smartDatas=JSON.parse(localStorage.getItem("mealsDatas"))
    },
    wrapscan() {
      this.ncodeChange();
      localStorage.setItem("mealsDatas",JSON.stringify(this.datas))
      this.smartDatas=this.datas
      this.pointscan = true;
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
                month:this.month,
                childrens:children
              })
            }

          })
        })
      })
      let row={
        recipeName:this.WeekInfo.Weekdetails,
        peopleId:this.WeekInfo.crowd,
        isPub:this.WeekInfo.sharePlant?0:1,
        recipeDay:this.WeekInfo.weekType,
        recipeCycles:recipeCycles,
        isUse:this.WeekInfo.collection?1:0,
        recipeCategory:1,
        startTime:this.startTime,
        endTime:this.endTime,
        isBoard:this.WeekInfo.shareTell?1:0
      }
      if(row.recipeName&&row.recipeCycles.length>0&&row.startTime&&!flag) {
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
                path: "./myecipe"
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
          this.datas.push(row);
        }
      }

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
  height: 450px;
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
  width: 180px;
  height: 90px;
  /* background-color: red; */
  position: absolute;
  top: 180px;
  right: 70px;
  display: flex;
  /* border-radius: 50%;
  background-image: url("/img/yuan.png");
  background-size: 100% 100%; */
}
.scores1 {
  width: 90px;
  height: 90px;
  /* background-color: yellow; */
  border-radius: 50%;
  background-image: url("/img/yuan.png");
  background-size: 100% 100%;
}
 .scores2 {
  width: 80px;
  height: 65px;
  margin-top: 10px;
  display: flex;
  margin-left: -5px;
  /* background-color: blue; */
  background-image: url("/img/fenshu1.png");
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
  margin-left: 2px;
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
  font-size: 15px;
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
/*.meals .el-drawer__open .el-drawer.rtl{*/
  /*width: 50%!important;*/
  /*overflow-y: scroll;*/
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
.crow-item{
  width:100px;
}
</style>
