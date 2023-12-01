<h2>222222</h2>

<template>
  <div id="he">
      <h3> 老年人活动推荐</h3> <el-button type="primary" @click="pre()" style="float:right" ><i class="el-icon-edit"></i>&nbsp;&nbsp;输入预测</el-button>
  <el-table
      :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
      :model="tableData"
      style="width: 100% align:center">
    <el-table-column
      label="身高"
      prop="hieght">
    </el-table-column>
    <el-table-column
      label="体重"
      prop="weight">
    </el-table-column>
    <el-table-column
      label="活动时长"
      prop="activityTime">
    </el-table-column>
    <el-table-column
      label="活动喜好地点数"
      prop="favoriteLocation">
    </el-table-column>
    <el-table-column
      label="活动类型种类"
      prop="recentActivityType">
    </el-table-column>
    <el-table-column
      label="健康评价"
      prop="healthAssessment">
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
     label="身高(cm)"
     :label-width="formLabelWidth"
   ><el-input
       v-model="newForm.hieght"
       autocomplete="off"
     ></el-input>
   </el-form-item>
   <el-form-item
     label="体重(kg)"
     :label-width="formLabelWidth"
   >
     <el-input
       v-model="newForm.weight"
       autocomplete="off"
     ></el-input>
   </el-form-item>
   <el-form-item
     label="活动时长"
     :label-width="formLabelWidth"
   >
     <el-input
       v-model="newForm.activityTime"
       autocomplete="off"
     ></el-input>
   </el-form-item>
   <el-form-item
     label="活动喜好地点数"
     :label-width="formLabelWidth"
   >
     <el-input
       v-model="newForm.favoriteLocation"
       autocomplete="off"
     ></el-input>
   </el-form-item>
   <el-form-item
     label="活动类型种类"
     :label-width="formLabelWidth"
   >
     <el-input
       v-model="newForm.recentActivityType"
       autocomplete="off"
     ></el-input>
   </el-form-item>
   <el-form-item
     label="健康评价"
     :label-width="formLabelWidth"
   >
     <el-input
       v-model="newForm.healthAssessment"
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




        <el-dialog
        title="老年活动推荐"
        :visible.sync="editFormVisible"
        @open="open()"
      >
      <div>
        <div id="float"><h2>推荐关键词:</h2></div>
        <div id="chart-container"></div>
        <div class="sick"><h3>活动推荐:<span id="sick"> {{this.sick}}</span></h3></div>
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
// var _index // 定义一个全局变量，以获取行数据的行号
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
      hieght:'',
      weight:'',
      activityTime:'',
      favoriteLocation:'',
      recentActivityType:'',
      healthAssessment:'',
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
    this.updated(),  this. getToken()},

  methods: {
    addPre() {
            this.activityTime=this.newForm.activityTime
			      this.favoriteLocation= this.newForm.favoriteLocation
			      this.hieght= this.newForm.hieght
			      this.weight= this.newForm.weight
            this.recentActivityType=this.newForm.recentActivityType
            this.healthAssessment= this.newForm.healthAssessment
      this.$axios({
        url: 'https://aip.baidubce.com/rpc/2.0/ai_custom/v1/table_infer/hdtjv1?access_token=' + this.token,
        method: 'post',
        data: JSON.stringify({
	         include_req: false,
	         data: [{
	          activity_time: this.newForm.activityTime,
			      favorite_location: this.newForm.favoriteLocation,
			      hieght: this.newForm.hieght,
			      weight: this.newForm.weight,
            recent_activity_type: this.newForm.recentActivityType,
            health_assessment: this.newForm.healthAssessment
          }]
        })
      }).then((res) => {
        console.log(res);
        console.log(this.newForm);
        if (res.status== 200) {
          this.sick=res.data.batch_result[0].fit_type
          console.log(this.sick);
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
        const content = [ '身高(cm):'+this.hieght, '体重(kg):'+this.weight,'活动时长:'+this.activityTime,'活动喜好地点数:'+this.favoriteLocation,'活动类型种类'+this.recentActivityType,'健康评价'+this.healthAssessment]
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
        url: 'http://43.138.244.227:8080/getAccTokenAct',
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
	          this.hieght= row.hieght,
			      this.weight = row.weight,
			      this.activityTime= row.activityTime,
			      this.favoriteLocation= row.favoriteLocation,
            this.recentActivityType= row.recentActivityType,
            this.healthAssessment= row.healthAssessment,
      this.$axios({
        url: 'https://aip.baidubce.com/rpc/2.0/ai_custom/v1/table_infer/hdtjv1?access_token=' + this.token,
        method: 'post',
        data: JSON.stringify({
	         include_req: false,
	         data: [{
	          hieght: row.hieght,
			      weight: row.weight,
			      activity_time: row.activityTime,
			      favorite_location: row.favoriteLocation,
            recent_activity_type: row.recentActivityType,
            health_assessment: row.healthAssessment,
          }]
        })
      }).then((res) => {
        console.log(res);
        if (res.status== 200) {
          this.sick=res.data.batch_result[0].fit_type
          console.log(this.sick);
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    // 保存编辑
    sumbitEditRow() {
      this.sick='',
      this.editFormVisible = false;

    },
    updated() {
      return this.$axios({
        url: 'http://43.138.244.227:8080/getAct',
        method: 'GET',
        params: { 
          pageNumber: this.num,
          pageSize: this.pageSize}
      }).then((res) => {
        if (res.data.code== 200 || res.code==200) {
          this.tableData=res.data.data.records;
          this.pages=res.data.data.pages
          this.total=res.data.data.total
          // console.log(res.data.pages);
          this.tableData.forEach((item) => {
          // console.log(item.time);
            item.birthday = Number(item.birthday)
            item.birthday = moment(item.birthday).format(
              "YYYY-MM-DD"
            )
          })
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
.chart-container{
  position: relative;
  width: 100%;
  height: calc(100vh - 84px);
}
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
