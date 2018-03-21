<template>
  <article class="basicSetup">
    <section class="basicSetup-universalSet">
      <div class="basicSetup-title">
        <span style="display: inline-block;border-bottom: 1px solid #666;width: 100%;">通用设置</span>
      </div>
      <div style="padding-left: 30px;padding-top: 8px;">
        <div>
          <label>关闭填报:</label>
          <el-checkbox v-model="checked">勾选后事件禁止填报</el-checkbox>
        </div>
        <div>
          <label>手机填报:</label>
          <el-checkbox v-model="checked">勾选后事件可在App填报</el-checkbox>
        </div>
        <div>
          <label>禁用:</label>
          <el-checkbox v-model="checked">勾选后事件停止处理</el-checkbox>
        </div>
        <div>
          <label>事件名称:</label>
          <input/>
        </div>
      </div>
    </section>
    <section class="basicSetup-eventSet">
      <div class="basicSetup-title">
        <span style="display: inline-block;border-bottom: 1px solid #666;width: 100%;">通用设置</span>
      </div>
      <div style="padding-left: 30px;padding-top: 8px;">
        <div>
          <label>关闭填报:</label>
          <el-checkbox v-model="checked">勾选后事件禁止填报</el-checkbox>
        </div>
        <div>
          <label>手机填报:</label>
          <el-checkbox v-model="checked">勾选后事件可在App填报</el-checkbox>
        </div>
        <div>
          <label>禁用:</label>
          <el-checkbox v-model="checked">勾选后事件停止处理</el-checkbox>
        </div>
        <div>
          <label>事件名称:</label>
          <input/>
        </div>
      </div>
    </section>
    <section class="basicSetup-otherSet">
      <div class="basicSetup-title">
        <span style="display: inline-block;border-bottom: 1px solid #666;width: 100%;">通用设置</span>
      </div>
      <div style="padding-left: 30px;padding-top: 8px;">
        <div>
          <label>关闭填报:</label>
          <el-checkbox v-model="checked">勾选后事件禁止填报</el-checkbox>
        </div>
        <div>
          <label>手机填报:</label>
          <el-checkbox v-model="checked">勾选后事件可在App填报</el-checkbox>
        </div>
        <div>
          <label>禁用:</label>
          <el-checkbox v-model="checked">勾选后事件停止处理</el-checkbox>
        </div>
        <div>
          <label>事件名称:</label>
          <input/>
        </div>
      </div>
    </section>
  </article>
</template>

<script>
  export default {
    name: "basicSetup",
    data(){
      return{
        checked: false,
      }
    }

  }
</script>

<style>
  .basicSetup{
    height: 100%;
    width: 100%;
    overflow: auto;
    border: 1px solid yellow;
  }
  .basicSetup-title{padding-left: 20px;margin-top: 15px;}
  .basicSetup-universalSet label{
    width: 70px;
    display: inline-block;
    text-align: right;
    margin-right: 15px;
  }
</style>
