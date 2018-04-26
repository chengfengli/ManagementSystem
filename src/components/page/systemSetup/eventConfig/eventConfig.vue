<template>
  <article class="medicalDevice">
    <aside class="conditions">
      <section  :class="[{activeMenu:term.showActiveMenu}]"  v-for="(term, index) in eventMenu" @click="monitorClick(term, index)">{{ term.TYPENAME }}
        <div class="element" style="margin-right: 25px" @click="removeElement(term)">
          <i class="proFont" style="color: #333;font-size: 19px;line-height: 40px;">&#xe633;</i>
        </div>
        <div class="element" @click="modifyElement(term)" >
          <i class="proFont" style="color: #333;font-size: 19px;line-height: 30px;" >&#xe8cf;</i>
        </div>
      </section>
      <section style="text-align: left;" v-show="eventMenu.length <= 0 ">无数据</section>
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
    <div class="addElementWindow" v-if="showEventWindow">
      <div class="container">
        <div class="content">
          <div style="margin: auto;width: 80%;">
            <section>
              <label class="windowtitle">菜单名称:</label>
              <el-input v-model="eventEchoType.TYPENAME" placeholder="请输入内容" size="small " style="display: inline-block;width: 190px"></el-input>
            </section>
            <section>
              <label class="windowtitle">描述:</label>
              <el-input v-model="eventEchoType.MARK"  placeholder="请输入内容" size="small " style="display: inline-block;width: 190px"></el-input>
            </section>
            <section>
              <label class="windowtitle">父类:</label>
              <el-select v-model="eventEchoType.PARENTID" size="small" style="width: 190px" placeholder="请选择">
                <el-option
                  v-for="item in seleSuper"
                  :key="item.EVENTTYPEID"
                  :label="item.TYPENAME"
                  :value="item.EVENTTYPEID">
                </el-option>
              </el-select>
              <!--<el-input v-model="eventEchoType.MARK"  placeholder="请输入内容" size="small " style="display: inline-block;width: 190px"></el-input>-->
            </section>
            <section style="display: flex;">
              <div class="windowBtn">
                <el-button style="padding: 10px 30px" type="info" round @click="showEventWindow = false">取消</el-button>
              </div>
              <div class="windowBtn">
                <el-button style="padding: 10px 30px" type="danger" round @click="updataEventSubmit()">确定</el-button>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
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
        seleSuper: [],
        eventEchoType: {
          EVENTTYPEID: null,
          ISDEL: null,
          MARK: "",
          PARENTID: null,
          TYPENAME: "",
        },
        showEventWindow: false,
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
      for(let item of this.eventMenu){
          item.showActiveMenu = false;
        }
      console.log(this.eventMenu)
    },
    methods: {
      updataEventSubmit: function () {
        let data = {
          EVENTTYPEID: this.eventEchoType.EVENTTYPEID,
          PARENTID: this.eventEchoType.PARENTID,
          TYPENAME: this.eventEchoType.TYPENAME,
          MARK: this.eventEchoType.MARK
        }
        this.$http.post('/event/updateType/'+ data.EVENTTYPEID, data).then(res => {
          if (res.code == 10000) {
            this.showEventWindow = false;
            this.$emit("evetSonData", data.PARENTID);
            this.$message.success("修改成功！");
          } else {
            this.$message.error(res.msg);
          }
        }).catch(function (error) {//加上catch
          console.log(error);
        });
      },
      removeElement: function(term) {
        this.$confirm('确认删除？', '提示！', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let data = {typeid: term.EVENTTYPEID}
          this.$http.post('/event/del/childType/'+ data.typeid, data).then(res => {
            if (res.code == 10000) {
               this.$emit("evetSonData");
              this.$message.success("删除成功！");
              //window.location.reload();
            } else {
              this.$message.error(res.msg);
            }
          }).catch(function (error) {//加上catch
            console.log(error);
          });
        }).catch(() => {
        });
      },
      modifyElement: function(term) {
        this.showEventWindow = true;
        this.$http.post('/event/rootType').then(res => {
          if (res.code == 10000) {
            this.seleSuper = res.data;
          } else {
            this.$message.error(res.msg);
          }
        }).catch(function (error) {//加上catch
          console.log(error);
        });
        let data = {
          typeid: term.EVENTTYPEID
        }
        this.$http.post('/event/echoType/'+ data.typeid, data).then(res => {
          if (res.code == 10000) {
            this.eventEchoType = res.data;
          } else {
            this.$message.error(res.msg);
          }
        }).catch(function (error) {//加上catch
          console.log(error);
        });
      },
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
        this.submitID = term.EVENTTYPEID;
        this.showBasicSetup = true;
        this.showTitle = true;
        this.defaultActive = true;
        this.noDefaultActive = false;
        this.showAllPageData = true;

        // for(let item of this.eventMenu){
        //   if(item.TYPENAME == term.TYPENAME){
        //     this.eventMenu[index].showActiveMenu= true;
        //     Vue.set(this.eventMenu, index, this.eventMenu[index]);
        //     let notNeedData =  this.eventMenu.filter( (notAtive) => {
        //       return notAtive.TYPENAME != term.TYPENAME;
        //     })
        //     for(let noActive of notNeedData){
        //       noActive.showActiveMenu = false;
        //     }
        //   }
        // }


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
  .medicalDevice .conditions{flex: 2;border-right: 1px solid #E6E6E6;padding-top: 15px;}
  .medicalDevice .conditions section{
    position: relative;
    width: 100%;
    padding: 10px 0 10px 20px;
    box-sizing: border-box;
    text-align: left;
  }
  .medicalDevice .container{
    flex: 8;
  }
  .medicalDevice .activeMenu{cursor: pointer;background: #ECF5FF;}
  .medicalDevice .conditions section:hover{
      cursor: pointer;background: #ECF5FF;
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
  .medicalDevice .active{background: #ECF5FF;}
  .medicalDevice .medicalDevice-m{
    height: calc(100% - 47px);
    width: 100%;
  }
  .medicalDevice .conditions section:hover .element{
    display: block;
  }
  .medicalDevice .element{
    display: none;
    position: absolute;
    top: 0;
    right: 8px;
  }

  /* 弹窗 */
  .medicalDevice .addElementWindow{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%!important;
    height: 100%!important;
    /*border: 1px solid red;*/
    background: rgba(128, 128, 128, 0.5);
    z-index: 200;
  }
  .medicalDevice .addElementWindow .container{
    width: 100%;
    height: 100%;
    position: relative;
  }
  .medicalDevice .addElementWindow .content{
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
  .medicalDevice .addElementWindow{
    display: inline-block;
    text-align: right;
    width: 65px;
  }
  .medicalDevice .content section{margin-bottom: 20px;}
  .medicalDevice .windowBtn{flex: 1;text-align: center;margin-top: 5px;}
</style>
