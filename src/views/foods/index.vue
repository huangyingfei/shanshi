<template>
  <div>
    <foods-week
      :headers="headers"
      :datas="datas"
      height="800"
      days="5"
      @childfn="childfn"
    ></foods-week>

    <div style="text-align:center;padding:10px;">
      <el-button type="primary" @click="onResult" >获取结果</el-button>
    </div>
  </div>
</template>
<script>
  import foodsWeek from "@/views/foods/components/foodsweek";
  export default {
    components: {
      foodsWeek,
    },
    data() {
      return {
        // 表格头部
        headers: [],
        // 表格数据
        datas: [],
      };
    },
    created() {
      this.init();
    },
    methods: {
      childfn(a) {
        console.log("a");
        console.log(a);
      },
      init() {
        this.getHeader();
        this.getData();
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

      // 初始化头部(根据id获取远程数据)
      getHeader() {
        this.headers = [];
        this.headers.push({
          name: "week1",
          lable: "周一",
          date: "8月1日",
          is_vacation: true,
        });
        this.headers.push({
          name: "week2",
          lable: "周二",
          date: "8月2日",
          is_vacation: false,
        });
        this.headers.push({
          name: "week3",
          lable: "周三",
          date: "8月3日",
          is_vacation: false,
        });
        this.headers.push({
          name: "week4",
          lable: "周四",
          date: "8月4日",
          is_vacation: false,
        });
        this.headers.push({
          name: "week5",
          lable: "周五",
          date: "8月5日",
          is_vacation: false,
        });
        this.headers.push({
          name: "week6",
          lable: "周六",
          date: "8月6日",
          is_vacation: false,
        });
        this.headers.push({
          name: "week7",
          lable: "周天",
          date: "8月7日",
          is_vacation: false,
        });
      },

      // 初始化表格数据(根据id获取远程数据)
      getData() {
        this.datas = [];

        var date3 = ["早餐","xxxx"];

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
              name: "week" + (j + 1),
              image: "",
              // 填充食谱数据
              foods: [
                {
                  id: 101,
                  name: "绿豆粥",
                  count: 1,
                  children: [
                    { id: 101001, name: "绿豆", count: 1 },
                    { id: 101002, name: "白糖", count: 1 },
                  ],
                }

              ],
            });
          }

          this.datas.push(row);
        }


      },

      // 获取结果
      onResult(){
        this.init();
        console.log("----get result header----")
        console.log(this.headers)
        console.log("----get result data----")
        console.log(this.datas)
      }

      /////////  methods end ///////////
    },
  };
</script>
<style lang="scss" scoped>
</style>
