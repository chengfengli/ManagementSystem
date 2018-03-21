<template>
  <article class="medicalDevice">
    <!--<aside class="conditions">
      <section v-for="term in eventConditions" @click="monitor(term)">{{ term }}</section>
    </aside>-->
    <aside class="container"></aside>
  </article>
</template>

<script>
    export default {
        name: "medicalDevice",
        data(){
          return{
            eventConditions: ['无电源', '运行故障', '操作失控'],
            medicalControl: {

            }
          }
        },
        methods: {
          monitor: function (term) {
            console.log(term);
          },
        },
    }
</script>

<style>
  .medicalDevice{
    height: 100%;
    width: 100%;
    border: 1px solid red;
    display: flex;
  }
  .medicalDevice .conditions{flex: 1;border: 1px solid black;}
  .medicalDevice .conditions section{width: 100%;padding: 6px 0;text-align: center;}
  .medicalDevice .container{
    flex: 9;
    overflow: auto;
    border: 1px solid yellow;
  }
</style>
