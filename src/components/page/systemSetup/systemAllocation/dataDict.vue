<template>
  <article class="dataDict">
    <section class="systemParam-search">
      <div>
        <label>标识键</label>
        <input v-model="searchKEY"/>
      </div>
      <div>
        <label>描述</label>
        <input v-model="searchMARK"/>
      </div>
      <div>
        <label>显示值</label>
        <input v-model="searchShow"/>
      </div>
      <div>
        <el-button @click="searchSubmit" type="primary" class="dataDict-submit" size="small">查询</el-button>
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
          :max-width="100">
        </el-table-column>
        <el-table-column
          prop="KEY"
          label="标识键"
          :max-width="300">
        </el-table-column>
        <el-table-column
          prop="VALUE"
          label="值"
          :max-width="200">
        </el-table-column>
        <el-table-column
          prop="DISPLAY"
          label="显示值"
          :max-width="200">
        </el-table-column>
        <el-table-column
          prop="MARK"
          label="描述"
          :max-width="550">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          :max-width="130">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">编辑</el-button>
            <el-button @click="deleteData(scope.row)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </section>
    <section class="systemParam-paging">
      <el-pagination class="pagination" @size-change="changePageSize" @current-change="currentPage"
                     :current-page="dictData.page"
                     :page-sizes="[10,20,30,50]" :page-size="dictData.pageSize"
                     layout="total, sizes, prev, pager, next, jumper" :total="dictData.total">
      </el-pagination>
    </section>
    <div class="window-dialog" v-if="showDialog">
      <section>
        <label>标识键</label>
        <input v-model="recurrence.KEY "/>
      </section>
      <section>
        <label>值</label>
        <input v-model="recurrence.VALUE"/>
      </section>
      <section>
        <label>显示值</label>
        <input v-model="recurrence.DISPLAY"/>
      </section>
      <section>
        <label>描述</label>
        <textarea v-model="recurrence.MARK"></textarea>
      </section>
      <section style="text-align: center;">
        <el-button @click="modifyBtn" class="btn" type="danger">提交</el-button>
        <el-button class="btn" type="info" @click="showDialog = false">取消</el-button>
      </section>
    </div>
  </article>
</template>

<script>
  import Page from "../../../common/Page"

  export default {
    name: "dataDict",
    data() {
      return {
        showDialog: false,
        recurrence: {},
        searchKEY: "",
        searchMARK: "",
        searchShow: "",
        dictData: {
          total: 0,
          page: 1,
          pageSize: 10,
          KEY: "",
          MARK: "",
          DISPLAY: ""
        },
        dataList: []
      }
    },
    mounted() {
      this.initDict(this.dictData);
    },
    methods: {
      deleteData: function (tabData) {
        this.$confirm('确认删除该条数据？', '提示!', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.post('/dic/del/' + tabData.CFGID, tabData.CFGID).then(res => {
            if (res.code == 10000) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
              this.showDialog = false;
              this.initDict(this.dictData);
            } else {
              this.$message.error(res.msg);
            }
          }).catch(function (error) {//加上catch
            console.log(error);
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
        /* this.$http.post('/dic/del/'+ tabData.CFGID, tabData.CFGID).then(res => {
           if (res.code == 10000) {
             this.showDialog = false;
             this.initSystemData(this.searchData);
           } else {
             this.$message.error(res.msg);
           }
         }).catch(function (error) {//加上catch
           console.log(error);
         });*/
      },
      modifyBtn: function () {
        var data = {
          id: this.recurrence.CFGID,
          KEY: this.recurrence.KEY,
          MARK: this.recurrence.MARK,
          DISPLAY: this.recurrence.DISPLAY,
          value: this.recurrence.VALUE
        }
        this.$http.post('/dic/update/' + this.recurrence.CFGID, data).then(res => {
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
      },
      handleClick: function (tabData) {
        this.showDialog = true;
        this.recurrence = tabData;
        console.log(this.recurrence)
      },
      searchSubmit: function () {
        this.dictData.KEY = this.searchKEY;
        this.dictData.MARK = this.searchMARK;
        this.dictData.DISPLAY = this.searchShow;
        this.initDict(this.dictData);
      },
      initDict: function (data) {
        this.$http.post('/dic/dics', data).then(res => {
          if (res.code == 10000) {
            this.dictData.total = res.data.totalSize;
            this.dataList = res.data.rows;
          } else {
            this.$message.error(res.msg);
          }
        }).catch(function (error) {//加上catch
          console.log(error);
        });
      },
      currentPage: function (currentPage) {    //页码数量
        this.dictData.page = currentPage;
        this.initDict(this.dictData);
      },
      changePageSize: function (pageSize) {   //每页数量
        this.dictData.pageSize = pageSize;
        this.initDict(this.dictData);
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

  .dataDict {
    width: 100%;
    height: 100%;
    overflow: auto;
  }

  .dataDict .systemParam-search {
    padding: 15px 25px;
    box-sizing: border-box;
    max-height: 8%;
  }

  .dataDict .systemParam-search label {
    margin-right: 10px;
    text-align: right !important;
    width: 50px !important;
  }

  .dataDict .systemParam-search div {
    display: inline-block;
    margin-right: 30px;
  }

  .dataDict .systemParam-search input {
    width: 120px;
    padding: 3px 0;
  }

  .dataDict .el-button {
    padding: 10px 3px;
    box-sizing: border-box;
  }

  .dataDict .dataDict-submit {
    padding: 6px 23px;
  }

  .dataDict .el-table th, .dataDict .el-table td {
    text-align: center;
  }

  .dataDict .systemParam-paging {
    padding-top: 40px;
    width: 100%;
    max-height: 10%;
    text-align: center;
  }

  .dataDict .systemParam-paging .pagination {
    margin-bottom: 30px;
  }
</style>
