
<template>
  <div class="login-container root">
    <div class="start-screen">
      <div class="loading">
        <div class="loading__element el1">社</div>
        <div class="loading__element el2">区</div>
        <div class="loading__element el3">智</div>
        <div class="loading__element el4">慧</div>
      </div>
      <div class="loading">
        <div class="loading__element el1">养</div>
        <div class="loading__element el1">老</div>
        <div class="loading__element el2">管</div>
        <div class="loading__element el3">理</div>
        <div class="loading__element el4">信</div>
        <div class="loading__element el5">息</div>
        <div class="loading__element el6">系</div>
        <div class="loading__element el7">统</div>
      </div>
    </div>
    <div class="wrap">
      <div class="wrap-box">
        <div class="box-content">
            <div class="sign">
                <h2 class="title">没有账号吗？</h2>
                <p class="desc">点击这里注册一个账号</p>
                <button type="button" class="get-register" @click=" getRegister()">注册</button>
          </div>
          <div class="login">
            <h2 class="title">已经有账号了吗？</h2>
            <p class="desc">点击这里登录</p>
            <button type="button" class="get-login" @click="getLogin()">登录</button>
            </div>
        </div>

        <div class="manager-box">
            <div class="sign-part">
                <form action="" id="formReg">
                    <h3>注册</h3>
                    <div class="input-box">
                        <input type="text" placeholder="用户名" name="username">
                        <i class="iconfont icon-wo"></i>
                    </div>
                    <div class="input-box">
                        <input type="password" placeholder="密码" name="psw">
                        <i class="iconfont icon-mima"></i>
                    </div>
                    <div class="input-box">
                        <input type="password" placeholder="确认密码" name="repsw">
                        <i class="iconfont icon-mima"></i>
                    </div>
                    <div class="buttons clearfix">
                        <button  class="btn-register fr" id="reg" @click="  Register($event)">注册</button>
                    </div>
                </form>
            </div>
            <div class="login-part">
                <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" autocomplete="on" label-position="left">

      <div class="title-container">
        <h3 class="title">登录</h3>
      </div>
      <div class="input-box">
      <el-form-item prop="username">
        <el-input
          ref="username"
          v-model="loginForm.username"
          placeholder="Username"
          name="username"
          type="text"
          tabindex="1"
          autocomplete="on"
        />
      </el-form-item>
    </div>
     <el-tooltip v-model="capsTooltip" content="Caps lock is On" placement="right" manual>
        <el-form-item prop="password">

          <el-input
            :key="passwordType"
            ref="password"
            v-model="loginForm.password"
            :type="passwordType"
            placeholder="Password"
            name="password"
            tabindex="2"
            autocomplete="on"
            @keyup.native="checkCapslock"
            @blur="capsTooltip = false"
            @keyup.enter.native="handleLogin"
          />
        </el-form-item>
      </el-tooltip>
      <div class="buttons clearfix">
        <a href="javascript:;">忘记密码？</a>
        <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="handleLogin()">Login</el-button>
    </div>
    </el-form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { validUsername } from '@/utils/validate'
