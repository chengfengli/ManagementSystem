<template>
    <div class="basicInfo">
      <article style="height: 40%;">
        <section class="basicInfo-grade" style="padding: 20px 0;box-sizing: border-box;" >
          <aside class="clear-fix" style="text-align: left;">
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
          <aside style="margin-top: 40px;">
            <section style="display: inline-block;padding: 25px;box-sizing: border-box;border: 1px solid #797979;border-radius: 50%;">
              <i class="proFont" style="font-size: 45px;">&#xe62c;</i>
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
        <section class="basicInfo-radio" >
          <div>
            <section>
              <span class="round-style">1</span>
              <span class="round-line"></span><br/>
              <lable>上报事件</lable><br/>
              <span>{{ basicInfoData.STATUSAXIS[0].OPER }}</span><br/>
              <span>{{ basicInfoData.STATUSAXIS[0].OPERDEPT }}</span><br/>
              <span>{{ basicInfoData.STATUSAXIS[0].OPTIME }}</span><br/>
            </section>
            <section>
              <span class="round-style">2</span>
              <span class="round-line"></span>
              <br/>
              <lable>废弃事件</lable>
            </section>
            <section>
              <span class="round-style">3</span>
              <span class="round-line"></span>
              <br/>
              <lable>驳回事件</lable>
            </section>
            <section>
              <span class="round-style">4</span>
              <span class="round-line"></span>
              <br/>
              <lable>等待处理</lable>
            </section>
            <section>
              <span class="round-style">5</span>
              <span class="round-line"></span>
              <br/>
              <lable>驳回处理</lable>
            </section>
            <section>
              <span class="round-style">6</span>
              <span class="round-line"></span>
              <br/>
              <lable>待结案</lable>
            </section>
            <section>
              <span class="round-style" style="display: block">7</span>
              <lable>已结案</lable>
            </section>
          </div>
        </section>
      </article>
      <article style="height: 60%;border-left: 1px solid #797979;">
        <section style="flex: 3;position: relative;border-right: 1px solid #797979;">
          <aside class="reported-info">
            <div>
              <label>上报日期:</label>
              <span>{{ basicInfoData.BASICINFO.PUBLISHDATE }}</span>
            </div>
            <div>
              <label>上报人:</label>
              <span>{{ basicInfoData.BASICINFO.REPORTOR }}</span>
            </div>
            <!--<div>
              <label>职务名称:</label>
              <span>信息科科长</span>
            </div>-->
            <div>
              <label>处理部门:</label>
              <span>{{ basicInfoData.BASICINFO.REPORTDEPT }}</span>
            </div>
          </aside>
        </section>
        <section style="flex: 7;position: relative;border-right: 1px solid #797979;">
          <aside class="reported-content">
            <div v-for="item in basicInfoData.OPTIONS">{{ item.OPTIME }}{{ item.OPER }} ({{ item.OPERDEPT }}) {{ item.OPTIONS }}</div>
          </aside>
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
            console.log(this.basicInfoData)
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
    overflow: hidden;
    position: relative;
  }
  .basicInfo article{display: flex;}
  .basicInfo .basicInfo-grade{
    flex: 3;
    box-sizing: border-box;
    border-left: 1px solid #797979;
    border-right: 1px solid #797979;
    border-bottom: 1px solid #797979;
  }
  .basicInfo .basicInfo-grade aside{width: 80%;margin: auto;}
  .basicInfo .basicInfo-radio{
    flex: 7;
    text-align: left;
    border-bottom: 1px solid #797979;
    border-right: 1px solid #797979;
    position: relative;
  }
  /*.basicInfo .basicInfo-radio div:first-child{padding-left: 20px;}
  .basicInfo .basicInfo-radio div:last-child{padding-right: 20px;}*/
  .basicInfo .basicInfo-radio div{
    width: 95%;
    display: flex;
    margin: auto;
    padding-top: 11%;
  }
  .basicInfo .basicInfo-radio div>section{flex: 1;}
  .basicInfo .round-style{
    text-align: center;
    display: inline-block;
    height: 24px;
    width: 24px;
    line-height: 24px;
    border-radius: 50%;
    background: #B9B9B9;
    color: white;
  }
  .basicInfo .round-line{
    width: 81%;
    height: 5px;
    display: inline-block;
    background: #B9B9B9;
  }
  .reported-info{
    position: absolute;
    top: 13%;
    left: 60%;
    transform: translate(-50%, -50%);
    width: 100%;
    text-align: left;
  }
  .reported-content{
    position: absolute;
    top: 5%;
    left: 55%;
    transform: translate(-50%, -50%);
    width: 100%;
    text-align: left;
  }
  .reported-info div label,
  .reported-info div span,
  .reported-content div{
    font-size: 17px;
  }
  .reported-content div,.reported-info div{padding: 8px 0;}


</style>
