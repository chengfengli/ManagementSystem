<template>
  <div class="eventReport">
    <div class="container">
      <div class="report-menu menu-list">
        <section v-for="(item, index) in reportData"  :class="{active: item.isActive}" @click="activeStyle(item, index)">{{ item.MODNAME }}</section>
        <div class="reportIcon">
          <div>
            <i class="proFont" style="color: red">&#xe628;</i>
            <span>鱼骨组成元素</span>
          </div>
          <div>
            <i class="proFont" style="color: #7AB346">&#xe60b;</i>
            <span>添加、编辑批注信息</span>
          </div>
          <div>
            <i class="proFont" style="color: #7AB346">&#xe624;</i>
            <span>查看、修改历史记录</span>
          </div>
        </div>
      </div>
      <aside class="report-table">
        <article class="table" v-for="data in reportData">
          <div class="table-title" :id="data.MODID">{{ data.MODNAME }}</div>
          <div class="table-data topic" v-for="title in data.ELES">
            <section>
              <i class="proFont" style="color: red;margin-right: 30px;font-size: 25px" v-if="title.ISANAYLIS == 0">&#xe628;</i>
              <span style="margin-right: 30px;width: 200px;display: inline-block;">{{ title.ELENAME }}</span>
              <span>{{ title.VAL }}</span>
            </section>
          </div>
        </article>
        <div v-if="reportData.length <= 0">暂无数据</div>
      </aside>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  export default {
    name: "eventReport",
    props: ["dataId"],
    mounted: function() {
      this.initReport();
    },
    data(){
      return{
        reportData: [],
        reportMenu: {
          medical: true,
          event: false,
          common: false,
          site: false,
          others: false
        }
      }
    },
    methods: {
      activeStyle: function(data, index){
        for(let item of this.reportData){
          if(item.MODID == data.MODID){
            this.reportData[index].isActive= true;
            Vue.set(this.reportData, index, this.reportData[index]);
            var notNeedData =  this.reportData.filter( (notAtive) => {
              return notAtive.MODID != data.MODID;
            })
            for(let noActive of notNeedData){
              noActive.isActive = false;
            }
          }
        }
        document.getElementById(data.MODID).scrollIntoView(true);
      },
      initReport: function(){
        let data = {id:this.dataId}
        this.$http.post('/event/track/'+ this.dataId, data).then( res => {
          if(res.code == 10000){
            this.reportData = res.data;
            for(let item of this.reportData){
              item.isActive = false;
            }
            this.reportData[0].isActive = true;
          }
        }).catch(function (error) {//加上catch
          console.log(error);
        });
      }
    }
  }
</script>

<style>
  .eventReport{
    width: 100%;
    height: 100%;
    padding: 30px 40px;
    box-sizing: border-box;
    overflow-y: auto;
    overflow-x: hidden;
  }
  .eventReport .container{
    width: 100%;
    height: 100%;
  }
  .eventReport .report-menu{
    width: 0;
    height: 100%;
    position: relative;
  }
  .eventReport .menu-list{
    position: fixed;
    top: 155px;
    min-width: 200px;
    height: auto;
    text-align: center;
    border-radius: 6px;
    border: 1px solid #829965;
  }
  .eventReport .report-menu section:hover{
    background: #829965;
    color: white!important;
  }
  .eventReport .report-menu section{
    cursor: pointer;
    width: 100%;
    padding: 15px 0 15px 10px;
    box-sizing: border-box;
    text-align: left;
    border-bottom: 1px solid #829965;
    color: #829965;
  }
  .eventReport .report-menu section:last-child{
    border: none;
  }
  .eventReport .table{
    border-bottom: 1px solid #E4E4E4;
    margin-bottom: 15px;
  }
  .eventReport .table-title{
    font-size: 20px;
    color: #839964;
    padding: 10px 0;
  }
  .eventReport .report-table{
    width: calc(100% - 250px);
    min-width: 300px;
    margin-left: 250px;
  }
  .eventReport .table-data{
    display: flex;
  }
  .eventReport .table-data section{
    border-top: 1px solid #E4E4E4;
    text-align: left;
    flex: 1;
    padding: 10px 0 10px 100px;
    box-sizing: border-box;
    color: #666666;
  }
  .topic:nth-child(even) {
    background: #FFFFFF;
  }
  .topic:nth-child(odd) {
    background: #F5F5F5;
  }
  .eventReport .reportIcon{
    width: 100%;
    text-align: left;
  }
  .eventReport .reportIcon span{color: #8a8a8a}
  .eventReport .reportIcon .proFont{font-size: 30px}
  .eventReport .reportIcon div{
    padding: 10px 0 10px 10px;
    border-bottom: 1px solid #E5E5E5;
  }
  .eventReport .reportIcon div:last-child{border: none;}
  .eventReport .active{background: #829965; color: white!important;}
</style>
