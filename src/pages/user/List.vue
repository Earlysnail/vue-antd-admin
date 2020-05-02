<template>
  <div>
    <a-card style="margin-top: 24px" :bordered="false" title="用户列表">
      <a-button @click="showModal" type="primary" style="margin-bottom:10px;">添加用户</a-button>
      <a-modal
        v-model="visible"
        title="添加用户"
        width="700px"
        ok-text="添加"
        cancel-text="取消"
        @ok="addUser"
        @cancel="onClose"
      >
        <a-form-model :model="form" :label-col="labelCol" :wrapper-col="wrapperCol">
          <a-form-model-item label="姓名">
            <a-input v-model="form.name" />
          </a-form-model-item>
          <a-form-model-item label="学号">
            <a-input v-model="form.tustId" />
          </a-form-model-item>
          <a-form-model-item label="角色">
            <a-select v-model="form.role" placeholder>
              <a-select-option value="1">管理员</a-select-option>
              <a-select-option value="2">教师</a-select-option>
              <a-select-option value="3">学生</a-select-option>
            </a-select>
          </a-form-model-item>
          <a-form-model-item label="学院">
            <a-input v-model="form.depart" />
          </a-form-model-item>
          <a-form-model-item label="邮箱">
            <a-input v-model="form.email" />
          </a-form-model-item>
          <a-form-model-item label="密码">
            <a-input v-model="form.password" />
          </a-form-model-item>
          <a-form-model-item label="手机号">
            <a-input v-model="form.phoneNumber" />
          </a-form-model-item>
          <a-form-model-item label="出生日期">
            <a-date-picker
              v-model="form.birthday"
              show-time
              type="date"
              placeholder="选择一个日期"
              style="width: 100%;"
            />
          </a-form-model-item>
          <a-form-model-item label="性别">
            <a-radio-group v-model="form.sex">
              <a-radio value="1">男</a-radio>
              <a-radio value="0">女</a-radio>
            </a-radio-group>
          </a-form-model-item>
        </a-form-model>
      </a-modal>
      <div slot="extra">
        <a-radio-group v-model="selectRole" @change="onChange">
          <a-radio-button value="0">全部</a-radio-button>
          <a-radio-button value="1">管理员</a-radio-button>
          <a-radio-button value="2">教师</a-radio-button>
          <a-radio-button value="3">学生</a-radio-button>
        </a-radio-group>
        <!-- <a-input-search v-model="selectItem" style="margin-left: 16px; width: 272px;" /> -->
      </div>

      <form :autoFormCreate="(form) => this.form = form">
        <a-table :columns="columns" :dataSource="dataSource" :pagination="false"></a-table>
      </form>
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
  }
];

import moment from "moment";
export default {
  name: "list",
  data() {
    return {
      columns,
      dataSource: [],
      visible: false,
      labelCol: { span: 4 },
      wrapperCol: { span: 18 },
      form: {
        name: "",
        sex: "",
        tustId: "",
        birthday: undefined,
        email: "",
        phoneNumber: "",
        depart: "",
        password: ""
      },
      selectRole: "0",
      allData: [],
      selectItem:''
    };
  },
  components: {},
  mounted() {
    this.getAllUser();
  },
  methods: {
    onClose() {
      this.visible = false;
    },
    getAllUser() {
      this.$Request.getUser().then(res => {
        console.log("所有用户", res);
        this.dataSource = res.result;
        this.allData = res.result;
      });
    },
    addUser() {
      let userInfo = this.form;
      userInfo.birthday = moment(userInfo.birthday).format("YYYY-MM-DD");
      console.log("添加用户", userInfo);
      this.$Request.register(userInfo).then(res => {
        if (res.code == "2001") {
          console.log("注册成功", res);
        } else {
          console.log("注册失败", res.msg);
        }
        this.visible = false;
        this.getAllUser();
      });
    },
    onChange(e) {
      console.log(`checked = ${e.target.value}`);
      let selectRole = e.target.value;
      let allData = this.allData;
      if (selectRole == "0") {
        this.dataSource = allData;
      } else {
        let selectData = allData.filter(item => {
          return item.role == selectRole;
        });
        this.dataSource = selectData;
      }
    },
    showModal() {
      this.visible = true;
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
