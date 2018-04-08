<template>
  <article class="moduleSetup">
    <aside class="moduleSetup-content">
      <section>
        <label>事件报告模块:</label>
        <el-select
          v-model="allPageData.REPORTMODULES"
          multiple
          collapse-tags
          size="small"
          placeholder="请选择">
          <el-option
            v-for="item in moduleList"
            :key="item.ID"
            :label="item.NAME"
            :value="item.ID">
          </el-option>
        </el-select>
      </section>
      <section>
        <label>事件报告数据源:</label>
        <el-select v-model="allPageData.REPORTSOURCE" placeholder="请选择" size="small">
          <el-option
            v-for="item in eventDataSource"
            :key="item.VALUE"
            :label="item.DISPLAY"
            :value="item.VALUE">
          </el-option>
        </el-select>
      </section>
      <section>
        <label>事件分析模块:</label>
        <el-select
          v-model="allPageData.ANALYSISMODULES"
          multiple
          collapse-tags
          size="small"
          placeholder="请选择">
          <el-option
            v-for="item in moduleList"
            :key="item.ID"
            :label="item.NAME"
            :value="item.ID">
          </el-option>
        </el-select>
      </section>
      <section>
        <label>分析报告数据源:</label>
        <el-select v-model="allPageData.ANALYSISSOURCE" placeholder="请选择" size="small">
          <el-option
            v-for="item in eventDataSource"
            :key="item.VALUE"
            :label="item.DISPLAY"
            :value="item.VALUE">
          </el-option>
        </el-select>
      </section>
      <section>
        <label>追踪报告模块:</label>
        <el-select
          v-model="allPageData.TRACKMODULES"
          multiple
          collapse-tags
          size="small"
          placeholder="请选择">
          <el-option
            v-for="item in moduleList"
            :key="item.ID"
            :label="item.NAME"
            :value="item.ID">
          </el-option>
        </el-select>
      </section>
      <section>
        <label>追踪报告数据源:</label>
        <el-select v-model="allPageData.TRACKSOURCE" placeholder="请选择" size="small">
          <el-option
            v-for="item in eventDataSource"
            :key="item.VALUE"
            :label="item.DISPLAY"
            :value="item.VALUE">
          </el-option>
        </el-select>
      </section>
    </aside>
    <el-button type="danger" style="padding: 10px 40px;margin: 50px 0 50px 0;" @click="moduleSubmit">保存</el-button>
  </article>
</template>

