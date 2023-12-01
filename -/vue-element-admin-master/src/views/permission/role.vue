
<template>
  <div id="he">
      <h3> 志愿者信息列表</h3>
  <el-table
      :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
      :model="tableData"
      style="width: 100%">
      <el-table-column
      label="Id"
      prop="id">
    </el-table-column>
    <el-table-column
      label="名字"
      prop="name">
    </el-table-column>
    <el-table-column
      label="年龄"
      prop="age">
    </el-table-column>
    <el-table-column
      label="时间"
      prop="time"
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
          label="名字"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="editForm.name"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="age"
          :label-width="formLabelWidth"
        >
        <el-input
        v-model="editForm.age"
        autocomplete="off"
      ></el-input>
        </el-form-item>
        <el-form-item
          label="id"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="editForm.id"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="时间"
          :label-width="formLabelWidth"
        >
          <el-date-picker
            v-model="editForm.data"
            type="date"
            placeholder="选择日期"
            format="MM 月 dd 日"
            value-format="MM-dd"
          >
          </el-date-picker>
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
      <el-pagination align='center' 
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
        time: '',
        age: ''
      },
      //  编辑窗口
      editFormVisible: false, // 是否显示编辑窗口
      editForm: [],
      formLabelWidth: '120px',
      addLoading: false,
      radio: 1,

      pages: 0,
      num: 1, // 当前页
      allPages: '',
      pageSize: 20,
      total: 0
    }
  },
  mounted() {
    this.updated(); 
  },
  // this.tableData.dishId||this.tableData.name||this.tableData.price==''
  methods: {
    handleDelete(index, id) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // this.$axios.get('http://43.138.244.227:8080/deleteActivity?id=' + id).then((res) => {
        //   this.updated()
        //   this.tableData.splice(index, 1)
        // })
        // this.updated()
        this.tableData.splice(index, 1)
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
        },
    // 保存编辑
    sumbitEditRow() {
      var editData = _index;
      this.tableData[editData].name = this.editForm.name;
      this.tableData[editData].id = this.editForm.id;
      this.tableData[editData].time = this.editForm.data;
      this.tableData[editData].address = this.editForm.address;
      this.tableData[editData].vid = this.editForm.vid;
      this.editFormVisible = false;
    },
    addAct() {
      this.$axios({ 
        url: 'http://43.138.244.227:8080/addActivity',
        method:'POST',
        activity:{
        id: this.formLabelAlign.id,
        name: this.formLabelAlign.name,
        address: this.formLabelAlign.address,
        location: this.formLabelAlign.location,
        peoplenumber: this.formLabelAlign.peoplenumber,
        photo: '',
        time: this.formLabelAlign.time,
        vid: this.formLabelAlign.vid
      }}).then((res) => {
        if (res.data.code==201)
      {  console.log(res);
      alert("添加成功！");
      }else if
      (res.data.code==400){
      alert("这个志愿者已经存在了！")
      }
      }).catch((err) => {
      console.log(err);
      });
      },
      // 删除志愿者
      deleteAct(){
        if(this.formLabelAlign.id==''){
           alert("志愿者ID不能为空!")
          }
        else{
      this.$axios.get('http://43.138.244.227:8080/deleteActivity?id='+this.formLabelAlign.id)
      .then((res) => {
          // if(res.data.code==200){
          // }
          // else 
          if(res.data.code==200)
          {
            alert("删除成功");
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
    // 刷新页面数据
    updated() {
      return  this.$axios({
        url: 'http://43.138.244.227:8080/getVolunteerByPage',
        method: 'GET',
        params: {
          pageNum: this.num,
          pageSize:this.pageSize
        }}).then((res) => {
        if (res.data.code==200) { 
          this.tableData=res.data.data.records;
          this.pages=res.data.data.pages
          this.total=res.data.data.total
          console.log(res)
          console.log(moment().format())
          this.tableData.forEach((item) => {
            // console.log(item.time);
            item.time = Number(item.time)
            item.time = moment(item.time).format(
              "YYYY-MM-DD"
            )
          })
        }}).catch((err) => {
        console.log(err);
      });
    },
    cancel() {
      this.addFormVisible = false;
      this.editFormVisible = false;
    },
    // 每页条数改变时触发 选择一页显示多少行
    handleSizeChange(val) {
      this.pageSize= 5 // 默认每页5条 
      console.log(`每页 ${val} 条`)
      this.pageSize = val
      this.updated()
    },
    // 当前页改变时触发 跳转其他页
    handleCurrentChange(val) {
      //  this.num= val;
      console.log(`当前页: ${val}`)
      this.num = val
      this.updated()

    }
  }
}
</script>
<style scoped>
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