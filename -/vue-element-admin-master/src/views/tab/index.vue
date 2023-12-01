
<template>
  <div id="he">
      <h3> 老年人活动中心</h3>
  <div style="margin:3vh; font-size:0.8rem">
    <el-form  label-width="5vw" :model="formLabelAlign">
      <el-input v-model="formLabelAlign.name" placeholder="活动名称全称" style="width: 15vw;" class="filter-item" />
      <el-button style="margin:auto 15px" type="primary" @click="getAct()"><i class="el-icon-edit"></i>&nbsp;&nbsp;搜索活动</el-button>
      <el-link type="success" @click="returnBack">返回列表（back）</el-link>
      <el-input v-model="formLabelAlign.id" placeholder="活动ID号" style="width: 15vw;" class="filter-item" />
  <el-button style="margin:auto 15px" type="danger" @click="deleteAct()"><i class="el-icon-delete"></i>&nbsp;&nbsp;删除活动</el-button>
  <el-button type="primary" @click="add()" style="float:right" ><i class="el-icon-edit"></i>&nbsp;&nbsp;添加新活动</el-button>
    </el-form>
</div>
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
  label="时间"
  prop="time">
</el-table-column>
<el-table-column
  label="地点"
  prop="location">
</el-table-column>
<el-table-column
  label="活动人数"
  prop="peoplenumber">
</el-table-column>
<el-table-column
  label="vid"
  prop="vid">
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
 <!-- 新增用户窗口 -->
    <el-dialog
      title="添加"
      :visible.sync="newFormVisible"
    >
      <el-form
        :model="newForm"
        ref="newForm"
      >
        <el-form-item
          label="活动名称"
          :label-width="formLabelWidth"
        ><el-input
            v-model="newForm.name"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <!-- <el-form-item
          label="id"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="newForm.id"
            autocomplete="off"
          ></el-input>
        </el-form-item> -->
        <!-- <el-form-item
          label="vid"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="newForm.vid"
            autocomplete="off"
          ></el-input>
        </el-form-item> -->
        <el-form-item
          label="活动人数"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="newForm.peoplenumber"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="活动日期"
          :label-width="formLabelWidth"
        >
          <el-date-picker
            v-model="newForm.data"
            type="date"
            placeholder="选择日期"
            format="yyyy 年 MM 月 dd 日"
            value-format="yyyy-MM-DD"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item
          label="地址"
          :label-width="formLabelWidth"
        >
          <el-input
            type="textarea"
            v-model="newForm.address"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>

      <div>
      <el-button @click="cancel()">取消</el-button>
       <el-button
          type="primary"
          v-on:click="addAct()"
          :loading="addLoading"
        >确定</el-button>
      </div>
     </el-dialog>
        <!-- 编辑窗口 -->
     <el-dialog
     title="编辑"
     :visible.sync="editFormVisible"
   >
     <el-form
       :model="editForm"
       ref="editForm"
     >
       <el-form-item
         label="用户名"
         :label-width="formLabelWidth"
       ><el-input
           v-model="editForm.name"
           autocomplete="off"
         ></el-input>
       </el-form-item>
       <el-form-item
         label="vid"
         :label-width="formLabelWidth"
       >
         <el-input
           v-model="editForm.vid"
           placeholder="manager"
           autocomplete="off"
         ></el-input>
       </el-form-item>
       <el-form-item
         label="活动id"
         :label-width="formLabelWidth"
       >
         <el-input
           v-model="editForm.id"
           autocomplete="off"
         ></el-input>
       </el-form-item>
       <el-form-item
       label="活动人数"
       :label-width="formLabelWidth"
     >
       <el-input
         v-model="editForm.peoplenumber"
         autocomplete="off"
       ></el-input>
     </el-form-item>
       <el-form-item
         label="活动日期"
         :label-width="formLabelWidth"
       >
         <el-date-picker
           v-model="editForm.time"
           type="date"
           placeholder="选择日期"
           format="yyyy 年 MM 月 dd 日"
           value-format="yyyy-MM-DD"
         >
         </el-date-picker>
       </el-form-item>
       <el-form-item
         label="地址"
         :label-width="formLabelWidth"
       >
         <el-input
           type="textarea"
           v-model="editForm.location"
           autocomplete="off"
         ></el-input>
       </el-form-item>
     </el-form>
     <div>
     <el-button @click="cancel()">取消</el-button>
      <el-button
         type="primary"
         v-on:click="sumbitEditRow()"
         :loading="addLoading"
       >确定</el-button>
     </div>
    </el-dialog>
  <footer>
      <el-pagination
        @size-change="handleSizeChange" 
        @current-change="handleCurrentChange"
        :current-page="num" 
        :page-sizes="[5,10,20]" 
        :page-size="pageSize"
        layout="total,sizes, prev, pager, next, jumper"
        :total= total>
      </el-pagination>
  </footer>
  </div>
