<template>
  <basic-container>
    <div class="item-top">设置与打印报表相关的营养素，即报表里显示的营养素</div>
    <div class="item-blo">
      <div>营养素</div>
      <div>显示</div>
    </div>
    <div class="item-mid">
      <el-tree
        :data="data"
        node-key="id"
        accordion
        :expand-on-click-node="false"
      >
        <span class="custom-tree-node" slot-scope="{ node, data }">
          <span>{{ node.label }}</span>
          <span>
            <!--<el-checkbox-->
              <!--:checked="data.checked"-->
              <!--@change="changeValue(node, data)"-->
              <!--v-if="data.level == 1"-->
            <!--&gt;</el-checkbox>-->
            <el-checkbox
              :checked="data.checked"
              @change="changeValue(node, data)"
              v-if="data.level != 1"
            ></el-checkbox>
          </span>
        </span>
      </el-tree>
      <div class="item-bottom">
        <el-button type="primary" @click="submitForm">保存</el-button>
      </div>
    </div>
  </basic-container>
</template>

<script>
import { tree, save, list } from "@/api/system/nutrientsetting";
export default {
  data() {
    return {
      data: [],
      checkArr: [],
    };
  },
  created() {
    this.onLoad();
  },
  methods: {
    // func(data){
    //   //
    //    data.forEach(_=>{
    //      if(_.children){
    //        return this.func(_.children);
    //      }else{
    //       this.$set(_,"label",_.title);
    //       this.$set(_,"checked",false);
    //       console.log(_);
    //      }
    //    })
    //    console.log(data);
    // },
    changeValue(node, data) {
      data.checked = !data.checked;
      // console.log(node,data)
      //    console.log(this.data)

      console.log(this.$refs);
    },
    onLoad() {
      list().then((res) => {
        let resData = res.data.data;
        let arr = [];
        resData.forEach((_) => {
          arr.push(_.nutrientId+"");
        });
        console.log(arr)
        tree().then((res) => {
          //
          let data = res.data.data;
          data.forEach((_) => {
            if (_.children) {
              _.children.forEach((__) => {
                if (__.children) {
                  __.children.forEach((___) => {
                    ___.label = ___.title;
                    if (arr.indexOf(___.id+"") > -1) {
                      ___.checked = true;
                    }
                  });
                }
                __.label = __.title;
                if (arr.indexOf(__.id+"") > -1) {
                  __.checked = true;
                }
              });
            }
            _.label = _.title;
            if (arr.indexOf(_.id+"") > -1) {
              _.checked = true;
            }
          });
             this.data = data;
            console.log(this.data);
        });
      });
    },

    submitForm() {
      let formData = [];
      this.data.forEach((_) => {
        if (_.checked) {
          formData.push({ nutrientId: _.id });
        }
        if (_.children) {
          _.children.forEach((__) => {
            if (__.checked) {
              formData.push({ nutrientId: __.id });
            }
            if (__.children) {
              __.children.forEach((___) => {
                if (___.checked) {
                  formData.push({ nutrientId: ___.id });
                }
              });
            }
          });
        }
      });
      save(formData).then((res) => {
        if (res.data.success) {
          this.$message({
            message: "保存成功",
            type: "success",
          });
        } else {
          this.$message({
            message: "失败",
            type: "error",
          });
        }
      });
    },
  },
};
</script>

<style scoped>
.item-top {
  color: #ccc;
}
.basic-container {
  font-size: 13px;
}
.item-blo {
  display: flex;
  width: 350px;
  margin: 20px 0 0 20px;
  justify-content: space-between;
}
.item-mid {
  margin-top: 20px;
  width: 380px;
  text-align: center;
}
.item-bottom {
  margin-top: 30px;
  width: 380px;
  text-align: center;
}
.el-button,
.el-button--primary {
  width: 150px;
  background-color: rgba(39, 181, 156, 1);
  border-color: rgba(39, 181, 156, 1);
}

.el-button--primary.is-active,
.el-button--primary:active {
  background-color: rgba(39, 181, 156, 1);
}

.el-button--primary:hover {
  background-color: rgba(39, 181, 156, 1);
}

.el-button--primary:visited {
  background-color: rgba(39, 181, 156, 1);
}

.el-button--primary:link {
  background-color: rgba(39, 181, 156, 1);
}
</style>
