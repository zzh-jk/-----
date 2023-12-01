<template>
  <div class="login-container root">

    <div class="wrap">
      <div class="wrap-box" style="top:10%">
        <div class="manager-box">
            <div class="sign-part" >
              <el-dialog
              title="志愿活动发布"
              style="width:100%"
              :visible.sync="newFormVisible"
              :before-close="handleClose"
            >
              <el-form
                :model="newForm"
                ref="newForm"
              >
                <el-form-item
                  label="志愿活动名称"
                  :label-width="formLabelWidth"
                >
                  <el-input
                    v-model="newForm.name"
                    autocomplete="off"
                  ></el-input>
                </el-form-item>
                <el-form-item
                label="需要报名人数"
                :label-width="formLabelWidth"
              >
                <el-input
                  v-model="newForm.need_num"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
              <el-form-item
              label="已报名人数"
              :label-width="formLabelWidth"
            >
              <el-input
                v-model="newForm.have_num"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item
            label="服务活动对象名称"
            :label-width="formLabelWidth"
          >
            <el-input
              v-model="newForm.act_name"
              autocomplete="off"
            ></el-input>
          </el-form-item>
                <el-form-item
                  label="活动描述"
                  type="textarea"
                  :label-width="formLabelWidth"
                >
                <el-input
                type="textarea"
                v-model="newForm.describes"
                autocomplete="off"
              ></el-input>
                </el-form-item>
                <el-form-item
                  label="活动日期"
                  :label-width="formLabelWidth"
                >
                  <el-date-picker
                    v-model="newForm.date"
                    type="date"
                    placeholder="选择日期"
                    format="yyyy 年 MM 月 dd 日"
                    value-format="yyyy-MM-DD"
                  >
                  </el-date-picker>
                </el-form-item>
                <el-form-item
                  label="志愿活动服务地点"
                  :label-width="formLabelWidth"
                >
                  <el-input
                    type="textarea"
                    v-model="newForm.address"
                    autocomplete="off"
                  ></el-input>
                </el-form-item>
              </el-form>
             </el-dialog>
            </div>
            <div class="login-part" >
              <div id="he">
                <h3>志愿者信息</h3>
              <el-table
                  :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
                  :model="tableData"
                  style="width: 100%">
                  <el-table-column
                  label="Id"
                  prop="id">
                </el-table-column>
                <el-table-column
                  label="活动名称"
                  prop="name">
                </el-table-column>
                <el-table-column
                  label="活动描述"
                  prop="describes">
                </el-table-column>
                <el-table-column
                  label="活动时间"
                  prop="date"
                  >
                </el-table-column>
                <el-table-column
                  label="需求人数"
                  prop="needNum"
                  >
                </el-table-column>
                <el-table-column
                  label="现有人数"
                  prop="haveNum"
                  >
                </el-table-column>
                  <el-table-column align="right">
                    <template slot="header" slot-scope="scope">
                      <el-input
                        style="width:80%"
                        v-model="search"
                        size="mini"
                        placeholder="输入关键字搜索"/>
                    </template>
                    <template slot-scope="scope">
                      <el-button
                        size="mini"
                        @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                      <el-button
                        size="mini"
                        type="danger"
                        @click="handleDelete(scope.$index, scope.row.id)">删除</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              <footer>
                  <el-pagination align='center' 
                    @size-change="handleSizeChange" 
                    @current-change="handleCurrentChange"
                    :current-page="this.num" 
                    :page-sizes="[5,10]" 
                    :page-size="pageSize"
                    :total="tableData.length"
                    layout="total,sizes, prev, pager, next, jumper"
                    >
                  </el-pagination>
              </footer>
              </div>
          </div>
        </div>
        <div class="box-content">
          <div class="sign">
              <button type="button" class="get-register" @click=" getRegister()" style="bottom: 2vh;position: absolute;">发布活动</button>
          </div>
          <div class="login">
              <button type="button" class="get-login" @click="getLogin()"  style="bottom: 2vh;position: absolute; right:5vw">详情</button>
          </div>
      </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import $ from 'jquery'
