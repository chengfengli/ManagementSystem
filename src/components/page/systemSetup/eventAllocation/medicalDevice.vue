<template>
  <article class="medicalDevice">
    <aside class="conditions">
      <section class="conditions-active" v-for="term in eventConditions" @click="monitor(term)">{{ term }}</section>
    </aside>
    <aside class="container">
      <main class="medicalDevice-m">
        <header class="medicalDevice-h">
          <section class="medicalDevice-btn">
            <div :class="{active:defaultActive}" @click="basicBtn">基本设置</div>
            <div :class="{active:noDefaultActive}" @click="moduleBtn">模块设置</div>
          </section>
        </header>
        <basicSetup v-if="showBasicSetup"></basicSetup>
        <moduleSetup v-if="showModuleSetup"></moduleSetup>
      </main>
    </aside>
  </article>
</template>

<script>
  import basicSetup from "./basicSetup"
  import moduleSetup from "./moduleSetup"
  export default {
    name: "medicalDevice",
    data(){
      return{
        showBasicSetup: true,
        showModuleSetup: false,
        defaultActive: true,
        noDefaultActive: false,
        eventConditions: ['无电源', '运行故障', '操作失控'],
        medicalControl: {

        }
      }
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
      monitor: function (term) {
        console.log(term);
      },
    },
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
  .medicalDevice .conditions{flex: 1;border-right: 1px solid #E6E6E6;}
  .medicalDevice .conditions section{width: 100%;padding: 6px 0;text-align: center;}
  .medicalDevice .container{
    flex: 9;
  }
  .medicalDevice .conditions-active:hover{cursor: pointer;background: #666;}
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
