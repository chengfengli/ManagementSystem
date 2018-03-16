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
                                    <el-menu-item index="1-1">医院信息</el-menu-item>
                                    <el-menu-item index="1-2">系统参数</el-menu-item>
                                    <el-menu-item index="1-3">数据字典</el-menu-item>
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
                                    <el-menu-item index="1-1">游客</el-menu-item>
                                    <el-menu-item index="1-2">事件填报员</el-menu-item>
                                    <el-menu-item index="1-3">事件处理员</el-menu-item>
                                    <el-menu-item index="1-4">事件处理员（协助）</el-menu-item>
                                    <el-menu-item index="1-5">事件管理</el-menu-item>
                                    <el-menu-item index="1-6">事件管理员（协助）</el-menu-item>
                                    <el-menu-item index="1-7">院级领导</el-menu-item>
                                    <el-menu-item index="1-8">部门领导</el-menu-item>
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
                <hospitalsInfo v-if="systemSetControl.showHospitalsInfo"></hospitalsInfo>
                <systemParam v-if="systemSetControl.showSystemParam"></systemParam>
                <dataDict v-if="systemSetControl.showDataDict"></dataDict>
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
    export default {
        name: "systemSet",
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
                    showEventFormAbet: false,              //事件填报员(协助)
                    showEventHandlerAbet: false,           //事件处理员(协助)
                    showEventManage: false,                //事件管理
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
        components: {
            sysHeader,
            hospitalsInfo,
            systemParam,
            dataDict
        }
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
    .systemSet-main nav,.systemSet-main aside{height: 100%;}
    .systemSet-main nav{flex: 3;height: 100%;}
    .systemSet-main aside{flex: 7;}
    .systemSet-main .tac,.systemSet-main .el-col-24,.systemSet-main .el-menu{height: 100%;}
    .systemSet .el-menu-item-grougroup{padding: 0 0;}

</style>
