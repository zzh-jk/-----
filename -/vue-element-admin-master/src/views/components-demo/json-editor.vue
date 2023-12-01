<h2>222222</h2>

<template>
  <div id="he">
    <!-- <div id="chart-container"></div> -->
      <h3> 心脑血管疾病预测信息详情</h3>     <el-button type="primary" @click="pre()" style="float:right" ><i class="el-icon-edit"></i>&nbsp;&nbsp;输入预测</el-button>
  <el-table
      :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
      :model="tableData"
      style="width: 100% align:center">
    <el-table-column
      label="年龄"
      prop="age">
    </el-table-column>
    <el-table-column
      label="性别"
      prop="gender">
    </el-table-column>
    <el-table-column
      label="身高(cm)"
      prop="height">
    </el-table-column>
    <el-table-column
      label="体重(kg)"
      prop="weight">
    </el-table-column>
    <el-table-column
      label="收缩压"
      prop="apHi">
    </el-table-column>
    <el-table-column
      label="舒张压"
      prop="apLo">
    </el-table-column>
    <el-table-column
      label="胆固醇"
      prop="cholesterol">
    </el-table-column>
    <el-table-column
      label="抽烟 "
      prop="smoke">
    </el-table-column>
    <el-table-column
      label="喝酒"
      prop="alco">
    </el-table-column>
    <el-table-column
      label="是否经常体育活动"
      prop="active">
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

  <el-dialog
  title="心脑血管疾病预测"
  :visible.sync="editFormVisible"
@open="open()"
>
<div>
  <div id="float"><h2>预测关键词:</h2></div>
  <div id="chart-container"></div>
 <!-- <h5>预测信息：</h5>
 <ul>
  <li>年龄: {{this.age}}</li>
  <li>性别: {{this.gender}}</li>
  <li>身高（cm）: {{this.height}}</li>
  <li>体重（kg）: {{this.weight}}</li>
  <li>收缩压: {{this.apHi}}</li>
  <li>舒张压: {{this.apLo}}</li>
  <li>胆固醇: {{this.cholesterol}}</li>
  <li>是否抽烟: {{this.smoke}}</li>
  <li>是否喝酒: {{this.alco}}</li>
  <li>是否体育运动: {{this.active}}</li>
 </ul> -->
 <div class="sick"><h3>疾病预测:<span id="sick"> {{this.sick}}</span></h3></div>
</div>
  <div style="display: flex;justify-content: space-around; margin-top:10px">
  <el-button @click="cancel()">取消</el-button>
   <el-button
      type="primary"
      v-on:click="sumbitEditRow()"
      :loading="addLoading"
    >确定</el-button>
  </div>
 </el-dialog>

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
     label="年龄"
     :label-width="formLabelWidth"
   ><el-input
       v-model="newForm.age"
       autocomplete="off"
     ></el-input>
   </el-form-item>
   <el-form-item
     label="性别(男/女：0/1)"
     :label-width="formLabelWidth"
   >
     <el-input
       v-model="newForm.gender"
       autocomplete="off"
     ></el-input>
   </el-form-item>
   <el-form-item
     label="身高(cm)"
     :label-width="formLabelWidth"
   >
     <el-input
       v-model="newForm.height"
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
     label="收缩压"
     :label-width="formLabelWidth"
   >
     <el-input
       v-model="newForm.apHi"
       autocomplete="off"
     ></el-input>
   </el-form-item>
   <el-form-item
     label="舒张压"
     :label-width="formLabelWidth"
   >
     <el-input
       v-model="newForm.apLo"
       autocomplete="off"
     ></el-input>
   </el-form-item>
   <el-form-item
     label="胆固醇"
     :label-width="formLabelWidth"
   >
     <el-input
       v-model="newForm.cholesterol"
       autocomplete="off"
     ></el-input>
   </el-form-item>
   <el-form-item
     label="抽烟是否(0/1)"
     :label-width="formLabelWidth"
   >
     <el-input
       v-model="newForm.smoke"
       autocomplete="off"
     ></el-input>
   </el-form-item>
   <el-form-item
     label="喝酒是否(0/1)"
     :label-width="formLabelWidth"
   >
     <el-input
       v-model="newForm.alco"
       autocomplete="off"
     ></el-input>
   </el-form-item>
   <el-form-item
     label="经常体育活动是否(0/1)"
     :label-width="active"
   >
     <el-input
       v-model="newForm.active"
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


  <footer>
      <el-pagination
        @size-change="handleSizeChange" 
        @current-change="handleCurrentChange"
        :current-page="num" 
        :page-sizes="[10,15,20]" 
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
      token:'',
      num: 1, // 当前页
      allPages: '',
      pageSize: 15,
      total: 0,
      time: '',
      sick:'',
      age:'',
      gender:'',
      mf:'',
      height:'',
      weight:'',
      apHi:'',
      apLo:'',
      cholesterol:'',
      smoke:'',
      alco:'',
      active:'',
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
            this.age=this.newForm.age
			      this.gender= this.newForm.gender
			      this.height= this.newForm.height
			      this.weight= this.newForm.weight
            this.ap_hi=this.newForm.apHi
            this.ap_lo= this.newForm.apLo
            this.cholesterol= this.newForm.cholesterol
            this.smoke= this.newForm.smoke
            this.alco= this.newForm.alco
            this.active= this.newForm.active
      this.$axios({
        url: 'https://aip.baidubce.com/rpc/2.0/ai_custom/v1/table_infer/xxgcv1?access_token='+ this.token ,
        method: 'post',
        data: JSON.stringify({
	         include_req: false,
	         data: [{
	          age: this.newForm.age,
			      gender: this.newForm.gender,
			      height: this.newForm.height,
			      weight: this.newForm.weight,
            ap_hi: this.newForm.apHi,
            ap_lo: this.newForm.apLo,
            cholesterol: this.newForm.cholesterol,
            smoke: this.newForm.smoke,
            alco: this.newForm.alco,
            active: this.newForm.active
          }]
        })
      }).then((res) => {
        console.log(res);
        console.log(this.newForm);
        if (res.status== 200) {
          this.sick=res.data.batch_result[0].cardio
            if(this.sick==1)
           { 
            this.sick='有患心血管疾病风险'
          }
            if(this.sick==0)
            this.sick='没有患心血管疾病风险'
            this.newFormVisible = false
            this.editFormVisible = true

        }
      }).catch((err) => {
        console.log(err)
        this.newFormVisible = false
      })
    },

