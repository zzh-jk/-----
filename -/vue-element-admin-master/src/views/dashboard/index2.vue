<template>
   <div>
    <div id="con">
        <!-- <img src="../../assets/jrgz.png" alt=""> -->
        <img style="height:10vw ; width:50%" src="../../assets/gz.png" alt="">
        <img style="height:10vw ; width:50%" src="../../assets/news.png" alt="">
            <div class="border"></div>
    </div>

    <header>
        <div id="cale">
          <el-calendar>
            <!-- 这里使用的是 2.5 slot 语法，对于新项目请使用 2.6 slot 语法-->
            <template
              slot="dateCell"
              slot-scope="{date, data}">
              <p :class="data.isSelected ? 'is-selected' : ''">
                {{ data.day.split('-').slice(1).join('-') }} {{ data.isSelected ? '✔️' : ''}}
              </p>
            </template>
          </el-calendar>
    </div>
   <div class="lunbo">
           <div class="block">
      <span class="demonstration">活动实纪</span>
      <el-carousel height="18.6vw">
        <el-carousel-item v-for="item in imgArr2" :key="item">
            <img :src="item.url" alt />
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="block">
      <span class="demonstration">志愿展板</span>
      <el-carousel trigger="click" height="18.6vw">
        <el-carousel-item v-for="item in imgArr1" :key="item">
            <img :src="item.url" alt />
        </el-carousel-item>
      </el-carousel>
    </div>
    </div>
    </header>
    <div id="contain">
        <div class="news">
           <div class="new">
            <el-tabs v-model="activeName1" @tab-click="handleClick1">
              <el-tab-pane label="活动新闻" name="first">
                <div class="infinite-list-wrapper" style="overflow:scroll; height:25vw ">
                    <ul
                      class="list"
                      v-infinite-scroll="load"
                      infinite-scroll-disabled="disabled">
                     <li v-for="i in count" class="list-item"><a href="#">{{ arr0[i] }}</a></li>
                    </ul>
                    <p v-if="loading">加载中...</p>
                    <p v-if="noMore">没有更多了</p>
                  </div>
            </el-tab-pane>
              <el-tab-pane label="活动公告" name="second"><div class="infinite-list-wrapper" style="overflow:scroll; height:25vw ">
                <ul
                  class="list"
                  v-infinite-scroll="load"
                  infinite-scroll-disabled="disabled">
                 <li v-for="i in count" class="list-item"><a href="#">{{ "关于"+arr0[i] }}</a></li>
                </ul>
                <p v-if="loading">加载中...</p>
                <p v-if="noMore">没有更多了</p>
              </div></el-tab-pane>
            </el-tabs>
        </div>
    </div>
        <div class="news">
                <div class="new">
                <el-tabs v-model="activeName2" @tab-click="handleClick2">
                  <el-tab-pane label="志愿新闻" name="first"><div class="infinite-list-wrapper" style="overflow:scroll; height:25vw ">
                    <ul
                      class="list"
                      v-infinite-scroll="load"
                      infinite-scroll-disabled="disabled">
                     <li v-for="i in count" class="list-item"><a href="#">{{ arr3[i] }}</a></li>
                    </ul>
                    <p v-if="loading">加载中...</p>
                    <p v-if="noMore">没有更多了</p>
                  </div></el-tab-pane>
                  <el-tab-pane label="志愿者公告" name="second"><div class="infinite-list-wrapper" style="overflow:scroll; height:25vw ">
                    <ul
                      class="list"
                      v-infinite-scroll="load"
                      infinite-scroll-disabled="disabled">
                     <li v-for="i in count" class="list-item"><a href="#">{{ "关于"+arr3[i] }}</a></li>
                    </ul>
                    <p v-if="loading">加载中...</p>
                    <p v-if="noMore">没有更多了</p>
                  </div></el-tab-pane>
                </el-tabs>
            </div>
        </div>
    </div>
