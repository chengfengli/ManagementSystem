<template>
  <article class="systemParam">
    <section class="systemParam-search">
      <div>
        <label>标识键</label>
        <input v-model="searchKEY"/>
      </div>
      <div>
        <label>描述</label>
        <input v-model="searchMARK"/>
      </div>
      <div @click="searchSubmit">
        <el-button class="systemParam-submit" type="primary" size="small">查询</el-button>
      </div>
    </section>
    <section class="systemParam-table">
      <el-table
        :data="dataList"
        border
        style="width: 100%">
        <el-table-column
          fixed
          prop="ROW_ID"
          label=""
          width="150">
        </el-table-column>
        <el-table-column
          prop="KEY"
          label="标识键"
          width="350">
        </el-table-column>
        <el-table-column
          prop="VALUE"
          label="值"
          :max-width="220">
        </el-table-column>
        <el-table-column
          prop="MARK"
          label="描述"
          :max-width="650">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="130">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </section>
    <section class="systemParam-paging">
      <el-pagination class="pagination" @size-change="changePageSize" @current-change="currentPage"
                     :current-page="searchData.page"
                     :page-sizes="[10,20,30,50]" :page-size="searchData.pageSize"
                     layout="total, sizes, prev, pager, next, jumper" :total="searchData.total">
      </el-pagination>
    </section>
    <div class="window-dialog" v-if="showDialog">
      <section>
        <label>标识键</label>
        <span class="dialog-span">{{ recurrence.KEY }}</span>
      </section>
      <section>
        <label>值</label>
        <input v-model="recurrence.VALUE"/>
      </section>
      <section>
        <label>描述</label>
        <textarea v-model="recurrence.MARK"></textarea>
      </section>
      <section style="text-align: center;">
        <el-button @click="modifyBtn" class="btn" type="danger">提交</el-button>
        <el-button class="btn" type="info" @click="cancelBtn">取消</el-button>
      </section>
    </div>
  </article>
</template>

<script>
  import Page from "../../../common/Page"

  export default {
    name: "systemParam",
    data() {
      return {
        recurrence: {
          /*  KEY: "",
            VALUE: "",
            MARK: ""*/
        },
        showDialog: false,
        searchKEY: "",
        searchMARK: "",
        searchData: {
          total: 0,
          page: 1,
          pageSize: 10,
          KEY: "",
          MARK: "",
        },
        dataList: []
      }
    },
    mounted() {
      this.initSystemData(this.searchData);
    },
    methods: {
      cancelBtn: function () {
        this.showDialog = false;
        this.initSystemData(this.searchData);
      },
      modifyBtn: function () {
        var data = {
          id: this.recurrence.CFGID,
          value: this.recurrence.VALUE
          /* VALUE: this.recurrence.VALUE,*/
        }
        this.$http.post('/cfg/update/' + this.recurrence.CFGID, data).then(res => {
          if (res.code == 10000) {
            this.$message.success("提交成功！");
            this.showDialog = false;
            this.initSystemData(this.searchData);
          } else {
            this.$message.error(res.msg);
          }
        }).catch(function (error) {//加上catch
          console.log(error);
        });
        this.initSystemData(this.searchData);
      },
      handleClick: function (tabData) {
        this.showDialog = true;
        this.recurrence = tabData;
        console.log(tabData)
      },
      //查询
      searchSubmit: function () {
        this.searchData.KEY = this.searchKEY;
        this.searchData.MARK = this.searchMARK;
        this.initSystemData(this.searchData);
      },
      currentPage: function (currentPage) {    //页码数量
        this.searchData.page = currentPage;
        this.initSystemData(this.searchData);
      },
      changePageSize: function (pageSize) {   //每页数量
        this.searchData.pageSize = pageSize;
        this.initSystemData(this.searchData);
      },
      initSystemData: function (data) {
        this.$http.post('/cfg/sysParams', data).then(res => {
          if (res.code == 10000) {
            this.searchData.total = res.data.totalSize;
            this.dataList = res.data.rows;
          } else {
            this.$message.error(res.msg);
          }
        }).catch(function (error) {//加上catch
          console.log(error);
        });
      },
    },
    components: {
      Page
    }
  }
</script>

<style>
  .window-dialog {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 20px;
    box-sizing: border-box;
    background: white;
    border: 1px solid #ccc;
    z-index: 100;
  }

  .window-dialog section label {
    width: 40px;
    text-align: right;
    display: inline-block;
    margin-right: 15px;
  }

  .window-dialog section input,
  .window-dialog section textarea {
    padding: 5px 10px;
    box-sizing: border-box;
    border: 1px solid #ccc;
    margin-bottom: 20px;
    min-width: 230px;
  }

  .window-dialog section .dialog-span {
    display: inline-block;
    padding: 5px 10px;
    box-sizing: border-box;
    margin-bottom: 20px;
    min-width: 230px;
  }

  .window-dialog section textarea {
    vertical-align: center;
  }

  .window-dialog .btn {
    padding: 10px 25px !important;
  }

  .systemParam {
    width: 100%;
    height: 100%;
    overflow: auto;
  }

  .systemParam .systemParam-search {
    padding: 15px 25px;
    box-sizing: border-box;
    max-height: 8%;
  }

  .systemParam .systemParam-search label {
    margin-right: 10px;
    text-align: right !important;
    width: 50px !important;
  }

  .systemParam .systemParam-search div {
    display: inline-block;
    margin-right: 30px;
  }

  .systemParam .systemParam-search input {
    width: 120px;
    padding: 3px 0;
  }

  .systemParam .el-button {
    padding: 10px 3px;
  }

  .systemParam .systemParam-submit {
    padding: 6px 23px;
    box-sizing: border-box;
  }

  .systemParam .el-table th, .systemParam .el-table td {
    text-align: center;
  }

  .systemParam .systemParam-paging {
    padding-top: 40px;
    width: 100%;
    max-height: 10%;
    text-align: center;
  }

  .systemParam .systemParam-paging .pagination {
    margin-bottom: 30px;
  }
</style>