getToken(){   this.$axios({
        url: 'http://43.138.244.227:8080/getAccTokenHeart',
        method: 'GET' }).then((res)=> {
        if (res.data.code == 200 || res.code==200) {
          this.token = res.data.data.access_token
          console.log(this.token);
          console.log(res);
        }
      }).catch((err) => {
        console.log(err)
      })},
       // 新增
       pre() {
      this.newFormVisible = true;
    },
    initChart() {
        this.chart = echarts.init(document.getElementById('chart-container'));
        var keywords = [];
        const content = [ '年龄:'+this.age, '性别:'+this.gender,'身高(cm):'+this.height,'体重(kg):'+this.weight,'收缩压'+this.apHi,'舒张压'+this.apLo,'胆固醇:'+this.cholesterol,'是否患病:'+this.sick,'是否抽烟:'+this.smoke,'是否喝酒:'+this.alco,'是否体育运动:'+this.active]
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
    handleEdit(index,row) { 
    
      this.editFormVisible = true;
     
	          this.age= row.age,
			      this.gender = row.gender,
			      this.mf= row.mf,
			      this.height= row.height,
            this.weight= row.weight,
            this.apHi= row.apHi,
            this.apLo= row.apLo,
            this.cholesterol= row.cholesterol,
            this.smoke= row.smoke,
            this.alco= row.alco,
            this.active = row.active
            // this.initChart()
      this.$axios({
        url: 'https://aip.baidubce.com/rpc/2.0/ai_custom/v1/table_infer/xxgcv1?access_token='+this.token,
        method: 'post',
        data: JSON.stringify({
	         include_req: false,
	         data: [{
	          age: row.age,
			      gender: row.gender,
			      height: row.height,
			      weight: row.weight,
            ap_hi: row.apHi,
            ap_lo: row.apLo,
            cholesterol: row.cholesterol,
            smoke: row.smoke,
            alco: row.alco,
            active: row.active
          }]
        })
      }).then((res) => {
        console.log(res);
        if (res.status== 200) {
          this.sick=res.data.batch_result[0].cardio

            if(this.sick==1)
           { 
            this.sick='有患心血管疾病风险';
          }
            if(this.sick==0)
            this.sick='没有患心血管疾病风险';
        }
      }).catch((err) => {
        console.log(err)
      })

    // 取到这一栏的值，也就是明白是在那一栏进行操作，从而将编辑后的数据存到表格中
    },
    // 保存编辑
    sumbitEditRow() {
      this.sick=''
      this.editFormVisible = false;

    },
    updated() {
      return this.$axios({
        url: 'http://43.138.244.227:8080/getHeart',
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
            item.alco=Number(item.alco)
            if(item.alco==0)
            {item.alco= '否'} 
            else {item.alco= '是'}
            item.gender=Number(item.gender)
            if(item.gender==1) 
            {item.gender='女'}
            else 
            {item.gender= '男'}
            item.smoke=Number(item.smoke)
            if(item.smoke==0) 
            {item.smoke='否'}
            else 
            {item.smoke= '是'}
            item.active=Number(item.active)
            if(item.active==0) 
            {item.active='否'}
            else 
            {item.active= '是'}
          })
        }
        if (res.data.code==400||res.status==404) {
          // alert('查无此人')
        }
      }).catch((err) => {
        console.log(err)

        // alert('查无此人或信息更新失败！')
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