export default {
  name: 'Login',
  data() {
    return {
      tableData: [],
      search: '',
     // 新增窗口
     newFormVisible: true, // 是否显示编辑窗口
      newForm: [],
      formLabelWidth: '',
      releaseRecruit: '',
      need_num:'',
      have_num:'',
      act_name:'',
      describes:'',
      name:'',
      address:'',
      editFormVisible: false, // 是否显示编辑窗口
      editForm: [],
      // formLabelWidth: '120px',
      addLoading: false,


      pages: 0,
      num: 0, // 当前页
      pageSize: 6
    }
  },
  mounted() {
    this.updated()
  },
  methods: {
    updated() {
      return this.$axios({
        url: 'http://43.138.244.227:8080/showRecruitment',
        method: 'GET',
        params: {
          pageNum: this.num
        }}).then((res) => {
        if (res.data.code==200) { 
          this.tableData = res.data.data
          console.log(res.data.data)
          console.log(this.tableData)
          console.log(moment().format())
          this.tableData.forEach((item) => {
            // console.log(item.time);
            item.date = Number(item.date)
            item.date = moment(item.date).format(
              'YYYY-MM-DD'
            )
          })
        }}).catch((err) => {
        console.log(err);
      });
    },
    cancel() {
      this.newFormVisible = false;
    },
    handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
    },
    getRegister() {
      $('.manager-box').removeClass('right').addClass('left').removeClass('active')
      console.log('注册跳转')
    },
    getLogin() {
      console.log(this.newForm.address , this.newForm.name,this.newForm.need_num,this.newForm.have_num,this.newForm.act_name, this.newForm.describes);
      this.updated()
      console.log(this.newForm.address , this.newForm.name,this.newForm.need_num,this.newForm.have_num,this.newForm.act_name, this.newForm.describes);

      this.$axios({
        method:'POST',
        url :`http://43.138.244.227:8080/releaseRecruit`,
        data:{
          address: this.newForm.address,
          name: this.newForm.name,
          needNum: this.newForm.need_num,
          haveNum: this.newForm.have_num,
          actName: this.newForm.act_name,
          describes: this.newForm.describes
        }
      }).then((res) => {
        if (res.data.code==200)
        {
      alert("添加成功！");
      }else if
      (res.data.code==400||res.data.code==500){
      alert("失败！")
      }
      }).catch((err) => {
      console.log(err);
      });
      $('.manager-box').removeClass('left').addClass('right').addClass('active')
      console.log('登录跳转') 
      console.log(this.newForm.address ,this.newForm.name,this.newForm.need_num,this.newForm.have_num,this.newForm.act_name, this.newForm.describes);
    },
        // 每页条数改变时触发 选择一页显示多少行
        handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
      this.pageSize = val
      this.updated()
    },
    // 当前页改变时触发 跳转其他页
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
      this.num = val - 1
      this.updated()
    }
  }
}
</script>
<style scoped>
/* 最大屏 */
::v-deep .el-dialog{
  width: 100% !important;
  margin-top: 0vh !important;
  height: 110%;
}
  .root{
        background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
        background-size: 400% 400%;
        animation: gradient 5s ease ;
        height: 140vh;
    }
