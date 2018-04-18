<template>
  <div class="eventAbstract">
    <article>
      <aside style="padding: 40px 0 0 0">
        <section class="eventAbstract-title" style="width: 85%;margin: auto;font-size: 20px;padding-bottom: 20px">事件报告</section>
        <section class="eventAbstract-table" style="width: 80%;margin: auto;">
          <el-table
            :show-header="false"
            :data="REPORTData"
            stripe
            style="width: 100%">
            <el-table-column
              prop="LABEL"
              label=""
              width="180">
            </el-table-column>
            <el-table-column
              prop="ID"
              label=""
              width="180">
            </el-table-column>
            <el-table-column
              prop="VAL"
              label="">
            </el-table-column>
          </el-table>
        </section>
      </aside>
      <aside style="padding: 40px 0 0 0">
        <section class="eventAbstract-title" style="width: 85%;margin: auto;font-size: 20px;padding-bottom: 20px">科室处理情况</section>
        <section class="eventAbstract-table" style="width: 80%;margin: auto;">
          <el-table
            :show-header="false"
            :data="ANALYSISData"
            stripe
            style="width: 100%">
            <el-table-column
              prop="LABEL"
              label="日期"
              width="180">
            </el-table-column>
            <el-table-column
              prop="ID"
              label="姓名"
              width="180">
            </el-table-column>
            <el-table-column
              prop="VAL"
              label="地址">
            </el-table-column>
          </el-table>
        </section>
      </aside>
      <aside style="padding: 40px 0 0 0">
        <section class="eventAbstract-title" style="width: 85%;margin: auto;font-size: 20px;padding-bottom: 20px">事件影响</section>
        <section class="eventAbstract-table" style="width: 80%;margin: auto;">
          <el-table
            :show-header="false"
            :data="TRACKData"
            stripe
            style="width: 100%">
            <el-table-column
              prop="LABEL"
              label="日期"
              width="180">
            </el-table-column>
            <el-table-column
              prop="ID"
              label="姓名"
              width="180">
            </el-table-column>
            <el-table-column
              prop="VAL"
              label="地址">
            </el-table-column>
          </el-table>
        </section>
      </aside>
    </article>
  </div>
</template>

<script>
  export default {
    name: "eventAbstract",
    props: ["dataId"],
    mounted: function() {
      this.initAbstract();
    },
    data(){
      return{
        REPORTData: [],
        ANALYSISData: [],
        TRACKData: [],
      }
    },
    methods: {
      initAbstract: function(){
        let data = {id:this.dataId}
        this.$http.post('/event/summary/'+ this.dataId, data).then( res => {
          if(res.code == 10000){
            /*REPORTData: [],
            ANALYSISData: [],
            TRACKData: [],*/
            this.REPORTData = res.data.REPORT;
            this.ANALYSISData = res.data.ANALYSIS;
            this.TRACKData = res.data.TRACK;
          }
        }).catch(function (error) {//加上catch
          console.log(error);
        });
      }
    }
  }
</script>

<style>
  .eventAbstract{
    width: 100%;
    height: 100%;
    overflow: auto;
  }
  .eventAbstract .el-table__row td{padding: 10px 0!important;}
  .eventAbstract article aside:last-child{padding-bottom: 40px!important;}
  .eventAbstract .el-table .cell{text-align: center;}
</style>
