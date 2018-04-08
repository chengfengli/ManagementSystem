<template>
  <div class="allPage">
    <article class="basicSetup" v-show="showBasicSetup">
      <div class="basicSetup-universalSet" >
        <div class="basicSetup-title">
          <span style="display: inline-block;border-bottom: 1px solid #666;width: 100%;" @click="getDictionary">通用设置</span>
        </div>
        <aside style="padding-left: 30px;padding-top: 8px;">
          <section>
            <label>关闭填报:</label>
            <el-checkbox class="ck-btn" v-model="allPageData.ISCLOSED" label="勾选后事件禁止填报"></el-checkbox>
          </section>
          <section>
            <label>手机填报:</label>
            <el-checkbox v-model="allPageData.APPFILL" label="勾选后事件可在App填报"></el-checkbox>
          </section>
          <section>
            <label>禁用:</label>
            <el-checkbox v-model="allPageData.ISUSED" label="勾选后事件停止处理"></el-checkbox>
          </section>
          <section>
            <label>开放事件:</label>
            <el-checkbox v-model="allPageData.ISOPEN" label="提交结案时可放到事件中心"></el-checkbox>
          </section>
          <section>
            <label style="vertical-align: central;">选色板:</label>
            <input class="seleColor" type="color"  v-model="allPageData.NAMECOLOR"/>
          </section>
          <!--  <section>
              <label>事件描述:</label>
              <input/>
              <span>指导填报人填报事件</span>
            </section>-->
          <section>
            <label>排序号:</label>
            <input v-model="allPageData.SN" />
            <span>数字越小显示越靠前</span>
          </section>
        </aside>
      </div>
      <div class="basicSetup-universalSet" >
        <div class="basicSetup-title">
          <span style="display: inline-block;border-bottom: 1px solid #666;width: 100%;">事件设置</span>
        </div>
        <aside style="padding-left: 30px;padding-top: 8px;">
          <section>
            <label>事件填报:</label>
            <el-select
              v-model="allPageData.REPORTMODE"
              size="small"
              placeholder="请选择">
              <el-option
                v-for="item in reportmode"
                :key="item.VALUE"
                :label="item.DISPLAY"
                :value="item.VALUE">
              </el-option>
            </el-select>
            <span>事件填报方式</span>
          </section>
          <section>
            <label>事件类型:</label>
            <el-select v-model="allPageData.PARENTID" placeholder="请选择" @change="pickerEventType(allPageData.PARENTID)" size="small">
              <el-option
                v-for="item in rootType"
                :key="item.EVENTTYPEID"
                :label="item.TYPENAME"
                :value="item.EVENTTYPEID">
              </el-option>
            </el-select>
            <el-select v-model="allPageData.TYPEID" placeholder="请选择" size="small">
              <el-option
                v-for="item in childType"
                :key="item.EVENTTYPEID"
                :label="item.TYPENAME"
                :value="item.EVENTTYPEID">
              </el-option>
            </el-select>
            <span>二级事件所在模块和元素配置，提交报告后将默认设置二级事件</span>
          </section>
          <section>
            <label>事件处理:</label><!--@change="departmentData"-->
            <el-select v-model="allPageData.DEALMODE" placeholder="请选择"  size="small">
              <el-option
                v-for="item in dealmode"
                :key="item.VALUE"
                :label="item.DISPLAY"
                :value="item.VALUE">
              </el-option>
            </el-select>
            <el-select
              v-model="allPageData.DEALDEPT"
              multiple
              collapse-tags
              size="small"
              placeholder="请选择">
              <el-option
                v-for="item in initDepartment"
                :key="item.VALUE"
                :label="item.DISPLAY"
                :value="item.VALUE">
              </el-option>
            </el-select>
            <span>指定事件处理方式及科室范围（不选择，默认为所有'业务'科室）</span>
          </section>
          <section>
            <label>事件管理:</label>
            <el-select v-model="allPageData.RETURNDEPT"  placeholder="请选择" size="small">
              <el-option
                v-for="item in initDepartment"
                :key="item.VALUE"
                :label="item.DISPLAY"
                :value="item.VALUE">
              </el-option>
            </el-select>
            <span>指定此事件固定归口（管理）部门。（请确保此科室已设置"事件管理员"）</span>
          </section>
          <section>
            <label>分管领导:</label>
            <el-select v-model="allPageData.DIVISIONLEADER" placeholder="请选择" size="small">
              <el-option
                v-for="item in divisorLeaderData"
                :key="item.VALUE"
                :label="item.DISPLAY"
                :value="item.VALUE">
              </el-option>
            </el-select>
            <span>指定此事件分管领导，设置分管领导后，事件处理人员和归口部门可选择是否上报事件到分管领导</span>
          </section>
          <section>
            <label>事件报告:</label>
            <el-select v-model="allPageData.PERFECTREPORTMODE"  placeholder="请选择" size="small">
              <el-option
                v-for="item in perfectmode"
                :key="item.VALUE"
                :label="item.DISPLAY"
                :value="item.VALUE">
              </el-option>
            </el-select>
            <span>上报事件后，完善部门需重新编辑完善报告，若选择强制完善，未完善将不能继续上报（注：与角色权限配套使用</span>
          </section>
          <section>
            <label>分析报告:</label>
            <el-select v-model="allPageData.ANALYSISREPORTMODE" placeholder="请选择" size="small">
              <el-option
                v-for="item in perfectmode"
                :key="item.VALUE"
                :label="item.DISPLAY"
                :value="item.VALUE">
              </el-option>
            </el-select>
            <span>上报事件后，完善部门需重新编辑完善报告，若选择强制完善，未完善将不能继续上报（注：与角色权限配套使用</span>
          </section>
          <!---->
          <section>
            <label style="min-width: 70px;">处理方式（发现部门)</label>
            <el-select
              v-model="allPageData.FINDDEALMODE"
              multiple
              collapse-tags
              size="small"
              placeholder="请选择">
              <el-option
                v-for="item in finddeptdealmode"
                :key="item.VALUE"
                :label="item.DISPLAY"
                :value="item.VALUE">
              </el-option>
            </el-select>
            <span>事件发现人，可选择继续上报对象</span>
          </section>
          <section>
            <label style="min-width: 70px;">处理方式（处理部门)</label>
            <el-select
              v-model="allPageData.DEALDEALMODE"
              multiple
              collapse-tags
              size="small"
              placeholder="请选择">
              <el-option
                v-for="item in managedeptdealmode"
                :key="item.VALUE"
                :label="item.DISPLAY"
                :value="item.VALUE">
              </el-option>
            </el-select>
            <span>事件管理部门，可选择处理事件的方式</span>
          </section>
          <section>
            <label style="min-width: 70px;">处理方式（管理部门)</label>
            <el-select
              v-model="allPageData.MANAGEDEALMODE"
              multiple
              collapse-tags
              size="small"
              placeholder="请选择">
              <el-option
                v-for="item in managedeptdealmode"
                :key="item.VALUE"
                :label="item.DISPLAY"
                :value="item.VALUE">
              </el-option>
            </el-select>
            <span>事件管理部门，可选择处理事件的方式</span>
          </section>
          <!---->
          <section>
            <label style="min-width: 70px;">事件详情显示模块</label>
            <el-select
              v-model="allPageData.DETAILSHOWMODE"
              multiple
              collapse-tags
              size="small"
              placeholder="请选择">
              <el-option
                v-for="item in detailshowtab"
                :key="item.VALUE"
                :label="item.DISPLAY"
                :value="item.VALUE">
              </el-option>
            </el-select>
            <span>事件详情页，允许显示模块。注：三大报告受"模块设置"控制</span>
          </section>
          <section>
            <label style="min-width: 70px;">默认协助处理科室</label>
            <el-select
              v-model="allPageData.DEFAULTASSISTDEALDEPT"
              multiple
              collapse-tags
              size="small"
              placeholder="请选择">
              <el-option
                v-for="item in initDepartment"
                :key="item.VALUE"
                :label="item.DISPLAY"
                :value="item.VALUE">
              </el-option>
            </el-select>
            <span>配置后， 上报事件时将自动设置这些科室为协助处理部门</span>
          </section>
          <section>
            <label style="min-width: 70px;">默认协助管理科室</label>
            <el-select
              v-model="allPageData.DEFAULTMANAGEDEALDEPT"
              multiple
              collapse-tags
              size="small"
              placeholder="请选择">
              <el-option
                v-for="item in initDepartment"
                :key="item.VALUE"
                :label="item.DISPLAY"
                :value="item.VALUE">
              </el-option>
            </el-select>
            <span>配置后， 上报事件时将自动设置这些科室为协助管理部门</span>
          </section>
        </aside>
      </div>
      <div class="basicSetup-universalSet" >
        <div class="basicSetup-title">
          <span style="display: inline-block;border-bottom: 1px solid #666;width: 100%;">其他设置</span>
        </div>
        <aside style="padding-left: 30px;padding-top: 8px;">
          <section>
            <label>处理时限:</label>
            <input v-model="allPageData.DEALTIMELIMIT"/>
            <span>单位:小时 0为无超期 ，发现人提交报告后，处理部门需在时限内完成处理。</span>
          </section>
          <section>
            <label>自动处理:</label>
            <input v-model="allPageData.AUTODEALTIME"/>
            <span>单位:小时 0为不自动处理 ，对于"等待处理"状态的事件，处理部门在时限内未完成处理，系统将自动提交事件到管理部门</span>
          </section>
          <section>
            <label>结案时限:</label>
            <input v-model="allPageData.CLOSETIMELIMIT"/>
            <span>单位:小时 0为无超期 ，发现人提交报告后，管理部门需要在规定时限内完成结案处理</span>
          </section>
          <section>
            <label>自动结案:</label>
            <input v-model="allPageData.AUTOCLOSETIME"/>
            <span>单位:小时 0为不自动结案 ，对于"待结案"状态事件，管理部门在时限内（填报日期起）未完成结案，系统将自动完成结案</span>
          </section>
        </aside>
      </div>
      <el-button type="danger" style="padding: 10px 40px;margin: 30px 0 50px 30px;" @click="basicSetSubmit">保存</el-button>
    </article>
    <article class="moduleSetup" v-show="showModuleSetup">
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
      <el-button type="danger" style="padding: 10px 40px;margin: 50px 0 50px 0;" @click="basicSetSubmit">保存</el-button>
    </article>
  </div>

