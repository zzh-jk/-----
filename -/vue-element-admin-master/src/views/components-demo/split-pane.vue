<h2>222222</h2>

<template>
  <div id="he">
      <h3> 老年痴呆症预测信息详情</h3><el-button type="primary" @click="pre()" style="float:right" ><i class="el-icon-edit"></i>&nbsp;&nbsp;输入预测</el-button>
  <el-table
      :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
      :model="tableData"
      style="width: 100% align:center">
    <el-table-column
      label="group1"
      prop="group1">
    </el-table-column>
    <el-table-column
      label="就诊次数"
      prop="visit">
    </el-table-column>
    <el-table-column
      label="MR指标"
      prop="mrBDelay">
    </el-table-column>
    <el-table-column
      label="受教育（年限）"
      prop="educ">
    </el-table-column>
    <el-table-column
      label="社会经济地位"
      prop="ses">
    </el-table-column>
    <el-table-column
      label="小型精神状态检查"
      prop="mmse">
    </el-table-column>
    <el-table-column
      label="临床痴呆症评分"
      prop="cdr">
    </el-table-column>
    <el-table-column
      label="阿特拉斯缩放系数 "
      prop="asf">
    </el-table-column>
    <el-table-column
      label="年龄"
      prop="age">
    </el-table-column>
    <el-table-column
      label="估计总颅内容积"
      prop="etiv">
    </el-table-column>
    <el-table-column
      label="归一化全脑容积"
      prop="nwbv">
    </el-table-column>
    <el-table-column
      label="mf(蕈样霉菌病检查)"
      prop="mf">
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
     label="就诊次数"
     :label-width="formLabelWidth"
   ><el-input
       v-model="newForm.visit"
       autocomplete="off"
     ></el-input>
   </el-form-item>
   <el-form-item
     label="MR指标"
     :label-width="formLabelWidth"
   >
     <el-input
       v-model="newForm.mrBDelay"
       autocomplete="off"
     ></el-input>
   </el-form-item>
   <el-form-item
     label="受教育（年限）"
     :label-width="formLabelWidth"
   >
     <el-input
       v-model="newForm.educ"
       autocomplete="off"
     ></el-input>
   </el-form-item>
   <el-form-item
     label="社会经济地位"
     :label-width="formLabelWidth"
   >
     <el-input
       v-model="newForm.ses"
       autocomplete="off"
     ></el-input>
   </el-form-item>
   <el-form-item
     label="小型精神状态检查"
     :label-width="formLabelWidth"
   >
     <el-input
       v-model="newForm.mmse"
       autocomplete="off"
     ></el-input>
   </el-form-item>
   <el-form-item
     label="临床痴呆症评分"
     :label-width="formLabelWidth"
   >
     <el-input
       v-model="newForm.cdr"
       autocomplete="off"
     ></el-input>
   </el-form-item>
   <el-form-item
     label="阿特拉斯缩放系数"
     :label-width="formLabelWidth"
   >
     <el-input
       v-model="newForm.asf"
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
   <el-form-item
     label="估计总颅内容积"
     :label-width="formLabelWidth"
   >
     <el-input
       v-model="newForm.etiv"
       autocomplete="off"
     ></el-input>
   </el-form-item>
   <el-form-item
     label="归一化全脑容积"
     :label-width="formLabelWidth"
   >
     <el-input
       v-model="newForm.nwbv"
       autocomplete="off"
     ></el-input>
   </el-form-item>
   <el-form-item
     label="mf"
     :label-width="formLabelWidth"
   >
     <el-input
       v-model="newForm.mf"
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
     title="老年痴呆预测"
     :visible.sync="editFormVisible"
     @open="open()"
   >
   <div>
    <div id="float"><h2>预测关键词:</h2></div>
    <div id="chart-container"></div>
    <div class="sick"><h3>疾病预测:<span id="sick"> {{this.sick}}</span></h3></div>
   </div>
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
import * as echarts from 'echarts'
import 'echarts-wordcloud'
export default {
  data() {
    return {
      // 表格数据
      tableData: [],
      search: '',
      // header
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
      height:'',
      sex:'',
      weight:'',
      heartRate:'',
      bloodPressure:'',
      sick:'',
      token:'',
      Visit:'',
      MR_b_Delay:'',
      M_F:'',
      Age:'',
      EDUC:'',
      MMSE:'',
      SES:'',
      CDR:'',
      eTIV:'',
      nWBV:'',
      ASF:'',
      include_req:'',
      // data1:''
      visit: '' ,
      mrBDelay:'',
      mf:'',
      age:'',
      educ:'',
      ses:'',
      mmse:'',
      cdr:'',
      etiv:'',
      nwbv:'',
      asf:''
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
    this.updated(),
    this.getToken()
  },
  methods: {
    addPre() {
            this.visit=this.newForm.visit
			      this.mrBDelay= this.newForm.mrBDelay
			      this.mf= this.newForm.mf
			      this.age= this.newForm.age
            this.educ=this.newForm.educ
            this.ses= this.newForm.ses
            this.mmse= this.newForm.mmse
            this.cdr= this.newForm.cdr
            this.etiv= this.newForm.etiv
            this.nwbv= this.newForm.nwbv
            this.asf= this.newForm.asf
      this.$axios({
        url: 'https://aip.baidubce.com/rpc/2.0/ai_custom/v1/table_infer/lncdv1?access_token='+this.token,
        method: 'post',
        data: JSON.stringify({
	         include_req: false,
	         data: [{
	          Visit: this.newForm.visit,
			      MR_b_Delay: this.newForm.mrBDelay,
			      M_F: this.newForm.mf,
			      Age: this.newForm.age,
			      EDUC: this.newForm.educ,
            SES: this.newForm.ses,
            MMSE: this.newForm.mmse,
            CDR: this.newForm.cdr,
            eTIV: this.newForm.etiv,
            nWBV: this.newForm.nwbv,
            ASF: this.newForm.asf
          }]
        })
      }).then((res) => {
        console.log(res);
        console.log(this.newForm);
        if (res.status== 200) {
          this.sick=res.data.batch_result[0].Group
            if(this.sick=='Nondemented')
           { 
            this.sick='没有患病风险';
          }
            if(this.sick=='Demented')
            this.sick='存在患病风险';
            if(this.sick=='Converted')
            this.sick='未来有老年痴呆的风险';
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
        this.chart = echarts.init(document.getElementById('chart-container'));
        var keywords = [];
        const content = [ 'Visit:'+this.visit, 'MR指标:'+this.mrBDelay,'MF:'+this.mf,'年龄:'+this.age,'受教育（年限）'+this.apHi,'舒张压'+this.apLo,'胆固醇:'+this.educ,'社会经济地位:'+this.ses,'小型精神状态检查:'+this.mmse,'临床痴呆症评分:'+this.cdr,'估计总颅内容积:'+this.etiv,'归一化全脑容积:'+this.nwbv,'阿特拉斯缩放系数:'+this.asf]
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
        url: 'http://43.138.244.227:8080/getAccTokenSenile',
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
	          this.visit= row.visit,
			      this.mrBDelay = row.mrBDelay,
			      this.mf= row.mf,
			      this.age= row.age,
            this.educ= row.educ,
            this.ses= row.ses,
            this.mmse= row.mmse,
            this.cdr= row.cdr,
            this.etiv= row.etiv,
            this.nwbv= row.nwbv,
            this.asf = row.asf
      this.$axios({
        url: 'https://aip.baidubce.com/rpc/2.0/ai_custom/v1/table_infer/lncdv1?access_token='+this.token,
        method: 'post',
        data: JSON.stringify({
	         include_req: false,
	         data: [{
	          Visit: row.visit,
			      MR_b_Delay: row.mrBDelay,
			      M_F: row.mf,
			      Age: row.age,
            EDUC: row.educ,
            SES: row.ses,
            MMSE: row.mmse,
            CDR: row.cdr,
            eTIV: row.etiv,
            nWBV: row.nwbv,
            ASF: row.asf
          }]
        })
      }).then((res) => {
        console.log(res);
        if (res.status== 200) {
          this.sick=res.data.batch_result[0].Group
            if(this.sick=='Nondemented')
           { 
            this.sick='没有患病风险';
          }
            if(this.sick=='Demented')
            this.sick='存在患病风险';
            if(this.sick=='Converted')
            this.sick='未来有老年痴呆的风险';
            this.newFormVisible = false
            this.editFormVisible = true
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
      this.sick='';
      this.editFormVisible = false
    },
    updated() {
      return this.$axios({
        url: 'http://43.138.244.227:8080/getSenile',
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
          this.tableData.forEach((item) => {
            if(item.group1=='Nondemented')
           { 
            item.group1='没有患病风险';
          }
            if(item.group1=='Demented')
            item.group1='存在患病风险';
            if(item.group1=='Converted')
            item.group1='未来有老年痴呆的风险';

          })
        }
      }).catch((err) => {
        console.log(err)

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
      this.pageSize= 10 // 默认每页10条 
      console.log(`每页 ${val} 条`)
      this.pageSize = val
      this.updated();
    },
    handleCurrentChange(val) {
      //  this.num= val;
      console.log(`当前页: ${val}`);
      this.num = val
      this.updated()
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
