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
            <el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
              <el-submenu index="1">
                <template slot="title">
                  <i class="el-icon-menu"></i>
                  <span>系统配置</span>
                </template>
                <el-menu-item-group>
                  <!--<template slot="title">分组一</template>-->
                  <el-menu-item index="1-1" @click="openModulePage('showHospitalsInfo')" >医院信息</el-menu-item>
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
                  <el-menu-item :index="indexTwo+'-'+i" v-for="(item, i) in permisMenu"  @click="permisMonitor(item)" >{{ item.ROLENAME }}</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
              <el-submenu :index="indexThree">
                <template slot="title">
                  <div style="position: absolute;left: 20px;top: 0;">
                    <i class="el-icon-menu"></i>
                    <span>事件配置</span>
                  </div>
                  <div class="addMenu" @click="addMenuTitle('event')">
                    <i class="proFont" style="color: #333;font-size: 19px">&#xe632;</i>
                    <span>增加</span>
                  </div>
                </template>
                <el-menu-item-group>
                  <el-menu-item v-for="(item, i) in eventConfig" :index="indexThree+'-'+i" @click="eventMonitor(item)">{{ item.TYPENAME }}
                    <div class="minusMenu" style="margin-right: 70px" @click="removeMenu(item, 'event')">
                      <i class="proFont" style="color: #333;font-size: 19px">&#xe633;</i>
                    </div>
                    <div class="minusMenu" style="margin-right: 35px"  @click="modifyMenu(item)" >
                      <i class="proFont" style="color: #333;font-size: 19px" >&#xe8cf;</i>
                    </div>
                    <!--@click="increaseEventMenu(item)"-->
                    <div class="minusMenu" @click="increaseEventMenu(item)" >
                      <i class="proFont" style="color: #333;font-size: 19px">&#xe632;</i>
                    </div>
                  </el-menu-item>
                </el-menu-item-group>
              </el-submenu>
              <el-submenu :index="indexFour">
                <template slot="title">
                  <section style="position: absolute;left: 20px;top: 0;">
                    <i class="el-icon-menu"></i>
                    <span>模块配置</span>
                  </section>
                  <section class="addMenu" @click="addMenuTitle('module')">
                    <i class="proFont" style="color: #333;font-size: 19px">&#xe632;</i>
                    <span>增加</span>
                  </section>
                </template>
                <el-menu-item-group>
                  <!--<template slot="title">分组一</template>-->
                  <el-menu-item v-for="(item, i) in moduleConfig" :index="indexFour+'-'+i" @click="moduleMonitor(item)">{{ item.NAME }}
                    <div class="minusMenu" style="margin-right: 70px" @click="removeMenu(item, 'module')">
                      <i class="proFont" style="color: #333;font-size: 19px" >&#xe633;</i>
                    </div>
                    <div class="minusMenu" style="margin-right: 35px"  @click="modifyModuleMenu(item)">
                      <i class="proFont" style="color: #333;font-size: 19px" >&#xe8cf;</i>
                    </div>
                    <div class="minusMenu" @click="increaseModuleMenu(item)">
                      <i class="proFont" style="color: #333;font-size: 19px">&#xe632;</i>
                    </div>
                  </el-menu-item>
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
        <permisPage v-if="showPermisPage" :menuData="menuData" :noticeTitle="noticeTitle" @refreshPermis="refreshPermis"></permisPage>
        <!-- 事件配置 -->
        <eventConfig v-if="showEventConfig" :twoEventMenu="twoEventMenu" @evetSonData="evetSonData" ref="allEvent"></eventConfig>
        <!-- 模块配置 -->
        <moduleCfg v-if="showModuleConfig" :moduleTwoMenu="moduleTwoMenu" @moduleSonData="moduleSonData"></moduleCfg>
      </aside>
    </main>
    <div class="addMenuWindow" v-if="showAddMenuWindow">
      <div class="container">
        <div class="content">
         <div style="margin: auto;width: 80%;" v-if="showSubmit">
          <section v-if="showA">
            <label class="windowtitle">菜单类型:</label>
            <el-select v-model="moduleSubmit.TYPE"  placeholder="请选择" size="small" style="width: 190px">
              <el-option
                v-for="item in addModuleType"
                :key="item.VALUE"
                :label="item.DISPLAY"
                :value="item.VALUE">
              </el-option>
            </el-select>
          </section>
          <section>
            <label class="windowtitle">菜单名称:</label>
            <el-input v-model="moduleSubmit.NAME" placeholder="请输入内容" size="small " style="display: inline-block;width: 190px"></el-input>
          </section>
          <section>
            <label class="windowtitle">描述:</label>
            <el-input v-model="moduleSubmit.MARK"  placeholder="请输入内容" size="small " style="display: inline-block;width: 190px"></el-input>
          </section>
          <section v-if="showB">
            <label class="windowtitle">排序号:</label>
            <el-input v-model="moduleSubmit.SN" type="number" placeholder="" size="small " style="display: inline-block;width: 190px"></el-input>
          </section>
          <section style="display: flex;">
            <div class="windowBtn">
              <el-button style="padding: 10px 30px" type="info" round @click="showAddMenuWindow = false">取消</el-button>
            </div>
            <div class="windowBtn" v-if="increaseEvent">
              <el-button style="padding: 10px 30px" type="danger" round @click="increaseEvetSubmit('event')">确定</el-button>
            </div>
            <div class="windowBtn" v-if="increaseModule">
              <el-button style="padding: 10px 30px" type="danger" round @click="increaseEvetSubmit('module')">确定</el-button>
            </div>
          </section>
        </div>
         <div style="margin: auto;width: 80%;" v-if="showModify">
           <div v-if="eventModifyData">
             <section>
               <label class="windowtitle">菜单名称:</label>
               <el-input v-model="modifyMenuData.TYPENAME" placeholder="请输入内容" size="small " style="display: inline-block;width: 190px"></el-input>
             </section>
             <section>
               <label class="windowtitle">{{labelMark}}</label>
               <el-input v-model="modifyMenuData.MARK"  placeholder="请输入内容" size="small " style="display: inline-block;width: 190px"></el-input>
             </section>
             <section style="display: flex;">
               <div class="windowBtn">
                 <el-button style="padding: 10px 30px" type="info" round @click="showAddMenuWindow = false">取消</el-button>
               </div>
               <div class="windowBtn">
                 <el-button style="padding: 10px 30px" type="danger" round @click="addMenuSubmit('modify','event')">确定</el-button>
               </div>
             </section>
           </div>
           <div v-if="moduleModifyData">
             <section>
               <label class="windowtitle">{{ labelTitle }}</label>
               <el-select v-model="modifyMenuData.TYPE" size="small" style="width: 190px" placeholder="请选择">
                 <el-option
                   v-for="item in addModuleType"
                   :key="item.VALUE"
                   :label="item.DISPLAY"
                   :value="item.VALUE">
                 </el-option>
               </el-select>
             </section>
             <section>
               <label class="windowtitle">菜单名称:</label>
               <el-input v-model="modifyMenuData.NAME" placeholder="请输入内容" size="small " style="display: inline-block;width: 190px"></el-input>
             </section>
             <section>
               <label class="windowtitle">{{labelMark}}</label>
               <el-input v-model="modifyMenuData.MARK"  placeholder="请输入内容" size="small " style="display: inline-block;width: 190px"></el-input>
             </section>
             <section style="display: flex;">
               <div class="windowBtn">
                 <el-button style="padding: 10px 30px" type="info" round @click="showAddMenuWindow = false">取消</el-button>
               </div>
               <div class="windowBtn">
                 <el-button style="padding: 10px 30px" type="danger" round @click="addMenuSubmit('modify','module')">确定</el-button>
               </div>
             </section>
           </div>
          </div>
        </div>
      </div>
    </div>
    <div class="addMenuWindow" v-if="showSmallWindow">
      <div class="container">
        <div class="content">
          <div style="margin: auto;width: 80%;">
            <section>
              <label class="windowtitle">元素类型:</label>
              <el-select v-model="addClassicalData.TYPE"  placeholder="请选择" size="small" style="width: 190px">
                <el-option
                  v-for="item in classicalType"
                  :key="item.VALUE"
                  :label="item.DISPLAY"
                  :value="item.VALUE">
                </el-option>
              </el-select>
            </section>
            <section>
              <label class="windowtitle">元素名称:</label>
              <el-input v-model="addClassicalData.NAME" placeholder="请输入内容" size="small " style="display: inline-block;width: 190px"></el-input>
            </section>
            <section>
              <label class="windowtitle">元素排序号:</label>
              <el-input v-model="addClassicalData.SN"  placeholder="请输入内容" size="small " style="display: inline-block;width: 190px"></el-input>
            </section>
            <section>
              <label class="windowtitle">元素标识键:</label>
              <el-input v-model="addClassicalData.FILEDNAME"  placeholder="" size="small " style="display: inline-block;width: 190px"></el-input>
            </section>
            <section style="display: flex;">
              <div class="windowBtn">
                <el-button style="padding: 10px 30px" type="info" round @click="showSmallWindow = false">取消</el-button>
              </div>
              <div class="windowBtn">
                <el-button style="padding: 10px 30px" type="danger" round @click="increaseSmallSubmit('eventSmall')">确定</el-button>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
    <div class="addMenuWindow" v-if="showEventSmallWindow">
      <div class="container">
        <div class="content">
          <div style="margin: auto;width: 80%;">
            <section>
              <label class="windowtitle">类型名称:</label>
              <el-input v-model="needEventData.TYPENAME" placeholder="请输入内容" size="small " style="display: inline-block;width: 190px"></el-input>
            </section>
            <section>
              <label class="windowtitle">类型描述:</label>
              <el-input v-model="needEventData.MARK"  placeholder="请输入内容" size="small " style="display: inline-block;width: 190px"></el-input>
            </section>
            <section style="display: flex;">
              <div class="windowBtn">
                <el-button style="padding: 10px 30px" type="info" round @click="showEventSmallWindow = false">取消</el-button>
              </div>
              <div class="windowBtn">
                <el-button style="padding: 10px 30px" type="danger" round @click="increaseEventSmallSubmit">确定</el-button>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
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
  /* 事件配置 */
  import eventConfig from "./eventConfig/eventConfig"
  /* 模块配置 */
  import moduleCfg from "./moduleCfg/moduleCfg"

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
      /* 事件配置 */
      eventConfig,
      /* 模块配置 */
      moduleCfg
    },
    mounted() {
      this.initPermisMenu();
      this.initEventConfig();
      this.initModuleData();
    },
    data() {
      return {
        needEventData: {
          TYPENAME: "",
          MARK: "",
          PARENTID: ""
        },
        addClassicalData: {
          MODULEID: null,
          TYPE: null,
          NAME: "",
          SN: null,
          FILEDNAME:""
        },
        classicalType: [],
        showEventSmallWindow: false,
        showSmallWindow: false,
        showA: true,
        showB: false,
        increaseEvent: false,
        increaseModule: false,
        eventModifyData: false,
        moduleModifyData: false,
        labelTitle: "",
        labelMark: "",
        eventId: null,
        showSubmit: false,
        showModify: false,
        modifyMenuData: {
          ISGENERAL: null,
          ISUSED: null,
          MARK: "",
          NAME: "",
          SN: null,
          TYPE: null,
        },
        moduleSubmit: {
          TYPE: null,
          NAME: "",
          MARK: "",
          SN: null,
        },
        showAddMenuWindow: false,
        addModuleType: [],
        input: "",
        value5: [],
        noticeTitle: "",
        permisNeedId: "",
        indexOne: "1",
        indexTwo: "2",
        indexThree: "3",
        indexFour: "4",
        systemSetControl: {
          //系统配置
          showHospitalsInfo: false,              //医院信息
          showSystemParam: false,                //系统参数
          showDataDict: false,                   //数据字典
          //模块配置
          /*showGeneralCase: false,                //一般情况
          showSiteConditions: false              //现场情况*/
        },
        //系统设置控制
        showPermisPage: false,
        permisMenu: [],
        //事件配置
        showEventConfig: false,
        eventConfig: [],
        twoEventMenu: [],
        //模块配置
        showModuleConfig: false,
        moduleConfig: [],
        moduleTwoMenu: [],
        menuData: [],
        permisSearch: {
          roleid: '',
          page: 1,
          pageSize: 10,
        }
      }
    },
    methods: {
      //监听事件配置子组件修改删除后的刷新
      evetSonData: function(id){
        this.initEventData(this.eventId);
      },
      moduleSonData: function(){
        this.initModuleDtaaa(this.eventId)
      },
      //增加模块元素提交
      increaseSmallSubmit: function(){
        let data = {
          MODULEID: this.addClassicalData.MODULEID,
          TYPE: this.addClassicalData.TYPE,
          NAME: this.addClassicalData.NAME,
          SN: this.addClassicalData.SN,
          FILEDNAME: this.addClassicalData.FILEDNAME,
        }
        this.$http.post('/element/create', data).then(res => {
          if (res.code == 10000) {
            this.initModuleDtaaa(data.MODULEID)
            this.showSmallWindow = false;
            this.$message.success("添加成功！");
          } else {
            this.$message.error(res.msg);
          }
        }).catch(function (error) {//加上catch
          console.log(error);
        });
      },
      increaseEventSmallSubmit: function(){
        let data = {
          TYPENAME: this.needEventData.TYPENAME,
          MARK: this.needEventData.MARK,
          PARENTID: this.needEventData.PARENTID
        }
        this.$http.post('/event/create/childType', data).then(res => {
          if (res.code == 10000) {
            this.initEventData(data.PARENTID)
            this.showEventSmallWindow = false;
            this.$message.success("添加成功！");
          } else {
            this.$message.error(res.msg);
          }
        }).catch(function (error) {//加上catch
          console.log(error);
        });
      },
      //新增事件小类
      increaseEventMenu: function(item){
        this.showEventSmallWindow = true;
        this.needEventData.PARENTID = item.EVENTTYPEID;
      },
      //增加模块元素
      increaseModuleMenu: function(item){
        this.showSmallWindow = true;
        this.addClassicalData.MODULEID = item.ID;
        this.$http.post('/dic/getDicByKey/elementtype').then(res => {
          if (res.code == 10000) {
            this.classicalType = res.data;
          } else {
            this.$message.error(res.msg);
          }
        }).catch(function (error) {//加上catch
          console.log(error);
        });
      },
      increaseEvetSubmit: function(menuType){
        console.log(menuType)
        var data;
        if(menuType == "event"){
          data = {
            TYPENAME: this.moduleSubmit.NAME,
            MARK: this.moduleSubmit.MARK,
          }
          this.$http.post('/event/create/rootType', data).then(res => {
            if (res.code == 10000) {
              this.initEventConfig();
              this.initModuleData();
              this.$message.success("添加成功！");
              this.showAddMenuWindow = false;
            } else {
              this.$message.error(res.msg);
            }
          }).catch(function (error) {//加上catch
            console.log(error);
          });
        }
        if(menuType == "module"){
          data = {
            TYPE: this.moduleSubmit.TYPE,
            NAME: this.moduleSubmit.NAME,
            MARK: this.moduleSubmit.MARK,
            SN: this.moduleSubmit.SN,
          }
          this.$http.post('/module/create', data).then(res => {
            if (res.code == 10000) {
              this.initEventConfig();
              this.initModuleData();
              this.$message.success("添加成功！");
              this.showAddMenuWindow = false;
            } else {
              this.$message.error(res.msg);
            }
          }).catch(function (error) {//加上catch
            console.log(error);
          });
        }
      },
      //增加二级模块菜单提交
      addMenuSubmit: function(btnName,btnType) {
        var data;
        if(btnName == "submit"){
          data = {
            TYPE: this.moduleSubmit.TYPE,
            NAME: this.moduleSubmit.NAME,
            MARK: this.moduleSubmit.MARK,
            SN: this.moduleSubmit.SN,
          }
          this.$http.post('/module/create', data).then(res => {
            if (res.code == 10000) {
              this.initEventConfig();
              this.initModuleData();
              this.$message.success("添加成功！");
              this.showAddMenuWindow = false;
            } else {
              this.$message.error(res.msg);
            }
          }).catch(function (error) {//加上catch
            console.log(error);
          });
        }
        if(btnName == "modify"){
          if(btnType == "event"){
            data = {
              TYPENAME: this.modifyMenuData.TYPENAME,
              MARK: this.modifyMenuData.MARK,
            }
            this.$http.post('/event/updateType/'+ this.eventId, data).then(res => {
              if (res.code == 10000) {
                this.initEventConfig();
                this.initModuleData();
                this.$message.success("修改成功！");
                this.showAddMenuWindow = false;
              } else {
                this.$message.error(res.msg);
              }
            }).catch(function (error) {//加上catch
              console.log(error);
            });
          }
          if(btnType == "module"){
            data = {
              ID: this.eventId,
              TYPE: this.modifyMenuData.TYPE,
              NAME: this.modifyMenuData.NAME,
              MARK: this.modifyMenuData.MARK,
            }
            this.$http.post('module/update/'+ data.ID, data).then(res => {
              if (res.code == 10000) {
                this.initEventConfig();
                this.initModuleData();
                this.$message.success("修改成功！");
                this.showAddMenuWindow = false;
              } else {
                this.$message.error(res.msg);
              }
            }).catch(function (error) {//加上catch
              console.log(error);
            });
          }
        }
      },
      //增加二级菜单并获取模块类型
      moduleTypeData: function() {
        this.$http.post('/dic/getDicByKey/moduletype').then(res => {
          if (res.code == 10000) {
            this.addModuleType = res.data;
          } else {
            this.$message.error(res.msg);
          }
        }).catch(function (error) {//加上catch
          console.log(error);
        });
      },
      addMenuTitle: function(addType) {
        if(addType == "event"){
          this.increaseModule = false;
          this.increaseEvent = true;
          this.showA = false;
          this.showB = false;
        }
        if(addType == "module"){
          this.increaseEvent = false;
          this.increaseModule = true;
          this.showA = true;
          this.showB = true;
        }
        this.showAddMenuWindow = true;
        this.showModify = false;
        this.showSubmit = true;
        this.moduleTypeData();
      },
      //移除二级菜单
      removeMenu: function (item, type) {
        console.log(item)
        this.$confirm('确认删除？', '提示！', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let data;
          if(type == "event"){
            data = {typeid: item.EVENTTYPEID}
            this.$http.post('/event/del/rootType/'+ item.EVENTTYPEID, data).then(res => {
              if (res.code == 10000) {
                this.initEventConfig();
                this.initModuleData();
                this.$message.success("删除成功！");
              }
            }).catch(function (error) {//加上catch
              console.log(error);
            });
          }
          if(type == "module"){
            data = {typeid: item.ID}
            this.$http.post('/module/del/'+ item.ID, data).then(res => {
              if (res.code == 10000) {
                this.initEventConfig();
                this.initModuleData();
                this.$message.success("删除成功！");
              }
            }).catch(function (error) {//加上catch
              console.log(error);
            });
          }
        }).catch(() => {

        });
      },
      //修改事件二级菜单
      modifyMenu: function(item) {
        this.showAddMenuWindow = true;
        this.showSubmit = false;
        this.showModify = true;
        this.moduleModifyData = false;
        this.eventModifyData = true;
        var data = {
          ID: item.EVENTTYPEID
        }
        //模块类型
        this.moduleTypeData();
        //回现数据
        this.$http.post('/event/echoType/'+ data.ID, data).then(res => {
          if (res.code == 10000) {
            if(res.data.ISGENERAL == 1){
              res.data.ISGENERAL = true;
            }else{res.data.ISGENERAL = false;}
            if(res.data.ISUSED == 1){
              res.data.ISUSED = true;
            }else{res.data.ISUSED = false;}
            this.modifyMenuData = res.data;
          } else {
            this.$message.error(res.msg);
          }
        }).catch(function (error) {//加上catch
          console.log(error);
        });
      },
      //修改模块二级菜单
      modifyModuleMenu: function(item) {
        this.showAddMenuWindow = true;
        this.showSubmit = false;
        this.showModify = true;
        this.eventModifyData = false;
        this.moduleModifyData = true;
        var data = {
          ID: item.ID
        }
        //模块类型
        this.moduleTypeData();
        //回现数据
        this.$http.post('/module/detail/'+ data.ID, data).then(res => {
          if (res.code == 10000) {
            if(res.data.ISGENERAL == 1){
              res.data.ISGENERAL = true;
            }else{res.data.ISGENERAL = false;}
            if(res.data.ISUSED == 1){
              res.data.ISUSED = true;
            }else{res.data.ISUSED = false;}
            this.modifyMenuData = res.data;
          } else {
            this.$message.error(res.msg);
          }
        }).catch(function (error) {//加上catch
          console.log(error);
        });
      },
      //监听模块配置
      moduleMonitor: function (item) {
        this.labelTitle = "模块类型:";
        this.labelMark = "模块描述:";
        this.eventId = item.ID;
        this.showPermisPage = false;
        this.showEventConfig = false;
        for (let i in this.systemSetControl){
          this.systemSetControl[i] = false;
        }
        this.initModuleDtaaa(item.ID)
      },
      initModuleDtaaa: function(id){
        var data = {ID: id}
        this.$http.post('/module/elements/'+ id, data).then(res => {
          if (res.code == 10000) {
            this.showModuleConfig = true;
            this.moduleTwoMenu = res.data;
          } else {
            this.$message.error(res.msg);
          }
        }).catch(function (error) {//加上catch
          console.log(error);
        });
      },
      //初始化模块配置
      initModuleData: function () {
        this.$http.post('/module/modules').then(res => {
          if (res.code == 10000) {
            this.moduleConfig = res.data;
          } else {
            this.$message.error(res.msg);
          }
        }).catch(function (error) {//加上catch
          console.log(error);
        });
      },
      //监听事件配置点击事件数据
      eventMonitor: function (item) {
        this.labelTitle = "事件类型:";
        this.labelMark = "事件描述:";
        this.eventId = item.EVENTTYPEID;
        //console.log(this.eventId)
        this.showPermisPage = false;
        this.showModuleConfig = false;
        for (let i in this.systemSetControl){
          this.systemSetControl[i] = false;
        }
        this.initEventData(item.EVENTTYPEID);
      },
      initEventData: function (id) {
        this.showEventConfig = false;
        var data = {
          parentid: id
        }
        this.$http.post('/event/childType/'+ id, data).then(res => {
          if (res.code == 10000) {
            this.showEventConfig = true;
            this.twoEventMenu = res.data;
          } else {
            this.$message.error(res.msg);
          }
        }).catch(function (error) {//加上catch
         console.log(error);
        });
      },
      //初始化事件配置
      initEventConfig: function () {
        this.$http.post('/event/rootType').then(res => {
          if (res.code == 10000) {
            this.eventConfig = res.data;
          } else {
            this.$message.error(res.msg);
          }
        }).catch(function (error) {//加上catch
          console.log(error);
        });
      },
      //刷新权限组件数据
      refreshPermis: function () {
        this.initPermisData(this.permisNeedId);
      },
      //初始化权限组件数据
      initPermisData: function (id) {
        this.$http.post('/permissions/'+ id, this.permisSearch).then(res => {
          if (res.code == 10000) {
            for(let i of res.data.rows){
              if(i.ABANDON == 1){
                i.ABANDON = true;
              }else {
                i.ABANDON = false;
              }
              if(i.REJECTFILL == 1){
                i.REJECTFILL = true;
              }else {
                i.REJECTFILL = false;
              }
              if(i.WAITDEAL == 1){
                i.WAITDEAL = true;
              }else {
                i.WAITDEAL = false;
              }
              if(i.REJECTDEAL == 1){
                i.REJECTDEAL = true;
              }else {
                i.REJECTDEAL = false;
              }
              if(i.WAITCLOSE == 1){
                i.WAITCLOSE = true;
              }else {
                i.WAITCLOSE = false;
              }
              if(i.CLOSED == 1){
                i.CLOSED = true;
              }else {
                i.CLOSED = false;
              }
            }
            this.menuData = res.data;
            this.showPermisPage = true;
          } else {
            this.$message.error(res.msg);
          }
        }).catch(function (error) {//加上catch
          console.log(error);
        });
      },
      //监听权限菜单点击事件数据
      permisMonitor: function (item) {
        this.showPermisPage = false;
        this.showEventConfig = false;
        this.showModuleConfig = false;
        this.noticeTitle = item.ROLENAME;
        for (let i in this.systemSetControl){
          this.systemSetControl[i] = false;
        }
        this.permisSearch.roleid = item.ROLEID;
        this.permisNeedId = item.ROLEID;
        this.initPermisData(item.ROLEID)
      },
      //初始化权限菜单
      initPermisMenu: function () {
        this.$http.post('/role/list').then(res => {
          if (res.code == 10000) {
            this.permisMenu = res.data.filter((resData)=>{
              return resData.ROLEID != "1";
            });
            console.log(this.permisMenu)
          } else {
            this.$message.error(res.msg);
          }
        }).catch(function (error) {//加上catch
          console.log(error);
        });
      },
      openModulePage: function (moduleName) {
        this.showPermisPage = false;
        this.showEventConfig = false;
        this.showModuleConfig = false;
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
    }
  }
