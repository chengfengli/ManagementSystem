<template>
  <article class="tourist">
    <div @click="monitoRadio">1151515</div>
    <section class="tourist-tip">注：当用户以游客身份进入此事件， 且事件在勾选的状态下，允许进行的操作</section>
    <section class="tourist-table">
      <div class="tourist-title">
        <div v-for="title in tabTitle">{{ title }}</div>
      </div>
      <div class="tourist-checkbox">
        <aside class="action">
          <div v-for="item in tableData.rows">
            {{ item.PERMISSIONNAME }}
          </div>
        </aside>
        <aside class="chechBox">
          <div class="select-ck" v-for="ck in tableData.rows">
            <div class="ck-btn">
              <el-checkbox v-model="ck.ABANDON" :label="null" @change="monitoRadio(ck.ABANDON)" ></el-checkbox>
            </div>
            <div class="ck-btn" >
              <el-checkbox v-model="ck.REJECTFILL" :label="null" @change="monitoRadio(ck.REJECTFILL)"></el-checkbox>
            </div>
            <div class="ck-btn" >
              <el-checkbox v-model="ck.WAITDEAL" :label="null" @change="monitoRadio(ck.WAITDEAL)"></el-checkbox>
            </div>
            <div class="ck-btn" >
              <el-checkbox v-model="ck.REJECTDEAL" :label="null" @change="monitoRadio(ck.REJECTDEAL)"></el-checkbox>
            </div>
            <div class="ck-btn" >
              <el-checkbox v-model="ck.WAITCLOSE" :label="null" @change="monitoRadio(ck.WAITCLOSE)"></el-checkbox>
            </div>
            <div class="ck-btn" >
              <el-checkbox v-model="ck.CLOSED" :label="null" @change="monitoRadio(ck.CLOSED)"></el-checkbox>
            </div>
          </div>
        </aside>
      </div>
    </section>
  </article>
</template>

<script>
  export default {
    name: "tourist",
    data() {
      return {
        ttt: true,
        radio: false,
        tabTitle: ['功能', '废弃', '驳回填报', '等待处理', '驳回处理', '等待结案', '已结案'],
        tableData: []
      }
    },
    props: ["menuData"],
    mounted: function(){
      console.log(this.menuData)
      this.tableData = this.menuData;
    },
    methods: {
      monitoRadio: function (ck) {
        console.log(ck)
      },
    },

  }
</script>

<style>
  .tourist {
    height: 100%;
    width: 100%;
  }
  .tourist .tourist-tip {
    padding: 13px 20px;
    box-sizing: border-box;
  }
  .tourist .tourist-title, .tourist .tourist-checkbox {
    display: flex;
    text-align: center;
  }
  .tourist .tourist-checkbox .action{flex: 1;}
  .tourist .tourist-checkbox .chechBox{flex: 6;}
  .tourist .tourist-checkbox .chechBox .select-ck{
    display: flex;
  }
  .tourist .select-ck .ck-btn{
    flex: 1;
  }
  .tourist .tourist-checkbox .action div{
    flex: 1;
    padding: 13px 0;
    border: 1px solid #EBEEF5;
  }
  .tourist .tourist-title div{
    flex: 1;
    padding: 13px 0;
    border: 1px solid #EBEEF5;
  }
  .select-ck div{
    flex: 1;
    padding: 11.64px 0;
    border: 1px solid #EBEEF5;
  }
</style>
