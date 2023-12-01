<template>
  <div id="he">
      <h3> 已注册医生信息列表</h3>


  <el-table
      :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
      :model="tableData"
      style="width: 100%">
      <el-table-column
        label="id"
        prop="id">
      </el-table-column>
      <el-table-column
        label="Name"
        prop="name">
      </el-table-column>
      <el-table-column
        label="Photo"
        prop="photo">
        <template slot-scope="scope">
          <img :src="scope.row.photo"/>
  </template>
      </el-table-column>
      <el-table-column
        label="age"
        prop="age">
      </el-table-column>
      <el-table-column
        label="个人简介"
        prop="introduction">
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
          <el-popover
          placement="left-start"
          title="科室职务信息"
          width="400"
          trigger="hover">
          <ul>
            <li>label1:{{label1}}</li>
          </ul>
          <ul>
            <li>label2:{{label2}}</li>
          </ul>
          <ul>
          <li>label3:{{label3}}</li>
        </ul>
          <el-button slot="reference" size="mini" ><span @mouseenter="handleEnter(scope.$index, scope.row)">更多详情</span></el-button>
        </el-popover>
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
          label="姓名"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="editForm.name"
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
          label="年龄"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="editForm.age"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
        label="个人简介"
        :label-width="formLabelWidth"
      >
        <el-input
          type="textarea"
          v-model="editForm.introduction"
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
  </div>
</template>
<script>

var _index // 定义一个全局变量，以获取行数据的行号
export default {
  data() {
    return {
      // 表格数据
      tableData: [],
      search: '',
      // header
      // formLabelAlign: {
      //   name: '',
      //   dishId: '',
      //   photo: '',
      //   price: ''
      // },
      //  编辑窗口
      editFormVisible: false, // 是否显示编辑窗口
      editForm: [],
      formLabelWidth: '120px',
      addLoading: false,
      addForm: [],
      pages: 0,
      num: 1, // 当前页
      allPages: '',
      pageSize: 5,
      total: 0 ,
      imgurl: '',
      tempUrl: '',
      fileList: [
        { name: '', url: '' }
      ],
      id:'',
      name:'',
      introduction:'',
      label1: '',
      label2: '',
      label3: ''
    }
  },
  mounted() {
    this.updated()
  },
  methods: {
// 自定义上传图片
    upLoad(file) {
      var nikename = sessionStorage.getItem('nikename')
      const formData = new FormData()
      formData.append('file',file.file)
      formData.append('nikeName',nikename)
      this.$axios({
        url: 'http://43.138.244.227:8080/addDishesPhoto',
        method: 'POST',
        Parameter: {
          photo: FormData,
          dishId: this.newForm.dishId
        }}).then(res => res.data)
      .then(data => {
        console.log(data)
        if(data.code === 200){
          this.imgurl = data.data[0]
        }
      })
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;
 
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },


    // 鼠标移入   //更多信息
    handleEnter(index, row) {
      if(row.label1==null) row.label1 = '暂无信息'
      if(row.label2==null) row.label2 = '暂无信息'
      if(row.label3==null) row.label3 = '暂无信息'
      this.label1 = row.label1
      this.label2 = row.label2
      this.label3 = row.label3
    },



    handleDelete(index, id) {
      console.log(id);
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // this.tableData.splice(index, 1)
        this.$axios.get('http://43.138.244.227:8080/deleteDoctor/' + id)
      .then((res) => {
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
        handleEdit(index,row) {
        this.editFormVisible = true;
        this.editForm = Object.assign({}, row);
        _index = index;
        // console.log(index)
        // console.log(_index)
      // 取到这一栏的值，也就是明白是在那一栏进行操作，从而将编辑后的数据存到表格中
        },
    // 保存编辑
    sumbitEditRow() {
      var editData = _index;
      this.tableData[editData].name = this.editForm.name;
      this.tableData[editData].id = this.editForm.id;
      this.tableData[editData].age = this.editForm.age;
      this.tableData[editData].introduction = this.editForm.introduction;
      this.editFormVisible = false;
    },
    // 新增
    add() {
      this.newFormVisible = true
    },
    // addDishes() {
    //   this.$axios.post('http://43.138.244.227:8080/addDishes', {
    //     dishId: this.newForm.dishId,
    //     name: this.newForm.name,
    //     price: this.newForm.price,
    //     photo:'',
    //     isDeleted:0
    //   }).then((res) => {
    //     if (res.data.code==200) {
    //       console.log(res);
    //       alert("添加成功！");
    //       console.log(this.formLabelAlign.dishId,this.formLabelAlign,this.formLabelAlign.price);
    //   }else if
    //   (res.data.code==400){
    //   alert("这个菜品已经存在了！")
    //   }
    //   }).catch((err) => {
    //   console.log(err);
    //   });
    //   },
      // 删除菜品
    //   deleteDish() {
    //     if(this.formLabelAlign.dishId==''){
    //        alert("菜品ID不能为空!")
    //       }
    //     else{
    //   this.$axios.get('http://43.138.244.227:8080/deleteDishes/'+this.formLabelAlign.dishId)
    //   .then((res) => {
    //       // if(res.data.code==200){
    //       // }
    //       // else 
    //       if(res.data.code==400)
    //       {
    //         alert("删除成功");
    //           this.updated();
    //       }
    //       else{
    //           alert("删除失败！")
    //       }
    //   })
    //   .catch((err) => {
    //       alert('请求数据库失败或菜名id输入错误，无法删除');
          
    //   })
    //   }
    // }, 
    // 刷新页面数据
    updated() {
      return this.$axios({
        url: 'http://43.138.244.227:8080/getDoctors',
        method: 'GET'
        // params: {
        //   pageNum: this.num, // 默认当前页
        //   pageSize: this.pageSize // 每页数据量
        // }
      }).then((res) => {
      if(res.data.code==200)
      {  
        console.log(res);

          this.tableData=res.data.data
          // this.pages=res.data.data.pages
          // this.total=res.data.data.total
      }else if
      (res.data.code==400){
      alert("这个菜品已经存在了！")
      }
      }).catch((err) => {
      console.log(err);
      });
      },

    cancel() {
      this.addFormVisible = false;
      this.newFormVisible = false;
      this.editFormVisible = false;
    },
    // 每页条数改变时触发 选择一页显示多少行
    handleSizeChange(val) {
      this.pageSize= 5 // 默认每页5条 
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
      .el-table{
      background-color: transparent !important;

      }
   
      .el-table /deep/ .cell{
        height: 50px;
  
      }
</style>