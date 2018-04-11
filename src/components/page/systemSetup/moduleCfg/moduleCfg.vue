<template>
  <article class="generalCase">
    <aside class="generalCase-select">
      <section v-for="module in moduleTwoMenu" @click="activeMenu(module)">{{ module.NAME }}</section>
    </aside>
    <aside class="generalCase-content" v-show="showModuleCfg">
      <div class="all-content">
        <div class="title">
          <label class="a-title">基本设置</label>
          <section>
            <label>元素类型</label>
            <el-select v-model="MmduleCfgData.TYPE" placeholder="请选择" size="mini" style="width: 170px;">
              <el-option
                v-for="item in elementTypeData"
                :key="item.VALUE"
                :label="item.DISPLAY"
                :value="item.VALUE">
              </el-option>
            </el-select>
            <span>单位:小时 0为无超期 ，发现人提交报告后，处理部门需在时限内完成处理。</span>
          </section>
          <section>
            <label>元素名称</label>
            <input style="width: 166px;" v-model="MmduleCfgData.NAME"/>
            <span>元素名称，模块内唯一</span>
          </section>
          <section>
            <label>禁用</label>
            <el-checkbox v-model="MmduleCfgData.ISUSED">禁用后停止使用</el-checkbox>
          </section>
          <section>
            <label>必填</label>
            <el-checkbox v-model="MmduleCfgData.ISREQUIRED"></el-checkbox>
          </section>
          <section>
            <label>摘要元素</label>
            <el-checkbox v-model="MmduleCfgData.ISSUMMARY">勾选后，此元素将为摘要元素，组成事件摘要</el-checkbox>
          </section>
          <section>
            <label>统计指标</label>
            <el-checkbox v-model="MmduleCfgData.ISSTATICTICS">勾选后，此元素将可统计，用于单一和交叉指标分析</el-checkbox>
          </section>
          <section>
            <label>排序号</label>
            <input style="width: 166px;" v-model="MmduleCfgData.SN"/>
            <span>越小的排在前面</span>
          </section>
        </div>
        <div class="title">
          <label class="a-title">基本设置</label>
          <section>
            <label>标题</label>
            <input style="width: 166px;" v-model="MmduleCfgData.LABEL"/>
            <span>越小的排在前面</span>
          </section>
          <section>
            <label>提示信息</label>
            <input style="width: 166px;" v-model="MmduleCfgData.TIP"/>
          </section>
          <!--<section>-->
          <!--<label>必填提示</label>-->
          <!--<input style="width: 166px;"v-model="MmduleCfgData.ERRTIP" />-->
          <!--<span>元素必填的提示</span>-->
          <!--</section>-->
          <section>
            <label>错误提示</label>
            <input style="width: 166px;" v-model="MmduleCfgData.ERRTIP"/>
          </section>
          <section>
            <label>验证正则</label>
            <input v-model="MmduleCfgData.REG" style="width: 166px;"/>
          </section>
          <section>
            <label>组件大小</label>
            <input v-model="MmduleCfgData.WIDTH"  type="number" style="width: 166px;"/>
            <span>X</span>
            <input v-model="MmduleCfgData.HEIGHT" type="number" style="width: 166px;"/>
          </section>
        </div>
        <div class="title">
          <label class="a-title">值设置</label>
          <section>
            <label>默认值</label>
            <input style="width: 166px;" v-model="MmduleCfgData.DEFAULTVALUE"/>
            <span>?</span>
          </section>
          <section>
            <label>可选值数据源</label>
            <el-select v-model="MmduleCfgData.DATASOURCE" placeholder="请选择" size="mini" style="width: 170px;">
              <el-option
                v-for="item in groupData"
                :key="item.KEY"
                :label="item.DIAPLAY"
                :value="item.KEY">
              </el-option>
            </el-select>
          </section>
        </div>
      </div>
      <el-button type="danger" style="padding: 10px 40px;margin: 30px 0 50px 45px;" @click="moduleSubmit">保存</el-button>
    </aside>
    <div class="addModuleWindow" v-if="showModuleWindow">
      <div class="container">
        <div class="content">
          <div style="margin: auto;width: 80%;">
            <!--<section>
              <label class="windowtitle">模块类型:</label>
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
              <label class="windowtitle">模块名称:</label>
              <el-input v-model="moduleSubmit.NAME" placeholder="请输入内容" size="small " style="display: inline-block;width: 190px"></el-input>
            </section>
            <section>
              <label class="windowtitle">描述:</label>
              <el-input v-model="moduleSubmit.MARK"  placeholder="请输入内容" size="small " style="display: inline-block;width: 190px"></el-input>
            </section>
            <section>
              <label class="windowtitle">排序号:</label>
              <el-input v-model="moduleSubmit.SN" placeholder="" size="small " style="display: inline-block;width: 190px"></el-input>
            </section>
            <section style="display: flex;">
              <div class="windowBtn">
                <el-button style="padding: 10px 30px" type="info" round @click="showAddMenuWindow = false">取消</el-button>
              </div>
              <div class="windowBtn">
                <el-button style="padding: 10px 30px" type="danger" round @click="addMenuSubmit('submit')">确定</el-button>
              </div>
            </section>-->
          </div>
        </div>
      </div>
    </div>
  </article>
