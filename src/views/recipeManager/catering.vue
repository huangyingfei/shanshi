<template>
  <div class="class-table">
    <table>
      <tr>
        <td>学号</td>
        <td>姓名</td>
        <td>操作</td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      weeks: [
        "monday",
        "tuesday",
        "wednesday",
        "thursday",
        "friday",
        "saturday",
        "sunday"
      ],
      classTableData: [
        {
          classesTime: "08:00-09:00",
          monday: "物理",
          tuesday: "英语",
          wednesday: "政治",
          thursday: "历史",
          friday: "化学",
          saturday: "历史",
          sunday: "化学"
        },
        {
          classesTime: "09:00-10:00",
          monday: "生物",
          tuesday: "物理",
          wednesday: "化学",
          thursday: "英语",
          friday: "化学",
          saturday: "生物",
          sunday: "化学"
        }
      ],
      tableShow: false
    };
  },
  methods: {
    digital2Chinese(num, identifier) {
      const character = [
        "零",
        "一",
        "二",
        "三",
        "四",
        "五",
        "六",
        "七",
        "八",
        "九",
        "十",
        "十一",
        "十二"
      ];
      return identifier === "week" && (num === 0 || num === 7)
        ? "日"
        : character[num];
    }
  }
};
</script>

<style lang="scss" scoped>
// .class-table {
//   .table-wrapper {
//     width: 100%;
//     height: 100%;
//     overflow: auto;
//   }
//   .tabel-container {
//     margin: 7px;

//     table {
//       table-layout: fixed;
//       width: 100%;

//       thead {
//         // background-color: #67a1ff;
//         th {
//           color: #000;
//           line-height: 17px;
//           font-weight: normal;
//         }
//       }
//       tbody {
//         background-color: #eaf2ff;
//         td {
//           color: #000;
//           line-height: 12px;
//         }
//       }
//       th,
//       td {
//         width: 60px;
//         padding: 12px 2px;
//         font-size: 12px;
//         text-align: center;
//       }

//       tr td:first-child {
//         color: #333;
//         .period {
//           font-size: 8px;
//         }
//       }
//     }
//   }
// }
</style>
