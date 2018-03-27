<template>
    <div class="eventHeader">
      <aside class="h-left">
        <section><i class="proFont" style="font-size: 35px;">&#xe62b;</i></section>
        <section :class="{active:activeControl.basicInfo}" @click="monitorActiveBtn('basicInfo','showBasicInfo')">基本信息</section>
        <section :class="{active:activeControl.eventAbstract}" @click="monitorActiveBtn('eventAbstract','showAbstract')">事件摘要</section>
        <section :class="{active:activeControl.eventReport}" @click="monitorActiveBtn('eventReport','showReport')">事件报告</section>
        <section :class="{active:activeControl.msaReport}" @click="monitorActiveBtn('msaReport','showMsaReport')">分析报告</section>
        <section :class="{active:activeControl.trackReport}" @click="monitorActiveBtn('trackReport','showTrackReport')">追踪报告</section>
        <section :class="{active:activeControl.fishboneMsa}" @click="monitorActiveBtn('fishboneMsa','showFishboneMsa')">鱼骨分析</section>
        <section :class="{active:activeControl.personAdvice}" @click="monitorActiveBtn('personAdvice','showPersonAdvice')">个人建议</section>
      </aside>
      <aside class="h-right">
        <section></section>
        <section><el-button type="danger" plain size="small" style="width: 120px;">导出word</el-button></section>
        <section><el-button type="success" plain size="small" style="width: 120px;">提交</el-button></section>
      </aside>
    </div>
</template>
<script>
  export default {
      name: "eventHeader",
      data() {
        return{
          activeControl:{
            basicInfo: true,
            eventAbstract: false,
            eventReport: false,
            msaReport: false,
            trackReport: false,
            fishboneMsa: false,
            personAdvice: false
          }
        }
      },
    methods: {
      monitorActiveBtn: function (activeName, pageName){
        for(let i in this.activeControl){
          if(i == activeName){
            this.activeControl[i] = true;
          }else {
            this.activeControl[i] = false;
          }
        }
        this.$emit("monitorActivePage", pageName);
      },
      activePage: function (name) {
        //this.$emit("monitorActivePage", name);
      },
    }
  }
</script>

<style>
  .eventHeader{
    width: 100%;
    height: 40px;
    display: flex;
    border: 1px solid #797979;
    background-color: #CCCCCC;
    z-index: 100;
    min-width: 1048px;
  }
  .eventHeader .h-left,.eventHeader .h-right{display: flex;}
  .eventHeader .h-left{flex: 7;}
  .eventHeader .h-right{flex: 3;}
  .eventHeader .h-left section{border-right: 1px solid #797979;}
  .eventHeader .h-left section,.eventHeader .h-right section{
    flex: 1;
    text-align: center;
    line-height: 40px;
    font-size: 16px;
    cursor: pointer;
  }
  .active{background-color: #666;}
</style>
