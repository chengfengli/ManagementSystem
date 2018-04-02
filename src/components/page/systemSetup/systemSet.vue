<template>
  <div class="systemSet">
    <header>
      <sysHeader></sysHeader>
      <div class="current">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: 'index' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>系统设置</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </header>
    <main class="systemSet-main">
      <nav>
        <el-row class="tac">
          <el-col :span="24">
            <el-menu
              default-active="2"
              class="el-menu-vertical-demo"
              @open="handleOpen"
              @close="handleClose">
              <el-submenu index="1">
                <template slot="title">
                  <i class="el-icon-menu"></i>
                  <span>系统配置</span>
                </template>
                <el-menu-item-group>
                  <!--<template slot="title">分组一</template>-->
                  <el-menu-item index="1-1" @click="openModulePage('showHospitalsInfo')">医院信息</el-menu-item>
                  <el-menu-item index="1-2" @click="openModulePage('showSystemParam')">系统参数</el-menu-item>
                  <el-menu-item index="1-3" @click="openModulePage('showDataDict')">数据字典</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
              <el-submenu :index="indexTwo">
                <template slot="title">
                  <i class="el-icon-menu"></i>
                  <span>权限设置</span>
                </template>
                <el-menu-item-group>  <!-- index="1-1" -->
                  <el-menu-item :index="indexTwo + '-' + i" v-for="(item, i) in permisMenu"  @click="permisMonitor(item)" >{{ item.ROLENAME }}{{ i }}</el-menu-item>
                  <!--<el-menu-item index="1-1" @click="openModulePage('showTourist')">游客</el-menu-item>
                  <el-menu-item index="1-2" @click="openModulePage('showEventForm')">事件填报员</el-menu-item>
                  <el-menu-item index="1-3" @click="openModulePage('showEventHandler')">事件处理员</el-menu-item>
                  <el-menu-item index="1-4" @click="openModulePage('showEventHandlerAbet')">事件处理员（协助）</el-menu-item>
                  <el-menu-item index="1-5" @click="openModulePage('showEventManage')">事件管理</el-menu-item>
                  <el-menu-item index="1-7" @click="openModulePage('showInstitutionLeader')">院级领导</el-menu-item>
                  <el-menu-item index="1-6" @click="openModulePage('showEventManageAbet')">事件管理员（协助）</el-menu-item>
                  <el-menu-item index="1-8" @click="openModulePage('showSectorLeader')">部门领导</el-menu-item>-->
                </el-menu-item-group>
              </el-submenu>
              <el-submenu index="3">
                <template slot="title">
                  <i class="el-icon-menu"></i>
                  <span>事件配置</span>
                </template>
                <el-menu-item-group>
                  <!--<template slot="title">分组一</template>-->
                  <el-menu-item index="3-1" @click="openModulePage('showMedicalDevice')">医疗器械事件</el-menu-item>
                  <el-menu-item index="3-2" @click="openModulePage('showTransfusionEvent')">输血事件</el-menu-item>
                  <el-menu-item index="3-3" @click="openModulePage('showAdrEvent')">药物不良反应事件</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
              <el-submenu index="4">
                <template slot="title">
                  <i class="el-icon-menu"></i>
                  <span>模块配置</span>
                </template>
                <el-menu-item-group>
                  <!--<template slot="title">分组一</template>-->
                  <el-menu-item index="4-1" @click="openModulePage('showGeneralCase')">一般情况</el-menu-item>
                  <el-menu-item index="4-2" @click="openModulePage('showSiteConditions')">现场情况</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
            </el-menu>
          </el-col>
        </el-row>
      </nav>
      <aside>
        <!-- 系统配置 -->
        <hospitalsInfo v-if="systemSetControl.showHospitalsInfo"></hospitalsInfo>
        <systemParam v-if="systemSetControl.showSystemParam"></systemParam>
        <dataDict v-if="systemSetControl.showDataDict"></dataDict>
        <!-- 权限设置 -->
        <permisPage v-if="showPermisPage" :permisMenuData="permisMenuData"></permisPage>
        <!--<tourist v-if="systemSetControl.showTourist"></tourist>
        <eventForm v-if="systemSetControl.showEventForm"></eventForm>
        <eventHandler v-if="systemSetControl.showEventHandler"></eventHandler>
        <eventHandlerAbet v-if="systemSetControl.showEventHandlerAbet"></eventHandlerAbet>
        <eventManage v-if="systemSetControl.showEventManage"></eventManage>
        <eventManageAbet v-if="systemSetControl.showEventManageAbet"></eventManageAbet>
        <institutionLeader v-if="systemSetControl.showInstitutionLeader"></institutionLeader>
        <sectorLeader v-if="systemSetControl.showSectorLeader"></sectorLeader>-->
        <!-- 事件设置 -->
        <medicalDevice v-if="systemSetControl.showMedicalDevice"></medicalDevice>
        <transfusionEvent v-if="systemSetControl.showTransfusionEvent"></transfusionEvent>
        <adrEvent v-if="systemSetControl.showAdrEvent"></adrEvent>
        <!-- 模块配置 -->
        <generalCase v-if="systemSetControl.showGeneralCase"></generalCase>
        <siteConditions v-if="systemSetControl.showSiteConditions"></siteConditions>
      </aside>
    </main>
  </div>
