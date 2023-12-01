<template>
    <div>
      <!-- 头部区域 -->
      <Header>购物车</Header>
  
      <!-- 中间内容区域 -->
      <div class="container">
        <div v-if="this.tableData.length>0"></div>
        <div class="else_data" v-else >暂无数据...</div>
        <!-- 单条数据 -->
        <div class="item" v-for="(item, index) in this.tableData" :key="index">
          <mt-cell-swipe
            title=""
            :right="[
              {
                content: '删除',
                style: { background: 'red', color: '#fff' },
                handler: () => del(index),
              },
            ]"
          >
            <div>
              <!-- logo区域 -->
              <div class="logo">
                <img :src="item.photo" />
                <span>{{ item.name }}</span>
              </div>
              <!-- 详细内容区域 -->
              <div class="details">
                <!-- 商品图片 -->
                <img :src="item.photo" />
                <div class="details_list">
                  <!-- 标题 -->
                  <span>{{ item.name }}</span>
                  <div class="list_more">
                    <!-- 名称 -->
                    <span>名称:{{ item.name }}</span>
                    <!-- 备注 -->
                    <span>备注:{{ '无' }}</span>
                  </div>
                  <!-- 单价 -->
                  <div class="list_price">{{'单价：'+ item.price }}</div>
                </div>
              </div>
  
              <!-- 购买数量区域 -->
              <div class="num">
                <span>购买数量</span>
                <div>
                  <button @click="btn(false, index)">-</button>
                  <input type="text" :value="item.num" />
                  <button @click="btn(true, index)">+</button>
                </div>
              </div>
            </div>
          </mt-cell-swipe>
        </div>
      </div>
  
      <!-- 底部区域 -->
      <footer>
        <div class="footer_left">
          实际付款
          <span>￥{{ numprice }}</span>
        </div>
        <div class="footer_right">立即付款</div>
      </footer>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        numprice: 0,
        tableData:[],
        shopCar: [
          {
            id: '001',
            num: "1",
          },
          {
            id: "002",
            num: "1",
          },
          {
            id: "003",
            num: "1",
          },
          {
            id: "004",
            num: "1",
          },
          {
            id: "005",
            num: "1",
          },
        ],
      };
    },
    methods: {
      getdish(){ return this.$axios({
        url: 'http://43.138.244.227:8080/getAlldishesPage',
        method: 'GET',
        params: {
          pageNum: 1, // 默认当前页
          pageSize: 5 // 每页数据量
        }
      }).then((res) => {
      if(res.data.code==200)
      {  
        console.log(res);
          this.tableData=res.data.data.records
          this.tableData.forEach((element,index) => {
           this.tableData[index] =Object.assign({}, element, this.shopCar[index]);
          });
          console.log(this.tableData);
      }else if
      (res.data.code==400){
      }
      }).catch((err) => {
      console.log(err);
      });
      },
      totalprice() {
        let price = 0;
        this.tableData.forEach((item, index) => {
          price += item.price * item.num;
        });
        // 保留两位小数
        this.numprice = price.toFixed(2);
      },
      btn(bool, index) {
        let shopindex = this.tableData[index];
        if (bool == true) {
          shopindex.num++
        } else {
          if (shopindex.num >= 1) {
            shopindex.num--
          }
        }
        this.totalprice()
      },
      del(index) { 
        // 删除这条数据
        this.tableData.splice(index, 1)
        this.totalprice()
      },
    },
    mounted() {
      this.totalprice();
      this.getdish();
    },
  };
  </script>
  
  
  <style>
  body {
    margin: 0 auto;
    padding: 0;
    background: white;
  }
  
  header {
    height: 50px;
    width: 100%;
    text-align: center;
    line-height: 50px;
    border-bottom: 1px solid #ccc;
    background: white;
  }
  
  .container {
    background: white;
  }
  .else_data{
    text-align: center;
    color:red;
    line-height:100px;
  
  }
  .item {
    padding: 0px 10px;
    /* border-bottom: 1px solid #ccc; */
  }
  
  .container .item .logo {
    height: 40px;
    /* 左右浮动布局 */
    display: flex;
    /* 以交叉轴的中点对齐 */
    align-items: center;
  }
  
  .logo img {
    width: 20px;
    height: 20px;
    margin-left: 5px;
  }
  
  .logo span {
    margin-left: 5px;
    font-size: 12px;
  }
  
  .details {
    background: rgb(238, 236, 236);
    padding: 5px;
    font-size: 12px;
    display: flex;
  }
  .details img {
    width: 100px;
    height: 90px;
  }
  
  .details_list {
    margin-left: 15px;
    color: black;
  }
  
  .details_list span {
    display: block;
    margin-top: 3px;
  }
  
  .list_more {
    color: #888;
  }
  
  .list_price {
    color: red;
    font-size: 16px;
    display: block;
  }
  
  .num {
    padding: 10px;
    color: #888;
    /* 弹性布局 */
    display: flex;
    /* 左右排列，以两侧来对齐 */
    justify-content: space-between;
  }
  
  .num button {
    width: 30px;
    height: 25px;
    background: #e0e0e0;
    /* 清除自带边框 */
    border: none;
    /* 清除点击的默认样式 */
    outline: none;
  }
  
  .num input {
    width: 37px;
    height: 25px;
    border: none;
    text-align: center;
    background: #fff;
  }
  
  .mint-cell-swipe-button {
    line-height: 180px !important;
  }
  
  footer {
    height: 50px;
    width: 100%;
    text-align: center;
    line-height: 50px;
    background: white;
  
    /*上划线 */
    border-top: 1px solid #ccc;
    /* 弹性布局 */
    display: flex;
    position: fixed;
    bottom: 0;
    left: 0;
  }
  
  .footer_left {
    flex: 1;
    text-align: center;
    line-height: 50px;
    font-size: 16px;
    padding-right: 10px;
  }
  
  .footer_left span {
    color: red;
  }
  
  .footer_right {
    background: red;
    color: white;
    width: 150px;
    height: 50px;
    line-height: 50px;
    text-align: center;
  }
  </style>
  