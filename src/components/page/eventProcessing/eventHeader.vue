<template>
    <div class="eventHeader">
      <aside class="h-left">
        <div class="set-up" v-if="showSetUp">
          <div class="setup-type">
            <label class="type-label">事件等级</label>
            <el-radio v-model="setUpData.LEVEL" :label="item.VALUE" v-for="item in eventlevel">{{item.DISPLAY}}</el-radio>
          </div>
          <div class="setup-type">
            <label class="type-label">事件标识</label>
            <el-radio v-model="setUpData.FLAG" :label="flag.VALUE" v-for="flag in eventflag">{{flag.DISPLAY}}</el-radio>
          </div>
          <div class="setup-type">
            <label class="type-label">是否置顶</label>
            <el-checkbox v-model="setUpData.TOP"></el-checkbox>
          </div>
          <div class="setup-type">
            <label class="type-label">事件打分</label>
            <el-rate v-model="setUpData.GRADE" style="display: inline-block"></el-rate>
          </div>
          <div class="setup-type">
            <label class="type-label">上报卫计委</label>
            <el-checkbox v-model="setUpData.REPORTTOCOMMISSION"></el-checkbox>
          </div>
          <div class="setup-type">
            <label class="type-label">开放</label>
            <el-checkbox v-model="setUpData.ISOPEN"></el-checkbox>
          </div>
          <div>
            <el-button @click="showSetUp = false, isActiveFont = false" type="info" plain style="padding: 8px 10px;box-sizing: border-box;margin-top: 15px;">取消</el-button>
            <el-button @click="setUpSubmit" type="danger" plain style="padding: 8px 10px;box-sizing: border-box;margin-top: 15px;">提交</el-button>
          </div>
        </div>
        <section @click="showSetUpBtn">
          <i class="proFont" style="font-size: 30px;color: #0094BD" :class="{activeFont: isActiveFont}">&#xe62b;</i>
        </section>
        <section :class="{activeSe:activeControl.basicInfo}" @click="monitorActiveBtn('basicInfo','showBasicInfo')">基本信息</section>
        <section :class="{activeSe:activeControl.eventAbstract}" @click="monitorActiveBtn('eventAbstract','showAbstract')">事件摘要</section>
        <section :class="{activeSe:activeControl.eventReport}" @click="monitorActiveBtn('eventReport','showReport')">事件报告</section>
        <section :class="{activeSe:activeControl.msaReport}" @click="monitorActiveBtn('msaReport','showMsaReport')">分析报告</section>
        <section :class="{activeSe:activeControl.trackReport}" @click="monitorActiveBtn('trackReport','showTrackReport')">追踪报告</section>
        <section :class="{activeSe:activeControl.fishboneMsa}" @click="monitorActiveBtn('fishboneMsa','showFishboneMsa')">鱼骨分析</section>
        <section :class="{activeSe:activeControl.personAdvice}" @click="monitorActiveBtn('personAdvice','showPersonAdvice')">个人建议</section>
      </aside>
      <aside class="h-right clear-fix">
        <div class="set-right" style="padding:5px 20px 0 0;box-sizing: border-box">
          <section><el-button type="danger" plain size="small" >导出word</el-button></section>
          <section><el-button type="success" plain size="small" style="width: 50px;margin-left: 10px">提交</el-button></section>
        </div>
      </aside>
    </div>
