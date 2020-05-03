<template>
  <div>
    <a-card style="margin-top: 24px" :bordered="false" title="评教">
      <a-table :columns="courseColumns" :dataSource="courseData" :customRow="rowClick">
        <a slot="action">去评教</a>
      </a-table>
    </a-card>
    <a-modal
      v-model="visible"
      title="评教"
      @ok="handleOk"
      @cancle="handleCancle"
      ok-text="确定"
      cancel-text="取消"
    >
      <a-form-model :model="form" :label-col="labelCol" :wrapper-col="wrapperCol">
        <a-form-model-item label="写教评">
          <a-input v-model="form.desc" type="textarea" />
        </a-form-model-item>
      </a-form-model>
    </a-modal>
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
    key: "operation",
    fixed: "right",
    width: 100,
    scopedSlots: { customRender: "action" }
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
        desc: ""
      },
      selectCourse: {},
      courseColumns,
      courseData: [{ courseName: "www", courseBuilding: "2-111", score: "2" }],
      evaluationResult: null
    };
  },
  components: { HeadInfo },
  mounted() {
    this.getSelectCourse();
  },
  methods: {
    rowClick(record, index) {
      return {
        on: {
          click: () => {
            this.selectCourse = record;
            this.visible = true;
            console.log(record, "record");
          }
        }
      };
    },
    handleOk() {
      this.evaluation();
      this.visible = false;
    },
    handleCancle() {
      this.visible = false;
    },
    evaluation() {
      let evaluation = {
        selectCourseLog: { id: this.selectCourse.id },
        content: this.form.desc
      };
      this.$Request.evaluation(evaluation).then(res => {
        if (res.code == "2001") {
          console.log("评教结果", res);
          this.$message.success("评教成功");
        } else {
          console.log("添加失败", res.msg);
          this.$message.error("添加失败");
        }
      });
    },
    getSelectCourse() {
      this.$Request.getSelectCourse().then(res => {
        let course = [];
        res.result.forEach(item => {
          course.push(item.courseInfo);
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