</template>
<script>
import moment from 'moment'
var _index // 定义一个全局变量，以获取行数据的行号
var olderClick = false;
var interFace;
var argument;
export default {
  data() {
    return {
      // 表格数据
      tableData: [],
      search: '',
      // header
      formLabelAlign: {
        name: '',
        id: '',
        peoplenumber:'',
        address:'',
        vid:''
      },
      //  编辑窗口
      editFormVisible: false, // 是否显示编辑窗口
      editForm: [],
      formLabelWidth: '120px',
      addLoading: false,
      radio: 1,
      // 新增窗口
      newFormVisible: false, // 是否显示编辑窗口
      newForm: [],

      username: '',
      birthday: '',
      phone: '',
      pages: 0,
      num: 1, // 当前页
      allPages: '',
      pageSize: 10,
      total: 0,
      time: '',
      height:'',
      sex:'',
      weight:'',
      heartRate:'',
      bloodPressure:''

    }
  },
  mounted() {
    this.updated()
  },
  methods: {
    // 刷新页面
    returnBack() {
      this.$router.go(0)
    },
    // 鼠标移入   //更多信息
    handleEnter(index, row) {
      if(row.height==null) row.height = '暂无信息'
      if(row.weight==null) row.weight = '暂无信息'
      if(row.heartRate==null) row.heartRate = '暂无信息'
      if(row.bloodPressure==null) row.bloodPressure = '暂无信息'
      if(row.sex==0) row.sex = '男';
      else row.sex = '女' 
      this.sex = row.sex
      this.height = row.height
      this.weight = row.weight
      this.heartRate = row.heartRate
      this.bloodPressure = row.bloodPressure

    },
    handleDelete(index, id) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // this.tableData.splice(index, 1)
        this.$axios.get('http://43.138.244.227:8080/deleteActivity?id=' + id).then((res) => {
          this.updated()
        })
        this.$message({
          type: 'success',
          message: '删除成功!',
        })
      }).catch((err) => {
        this.$message({
          type: 'error',
          message: err
        })
      })
        },
        handleEdit(index,row){
        this.editFormVisible = true;
        this.editForm = Object.assign({}, row);
        _index = index;

      // 取到这一栏的值，也就是明白是在那一栏进行操作，从而将编辑后的数据存到表格中
        },
    // 保存编辑
    sumbitEditRow() {
      var editData = _index
      this.tableData[editData].name = this.editForm.name;
      this.tableData[editData].id = this.editForm.id;
      this.tableData[editData].time = this.editForm.time;
      this.tableData[editData].location = this.editForm.location;
      this.tableData[editData].vid = this.editForm.vid;
      this.tableData[editData].peoplenumber = this.editForm.peoplenumber;
      this.editFormVisible = false
    },
    // 新增
    add() {
      this.newFormVisible = true;
    },
    addAct() {
      this.$axios({
        url: 'http://43.138.244.227:8080/addActivity',
        method: 'POST',
        Parameter: {
          name: this.newForm.name,
          peoplenumber: this.newForm.peoplenumber,
          location: this.newForm.address,
          time: this.newForm.data,
        }}).then((res) => { 
        if (res.data.code==201)
        { console.log(res);
      alert("添加成功！");
      }else if
      (res.data.code==400){
      alert("这个老人已经存在了！")
      }
      }).catch((err) => {
      console.log(err);
      alert('请求接口失败')
      this.newFormVisible = false
      });
    },
    getAct() { 
      olderClick = true
      if (this.formLabelAlign.name =='') {alert('搜索内容不能为空'); olderClick = false }
      this.updated()
    },
    // 删除
    deleteAct() {
      if (this.formLabelAlign.id=='') {
        alert("活动ID不能为空!")
      } else {
        this.$axios.get('http://43.138.244.227:8080/deleteActivity?id='+this.formLabelAlign.id)
          .then((res) => {
          if(res.data.code==200)
          {
            alert('删除成功');
              this.updated();
          }
          else{
              alert("删除失败或id不存在！")
          }
      })
      .catch((err) => {
          alert('请求数据库失败或id输入错误，无法删除');
      })
      }
    },
    // 刷新页面数据 //更新了用户名搜索
    updated() {
      console.log(olderClick)
      if (olderClick === false) {
        interFace = '/getActivityPage'
        argument = {
          pageNum: this.num,
          pageSize: this.pageSize
        }
      } else {
        interFace = '/getActivityByName'
        argument = {name: this.formLabelAlign.name}
      }
      return this.$axios({
        url: 'http://43.138.244.227:8080' + interFace,
        method: 'GET',
        params: argument
      }).then((res) => {
        // console.log(res);
        if (res.data.code== 200 || res.code==200) {
          if (olderClick === false) {
            this.tableData=res.data.data.records;
            this.pages=res.data.data.pages
            this.total=res.data.data.total
          } else {
            this.tableData = res.data.data
            olderClick = false
            console.log(this.tableData)
          }
          this.tableData.forEach((item) => {
            item.time = Number(item.time)
            item.time = moment(item.time).format(
              "YYYY-MM-DD"
            )
          })
        }
        if (res.data.code==400||res.status==404){
          alert('没有此活动')
          olderClick = false
        }
      }).catch((err) => {
        console.log(err)
        olderClick = false
        alert('没有此活动或信息更新失败！')
      })
    },
    cancel() {
      this.addFormVisible = false;
      this.editFormVisible = false;
      this.newFormVisible = false;
    },
    // 每页条数改变时触发 选择一页显示多少行
    handleSizeChange(val) {
      this.pageSize= 10 // 默认每页10条 
      console.log(`每页 ${val} 条`)
      this.pageSize = val
      this.updated();
     },
    // 当前页改变时触发 跳转其他页
     handleCurrentChange(val) {
        //  this.num= val;
         console.log(`当前页: ${val}`);
         this.num = val
         this.updated();

     }
    }
  }
</script>
<style scoped>
.el-table-column {
  overflow: scroll;
}
img{
  height: 80px;
  width: 100px;
}
 h3{
  margin: 2vw;
}
el-form>.el-button--medium{
margin-left:1vw ;
}
 #he{
  width: 100%;
 } 
      #btn{
      display: flex;
      justify-content: space-evenly;
      }
      #pages{
      width: 2vw;
      }
      footer{
      margin: 2vw;
      }
      .el-table{
      background-color: transparent !important;

      }
      .el-input--mini.el-input__inner{
        width: 70% !important;
      }
      .el-table /deep/ .cell{
        height: 25px;
        line-height:25px;
      }
</style>