</template>

<script>
  export default {
    name: "basicSetup",
    data(){
      return{
        basicColor: "",
        reportmode: [],
        rootType: [],
        childType: [],
        dealmode: [],
        perfectmode: [],
        finddeptdealmode: [],
        dealdeptdealmode: [],
        managedeptdealmode: [],
        detailshowtab: [],
        reportdatasource: [],
        initDepartment: [],
        basicSetata: {},
        checked: false,
        eventManagevalue: "",
        //模块设置
        eventDataSource:[],
        moduleList: [],
      }
    },
    props: ["allPageData", "besicSetID", "divisorLeaderData", "submitID", "showModuleSetup", "showBasicSetup"],
    mounted: function(){
      this.getDictionary();
      this.alldepartmentData();
      this.getModuleDictionary();
      this.getModulelist();
      console.log(this.allPageData.TYPEID)
    },
    methods: {
      basicSetSubmit: function () {
        if(this.allPageData.ISCLOSED == true){
          this.allPageData.ISCLOSED = 1;
        }else {this.allPageData.ISCLOSED = 0;}
        if(this.allPageData.APPFILL == true){
          this.allPageData.APPFILL = 1;
        }else {this.allPageData.APPFILL = 0;}

        if(this.allPageData.ISUSED == true){
          this.allPageData.ISUSED = 1;
        }else {this.allPageData.ISUSED = 0;}

        if(this.allPageData.ISOPEN == true){
          this.allPageData.ISOPEN = 1;
        }else {this.allPageData.ISOPEN = 0;}

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
        this.allPageData.TYPEID = this.besicSetID;
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
      //所有部门关联接口
      alldepartmentData: function () {
        var data = {key: "dept"}
        this.$http.post('/dic/getDicByKey/'+ data.key, data).then(res => {
          if (res.code == 10000) {
            this.initDepartment = res.data;
          } else {
            this.$message.error(res.msg);
          }
        }).catch(function (error) {//加上catch
          console.log(error);
        });
      },
      pickerEventType: function(id){
        //事件类型子类
         var data = {parentid: id}
         this.$http.post('/event/childType/'+ id, data).then(res => {
           if (res.code == 10000) {
              this.childType = res.data;
              for(let id of this.childType){
                if(id.EVENTTYPEID == this.besicSetID){
                  this.allPageData.TYPEID = this.besicSetID;
                }else {this.allPageData.TYPEID = null}
              }
           } else {
             this.$message.error(res.msg);
           }
         }).catch(function (error) {//加上catch
           console.log(error);
         });
      },
      /*
     * 获取字典组
     * */
      getDictionary: function(){
        console.log(this.allPageData.NAMECOLOR);
        //事件填报
        this.$http.post('/dic/getDicByKey/reportmode').then(res => {
          if (res.code == 10000) {
            this.reportmode = res.data;
          } else {
            this.$message.error(res.msg);
          }
        }).catch(function (error) {//加上catch
          console.log(error);
        });
        //事件类型
        this.$http.post('/event/rootType').then(res => {
          if (res.code == 10000) {
            this.rootType = res.data;
          } else {
            this.$message.error(res.msg);
          }
        }).catch(function (error) {//加上catch
          console.log(error);
        });
        //事件处理
        this.$http.post('/dic/getDicByKey/dealmode').then(res => {
          if (res.code == 10000) {
            this.dealmode = res.data;
          } else {
            this.$message.error(res.msg);
          }
        }).catch(function (error) {//加上catch
          console.log(error);
        });
        //事件完善(事件报告，分析报告)
        this.$http.post('/dic/getDicByKey/perfectmode').then(res => {
          if (res.code == 10000) {
            this.perfectmode = res.data;
          } else {
            this.$message.error(res.msg);
          }
        }).catch(function (error) {//加上catch
          console.log(error);
        });
        //发现部门处理方式
        this.$http.post('/dic/getDicByKey/finddeptdealmode').then(res => {
          if (res.code == 10000) {
            this.finddeptdealmode = res.data;
          } else {
            this.$message.error(res.msg);
          }
        }).catch(function (error) {//加上catch
          console.log(error);
        });
        //处理部门处理方式
        this.$http.post('/dic/getDicByKey/dealdeptdealmode').then(res => {
          if (res.code == 10000) {
            this.dealdeptdealmode = res.data;
          } else {
            this.$message.error(res.msg);
          }
        }).catch(function (error) {//加上catch
          console.log(error);
        });
        //管理部门处理方式
        this.$http.post('/dic/getDicByKey/managedeptdealmode').then(res => {
          if (res.code == 10000) {
            this.managedeptdealmode = res.data;
          } else {
            this.$message.error(res.msg);
          }
        }).catch(function (error) {//加上catch
          console.log(error);
        });
        //事件详情显示模块
        this.$http.post('/dic/getDicByKey/detailshowtab').then(res => {
          if (res.code == 10000) {
            this.detailshowtab = res.data;
            console.log(this.detailshowtab)
          } else {
            this.$message.error(res.msg);
          }
        }).catch(function (error) {//加上catch
          console.log(error);
        });
      },

      //模块设置
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
      },
    },
  }
</script>

<style>
  .allPage{
    height: 100%;
    width: 100%;
    overflow-x:hidden;
    overflow-y:auto;
  }
 /* .basicSetup{
    height: 100%;
    width: 100%;
    overflow-x:hidden;
    overflow-y:auto;
  }*/
  .basicSetup .basicSetup-universalSet{width: 100%;}
  .basicSetup .basicSetup-title{padding-left: 20px;margin-top: 15px;}
  .basicSetup .basicSetup-universalSet label{
    min-width: 70px;
    display: inline-block;
    text-align: right;
    margin-right: 15px;
  }
  .basicSetup .basicSetup-universalSet aside section{padding: 7px 0;}
  .basicSetup .seleColor{
    height: 150px;
    width: 180px;
    border: none;
    outline: none;
 }
  .basicSetup .seleColor:focus{outline: none;}
  /* 模块设置 */
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
