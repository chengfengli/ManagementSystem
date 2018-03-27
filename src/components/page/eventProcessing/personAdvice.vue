<template>
  <div class="personAdvice">
    <article class="personAdvice-container">
      <header class="personAdvice-h">
        <section>发布时间排序</section>
        <section>点赞数量排序</section>
        <section>删除建议</section>
        <section>编辑建议</section>
      </header>
      <main class="personAdvice-m">
        <div style=" border-bottom: 1px solid #797979;">
          <section class="personAdvice-content">
            <span class="content-title">发布人</span>
            <div class="content-data">
              <span>存在问题</span>
              <div>内容</div>
            </div>
          </section>
          <section class="personAdvice-content">
            <span class="content-title">赞（100）</span>
            <div class="content-data">
              <span>改进措施</span>
              <div>内容</div>
            </div>
          </section>
        </div>
      </main>
    </article>
  </div>
</template>

<script>
  export default {
    name: "personAdvice"
  }
</script>

<style>
  .personAdvice{
    width: 100%;
    height: 100%;
    padding: 20px 40px;
    box-sizing: border-box;
  }
  .personAdvice .personAdvice-container{
    border: 1px solid #797979;
    width: 100%;
    height: 100%;
  }
  .personAdvice-h{padding: 9px 20px;border-bottom: 1px solid #797979;}
  .personAdvice-h section{
    display: inline-block;
    padding: 4px 20px;
    border: 1px solid #797979;
    margin-right: 15px;
  }
  .personAdvice-m{
    padding: 9px 20px;
    box-sizing: border-box;
  }
  .personAdvice-m .personAdvice-content{
    width: 90%;
    display: flex;
    margin: auto;
    padding: 8px 0;

  }
  .personAdvice-content .content-title{flex: 1;text-align: center;}
  .personAdvice-content .content-data{flex: 9;}
  .personAdvice-content .content-data div{border: 1px solid #797979;padding: 10px 0;text-align: center;}
</style>