</template>

<script>
  export default {
    name: "moduleCfg",
    data() {
      return {
        showModuleWindow: false,
        saveModuleId: null,
        showModuleCfg: false,
        MmduleCfgData: [],
        elementTypeData: {},
        groupData: [],
        checked: false,
      }
    },
    mounted: function () {
      this.dataSource();
      this.getElementType();
    },
    methods: {
      //保存
      moduleSubmit: function () {
        if (this.MmduleCfgData.ISUSED == true) {
          this.MmduleCfgData.ISUSED = 1;
        } else {
          this.MmduleCfgData.ISUSED = 0;
        }
        if (this.MmduleCfgData.ISREQUIRED == true) {
          this.MmduleCfgData.ISREQUIRED = 1;
        } else {
          this.MmduleCfgData.ISREQUIRED = 0;
        }
        if (this.MmduleCfgData.ISSUMMARY == true) {
          this.MmduleCfgData.ISSUMMARY = 1;
        } else {
          this.MmduleCfgData.ISSUMMARY = 0;
        }
        if (this.MmduleCfgData.ISSTATICTICS == true) {
          this.MmduleCfgData.ISSTATICTICS = 1;
        } else {
          this.MmduleCfgData.ISSTATICTICS = 0;
        }
        var data = {
          ID: this.saveModuleId,
          TYPE: this.MmduleCfgData.TYPE,
          NAME: this.MmduleCfgData.NAME,
          SN: this.MmduleCfgData.SN,
          ISUSED: this.MmduleCfgData.ISUSED,
          ISREQUIRED: this.MmduleCfgData.ISREQUIRED,
          ISSUMMARY: this.MmduleCfgData.ISSUMMARY,
          ISSTATICTICS: this.MmduleCfgData.ISSTATICTICS,
          ISANAYLIS: null,
          LABEL: this.MmduleCfgData.LABEL,
          PADDING: null,
          TEXTSIZE: null,
          COLOR: null,
          TIP: this.MmduleCfgData.TIP,
          ERRTIP: this.MmduleCfgData.ERRTIP,
          REG: this.MmduleCfgData.REG,
          WIDTH: this.MmduleCfgData.WIDTH,
          MAXFILENUM: null,
          ALLOWFILE: null,
          FILESIZE: null,
          DEFAULTVALUE: this.MmduleCfgData.DEFAULTVALUE,
          RELEVANCEINDEX: null,
          DATASOURCE: this.MmduleCfgData.DATASOURCE,
          MAXVAL: null,
          MINVAL: null,
          FILEDNAME: null,
          HEIGHT: this.MmduleCfgData.HEIGHT
        }
        this.$http.post('/element/modify/' + this.saveModuleId, data).then(res => {
          if (res.code == 10000) {
            this.$message.success("保存成功！");
          } else {
            this.$message.error(res.msg);
          }
        }).catch(function (error) {//加上catch
          console.log(error);
        });
      },
      //可选数据源
      dataSource: function () {
        this.$http.post('/dic/group').then(res => {
          if (res.code == 10000) {
            this.groupData = res.data;
            console.log(this.groupData)
          } else {
            this.$message.error(res.msg);
          }
        }).catch(function (error) {//加上catch
          console.log(error);
        });
      },
      //获取元素类型
      getElementType: function () {
        this.$http.post('/dic/getDicByKey/elementtype').then(res => {
          if (res.code == 10000) {
            this.elementTypeData = res.data;
            console.log(this.elementTypeData)
          } else {
            this.$message.error(res.msg);
          }
        }).catch(function (error) {//加上catch
          console.log(error);
        });
      },
      activeMenu: function (module) {
        this.showModuleCfg = true;
        this.saveModuleId = module.ID;
        var data = {
          ID: module.ID
        }
        this.$http.post('/element/detail/' + module.ID, data).then(res => {
          if (res.code == 10000) {
            var WIDTH = res.data.WIDTH;
            var items = WIDTH.split("p")
            res.data.WIDTH = items[0];

            var HEIGHT = res.data.HEIGHT;
            var aaaa = HEIGHT.split("p")
            res.data.HEIGHT = aaaa[0];

            if (res.data.ISUSED == 1) {
              res.data.ISUSED = true;
            } else {
              res.data.ISUSED = false;
            }
            if (res.data.ISREQUIRED == 1) {
              res.data.ISREQUIRED = true;
            } else {
              res.data.ISREQUIRED = false;
            }
            if (res.data.ISSUMMARY == 1) {
              res.data.ISSUMMARY = true;
            } else {
              res.data.ISSUMMARY = false;
            }
            if (res.data.ISSTATICTICS == 1) {
              res.data.ISSTATICTICS = true;
            } else {
              res.data.ISSTATICTICS = false;
            }

            this.MmduleCfgData = res.data;

          } else {
            this.$message.error(res.msg);
          }
        }).catch(function (error) {//加上catch
          console.log(error);
        });
      },
    },
    props: ["moduleTwoMenu"]
  }
