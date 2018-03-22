<template>
  <article class="moduleSetup">
    <aside class="moduleSetup-content">
      <section>
        <label>自动结案:</label>
        <el-select v-model="value" placeholder="请选择" size="small">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </section>
      <section>
        <label>事件报告数据源:</label>
        <el-select v-model="value" placeholder="请选择" size="small">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </section>
      <section>
        <label>事件分析模块:</label>
        <el-select v-model="value" placeholder="请选择" size="small">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </section>
      <section>
        <label>分析报告数据源:</label>
        <el-select v-model="value" placeholder="请选择" size="small">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </section>
      <section>
        <label>追踪报告模块:</label>
        <el-select v-model="value" placeholder="请选择" size="small">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </section>
      <section>
        <label>追踪报告模块:</label>
        <el-select v-model="value" placeholder="请选择" size="small">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </section>
    </aside>
    <el-button type="danger" style="padding: 10px 40px;margin: 50px 0 50px 0;">保存</el-button>
  </article>
</template>

<script>
export default {
  name: "moduleSetup",
  data(){
    return{
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      value: ''
    }
  }
}
</script>

<style>
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
</style>
