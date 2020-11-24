<template>
  <div style="padding: 0px; height: 1080px">

    <div class="title" >{{title}}</div>
    <!-- table-week start   -->
    <el-table class="table-week" style="width: 100%" :data="datas" border fit>
      <el-table-column align="center" width="80" fixed class-name="col-date3 colNoneBorder" >
        <!--<template slot="header"> 菜品/食物 </template>-->
        <template slot-scope="scope">
          <div v-bind:data="scope.row.name" class="foodType">{{ scope.row.name }}</div>
        </template>
      </el-table-column>
      <!-- 周一   -->
      <el-table-column
        v-if="headers.find((p) => p.name == 'week1')"
        align="center"
        width="120"
      >
        <template slot="header">
          <div class="">
            {{ headers.find((p) => p.name == "week1").lable }}
            <!--({{-->
            <!--headers.find((p) => p.name == "week1").date-->
            <!--}})-->
          </div>
        </template>
        <template slot-scope="scope">
          <div class="drapIn" >
            <div v-for="(item ,index) in scope.row.weeks.find((p) => p.name == 'week1').foods">
              <span>{{item.name}}</span>
            </div>
          </div>
        </template>
      </el-table-column>
      <!-- 周二   -->
      <el-table-column
        v-if="headers.find((p) => p.name == 'week2')"
        align="center"
        width="120"
      >
        <template slot="header">
          <div class="">
            {{ headers.find((p) => p.name == "week2").lable }}
            <!--({{-->
            <!--headers.find((p) => p.name == "week2").date-->
            <!--}})-->
          </div>

        </template>
        <template slot-scope="scope">
          <div class="drapIn" >
            <div v-for="(item ,index) in scope.row.weeks.find((p) => p.name == 'week2').foods">
              <span>{{item.name}}</span>
            </div>
          </div>
        </template>
      </el-table-column>
      <!-- 周三   -->
      <el-table-column
        v-if="headers.find((p) => p.name == 'week3')"
        align="center"
        width="120"
      >
        <template slot="header">
          <div class="">
            {{ headers.find((p) => p.name == "week3").lable }}
            <!--({{-->
            <!--headers.find((p) => p.name == "week3").date-->
            <!--}})-->
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
          <div class="drapIn" >
            <div v-for="(item ,index) in scope.row.weeks.find((p) => p.name == 'week3').foods">
              <span>{{item.name}}</span>
            </div>
          </div>
        </template>
      </el-table-column>
      <!-- 周四   -->
      <el-table-column
        v-if="headers.find((p) => p.name == 'week4')"
        align="center"
        width="120"
      >
        <template slot="header">
          <div class="">
            {{ headers.find((p) => p.name == "week4").lable }}
            <!--({{-->
            <!--headers.find((p) => p.name == "week4").date-->
            <!--}})-->
          </div>

        </template>
        <template slot-scope="scope">
          <div class="drapIn" >
            <div v-for="(item ,index) in scope.row.weeks.find((p) => p.name == 'week4').foods">
              <span>{{item.name}}</span>
            </div>
          </div>
        </template>
      </el-table-column>
      <!-- 周五  -->
      <el-table-column
        v-if="headers.find((p) => p.name == 'week5')"
        align="center"
        width="120"
      >
        <template slot="header">
          <div class="">
            {{ headers.find((p) => p.name == "week5").lable }}
            <!--({{-->
            <!--headers.find((p) => p.name == "week5").date-->
            <!--}})-->
          </div>

        </template>
        <template slot-scope="scope">
          <div class="drapIn" >
            <div v-for="(item ,index) in scope.row.weeks.find((p) => p.name == 'week5').foods">
              <span>{{item.name}}</span>
            </div>
          </div>
        </template>
      </el-table-column>
      <!-- 周六   -->
      <el-table-column
        v-if="headers.find((p) => p.name == 'week6')"
        align="center"
        width="120"
      >
        <template slot="header">
          <div class="">
            {{ headers.find((p) => p.name == "week6").lable }}
            <!--({{-->
            <!--headers.find((p) => p.name == "week6").date-->
            <!--}})-->
          </div>

        </template>
        <template slot-scope="scope">
          <div class="drapIn" >
            <div v-for="(item ,index) in scope.row.weeks.find((p) => p.name == 'week6').foods">
              <span>{{item.name}}</span>
            </div>
          </div>
        </template>
      </el-table-column>
      <!-- 周天  -->
      <el-table-column
        v-if="headers.find((p) => p.name == 'week7')"
        align="center"
        width="120"
      >
        <template slot="header">
          <div class="">
            {{ headers.find((p) => p.name == "week7").lable }}
            <!--({{-->
            <!--headers.find((p) => p.name == "week7").date-->
            <!--}})-->
          </div>

        </template>
        <template slot-scope="scope">
          <div class="drapIn" >
            <div v-for="(item ,index) in scope.row.weeks.find((p) => p.name == 'week7').foods">
              <span>{{item.name}}</span>
            </div>
          </div>
        </template>
      </el-table-column>
    </el-table>

  </div>