</script>

<style>
  .generalCase {
    width: 100%;
    height: 100%;
    display: flex;
    overflow-x: hidden;
    overflow-y: auto;
  }
  .generalCase .generalCase-select {
    flex: 2;
    border-right: 1px solid #E6E6E6;
    max-width: 160px !important;
  }
  .generalCase .generalCase-select section {
    padding: 8px 0;
    text-align: center;
    cursor: pointer;
  }
  .generalCase .generalCase-select section:hover {
    background: #666666;
  }
  .generalCase .generalCase-content {
    flex: 8;
  }
  .generalCase .generalCase-content .all-content {
    padding: 15px 0 0 45px;
  }
  .generalCase .generalCase-content section {
    padding: 5px 0;
    box-sizing: border-box;
  }
  .generalCase .generalCase-content label:first-child {
    display: inline-block;
    width: 85px;
    text-align: left;
  }
  .generalCase .a-title {
    font-size: 16px;
    padding: 15px 0
  }
  .generalCase .title section {
    padding-left: 45px;
  }
  /* 弹窗 */
  .generalCase .addModuleWindow{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%!important;
    height: 100%!important;
    /*border: 1px solid red;*/
    background: rgba(128, 128, 128, 0.5);
    z-index: 200;
  }
  .generalCase .addModuleWindow .container{
    width: 100%;
    height: 100%;
    position: relative;
  }
  .generalCase .addModuleWindow .content{
    position: absolute;
    top: 50%;
    left: 50%;
    width: 400px;
    height: auto;
    transform: translate(-50%, -50%);
    background: white;
    padding: 30px 20px;
    box-sizing: border-box;
    z-index: 1000;
    border-radius: 3px;
  }
  .generalCase .addModuleWindow{
    display: inline-block;
    text-align: right;
    width: 65px;
  }
  .generalCase .content section{margin-bottom: 20px;}
  .generalCase .windowBtn{flex: 1;text-align: center;margin-top: 5px;}
</style>

