<template>
    <div class="basicInfo">
      <article style="height: 40%;">
        <section class="basicInfo-grade" style="padding: 20px 0;box-sizing: border-box;" >
          <aside class="clear-fix" style="text-align: left;">
            <div class="set-left">
              <label>事件ID:</label>
              <span>123131123</span>
            </div>
            <div class="set-right">护理事件</div>
          </aside>
          <aside class="clear-fix" style="text-align: left;margin-top: 10px;">
            <div class="set-left">
              <label>事件等级:</label>
              <span>①</span>
            </div>
            <div class="set-right">送床</div>
          </aside>
          <aside style="margin-top: 40px;">
            <section style="display: inline-block;padding: 25px;box-sizing: border-box;border: 1px solid #797979;border-radius: 50%;">
              <i class="proFont" style="font-size: 45px;">&#xe62c;</i>
            </section>
            <section style="display: inline-block;margin-left: 30px;">
              <el-rate
                void-color="#333333"
                v-model="value3"
                style="font-size: 50px;"
                show-text>
              </el-rate>
            </section>
          </aside>
        </section>
        <section class="basicInfo-radio" >
          <div>
            <el-radio v-model="radio" label="1">上报事件</el-radio>
          </div>
          <div>
            <el-radio v-model="radio" label="1">废弃事件</el-radio>
          </div>
          <div>
            <el-radio v-model="radio" label="1">驳回事件</el-radio>
          </div>
          <div>
            <el-radio v-model="radio" label="1">等待处理</el-radio>
          </div>
          <div>
            <el-radio v-model="radio" label="1">驳回处理</el-radio>
          </div>
          <div>
            <el-radio v-model="radio" label="1">待结案</el-radio>
          </div>
          <div>
            <el-radio v-model="radio" label="1">已结案</el-radio>
          </div>
        </section>
      </article>
      <article style="height: 60%;border-left: 1px solid #797979;">
        <section style="flex: 3;position: relative;border-right: 1px solid #797979;">
          <aside class="reported-info">
            <div>
              <label>上报日期:</label>
              <span>2018/3/20</span>
            </div>
            <div>
              <label>上报人:</label>
              <span>XXXXX</span>
            </div>
            <div>
              <label>职务名称:</label>
              <span>信息科科长</span>
            </div>
            <div>
              <label>处理部门:</label>
              <span>信息科</span>
            </div>
          </aside>
        </section>
        <section style="flex: 7;position: relative;border-right: 1px solid #797979;">
          <aside class="reported-content">
            <div>2018-01-15 15:18匿名账户（匿名分组）更改了事件开放状态，由【关闭】变为【开放】状态</div>
            <div>2018-01-15 15:18匿名账户（匿名分组）更改了事件开放状态，由【关闭】变为【开放】状态</div>
            <div>2018-01-15 15:18匿名账户（匿名分组）更改了事件开放状态，由【关闭】变为【开放】状态</div>
          </aside>
        </section>
      </article>
    </div>
</template>

<script>
  export default {
    name: "basicInfo",
    data(){
      return{
        value3: null,
        radio: 3
      }
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
    display: flex;
    border-bottom: 1px solid #797979;
    border-right: 1px solid #797979;
  }
  .basicInfo .basicInfo-radio div{
    flex: 1;
    text-align: center;
    margin-top: 150px;
  }
  .reported-info,.reported-content{
    position: absolute;
    top: 30%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    text-align: center;
  }
  .reported-info div label,
  .reported-info div span,
  .reported-content div{
    font-size: 17px;
  }
  .reported-content div,.reported-info div{padding: 8px 0;}
</style>
