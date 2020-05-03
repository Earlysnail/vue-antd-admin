<template>
  <a-layout>
    <drawer v-if="isMobile" :openDrawer="collapsed" @change="onDrawerChange">
      <sider-menu
        :theme="theme"
        :menuData="menuData"
        :collapsed="false"
        :collapsible="false"
        @menuSelect="onMenuSelect"
      />
    </drawer>
    <sider-menu
      :theme="theme"
      v-else-if="layout === 'side'"
      :menuData="menuData"
      :collapsed="collapsed"
      :collapsible="true"
    />
    <drawer :open-drawer="showSetting" placement="right" @change="onSettingDrawerChange">
      <div class="setting" slot="handler">
        <a-icon :type="showSetting ? 'close' : 'setting'" />
      </div>
      <setting />
    </drawer>
    <a-layout>
      <global-header :menuData="menuData" :collapsed="collapsed" @toggleCollapse="toggleCollapse" />
      <a-layout-content :style="{minHeight: minHeight, margin: '24px 24px 0'}">
        <slot></slot>
      </a-layout-content>
      <a-layout-footer style="padding: 0px">
        <global-footer :link-list="linkList" :copyright="copyright" />
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>

<script>
import GlobalHeader from "./GlobalHeader";
import GlobalFooter from "./GlobalFooter";
import Drawer from "../components/tool/Drawer";
import SiderMenu from "../components/menu/SiderMenu";
import Setting from "../components/setting/Setting";
const minHeight = window.innerHeight - 64 - 24 - 122;
import Vue from "vue";
import PageView from "@/layouts/PageView";
import RouteView from "@/layouts/RouteView";
import MenuView from "@/layouts/MenuView";
import Login from "@/pages/login/Login";

let menuData = [];

export default {
  name: "GlobalLayout",
  components: { Setting, SiderMenu, Drawer, GlobalFooter, GlobalHeader },
  data() {
    return {
      minHeight: minHeight + "px",
      collapsed: false,
      menuData: menuData,
      showSetting: false
    };
  },
  computed: {
    isMobile() {
      return this.$store.state.setting.isMobile;
    },
    theme() {
      return this.$store.state.setting.theme;
    },
    layout() {
      return this.$store.state.setting.layout;
    },
    linkList() {
      return this.$store.state.setting.footerLinks;
    },
    copyright() {
      return this.$store.state.setting.copyright;
    }
  },
  methods: {
    toggleCollapse() {
      this.collapsed = !this.collapsed;
    },
    onDrawerChange(show) {
      this.collapsed = show;
    },
    onMenuSelect() {
      this.toggleCollapse();
    },
    onSettingDrawerChange(val) {
      this.showSetting = val;
    }
  },
  beforeCreate() {
    const router = [
      {
        path: "/用户管理",
        name: "用户管理",
        role: [1, 2, 3],
        component: RouteView,
        icon: "dashboard",
        children: [
          {
            path: "/user/userinfo",
            name: "个人信息",
            role: [1, 2, 3],
            component: () => import("@/pages/user/UserInfo"),
            icon: "none"
          },
          {
            path: "/user/list",
            name: "用户列表",
            role: [1],
            component: () => import("@/pages/user/List"),
            icon: "none"
          }
        ]
      },
      {
        path: "/成绩管理",
        name: "成绩管理",
        role: [2, 3],
        component: RouteView,
        icon: "dashboard",
        children: [
          {
            path: "/score/scorelist",
            name: "成绩列表",
            role: [3],
            component: () => import("@/pages/score/ScoreList"),
            icon: "none"
          },
          {
            path: "/score/scoreentry",
            name: "成绩录入",
            role: [2],
            component: () => import("@/pages/score/ScoreEntry"),
            icon: "none"
          }
        ]
      },
      {
        path: "/教学评估",
        name: "教学评估",
        role: [1, 3],
        component: RouteView,
        icon: "dashboard",
        children: [
          {
            path: "/evaluation/evaluationscreen",
            name: "教学评估",
            role: [3],
            component: () => import("@/pages/evaluation/EvaluationScreen"),
            icon: "none"
          },
          {
            path: "/evaluation/evaluationresult",
            name: "教评结果",
            role: [1],
            component: () => import("@/pages/evaluation/EvaluationResult"),
            icon: "none"
          }
        ]
      },
      {
        path: "/课程管理",
        name: "课程管理",
        role: [1, 2, 3],
        component: RouteView,
        icon: "dashboard",
        children: [
          {
            path: "/course/coursemanage",
            name: "所有课程",
            role: [1, 2],
            component: () => import("@/pages/course/CourseManage"),
            icon: "none"
          },
          {
            path: "/course/courselist",
            name: "查看课程",
            role: [3],
            component: () => import("@/pages/course/CourseList"),
            icon: "none"
          },
          {
            path: "/course/selectcourse",
            name: "选课",
            role: [3],
            component: () => import("@/pages/course/SelectCourse"),
            icon: "none"
          }
        ]
      }
    ];
    console.log("router", router);
    let userInfo = JSON.parse(localStorage.getItem("userInfo"));
    console.log("user", userInfo);
    let role = userInfo.role;
    let newMenu = [];
    let newItem = [];
    router.forEach(item => {
      if (item.role.indexOf(role) > -1) {
        item.children.forEach(item2 => {
          if (item2.role.indexOf(role) > -1) {
            newItem.push(item2);
          }
        });
        item.children = newItem;
        newMenu.push(item);
      }
      newItem = [];
    });
    console.log("newMenu", newMenu);

    menuData = newMenu;
  }
};
</script>

<style lang="less" scoped>
.setting {
  background-color: #1890ff;
  color: #fff;
  border-radius: 5px 0 0 5px;
  line-height: 40px;
  font-size: 22px;
  width: 40px;
  height: 40px;
  box-shadow: -2px 0 8px rgba(0, 0, 0, 0.15);
}
</style>
