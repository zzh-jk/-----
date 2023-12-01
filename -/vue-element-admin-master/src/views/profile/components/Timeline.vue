<template>
  <div class="block">
    <el-timeline>
      <el-timeline-item v-for="(item,index) of timeline" :key="index" :timestamp="item.timestamp" placement="top">
        <el-card>
          <h4>{{ item.title }}</h4>
          <p>{{ item.content }}</p>
        </el-card>
      </el-timeline-item>
    </el-timeline>
  </div>
</template>

<script>
export default {
  data() {
    return {
      timeline: [
        {
          timestamp: '2023/4/20',
          title: '更新了老人活动中心',
          content: '老人活动中心 2023/4/20 20:46'
        },
        {
          timestamp: '2023/4/21',
          title: '更新了志愿服务',
          content: '志愿服务 203/4/21 20:46'
        },
        {
          timestamp: '2023/4/22',
          title: '建立医生服务系统',
          content: '医疗&健康 2013/4/22 20:46'
        },
        {
          timestamp: '2013/4/23',
          title: '预约服务投入使用',
          content: '养老服务预约 2023/4/23 20:46'
        }
      ]
    }
  }
}
</script>
