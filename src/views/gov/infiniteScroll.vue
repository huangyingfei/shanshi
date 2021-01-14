<template>
  <div class="detetion-box" ref="boxScroll">
    <ul>
      <li v-for="(item, index) in 10" :key="index">
        <slot :liData="item"></slot>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    liType: {
      type: Number,
    },
    liArray: {
      type: Array,
    },
  },
  data() {
    return {};
  },
  computed: {},
  mounted() {
    this.$refs.boxScroll.addEventListener("scroll", this.getData);
  },
  destroyed() {},
  methods: {
    getData() {
      // console.log(this.$refs.boxScroll.scrollHeight);
      // console.log(this.$refs.boxScroll.scrollTop);
      // console.log(this.$refs.boxScroll.clientHeight);
    },
    ScrollUp() {
      this.speed = 50;
      var boxScrollHeight = this.$refs.boxScroll.scrollHeight;
      var boxScrollTop = this.$refs.boxScroll.scrollTop;
      var boxClientHeight = this.$refs.boxScroll.clientHeight;
      if (boxScrollHeight - (boxScrollTop + boxClientHeight) < 100) {
        this.$emit("scrollUp", this.liType);
      }
    },
  },
};
</script>
<style scoped>
.detetion-box {
  height: inherit;
  overflow: scroll;
}
ul {
  list-style: none;
  padding-left: 2px;
}
</style>