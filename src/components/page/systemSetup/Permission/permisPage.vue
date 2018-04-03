<template>
  <article class="tourist">
    <section class="tourist-tip">注：当用户以游客身份进入此事件， 且事件在勾选的状态下，允许进行的操作</section>
    <section class="tourist-table">
      <div class="tourist-title">
        <div v-for="title in tabTitle">{{ title }}</div>
      </div>
      <div class="tourist-checkbox">
        <aside class="action">
          <div v-for="item in permisMenuData.rows">
            {{ item.PERMISSIONNAME }}
          </div>
        </aside>
        <aside class="chechBox">
          <div class="select-ck" v-for="ck in permisMenuData.rows">
            <div class="ck-btn" >
              <el-checkbox v-model="ck.ABANDON"></el-checkbox>
            </div>
            <div class="ck-btn" >
              <el-checkbox v-model="ck.REJECTFILL"></el-checkbox>
            </div>
            <div class="ck-btn" >
              <el-checkbox v-model="ck.WAITDEAL"></el-checkbox>
            </div>
            <div class="ck-btn" >
              <el-checkbox v-model="ck.REJECTDEAL"></el-checkbox>
            </div>
            <div class="ck-btn" >
              <el-checkbox v-model="ck.WAITCLOSE"></el-checkbox>
            </div>
            <div class="ck-btn" >
              <el-checkbox v-model="ck.CLOSED"></el-checkbox>
            </div>
          </div>
        </aside>
      </div>
      <!--<el-table
        :data="tableData"
        border
        style="width: 100%">
        <el-table-column
          prop="date"
          label="功能"
          width="180">
        </el-table-column>
        <el-table-column
          prop="name"
          label="废弃"
          width="180">
        </el-table-column>
        <el-table-column
          prop="address"
          label="驳回填报">
        </el-table-column>
        <el-table-column
          prop="address"
          label="等待处理">
        </el-table-column>
        <el-table-column
          prop="address"
          label="驳回处理">
        </el-table-column>
        <el-table-column
          prop="address"
          label="等待结案">
        </el-table-column>
        <el-table-column
          prop="address"
          label="已结案">
        </el-table-column>
      </el-table>-->
    </section>
  </article>
</template>

<script>
  export default {
    name: "tourist",
    data() {
      return {
        tabTitle: ['功能', '废弃', '驳回填报', '等待处理', '驳回处理', '等待结案', '已结案'],
      }
    },
    mounted(){
      console.log(this.permisMenuData);
    },
    methods: {

    },
    props: ["permisMenuData"]
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
    padding: 10px 0;
    border: 1px solid #EBEEF5;
  }
  .tourist .tourist-title div{
    flex: 1;
    padding: 10px 0;
    border: 1px solid #EBEEF5;
  }
  .select-ck div{
    flex: 1;
    padding: 10px 0;
    border: 1px solid #EBEEF5;
  }
</style>