</script>
<style>
  .systemSet .el-submenu .el-menu-item{padding: 0 0 0 35px!important;}
  .systemSet .el-menu-item-group>ul{overflow: hidden;}
  .systemSet .el-submenu__title:hover .addMenu{display: inline-block;}
  .systemSet .el-menu-item:hover .minusMenu{display: inline-block;}
  .systemSet .addMenu{
    display: none;
    position: absolute;
    right: 40px;
    top: 0;
  }
  .systemSet .minusMenu{
    position: absolute;
    right: 10px;
    top: 0;
    display: none;
    color: #303133;
  }
  .systemSet .minusMenu .proFont{
    color: #333;
    font-size: 19px
  }
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
/*
  增删改弹窗
*/
  .systemSet .addMenuWindow{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    /*border: 1px solid red;*/
    background: rgba(128, 128, 128, 0.5);
    z-index: 200;
  }
  .systemSet .addMenuWindow .container{
    width: 100%;
    height: 100%;
    position: relative;
  }
  .systemSet .addMenuWindow .content{
    position: absolute;
    top: 50%;
    left: 50%;
    width: 400px;
    height: auto;
    transform: translate(-50%, -50%);
    background: white;
    padding: 30px 20px 5px 20px;
    box-sizing: border-box;
    z-index: 1000;
    border-radius: 3px;
  }
  .addMenuWindow .windowtitle{
    display: inline-block;
    text-align: right;
    width: 65px;
  }
  .addMenuWindow .content section{margin-bottom: 20px;}
  .addMenuWindow .windowBtn{flex: 1;text-align: center;margin-top: 5px;}
</style>
