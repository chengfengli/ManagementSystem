<template>
  <div class="eventList">
    <section class="eventList-h">
      <eventHeader @monitorActivePage="monitorActivePage" :monitorBtn="monitorBtn"></eventHeader>
    </section>
    <section class="eventList-m">
      <basicInfo v-if="monitorBtn.showBasicInfo" ></basicInfo>
      <eventAbstract v-if="monitorBtn.showEventAbstract"></eventAbstract>
      <eventReport v-if="monitorBtn.showEventReport"></eventReport>
      <msaReport v-if="monitorBtn.showMsaReport" ></msaReport>
      <trackReport v-if="monitorBtn.showTrackReport" ></trackReport>
      <fishboneMsa v-if="monitorBtn.showFishboneMsa" ></fishboneMsa>
      <personAdvice v-if="monitorBtn.showPersonAdvice"></personAdvice>
    </section>
  </div>
</template>

<script>
  import eventHeader from "./eventHeader"
  import basicInfo from "./basicInfo"
  import eventAbstract from "./eventAbstract"
  import eventReport from "./eventReport"
  import msaReport from "./msaReport"
  import trackReport from "./trackReport"
  import fishboneMsa from "./fishboneMsa"
  import personAdvice from "./personAdvice"
  export default {
    name: "eventProcessing",
    data() {
      return{
        monitorBtn: {
          showBasicInfo: true,
          showEventAbstract: false,
          showEventReport: false,
          showMsaReport: false,
          showTrackReport: false,
          showFishboneMsa: false,
          showPersonAdvice: false
        },

      }
    },
    methods: {
      monitorActivePage: function (activePageName) {
        for(let i in this.monitorBtn){
          if(i == activePageName){
            this.monitorBtn[i] = true;
          }else {this.monitorBtn[i] = false;}
        }
      },
    },
    components: {
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
  }
  .eventList .eventList-m{
    height: calc(100% - 70px);
    width: 100%;
    padding-top: 70px;
  }
</style>
