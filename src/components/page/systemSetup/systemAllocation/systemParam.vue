<template>
  <article class="systemParam">
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
        <el-button type="primary" size="small">查询</el-button>
      </div>
    </section>
    <section class="systemParam-table">
      <el-table
        border="true"
        :data="tableData4"
        style="width: 100%"
        max-height="80%">
        <el-table-column
          fixed
          prop="date"
          label="id"
          width="100">
        </el-table-column>
        <el-table-column
          prop="name"
          label="标识键"
          width="250">
        </el-table-column>
        <el-table-column
          prop="province"
          label="值"
          width="200">
        </el-table-column>
        <el-table-column
          prop="province"
          label="描述"
          width="620">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="150">
          <template slot-scope="scope">
            <el-button
              @click.native.prevent="deleteRow(scope.$index, tableData4)"
              type="text"
              size="small">
              编辑
            </el-button>
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
        name: "systemParam",
        data(){
          return{
            tableData4: [{
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
            }, {
              date: '2016-05-08',
              name: '王小虎',
              province: '上海',
              city: '普陀区',
              address: '上海市普陀区金沙江路 1518 弄',
              zip: 200333
            }, {
              date: '2016-05-06',
              name: '王小虎',
              province: '上海',
              city: '普陀区',
              address: '上海市普陀区金沙江路 1518 弄',
              zip: 200333
            }, {
              date: '2016-05-07',
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
  .systemParam{
    width: 100%;
    height: 100%;
    overflow: auto;
  }
  .systemParam .systemParam-search{
    padding: 15px 25px;
    box-sizing: border-box;
    max-height: 8%;
  }
  .systemParam .systemParam-search label{
    margin-right: 10px;
    text-align: right!important;
    width: 50px!important;
  }
  .systemParam .systemParam-search div{display: inline-block;margin-right: 30px;}
  .systemParam .systemParam-search input{
    width: 120px;
    padding: 3px 0;
  }
  .systemParam .el-button{padding: 6px 23px;}
  .systemParam .el-table th,.systemParam .el-table td{text-align: center;}
  .systemParam .systemParam-paging{
    padding-top: 40px;
    width: 100%;
    max-height: 10%;
    text-align: center;
  }
</style>