</template>
<script>
  export default {
      name: "eventHeader",
      props: ["dataId"],
      mounted: function(){

      },
      data() {
        return{
          isActiveFont: false,
          eventlevel: [],
          eventflag: [],
          setUpData: {
            LEVEL: null,
            FLAG: null,
            TOP: null,
            GRADE: null,
            REPORTTOCOMMISSION: null,
            ISOPEN: null
          },
          setUpSubmitData: {},
          checked: true,
          showSetUp: false,
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
      //获取事件等级
      getEventLevel: function () {
        this.$http.post('/dic/getDicByKey/eventlevel').then( res => {
          if(res.code == 10000){
            this.eventlevel = res.data;
          /*  for(let item of this.eventlevel){
              console.log(item)
            }*/
          }
        }).catch(function (error) {//加上catch
          console.log(error);
        });
      },
      //获取事件标识
      getEventFlag: function () {
        this.$http.post('/dic/getDicByKey/eventflag').then( res => {
          if(res.code == 10000){
            this.eventflag = res.data;
         /*   for(let item of this.eventflag){
              console.log(item)
            }*/
          }
        }).catch(function (error) {//加上catch
          console.log(error);
        });
      },
      //显示设置窗口和初始数据
      showSetUpBtn: function(){
        this.isActiveFont = true;
        this.getEventLevel();
        this.getEventFlag();
        let data = {
          eventid: this.dataId,
        }
        this.$http.post('/event/getSetting/'+ data.eventid, data).then( res => {
          if(res.code == 10000){
            if(res.data.ISOPEN == 1){
              res.data.ISOPEN = true;
            }else{res.data.ISOPEN = false;}
            if(res.data.REPORTTOCOMMISSION == 1){
              res.data.REPORTTOCOMMISSION = true;
            }else{res.data.REPORTTOCOMMISSION = false;}
            if(res.data.TOP == 1){
              res.data.TOP = true;
            }else{res.data.TOP = false;}
            this.setUpData = res.data;
          }
        }).catch(function (error) {//加上catch
          console.log(error);
        });
        this.showSetUp = true;

      },
      setUpSubmit: function(){
        if(this.setUpData.ISOPEN == true){
          this.setUpData.ISOPEN = 1;
        }else{this.setUpData.ISOPEN = 0;}
        if(this.setUpData.REPORTTOCOMMISSION == true){
          this.setUpData.REPORTTOCOMMISSION = 1;
        }else{this.setUpData.REPORTTOCOMMISSION = 0;}
        if(this.setUpData.TOP == true){
          this.setUpData.TOP = 1;
        }else{this.setUpData.TOP = 0;}
        let data = {
          eventid: this.dataId,
          LEVEL: this.setUpData.LEVEL,
          FLAG: this.setUpData.FLAG,
          TOP: this.setUpData.TOP,
          GRADE: this.setUpData.GRADE,
          REPORTTOCOMMISSION: this.setUpData.REPORTTOCOMMISSION,
          ISOPEN: this.setUpData.ISOPEN
        }
        console.log(this.setUpData.GRADE)
        console.log(data);
        this.$http.post('/event/setting/'+ data.eventid, data).then( res => {
          if(res.code == 10000){
            this.showSetUpBtn();
            this.$message.success("修改成功！");
            this.showSetUp = false;
          }
        }).catch(function (error) {//加上catch
          console.log(error);
        });
      },
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
    height: 35px;
    display: flex;
    border: 1px solid #ccc;
    background-color: white;
    z-index: 100;
    min-width: 1048px;
  }
  .eventHeader .h-left{
    display: flex;
    width: 60%;
    position: relative;
  }
  .eventHeader .h-left section{
    flex: 1;
    text-align: center;
    line-height: 35px;
    font-size: 14px;
    border-right: 1px solid #ccc;
    cursor: pointer;
  }
  .eventHeader .h-right{
    width: 40%;
  }
  .eventHeader .h-right .el-button{padding: 6px 5px}
  .eventHeader .h-right section{display: inline-block;}
  .eventHeader .set-up{
    position: absolute;
    top: 45px;
    left: 30px;
    padding: 30px 20px;
    box-sizing: border-box;
    width: auto;
    background: white;
    z-index: 100;
    border: 1px solid #ccc;
  }
  .activeSe{color: red;border-top: 2px solid red;}
  .eventHeader .setup-type{margin-bottom: 10px}
  .eventHeader .setup-type:last-child{margin-bottom: none;}
  .eventHeader .type-label{
    margin-right: 10px;
    color: #839965;
    width: 75px;
    display: inline-block;
  }
  .activeFont{
    color: #839965;
  }
</style>
