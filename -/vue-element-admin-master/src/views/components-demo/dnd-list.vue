<template>
  <div class="components-container">
    <aside>
      数据收集表
    </aside>
    <div class="editor-container">
      <!-- <dnd-list :list1="list1" :list2="list2" list1-title="List" list2-title="" /> -->
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="用户管理" name="first">     <el-form ref="form" :model="form" label-width="80px">
       <el-form :inline="true">
        <el-form-item label="用户名" >
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="账号">
          <el-input v-model="form.account"></el-input>
        </el-form-item>
        <el-form-item label="联系方式">
          <el-input v-model="form.account"></el-input>
        </el-form-item>
        </el-form>
       <el-form :inline="true">
        <el-form-item label="身高（cm）" >
          <el-input v-model="form.height"></el-input>
        </el-form-item>
        <el-form-item label="体重（kg）">
          <el-input v-model="form.weight"></el-input>
        </el-form-item>
        <el-form-item label="年龄">
          <el-input v-model="form.age"></el-input>
        </el-form-item>
        </el-form>
        <el-form-item label="出生日期">
          <el-col :span="11">
            <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="是否出行不便">
          <el-switch v-model="form.move"></el-switch>
        </el-form-item>
        <el-form-item label="预测需求">
          <el-checkbox-group v-model="form.type">
            <el-checkbox label="糖尿病" name="type"></el-checkbox>
            <el-checkbox label="心脑血管疾病" name="type"></el-checkbox>
            <el-checkbox label="痴呆症" name="type"></el-checkbox>
            <el-checkbox label="活动推荐" name="type"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="性别">
          <el-radio-group v-model="form.sex">
            <el-radio label="男"></el-radio>
            <el-radio label="女"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="家庭住址">
          <el-input type="textarea" v-model="form.desc"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submit1">立即创建</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form></el-tab-pane>
        <el-tab-pane label="糖尿病预测信息" name="second">
        <el-radio-group v-model="labelPosition" size="small">
        </el-radio-group>
        <div style="margin: 20px;"></div>
        <el-form :label-position="labelPosition" label-width="160px" :model="formLabelAlign" :inline="true">
          <el-form-item label="怀孕次数">
            <el-input v-model="formLabelAlign.pregnancies"></el-input>
          </el-form-item>
          <el-form-item label="血糖">
            <el-input v-model="formLabelAlign.glucose"></el-input>
          </el-form-item>
          <el-form-item label="血压">
            <el-input v-model="formLabelAlign.bloodpressure"></el-input>
          </el-form-item>
        </el-form>
        <el-form :label-position="labelPosition" label-width="160px" :model="formLabelAlign" :inline="true">
          <el-form-item label="皮肤褶皱">
            <el-input v-model="formLabelAlign.skinthickness"></el-input>
          </el-form-item>
          <el-form-item label="胰岛素">
            <el-input v-model="formLabelAlign.insulin"></el-input>
          </el-form-item>
          <el-form-item label="BMI">
            <el-input v-model="formLabelAlign.bmi"></el-input>
          </el-form-item>
        </el-form>
        <el-form :label-position="labelPosition" label-width="160px" :model="formLabelAlign" :inline="true">
          <el-form-item label="糖尿病遗">
            <el-input v-model="formLabelAlign.diabetespedigreefunction"></el-input>
          </el-form-item>
        </el-form>
        <el-form :label-position="labelPosition" label-width="160px" style="margin-top: 80px;" :model="formLabelAlign">
          <el-form-item>
            <el-button type="primary" @click="submit2">提交</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
        <el-tab-pane label="心脑血管疾病预测信息" name="third">       <el-radio-group v-model="labelPosition" size="small">
        </el-radio-group>
        <div style="margin: 20px;"></div>
        <el-form :label-position="labelPosition" label-width="160px" :model="formLabelAlign" :inline="true">
          <el-form-item label="年龄">
            <el-input v-model="formLabelAlign.name"></el-input>
          </el-form-item>
          <el-form-item label="身高(cm)">
            <el-input v-model="formLabelAlign.region"></el-input>
          </el-form-item>
          <el-form-item label="体重(kg)">
            <el-input v-model="formLabelAlign.type"></el-input>
          </el-form-item>
        </el-form>
        <el-form :label-position="labelPosition" label-width="160px" :model="formLabelAlign" :inline="true">
          <el-form-item label="收缩压">
            <el-input v-model="formLabelAlign.apHi"></el-input>
          </el-form-item>
          <el-form-item label="舒张压">
            <el-input v-model="formLabelAlign.apLo"></el-input>
          </el-form-item>
          <el-form-item label="胆固醇">
            <el-input v-model="formLabelAlign.cholesterol"></el-input>
          </el-form-item>
        </el-form>
        <el-form :label-position="labelPosition" label-width="160px" :model="formLabelAlign" :inline="true">
          <el-form-item label="是否抽烟">
            <el-input v-model="formLabelAlign.smoke"></el-input>
          </el-form-item>
          <el-form-item label="是否喝酒">
            <el-input v-model="formLabelAlign.alco"></el-input>
          </el-form-item>
          <el-form-item label="是否经常体育活动">
            <el-input v-model="formLabelAlign.active"></el-input>
          </el-form-item>
        </el-form>
        <el-form :label-position="labelPosition" label-width="160px" style="margin-top: 80px;" :model="formLabelAlign">
          <el-form-item>
            <el-button type="primary" @click="submit3">提交</el-button>
          </el-form-item>
        </el-form></el-tab-pane>
        <el-tab-pane label="痴呆症预测信息" name="fourth">  <el-radio-group v-model="labelPosition" size="small">
        </el-radio-group>
        <div style="margin: 20px;"></div>
        <el-form :label-position="labelPosition" label-width="240px" :model="formLabelAlign" :inline="true">
          <el-form-item label="就诊次数">
            <el-input v-model="formLabelAlign.visit"></el-input>
          </el-form-item>
          <el-form-item label="MR指标">
            <el-input v-model="formLabelAlign.mrBDelay"></el-input>
          </el-form-item>
          <el-form-item label="受教育(年限)">
            <el-input v-model="formLabelAlign.educ"></el-input>
          </el-form-item>
        </el-form>
        <el-form :label-position="labelPosition" label-width="240px" :model="formLabelAlign" :inline="true">
          <el-form-item label="社会经济地位">
            <el-input v-model="formLabelAlign.ses"></el-input>
          </el-form-item>
          <el-form-item label="小型精神状态检">
            <el-input v-model="formLabelAlign.mmse"></el-input>
          </el-form-item>
          <el-form-item label="临床痴呆症评分">
            <el-input v-model="formLabelAlign.cdr"></el-input>
          </el-form-item>
        </el-form>
        <el-form :label-position="labelPosition" label-width="240px" :model="formLabelAlign" :inline="true">
          <el-form-item label="阿特拉斯缩放系数">
            <el-input v-model="formLabelAlign.asf"></el-input>
          </el-form-item>
          <el-form-item label="估计总颅内容积">
            <el-input v-model="formLabelAlign.etiv"></el-input>
          </el-form-item>
          <el-form-item label="归一化全脑容积">
            <el-input v-model="formLabelAlign.nwbv"></el-input>
          </el-form-item>
          <el-form-item label="mf(蕈样霉菌病检查)">
            <el-input v-model="formLabelAlign.mf"></el-input>
          </el-form-item>
        </el-form>
        <el-form :label-position="labelPosition" label-width="240px" style="margin-top: 80px;" :model="formLabelAlign">
          <el-form-item>
            <el-button type="primary" @click="submit4">提交</el-button>
          </el-form-item>
        </el-form></el-tab-pane>
        <el-tab-pane label="活动推荐信息" name="fifth">
          <el-radio-group v-model="labelPosition" size="small">
          </el-radio-group>
          <div style="margin: 20px;"></div>
          <el-form :label-position="labelPosition" label-width="160px" :model="formLabelAlign" :inline="true">
            <el-form-item label="身高">
              <el-input v-model="formLabelAlign.height"></el-input>
            </el-form-item>
            <el-form-item label="体重">
              <el-input v-model="formLabelAlign.weight"></el-input>
            </el-form-item>
            <el-form-item label="活动时长(h)">
              <el-input v-model="formLabelAlign.activityTime"></el-input>
            </el-form-item>
          </el-form>
          <el-form :label-position="labelPosition" label-width="160px" :model="formLabelAlign" :inline="true">
            <el-form-item label="活动喜好地点数">
              <el-input v-model="formLabelAlign.favoriteLocation"></el-input>
            </el-form-item>
            <el-form-item label="活动类型种类">
              <el-input v-model="formLabelAlign.recentActivityType"></el-input>
            </el-form-item>
            <el-form-item label="健康评价">
              <el-input v-model="formLabelAlign.healthAssessment"></el-input>
            </el-form-item>
          </el-form>
          <el-form>
          <el-form-item label-width="160px" style="margin-top: 80px;">
              <el-button type="primary" @click="submit5">提交</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
