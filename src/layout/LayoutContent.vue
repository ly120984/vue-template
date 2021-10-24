<template>
  <div class="layout_content">
    <div v-if="mode === 3" class="updown">
      <TopBar />
      <div class="main-container">
        <breadcrumb :showInfo="false"></breadcrumb>
        <app-main class="app_main" />
      </div>
    </div>
    <div v-if="mode === 1 || mode === 2">
      <sidebar class="sidebar-container" v-on:change="change" ref="div" />
    </div>
    <div v-if="mode === 1 || mode === 2" class="layout_right">
      <topnav v-if="mode === 1">
        <!-- <el-input /> -->
      </topnav>
      <div
        class="main-container"
        :class="{ 'main-container_notop': mode === 1 }"
      >
        <breadcrumb :showInfo="mode === 2"></breadcrumb>
        <app-main class="app_main" />
      </div>
    </div>
  </div>
</template>

<script>
import Bus from "face-code3.0/vendor/Bus";
export default {
  name: "Layout",
  data() {
    return {
      sidebar: {
        opened: true,
      },
    };
  },
  components: {},
  mixins: [],
  mounted() {},
  watch: {
    opened(v) {
      console.log(v, "layout变动");
    },
  },
  computed: {
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
      };
    },
    opened() {
      return this.sidebar.opened;
    },
    mode() {
      if (localStorage.getItem("layoutMode")) {
        return parseInt(localStorage.getItem("layoutMode"));
      } else {
        return window.GLOBAL.layoutMode;
      }
    },
  },
  created() {
    Bus.$on("toggleSideBar", () => {
      this.sidebar.opened = !this.sidebar.opened;
    });
  },
  methods: {
    handleClickOutside() {
      this.$store.dispatch("CloseSideBar", { withoutAnimation: false });
    },
    change() {},
  },
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.layout_content {
  display: flex;
  position: fixed;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}
.layout_right {
  display: flex;
  flex-direction: column;
  // width: 100%;
  flex: 1;
  height: 100%;
  box-sizing: border-box;
  overflow: auto;
}
.app-wrapper {
  width: 100%;
  height: 100%;
  flex: 1;
  overflow-y: scroll;
  // position: relative;
  // padding-top: 62px;
  box-sizing: border-box;
  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
}
.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}
.main-container {
  display: flex;
  flex-direction: column;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  font-size: 14px;
}
.main-container_notop {
  height: calc(100% - 64px);
}
.bottom_container {
  display: flex;
  height: 100%;
  box-sizing: border-box;
  flex: 1;
}
.app_main {
  box-sizing: border-box;
  height: 100%;
}

.updown {
  display: flex;
  flex-direction: column;
  position: fixed;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}
</style>