// import SocialSign from './components/SocialSignin'
import $ from 'jquery'
export default {
  name: 'Login',
  // components: { SocialSign },
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error('Please enter the correct user name'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('The password can not be less than 6 digits'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      passwordType: 'password',
      capsTooltip: false,
      loading: false,
      showDialog: false,
      redirect: undefined,
      otherQuery: {}
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        const query = route.query
        if (query) {
          this.redirect = query.redirect
          this.otherQuery = this.getOtherQuery(query)
        }
      },
      immediate: true
    }
  },
  created() {
    // window.addEventListener('storage', this.afterQRScan)
  },
  mounted() {
    if (this.loginForm.username === '') {
      this.$refs.username.focus()
    } else if (this.loginForm.password === '') {
      this.$refs.password.focus()
    }
  },
  destroyed() {
    // window.removeEventListener('storage', this.afterQRScan)
  },
  methods: {
    getRegister() {
      $('.manager-box').removeClass('right').addClass('left').removeClass('active')
      console.log('注册跳转')
    },
    getLogin() {
      $('.manager-box').removeClass('left').addClass('right').addClass('active')
      console.log('登录跳转')
    },
    Register(e) {
      e.preventDefault()
      console.log(this.redirect)
    },
    checkCapslock(e) {
      const { key } = e
      this.capsTooltip = key && key.length === 1 && (key >= 'A' && key <= 'Z')
    },
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      console.log(111)
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('user/login', this.loginForm)
            .then(() => {
              this.$router.push({ path: this.redirect || '/', query: this.otherQuery })
              this.loading = false
            })
            .catch(() => {
              this.loading = false
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== 'redirect') {
          acc[cur] = query[cur]
        }
        return acc
      }, {})
    }
    // afterQRScan() {
    //   if (e.key === 'x-admin-oauth-code') {
    //     const code = getQueryObject(e.newValue)
    //     const codeMap = {
    //       wechat: 'code',
    //       tencent: 'code'
    //     }
    //     const type = codeMap[this.auth_type]
    //     const codeName = code[type]
    //     if (codeName) {
    //       this.$store.dispatch('LoginByThirdparty', codeName).then(() => {
    //         this.$router.push({ path: this.redirect || '/' })
    //       })
    //     } else {
    //       alert('第三方登录失败')
    //     }
    //   }
    // }
  }
}
</script>
<style scoped>
/* 最大屏 */
@media screen and (min-width:800px) {
.show-pwd{
    top: 9.5em;
    display: block;
    position: absolute;
    right: 3.5em;
  }
   .root{
        background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
        background-size: 400% 400%;
        animation: gradient 15s ease infinite;
        height: 140vh;
    }
    .back {
        /* background-image: url('/未标题-12.png'); */
        background-size: contain;
        animation: gradient 15s ease infinite;
    }
    @keyframes gradient {
        0% {
            background-position: 0% 50%;
        }
        50% {
            background-position: 100% 50%;
        }
        100% {
            background-position: 0% 50%;
        }
    }
  .root,
    div,
    dl,
    dt,
    dd,
    ul,
    ol,
    li,
    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    pre,
    code,
    form,
    fieldset,
    legend,
    input,
    textarea,
    p,
    blockquote,
    th,
    td,
    button,
    article,
    aside,
    details,
    figcaption,
    figure,
    footer,
    header,
    hgroup,
    menu,
    nav,
    section {
        margin: 0;
        padding: 0;
    }
   .root,
    button,
    input,
    select,
    textarea {
        font-family: 'Microsoft YaHei', arial, SimSun, sans-serif, tahoma;
    }
    body {
        font-size: 14px;
        color: #666;
    }
    input,
    select,
    textarea {
        font-size: 100%;
    }
    table {
        border-collapse: collapse;
        border-spacing: 0;
    }
    textarea,
    input,
    button,
    a {
        outline: none;
    }
    button {
        cursor: pointer;
    }
    textarea {
        resize: none;
    }
    fieldset,
    img {
        border: 0;
    }
    address,
    cite,
    code,
    dfn,
    em,
    i,
    th,
    var {
        font-style: normal;
        font-weight: normal;
    }
    ol,
    ul {
        list-style: none;
    }
    caption,
    th {
        text-align: left;
    }
    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
        font-size: 100%;
        font-weight: normal;
    }
    sub,
    sup {
        font-size: 75%;
        line-height: 0;
        position: relative;
        vertical-align: baseline;
    }
    sup {
        top: -0.5em;
    }
    sub {
        bottom: -0.25em;
    }
    a {
        text-decoration: none;
    }
    .clearfix:before,
    .clearfix:after {
        content: "";
        display: table;
    }
    .clearfix:after {
        clear: both;
        overflow: hidden;
    }
    .clearfix {
        *zoom: 1;
    }
    .fl {
        float: left;
    }
    .fr {
        float: right;
    }
    .hidenone {
        display: none;
    }
    .hide {
        visibility: hidden;
    }
    .mt10 {
        margin-top: 10px;
    }
    .mt20 {
        margin-top: 20px;
    }
    .ml10 {
        margin-left: 10px;
    }
    .mr10 {
        margin-right: 10px;
    }
    .pt10 {
        padding-top: 10px;
    }
    .pt20 {
        padding-top: 20px;
    }
    .pl10 {
        padding-left: 10px;
    }
    .pr10 {
        padding-right: 10px;
    }
    .tc {
        text-align: center;
    }
    .vm {
        display: inline-block;
        vertical-align: middle;
    }
    *,
    *:after,
    *:before {
        box-sizing: border-box;
    }
    /* html,
  body {
    height: 100%;
  }
  */
    .wrap {
        margin: -25vw auto;
        height: 100%;
        background-size: cover;
    }
    .wrap:after {
        content: "";
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
        background: inherit;
        filter: blur(3px);
        z-index: 1;
    }
    .wrap-box {
        position: absolute;
        width: 840px;
        height: 320px;
        background: rgba(0, 0, 0, .6);
        z-index: 2;
        box-shadow: 0 0 10px 1px rgba(169, 169, 169, .2);
        border-radius: 3px;
        top: calc(50% - 160px);
        left: calc(50% - 410px);
    }
    .box-content {
        display: inline-table;
        width: 100%;
        height: 100%;
    }
    .box-content .sign,
    .box-content .login {
        display: table-cell;
        width: 50%;
        vertical-align: middle;
        line-height: 36px;
    }
    .sign {
        padding-left: 50px;
    }
    .login {
        padding-left: 80px;
    }
    .box-content .title {
        color: #e8e8e8;
        font-size: 22px;
        letter-spacing: 1px;
    }
    .box-content .desc {
        color: #d3d3d3;
        font-size: 14px;
    }
    .box-content button {
        border-radius: 3px;
        border: solid 1px #d3d3d3;
        background-color: transparent;
        color: #d3d3d3;
        width: 124px;
        height: 38px;
        margin: 15px auto 0;
        font-size: 16px;
        transition: all .2s;
    }
    .box-content button:hover {
        border-color: #fff;
        color: #fff;
    }
    .manager-box {
        position: absolute;
        height: 380px;
        width: 400px;
        left: 50px;
        top: -30px;
        perspective: 800px;
    }
    .manager-box.right {
        animation: toRight .5s 1 forwards;
    }
    @keyframes toRight {
        0% {
            left: 50px;
        }
        66% {
            left: 450px;
        }
        100% {
            left: 390px;
        }
    }
    .manager-box.left {
        animation: toLeft .5s 1 forwards;
    }
    @keyframes toLeft {
        0% {
            left: 390px;
        }
        66% {
            left: 10px;
        }
        100% {
            left: 50px;
        }
    }
    .manager-box>* {
        position: absolute;
        z-index: 1;
        transition: all .8s linear;
        transform-style: preserve-3d;
        height: 100%;
        width: 100%;
        background: #fff;
        left: 0;
        padding:  40px;
        border-radius: 3px;
        box-shadow: 0 0 15px 4px rgba(0, 0, 0, .1);
        display: inline-table;
    }
    .manager-box>*>div {
        display: table-cell;
        vertical-align: middle;
    }
    .manager-box .login-part {
        z-index: 0;
        transform: rotateY(-180deg);
    }
    .manager-box .sign-part {
        backface-visibility: hidden;
    }
    .manager-box.active .sign-part {
        transform: rotateY(180deg);
    }
    .manager-box.active .login-part {
        transform: rotateY(0deg);
    }
    .manager-box h3 {
        color: #f78c7b;
        font-size: 22px;
        margin-bottom: 30px;
    }
    .input-box {
        position: relative;
        margin: 30px 0;
    }
    .input-box i {
        position: absolute;
        width: 0;
        bottom: 7px;
        background-color: #f78c7b;
        transition: all .36s;
        right: 20px;
        color: #ccc;
    }