<script>
export default {
  name: "moduleSetup",
  data(){
    return{
      eventDataSource:[],
      moduleList: [],
    }
  },
  props: ["allPageData"],
  mounted: function () {
    this.getModuleDictionary();
    this.getModulelist();
  },
  methods: {
    moduleSubmit: function () {
      let a1 = this.allPageData.DEFAULTMANAGEDEALDEPT;
      let DEFAULTMANAGEDEALDEPT;
      if(this.allPageData.DEFAULTMANAGEDEALDEPT != null && this.allPageData.DEFAULTMANAGEDEALDEPT.length != 0){
        DEFAULTMANAGEDEALDEPT = a1.join(",");
      }else {
        DEFAULTMANAGEDEALDEPT = "";
      }

      let a2 = this.allPageData.DEALDEPT;
      var DEALDEPT;
      if(this.allPageData.DEALDEPT != null && this.allPageData.DEALDEPT.length != 0){
        DEALDEPT = a2.join(",");
      }else {
        DEALDEPT = "";
      }

      let a3 = this.allPageData.FINDDEALMODE;
      let FINDDEALMODE;
      if(this.allPageData.FINDDEALMODE != null && this.allPageData.FINDDEALMODE.length != 0){
        FINDDEALMODE = a3.join(",");
      }else {
        FINDDEALMODE = "";
      }

      let a4 = this.allPageData.DEALDEALMODE;
      let DEALDEALMODE;
      if(this.allPageData.DEALDEALMODE != null && this.allPageData.DEALDEALMODE.length != 0){
        DEALDEALMODE = a4.join(",");
      }else {
        DEALDEALMODE = "";
      }

      let a5 = this.allPageData.MANAGEDEALMODE;
      let MANAGEDEALMODE;
      if(this.allPageData.MANAGEDEALMODE != null && this.allPageData.MANAGEDEALMODE.length != 0){
        MANAGEDEALMODE = a5.join(",");
      }else {
        MANAGEDEALMODE = "";
      }

      let a6 = this.allPageData.DETAILSHOWMODE;
      let DETAILSHOWMODE;
      if(this.allPageData.DETAILSHOWMODE != null && this.allPageData.DETAILSHOWMODE.length != 0){
        DETAILSHOWMODE = a6.join(",");
      }else {
        DETAILSHOWMODE = "";
      }

      let a7 = this.allPageData.DEFAULTASSISTDEALDEPT;
      let DEFAULTASSISTDEALDEPT;
      if(this.allPageData.DEFAULTASSISTDEALDEPT != null && this.allPageData.DEFAULTASSISTDEALDEPT.length != 0){
        DEFAULTASSISTDEALDEPT = a7.join(",");
      }else {
        DEFAULTASSISTDEALDEPT = "";
      }

      let a8 = this.allPageData.REPORTMODULES;
      let REPORTMODULES;
      if(this.allPageData.REPORTMODULES != null && this.allPageData.REPORTMODULES.length != 0){
        REPORTMODULES = a8.join(",");
      }else {
        REPORTMODULES = "";
      }

      let a9 = this.allPageData.ANALYSISMODULES;
      let ANALYSISMODULES;
      if(this.allPageData.ANALYSISMODULES != null && this.allPageData.ANALYSISMODULES.length != 0){
        ANALYSISMODULES = a9.join(",");
      }else {
        ANALYSISMODULES = "";
      }

      let a10 = this.allPageData.TRACKMODULES;
      let TRACKMODULES;
      if(this.allPageData.TRACKMODULES != null && this.allPageData.TRACKMODULES.length != 0){
        TRACKMODULES = a10.join(",");
      }else {
        TRACKMODULES = "";
      }

      var data = {
        ID: this.submitID,
        TYPEID: this.allPageData.TYPEID,
        ISCLOSED: this.allPageData.ISCLOSED,
        APPFILL: this.allPageData.APPFILL,
        ISUSED: this.allPageData.ISUSED,
        ISOPEN: this.allPageData.ISOPEN,
        NAMECOLOR: this.allPageData.NAMECOLOR,
        SN: this.allPageData.SN,
        REPORTMODE: this.allPageData.REPORTMODE,
        DEALMODE: this.allPageData.DEALMODE,
        DEALDEPT: DEALDEPT,
        DIVISIONLEADER: this.allPageData.DIVISIONLEADER,
        RETURNDEPT: this.allPageData.RETURNDEPT,
        PERFECTREPORTMODE: this.allPageData.PERFECTREPORTMODE,
        ANALYSISREPORTMODE: this.allPageData.ANALYSISREPORTMODE,
        TRACKREPORTMODE: "",
        FINDDEALMODE: FINDDEALMODE,
        DEALDEALMODE: DEALDEALMODE,
        MANAGEDEALMODE: MANAGEDEALMODE,
        DETAILSHOWMODE: DETAILSHOWMODE,
        DEFAULTASSISTDEALDEPT: DEFAULTASSISTDEALDEPT,
        DEFAULTMANAGEDEALDEPT: DEFAULTMANAGEDEALDEPT,
        DEALTIMELIMIT: this.allPageData.DEALTIMELIMIT,
        AUTODEALTIME: this.allPageData.AUTODEALTIME,
        CLOSETIMELIMIT: this.allPageData.CLOSETIMELIMIT,
        AUTOCLOSETIME: this.allPageData.AUTOCLOSETIME,
        REPORTMODULES: REPORTMODULES,
        REPORTSOURCE: this.allPageData.REPORTSOURCE,
        ANALYSISMODULES: ANALYSISMODULES,
        ANALYSISSOURCE: this.allPageData.ANALYSISSOURCE,
        TRACKMODULES: TRACKMODULES,
        TRACKSOURCE: this.allPageData.TRACKSOURCE,
      }
      console.log(data)
      this.$http.post('/event/cfg/save', data).then(res => {
        if (res.code == 10000) {
          this.$message.success("保存成功！");
        } else {
          this.$message.error(res.msg);
        }
      }).catch(function (error) {//加上catch
        console.log(error);
      });
    },
    select: function (id) {
      console.log(id)
    },
    //查询列表模块
    getModulelist:function () {
      this.$http.post('/module/modules').then(res => {
        if (res.code == 10000) {
          this.moduleList = res.data;
        } else {
          this.$message.error(res.msg);
        }
      }).catch(function (error) {//加上catch
        console.log(error);
      });
    },
    getModuleDictionary: function () {
      this.$http.post('/dic/getDicByKey/reportdatasource').then(res => {
        if (res.code == 10000) {
          this.eventDataSource = res.data;
        } else {
          this.$message.error(res.msg);
        }
      }).catch(function (error) {//加上catch
        console.log(error);
      });
    }
  }
}
</script>

<style>
  .moduleSetup{
    height: 100%;
    width: 100%;
    overflow: auto;
    padding: 30px 20px;
    box-sizing: border-box;
  }
  .moduleSetup .moduleSetup-content section{padding: 7px 0;}
  .moduleSetup .moduleSetup-content section label{
    display: inline-block;
    width: 100px;
    text-align: left;
    margin-right: 10px;
  }
  .moduleSetup .moduleSetup-content{height: auto!important;}
  .moduleSetup .moduleSetup-content section label{
    width: 100px;
  }
</style>
