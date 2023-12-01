<template>
  <div id="he">
      <h3> 菜品信息</h3>
      <div style="margin:3vh; font-size:0.8rem">
        <el-form  label-width="5vw" :model="formLabelAlign">
          <el-input v-model="formLabelAlign.dishId" placeholder="填写ID号删除" style="width: 15vw;" class="filter-item" />
          <el-button type="danger" @click="deleteDish()"><i class="el-icon-delete"></i>&nbsp;&nbsp;删除菜品</el-button>
          <el-button type="primary" @click="add()"><i class="el-icon-edit">&nbsp;&nbsp;添加菜品</i></el-button>

        </el-form>
  </div>

  <el-table
      :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
      :model="tableData"
      style="width: 100%">
      <el-table-column
        label="dishId"
        prop="dishId">
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
        label="Price"
        prop="price">
      </el-table-column>
      <el-table-column align="right">
        <template slot="header" slot-scope="scope">
          <!-- <el-button type="primary" style="width:"><i class="el-icon-search"></i>&nbsp;&nbsp;搜索</el-button> -->
          <el-input
            style="width:80%"
            v-model="search"
            size="mini"
            placeholder="输入关键字搜索"/>
            <!-- <el-button type="primary" icon="el-icon-search" circle id="search"></el-button>  -->
        </template>
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row.dishId)">删除</el-button>
        </template>
      </el-table-column>
  </el-table>

<!-- 添加窗口 -->
<el-dialog
 title="添加"
:visible.sync="newFormVisible"
>
<el-form
  :model="newForm"
  ref="newForm"
>
  <el-form-item
    label="食谱菜名"
    :label-width="formLabelWidth"
  ><el-input
      v-model="newForm.name"
      autocomplete="off"
    ></el-input>
  </el-form-item>
  <el-form-item
    label="价格"
    :label-width="formLabelWidth"
  >
    <el-input
      v-model="newForm.price"
      autocomplete="off"
    ></el-input>
  </el-form-item>
  <el-form-item
    label="dishId"
    :label-width="formLabelWidth"
  >
    <el-input
      v-model="newForm.dishId"
      autocomplete="off"
    ></el-input>
  </el-form-item>
  <el-form-item
  label="上传图片"
  :label-width="formLabelWidth">
  <template>
    <el-alert
            title="温馨提示：点击即可修改图片，只允许上传.jpg格式"
            type="warning"
            :closable="false">
    </el-alert>
</template>
<el-upload
   class="avatar-uploader"
   action="123"
   :http-request="upLoad"
   :show-file-list="false"
   :on-success="handleAvatarSuccess"
   :before-upload="beforeAvatarUpload">
   <img :src="imgurl" alt="">
   <el-button size="small" type="primary">点击上传</el-button>
</el-upload>
</el-form-item>
</el-form>
<div>
<el-button @click="cancel()">取消</el-button>
 <el-button
    type="primary"
    v-on:click="addDishes()"
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
          label="ID"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="editForm.dishId"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="食谱菜名"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="editForm.name"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="价格"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="editForm.price"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <div>
      <el-button @click="cancel()">取消</el-button>
       <el-button
          type="primary"
          @click="sumbitEditRow()"
        >确定</el-button>
      </div>
     </el-dialog>
  <footer>
      <el-pagination align='center' 
        @size-change="handleSizeChange" 
        @current-change="handleCurrentChange"
        :current-page="num" 
        :page-sizes="[5,10]" 
        :page-size="pageSize"
        layout="total,sizes, prev, pager, next, jumper"
        :total= total>
      </el-pagination>
  </footer>
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
      formLabelAlign: {
        name: '',
        dishId: '',
        photo: '',
        price: ''
      },
      //  编辑窗口
      editFormVisible: false, // 是否显示编辑窗口
      editForm: [],
      formLabelWidth: '120px',
      addLoading: false,
      addForm: [],
      radio: 1,

      newFormVisible: false, // 是否显示编辑窗口
      newForm: [],
      pages: 0,
      num: 1, // 当前页
      allPages: '',
      pageSize: 5,
      total: 0 ,
      imageUrl: '',
      imgUrl: '',
      tempUrl: '',
      fileList: [
        { name: '', url: '' }
      ]
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
    handleDelete(index, dishId) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.tableData.splice(index, 1)
        this.$axios.get('http://43.138.244.227:8080/deleteDishes/'+dishId)
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
      this.tableData[editData].price = this.editForm.price;
      this.editFormVisible = false;
    },
    // 新增
    add() {
      this.newFormVisible = true
    },
    addDishes() {
      this.$axios.post('http://43.138.244.227:8080/addDishes', {
        dishId: this.newForm.dishId,
        name: this.newForm.name,
        price: this.newForm.price,
        photo:'',
        isDeleted:0
      }).then((res) => {
        if (res.data.code==200) {
          console.log(res);
          alert("添加成功！");
          console.log(this.formLabelAlign.dishId,this.formLabelAlign,this.formLabelAlign.price);
      }else if
      (res.data.code==400){
      alert("这个菜品已经存在了！")
      }
      }).catch((err) => {
      console.log(err);
      });
      },
      // 删除菜品
      deleteDish() {
        if(this.formLabelAlign.dishId==''){
           alert("菜品ID不能为空!")
          }
        else{
      this.$axios.get('http://43.138.244.227:8080/deleteDishes/'+this.formLabelAlign.dishId)
      .then((res) => {
          // if(res.data.code==200){
          // }
          // else 
          if(res.data.code==400)
          {
            alert("删除成功");
              this.updated();
          }
          else{
              alert("删除失败！")
          }
      })
      .catch((err) => {
          alert('请求数据库失败或菜名id输入错误，无法删除');
          
      })
      }
    }, 
    // 刷新页面数据
    updated() {
      return this.$axios({
        url: 'http://43.138.244.227:8080/getAlldishesPage',
        method: 'GET',
        params: {
          pageNum: this.num, // 默认当前页
          pageSize: this.pageSize // 每页数据量
        }
      }).then((res) => {
      if(res.data.code==200)
      {  
        console.log(res);
          this.tableData=res.data.data.records
          this.pages=res.data.data.pages
          this.total=res.data.data.total
      }else if
      (res.data.code==400){
      alert("err")
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
 /*     .el-button--primary{
        width: 6vw;
        font-size: 1rem;
      }
 .el-icon-edit:before {
    width: auto;
    height: auto;
    font-size: 0.1vw;
    margin-left: -2.9vw;
  }*/
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
        height: 80px;
        line-height:80px;
      }
      .avatar-uploader {
        margin-top: 20px;
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
        width: 178px;
        height: 178px;
    }

    .avatar-uploader:hover {
        border-color: #409EFF;
    }

    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }

    .avatar {
        width: 178px;
        height: 178px;
        display: flex;
    }
</style>