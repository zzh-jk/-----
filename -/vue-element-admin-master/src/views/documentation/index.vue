
<template>
  <div id="he">
      <h3> 用户列表详情</h3>
      <div style="margin:3vh; font-size:0.8rem">
        <el-form  label-width="5vw" :model="formLabelAlign">
          <el-input v-model="formLabelAlign.name" placeholder="老人账号" style="width: 15vw;" class="filter-item" />
          <el-button type="primary" @click="getList()" style="margin:auto 15px "><i class="el-icon-edit"></i>&nbsp;&nbsp;搜索</el-button>
          <el-link type="success" @click="returnBack">返回列表（back）</el-link>
        </el-form>
  </div>
  <el-table
      :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
      :model="tableData"
      style="width: 100% align:center">
    <el-table-column
      label="ID"
      prop="id">
    </el-table-column>

    <el-table-column
      label="物品"
      prop="goods">
    </el-table-column>
    <el-table-column
      label="数量"
      prop="count">
    </el-table-column>
    <el-table-column
      label="希望价格(￥)"
      prop="idealPrice">
    </el-table-column>
    <el-table-column
      label="实际价格(￥)"
      prop="practicalPrice">
    </el-table-column>
    <el-table-column
      label="支付状态"
      prop="state">
    </el-table-column>
    <el-table-column
      label="时间"
      prop="time">
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
            @click="handleEdit(scope.$index, scope.row)">支付状态编辑</el-button>
          <!-- <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row.id)">删除</el-button> -->
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
          label="用户名"
          :label-width="formLabelWidth"
        ><el-input
            v-model="newForm.username"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="电话"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="newForm.phone"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="账号"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="newForm.account"
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
          @click="addOlder()"
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
       ref="newForm"
     >
       <el-form-item
         label="ID"
         :label-width="formLabelWidth"
       ><el-input
           v-model="editForm.id"
           autocomplete="off"
         ></el-input>
       </el-form-item>
       <el-form-item
         label="支付状态(已下单/已付款/已购买)"
         :label-width="formLabelWidth"
       >
         <el-input
           v-model="editForm.state"
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
         :page-size="2"
        layout="total,sizes, prev, pager, next, jumper"
     >
      </el-pagination>
  </footer>
  </div>
</template>
<script>
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
      state: '',
      //  编辑窗口
      editFormVisible: false, // 是否显示编辑窗口
      editForm: [],
      formLabelWidth: '120px',
      addLoading: false,
      // 新增窗口
      newFormVisible: false, // 是否显示编辑窗口
      newForm: [],

      num: 1, // 当前页
      pageNum:'',
      pageSize:'',
      total: 0,
      time: '',
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

    handleDelete(index, id) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
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
        },
    // 保存编辑
    sumbitEditRow() {
      console.log(this.state)
      var editData = _index
      if (this.editForm.state === '已下单') this.state = 0
      else if (this.editForm.state === '已付款') this.state = 1
      else if (this.editForm.state === '已购买') this.state = 2
      else {
        this.editForm.state = this.tableData[editData].state
      }
      this.tableData[editData].id = this.editForm.id
      this.tableData[editData].state = this.editForm.state
      this.editFormVisible = false;
      this.$axios({
        url: 'http://43.138.244.227:8080/updateGoogsState',
        method: 'GET',
        params: {
          id: this.editForm.id,
          state: this.state
        }}).then((res) => {
        console.log(res)
        if (res.data.code==200) {
          console.log(res)
          this.$message({
            type: 'success',
            message: '修改成功!' + 'ID为' + this.editForm.id + ' 的用户目前支付状态：' + this.editForm.state,
          })
        } else if (res.data.code==440) {
          this.$message({
            type: 'error',
            message: res.data.msg
          })
        }
      }).catch((err) => {
        console.log(err)
        this.$message({
            type: 'error',
            message:'请按规定填写哦！'
          })
      })
    },
    // 新增
    add() {
      this.newFormVisible = true
    },
    getList() {
      olderClick = true
      if (this.formLabelAlign.name === '') { alert('搜索内容不能为空'); olderClick = false }
      this.updated()
    },
    // 刷新页面数据 //更新了用户名搜索
    updated() {
      console.log(olderClick)
      if (olderClick === false) {
        interFace = '/getAllShoppingList'
        argument = {
          pageNum: this.num
        }
      } else {
        interFace = '/getListByName'
        console.log(1)
        argument = {olderName: this.formLabelAlign.name}
      }
      return this.$axios({
        url: 'http://43.138.244.227:8080' + interFace,
        method: 'GET',
        params: argument
      }).then((res) => {
        if (res.data.code== 200 || res.code==200) {
          if (olderClick === false) {
            console.log(res);
            this.tableData=res.data.data
            this.pages=res.data.data.pages
            this.total=res.data.data.length
          } else {
            this.tableData = res.data.data
            console.log(this.tableData)
            olderClick = false
          }
          this.tableData.forEach((item) => {
            item.state = Number(item.state)
            // if (item.state==0) item.state = '已下单'
            // if (item.state==1) item.state = '已付款'
            // if (item.state==2) item.state = '已购买'



            // item.practicalPrice = Number(item.practicalPrice)
            if (item.practicalPrice === null) item.practicalPrice = '暂无'
            // item.idealPrice = Number(item.idealPrice)
            if (item.idealPrice === null) item.idealPrice = '暂无'
          })
        }
      }).catch((err) => {
        console.log(err)
        olderClick = false
        alert('信息更新失败！')
      })
    },
    cancel() {
      this.addFormVisible = false;
      this.editFormVisible = false;
      this.newFormVisible = false;
    },
    // 每页条数改变时触发 选择一页显示多少行
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
      this.pageSize = val
      this.updated()
    },
    // 当前页改变时触发 跳转其他页
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.num = val
      console.log(this.num)
      this.updated()
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