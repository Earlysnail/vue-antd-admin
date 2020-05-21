<template>
  <a-card>
    <div v-if="type == 'score'">
      <a-form layout="horizontal">
        <div>
          <a-row>
            <a-button @click="changeType" type="primary" style="margin-right:100px;">返回课程列表</a-button>
          </a-row>
        </div>
      </a-form>

      <form :autoFormCreate="(form) => this.form = form">
        <a-table :columns="columns" :dataSource="courseStudent" :pagination="false">
          <template
            v-for="(col, i) in ['course','name', 'tustId', 'depart', 'role',  'email', 'phoneNumber','sex','birthday', 'score']"
            :slot="col"
            slot-scope="text, record"
          >
            <a-input
              :key="record.id"
              v-if="record.editable && col == 'score'"
              style="margin: -5px 0"
              :value="text"
              :placeholder="columns[i].title"
              @change="e => handleChange(e.target.value, record.id, col)"
            />
            <template v-else>{{text}}</template>
          </template>
          <template slot="operation" slot-scope="text, record">
            <template v-if="record.editable">
              <span>
                <a @click="saveRow(record.id)">保存</a>
                <a-divider type="vertical" />
                <a @click="cancle(record.id)">取消</a>
              </span>
            </template>
            <span v-else>
              <a @click="toggle(record.id)">编辑</a>
            </span>
          </template>
        </a-table>
      </form>
    </div>
    <div v-if="type == 'course'">
      <a-table :columns="column" :data-source="courseData" :customRow="rowClick">
        <a slot="action">录入成绩</a>
      </a-table>
    </div>
  </a-card>
</template>

<script>
const column = [
  {
    title: "课程名",
    dataIndex: "courseName",
    key: "courseName"
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
    title: "操作",
    key: "operation",
    fixed: "right",
    width: 100,
    scopedSlots: { customRender: "action" }
  }
];

const columns = [
  {
    title: "课程",
    dataIndex: "course",
    key: "course",
    width: "10%",
    scopedSlots: { customRender: "course" }
  },
  {
    title: "姓名",
    dataIndex: "name",
    key: "name",
    width: "7%",
    scopedSlots: { customRender: "name" }
  },
  {
    title: "学号",
    dataIndex: "tustId",
    key: "tustId",
    width: "10%",
    scopedSlots: { customRender: "tustId" }
  },
  {
    title: "学院",
    dataIndex: "depart",
    key: "depart",
    width: "10%",
    scopedSlots: { customRender: "depart" }
  },
  {
    title: "角色",
    dataIndex: "role",
    key: "role",
    width: "10%",
    scopedSlots: { customRender: "role" }
  },
  {
    title: "邮箱",
    dataIndex: "email",
    key: "email",
    width: "10%",
    scopedSlots: { customRender: "email" }
  },
  {
    title: "手机",
    dataIndex: "phoneNumber",
    key: "phoneNumber",
    width: "10%",
    scopedSlots: { customRender: "phoneNumber" }
  },
  {
    title: "性别",
    dataIndex: "sex",
    key: "sex",
    width: "6%",
    scopedSlots: { customRender: "sex" }
  },
  {
    title: "生日",
    dataIndex: "birthday",
    key: "birthday",
    width: "10%",
    scopedSlots: { customRender: "birthday" }
  },
  {
    title: "成绩",
    dataIndex: "score",
    width: "10%",
    key: "score",
    scopedSlots: { customRender: "score" }
  },
  {
    title: "操作",
    key: "action",
    width: "10%",
    scopedSlots: { customRender: "operation" }
  }
];

const courseStudent = [
  {
    name: "name",
    tustId: "tustId",
    depart: "depart",
    role: "role",
    sex: "sex",
    birthday: "birthday",
    email: "email",
    phoneNumber: "phoneNumber",
    score: "score"
  }
];

export default {
  name: "QueryList",
  components: {},
  data() {
    return {
      type: "course",
      columns,
      selectObject: {
        course: "计算机网络",
        class: "151043班"
      },
      courseData: [],
      courseStudent: [],
      column
    };
  },
  created() {
    this.getAllCourse();
  },
  methods: {
    rowClick(record, index) {
      return {
        on: {
          click: () => {
            this.changeType();
            this.getCourseStudent(record);
            console.log(record, "record");
          }
        }
      };
    },
    changeType(e) {
      console.log("e", e);
      if (this.type == "score") {
        this.type = "course";
      } else {
        this.type = "score";
      }
    },
    getCourseStudent(item) {
      this.$Request.getCourseStudent(item.id).then(res => {
        let courseStudent = [];
        let courseItem = {};
        res.result.forEach(element => {
          courseItem = {};
          courseItem.course = item.courseName;
          courseItem.role =
            element.studentInfo.role == 1
              ? "教务管理员"
              : element.studentInfo.role == 2
              ? "教师"
              : element.studentInfo.role == 3
              ? "学生"
              : "";
          courseItem.sex = element.studentInfo.sex == 1 ? "男" : "女";
          courseItem.editable = false;
          courseItem.birthday = element.studentInfo.birthday;
          courseItem.depart = element.studentInfo.depart;
          courseItem.email = element.studentInfo.email;
          courseItem.name = element.studentInfo.name;
          courseItem.phoneNumber = element.studentInfo.phoneNumber;
          courseItem.tustId = element.studentInfo.tustId;
          courseItem.score = element.score;
          courseItem.id = element.id;
          courseStudent.push(courseItem);
        });
        this.courseStudent = courseStudent;

        console.log("所有学生", res);
      });
    },
    getAllCourse() {
      this.$Request.getCourse().then(res => {
        this.courseData = res.result;
        console.log("所有课程", res);
      });
    },
    handleSelect(e, item) {
      console.log(`selected ${e}`, item);
      this.selectObject[item] = e;
      let newDataSource = this.allDataSource.filter(data => {
        return (
          data.class == this.selectObject.class &&
          data.course == this.selectObject.course
        );
      });
      console.log(`newDataSource`, newDataSource);
      this.dataSource = newDataSource;
    },

    handleSubmit(e) {
      e.preventDefault();
    },

    saveRow(key) {
      let target = this.courseStudent.filter(item => item.id === key)[0];
      target.editable = false;
      console.log("target", target);
      this.$Request
        .writeScore({
          id: target.id,
          score: target.score
        })
        .then(res => {
          if (res.code == "2001") {
            console.log("录入成绩", res);
            this.$message.success("录入成功");
          } else {
            console.log("录入失败", res);
            this.$message.error("录入失败");
          }
        });
    },
    toggle(key) {
      let target = this.courseStudent.filter(item => item.id === key)[0];
      console.log("key", key, target);
      target.editable = !target.editable;
    },
    getRowByKey(key, newData) {
      const data = this.courseStudent;
      return (newData || data).filter(item => item.key === key)[0];
    },
    cancle(key) {
      let target = this.courseStudent.filter(item => item.id === key)[0];
      target.editable = false;
    },
    handleChange(value, key, column) {
      const newData = [...this.courseStudent];
      const target = newData.filter(item => key === item.id)[0];
      if (target) {
        target[column] = value;
        this.courseStudent = newData;
      }
    }
  }
};
</script>

<style lang="less" scoped>
.search {
  margin-bottom: 54px;
}
.fold {
  width: calc(100% - 216px);
  display: inline-block;
}
.operator {
  margin-bottom: 18px;
}
@media screen and (max-width: 900px) {
  .fold {
    width: 100%;
  }
}
</style>
