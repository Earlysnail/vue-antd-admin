<template>
  <div>
    <a-card style="margin-top: 24px" :bordered="false" title="课程表">
      <a-table :columns="courseColumns" :dataSource="courseData" :pagination="false" />
    </a-card>
  </div>
</template>

<script>
import HeadInfo from "../../components/tool/HeadInfo";

const tabList = [
  {
    key: "1",
    tab: "周一"
  },
  {
    key: "2",
    tab: "周二"
  },
  {
    key: "3",
    tab: "周三"
  },
  {
    key: "4",
    tab: "周四"
  },
  {
    key: "5",
    tab: "周五"
  },
  {
    key: "6",
    tab: "周六"
  },
  {
    key: "7",
    tab: "周日"
  }
];
const courseColumns = [
  {
    title: "课程名",
    dataIndex: "courseName",
    key: "courseName"
  },
  {
    title: "授课教师",
    dataIndex: "teacherInfo.name",
    key: "teacherInfo.name"
  },
  {
    title: "上课地点",
    dataIndex: "courseBuilding",
    key: "courseBuilding"
  },
  {
    title: "学分",
    dataIndex: "score",
    key: "score"
  }
];

export default {
  name: "list",
  data() {
    return {
      courseColumns,
      courseData: [],
    };
  },
  components: { HeadInfo },
  created() {
    this.getSelectCourse();
  },
  methods: {
    getSelectCourse() {
      this.$Request.getSelectCourse().then(res => {
        let course = []
        res.result.forEach(item => {
          course.push(item.courseInfo)
        });
        this.courseData = course;
        console.log("所选课程", res);
      });
    }
  }
};
</script>

<style lang="less" scoped>
.ant-avatar-lg {
  width: 48px;
  height: 48px;
  line-height: 48px;
}
.list-content-item {
  color: rgba(0, 0, 0, 0.45);
  display: inline-block;
  vertical-align: middle;
  font-size: 14px;
  margin-left: 40px;
  span {
    line-height: 20px;
  }
  p {
    margin-top: 4px;
    margin-bottom: 0;
    line-height: 22px;
  }
}
</style>
