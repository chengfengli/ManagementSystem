<template>
  <div class="fishboneMsa">fishbone-msa
    <section ref="fishboneMsa"></section>
  </div>
</template>

<script>
import {fishbone} from "./d3.fishbone"
  export default {
    name: "fishboneMsa",
    mounted: function () {
      var fishbone = d3.fishbone()
      //let needFishboneData = this.fishboneData;
      let needFishboneData =
        {
        "name": "Quality---111111",
        "children": [
          {
            "name": "Machine---1",
            "children": [
              {"name": "Mill"},
              {"name": "Mixer"},
              {"name": "Metal Lathe"}
            ]
          },
          {"name": "Method---2",
            "children": [
              {"name": "Mill"},
              {"name": "Mixer"},
              {"name": "Metal Lathe"}
            ]
          },
          {
            "name": "Material---1-3",
            "children": [
              {"name": "Masonite"},
              {"name": "Marscapone"},
              {"name": "Meat"}
            ]
          },
          {
            "name": "Man Power---4",
            "children": [
              {"name": "Manager"},
              {"name": "Master's Student"},
              {"name": "Magician"},
              {"name": "Miner"},
              {"name": "Magister"},
              {"name": "Massage Artist"}
            ]
          },
          {
            "name": "Measurement---5",
            "children": [
              {"name": "Malleability"}
            ]
          },
          {
            "name": "Milieu---6",
            "children": [
              {"name": "Marine"}
            ]
          }
        ]
      };
      // load the data
      //console.log(d3)
     /* this.$http.get('../../../../static/js/data.json').then((response) => {
        // 响应成功回调
        alert(response.data);
      }, (response) => {
        // 响应错误回调
        alert('服务器请求失败');
      });*/

      d3.json(needFishboneData,(data) =>{
        console.log(data)
        // the most reliable way to get the screen size
        var size = (function(){
            return {width: this.clientWidth, height: this.clientHeight};
          }).bind(window.document.documentElement),

          svg = d3.select(this.$refs.fishboneMsa)

            .append("svg")
            // firefox needs a real size
            .attr(size())
            // set the data so the reusable chart can find it
            .datum(data)
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
        fishboneData: {
        "name": "Quality---111111",
        "children": [
        {
          "name": "Machine---1",
          "children": [
            {"name": "Mill"},
            {"name": "Mixer"},
            {"name": "Metal Lathe"}
          ]
        },
        {"name": "Method---2",
          "children": [
            {"name": "Mill"},
            {"name": "Mixer"},
            {"name": "Metal Lathe"}
          ]
        },
        {
          "name": "Material---1-3",
          "children": [
            {"name": "Masonite"},
            {
              "name": "Marscapone",
              "children": [
                {"name": "Malty"},
                {
                  "name": "Minty",
                  "children": [
                    {"name": "spearMint"},
                    {"name": "pepperMint"}
                  ]
                }
              ]
            },
            {"name": "Meat",
              "children": [
                {"name": "Mutton"}
              ]
            }
          ]
        },
        {
          "name": "Man Power---4",
          "children": [
            {"name": "Manager"},
            {"name": "Master's Student"},
            {"name": "Magician"},
            {"name": "Miner"},
            {"name": "Magister", "children": [
                {"name": "Malpractice"}
              ]},
            {
              "name": "Massage Artist",
              "children": [
                {"name": "Masseur"},
                {"name": "Masseuse"}
              ]
            }
          ]
        },
        {
          "name": "Measurement---5",
          "children": [
            {"name": "Malleability"}
          ]
        },
        {
          "name": "Milieu---6",
          "children": [
            {"name": "Marine"}
          ]
        }
      ]
      }
      }
    },
    methods: {

    },
  }
</script>

<style scoped>
  .fishboneMsa{
    height: 100%;
    width: 100%;
    border: 1px solid red;
  }
  /**{ font-family: "Gill Sans", "Gill Sans MT"; }*/
  .label-0{ font-size: 2em; }
  .label-1{ font-size: 1.5em; fill: #111; }
  .label-2{ font-size: 1em; fill: #444; }
  .label-3{ font-size: .9em; fill: #888; }
  .label-4{ font-size: .8em; fill: #aaa; }

  .link-0{ stroke: #000; stroke-width: 2px}
  .link-1{ stroke: #333; stroke-width: 1px}
  .link-2, .link-3, .link-4{ stroke: #666; stroke-width: .5px; }
</style>
