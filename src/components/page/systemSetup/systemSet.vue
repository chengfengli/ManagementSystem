<template>
    <div class="systemSet">
        <header>
            <sysHeader></sysHeader>
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
                             <!--   <el-menu-item-group title="分组2">
                                    <el-menu-item index="1-3">医院信息</el-menu-item>
                                </el-menu-item-group>-->
                              <!--  <el-submenu index="1-4">
                                    <template slot="title">选项4</template>
                                    <el-menu-item index="1-4-1">选项1</el-menu-item>
                                </el-submenu>-->
                            </el-submenu>
                            <el-submenu index="2">
                                <template slot="title">
                                    <i class="el-icon-menu"></i>
                                    <span>系统配置</span>
                                </template>
                                <el-menu-item-group>
                                    <!--<template slot="title">分组一</template>-->
                                    <el-menu-item index="1-1" @click="openModulePage('showTourist')">游客</el-menu-item>
                                    <el-menu-item index="1-2" @click="openModulePage('showEventForm')">事件填报员</el-menu-item>
                                    <el-menu-item index="1-3" @click="openModulePage('showEventHandler')">事件处理员</el-menu-item>
                                    <el-menu-item index="1-4" @click="openModulePage('showEventHandlerAbet')">事件处理员（协助）</el-menu-item>
                                    <el-menu-item index="1-5" @click="openModulePage('showEventManage')">事件管理</el-menu-item>
                                    <el-menu-item index="1-6" @click="openModulePage('showEventManageAbet')">事件管理员（协助）</el-menu-item>
                                    <el-menu-item index="1-7" @click="openModulePage('showInstitutionLeader')">院级领导</el-menu-item>
                                    <el-menu-item index="1-8" @click="openModulePage('showSectorLeader')">部门领导</el-menu-item>
                                </el-menu-item-group>
                            </el-submenu>
                            <el-submenu index="3">
                                <template slot="title">
                                    <i class="el-icon-menu"></i>
                                    <span>事件配置</span>
                                </template>
                                <el-menu-item-group>
                                    <!--<template slot="title">分组一</template>-->
                                    <el-menu-item index="1-1">医疗器械事件</el-menu-item>
                                    <el-menu-item index="1-2">输血事件</el-menu-item>
                                    <el-menu-item index="1-3">药物不良反应事件</el-menu-item>
                                </el-menu-item-group>
                            </el-submenu>
                            <el-submenu index="4">
                                <template slot="title">
                                    <i class="el-icon-menu"></i>
                                    <span>模块配置</span>
                                </template>
                                <el-menu-item-group>
                                    <!--<template slot="title">分组一</template>-->
                                    <el-menu-item index="1-1">一般情况</el-menu-item>
                                    <el-menu-item index="1-2">现场情况</el-menu-item>
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
              <tourist v-if="systemSetControl.showTourist"></tourist>
              <eventForm v-if="systemSetControl.showEventForm"></eventForm>
              <eventHandler v-if="systemSetControl.showEventHandler"></eventHandler>
              <eventHandlerAbet v-if="systemSetControl.showEventHandlerAbet"></eventHandlerAbet>
              <eventManage v-if="systemSetControl.showEventManage"></eventManage>
              <eventManageAbet v-if="systemSetControl.showEventManageAbet"></eventManageAbet>
              <institutionLeader v-if="systemSetControl.showInstitutionLeader"></institutionLeader>
              <sectorLeader v-if="systemSetControl.showSectorLeader"></sectorLeader>
            </aside>
        </main>
    </div>
</template>
<script>
    import sysHeader from  '../../common/Header.vue';
    //加载子组件
    import hospitalsInfo from  "./systemAllocation/hospitalsInfo"
    import systemParam from  "./systemAllocation/systemParam"
    import dataDict from  "./systemAllocation/dataDict"

    import tourist from "./Permission/tourist"
    import eventForm from "./Permission/eventForm"
    import eventHandler from "./Permission/eventHandler"
    import eventHandlerAbet from "./Permission/eventHandlerAbet"
    import eventManage from "./Permission/eventManage"
    import eventManageAbet from "./Permission/eventManageAbet"
    import institutionLeader from "./Permission/institutionLeader"
    import sectorLeader from "./Permission/sectorLeader"

    export default {
        name: "systemSet",
      components: {
        /* 系统配置 */
        sysHeader,
        hospitalsInfo,
        systemParam,
        dataDict,
        /* 权限设置 */
        tourist,
        eventForm,
        eventHandler,
        eventHandlerAbet,
        eventManage,
        eventManageAbet,
        institutionLeader,
        sectorLeader
      },
        data(){
            return{
                //系统设置控制
                systemSetControl: {
                    //系统配置
                    showHospitalsInfo: false,              //医院信息
                    showSystemParam: false,                //系统参数
                    showDataDict: false,                   //数据字典
                    //权限设置
                    showTourist: false,                    //游客
                    showEventForm: false,                  //事件填报员
                    showEventHandler: false,               //事件处理员
                    showEventHandlerAbet: false,           //事件处理员(协助)
                    showEventManage: false,                //事件管理
                    showEventManageAbet: false,            //事件管理员(协助)
                    showInstitutionLeader: false,          //院级领导
                    showSectorLeader: false,               //部门领导
                    //事件配置
                    showMedicalDevice: false,              //医疗器械事件
                    showTransfusionEvent: false,           //输血 事件
                    showAdrEvent: false,                   //药物不良反应事件
                    //模块配置
                    showGeneralCase: false,                //一般情况
                    showSiteConditions: false              //现场情况
                }
            }
        },
        methods: {
            openModulePage: function (moduleName) {
                for(let i in this.systemSetControl){
                    if(i == moduleName){
                        this.systemSetControl[i] = true;
                    }else if(i != moduleName){
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
    .systemSet{height: 100%;width: 100%;}
    .systemSet-main{
        display: flex;
        height: calc(100% - 73px);
        width: 100%;
        overflow: hidden;
    }
    .systemSet-main nav,.systemSet-main aside{
      height: 100%;
      width: 100%;
      overflow: hidden;
      position: relative;
    }
    .systemSet-main nav{flex: 3;height: 100%;}
    .systemSet-main aside{flex: 7;}
    .systemSet-main .tac, .systemSet-main .el-col-24, .el-menu{height: 100%;}

</style>
