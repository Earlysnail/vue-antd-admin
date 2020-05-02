<template>
  <div>
    <a-card style="margin-top: 24px" :bordered="false" title="评教">
      <a-table :columns="courseColumns" :dataSource="courseData" >
      </a-table>
    </a-card>
  </div>
</template>

<script>
import HeadInfo from "../../components/tool/HeadInfo";

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
  },
  {
    title: "评教",
    dataIndex: "content",
    key: "content"
  }
];

export default {
  name: "list",
  data() {
    return {
      visible: false,
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      form: {
        name: "",
        desc: ""
      },
      selectCourse: {},
      courseColumns,
      courseData: [],
      evaluationResult: null
    };
  },
  components: { HeadInfo },
  mounted() {
    this.getEvaluation();
  },
  methods: {
    getEvaluation() {
      this.$Request.getEvaluation().then(res => {
        console.log("评教结果", res);
        let courseData = []
        let course = {}
        res.result.forEach(item => {
           course =  item.selectCourseLog.courseInfo
           course.content = item.content
           courseData.push(course)
        });
        this.courseData = courseData
        // this.evaluationResult = res.result;
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
