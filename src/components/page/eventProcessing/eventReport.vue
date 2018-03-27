<template>
  <div class="eventReport">
    <aside class="report-menu">
      <section :class="{active:reportMenu.medical}">医疗事件</section>
      <section :class="{active:reportMenu.event}">事件情况描述</section>
      <section :class="{active:reportMenu.common}">一般情况</section>
      <section :class="{active:reportMenu.site}">现场情况</section>
      <section :class="{active:reportMenu.others}">其他情况</section>
    </aside>
    <aside class="report-table">
      根据后台返回的数据生成对应的页面元素（不可编辑）
      分析报告和追踪报告类似
    </aside>
  </div>
</template>

<script>

  export default {
    name: "eventReport",
    data(){
      return{
        reportMenu: {
          medical: true,
          event: false,
          common: false,
          site: false,
          others: false
        }
      }
    }
  }
</script>

<style>
  .eventReport{
    width: 100%;
    height: 100%;
    display: flex;
  }
  .eventReport .report-menu{
    flex: 1;
    height: 100%;
    text-align: center;
    border-left: 1px solid #666;
    border-right: 1px solid #666;
  }
  .eventReport .report-menu section{padding: 8px 0;border-bottom: 1px solid #666;}
  .eventReport .report-table{
    flex: 9;
    width: 100%;
    height: 100%;
    border: 1px solid #666;
  }
  .active{background: #CCCCCC;}
</style>