</template>
<script>
  import sysHeader from '../../common/Header.vue';
  //加载子组件
  /* 系统配置 */
  import hospitalsInfo from "./systemAllocation/hospitalsInfo"
  import systemParam from "./systemAllocation/systemParam"
  import dataDict from "./systemAllocation/dataDict"
  /* 权限设置 */
  import permisPage from "./Permission/permisPage"
  import tourist from "./Permission/tourist"
  import eventForm from "./Permission/eventForm"
  import eventHandler from "./Permission/eventHandler"
  import eventHandlerAbet from "./Permission/eventHandlerAbet"
  import eventManage from "./Permission/eventManage"
  import eventManageAbet from "./Permission/eventManageAbet"
  import institutionLeader from "./Permission/institutionLeader"
  import sectorLeader from "./Permission/sectorLeader"
  /* 事件配置 */
  import medicalDevice from "./eventAllocation/medicalDevice"
  import transfusionEvent from "./eventAllocation/transfusionEvent"
  import adrEvent from "./eventAllocation/adrEvent"
  /* 模块配置 */
  import generalCase from "./moduleAllocation/generalCase"
  import siteConditions from "./moduleAllocation/siteConditions"

  export default {
    name: "systemSet",
    components: {
      /* 系统配置 */
      sysHeader,
      hospitalsInfo,
      systemParam,
      dataDict,
      /* 权限设置 */
      permisPage,
      tourist,
      eventForm,
      eventHandler,
      eventHandlerAbet,
      eventManage,
      eventManageAbet,
      institutionLeader,
      sectorLeader,
      /* 事件配置 */
      medicalDevice,
      transfusionEvent,
      adrEvent,
      /* 模块配置 */
      generalCase,
      siteConditions
    },
    mounted() {
      this.initPermisMenu();
    },
    data() {
      return {
        indexOne: "1",
        indexTwo: "2",
        indexThree: "3",
        indexFour: "4",
        //权限设置
        showPermisPage: false,
        //系统设置控制
        systemSetControl: {
          //系统配置
          showHospitalsInfo: false,              //医院信息
          showSystemParam: false,                //系统参数
          showDataDict: false,                   //数据字典

         /* showTourist: false,                    //游客
          showEventForm: false,                  //事件填报员
          showEventHandler: false,               //事件处理员
          showEventHandlerAbet: false,           //事件处理员(协助)
          showEventManage: false,                //事件管理
          showEventManageAbet: false,            //事件管理员(协助)
          showInstitutionLeader: false,          //院级领导
          showSectorLeader: false,               //部门领导*/
          //事件配置
          showMedicalDevice: false,              //医疗器械事件
          showTransfusionEvent: false,           //输血事件
          showAdrEvent: false,                   //药物不良反应事件
          //模块配置
          showGeneralCase: false,                //一般情况
          showSiteConditions: false              //现场情况
        },
        permisMenu: [],
        permisMenulenght: 1,
        permisMenuData: [],
        permisSearch: {
          roleid: '',
          page: 1,
          pageSize: 10,
        }
      }
    },
    methods: {
      //监听权限菜单点击事件数据
      permisMonitor: function (item) {
        this.showPermisPage = false;
        this.showPermisPage = true;
        this.permisSearch.roleid = item.ROLEID;
        this.$http.post('/permissions/'+ item.ROLEID, this.permisSearch).then(res => {
          if (res.code == 10000) {
            for(let i of res.data.rows){
              if(i.ABANDON == 1){
                i.ABANDON = true;
              }else {
                i.ABANDON = false;
              }
              console.log(i.ABANDON)
            }
            this.permisMenuData = res.data;
            console.log(this.permisMenuData);
          } else {
            this.$message.error(res.msg);
          }
        }).catch(function (error) {//加上catch
          console.log(error);
        });
      },
      //初始化权限菜单
      initPermisMenu: function () {
        this.$http.post('/role/list').then(res => {
          if (res.code == 10000) {
            this.permisMenu = res.data;
          } else {
            this.$message.error(res.msg);
          }
        }).catch(function (error) {//加上catch
          console.log(error);
        });
      },
      openModulePage: function (moduleName) {
        for (let i in this.systemSetControl) {
          if (i == moduleName) {
            this.systemSetControl[i] = true;
          } else if (i != moduleName) {
            this.systemSetControl[i] = false;
          }
        }
      },
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    },

  }
</script>
<style>
  .systemSet {
    height: 100%;
    width: 100%;
    overflow: hidden;
  }

  .systemSet .current {
    border-bottom: 1px solid #E6E6E6;
  }

  .systemSet-main {
    display: flex;
    height: calc(100% - 85px);
    width: 100%;
  }

  .systemSet .current {
    padding-left: 22px;
  }

  .systemSet-main nav, .systemSet-main aside {
    height: 100%;
    width: 100%;
    position: relative;
  }

  .systemSet-main nav {
    flex: 2;
    height: 100%;
  }

  .systemSet-main aside {
    flex: 8;
    width: 100%;
  }

  .systemSet-main .tac, .systemSet-main .el-col-24, .el-menu {
    height: 100%;
    overflow: auto;
  }

</style>
