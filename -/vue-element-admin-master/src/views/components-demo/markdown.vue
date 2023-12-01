<h2>222222</h2>

<template>
  <div id="he">
      <h3> 糖尿病预测信息详情</h3> <el-button type="primary" @click="pre()" style="float:right" ><i class="el-icon-edit"></i>&nbsp;&nbsp;输入预测</el-button>

  <el-table
      :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
      :model="tableData"
      style="width: 100% align:center">
    <el-table-column
      label="怀孕次数"
      prop="pregnancies">
    </el-table-column>
    <el-table-column
      label="血糖"
      prop="glucose">
    </el-table-column>
    <el-table-column
      label="血压"
      prop="bloodpressure">
    </el-table-column>
    <el-table-column
      label="皮肤褶皱度"
      prop="skinthickness">
    </el-table-column>
    <el-table-column
      label="胰岛素"
      prop="insulin">
    </el-table-column>
    <el-table-column
      label="BMI"
      prop="bmi">
    </el-table-column>
    <el-table-column
      label="糖尿病遗传因子"
      prop="diabetespedigreefunction">
    </el-table-column>
    <el-table-column
      label="年龄"
      prop="age">
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
            @click="handleEdit(scope.$index, scope.row)">预测</el-button>
        </template>
      </el-table-column>
  </el-table>

   <!-- 新增用户窗口 -->

 <el-dialog
 title="手动输入预测"
 :visible.sync="newFormVisible"
>
 <el-form
   :model="newForm"
   ref="newForm"
 >
   <el-form-item
     label="怀孕次数"
     :label-width="formLabelWidth"
   ><el-input
       v-model="newForm.pregnancies"
       autocomplete="off"
     ></el-input>
   </el-form-item>
   <el-form-item
     label="血糖"
     :label-width="formLabelWidth"
   >
     <el-input
       v-model="newForm.glucose"
       autocomplete="off"
     ></el-input>
   </el-form-item>
   <el-form-item
     label="血压"
     :label-width="formLabelWidth"
   >
     <el-input
       v-model="newForm.bloodpressure"
       autocomplete="off"
     ></el-input>
   </el-form-item>
   <el-form-item
     label="皮肤褶皱度"
     :label-width="formLabelWidth"
   >
     <el-input
       v-model="newForm.skinthickness"
       autocomplete="off"
     ></el-input>
   </el-form-item>
   <el-form-item
     label="胰岛素"
     :label-width="formLabelWidth"
   >
     <el-input
       v-model="newForm.insulin"
       autocomplete="off"
     ></el-input>
   </el-form-item>
   <el-form-item
     label="BMI"
     :label-width="formLabelWidth"
   >
     <el-input
       v-model="newForm.bmi"
       autocomplete="off"
     ></el-input>
   </el-form-item>
   <el-form-item
     label="糖尿病遗传因子"
     :label-width="formLabelWidth"
   >
     <el-input
       v-model="newForm.diabetespedigreefunction"
       autocomplete="off"
     ></el-input>
   </el-form-item>
   <el-form-item
     label="年龄"
     :label-width="formLabelWidth"
   >
     <el-input
       v-model="newForm.age"
       autocomplete="off"
     ></el-input>
   </el-form-item>
 </el-form>

 <div>
 <el-button @click="cancel()">取消</el-button>
  <el-button
     type="primary"
     v-on:click="addPre()"
   >确定</el-button>
 </div>
</el-dialog>

        <!-- 编辑窗口 -->
        <el-dialog
        title="糖尿病预测"
        :visible.sync="editFormVisible"
        @open="open()"
      >
      <div>

       <div id="float"><h2>预测关键词:</h2></div>
       <div id="chart-container"></div>
       <div class="sick"><h3>疾病预测:<span id="sick"> {{this.sick}}</span></h3></div>

      </div>
        <div  style="display: flex;justify-content: space-around; margin-top:10px">
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

