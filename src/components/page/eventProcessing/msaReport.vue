<template>
  <div class="eventReport">
    <div class="container">
      <div class="menu-list" style="font-size: 14px;top: 150px;border: none;text-align: left">操作提示：
        <div @click="toeventFill" class="tobgbAA" style="color: #318ABE;margin-left: 5px;display: inline-block;cursor: pointer;font-size: 14px">{{ eventTitle }}</div>
      </div>
      <div class="report-menu menu-list">
        <section v-for="(item, index) in reportData"  :class="{active: item.isActive}" @click="activeStyle(item, index)">{{ item.MODNAME }}</section>
        <div class="reportIcon">
          <div>
            <i class="proFont" style="color: red">&#xe628;</i>
            <span>鱼骨组成元素</span>
          </div>
          <div @click="addModify">
            <i class="proFont" style="color: #7AB346">&#xe60b;</i>
            <span>添加、编辑批注信息</span>
          </div>
          <div @click="viewModify">
            <i class="proFont" style="color: #7AB346">&#xe624;</i>
            <span>查看、修改历史记录</span>
          </div>
        </div>
      </div>
      <aside class="report-table">
        <article class="table" v-for="data in reportData">
          <div class="table-title" :id="data.MODID">{{ data.MODNAME }}</div>
          <div class="table-data topic" v-for="(title, index) in data.ELES">
            <section style="position: relative;cursor: pointer;" @click="monitorTable(title, index)">
              <i class="proFont" style="color: red;margin-right: 30px;font-size: 25px" v-if="title.ISANAYLIS == 0">&#xe628;</i>
              <span style="margin-right: 30px;width: 200px;display: inline-block;">{{ title.ELENAME }}</span>
              <span v-show="title.ELETYPE != 12">{{ title.VAL }}</span><!--@click="downloadType(title.VAL)"-->
              <span v-show="title.ELETYPE == 12">
                <a :href="title.VAL.url" :download="title.VAL.url" target="_blank">{{ title.VAL.name }}</a>
              </span>
              <i class="proFont rightCick1"  @click="viewModify">&#xe60b;</i>
              <i class="proFont rightCick2"  @click="addModify">&#xe624;</i>
            </section>
          </div>
        </article>
        <div v-if="reportData.length <= 0">暂无数据</div>
      </aside>
    </div>
    <div class="addMenuWindow" v-if="showaddModify">
      <div class="container">
        <div class="content">
          <div style="margin: auto;width: 80%;">
            <section>
              <label class="windowtitle">批注:</label>
              <el-input v-model="echoPostil" type="textarea" placeholder="请输入批注内容" size="small " style="display: inline-block;width: 200px;vertical-align: middle"></el-input>
            </section>
            <section style="display: flex;">
              <div class="windowBtn">
                <el-button style="padding: 10px 30px" type="info" round @click="showaddModify = false">取消</el-button>
              </div>
              <div class="windowBtn">
                <el-button style="padding: 10px 30px" type="danger" round @click="addModifySubmit">确定</el-button>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
    <div class="addMenuWindow" v-if="showViewModify">
      <div class="container">
        <div class="content">
          <div style="margin: auto;width: 100%;">
            <section style="text-align: center;" class="clear-fix">
              <div class="set-left frame-main"><!---->
                <span class="frame-title">修改前</span><br/>
                <span class="frame-content">{{ historyData.OLDVAL }}</span>
              </div>
              <div class="set-right frame-main">
                <span class="frame-title" >修改后</span><br/><!---->
                <span class="frame-content">{{ historyData.VAL }}</span>
              </div>
            </section>
            <section style="display: flex;">
              <div class="windowBtn" style="text-align: right;margin-right: 10px">
                <el-button style="padding: 6px 20px" type="danger" round @click="showViewModify = false">关闭</el-button>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  export default {
    name: "msaReport",
    props: ["dataId"],
    mounted: function() {
      this.initReport();
    },
    data(){
      return{
        category: "",
        needModeName: "",
        saveMode: "",
        eventTitle: null,
        historyData: [],
        showaddModify: false,
        showViewModify: false,
        addModifyId: null,
        viewModifyId: null,
        echoPostil: "",
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
      //事件填报
      toeventFill: function () {
        this.$router.push({
          path: "/eventFill",
          query: {
            mode: this.needModeName,
            category: this.category,
            eventId: this.dataId,
            saveMode: this.saveMode
          }
        })
      },
      monitorTable: function (title, index) {
        this.addModifyId = null;
        this.viewModifyId = null;
        this.addModifyId = title.ELEVALID;
        this.viewModifyId = title.ELEVALID;
        //console.log(this.viewModifyId)
      },
      //添加、编辑批注信息提交
      addModifySubmit: function () {
        let data = {
          elevalid: this.addModifyId,
          NOTE: this.echoPostil,
        }
        this.$http.post('/element/updateValNote/'+ data.elevalid, data).then( res => {
          if(res.code == 10000){
            this.$message.success("修改成功！");
            this.showaddModify = false;
          }
        }).catch(function (error) {//加上catch
          console.log(error);
        });
      },
      //添加、编辑批注信息
      addModify: function () {
        console.log(this.addModifyId)
        /*if(this.addModifyId == null){
          return this.$message.error("请选择要修改的数据！");
        }*/
        setTimeout(() => {
          let data = {elevalid: this.addModifyId};
          this.$http.post('/element/getValNote/'+ data.elevalid, data).then( res => {
            if(res.code == 10000){
              this.echoPostil = res.data;
              this.showaddModify = true;
            }
          }).catch(function (error) {//加上catch
            console.log(error);
          });
        })
      },
      //查看、修改历史记录
      viewModify: function () {
        this.showViewModify = true;
        setTimeout(() => {
          let data = {elevalid: this.viewModifyId}
          this.$http.post('/element/getLastUpdateVal/'+ data.elevalid, data).then( res => {
            if(res.code == 10000){
              this.historyData = res.data;
            }
          }).catch(function (error) {//加上catch
            console.log(error);
          });
          console.log(this.viewModifyId)
        },500)
      },
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
        this.$http.post('/event/analysis/'+ this.dataId, data).then( res => {
          if(res.code == 100014){
            this.category = "ANALYSIS";
            this.eventTitle = "填写分析报告";
            this.needModeName = "FILL";
            this.saveMode = "fillAnalysis";
          }
          if(res.code == 10000){
            this.category = "ANALYSIS";
            this.eventTitle = "编辑分析报告";
            this.needModeName = "EDIT";
            this.saveMode = "editAnalysis";
            this.reportData = res.data.DATA;
            for(let item of this.reportData){
              item.isActive = false;
              for(let itemSon of item.ELES){
                itemSon.activeTable = false;
                if(itemSon.ELETYPE == 12){
                  let aaaa = itemSon.VAL.split(',');
                  for(let val of aaaa){
                    let typeData = val.split('|')
                    let eventType = {
                      name: typeData[0],
                      url: typeData[1]
                    }
                    itemSon.VAL = eventType;
                  }
                  console.log(itemSon)
                }
              }
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
  .tobgbAA:hover{color: red!important;}
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
    top: 180px;
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
  .eventReport .table-data section:hover{background: #CCC;}
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
  .eventReport .rightCick1,.eventReport .rightCick2{
    display: inline-block;
    color: #7AB346;
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
    font-size: 25px;
    cursor: pointer;
  }
  .eventReport .rightCick1{right: 15px}
  .eventReport .rightCick2{right: 65px}
  .eventReport .addMenuWindow{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    /*border: 1px solid red;*/
    background: rgba(128, 128, 128, 0.5);
    z-index: 200;
  }
  .eventReport .addMenuWindow .container{
    width: 100%;
    height: 100%;
    position: relative;
  }
  .eventReport .addMenuWindow .content{
    position: absolute;
    top: 50%;
    left: 50%;
    min-width: 500px;
    height: auto;
    transform: translate(-50%, -50%);
    background: white;
    padding: 30px 20px 5px 20px;
    box-sizing: border-box;
    z-index: 1000;
    border-radius: 3px;
  }
  .eventReport .addMenuWindow .windowtitle{
    display: inline-block;
    text-align: right;
    width: 65px;
    margin-right: 10px;
  }
  .eventReport .addMenuWindow .content section{margin-bottom: 20px;}
  .eventReport .addMenuWindow .windowBtn{flex: 1;text-align: center;margin-top: 5px;}
  .eventReport .addMenuWindow .echo-data{ display: flex; text-align: center;}
  .eventReport .addMenuWindow .echo-data div{ flex: 1;}

  .eventReport .frame-main{
    border: 1px solid #EBEEF5;
    width: 49%;
    min-height: 300px;
  }
  .eventReport .frame-title{
    font-size: 18px;
    background: #829965;
    color: white;
    display: inline-block;
    width: 100%;
    padding: 10px 0;

  }
  .eventReport .frame-content{
    height: auto;
    width: 100%;
    display: inline-block;
    margin-top: 10px;
  }
</style>
