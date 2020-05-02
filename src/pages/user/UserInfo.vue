<template>
  <div>
    <a-card style="margin-top: 24px" :bordered="false" title="个人信息">
      <a-form-model :model="form" :label-col="labelCol" :wrapper-col="wrapperCol">
        <a-form-model-item label="姓名">
          <a-input v-model="form.name" :disabled="disabled" />
        </a-form-model-item>
        <a-form-model-item label="学号">
          <a-input v-model="form.tustId" :disabled="disabled" />
        </a-form-model-item>
        <a-form-model-item label="角色">
          <a-input v-model="form.role" :disabled="disabled" />
        </a-form-model-item>
        <a-form-model-item label="学院">
          <a-input v-model="form.depart" :disabled="disabled" />
        </a-form-model-item>
        <a-form-model-item label="邮箱">
          <a-input v-model="form.email" :disabled="disabled" />
        </a-form-model-item>
        <a-form-model-item label="密码">
          <a-input v-model="form.password" :disabled="disabled" />
        </a-form-model-item>
        <a-form-model-item label="手机号">
          <a-input v-model="form.phoneNumber" :disabled="disabled" />
        </a-form-model-item>
        <a-form-model-item label="出生日期">
          <a-input v-model="form.birthday" :disabled="disabled" />
        </a-form-model-item>
        <a-form-model-item label="性别">
          <a-input v-model="form.sex" :disabled="disabled" />
        </a-form-model-item>
      </a-form-model>
    </a-card>
  </div>
</template>

<script>
const columns = [
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
    width: "7%",
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
    width: "15%",
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
    title: "密码",
    dataIndex: "password",
    key: "password",
    width: "10%",
    scopedSlots: { customRender: "password" }
  }
];

const dataSource = [
  {
    name: "小明",
    tustId: "001",
    editable: false,
    depart: "计算机学院",
    role: "管理员",
    phoneNumber: "13642144236",
    email: "mwt_luoyang@126.com",
    sex: "男",
    birthday: "2018-07-26",
    password: "123456"
  }
];

import moment from "moment";
export default {
  name: "list",
  data() {
    return {
      columns,
      disabled: true,
      dataSource,
      labelCol: { span: 6 },
      wrapperCol: { span: 10 },
      form: {
        name: "",
        sex: "",
        tustId: "",
        birthday: undefined,
        email: "",
        phoneNumber: "",
        depart: "",
        password: ""
      }
    };
  },
  components: {},
  mounted() {
    this.getPersionMessage();
  },
  methods: {
    getPersionMessage() {
      let userInfo = JSON.parse(localStorage.getItem("userInfo"));
      userInfo.sex = userInfo.sex == 1 ? '男' : '女'
      userInfo.role = userInfo.role == 1 ? '教务管理员' : (userInfo.role == 2 ? '教师' : '学生')
      userInfo.birthday = moment(userInfo.birthday).format("YYYY-MM-DD")
      console.log("个人信息", userInfo);
      this.form = userInfo;
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