.back {
        background-size: contain;
        animation: gradient 15s ease infinite;
    }
    @keyframes gradient {
        0% {
            background-position: 0% 50%;
        }
        50% {
            background-position: 100% 50%;
        }
        100% {
            background-position: 0% 50%;
        }
    }
   .root,
    button,
    input,
    select,
    textarea {
        font-family: 'Microsoft YaHei', arial, SimSun, sans-serif, tahoma;
    }
    body {
        font-size: 14px;
        color: #666;
    }
    input,
    select,
    textarea {
        font-size: 100%;
    }
    table {
        border-collapse: collapse;
        border-spacing: 0;
    }
    textarea,
    input,
    button,
    a {
        outline: none;
    }
    button {
        cursor: pointer;
    }
    textarea {
        resize: none;
    }
    fieldset,
    img {
        border: 0;
    }
    address,
    cite,
    code,
    dfn,
    em,
    i,
    th,
    var {
        font-style: normal;
        font-weight: normal;
    }
    ol,
    ul {
        list-style: none;
    }
    caption,
    th {
        text-align: left;
    }
    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
        font-size: 100%;
        font-weight: normal;
    }
    sub,
    sup {
        font-size: 75%;
        line-height: 0;
        position: relative;
        vertical-align: baseline;
    }
    sup {
        top: -0.5em;
    }
    sub {
        bottom: -0.25em;
    }
    a {
        text-decoration: none;
    }
    .clearfix:before,
    .clearfix:after {
        content: "";
        display: table;
    }
    .clearfix:after {
        clear: both;
        overflow: hidden;
    }
    .clearfix {
        *zoom: 1;
    }
    .fl {
        float: left;
    }
    .fr {
        float: right;
    }
    .hidenone {
        display: none;
    }
    .hide {
        visibility: hidden;
    }
    .mt10 {
        margin-top: 10px;
    }
    .mt20 {
        margin-top: 20px;
    }
    .ml10 {
        margin-left: 10px;
    }
    .mr10 {
        margin-right: 10px;
    }
    .pt10 {
        padding-top: 10px;
    }
    .pt20 {
        padding-top: 20px;
    }
    .pl10 {
        padding-left: 10px;
    }
    .pr10 {
        padding-right: 10px;
    }
    .tc {
        text-align: center;
    }
    .vm {
        display: inline-block;
        vertical-align: middle;
    }
    *,
    *:after,
    *:before {
        box-sizing: border-box;
    }
    .wrap {
        margin: -25vw auto;
        height: 100%;
        background-size: cover;
    }
    .wrap:after {
        content: "";
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
        background: inherit;
        filter: blur(3px);
        z-index: 1;
    }
    .wrap-box {
        left: 12.5%;
        position: absolute;
        overflow: hidden;
        width: 75%;
        height: 75vh;
        background: rgba(0, 0, 0, .6);
        z-index: 2;
        box-shadow: 0 0 10px 1px rgba(169, 169, 169, .2);
        border-radius: 3px;
    }
    .box-content {
        display: inline-table;
        width: 100%;
        height: 100%;
    }
    .box-content .sign,
    .box-content .login {
        display: table-cell;
        width: 50%;
        vertical-align: middle;
        line-height: 36px;
    }
    .sign {
        padding-left: 50px;
    }
    .login {
        padding-left: 80px;
    }
    .box-content .title {
        color: #e8e8e8;
        font-size: 22px;
        letter-spacing: 1px;
    }
    .box-content .desc {
        color: #d3d3d3;
        font-size: 14px;
    }
    .box-content button {
        border-radius: 3px;
        border: solid 1px #d3d3d3;
        background-color: transparent;
        color: #d3d3d3;
        width: 124px;
        height: 38px;
        margin: 15px auto 0;
        font-size: 16px;
        transition: all .2s;
    }
    .box-content button:hover {
        border-color: #fff;
        color: #fff;
    }
    .manager-box {
        position: absolute;
        height: 85%;
        width: 90%;
        top: 3%;
        left: 5%;
        perspective: 800px;
        overflow: scroll;
    }
    .manager-box.right {
        animation: toRight .5s 1 forwards;
    }
    @keyframes toRight {
        0% {
            left: 5%;
        }
        66% {
            left: 5%;
        }
        100% {
            left: 5%;
        }
    }
    .manager-box.left {
        animation: toLeft .5s 1 forwards;
    }
    @keyframes toLeft {
        0% {
            left: 5%;
          }
        66% {
            left: 5%;
        }
        100% {
            left: 5%;
        }
    }
    .manager-box>* {
        position: absolute;
        z-index: 1;
        transition: all .8s linear;
        transform-style: preserve-3d;
        height: 100%;
        width: 100%;
        background: #fff;
        left: 0;
        border-radius: 3px;
        box-shadow: 0 0 15px 4px rgba(0, 0, 0, .1);
        display: inline-table;
    }
    .manager-box right active{
overflow: scroll;
    }
    .manager-box>*>div {
        display: table-cell;
        vertical-align: middle;
    }
    .manager-box .login-part {
      overflow: hidden;
        z-index: 0;
        transform: rotateY(-180deg);
    }
    .manager-box .sign-part {
        backface-visibility: hidden;
    }
    .manager-box.active .sign-part {
        transform: rotateY(180deg);
    }
    .manager-box.active .login-part {
        transform: rotateY(0deg);
    }
    .manager-box h3 {
        color: #f78c7b;
        font-size: 22px;
        margin-bottom: 30px;
    }
    .manager-box button {
        border-radius: 0;
        width: 50% !important;
        height: 2vh;
        float: right;
        color: #fff;
        background-color: #f78c7b;
        border: 0;
        font-size:0.8rem;
    }
    .manager-box button:hover {
        background: radial-gradient(circle at center, rgba(0, 0, 0, 0) 30%, #eeeeff 60%, #eeeeff 65%, rgba(0, 0, 0, 0) 70%) 53% 105% / 10px 10px, radial-gradient(circle at center, rgba(0, 0, 0, 0) 30%, #eeeeff 60%, #eeeeff 65%, rgba(0, 0, 0, 0) 70%) 16% 132% / 12px 12px, radial-gradient(circle at center, rgba(0, 0, 0, 0) 30%, #eeeeff 60%, #eeeeff 65%, rgba(0, 0, 0, 0) 70%) 56% 94% / 8px 8px, radial-gradient(circle at center, rgba(0, 0, 0, 0) 30%, #eeeeff 60%, #eeeeff 65%, rgba(0, 0, 0, 0) 70%) 42% 126% / 14px 14px, radial-gradient(circle at center, rgba(0, 0, 0, 0) 30%, #eeeeff 60%, #eeeeff 65%, rgba(0, 0, 0, 0) 70%) 11% 119% / 11px 11px, radial-gradient(circle at center, rgba(0, 0, 0, 0) 30%, #eeeeff 60%, #eeeeff 65%, rgba(0, 0, 0, 0) 70%) 69% 143% / 9px 9px, radial-gradient(circle at center, rgba(0, 0, 0, 0) 30%, #eeeeff 60%, #eeeeff 65%, rgba(0, 0, 0, 0) 70%) 107% 141% / 6px 6px, radial-gradient(circle at center, rgba(0, 0, 0, 0) 30%, #eeeeff 60%, #eeeeff 65%, rgba(0, 0, 0, 0) 70%) 51% 132% / 10px 10px, radial-gradient(circle at center, rgba(0, 0, 0, 0) 30%, #eeeeff 60%, #eeeeff 65%, rgba(0, 0, 0, 0) 70%) 20% 121% / 15px 15px, radial-gradient(circle at center, rgba(0, 0, 0, 0) 30%, #eeeeff 60%, #eeeeff 65%, rgba(0, 0, 0, 0) 70%) 68% 121% / 6px 6px, radial-gradient(circle at center, rgba(0, 0, 0, 0) 30%, #eeeeff 60%, #eeeeff 65%, rgba(0, 0, 0, 0) 70%) 22% 127% / 11px 11px;
        background-color: #e27b75;
        background-repeat: no-repeat;
        animation: bubbles .7s forwards ease-out;
        color: red;
    }
    @keyframes bubbles {
        100% {
            background-position: 48% -266%, 17% -396%, 58% -137%, 33% -360%, 21% -368%, 77% -137%, 114% -391%, 43% -2%, -1% -41%, 60% -207%, 27% -149%;
            box-shadow: inset 0 -60px 0 #c56868;
        }
    }
    .manager-box .buttons {
        margin-top: 40px;
        line-height: 39px;
    }
    .manager-box .buttons a {
        position: relative;
        color: #999;
    }
    .manager-box .buttons a:hover {
        color: #f78c7b;
    }
    * {
        margin: 0;
        padding: 0;
        border: 0;
        box-sizing: border-box;
    }
    .start-screen {
      color: #ccc;
        display: flex;
        justify-content: center;
        flex-flow: nowrap column;
        align-items: center;
        min-height: 30vh;
        margin: 0vw auto;
    }
    .loading {
        display: flex;
        margin: 1.6vw 0;
    }
    .loading__element {
        font: normal 100 2rem/1 Roboto;
        letter-spacing: .5em;
    }
    .start-screen [class*="el"] {
        animation: bouncing 5s infinite ease;
    }
    @keyframes bouncing {
        0%,
        100% {
            transform: scale3d(1, 1, 1);
        }
        50% {
            transform: scale3d(0, 0, 1);
        }
    }
    .img>img {
        width: 6vw;
        height: 6vw;
        margin-left: -9vw;
        margin-top: -2vw;
    }
</style>
