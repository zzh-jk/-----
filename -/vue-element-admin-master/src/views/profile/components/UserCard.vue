<template>
  <el-card style="margin-bottom:20px;">
    <div slot="header" class="clearfix">
      <span>关于我</span>
    </div>

    <div class="user-profile">
      <div class="box-center">
      <div style="height:100px weight:100px"><img src="../../../assets/logo1.png" alt=""></div>
      </div>
      <div class="box-center">
        <div class="user-name text-center">{{ user.name }}</div>
        <!-- <div class="user-role text-center text-muted">{{ user.role | uppercaseFirst }}</div> -->
      </div>
    </div>

    <div class="user-bio">
      <div class="user-education user-bio-section">
        <div class="user-bio-section-header"><svg-icon icon-class="education" /><span>个人简介</span></div>
        <div class="user-bio-section-body">
          <div class="text-muted">
            街道的门铁门被拉上 只剩转角霓虹灯还在闪 这城市的小巷 雨下一整晚
          </div>
        </div>
      </div>
      <div class="user-skills user-bio-section">
        <div class="user-bio-section-header"><svg-icon icon-class="skill" /><span>进度</span></div>
        <div class="user-bio-section-body">
          <div class="progress-item">
            <span>医疗&健康</span>
            <el-progress :percentage="70" />
          </div>
          <div class="progress-item">
            <span>智能化养老</span>
            <el-progress :percentage="18" />
          </div>
          <div class="progress-item">
            <span>志愿服务</span>
            <el-progress :percentage="12" />
          </div>
          <div class="progress-item">
            <span>老年服务</span>
            <el-progress :percentage="100" status="success" />
          </div>
        </div>
      </div>
    </div>
  </el-card>
</template>

<script>

export default {
  props: {
    user: {
      type: Object,
      default: () => {
        return {
          name: 'jay',
          email: '',
          avatar: '',
          role: ''
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>

.box-center {
  margin: 0 auto;
  display: table;
}

.text-muted {
  color: #777;
}

.user-profile {
  .user-name {
    font-weight: bold;
  }

  .box-center {
    padding-top: 10px;
  }

  .user-role {
    padding-top: 10px;
    font-weight: 400;
    font-size: 14px;
  }

  .box-social {
    padding-top: 30px;

    .el-table {
      border-top: 1px solid #dfe6ec;
    }
  }

  .user-follow {
    padding-top: 20px;
  }
}

.user-bio {
  margin-top: 20px;
  color: #606266;

  span {
    padding-left: 4px;
  }

  .user-bio-section {
    font-size: 14px;
    padding: 15px 0;

    .user-bio-section-header {
      border-bottom: 1px solid #dfe6ec;
      padding-bottom: 10px;
      margin-bottom: 10px;
      font-weight: bold;
    }
  }
}
</style>