</div>
  </template>
  <style  scoped>

  #cale /deep/.el-calendar__body{
    padding: 12px 20px;
  }
  #cale /deep/.el-calendar-table .el-calendar-day {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    padding:  0.1vw 0.5vw ;
    width: 3.6vw;
    height: 2.465vw;}
  .news li{
    color: #1890ff;
    height: 2.5vw;
    line-height: 2.5vw;
    border-bottom:  1px solid #cccccc ;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
  }
  li:hover{
color: orange;
text-decoration: underline;
}
  #con{
    position: relative;
    margin: 1vw;
  }
 .new{
    margin: 1vw;
 }
  .news{
   float: left;
    z-index: 999;
    margin-left: 1vw;
    border: 1px solid #cccccc;
    width: 48.5%;
    height: 30vw;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
  }
  header{
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    z-index: 999;
    height: 22.45vw;
    position: relative;
  margin: 1vw;  margin-top: 2vw;
    border: 1px solid #cccccc;
display: flex;
justify-content: space-around;
width: 100%;
  }
  .lunbo{
    width: 73%;
    display: flex;
    justify-content: space-evenly;
    border-left:0;
  }
    .el-carousel__item h3 {
      color: #475669;
      font-size: 14px;
      opacity: 0.75;
      line-height: 150px;
      margin: 0;
    }
  
    .el-carousel__item:nth-child(2n) {
       background-color: #99a9bf;
    }
    .el-carousel__item:nth-child(2n+1) {
       background-color: #d3dce6;
    }
    .demonstration{
        position: absolute;
        top: 1vw;
        width: 27%;
display: block;
text-align: center;
font-size: 1.2rem;
font-weight: 700;
    }
    .block{
        width: 45%;
        margin-top:3vw
    }
    #cale{
        border: 1px solid #cccccc;
        width: 28vw;
        margin-left: 0vw;
    }
img{
    width: 100%;
    height: 100%;
}
.border{
    width: 100%;
    height: 3vw;
    position: absolute;
    bottom: -2vw;
    background-color: orange;
}
.is-selected {
  color: #1989FA;
}
  </style>

  <script>
  export default {
    data() {
      return {
        arr0:[
            '社区开展“全国老年健康宣传周”活动',
            '履行社会责任 关爱老年群体 开展助力公益系列活动',
            '“适老化”改造,让“养老”变“享老”',
            '为老服务精准贴心!老年人乐享幸福养老生活',
            '文明敬老全省行① | 老年友好型社区,托起幸福晚年',
            '生命在于运动,老年人也要运动哟',
            '生命在于运动,老年人也要运动哟',
            '基层老年教育覆盖面不断扩大',
            '一辈子追求的安全感,在养老社区找到了',
            '携手并肩 更好地为老年体育宣传事业服务',
            '全国老年健康宣传周 | 改善老年营养 促进老年健康_新闻频道...',
    ],
        arr3:[
            '志愿活动送关爱 文明实践树新风',
            '志愿服务社区,共创和谐社会。',
            '服务他人,提升自己。',
            '弘扬志愿精神,服务社区居民。',
            '让文明成为习惯,让志愿成为时尚。',
            '携手志愿，用心服务，点缀社会，美好城市。',
            '巾帼志愿服务，关爱空穴老人。',
            '弘扬雷锋精神，争当时代楷模。',
            '社会治理步步为赢，城镇优化志愿先行。',
            '携手并肩 更好地为老年体育宣传事业服务',
            '志愿和谐社会，助福精彩未来。',
    ],
        value: new Date(),
        activeName1: 'first',
        activeName2: 'first',
        count: 10,
        loading: false,
        imgArr1: [
            {url: require('../../assets/sj0.png')},
            {url: require('../../assets/sj1.png')},
            {url: require('../../assets/sj2.png')},
            {url: require('../../assets/sj3.png')}
        ],
        imgArr2: [
            {url: require('../../assets/zy0.png')},
            {url: require('../../assets/zy1.png')},
            {url: require('../../assets/zy2.png')},
            {url: require('../../assets/zy3.png')}
        ]
      }
    } ,
    computed: {
      noMore () {
        return this.count >= 9
      },
      disabled () {
        return this.loading || this.noMore
      }
    },
    methods: {
        load () {
        this.loading = true
        setTimeout(() => {
          this.count += 2
          this.loading = false
        }, 2000)
      },
      handleClick1(tab, event) {
        console.log(tab, event);
      },
      handleClick2(tab, event) {
        console.log(tab, event);
      }
    }
  };
</script>