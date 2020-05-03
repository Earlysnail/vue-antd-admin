<template>
  <div>
    <a-card style="margin-top: 24px" :bordered="false" title="选课">
      <div>
        <div style="margin-bottom: 16px">
          <a-button type="primary" :disabled="!hasSelected" :loading="loading" @click="start">确定选课</a-button>
          <span style="margin-left: 8px">
            <template v-if="hasSelected">{{ `已选择 ${selectedRowKeys.length} 门课程` }}</template>
          </span>
        </div>
        <a-table
          :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
          :columns="courseColumns"
          :data-source="courseData"
          :pagination="false"
        />
      </div>
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
      selectedRowKeys: [], // Check here to configure the default column
      loading: false,

      courseColumns,
      courseData: []
    };
  },
  components: { HeadInfo },
  mounted() {
    this.getAllCourse();
  },
  computed: {
    hasSelected() {
      return this.selectedRowKeys.length > 0;
    }
  },
  methods: {
    getAllCourse() {
      this.$Request.getCourse().then(res => {
        this.courseData = res.result;
        console.log("所有课程", res);
      });
    },

    start() {
      this.loading = true;
      console.log("选中课程", this.selectedRowKeys);
      let selectCourseId = [];
      for (let i = 0; i < this.selectedRowKeys.length; i++) {
        selectCourseId.push(this.courseData[this.selectedRowKeys[i]].id);
      }
      console.log("选中课程ID", selectCourseId);

      this.$Request.selectCourse(selectCourseId).then(res => {
        if (res.code == "2001") {
          console.log("添加成功", res);
          this.$message.success("添加成功");
          this.$router.push("/course/courselist");
        } else {
          console.log("添加失败", res.msg);
          this.$message.success("添加失败");
        }
        this.loading = false;
      });
    },
    onSelectChange(selectedRowKeys) {
      console.log("选中课程: ", selectedRowKeys);
      this.selectedRowKeys = selectedRowKeys;
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
