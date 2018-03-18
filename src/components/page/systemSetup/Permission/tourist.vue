<template>
  <article class="tourist">
    <section class="tourist-tip">注：当用户以游客身份进入此事件， 且事件在勾选的状态下，允许进行的操作</section>
    <section class="tourist-table">
      <div class="tourist-title">
        <div v-for="title in permissions">{{ title }}</div>
      </div>
      <div class="tourist-checkbox">
       <div>
         发布个人建议
       </div>
        <div>
          <el-checkbox v-model="checked"></el-checkbox>
        </div>
        <div>
          <el-checkbox v-model="checked"></el-checkbox>
        </div>
        <div>
          <el-checkbox v-model="checked"></el-checkbox>
        </div>
        <div>
          <el-checkbox v-model="checked"></el-checkbox>
        </div>
        <div>
          <el-checkbox v-model="checked"></el-checkbox>
        </div>
        <div>
          <el-checkbox v-model="checked"></el-checkbox>
        </div>
      </div>
    </section>
  </article>
</template>

<script>
    export default {
        name: "tourist",
        data(){
          return {
            checked: true,
            permissions: ['功能','废弃','驳回填报','等待处理','驳回处理','等待结案','已结案'],
          }
      }
    }
</script>

<style >
  .tourist{height: 100%;width: 100%;}
  .tourist .tourist-tip{padding: 13px 20px;box-sizing: border-box;}
  .tourist .tourist-title,.tourist .tourist-checkbox{
    display: flex;
    text-align: center;
  }
  .tourist .tourist-title div, .tourist .tourist-checkbox div{
    flex: 1;
    padding: 10px 0;
    border: 1px solid #EBEEF5;
  }
</style>
