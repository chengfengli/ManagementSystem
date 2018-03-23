<template>
  <div class="eventAbstract">
    <article>
      <aside style="padding: 40px 0 0 0">
        <section class="eventAbstract-title" style="width: 85%;margin: auto;font-size: 20px;padding-bottom: 20px">事件报告</section>
        <section class="eventAbstract-table" style="width: 80%;margin: auto;border: 1px solid #797979;">
          <el-table
            :show-header="false"
            :data="tableData"
            stripe
            style="width: 100%">
            <el-table-column
              prop="date"
              label="日期"
              width="180">
            </el-table-column>
            <el-table-column
              prop="name"
              label="姓名"
              width="180">
            </el-table-column>
            <el-table-column
              prop="address"
              label="地址">
            </el-table-column>
          </el-table>
        </section>
      </aside>
      <aside style="padding: 40px 0 0 0">
        <section class="eventAbstract-title" style="width: 85%;margin: auto;font-size: 20px;padding-bottom: 20px">事件报告</section>
        <section class="eventAbstract-table" style="width: 80%;margin: auto;border: 1px solid #797979;">
          <el-table
            :show-header="false"
            :data="tableData"
            stripe
            style="width: 100%">
            <el-table-column
              prop="date"
              label="日期"
              width="180">
            </el-table-column>
            <el-table-column
              prop="name"
              label="姓名"
              width="180">
            </el-table-column>
            <el-table-column
              prop="address"
              label="地址">
            </el-table-column>
          </el-table>
        </section>
      </aside>
      <aside style="padding: 40px 0 0 0">
        <section class="eventAbstract-title" style="width: 85%;margin: auto;font-size: 20px;padding-bottom: 20px">事件报告</section>
        <section class="eventAbstract-table" style="width: 80%;margin: auto;border: 1px solid #797979;">
          <el-table
            :show-header="false"
            :data="tableData"
            stripe
            style="width: 100%">
            <el-table-column
              prop="date"
              label="日期"
              width="180">
            </el-table-column>
            <el-table-column
              prop="name"
              label="姓名"
              width="180">
            </el-table-column>
            <el-table-column
              prop="address"
              label="地址">
            </el-table-column>
          </el-table>
        </section>
      </aside>
    </article>
  </div>
</template>

<script>
  export default {
    name: "eventAbstract",
    data(){
      return{
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }]
      }
    }
  }
</script>

<style>
  .eventAbstract{
    width: 100%;
    height: 100%;
    overflow: auto;
  }
  .eventAbstract .el-table__row td{padding: 10px 0!important;}
  .eventAbstract article aside:last-child{padding-bottom: 40px!important;}
</style>
