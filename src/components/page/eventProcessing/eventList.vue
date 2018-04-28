<template>
  <div class="eventList">
    <section class="eventList-h">
      <sysHeader></sysHeader>
      <div class="current">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: 'index' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>事件处理</el-breadcrumb-item>
         <!-- <el-breadcrumb-item :to="{ path: 'eventProcessing' }">事件处理</el-breadcrumb-item>
          <el-breadcrumb-item>事件详情</el-breadcrumb-item>-->
        </el-breadcrumb>
      </div>
      <eventHeader @monitorActivePage="monitorActivePage" :dataId="dataId"></eventHeader>
    </section>
    <section class="eventList-m">
      <basicInfo v-if="monitorBtn.showBasicInfo" :dataId="dataId"></basicInfo>
      <eventAbstract v-if="monitorBtn.showAbstract" :dataId="dataId"></eventAbstract>
      <eventReport v-if="monitorBtn.showReport" :dataId="dataId"></eventReport>
      <msaReport v-if="monitorBtn.showMsaReport" :dataId="dataId"></msaReport>
      <trackReport v-if="monitorBtn.showTrackReport" :dataId="dataId"></trackReport>
      <fishboneMsa v-if="monitorBtn.showFishboneMsa" :dataId="dataId"></fishboneMsa>
      <personAdvice v-if="monitorBtn.showPersonAdvice" :dataId="dataId"></personAdvice>
    </section>
  </div>
</template>

<script>
  import sysHeader from  '../../common/Header.vue';
  import eventHeader from "./eventHeader"
  import basicInfo from "./basicInfo"
  import eventAbstract from "./eventAbstract"
  import eventReport from "./eventReport"
  import msaReport from "./msaReport"
  import trackReport from "./trackReport"
  import fishboneMsa from "./fishboneMsa"
  import personAdvice from "./personAdvice"
  export default {
    name: "eventList",
    mounted: function () {

    },
    data() {
      return{
        dataId: this.$route.query.eventID,
        monitorBtn: {
          showBasicInfo: true,
          showAbstract: false,
          showReport: false,
          showMsaReport: false,
          showTrackReport: false,
          showFishboneMsa: false,
          showPersonAdvice: false
        },
      }
    },
    methods: {
      returnOn: function(){
        this.history.go(-1);
      },
      monitorActivePage: function (activePageName) {
        for(let i in this.monitorBtn){
          if(i == activePageName){
            this.monitorBtn[i] = true;
          }else {
            this.monitorBtn[i] = false;
          }
        }
      },
    },
    components: {
      sysHeader,
      eventHeader,
      basicInfo,
      eventAbstract,
      eventReport,
      msaReport,
      trackReport,
      fishboneMsa,
      personAdvice
    }
  }
</script>

<style>
  .eventList{
    height: 100%;
    width: 100%;
    overflow-x: hidden;
    overflow-y: auto;
  }
  .eventList .eventList-m{
    height: 100%;
    width: 100%;
    background: white;
  }
</style>
