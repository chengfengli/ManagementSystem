<template>
    <div class="basicInfo">
      <article class="basicInfo4 clear-fix">
        <section class="basicInfo-grade set-left">
          <aside class="clear-fix">
            <div class="set-left">
              <label>事件ID:</label>
              <span>{{ basicInfoData.BASICINFO.ID }}</span>
            </div>
            <div class="set-right">{{ basicInfoData.BASICINFO.TYPENAME }}</div>
          </aside>
          <aside class="clear-fix" style="text-align: left;margin-top: 10px;">
            <div class="set-left">
              <label>事件等级:</label>
              <span>{{ basicInfoData.BASICINFO.LEVEL }}</span>
            </div>
            <div class="set-right">{{ basicInfoData.BASICINFO.CHILDTYPE }}</div>
          </aside>
          <aside style="margin-top: 20px;">
            <section style="display: inline-block;padding: 18px 25px;box-sizing: border-box;border: 1px solid #797979;border-radius: 50%;text-align: center">
              <i class="proFont" style="font-size: 45px;">&#xe62c;</i><br/>
              <span style="color: red;">{{ basicInfoData.BASICINFO.THUMBS }}</span>
            </section>
            <section style="display: inline-block;margin-left: 30px;">
              <el-rate
                v-model="basicInfoData.BASICINFO.GRADE"
                disabled
                show-score
                text-color="#ff9900"
                score-template="{value}">
              </el-rate>
            </section>
          </aside>
        </section>
        <section class="basicInfo-radio set-right">
          <div class="basicInfo-radio-content">
            <section v-for="item in basicInfoData.STATUSAXIS">
              <div class="basicInfo-item" style="display: inline-block">
               <span :class="{roundStyle: true,roundLine: item.roundActive,succeed: item.activeSucceed,danger: item.activeDanger}">{{ item.INDEX }}</span>
               <span :class="{defaultStyle: item.defaultStyle,roundLine: item.roundActive,succeed: item.activeSucceed,}"></span><br/>
               <span :class="{dangerColor: item.dangerColor,succeedColor: item.succeedColor}">{{ item.STATUS }}</span><br/>
             </div>
              <div style="display: inline-block">
                <span>{{ item.OPER }}</span><br/>
                <span>{{ item.OPERDEPT }}</span><br/>
                <span>{{ item.OPTIME }}</span><br/>
              </div>
            </section>
          </div>
        </section>
      </article>
      <article class="basicInfo6 clear-fix">
        <section class="basicInfo6-left set-left">
          <aside class="reported-info">
            <div>
              <label>上报日期:</label>
              <span>{{ basicInfoData.BASICINFO.PUBLISHDATE }}</span>
            </div>
            <div style="margin-top: 5px">
              <label>上报人:</label>
              <span>{{ basicInfoData.BASICINFO.REPORTOR }}</span>
            </div>
            <!--<div>
              <label>职务名称:</label>
              <span>信息科科长</span>
            </div>-->
            <div style="margin-top: 5px">
              <label>处理部门:</label>
              <span>{{ basicInfoData.BASICINFO.REPORTDEPT }}</span>
            </div>
          </aside>
        </section>
        <section class="basicInfo6-right set-right">
          <div v-for="item in basicInfoData.OPTIONS" style="margin-left: 15px;box-sizing: border-box">{{ item.OPTIME }}{{ item.OPER }} ({{ item.OPERDEPT }}) {{ item.OPTIONS }}</div>
        </section>
      </article>
    </div>
</template>

<script>
  export default {
    name: "basicInfo",
    props: ["dataId"],
    mounted: function () {
      this.initBasicInfoData(this.dataId);
    },
    data(){
      return{
        /*roundActive: true,
        activeSucceed: false,
        activeDanger: false,*/
        basicInfoData: {},
        value3: null,
        radio: 3
      }
    },
    methods: {
      //基本信息初始数据
      initBasicInfoData: function (eventId) {
        this.$http.post('/event/basicInfo/'+ eventId).then(res => {
          if (res.code == 10000) {
            this.basicInfoData = res.data;
            for(let item of this.basicInfoData.STATUSAXIS){
              item.roundActive = true;
              item.activeSucceed = false;
              item.succeedColor = false;
              item.activeDanger = false;
              item.dangerColor = false;
              item.defaultStyle = true;
              if(item.LIGHTEN == true){
                item.activeSucceed = true;
                item.succeedColor = true;
              }
              if(item.CURRSTATUS == true){
                item.activeSucceed = false;
                item.succeedColor = false;
                item.activeDanger = true;
                item.dangerColor = true;
              }
            }
            this.basicInfoData.STATUSAXIS[6].defaultStyle = false;
          } else {
            this.$message.error(res.msg);
          }
        }).catch(function (error) {//加上catch
          console.log(error);
        });
      },
    },
    components: {

    }
  }
</script>

<style>
  .basicInfo{
    height: 100%;
    width: 100%;
    position: relative;
    min-width: 1300px;
    overflow-x: hidden;
    overflow-y: auto;
    color: #333;
  }
  .basicInfo .basicInfo4{
    height: 290px;
    width: 100%;
  }
  .basicInfo .basicInfo4 .basicInfo-grade{
    padding: 45px 45px;
    box-sizing: border-box;
    border: 1px ;
    height: 100%;
    width: 30%;
    border-right: 1px solid #C8BEB6;
  }
  .basicInfo .basicInfo4 .basicInfo-radio{
    height: 100%;
    width: 69.8%;
  }
  .basicInfo-radio .basicInfo-radio-content{
    width: 100%;
    display: flex;
    margin: auto;
    padding-top: 10%;
    padding-left: 6%;
  }
  .basicInfo-radio .basicInfo-radio-content section{
    width: 100%;
    flex: 1;
  }
  .basicInfo-item{
    width: 100%;
  }
  .basicInfo .roundStyle{
    text-align: center;
    display: inline-block;
    height: 24px;
    width: 24px;
    line-height: 24px;
    border-radius: 50%;
    background: #B9B9B9;
    color: white;
  }
  .basicInfo .defaultStyle{
    width: 75%;
    height: 5px;
    display: inline-block;
  }
  .basicInfo .basicInfo-radio .defaultStyle:last-child{
    display: none!important;
  }
  .basicInfo .roundLine{background: #B9B9B9;}
  .basicInfo .succeed{background: #85E085;}
  .basicInfo .danger{background: red;}
  .basicInfo .dangerColor{color: red;}
  .basicInfo .succeedColor{color: #85E085;}


  /*  66666  */
  .basicInfo .basicInfo6{
    width: 100%;
    height: 460px;
    border-top: 1px solid #C8BEB6;
    border-bottom: 1px solid #C8BEB6;
  }
  .basicInfo .basicInfo6 .basicInfo6-left{
    width: 30%;
    height: 100%;
    padding-left: 15px;
    padding-top: 15px;
    box-sizing: border-box;
    border-right: 1px solid #C8BEB6;
  }
  .basicInfo .basicInfo6 .basicInfo6-right{
    width: 69.8%;
    height: 100%;
    padding-top: 15px;
  }
</style>
