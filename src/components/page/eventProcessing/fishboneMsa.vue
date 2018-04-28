<template>
  <div class="fishboneMsa">
    <section  ref="fishboneMsa"></section>
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
      /*d3.json(this.$http.post('/event/fishBone/'+ this.dataId),(data) =>{*/
     /* var initdata = {
        "children": [
        {
          "name": "data---1",
          "children": [
            {
              "name": "子级1-1"
            }, {
              "name": "子级1-2"
            }, {
              "name": "子级1-3"
            }
          ]
        }, {
          "name": "data---2",
          "children": [
            {
              "name": "子级2-1"
            }, {
              "name": "子级2-2"
            }, {
              "name": "子级2-3"
            }
          ]
        }, {
          "name": "data---3",
          "children": [
            {
              "name": "子级3-1"
            }, {
              "name": "子级3-2"
            }, {
              "name": "子级2-3"
            }
          ]
        }, {
          "name": "data---4",
          "children": [
            {
              "name": "子级4-1"
            }, {
              "name": "子级4-2"
            }, {
              "name": "子级4-3"
            }
          ]
        }, {
          "name": "data---5",
          "children": [
            {
              "name": "子级5-1"
            }, {
              "name": "子级5-2"
            }, {
              "name": "子级5-3"
            }
          ]
        }, {
          "name": "data---6",
          "children": [
            {
              "name": "子级6-1"
            }, {
              "name": "子级6-2"
            }, {
              "name": "子级6-3"
            }
          ]
        }
      ]
      }


      var size = (() =>{
          return {width: this.clientWidth, height: this.clientHeight};
        }).bind(window.document.documentElement),
        svg = d3.select(this.$refs.fishboneMsa)
          .append("svg")
          // firefox needs a real size
          .attr(size())
          // set the data so the reusable chart can find it
          .datum(initdata)
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
      });*/




      this.$http.post('/event/fishBone/'+ this.dataId, data).then( data => {
          //console.log(data)
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
