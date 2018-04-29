<template>
  <div class="fishboneMsa">
    <section ref="fishboneMsa">无数据</section>
  </div>
</template>

<script>
import {fishbone} from "./d3.fishbone"
  export default {
    name: "fishboneMsa",
    props: ["dataId"],
    mounted: function () {
      var fishbone = d3.fishbone()
      /*/api/event/fishBone/{id}*/
      let data = {id: this.dataId}
      this.$http.post('/event/fishBone/'+ this.dataId, data).then( data => {
          //console.log(data)
        this.dataChd = data.data.children;
        console.log(this.dataChd.length)
          // the most reliable way to get the screen size
          var size = (() =>{
              return {width: this.clientWidth, height: this.clientHeight};
            }).bind(window.document.documentElement),
            svg = d3.select(this.$refs.fishboneMsa)
              .append("svg")
              // firefox needs a real size
              .attr(size())
              // set the data so the reusable chart can find it
              .datum(data.data)
              // set up the default arrowhead
              .call(fishbone.defaultArrow)
              // call the selection modifier
              .call(fishbone);
          // this is the actual `force`: just start it
          fishbone.force().start();
          // handle resizing the window
          d3.select(window).on("resize", function(){
            fishbone.force()
              .size([size().width, size().height])
              .start();
            svg.attr(size())
          });
      });

    },
    data:function () {
      return{
        dataChd: [],
      }
    },
    methods: {

    },
  }
</script>

<style>
  .fishboneMsa{
    height: 100%;
    width: 100%;
  }
  .fishboneMsa section{width: 100%;height: 100%;}
</style>