<div id="mchart" style="width:800px;height:600px; margin: 0 auto"></div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        form: {
          name: '',
          account:'',
          age: '',
          weight: '',
          height: '',
          move: false,
          type: [],
          sex: '',
          desc: ''
        },
        activeName: 'first',
        labelPosition: 'right',
        formLabelAlign: {
        height: '',
        weight: '',
        activityTime: '',
        favoriteLocation: '',
        recentActivityType: '',
        healthAssessment: '',
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
        asf:'',
        apHi:'',
        apLo:'',
        cholesterol:'',
        smoke:'',
        alco:'',
        active:'',
        pregnancies:'',
        glucose:'',
        bloodpressure:'',
        skinthickness:'',
        insulin:'',
        bmi:'',
        diabetespedigreefunction:''
      },
        data0:[]
      }
    },
    mounted(){
      // this.mchart();
},
    methods: {
      submit1(){
        if(this.form.height==''||this.form.weight==''||this.form.age=='') return alert('信息不能有空')
        alert('提交成功')
        // this.mchart();
      },
      submit5(){
        this.data0=[
          {value:this.formLabelAlign.activityTime ,name:'活动时长(h)'},
          {value:this.formLabelAlign.favoriteLocation ,name:'活动喜好地点数'},
          {value:this.formLabelAlign.recentActivityType ,name:'活动类型种类'},
          {value:this.formLabelAlign.healthAssessment ,name:'健康评价'}
        ]
        this.mchart();
      },
      submit4(){
        this.data0=[
          {value:this.formLabelAlign.visit,name:'就诊次数'},
          {value:this.formLabelAlign.mrBDelay,name:'MR指标'},
          {value:this.formLabelAlign.educ ,name:'受教育（年限）'},
          {value:this.formLabelAlign.ses,name:'社会经济地位'},
          {value:this.formLabelAlign.mmse,name:'小型精神状态检查'},
          {value:this.formLabelAlign.cdr,name:'临床痴呆症评分'},
          {value:this.formLabelAlign.asf,name:'阿特拉斯缩放系数'},
          {value:this.formLabelAlign.etiv,name:'估计总颅内容积'},
          {value:this.formLabelAlign.nwbv,name:'归一化全脑容积'},
          {value:this.formLabelAlign.mf,name:'mf(蕈样霉菌病检查)'},
        ]
        this.mchart();
      },
      submit3(){
        this.data0=[
          {value:this.formLabelAlign.apHi,name:'收缩压'},
          {value:this.formLabelAlign.apLo,name:'舒张压'},
          {value:this.formLabelAlign.cholesterol,name:'胆固醇'},
          {value:this.formLabelAlign.smoke,name:'抽烟是否(0/1)'},
          {value:this.formLabelAlign.alco,name:'喝酒是否(0/1)'},
          {value:this.formLabelAlign.active,name:'经常体育活动是否(0/1)'},
        ]
        this.mchart();
      },
      submit2() {
        this.data0=[
          {value:this.formLabelAlign.pregnancies,name:'怀孕次数'},
          {value:this.formLabelAlign.glucose,name:'血糖'},
          {value:this.formLabelAlign.bloodpressure,name:'血压'},
          {value:this.formLabelAlign.skinthickness,name:'皮肤褶皱度'},
          {value:this.formLabelAlign.insulin,name:'胰岛素'},
          {value:this.formLabelAlign.bmi,name:'BMI'},
          {value:this.formLabelAlign.diabetespedigreefunction,name:'糖尿病遗传因子'}
        ]
        this.mchart();
      },
      onSubmit() {
        console.log('submit!');
        console.log(this.form)
      }, 
      handleClick(tab, event) {
        console.log(tab, event);
      },
      mchart(){
  window.addEventListener('resize', function(){
	myChart.resize()})
  var chartDom = document.getElementById('mchart');
var myChart = this.$echarts.init(chartDom);
var option;
option = {
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b}: {c} ({d}%)'
  },
  legend: {
    data: [
      '身高',
'体重',
'年龄'
    ]
  },
  series: [
    {
      name: '',
      type: 'pie',
      selectedMode: 'single',
      radius: [0, '30%'],
      label: {
        position: 'inner',
        fontSize: 14
      },
      labelLine: {
        show: false
      },
      data: [
        { value: this.form.height, name: '身高' },
        { value: this.form.weight, name: '体重' },
        { value: this.form.age, name: '年龄', selected: true }
      ]
    },
    {
      name: '',
      type: 'pie',
      radius: ['45%', '60%'],
      labelLine: {
        length: 30
      },
      label: {
        formatter: '{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}  ',
        backgroundColor: '#F6F8FC',
        borderColor: '#8C8D8E',
        borderWidth: 1,
        borderRadius: 4,
        rich: {
          a: {
            color: '#6E7079',
            lineHeight: 22,
            align: 'center'
          },
          hr: {
            borderColor: '#8C8D8E',
            width: '100%',
            borderWidth: 1,
            height: 0
          },
          b: {
            color: '#4C5058',
            fontSize: 14,
            fontWeight: 'bold',
            lineHeight: 33
          },
          per: {
            color: '#fff',
            backgroundColor: '#4C5058',
            padding: [3, 4],
            borderRadius: 4
          }
        }
      },
      data: this.data0
    }
  ]
};
option && myChart.setOption(option);
}
    }
  }
</script>