import * as echarts from 'echarts'
import 'echarts-wordcloud'
export default {
  data() {
    return {
      // 表格数据
      tableData: [],
      search: '',
 
      //  编辑窗口
      editFormVisible: false, // 是否显示编辑窗口
      editForm: [],
      formLabelWidth: '120px',
      addLoading: false,
  
      newFormVisible: false, // 是否显示编辑窗口
      newForm: [],

      chart: null,

      pages: 0,
      num: 1, // 当前页
      allPages: '',
      pageSize: 15,
      total: 0,
      pregnancies:'',
      glucose:'',
      bloodpressure:'',
      skinthickness:'',
      insulin:'',
      bmi:'',
      diabetespedigreefunction:'',
      age:'',
      sick:'',
      token:''
    }
  },
  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    this.chart.dispose();
    this.chart = null;
  },
  mounted() {
    this.updated()
    this.getToken()
  },
  methods: {
    addPre() {
            this.pregnancies=this.newForm.pregnancies
			      this.glucose= this.newForm.glucose
			      this.bloodpressure= this.newForm.bloodpressure
			      this.insulin= this.newForm.insulin
            this.skinthickness=this.newForm.skinthickness
            this.bmi= this.newForm.bmi
            this.diabetespedigreefunction=this.newForm.diabetespedigreefunction
            this.age= this.newForm.age
      this.$axios({
        url: 'https://aip.baidubce.com/rpc/2.0/ai_custom/v1/table_infer/older_tnb?access_token='+this.token,
        method: 'post',
        data: JSON.stringify({
	         include_req: false,
	         data: [{
	          Pregnancies: this.newForm.pregnancies,
			      Glucose: this.newForm.glucose,
			      BloodPressure: this.newForm.bloodpressure,
			      Insulin: this.newForm.insulin,
            SkinThickness: this.newForm.skinthickness,
            BMI: this.newForm.bmi,
            DiabetesPedigreeFunction: this.newForm.diabetespedigreefunction,
            Age: this.newForm.age
          }]
        })
      }).then((res) => {
        console.log(res);
        if (res.status== 200) {
          this.sick=res.data.batch_result[0].Outcome
            if(this.sick==1)
           { 
            this.sick='患有糖尿病';
          }
            if(this.sick==0)
            this.sick='没有患糖尿病';

            this.newFormVisible = false
            this.editFormVisible = true
        }
      }).catch((err) => {
        console.log(err)
        this.newFormVisible = false
      })
    },


       // 新增
       pre() {
      this.newFormVisible = true;
    },
    initChart() {
        this.chart = echarts.init(document.getElementById('chart-container'))
        var keywords = [];
        const content = [ '怀孕次数:'+this.pregnancies, '血糖:'+this.glucose,'血压:' + this.bloodpressure,'皮肤褶皱度:'+this.skinthickness,'胰岛素'+this.insulin,'BMI'+this.bmi,'糖尿病遗传因子:'+this.diabetespedigreefunction,'年龄:'+this.age]
        for (let index = 0; index < 11; index++) {
          keywords.push({
            name: content[index],
            value: index,
          });
        }
        var option = {
          series: [
          {
            type: "wordCloud",
            sizeRange: [8, 40],
            rotationRange: [0, 90],
            rotationStep: 90,
            gridSize: 10,
            shape: "diamond",
            width: "75%",
            height: "50%",
            drawOutOfBound: false,
            textStyle: {
              color: function() {
                return (
                  'rgb(' +
                  [
                    Math.round(Math.random() * 160),
                    Math.round(Math.random() * 160),
                    Math.round(Math.random() * 160),
                  ].join(',') +
                  ')'
                );
              },
            },
            emphasis: {
              textStyle: {
                shadowBlur: 10,
                shadowColor: '#333',
                color: 'red',
              },
            },
            data: keywords
          },
        ],
        };
        this.chart.setOption(option);
    },
    open() {
      this.$nextTick(() => {
        //  执行echarts方法
        this.initChart()
      })
    },

getToken(){
      this.$axios({
        url: 'http://43.138.244.227:8080/getAccTokenDiabetes',
        method: 'GET' }).then((res)=> {
        if (res.data.code == 200 || res.code==200) {
          this.token = res.data.data.access_token
          console.log(this.token);
          console.log(res);
        }
      }).catch((err) => {
        console.log(err)
      })
},
    handleEdit(index,row) {
      this.editFormVisible = true;
	          this.pregnancies= row.pregnancies,
			      this.glucose = row.glucose,
			      this.bloodpressure= row.bloodpressure,
			      this.insulin= row.insulin,
            this.skinthickness= row.skinthickness,
            this.bmi= row.bmi,
            this.diabetespedigreefunction= row.diabetespedigreefunction,
            this.age= row.age,
      this.$axios({
        url: 'https://aip.baidubce.com/rpc/2.0/ai_custom/v1/table_infer/older_tnb?access_token='+this.token,
        method: 'post',
        data: JSON.stringify({
	         include_req: false,
	         data: [{
	          Pregnancies: row.pregnancies,
			      Glucose: row.glucose,
			      BloodPressure: row.bloodpressure,
			      SkinThickness: row.skinthickness,
            Insulin: row.insulin,
            BMI: row.bmi,
            DiabetesPedigreeFunction: row.diabetespedigreefunction,
            Age: row.age
          }]
        })
      }).then((res) => {
        console.log(res);
        if (res.status== 200) {
          this.sick=res.data.batch_result[0].Outcome
            if(this.sick==1)
           { 
            this.sick='患有糖尿病';
          }
            if(this.sick==0)
            this.sick='没有患糖尿病';
        }
      }).catch((err) => {
        console.log(err)
      })
      // this.editForm = Object.assign({}, row);
      // _index = index;

    // 取到这一栏的值，也就是明白是在那一栏进行操作，从而将编辑后的数据存到表格中
    },
    // 保存编辑
    sumbitEditRow() {
      this.sick = ''
      this.editFormVisible = false
    },
    // 新增
    updated() {
      return this.$axios({
        url: 'http://43.138.244.227:8080/getDiabetes',
        method: 'GET',
        params: {
          pageNumber: this.num,
          pageSize: this.pageSize}
      }).then((res) => {
        if (res.data.code== 200 || res.code==200) {
          this.tableData=res.data.data.records;
          this.pages=res.data.data.pages
          this.total=res.data.data.total
          console.log(this.tableData);
        }
      }).catch((err) => {
        console.log(err)
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

#chart-container {
  height: 500px;
  width: 100%;

  box-shadow: 0 0 2px 2px rgba(0, 0, 0, .2);
}
.sick{
  position: absolute;
  bottom: 80px;
  left: 25%;
}
#sick{
  font-size: 26px;
  color: skyblue;
}
#sick:hover{
  color: red;
}
#float{
  position: absolute;
  top: 100px;
  left: 50px;
  color: skyblue;
}

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
