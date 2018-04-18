<template>
  <div class="eventReport">
    <div class="container clear-fix" v-for="item in reportData">
      <aside class="report-menu set-left">
        <section @click="activeStyle('medical')">{{ item.MODNAME }}</section>
        <!-- <section :class="{active:reportMenu.event}" @click="activeStyle('event')">事件情况描述</section>
         <section :class="{active:reportMenu.common}" @click="activeStyle('common')">一般情况</section>
         <section :class="{active:reportMenu.site}" @click="activeStyle('site')">现场情况</section>
         <section :class="{active:reportMenu.others}" @click="activeStyle('others')">其他情况</section>-->
      </aside>
      <aside class="report-table set-right">
        <div v-for="data in reportTableData"></div>
        <!--<el-table
          :show-header="false"
          :data="reportTableData"
          stripe
          style="width: 100%">
          <el-table-column
            v-for="data in reportTableData"
            :prop="data.MODNAME"
            label="日期"
            width="180">
          </el-table-column>
        </el-table>-->
      </aside>
    </div>
  </div>
</template>

<script>
  export default {
    name: "eventReport",
    props: ["dataId"],
    mounted: function() {
      this.initReport();
    },
    data(){
      return{
        reportData: [],
        reportTableData: [],
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
      activeStyle: function(name){
        for(let item in this.reportMenu){
          if(item == name){
            this.reportMenu[item] = true;
          }else{
            this.reportMenu[item] = false;
          }
        }
      },
      initReport: function(){
        let data = {id:this.dataId}
        this.$http.post('/event/report/'+ this.dataId, data).then( res => {
          if(res.code == 10000){
            this.reportData = res.data;
            for(let item of res.data){
              this.reportTableData.push(item.ELES)
            }
            console.log(this.reportTableData)
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
  }
  .eventReport .report-menu{
    width: 20%;
    text-align: center;
    border: 1px solid red;
  }
  .eventReport .report-table{
    width: 75%;
    border: 1px solid red;
  }
  .eventReport .report-menu section{
    padding: 10px 0 10px 10px;
    text-align: left;
    border-radius: 6px;
  }
  .active{background: #829965; color: white;}
</style>