input {
        display: block;
        border: 0;
        border-bottom: solid 1px #ddd;
        line-height: 34px;
        width: 100%;
        transition: all .2s;
        font-size: 16px;
        padding-right: 30px;
    }
    .input-box input::placeholder {
        color: #ccc;
        font-size: 14px;
    }
    .input-box input:focus+i {
        color: #f78c7b;
    }
    .input-box i:after {
        content: '';
        position: absolute;
        right: -20px;
        width: 0;
        height: 1px;
        background-color: #f78c7b;
        transition: all .4s;
        bottom: -7px;
    }
    .input-box input:focus+i:after {
        width: 320px;
    }
    .manager-box button {
        border-radius: 0;
        width: 30% !important;
        height: 5vh;
        float: right;
        color: #fff;
        background-color: #f78c7b;
        border: 0;
        font-size: 16px;
    }
    .manager-box button:hover {
        background: radial-gradient(circle at center, rgba(0, 0, 0, 0) 30%, #eeeeff 60%, #eeeeff 65%, rgba(0, 0, 0, 0) 70%) 53% 105% / 10px 10px, radial-gradient(circle at center, rgba(0, 0, 0, 0) 30%, #eeeeff 60%, #eeeeff 65%, rgba(0, 0, 0, 0) 70%) 16% 132% / 12px 12px, radial-gradient(circle at center, rgba(0, 0, 0, 0) 30%, #eeeeff 60%, #eeeeff 65%, rgba(0, 0, 0, 0) 70%) 56% 94% / 8px 8px, radial-gradient(circle at center, rgba(0, 0, 0, 0) 30%, #eeeeff 60%, #eeeeff 65%, rgba(0, 0, 0, 0) 70%) 42% 126% / 14px 14px, radial-gradient(circle at center, rgba(0, 0, 0, 0) 30%, #eeeeff 60%, #eeeeff 65%, rgba(0, 0, 0, 0) 70%) 11% 119% / 11px 11px, radial-gradient(circle at center, rgba(0, 0, 0, 0) 30%, #eeeeff 60%, #eeeeff 65%, rgba(0, 0, 0, 0) 70%) 69% 143% / 9px 9px, radial-gradient(circle at center, rgba(0, 0, 0, 0) 30%, #eeeeff 60%, #eeeeff 65%, rgba(0, 0, 0, 0) 70%) 107% 141% / 6px 6px, radial-gradient(circle at center, rgba(0, 0, 0, 0) 30%, #eeeeff 60%, #eeeeff 65%, rgba(0, 0, 0, 0) 70%) 51% 132% / 10px 10px, radial-gradient(circle at center, rgba(0, 0, 0, 0) 30%, #eeeeff 60%, #eeeeff 65%, rgba(0, 0, 0, 0) 70%) 20% 121% / 15px 15px, radial-gradient(circle at center, rgba(0, 0, 0, 0) 30%, #eeeeff 60%, #eeeeff 65%, rgba(0, 0, 0, 0) 70%) 68% 121% / 6px 6px, radial-gradient(circle at center, rgba(0, 0, 0, 0) 30%, #eeeeff 60%, #eeeeff 65%, rgba(0, 0, 0, 0) 70%) 22% 127% / 11px 11px;
        background-color: #e27b75;
        background-repeat: no-repeat;
        animation: bubbles .7s forwards ease-out;
    }
    @keyframes bubbles {
        100% {
            background-position: 48% -266%, 17% -396%, 58% -137%, 33% -360%, 21% -368%, 77% -137%, 114% -391%, 43% -2%, -1% -41%, 60% -207%, 27% -149%;
            box-shadow: inset 0 -60px 0 #c56868;
        }
    }
    .manager-box .buttons {
        margin-top: 40px;
        line-height: 39px;
    }
    .manager-box .buttons a {
        position: relative;
        color: #999;
    }
    .manager-box .buttons a:hover {
        color: #f78c7b;
    }
    * {
        margin: 0;
        padding: 0;
        border: 0;
        box-sizing: border-box;
        /* &:before,
    &:after {
        box-sizing: inherit; */
        /* } */
    }
    /* html {
    width: 100vw;
    height: 100vh;
  } */
    .start-screen {
      color: #ccc;
        display: flex;
        justify-content: center;
        flex-flow: nowrap column;
        align-items: center;
        min-height: 30vh;
        margin: 0vw auto;
    }
    .loading {
        display: flex;
        margin: 1.6vw 0;
    }
    .loading__element {
        font: normal 100 2rem/1 Roboto;
        letter-spacing: .5em;
    }
    .start-screen [class*="el"] {
        animation: bouncing 5s infinite ease;
    }
    @keyframes bouncing {
        0%,
        100% {
            transform: scale3d(1, 1, 1);
        }
        50% {
            transform: scale3d(0, 0, 1);
        }
    }
    .img>img {
        width: 6vw;
        height: 6vw;
        margin-left: -9vw;
        margin-top: -2vw;
    }
  }
  /* 超小屏幕 */
  @media screen and (max-width:800px) {
  #root {
        background-color: #1fa2ed;
        color: #fff;
    }
    .start-screen {
        display: flex;
        justify-content: center;
        flex-flow: nowrap column;
        align-items: center;
        min-height: 100vh;
        margin: 1vw auto;
    }
    .loading {
        display: flex;
        margin: 2.4vw 0;
    }
    .loading__element {
        font: normal 100 2rem/1 Roboto;
        letter-spacing: .5em;
    }
    [class*="el"] {
        animation: bouncing 5s infinite ease;
    }
    @keyframes bouncing {
        0%,
        100% {
            transform: scale3d(1, 1, 1);
        }
        50% {
            transform: scale3d(0, 0, 1);
        }
    }
    .img>img {
        width: 20vw;
        height: 20vw;
    }
    .img {
        position: absolute;
        top: 13vw;
        left: 38vw;
    }
    .wrap {
        display: none;
    }
   .root{
        background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
        background-size: 400% 400%;
        animation: gradient 15s ease infinite;
        height: 100vh;
    }
    .back {

        background-size: contain;
        animation: gradient 15s ease infinite;
    }
    @keyframes gradient {
        0% {
            background-position: 0% 50%;
        }
        50% {
            background-position: 100% 50%;
        }
        100% {
            background-position: 0% 50%;
        }
    }
  }
</style>

<!-- <style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg:#283443;
$light_gray:#fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }

  .thirdparty-button {
    position: absolute;
    right: 0;
    bottom: 6px;
  }

  @media only screen and (max-width: 470px) {
    .thirdparty-button {
      display: none;
    }
  }
}
</style> -->
