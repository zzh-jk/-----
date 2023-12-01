<template>
  <div class="user-activity">
    <div class="post">
      <div class="user-block">
        <img class="img-circle" src="../../../assets/bgc.png">
        <span class="username text-muted">健康的老人1</span>
        <span class="description">公开分享 - 7:30 PM 今天</span>
      </div>
      <p>
     这个密码怎么修改能联系一下客服吗？
      </p>
      <ul class="list-inline">
        <li>
          <span class="link-black text-sm">
            <i class="el-icon-share" />
            喜欢
          </span>
        </li>
        <li>
          <span class="link-black text-sm">
            <svg-icon icon-class="like" />
            分享
          </span>
        </li>
      </ul>
    </div>
    <div class="post">
      <div class="user-block">
        <img class="img-circle" src="../../../assets/智慧3.png">
        <span class="username text-muted">幸福的老人2</span>
        <span class="description">发给你了 1 条消息 - 昨天</span>
      </div>
      <p>
     我这边向参加一个活动但是申请过期了，你能麻烦通过一下吗？
      </p>
      <ul class="list-inline">
        <li>
          <span class="link-black text-sm">
            <i class="el-icon-share" />
           分享
          </span>
        </li>
        <li>
          <span class="link-black text-sm">
            <svg-icon icon-class="like" />
            喜欢
          </span>
        </li>
      </ul>
    </div>
    <div class="post">
      <div class="user-block">
        <img class="img-circle" src="../../../assets/logo1.png">
        <span class="username">智慧养老宝</span>
        <span class="description">发布了 4 张照片 - 2 天前</span>
      </div>
      <div class="user-images">
        <el-carousel :interval="6000" type="card" height="220px">
          <el-carousel-item>
            <img src= "../../../assets/智慧1.png" class="image">
          </el-carousel-item>
          <el-carousel-item>
            <img src= "../../../assets/智慧2.png" class="image">
          </el-carousel-item>
          <el-carousel-item>
            <img src= "../../../assets/智慧3.png" class="image">
          </el-carousel-item>
          <el-carousel-item>
            <img src= "../../../assets/bgc.png" class="image">
          </el-carousel-item>
        </el-carousel>
      </div>
      <ul class="list-inline">
        <li><span class="link-black text-sm"><i class="el-icon-share" />分享</span></li>
        <li>
          <span class="link-black text-sm">
            <svg-icon icon-class="like" /> 分享</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      carouselImages: [
        '../../../assets/bgc.png',
        '@assets/智慧1.png',
        '@assets/智慧2.png',
        '@assets/智慧3.png'
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.user-activity {
  .user-block {

    .username,
    .description {
      display: block;
      margin-left: 50px;
      padding: 2px 0;
    }

    .username{
      font-size: 16px;
      color: #000;
    }

    :after {
      clear: both;
    }

    .img-circle {
      border-radius: 50%;
      width: 40px;
      height: 40px;
      float: left;
    }

    span {
      font-weight: 500;
      font-size: 12px;
    }
  }

  .post {
    font-size: 14px;
    border-bottom: 1px solid #d2d6de;
    margin-bottom: 15px;
    padding-bottom: 15px;
    color: #666;

    .image {
      width: 100%;
      height: 100%;

    }

    .user-images {
      padding-top: 20px;
    }
  }

  .list-inline {
    padding-left: 0;
    margin-left: -5px;
    list-style: none;

    li {
      display: inline-block;
      padding-right: 5px;
      padding-left: 5px;
      font-size: 13px;
    }

    .link-black {

      &:hover,
      &:focus {
        color: #999;
      }
    }
  }

}

.box-center {
  margin: 0 auto;
  display: table;
}

.text-muted {
  color: #777;
}
</style>
