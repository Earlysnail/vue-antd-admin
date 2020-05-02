<template>
  <div>
    <a-card style="margin-top: 24px" :bordered="false" title="课程表">
      <a-button v-if="userInfo.role == 1" @click="showModal" type="primary" style="margin-bottom:10px;">添加课程</a-button>
      <a-modal
        v-model="visible"
        title="添加课程"
        width="700px"
        ok-text="添加"
        cancel-text="取消"
        @ok="addCourse"
        @cancel="onClose"
      >
        <a-form-model :model="form" :label-col="labelCol" :wrapper-col="wrapperCol">
          <a-form-model-item label="课程名">
            <a-input v-model="form.courseName" />
          </a-form-model-item>
          <a-form-model-item label="老师">
            <a-select v-model="form.teacherInfo.tustId">
              <a-select-option
                :key="index"
                v-for="(item, index) in teacherList"
                :value="item.tustId"
              >{{item.name}}</a-select-option>
            </a-select>
          </a-form-model-item>
          <a-form-model-item label="上课地点">
            <a-input v-model="form.courseBuilding" />
          </a-form-model-item>
          <a-form-model-item label="学分">
            <a-input v-model="form.score" />
          </a-form-model-item>
        </a-form-model>
      </a-modal>

      <a-table :columns="courseColumns" :dataSource="courseData" :pagination="false" />
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
  }
];

export default {
  name: "list",
  data() {
    return {
      userInfo: JSON.parse(localStorage.getItem("userInfo")),
      courseColumns,
      courseData: [],
      teacherList: [],
      visible: false,
      labelCol: { span: 4 },
      wrapperCol: { span: 18 },
      form: {
        courseName: "",
        courseBuilding: "",
        teacherInfo: {
          tustId: ""
        },
        score: ""
      }
    };
  },
  components: { HeadInfo },
  mounted() {
    this.getAllCourse();
    this.getAllUser();
  },
  methods: {
    showModal() {
      this.visible = true;
    },
    onClose() {
      this.visible = false;
    },
    getAllUser() {
      this.$Request.getUser().then(res => {
        console.log("所有用户", res);
        let userList = res.result;
        this.teacherList = userList.filter(item => {
          return item.role == 2;
        });
        console.log("teacherList", this.teacherList);
      });
    },
    getAllCourse() {
      this.$Request.getCourse().then(res => {
        this.courseData = res.result;
        console.log("所有课程", res);
      });
    },
    addCourse() {
      let courseInfo = this.form;
      console.log("添加课程", courseInfo);
      this.$Request.addCourse(courseInfo).then(res => {
        if (res.code == "2001") {
          console.log("添加成功", res);
        } else {
          console.log("添加失败", res.msg);
        }
        this.visible = false;
        this.getAllCourse();
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
