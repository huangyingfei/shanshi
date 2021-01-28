<template>
  <div class="wel">
    <platform v-if="this.yaml == 1"></platform>
    <creating v-if="this.yaml == 2"></creating>
    <govern v-if="this.yaml == 3"></govern>
  </div>
</template>

<script>
import platform from "../desk/notice";
import creating from "../organ/index";
import govern from "../gov/index";
export default {
  components: {
    platform,
    creating,
    govern,
  },
  name: "wel",
  data() {
    return {
      yaml: "",
    };
  },

  beforeMount() {
    this.Personal();
  },
  mounted() {},
  methods: {
    Personal() {
      this.$axios
        .get(`api//blade-system/tenant/getInfoByTenantId `, {})
        .then((res) => {
          // console.log(res);
          this.markup = res.data.data;
          // console.log(this.markup);
          this.yaml = this.markup.tenantType;
          console.log(this.yaml);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
