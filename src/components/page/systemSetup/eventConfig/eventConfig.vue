<template>
  <article class="medicalDevice">
    <aside class="conditions">
      <section  :class="[{activeMenu:term.showActiveMenu}]"  v-for="(term, index) in eventMenu" @click="monitorClick(term, index)">{{ term.TYPENAME }}</section>
    </aside>
    <aside class="container">
      <main class="medicalDevice-m">
        <header v-if="showTitle" class="medicalDevice-h" style="margin-bottom: 20px">
          <section class="medicalDevice-btn">
            <div :class="{active:defaultActive}" @click="basicBtn">基本设置</div>
            <div :class="{active:noDefaultActive}" @click="moduleBtn">模块设置</div>
          </section>
        </header>
        <basicSetup v-if="showAllPageData":showBasicSetup="showBasicSetup" :showModuleSetup="showModuleSetup" :submitID="submitID" :allPageData="allPageData" :besicSetID="besicSetID" :divisorLeaderData="divisorLeaderData"></basicSetup>
        <!--<moduleSetup v-show="showModuleSetup" :allPageData="allPageData"></moduleSetup>-->
      </main>
    </aside>
  </article>
</template>

<script>
  import Vue from 'vue'
  import basicSetup from "./basicSetup"
  import moduleSetup from "./moduleSetup"
  export default {
    name: "eventConfig",
    data: function () {
      return{
        showAllPageData: false,
        submitID: null,
        besicSetID: null,
        divisorLeaderData: [],
        allPageData:[],
        eventMenu: [],
        showTitle: false,
        showBasicSetup: false,
        showModuleSetup: false,
        defaultActive: true,
        noDefaultActive: false,
        showBasicSetup: false,
        showModuleSetup: false,
        medicalControl: {
        }
      }
    },
    mounted: function (){
      this.eventMenu = this.twoEventMenu;
     /* for(let item of this.eventMenu){
          item.showActiveMenu = false;
        }
        this.eventMenu[0].showActiveMenu = true;
       */
    },
    methods: {
      basicBtn: function () {
        this.defaultActive = true;
        this.noDefaultActive = false;
        /*页面*/
        this.showBasicSetup = true;
        this.showModuleSetup = false;
      },
      moduleBtn: function () {
        this.noDefaultActive = true;
        this.defaultActive = false;
        /*页面*/
        this.showModuleSetup = true;
        this.showBasicSetup = false;
      },
      monitorClick: function (term, index) {
        this.showBasicSetup = true;
        this.showTitle = true;
        this.submitID = term.EVENTTYPEID;
        this.defaultActive = true;
        this.noDefaultActive = false;
        this.showAllPageData = true;
       /* for(let oa of this.eventMenu){
          if(oa.TYPENAME == term.TYPENAME){
            oa.showActiveMenu = true;
            //Vue.set(oa);
          }
          if(oa.TYPENAME != term.TYPENAME){
            oa.showActiveMenu = false;
            //Vue.set(oa);
          }
        }*/
        let data = {
          typeid: term.EVENTTYPEID
        }
        //根据id查询事件配置
        this.$http.post('/event/cfg/'+ term.EVENTTYPEID, data).then(res => {
          if (res.code == 10000) {
            this.divisorLeader();
            if(res.data.ISCLOSED == 1){
              res.data.ISCLOSED = true;
            }else {res.data.ISCLOSED = false}

            if(res.data.APPFILL == 1){
              this.allPageData.APPFILL = true;
            }else {this.allPageData.APPFILL = false}

            if(res.data.ISUSED == 1){
              res.data.ISUSED = true;
            }else {res.data.ISUSED = false}

            if(res.data.ISOPEN == 1){
              res.data.ISOPEN = true;
            }else {res.data.ISOPEN = false}

            if(res.data.ISOPEN == 1){
              res.data.ISOPEN = true;
            }else {res.data.ISOPEN = false}

            this.allPageData = res.data;
            this.besicSetID = this.allPageData.TYPEID;
            this.allPageData.TYPEID = null;
          } else {
            this.$message.error(res.msg);
          }
        }).catch(function (error) {//加上catch
          console.log(error);
        });
      },
      //分管领导
      divisorLeader: function () {
        this.$http.post('/user/divisorLeader').then(res => {
          if (res.code == 10000) {
            this.divisorLeaderData = res.data;
            if(this.divisorLeaderData.length == 0){
              this.allPageData.DIVISIONLEADER = null;
            }
          } else {
            this.$message.error(res.msg);
          }
        }).catch(function (error) {//加上catch
          console.log(error);
        });
      },
    },
    props: ["twoEventMenu"],
    components: {
      basicSetup,
      moduleSetup
    }
  }
</script>

<style>
  .medicalDevice{
    height: 100%;
    width: 100%;
    display: flex;
  }
  .medicalDevice .conditions{flex: 1;border-right: 1px solid #E6E6E6;padding-top: 15px;}
  .medicalDevice .conditions section{width: 100%;padding: 6px 0;text-align: center;}
  .medicalDevice .container{
    flex: 9;
  }
  .medicalDevice .activeMenu{cursor: pointer;background: #666;}
  .medicalDevice .conditions section:hover{
      cursor: pointer;background: #666;
    }
  .medicalDevice .medicalDevice-h{
    height: 47px;
    width: 100%;
  }
  .medicalDevice .medicalDevice-btn{
    width: 100%;
    border-bottom: 1px solid #E6E6E6;
    position: absolute;
    top: 15px;
    left: 20px;
  }
  .medicalDevice .medicalDevice-btn div{
    display: inline-block;
    border: 1px solid #E6E6E6;
    padding: 7px 15px;
    cursor: pointer;
  }
  .medicalDevice .active{background: #666;}
  .medicalDevice .medicalDevice-m{
    height: calc(100% - 47px);
    width: 100%;
  }

</style>
