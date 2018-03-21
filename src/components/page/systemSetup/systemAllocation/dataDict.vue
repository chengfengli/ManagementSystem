<template>
  <article class="dataDict">
    <section class="systemParam-search">
      <div>
        <label>标识键</label>
        <input/>
      </div>
      <div>
        <label>描述</label>
        <input/>
      </div>
      <div>
        <el-button type="primary" class="dataDict-submit" size="small">查询</el-button>
      </div>
    </section>
    <section class="systemParam-table">
      <el-table
        :data="tableData"
        border
        style="width: 100%">
        <el-table-column
          fixed
          prop="date"
          label=""
          width="100">
        </el-table-column>
        <el-table-column
          prop="name"
          label="标识键"
          width="220">
        </el-table-column>
        <el-table-column
          prop="province"
          label="值"
          width="170">
        </el-table-column>
        <el-table-column
          prop="province"
          label="显示值"
          width="170">
        </el-table-column>
        <el-table-column
          prop="city"
          label="描述"
          width="460">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="100">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
            <el-button type="text" size="small">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </section>
    <section class="systemParam-paging">
      <Page></Page>
    </section>
  </article>
</template>

<script>
  import Page from "../../../common/Page"
  export default {
    name: "dataDict",
    data() {
      return {
        tableData: [{
          date: '2016-05-03',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-02',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-04',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-01',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }]
      }
    },
    methods:{

    },
    components: {
      Page
    }
  }
</script>

<style>
  .dataDict{
    width: 100%;
    height: 100%;
    overflow: auto;
  }
  .dataDict .systemParam-search{
    padding: 15px 25px;
    box-sizing: border-box;
    max-height: 8%;
  }
  .dataDict .systemParam-search label{
    margin-right: 10px;
    text-align: right!important;
    width: 50px!important;
  }
  .dataDict .systemParam-search div{display: inline-block;margin-right: 30px;}
  .dataDict .systemParam-search input{
    width: 120px;
    padding: 3px 0;
  }
  .dataDict .el-button{padding: 10px 3px;box-sizing: border-box;}
  .dataDict .dataDict-submit{padding: 6px 23px;}
  .dataDict .el-table th,.dataDict .el-table td{text-align: center;}
  .dataDict .systemParam-paging{
    padding-top: 40px;
    width: 100%;
    max-height: 10%;
    text-align: center;
  }
</style>