</template>
<script>
  import foodsChoice from "@/views/foods/components/foodschoice";
  import {calRecipe} from "@/api/system/meals"
  export default {
    name: "showfoodsWeek",
    components: {
      foodsChoice,
    },
    props: {
      // 表格头部
      title:'',
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
      // dragnode: {},
    },
    data() {
      return {
        empty_image: "/img/tianjia.png",

        dialog_choice: {
          opened: false, // 是否显示
          data_id: "", // 主数据ID
          week_id: "", // 周几数据ID
          upload_url: "", // 上传地址
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
        ]
      };
    },
    // 计算属性computed,计算的是Name依赖的值,它不能计算在data中已经定义过的变量。
    computed: {},
    // 当属性的值发生变化时，就会调用对应属性的方法，方法里面的形参对应的是属性的新值和旧值
    watch: {

    },
    // 组件第一次加载
    mounted() {
      this.init();
      console.log(22222222222222222);
    },
    methods: {
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
            });
          }
        });
      },

      expandchange(a, b) {
        this.resizeExpendHeight();
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

      // // 设置假期
      // onCheck(week, res) {
      //   var idx = this.headers.findIndex((p) => p.name === week);
      //   if (idx > -1) {
      //     var item = this.headers.find((p) => p.name === week);
      //     item.is_vacation = res;
      //     this.$set(this.headers, idx, item);
      //   }
      // },

      // 合并单元格
      onTableSpanMethod({ row, column, rowIndex, columnIndex }) {
        if (columnIndex === 2) {
          return [row.spans, 1];
        }
      },

      // 选择菜谱
      // onChoice(data_id, week_id) {
      //   this.dialog_choice.data_id = data_id;
      //   this.dialog_choice.week_id = week_id;
      //   this.dialog_choice.opened = true;
      //   // console.log(this.dialog_choice.data_id);
      // },

      // 选择菜谱结果
      // onChoiceChange(res) {
      //   // console.log(res);
      //   this.datas.forEach((data) => {
      //     if (data.id === this.dialog_choice.data_id) {
      //       data.weeks.forEach((week) => {
      //         if (week.id === this.dialog_choice.week_id) {
      //           var food = week.foods.find((p) => p.id == res.id);
      //           if (food) {
      //             this.$message({
      //               message: "已经存在，请重新选择",
      //               type: "error",
      //             });
      //
      //             return;
      //           } else {
      //             week.foods.push(res);
      //             // 关闭对话框
      //             this.dialog_choice.opened = false;
      //             this.refreshData();
      //             return;
      //           }
      //         }
      //       });
      //     }
      //   });
      // },

      // // 移除
      // onRemove(data_id, week_id, food_id) {
      //   this.datas.forEach((data) => {
      //     if (data.id === data_id) {
      //       data.weeks.forEach((week) => {
      //         if (week.id === week_id) {
      //           var idx = week.foods.findIndex((p) => p.id === food_id);
      //           if (idx > -1) {
      //             week.foods.splice(idx, 1);
      //
      //             return;
      //           }
      //         }
      //       });
      //     }
      //   });
      // },

      // // 上传图片
      // onUploadImage(data_id, week_id, res) {
      //   //   console.log(res);
      //   if (res && res.status === "success") {
      //     this.datas.forEach((data) => {
      //       if (data.id === data_id) {
      //         data.weeks.forEach((week) => {
      //           if (week.id === week_id) {
      //             week.image =
      //               "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1604519021887&di=7dc08416a5f9f6301472e0974e043186&imgtype=0&src=http%3A%2F%2Fcp1.douguo.com%2Fupload%2Fcaiku%2F7%2Ff%2F0%2Fyuan_7fb557435ef7dc525adefe1efaad2070.jpg";
      //           }
      //         });
      //       }
      //     });
      //   }
      // },

      /////////  methods end ///////////
    },
  };
</script>
<style>
  .title{
    font-weight: bold;
    padding-bottom: 10px;
  }
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
  .drapInActive .el-table th {
    background-color: red !important;

  }
  .colNoneBorder
  {
    /* border-bottom: 1px solid transparent !important; */
  }
</style>
